#!/usr/bin/env python3
"""Capture a live Wix site: screenshots, tokens, inventory, assets.

Usage:
    python capture_source.py --url https://example.wixsite.com/site --out design-capture
    python capture_source.py --url https://SITE --out design-capture --pages /,/about
"""

from __future__ import annotations

import argparse
import json
import re
import sys
import urllib.request
from pathlib import Path
from urllib.parse import urljoin, urlparse

VIEWPORTS = {
    "desktop": {"width": 1440, "height": 900},
    "tablet": {"width": 768, "height": 1024},
    "mobile": {"width": 390, "height": 844},
}

COOKIE_BUTTONS = [
    "Accept",
    "Accept All",
    "Accept all",
    "I Agree",
    "Got it",
    "OK",
    "Godkänn",
    "Acceptera",
    "Tillåt alla",
    "Jag förstår",
]

HIDE_SELECTORS = [
    "[id*='COOKIE' i]",
    "[class*='cookie' i]",
    "[id*='consent' i]",
    "[class*='consent' i]",
    "[data-hook='consent-banner']",
    "wix-chat",
    "[id*='WIX_CHAT' i]",
    "#WIX_ADS",
    "[data-testid='wix-ads']",
    "[aria-label*='chat' i]",
    "[class*='comp-chat']",
]


def slugify(path: str) -> str:
    path = path or "/"
    if path == "/":
        return "home"
    slug = re.sub(r"[^a-zA-Z0-9]+", "-", path.strip("/")).strip("-").lower()
    return slug or "page"


def load_extractor(script_dir: Path) -> str:
    js_path = script_dir / "extract_inventory.js"
    if not js_path.exists():
        raise FileNotFoundError(f"Missing {js_path}")
    return js_path.read_text(encoding="utf-8")


def dismiss_chrome(page) -> None:
    for label in COOKIE_BUTTONS:
        try:
            loc = page.get_by_role("button", name=re.compile(rf"^{re.escape(label)}$", re.I))
            if loc.count() > 0:
                loc.first.click(timeout=1500)
                page.wait_for_timeout(400)
                break
        except Exception:
            pass
    try:
        page.evaluate(
            """(selectors) => {
              for (const sel of selectors) {
                try {
                  document.querySelectorAll(sel).forEach((el) => {
                    el.style.setProperty('display', 'none', 'important');
                    el.style.setProperty('visibility', 'hidden', 'important');
                    el.style.setProperty('pointer-events', 'none', 'important');
                  });
                } catch (e) {}
              }
            }""",
            HIDE_SELECTORS,
        )
    except Exception:
        pass


def wait_for_paint(page) -> None:
    try:
        page.wait_for_load_state("networkidle", timeout=25000)
    except Exception:
        page.wait_for_load_state("domcontentloaded", timeout=15000)
    try:
        page.evaluate("() => document.fonts.ready")
    except Exception:
        pass
    page.wait_for_timeout(600)
    page.evaluate(
        """async () => {
          const step = Math.max(400, window.innerHeight * 0.8);
          const max = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
          for (let y = 0; y < max; y += step) {
            window.scrollTo(0, y);
            await new Promise((r) => setTimeout(r, 120));
          }
          window.scrollTo(0, 0);
        }"""
    )
    page.wait_for_timeout(800)


def safe_filename(url: str, fallback: str) -> str:
    parsed = urlparse(url)
    name = Path(parsed.path).name or fallback
    name = re.sub(r"[^a-zA-Z0-9._-]", "_", name)
    if len(name) > 80:
        stem, ext = Path(name).stem[:60], Path(name).suffix
        name = stem + ext
    return name or fallback


