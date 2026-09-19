#!/usr/bin/env python3
"""Discover important internal pages of a reference site.

Priority order: header nav → footer nav → /sitemap.xml → same-host anchors on
the homepage. Result is a compact `sitemap.json` you can feed straight into
`capture.py --pages`.

Prioritizes pages that shape site structure (Services, Cases/Work, About,
Process, Contact) over blog/legal/pagination.
"""

from __future__ import annotations

import argparse
import re
import sys
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urljoin, urlparse

ROOT = Path(__file__).resolve().parent
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from common import out_dir, page_slug, unique, write_json  # noqa: E402


HIGH_PRIORITY = [
    "service", "tjanst", "tjänst", "work", "cases", "case", "portfolio",
    "arbeten", "referenser", "about", "om-oss", "om", "process", "sa-jobbar-vi",
    "priser", "pricing", "kontakt", "contact", "team", "faq",
]
LOW_PRIORITY = [
    "blog", "blogg", "news", "nyheter", "artikel", "article", "author",
    "tag", "kategori", "category", "page/", "print", "pdf",
]
SKIP_PATTERNS = re.compile(
    r"(mailto:|tel:|#|javascript:|\.pdf$|\.zip$|\.jpg$|\.png$|\.svg$|\.webp$)",
    re.IGNORECASE,
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


def _same_host(url: str, root_host: str) -> bool:
    host = (urlparse(url).hostname or "").lower().removeprefix("www.")
    return host == root_host


def _score(url: str) -> int:
    """Higher = more important. Homepage-adjacent structural pages first."""
    path = urlparse(url).path.lower()
    depth = len([p for p in path.split("/") if p])
    score = 100 - depth * 8
    for word in HIGH_PRIORITY:
        if word in path:
            score += 40
            break
    for word in LOW_PRIORITY:
        if word in path:
            score -= 60
            break
    if path in ("", "/"):
        score += 50
    return score


def _from_sitemap(page, base_url: str, root_host: str) -> list[str]:
    """Try /sitemap.xml — quiet if it isn't there or is HTML."""
    sitemap_url = urljoin(base_url, "/sitemap.xml")
    try:
        page.goto(sitemap_url, wait_until="domcontentloaded", timeout=15_000)
    except Exception:
        return []
    try:
        content = page.content()
        if "<urlset" not in content and "<sitemapindex" not in content:
            return []
        # Strip default namespace so ElementTree can query without a prefix.
        stripped = re.sub(r"\sxmlns=\"[^\"]+\"", "", content, count=1)
        root = ET.fromstring(stripped)
        urls = [loc.text.strip() for loc in root.iter("loc") if loc.text]
    except Exception:
        return []
    return [u for u in urls if _same_host(u, root_host) and not SKIP_PATTERNS.search(u)]


def _from_page(page, base_url: str, root_host: str, selectors: list[str]) -> list[str]:
    hrefs: list[str] = []
    for sel in selectors:
        for el in page.query_selector_all(sel):
            href = el.get_attribute("href")
            if not href or SKIP_PATTERNS.search(href):
                continue
            absolute = urljoin(base_url, href.split("#", 1)[0])
            if _same_host(absolute, root_host):
                hrefs.append(absolute.rstrip("/") or absolute)
    return hrefs


def crawl(base_url: str, limit: int = 8) -> dict:
    sync_playwright = _playwright()
    parsed = urlparse(base_url)
    root_host = (parsed.hostname or "").lower().removeprefix("www.")

    header_urls: list[str] = []
    footer_urls: list[str] = []
    body_urls: list[str] = []
    sitemap_urls: list[str] = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(locale="sv-SE")
        page.set_default_timeout(30_000)

        print(f"Loading {base_url}")
        page.goto(base_url, wait_until="domcontentloaded")
        try:
            page.wait_for_load_state("networkidle", timeout=8_000)
        except Exception:
            page.wait_for_timeout(1_200)

        header_urls = _from_page(page, base_url, root_host,
                                 ["header a[href]", "[role='banner'] a[href]", "nav a[href]"])
        footer_urls = _from_page(page, base_url, root_host,
                                 ["footer a[href]", "[role='contentinfo'] a[href]"])
        body_urls = _from_page(page, base_url, root_host, ["main a[href]"])

        sitemap_urls = _from_sitemap(page, base_url, root_host)
        browser.close()

    # Rank + de-dupe, homepage first regardless of score.
    candidates = unique([base_url, *header_urls, *footer_urls, *sitemap_urls, *body_urls])
    candidates.sort(key=lambda u: -_score(u))

    picked: list[dict] = []
    picked_paths: set[str] = set()
    for url in candidates:
        path = urlparse(url).path.rstrip("/") or "/"
        if path in picked_paths:
            continue
        picked_paths.add(path)
        picked.append({
            "url": url,
            "slug": page_slug(url),
            "path": path,
            "score": _score(url),
            "source": ("header" if url in header_urls
                       else "footer" if url in footer_urls
                       else "sitemap" if url in sitemap_urls
                       else "body" if url in body_urls
                       else "seed"),
        })
        if len(picked) >= limit:
            break

    return {
        "start": base_url,
        "host": root_host,
        "crawledAt": datetime.now(timezone.utc).isoformat(),
        "counts": {
            "header": len(header_urls),
            "footer": len(footer_urls),
            "sitemap": len(sitemap_urls),
            "body": len(body_urls),
            "picked": len(picked),
        },
        "pages": picked,
    }


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Discover important internal pages of a reference site "
                    "and write sitemap.json for capture.py to consume."
    )
    parser.add_argument("url", help="https URL of the homepage to crawl")
    parser.add_argument("--out", default="references/inspiration",
                        help="project-relative output root (default: references/inspiration)")
    parser.add_argument("--limit", type=int, default=8,
                        help="max number of pages to keep (default: 8)")
    args = parser.parse_args()

    if not args.url.startswith(("http://", "https://")):
        parser.error("url must start with http:// or https://")

    dest_root = Path(args.out)
    if not dest_root.is_absolute():
        dest_root = Path.cwd() / dest_root
    site_dir = out_dir(dest_root, args.url)

    data = crawl(args.url, limit=args.limit)
    write_json(site_dir / "sitemap.json", data)
    print(f"Wrote {site_dir / 'sitemap.json'}")
    for p in data["pages"]:
        print(f"  [{p['source']:>7}]  {p['url']}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
