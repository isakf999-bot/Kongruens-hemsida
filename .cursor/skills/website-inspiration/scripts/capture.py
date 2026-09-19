#!/usr/bin/env python3
"""Capture a reference site at desktop / tablet / mobile — for one page or many.

Every viewport gets:
  full.png                  — full scrollable page
  header.png / footer.png   — clipped landmarks when visible
  hero.png                  — the first section
  01-top.png .. NN-bottom.png — vertical stripes so you can read the whole
                              page as tiles (real designers scroll — you should
                              too)
  menu-open.png             — mobile/tablet: hamburger opened, if any

Multi-page mode reads `sitemap.json` (from crawl.py) and captures each entry.
Everything is registered in `visual-inventory.json` so downstream steps
(analysis, blueprint, comparison) know what evidence exists.
"""

from __future__ import annotations

import argparse
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from common import (  # noqa: E402
    FOOTER_SELECTORS,
    HEADER_SELECTORS,
    HERO_SELECTORS,
    MENU_BUTTON_SELECTORS,
    VIEWPORTS,
    out_dir,
    page_slug,
    pages_dir,
    read_json,
    rel_to,
    screenshots_dir,
    write_json,
)
from inspect_page import inspect_page  # noqa: E402


STRIPE_HEIGHT_RATIO = 0.9  # each stripe ≈ 90% of viewport height


def _playwright():
    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        print(
            "Playwright is not installed.\n"
            "  pip install playwright\n"
            "  python -m playwright install chromium\n"
            "Or capture with Cursor browser tools instead.",
            file=sys.stderr,
        )
        sys.exit(1)
    return sync_playwright


def first_visible(page, selectors):
    for selector in selectors:
        loc = page.locator(selector).first
        try:
            if loc.count() == 0:
                continue
            if loc.is_visible():
                return loc
        except Exception:
            continue
    return None


def clip(page, selectors, dest: Path) -> bool:
    loc = first_visible(page, selectors)
    if loc is None:
        return False
    try:
        loc.screenshot(path=str(dest))
        return True
    except Exception as exc:
        print(f"  skip {dest.name}: {exc}")
        return False


def open_menu(page) -> bool:
    btn = first_visible(page, MENU_BUTTON_SELECTORS)
    if btn is None:
        return False
    try:
        if btn.get_attribute("aria-expanded") == "true":
            return True
        btn.click(timeout=4_000)
        page.wait_for_timeout(400)
        return True
    except Exception as exc:
        print(f"  menu click failed: {exc}")
        return False


def close_menu(page) -> None:
    try:
        page.keyboard.press("Escape")
        page.wait_for_timeout(200)
    except Exception:
        pass


def capture_stripes(page, dest: Path, viewport_h: int) -> list[dict]:
    """Scroll top → bottom, take one screenshot per stripe. Restore scroll."""
    page_h = page.evaluate("() => document.documentElement.scrollHeight") or viewport_h
    step = max(200, int(viewport_h * STRIPE_HEIGHT_RATIO))
    y = 0
    stripes: list[dict] = []
    idx = 1
    while y < page_h and idx <= 12:
        page.evaluate(f"window.scrollTo(0, {y})")
        page.wait_for_timeout(220)
        label = (
            f"{idx:02d}-top" if idx == 1
            else f"{idx:02d}-bottom" if y + viewport_h >= page_h
            else f"{idx:02d}-mid"
        )
        path = dest / f"{label}.png"
        page.screenshot(path=str(path), full_page=False)
        stripes.append({"index": idx, "y": y, "file": path.name})
        y += step
        idx += 1
    page.evaluate("window.scrollTo(0, 0)")
    page.wait_for_timeout(150)
    return stripes


def capture_page_viewport(
    page,
    viewport: str,
    site_dir: Path,
    slug: str,
    full_page: bool,
    do_stripes: bool,
) -> dict:
    dest = screenshots_dir(site_dir, viewport, slug)
    vp = VIEWPORTS[viewport]
    page.set_viewport_size({"width": vp["width"], "height": vp["height"]})
    page.wait_for_timeout(350)

    shots: dict = {"dir": rel_to(site_dir, dest), "files": {}}

    if full_page:
        full = dest / "full.png"
        try:
            page.screenshot(path=str(full), full_page=True)
            shots["files"]["full"] = full.name
        except Exception as exc:
            print(f"  full-page shot failed: {exc}")

    if clip(page, HEADER_SELECTORS, dest / "header.png"):
        shots["files"]["header"] = "header.png"
    if clip(page, HERO_SELECTORS, dest / "hero.png"):
        shots["files"]["hero"] = "hero.png"
    if clip(page, FOOTER_SELECTORS, dest / "footer.png"):
        shots["files"]["footer"] = "footer.png"

    if do_stripes:
        shots["stripes"] = capture_stripes(page, dest, vp["height"])

    if viewport in {"mobile", "tablet"}:
        if open_menu(page):
            path = dest / "menu-open.png"
            page.screenshot(path=str(path))
            shots["files"]["menu-open"] = path.name
            close_menu(page)
        else:
            shots["files"]["menu-open"] = None

    return shots


