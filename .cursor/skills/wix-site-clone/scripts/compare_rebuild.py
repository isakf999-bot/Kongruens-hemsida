#!/usr/bin/env python3
"""Screenshot a local rebuild and diff it against captured Wix screenshots.

Usage:
    python compare_rebuild.py --source design-capture --rebuild http://localhost:3000 --out design-capture/diffs
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

VIEWPORTS = {
    "desktop": {"width": 1440, "height": 900},
    "tablet": {"width": 768, "height": 1024},
    "mobile": {"width": 390, "height": 844},
}


def mean_abs_diff(src_img, reb_img) -> tuple[float, object]:
    from PIL import ImageChops, ImageOps

    w = min(src_img.width, reb_img.width)
    h = min(src_img.height, reb_img.height)
    a = src_img.convert("RGB").crop((0, 0, w, h))
    b = reb_img.convert("RGB").crop((0, 0, w, h))
    diff = ImageChops.difference(a, b)
    hist = diff.convert("L").histogram()
    total = sum(hist)
    if total == 0:
        score = 0.0
    else:
        acc = sum(i * c for i, c in enumerate(hist))
        score = acc / (total * 255.0) * 100.0
    # amplify for visibility
    amplified = ImageOps.autocontrast(diff.point(lambda p: min(255, int(p * 3))))
    return score, amplified


def side_by_side(src_img, reb_img, label_src="Wix", label_reb="Rebuild"):
    from PIL import Image, ImageDraw

    gap = 16
    label_h = 36
    w = src_img.width + reb_img.width + gap
    h = max(src_img.height, reb_img.height) + label_h
    canvas = Image.new("RGB", (w, h), (18, 18, 18))
    canvas.paste(src_img.convert("RGB"), (0, label_h))
    canvas.paste(reb_img.convert("RGB"), (src_img.width + gap, label_h))
    draw = ImageDraw.Draw(canvas)
    draw.text((8, 8), label_src, fill=(220, 220, 220))
    draw.text((src_img.width + gap + 8, 8), label_reb, fill=(220, 220, 220))
    return canvas


def load_pages(source_root: Path) -> list[dict]:
    pages_file = source_root / "source" / "pages.json"
    if pages_file.exists():
        data = json.loads(pages_file.read_text(encoding="utf-8"))
        return data.get("pages") or [{"path": "/", "slug": "home"}]
    # fallback: infer from screenshot folders
    desk = source_root / "source" / "screenshots" / "desktop"
    if desk.exists():
        return [{"path": "/" if p.name == "home" else f"/{p.name}", "slug": p.name} for p in sorted(desk.iterdir()) if p.is_dir()]
    return [{"path": "/", "slug": "home"}]


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Diff local rebuild screenshots against captured Wix screenshots."
    )
    parser.add_argument("--source", default="design-capture", help="Capture root that contains source/")
    parser.add_argument("--rebuild", default="http://localhost:3000", help="Local site origin")
    parser.add_argument("--out", default="design-capture/diffs", help="Where to write diffs")
    parser.add_argument(
        "--viewports",
        default="desktop,tablet,mobile",
        help="Subset of desktop,tablet,mobile",
    )
    args = parser.parse_args()

    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        print("Install Playwright: pip install playwright && python -m playwright install chromium", file=sys.stderr)
        return 1
    try:
        from PIL import Image
    except ImportError:
        print("Install Pillow: pip install pillow", file=sys.stderr)
        return 1

    source_root = Path(args.source).resolve()
    out = Path(args.out).resolve()
    out.mkdir(parents=True, exist_ok=True)
    pages = load_pages(source_root)
    viewport_names = [v.strip() for v in args.viewports.split(",") if v.strip()]

    report = []
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(device_scale_factor=1, locale="sv-SE")
        page = context.new_page()

        for meta in pages:
            path = meta.get("path") or "/"
            slug = meta.get("slug") or "home"
            url = args.rebuild.rstrip("/") + ("" if path == "/" else path)
            print(f"Rebuild {url}")
            try:
                page.goto(url, wait_until="networkidle", timeout=45000)
            except Exception:
                page.goto(url, wait_until="domcontentloaded", timeout=45000)
            page.wait_for_timeout(500)
            try:
                page.evaluate("() => document.fonts.ready")
            except Exception:
                pass

            for vp_name in viewport_names:
                vp = VIEWPORTS[vp_name]
                page.set_viewport_size({"width": vp["width"], "height": vp["height"]})
                page.wait_for_timeout(400)
                reb_dir = out / "rebuild" / vp_name / slug
                reb_dir.mkdir(parents=True, exist_ok=True)
                reb_path = reb_dir / "full.png"
                page.screenshot(path=str(reb_path), full_page=True)

                src_path = source_root / "source" / "screenshots" / vp_name / slug / "full.png"
                if not src_path.exists():
                    print(f"  missing source {src_path}")
                    report.append({"page": slug, "viewport": vp_name, "score": None, "note": "missing source screenshot"})
                    continue

                src_img = Image.open(src_path)
                reb_img = Image.open(reb_path)
                score, diff_img = mean_abs_diff(src_img, reb_img)
                pair = side_by_side(src_img, reb_img)
                dest = out / vp_name / slug
                dest.mkdir(parents=True, exist_ok=True)
                pair.save(dest / "side-by-side.png")
                diff_img.save(dest / "diff.png")
                height_delta = reb_img.height - src_img.height
                report.append(
                    {
                        "page": slug,
                        "viewport": vp_name,
                        "diff_percent": round(score, 3),
                        "source_size": [src_img.width, src_img.height],
                        "rebuild_size": [reb_img.width, reb_img.height],
                        "height_delta_px": height_delta,
                    }
                )
                print(f"  {vp_name}: mean-abs-diff {score:.2f}%  heightΔ {height_delta}px")

        browser.close()

    (out / "report.json").write_text(json.dumps(report, indent=2), encoding="utf-8")
    lines = ["# Visual diff report", ""]
    lines.append("Lower `diff_percent` is closer. Height delta means the rebuild is taller/shorter than Wix.")
    lines.append("")
    for row in report:
        lines.append(
            f"- **{row.get('page')}** `{row.get('viewport')}`: "
            f"diff={row.get('diff_percent')}% heightΔ={row.get('height_delta_px')}px"
        )
    (out / "report.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"Wrote {out / 'report.md'}")
    print("Open side-by-side.png and diff.png per page — numeric score is a hint, your eyes decide 97%.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
