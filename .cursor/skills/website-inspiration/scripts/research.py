#!/usr/bin/env python3
"""One-command research: crawl → capture (multi-page) → interact → scaffold.

For most reference sites this is the only script you need to run manually.
It leaves behind a persistent research library:

  references/inspiration/<host>/
    sitemap.json
    inspect.json  +  pages/<slug>/inspect.json
    interactions.json
    visual-inventory.json
    screenshots/{desktop,tablet,mobile}/<slug>/…  + interactions/…
    analysis.md, structure.md, content-map.md,
    implementation-plan.md, comparison.md   (scaffolded from templates)
    research-report.json

You fill in the markdown files based on the screenshots + JSON.
"""

from __future__ import annotations

import argparse
import json
import shutil
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from capture import capture_page_viewport, load_pages, resolve_viewports  # noqa: E402
from common import (  # noqa: E402
    host_slug,
    out_dir,
    page_slug,
    pages_dir,
    rel_to,
    write_json,
)
from crawl import crawl  # noqa: E402
from inspect_page import inspect_page  # noqa: E402
from interact import discover  # noqa: E402


ASSETS = ROOT.parent / "assets"
TEMPLATES = {
    "analysis.md": "analysis-report.md",
    "structure.md": "blueprint-template.md",
    "content-map.md": "content-map-template.md",
    "implementation-plan.md": "implementation-plan-template.md",
    "comparison.md": "comparison-template.md",
}


def scaffold_docs(site_dir: Path, meta: dict) -> list[str]:
    """Copy templates into the library, only when they do not already exist."""
    written: list[str] = []
    for dest_name, source_name in TEMPLATES.items():
        dest = site_dir / dest_name
        src = ASSETS / source_name
        if dest.exists() or not src.exists():
            continue
        body = src.read_text(encoding="utf-8")
        for key, value in meta.items():
            body = body.replace("{{" + key + "}}", value)
        dest.write_text(body, encoding="utf-8")
        written.append(dest_name)
    return written


def playwright_or_die():
    try:
        from playwright.sync_api import sync_playwright  # noqa: F401
    except ImportError:
        print(
            "Playwright is not installed.\n"
            "  pip install playwright\n"
            "  python -m playwright install chromium",
            file=sys.stderr,
        )
        sys.exit(1)


def do_capture(pages: list[dict], viewports: list[str], site_dir: Path,
               no_full_page: bool, no_stripes: bool, timeout: int) -> dict:
    from playwright.sync_api import sync_playwright  # imported after check

    inventory: dict = {
        "capturedAt": datetime.now(timezone.utc).isoformat(),
        "viewports": viewports,
        "pages": [],
    }

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(locale="sv-SE")
        page = context.new_page()
        page.set_default_timeout(timeout * 1000)

        for i, item in enumerate(pages):
            url = item["url"]
            slug = item.get("slug") or page_slug(url)
            print(f"[{i + 1}/{len(pages)}] capture  {url}  ->  {slug}")
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
            per_page = pages_dir(site_dir, slug)
            write_json(per_page / "inspect.json", inspect)
            if slug == "home":
                write_json(site_dir / "inspect.json", inspect)

            entry: dict = {
                "url": url,
                "slug": slug,
                "title": inspect.get("title"),
                "inspect": rel_to(site_dir, per_page / "inspect.json"),
                "shots": {},
            }
            for vp in viewports:
                print(f"    · {vp}")
                entry["shots"][vp] = capture_page_viewport(
                    page,
                    viewport=vp,
                    site_dir=site_dir,
                    slug=slug,
                    full_page=not no_full_page,
                    do_stripes=not no_stripes,
                )
            inventory["pages"].append(entry)

        browser.close()

    return inventory


def main() -> int:
    parser = argparse.ArgumentParser(
        description=(
            "Full research pass on a reference site: crawl + capture + interact + scaffold."
        )
    )
    parser.add_argument("url", help="https URL of the homepage")
    parser.add_argument("--out", default="references/inspiration",
                        help="project-relative output root")
    parser.add_argument("--pages-limit", type=int, default=6,
                        help="max subpages to include (default: 6)")
    parser.add_argument("--only-home", action="store_true",
                        help="skip crawl and only research the homepage")
    parser.add_argument("--skip-tablet", action="store_true")
    parser.add_argument("--no-full-page", action="store_true")
    parser.add_argument("--no-stripes", action="store_true")
    parser.add_argument("--no-interact", action="store_true")
    parser.add_argument("--timeout", type=int, default=45)
    args = parser.parse_args()

    if not args.url.startswith(("http://", "https://")):
        parser.error("url must start with http:// or https://")

    playwright_or_die()

    dest_root = Path(args.out)
    if not dest_root.is_absolute():
        dest_root = Path.cwd() / dest_root
    site_dir = out_dir(dest_root, args.url)

    # 1. Crawl (or degrade to homepage-only)
    if args.only_home:
        sitemap = {
            "start": args.url,
            "host": host_slug(args.url),
            "pages": [{"url": args.url, "slug": "home", "source": "seed", "score": 0}],
        }
    else:
        print("== Crawl ==")
        sitemap = crawl(args.url, limit=args.pages_limit)
        for p in sitemap["pages"]:
            print(f"  [{p['source']:>7}]  {p['url']}")
    write_json(site_dir / "sitemap.json", sitemap)

    # 2. Capture every page + viewport
    print("\n== Capture ==")
    viewports = resolve_viewports(args)
    pages = load_pages(argparse.Namespace(
        url=args.url,
        sitemap=str(site_dir / "sitemap.json"),
        pages=None,
    ))
    inventory = do_capture(
        pages=pages,
        viewports=viewports,
        site_dir=site_dir,
        no_full_page=args.no_full_page,
        no_stripes=args.no_stripes,
        timeout=args.timeout,
    )
    inventory["seed"] = args.url
    write_json(site_dir / "visual-inventory.json", inventory)

    # 3. Interaction discovery (homepage — that is where nav lives)
    if args.no_interact:
        interactions = {"skipped": True}
    else:
        print("\n== Interact ==")
        interactions = discover(args.url, site_dir, args.timeout)
    write_json(site_dir / "interactions.json", interactions)

    # 4. Scaffold the analysis / blueprint markdown files
    print("\n== Scaffold ==")
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    written = scaffold_docs(site_dir, {
        "url": args.url,
        "host": host_slug(args.url),
        "title": (inventory["pages"][0].get("title") if inventory["pages"] else "") or "",
        "date": now,
    })
    for name in written:
        print(f"  · wrote {name}")

    # 5. Master report
    report = {
        "seed": args.url,
        "site": rel_to(dest_root, site_dir),
        "date": datetime.now(timezone.utc).isoformat(),
        "pages": [p["url"] for p in pages],
        "viewports": viewports,
        "counts": {
            "pages": len(inventory["pages"]),
            "interactionsOk": sum(1 for i in interactions.get("interactions", [])
                                  if isinstance(i, dict) and i.get("success")),
            "interactionsMissed": sum(1 for i in interactions.get("interactions", [])
                                      if isinstance(i, dict) and not i.get("success")),
        },
        "scaffolded": written,
    }
    write_json(site_dir / "research-report.json", report)

    print("\nResearch library ready:")
    print(f"  {site_dir}")
    print("\nNext:")
    print("  1. Skim screenshots and inspect.json.")
    print("  2. Fill in analysis.md and structure.md.")
    print("  3. In Reference->Ours mode, also fill content-map.md and implementation-plan.md.")
    print("  4. After you implement, capture our site and fill comparison.md.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
