"""Shared helpers for website-inspiration capture/inspect/interact/crawl scripts.

The whole skill treats a reference site as a persistent research library.
Every script writes into the same per-host directory so results compound
across turns:

    references/inspiration/<host>/
      sitemap.json              (crawl.py)
      inspect.json              (inspect.py / capture.py — homepage)
      pages/<slug>/inspect.json (capture.py — per page)
      interactions.json         (interact.py)
      visual-inventory.json     (capture.py)
      research-report.json      (research.py)
      screenshots/
        desktop|tablet|mobile/<page-slug>/*.png
        interactions/*.png
      analysis.md, structure.md, content-map.md,
      implementation-plan.md, comparison.md
"""

from __future__ import annotations

import json
import re
from pathlib import Path
from typing import Iterable
from urllib.parse import urlparse

# ---- Viewports -------------------------------------------------------------
# Same widths used by capture.py, interact.py, and the browser-fallback docs.
VIEWPORTS = {
    "desktop": {"width": 1440, "height": 900, "dpr": 1},
    "tablet": {"width": 768, "height": 1024, "dpr": 2},
    "mobile": {"width": 390, "height": 844, "dpr": 3},
}

# ---- Landmark selectors ----------------------------------------------------
HEADER_SELECTORS = ["header", "[role='banner']"]
HERO_SELECTORS = [
    "[class*='hero' i]",
    "[data-hero]",
    "main > section:first-of-type",
    "main > div:first-of-type",
]
FOOTER_SELECTORS = ["footer", "[role='contentinfo']"]

MENU_BUTTON_SELECTORS = [
    "button[aria-label*='menu' i]",
    "button[aria-label*='meny' i]",
    "button[aria-controls][aria-expanded]",
    "[class*='hamburger' i]",
    "[class*='nav-toggle' i]",
    "[class*='menu-toggle' i]",
    "header button[aria-expanded]",
    "[role='banner'] button[aria-expanded]",
]

# Things worth clicking/hovering to discover hidden UI states.
DROPDOWN_TRIGGER_SELECTORS = [
    "header [aria-haspopup]",
    "nav [aria-haspopup]",
    "header button[aria-expanded]:not([aria-controls*='menu' i])",
    "header [data-hover-menu]",
]

ACCORDION_SELECTORS = [
    "details > summary",
    "[role='button'][aria-expanded='false']",
    "[class*='accordion' i] [aria-expanded='false']",
    "[class*='faq' i] button[aria-expanded='false']",
]

TAB_SELECTORS = ["[role='tab']"]

MODAL_TRIGGER_SELECTORS = [
    "[data-modal-trigger]",
    "[aria-haspopup='dialog']",
    "button[data-open-modal]",
]

# CTAs / important buttons — for hover shots.
CTA_SELECTORS = [
    "header a[class*='btn' i]",
    "header a[class*='cta' i]",
    "header button[class*='btn' i]",
    "a[class*='btn-primary' i]",
    "a[class*='primary' i][href]",
]


# ---- Slugs & paths ---------------------------------------------------------
def host_slug(url: str) -> str:
    """Return a filesystem-safe host name — matches inspect + capture output."""
    host = urlparse(url).hostname or "site"
    host = host.lower().removeprefix("www.")
    slug = re.sub(r"[^a-z0-9.-]+", "-", host).strip("-")
    return slug or "site"


def page_slug(url: str) -> str:
    """Stable slug for a subpage. Homepage is `home`."""
    path = (urlparse(url).path or "/").strip("/")
    if not path:
        return "home"
    slug = re.sub(r"[^a-z0-9]+", "-", path.lower()).strip("-")
    return (slug or "home")[:60]


def out_dir(root: Path, url: str) -> Path:
    """Per-host library directory, created if missing."""
    path = root / host_slug(url)
    path.mkdir(parents=True, exist_ok=True)
    return path


def screenshots_dir(site: Path, viewport: str, page: str) -> Path:
    """Per-viewport per-page screenshot folder."""
    path = site / "screenshots" / viewport / page
    path.mkdir(parents=True, exist_ok=True)
    return path