def download(url: str, dest: Path) -> bool:
    dest.parent.mkdir(parents=True, exist_ok=True)
    req = urllib.request.Request(
        url,
        headers={"User-Agent": "Mozilla/5.0 (compatible; WixSiteClone/1.0)"},
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            dest.write_bytes(resp.read())
        return True
    except Exception as exc:
        print(f"  skip asset {url[:90]} ({exc})", file=sys.stderr)
        return False


def write_inventory(out: Path, data: dict, pages: list[dict]) -> None:
    layout = data.get("layout") or {}
    lines = [
        f"# Source inventory",
        f"- URL: {data.get('url')}",
        f"- Title: {data.get('title')}",
        f"- Engine: {data.get('engine')}",
        f"- Language: {data.get('language')}",
        f"- Viewport captured: {data.get('viewport')}",
        "",
        "## Layout",
        f"- Content max-width (estimated): {layout.get('contentMaxWidth')}",
        f"- Header height: {layout.get('headerHeight')}",
        f"- Header position: {layout.get('headerPosition')}",
        f"- Header background: {layout.get('headerBackground')}",
        f"- Body background: {layout.get('bodyBackground')}",
        "",
        "## Pages",
    ]
    for p in pages:
        lines.append(f"- `{p['path']}` → slug `{p['slug']}` ({p.get('title') or ''})")
    lines += ["", "## Nav"]
    for item in data.get("nav") or []:
        lines.append(f"- {item.get('text')}: {item.get('href')}")
    lines += ["", "## Type styles (most common first)"]
    for i, t in enumerate(data.get("typeStyles") or [], 1):
        lines.append(
            f"{i}. {t.get('fontSize')} / w{t.get('fontWeight')} / {t.get('color')} / "
            f"lh {t.get('lineHeight')} / ls {t.get('letterSpacing')} / {t.get('textTransform')} — "
            f"`{t.get('fontFamily')}` — samples: {t.get('samples')}"
        )
    lines += ["", "## Colors"]
    for c in (data.get("colors") or [])[:20]:
        lines.append(f"- {c.get('value')} ({c.get('count')}×, {', '.join(c.get('roles') or [])})")
    lines += ["", "## Sections (first page, document order)"]
    for i, s in enumerate(data.get("sections") or [], 1):
        lines.append(
            f"{i}. y={s.get('y')} h={s.get('height')} bg={s.get('backgroundColor')} "
            f"— {s.get('heading') or s.get('textPreview')}"
        )
    lines += ["", "## Buttons"]
    for b in data.get("buttons") or []:
        lines.append(
            f"- “{b.get('text')}” {b.get('width')}×{b.get('height')} "
            f"bg={b.get('backgroundColor')} color={b.get('color')} radius={b.get('borderRadius')} "
            f"padding={b.get('padding')} border={b.get('border')}"
        )
    lines += ["", "## Fonts loaded", ""]
    for f in data.get("fontsLoaded") or []:
        lines.append(f"- {f.get('family')} {f.get('weight')} {f.get('style')} ({f.get('status')})")
    lines += ["", "## Substitutions", "- (fill if a Wix font cannot be self-hosted)", ""]
    (out / "inventory.md").write_text("\n".join(lines), encoding="utf-8")


def tokens_css(data: dict) -> str:
    layout = data.get("layout") or {}
    colors = data.get("colors") or []
    lines = [":root {"]
    if layout.get("contentMaxWidth"):
        lines.append(f"  --content-max: {layout['contentMaxWidth']}px;")
    if layout.get("headerHeight"):
        lines.append(f"  --header-h: {layout['headerHeight']}px;")
    if layout.get("bodyBackground"):
        lines.append(f"  --color-bg: {layout['bodyBackground']};")
    for i, c in enumerate(colors[:12]):
        val = c.get("value")
        if val:
            lines.append(f"  --captured-color-{i + 1}: {val};")
    families = []
    for t in data.get("typeStyles") or []:
        fam = (t.get("fontFamily") or "").split(",")[0].strip().strip("\"'")
        if fam and fam not in families:
            families.append(fam)
    for i, fam in enumerate(families[:4]):
        lines.append(f"  --font-{i + 1}: {fam}, sans-serif;")
    lines.append("}")
    return "\n".join(lines) + "\n"


def parse_pages_arg(raw: str | None) -> list[str] | None:
    if not raw:
        return None
    return [p.strip() if p.strip().startswith("/") else "/" + p.strip() for p in raw.split(",") if p.strip()]


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Capture a live Wix site into design-capture/source for a 97% visual clone."
    )
    parser.add_argument("--url", required=True, help="Homepage URL of the Wix site")
    parser.add_argument("--out", default="design-capture", help="Output root (default: design-capture)")
    parser.add_argument("--pages", default=None, help="Comma-separated paths, e.g. /,/about,/kontakt")
    parser.add_argument("--max-pages", type=int, default=12, help="Cap auto-discovered pages (default 12)")
    parser.add_argument("--skip-assets", action="store_true", help="Do not download images/fonts")
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

    script_dir = Path(__file__).resolve().parent
    extractor = load_extractor(script_dir)
    out_root = Path(args.out).resolve()
    source = out_root / "source"
    shots = source / "screenshots"
    assets = source / "assets"
    source.mkdir(parents=True, exist_ok=True)
    shots.mkdir(parents=True, exist_ok=True)

    start_url = args.url
    wanted = parse_pages_arg(args.pages)
    viewport_names = [v.strip() for v in args.viewports.split(",") if v.strip()]
    for name in viewport_names:
        if name not in VIEWPORTS:
            print(f"Unknown viewport {name}. Use desktop,tablet,mobile.", file=sys.stderr)
            return 1

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            viewport=VIEWPORTS["desktop"],
            device_scale_factor=1,
            locale="sv-SE",
        )
        page = context.new_page()
        print(f"Opening {start_url}", flush=True)
        page.goto(start_url, wait_until="domcontentloaded", timeout=60000)
        dismiss_chrome(page)
        wait_for_paint(page)

        origin = "{0.scheme}://{0.netloc}".format(urlparse(page.url))
        home_data = page.evaluate(extractor)

        paths = wanted
        if not paths:
            discovered = home_data.get("sameOriginPaths") or ["/"]
            if "/" not in discovered:
                discovered = ["/"] + discovered
            paths = []
            for path in discovered:
                if "booking-calendar" in path or "bookings" in path:
                    continue
                if path not in paths:
                    paths.append(path)
            paths = paths[: max(1, args.max_pages)]

        pages_meta = []
        first_inventory = None

        for path in paths:
            url = urljoin(origin + "/", path.lstrip("/")) if path != "/" else (origin + "/")
            # Preserve original homepage URL if path is /
            if path == "/":
                url = start_url
            slug = slugify(path)
            print(f"Page {path} ({slug})", flush=True)
            if page.url.rstrip("/") != url.rstrip("/"):
                page.goto(url, wait_until="domcontentloaded", timeout=60000)
                dismiss_chrome(page)
                wait_for_paint(page)

            page_data = page.evaluate(extractor)
            if first_inventory is None:
                first_inventory = page_data

            (source / f"tokens-{slug}.json").write_text(
                json.dumps(page_data, indent=2, ensure_ascii=False), encoding="utf-8"
            )
            pages_meta.append({"path": path, "slug": slug, "title": page_data.get("title"), "url": page.url})

            for vp_name in viewport_names:
                vp = VIEWPORTS[vp_name]
                page.set_viewport_size({"width": vp["width"], "height": vp["height"]})
                dismiss_chrome(page)
                wait_for_paint(page)
                vp_data = page.evaluate(extractor)
                dest_dir = shots / vp_name / slug
                dest_dir.mkdir(parents=True, exist_ok=True)
                page.screenshot(path=str(dest_dir / "full.png"), full_page=True)
                print(f"  screenshot {vp_name}/full.png")

                sections = vp_data.get("sections") or []
                for i, sec in enumerate(sections[:18], 1):
                    y, h = sec.get("y") or 0, sec.get("height") or 0
                    if h < 50:
                        continue
                    clip_h = min(h, 4000)
                    try:
                        page.screenshot(
                            path=str(dest_dir / f"section-{i:02d}.png"),
                            clip={
                                "x": 0,
                                "y": max(0, y),
                                "width": vp["width"],
                                "height": clip_h,
                            },
                        )
                    except Exception:
                        pass

                if vp_name == "desktop":
                    hover_dir = source / "hovers" / slug
                    hover_dir.mkdir(parents=True, exist_ok=True)
                    for i, btn in enumerate((vp_data.get("buttons") or [])[:6], 1):
                        text = btn.get("text") or ""
                        if not text:
                            continue
                        loc = page.get_by_text(text, exact=True).first
                        try:
                            if loc.count() > 0:
                                loc.hover(timeout=1500)
                                page.wait_for_timeout(200)
                                loc.screenshot(path=str(hover_dir / f"cta-{i:02d}.png"))
                        except Exception:
                            pass

            page.set_viewport_size(VIEWPORTS["desktop"])

        if first_inventory is None:
            print("No page data captured.", file=sys.stderr)
            browser.close()
            return 1

        (source / "tokens.json").write_text(
            json.dumps(first_inventory, indent=2, ensure_ascii=False), encoding="utf-8"
        )
        (source / "pages.json").write_text(
            json.dumps({"origin": origin, "startUrl": start_url, "pages": pages_meta}, indent=2, ensure_ascii=False),
            encoding="utf-8",
        )
        (source / "fonts.json").write_text(
            json.dumps(
                {
                    "loaded": first_inventory.get("fontsLoaded"),
                    "files": first_inventory.get("fontFiles"),
                },
                indent=2,
                ensure_ascii=False,
            ),
            encoding="utf-8",
        )
        (source / "tokens.css").write_text(tokens_css(first_inventory), encoding="utf-8")
        write_inventory(source, first_inventory, pages_meta)

        if not args.skip_assets:
            print("Downloading assets…")
            urls = []
            for img in first_inventory.get("images") or []:
                if img.get("src"):
                    urls.append(img["src"])
            urls.extend(first_inventory.get("backgroundImageUrls") or [])
            urls.extend(first_inventory.get("fontFiles") or [])
            for v in first_inventory.get("videos") or []:
                urls.extend([v.get("src"), v.get("poster")])
            if first_inventory.get("favicon"):
                urls.append(first_inventory["favicon"])
            seen = set()
            mapping = []
            for url in urls:
                if not url or url in seen or url.startswith("blob:"):
                    continue
                seen.add(url)
                name = safe_filename(url, f"asset-{len(mapping)+1}")
                dest = assets / name
                if dest.exists():
                    dest = assets / f"{dest.stem}-{len(mapping)}{dest.suffix}"
                if download(url, dest):
                    mapping.append({"url": url, "file": str(dest.relative_to(source)).replace("\\", "/")})
            (source / "asset-map.json").write_text(
                json.dumps(mapping, indent=2, ensure_ascii=False), encoding="utf-8"
            )
            print(f"  {len(mapping)} files → {assets}")

        browser.close()

    print(f"Done. Read {source / 'inventory.md'} before writing UI code.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
