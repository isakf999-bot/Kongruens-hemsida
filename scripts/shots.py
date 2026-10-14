"""Full-page screenshots of every route at several widths.

  py scripts/shots.py <out-dir> [route-name ...] [--sizes desk,mob]

Scroll-reveal blocks are forced visible so the whole page shows.
"""

import os
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

BASE = os.environ.get("BASE", "http://localhost:3001")
ROUTES = {
    "home": "/",
    "about": "/about-5",
    "services": "/services",
    "kontakt": "/kontakt",
    "book": "/booking-calendar/personlig-v%C3%A4gledning",
}
SIZES = {
    "desk": (1440, 900),
    "mob": (390, 844),
    "small": (360, 640),
    "tab": (820, 1180),
    "wide": (1920, 1080),
}


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    out = Path(args[0])
    out.mkdir(parents=True, exist_ok=True)
    names = args[1:] or list(ROUTES)
    sizes = ["desk", "mob"]
    for a in sys.argv[1:]:
        if a.startswith("--sizes="):
            sizes = a.split("=", 1)[1].split(",")
    full = "--fold" not in sys.argv
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        errors = []
        page.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
        page.on("pageerror", lambda e: errors.append(str(e)))
        for name in names:
            for label in sizes:
                w, h = SIZES[label]
                page.set_viewport_size({"width": w, "height": h})
                for attempt in range(3):
                    try:
                        page.goto(BASE + ROUTES[name], wait_until="networkidle")
                        break
                    except Exception:
                        page.wait_for_timeout(1500)
                page.add_style_tag(content="nextjs-portal{display:none!important}")
                if full:
                    page.evaluate(
                        "document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-in'))"
                    )
                page.wait_for_timeout(1600)
                overflow = page.evaluate(
                    "document.documentElement.scrollWidth - document.documentElement.clientWidth"
                )
                if overflow > 0:
                    print(f"OVERFLOW {name} {label}: {overflow}px")
                page.screenshot(path=str(out / f"{name}-{label}.png"), full_page=full)
        browser.close()
        for e in dict.fromkeys(errors):
            print("CONSOLE:", e[:300])
    print("done")


if __name__ == "__main__":
    main()
