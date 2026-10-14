"""Screenshot each top-level section of a route at its real scroll position.

  py scripts/sections.py <out-dir> <route> <width> <height> [prefix]

Scrolls each section into view first, so lazy images and scroll reveals run
the way a visitor sees them.
"""

import os
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

BASE = os.environ.get("BASE", "http://localhost:3001")


def main():
    out, route, w, h = Path(sys.argv[1]), sys.argv[2], int(sys.argv[3]), int(sys.argv[4])
    prefix = sys.argv[5] if len(sys.argv) > 5 else "s"
    out.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": w, "height": h})
        page.goto(BASE + route, wait_until="networkidle")
        page.wait_for_timeout(2200)
        sections = page.query_selector_all("main section, main > article, footer")
        for i, el in enumerate(sections):
            el.scroll_into_view_if_needed()
            page.mouse.wheel(0, 1)
            page.wait_for_timeout(1700)
            try:
                el.screenshot(path=str(out / f"{prefix}-{i}.png"))
            except Exception:
                pass  # display: contents has no box of its own
        browser.close()
    print(f"{len(sections)} sections")


if __name__ == "__main__":
    main()
