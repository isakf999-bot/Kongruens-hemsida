#!/usr/bin/env python3
"""Interaction discovery — surface UI states a static screenshot misses.

Given a URL, this tries the interactions humans use to understand a site:

  · Open the mobile hamburger menu
  · Open desktop dropdowns (aria-haspopup, hover-menus)
  · Expand an accordion / details / FAQ item
  · Switch to a second tab in a tablist
  · Hover the primary CTA in the header

Each successful interaction produces a screenshot under
`screenshots/interactions/` and a structured entry in `interactions.json`.
Interactions we could not open are recorded with `success=false` so the
downstream analysis is honest about what was actually observed.
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
    ACCORDION_SELECTORS,
    CTA_SELECTORS,
    DROPDOWN_TRIGGER_SELECTORS,
    MENU_BUTTON_SELECTORS,
    TAB_SELECTORS,
    VIEWPORTS,
    interactions_dir,
    out_dir,
    rel_to,
    write_json,
)


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


def _first_visible(page, selectors):
    for sel in selectors:
        loc = page.locator(sel).first
        try:
            if loc.count() == 0:
                continue
            if loc.is_visible():
                return loc, sel
        except Exception:
            continue
    return None, None


def _record(site_dir: Path, dest: Path, kind: str, viewport: str,
            selector: str | None, label: str, success: bool,
            note: str | None = None, extras: dict | None = None) -> dict:
    entry = {
        "kind": kind,
        "viewport": viewport,
        "label": label,
        "selector": selector,
        "success": success,
        "screenshot": rel_to(site_dir, dest) if success else None,
    }
    if note:
        entry["note"] = note
    if extras:
        entry.update(extras)
    return entry


def try_hamburger(page, site_dir: Path, viewport: str) -> dict:
    dest_dir = interactions_dir(site_dir)
    dest = dest_dir / f"hamburger-{viewport}-open.png"
    btn, sel = _first_visible(page, MENU_BUTTON_SELECTORS)
    if btn is None:
        return _record(site_dir, dest, "hamburger", viewport, None,
                       "Hamburger menu", False,
                       note="No menu button visible at this viewport.")
    try:
        text = (btn.inner_text() or "").strip()[:40]
        label = f"Menu toggle ({text or 'unlabeled'})"
        if btn.get_attribute("aria-expanded") != "true":
            btn.click(timeout=4_000)
            page.wait_for_timeout(500)
        page.screenshot(path=str(dest))
        page.keyboard.press("Escape")
        page.wait_for_timeout(250)
        return _record(site_dir, dest, "hamburger", viewport, sel, label, True)
    except Exception as exc:
        return _record(site_dir, dest, "hamburger", viewport, sel,
                       "Hamburger menu", False, note=str(exc))


def try_dropdowns(page, site_dir: Path, viewport: str, limit: int = 4) -> list[dict]:
    dest_dir = interactions_dir(site_dir)
    results: list[dict] = []
    seen: set[str] = set()

    for sel in DROPDOWN_TRIGGER_SELECTORS:
        for handle in page.locator(sel).element_handles():
            try:
                if not handle.is_visible():
                    continue
                text = (handle.inner_text() or "").strip()
                if not text or text in seen:
                    continue
                seen.add(text)
                slug = "".join(c.lower() if c.isalnum() else "-" for c in text)[:40].strip("-")
                dest = dest_dir / f"dropdown-{viewport}-{slug or 'trigger'}.png"

                # Hover first (many menus open on hover), then click as fallback.
                try:
                    handle.hover(timeout=2_000)
                    page.wait_for_timeout(350)
                    page.screenshot(path=str(dest))
                    opened_via = "hover"
                except Exception:
                    handle.click(timeout=2_000)
                    page.wait_for_timeout(350)
                    page.screenshot(path=str(dest))
                    opened_via = "click"

                results.append(_record(
                    site_dir, dest, "dropdown", viewport, sel,
                    f"Dropdown: {text[:60]}", True,
                    extras={"trigger": text[:80], "openedVia": opened_via},
                ))
                page.mouse.move(0, 0)
                page.keyboard.press("Escape")
                page.wait_for_timeout(200)
                if len(results) >= limit:
                    return results
            except Exception as exc:
                results.append(_record(
                    site_dir, dest_dir / "dropdown-failed.png", "dropdown", viewport,
                    sel, "Dropdown probe", False, note=str(exc),
                ))
    return results


def try_accordion(page, site_dir: Path, viewport: str) -> dict:
    dest_dir = interactions_dir(site_dir)
    dest = dest_dir / f"accordion-{viewport}-open.png"
    trigger, sel = _first_visible(page, ACCORDION_SELECTORS)
    if trigger is None:
        return _record(site_dir, dest, "accordion", viewport, None,
                       "Accordion / FAQ", False, note="No accordion visible.")
    try:
        trigger.scroll_into_view_if_needed(timeout=2_500)
        trigger.click(timeout=2_500)
        page.wait_for_timeout(350)
        page.screenshot(path=str(dest))
        return _record(site_dir, dest, "accordion", viewport, sel,
                       "Accordion opened", True)
    except Exception as exc:
        return _record(site_dir, dest, "accordion", viewport, sel,
                       "Accordion", False, note=str(exc))


def try_tab(page, site_dir: Path, viewport: str) -> dict:
    dest_dir = interactions_dir(site_dir)
    dest = dest_dir / f"tab-{viewport}-second.png"
    tabs = page.locator("[role='tab']")
    if tabs.count() < 2:
        return _record(site_dir, dest, "tab", viewport, None,
                       "Second tab", False, note="Fewer than two tabs.")
    try:
        second = tabs.nth(1)
        second.scroll_into_view_if_needed(timeout=2_000)
        second.click(timeout=2_000)
        page.wait_for_timeout(300)
        page.screenshot(path=str(dest))
        return _record(site_dir, dest, "tab", viewport, TAB_SELECTORS[0],
                       "Second tab selected", True)
    except Exception as exc:
        return _record(site_dir, dest, "tab", viewport, TAB_SELECTORS[0],
                       "Second tab", False, note=str(exc))


def try_hover_cta(page, site_dir: Path, viewport: str) -> dict:
    dest_dir = interactions_dir(site_dir)
    dest = dest_dir / f"hover-cta-{viewport}.png"
    cta, sel = _first_visible(page, CTA_SELECTORS)
    if cta is None:
        return _record(site_dir, dest, "hover", viewport, None,
                       "Header CTA hover", False, note="No obvious CTA visible.")
    try:
        cta.scroll_into_view_if_needed(timeout=2_000)
        cta.hover(timeout=2_000)
        page.wait_for_timeout(200)
        page.screenshot(path=str(dest))
        return _record(site_dir, dest, "hover", viewport, sel,
                       "Header CTA hover state", True)
    except Exception as exc:
        return _record(site_dir, dest, "hover", viewport, sel,
                       "Header CTA hover", False, note=str(exc))


def discover(url: str, site_dir: Path, timeout: int) -> dict:
    sync_playwright = _playwright()
    report: dict = {
        "url": url,
        "capturedAt": datetime.now(timezone.utc).isoformat(),
        "interactions": [],
    }

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(locale="sv-SE")
        page = context.new_page()
        page.set_default_timeout(timeout * 1000)

        print(f"Loading {url}")
        page.goto(url, wait_until="domcontentloaded")
        try:
            page.wait_for_load_state("networkidle", timeout=8_000)
        except Exception:
            page.wait_for_timeout(1_500)

        # Desktop first — dropdowns/hovers live here.
        vp = VIEWPORTS["desktop"]
        page.set_viewport_size({"width": vp["width"], "height": vp["height"]})
        page.wait_for_timeout(300)
        print("Desktop pass…")
        report["interactions"].extend(try_dropdowns(page, site_dir, "desktop"))
        report["interactions"].append(try_hover_cta(page, site_dir, "desktop"))
        report["interactions"].append(try_accordion(page, site_dir, "desktop"))
        report["interactions"].append(try_tab(page, site_dir, "desktop"))

        # Mobile — hamburger, and stacked accordions if they re-appear.
        vp = VIEWPORTS["mobile"]
        page.set_viewport_size({"width": vp["width"], "height": vp["height"]})
        page.wait_for_timeout(400)
        try:
            page.reload(wait_until="domcontentloaded")
            page.wait_for_load_state("networkidle", timeout=6_000)
        except Exception:
            page.wait_for_timeout(500)
        print("Mobile pass…")
        report["interactions"].append(try_hamburger(page, site_dir, "mobile"))
        report["interactions"].append(try_accordion(page, site_dir, "mobile"))

        browser.close()

    return report


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Trigger and screenshot UI states a static capture misses."
    )
    parser.add_argument("url", help="https URL of the page to interact with")
    parser.add_argument("--out", default="references/inspiration",
                        help="project-relative output root (default: references/inspiration)")
    parser.add_argument("--timeout", type=int, default=30)
    args = parser.parse_args()

    if not args.url.startswith(("http://", "https://")):
        parser.error("url must start with http:// or https://")

    dest_root = Path(args.out)
    if not dest_root.is_absolute():
        dest_root = Path.cwd() / dest_root
    site_dir = out_dir(dest_root, args.url)

    report = discover(args.url, site_dir, args.timeout)
    write_json(site_dir / "interactions.json", report)

    ok = [i for i in report["interactions"] if i["success"]]
    missed = [i for i in report["interactions"] if not i["success"]]
    print(f"\nCaptured {len(ok)} interaction(s); {len(missed)} not observable.")
    for i in ok:
        print(f"  · {i['viewport']:>7}  {i['kind']:<10}  {i['label']}")
    for i in missed:
        print(f"  · missed  {i['kind']:<10}  {i.get('note') or ''}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