def load_pages(args) -> list[dict]:
    """Resolve which pages to capture."""
    if args.sitemap:
        data = read_json(Path(args.sitemap))
        if isinstance(data, dict) and isinstance(data.get("pages"), list):
            return data["pages"]
    if args.pages:
        return [{"url": u, "slug": page_slug(u)} for u in args.pages]
    return [{"url": args.url, "slug": "home"}]


def resolve_viewports(args) -> list[str]:
    names = ["desktop"]
    if not args.skip_tablet:
        names.append("tablet")
    names.append("mobile")
    return names


def main() -> int:
    parser = argparse.ArgumentParser(
        description=(
            "Screenshot a live site (or a batch of pages) at desktop/tablet/mobile "
            "and write per-page inspect.json + a top-level visual-inventory.json."
        )
    )
    parser.add_argument("url",
                        help="https URL - the homepage (single-page mode) OR the seed for --sitemap")
    parser.add_argument("--out", default="references/inspiration",
                        help="project-relative output root (default: references/inspiration)")
    parser.add_argument("--sitemap",
                        help="path to sitemap.json from crawl.py (multi-page mode)")
    parser.add_argument("--pages", nargs="*",
                        help="explicit list of URLs to capture (overrides sitemap)")
    parser.add_argument("--skip-tablet", action="store_true")
    parser.add_argument("--no-full-page", action="store_true")
    parser.add_argument("--no-stripes", action="store_true",
                        help="skip the top-to-bottom stripe screenshots")
    parser.add_argument("--timeout", type=int, default=45,
                        help="navigation timeout seconds")
    args = parser.parse_args()

    if not args.url.startswith(("http://", "https://")):
        parser.error("url must start with http:// or https://")

    dest_root = Path(args.out)
    if not dest_root.is_absolute():
        dest_root = Path.cwd() / dest_root
    site_dir = out_dir(dest_root, args.url)

    pages = load_pages(args)
    viewports = resolve_viewports(args)

    sync_playwright = _playwright()
    inventory: dict = {
        "seed": args.url,
        "capturedAt": datetime.now(timezone.utc).isoformat(),
        "output": str(site_dir),
        "viewports": viewports,
        "pages": [],
    }

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(locale="sv-SE")
        page = context.new_page()
        page.set_default_timeout(args.timeout * 1000)

        for i, item in enumerate(pages):
            url = item["url"]
            slug = item.get("slug") or page_slug(url)
            print(f"[{i + 1}/{len(pages)}] {url}  ->  {slug}")
            try:
                page.goto(url, wait_until="domcontentloaded")
            except Exception as exc:
                print(f"  skip {url}: {exc}")
                continue
            try:
                page.wait_for_load_state("networkidle", timeout=12_000)
            except Exception:
                page.wait_for_timeout(1_200)

            inspect = inspect_page(page, url)
            per_page_dir = pages_dir(site_dir, slug)
            write_json(per_page_dir / "inspect.json", inspect)

            # Also mirror the homepage inspect at the top level for convenience.
            if slug == "home":
                write_json(site_dir / "inspect.json", inspect)

            page_entry: dict = {
                "url": url,
                "slug": slug,
                "title": inspect.get("title"),
                "inspect": rel_to(site_dir, per_page_dir / "inspect.json"),
                "shots": {},
            }
            for name in viewports:
                print(f"    · {name}")
                page_entry["shots"][name] = capture_page_viewport(
                    page,
                    viewport=name,
                    site_dir=site_dir,
                    slug=slug,
                    full_page=not args.no_full_page,
                    do_stripes=not args.no_stripes,
                )
            inventory["pages"].append(page_entry)

        browser.close()

    write_json(site_dir / "visual-inventory.json", inventory)
    print(f"\nDone. Screenshots in {site_dir / 'screenshots'}")
    print(f"Inventory: {site_dir / 'visual-inventory.json'}")
    print("Next: run interact.py for dropdowns/accordions, then write analysis.md + structure.md.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