def interactions_dir(site: Path) -> Path:
    path = site / "screenshots" / "interactions"
    path.mkdir(parents=True, exist_ok=True)
    return path


def pages_dir(site: Path, page: str) -> Path:
    path = site / "pages" / page
    path.mkdir(parents=True, exist_ok=True)
    return path


def write_json(path: Path, data: object) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def read_json(path: Path) -> object | None:
    if not path.exists():
        return None
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return None


def rel_to(root: Path, target: Path) -> str:
    """Portable relative path for JSON/report output."""
    try:
        return str(target.relative_to(root)).replace("\\", "/")
    except ValueError:
        return str(target).replace("\\", "/")


# ---- Iteration -------------------------------------------------------------
def unique(items: Iterable[str]) -> list[str]:
    seen: set[str] = set()
    result: list[str] = []
    for item in items:
        if item and item not in seen:
            seen.add(item)
            result.append(item)
    return result


# ---- Stack detection -------------------------------------------------------
def detect_stack(html: str, script_srcs: list[str], stylesheet_hrefs: list[str]) -> dict:
    """Evidence-based stack labels. Empty frameworks means Unknown."""
    blob = " ".join([html[:200000], " ".join(script_srcs), " ".join(stylesheet_hrefs)])
    lower = blob.lower()
    frameworks: list[dict] = []
    css: list[dict] = []

    def add(bucket: list, name: str, evidence: str) -> None:
        if any(item["name"] == name for item in bucket):
            return
        bucket.append({"name": name, "evidence": evidence})

    if "__next_data__" in lower or "/_next/static" in lower or "next-route-announcer" in lower:
        add(frameworks, "Next.js", "__NEXT_DATA__, /_next/static, or next-route-announcer")
    if "data-reactroot" in lower or "data-reactid" in lower or re.search(
        r"window\.__react", lower
    ):
        add(frameworks, "React", "React root markers")
    if "__nuxt" in lower or "/_nuxt/" in lower:
        add(frameworks, "Nuxt", "__nuxt or /_nuxt/")
    if "data-wf-page" in lower or "w-mod-js" in lower or "webflow" in lower:
        add(frameworks, "Webflow", "data-wf-page / w-mod-js / webflow")
    if "wp-content" in lower or "wp-includes" in lower or "wp-json" in lower:
        add(frameworks, "WordPress", "wp-content / wp-includes / wp-json")
    if "elementor" in lower:
        add(frameworks, "Elementor (WordPress)", "elementor asset traces")
    if "cdn.shopify.com" in lower or "shopify.theme" in lower:
        add(frameworks, "Shopify", "cdn.shopify.com or Shopify.theme")
    if "squarespace" in lower:
        add(frameworks, "Squarespace", "squarespace host or assets")
    if "framerusercontent" in lower or "generated by framer" in lower:
        add(frameworks, "Framer", "framerusercontent or generator meta")
    if re.search(r"svelte", lower) and ("sveltekit" in lower or "/_app/" in lower):
        add(frameworks, "SvelteKit", "SvelteKit asset traces")
    if re.search(r"\bvue\b", lower) and ("data-v-" in lower or "__vue" in lower):
        add(frameworks, "Vue", "Vue runtime or data-v-* with Vue globals")
    if "astro" in lower and "/astro/" in lower:
        add(frameworks, "Astro", "/astro/ asset paths")

    if "cdn.tailwindcss.com" in lower or "tailwindcss" in lower:
        add(css, "Tailwind", "Tailwind script or stylesheet name")
    elif re.search(r"\b(sm|md|lg|xl):[a-z]", html) and re.search(
        r"\b(flex|grid|px-|py-|gap-)\d", html
    ):
        add(css, "Tailwind (probable)", "utility class clusters in markup")

    if any("module" in href and ".css" in href for href in stylesheet_hrefs):
        add(css, "CSS modules (probable)", "stylesheet href contains module + css")

    return {
        "frameworks": frameworks or [{"name": "Unknown", "evidence": "no reliable fingerprint"}],
        "css": css or [{"name": "Unknown", "evidence": "no reliable fingerprint"}],
    }
