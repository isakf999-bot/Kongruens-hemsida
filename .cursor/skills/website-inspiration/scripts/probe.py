#!/usr/bin/env python3
"""Dump inspect.json for a live URL — no screenshots.

(Named ``probe.py`` rather than ``inspect.py`` so it does not shadow the
Python standard-library ``inspect`` module for other packages we import,
such as Playwright.)
"""

from __future__ import annotations

import argparse
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from common import out_dir, write_json  # noqa: E402
from inspect_page import inspect_page  # noqa: E402


def _playwright():
    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        print(
            "Playwright is not installed.\n"
            "  pip install playwright\n"
            "  python -m playwright install chromium",
            file=sys.stderr,
        )
        sys.exit(1)
    return sync_playwright


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Dump inspect.json for a live URL (stack, tokens, nav, landmarks)."
    )
    parser.add_argument("url", help="https URL of the page to inspect")
    parser.add_argument(
        "--out",
        default="references/inspiration",
        help="project-relative output root (default: references/inspiration)",
    )
    parser.add_argument("--timeout", type=int, default=45)
    args = parser.parse_args()

    if not args.url.startswith(("http://", "https://")):
        parser.error("url must start with http:// or https://")

    dest_root = Path(args.out)
    if not dest_root.is_absolute():
        dest_root = Path.cwd() / dest_root
    site_dir = out_dir(dest_root, args.url)

    sync_playwright = _playwright()
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.set_default_timeout(args.timeout * 1000)
        page.goto(args.url, wait_until="domcontentloaded")
        try:
            page.wait_for_load_state("networkidle", timeout=15000)
        except Exception:
            page.wait_for_timeout(1500)
        data = inspect_page(page, args.url)
        data["inspectedAt"] = datetime.now(timezone.utc).isoformat()
        browser.close()

    path = site_dir / "inspect.json"
    write_json(path, data)
    stack = data.get("stack", {})
    frameworks = ", ".join(item["name"] for item in stack.get("frameworks", []))
    print(f"Wrote {path}")
    print(f"Title: {data.get('title')}")
    print(f"Stack: {frameworks or 'Unknown'}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
