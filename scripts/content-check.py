"""Content preservation check.

Captures everything a visitor can read or follow on every route and compares
it with the stored baseline, so a redesign cannot change content unnoticed.

  py scripts/content-check.py capture   # write scripts/content-baseline.json
  py scripts/content-check.py           # compare the running site with it

Reads the DOM (textContent), not the rendered text, so CSS such as
text-transform or display:none cannot hide a difference. Whitespace is
collapsed. Needs the site running on BASE (default http://localhost:3001).
"""

import json
import os
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

BASE = os.environ.get("BASE", "http://localhost:3001")

# Text glyphs that served as icons and were replaced by real icons (Lucide).
# They are bullets, not words, so they are left out of the text comparison.
# Nothing else is ignored.
ICON_GLYPHS = ["→"]  # → before each topic in "Jag kan vara ett stöd inom"


def strip_glyphs(s):
    for g in ICON_GLYPHS:
        s = s.replace(g, " ")
    return " ".join(s.split())
BASELINE = Path(__file__).with_name("content-baseline.json")

ROUTES = [
    "/",
    "/about-5",
    "/services",
    "/paradigmskiftet",
    "/personlig-vagledning",
    "/kontakt",
    "/kontakt?amne=Personlig%20v%C3%A4gledning",
    "/booking-calendar/kursmaterial",
    "/booking-calendar/personlig-v%C3%A4gledning",
    "/booking-calendar/kurs-i-grupp",
]

COLOR_TOKENS = [
    "--paper", "--paper-2", "--paper-3", "--paper-4", "--surface", "--foam",
    "--ink", "--ink-soft", "--nav-ink", "--water", "--water-deep", "--brass",
    "--moss", "--reed", "--white",
]

EXTRACT = """
(tokens) => {
  const norm = (s) => (s || "").replace(/\\s+/g, " ").trim();
  const skip = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEMPLATE", "TITLE", "META", "LINK"]);
  const inDevUi = (n) => {
    for (let e = n; e; e = e.parentNode || e.host) {
      const tag = (e.nodeName || "").toLowerCase();
      if (tag.startsWith("nextjs-") || tag === "next-route-announcer") return true;
    }
    return false;
  };
  const parts = [];
  const walk = (node) => {
    if (node.nodeType === 3) { parts.push(node.nodeValue); return; }
    if (node.nodeType !== 1 || skip.has(node.nodeName) || inDevUi(node)) return;
    for (const c of node.childNodes) walk(c);
    // block boundaries become a space so adjacent blocks never glue together
    const d = getComputedStyle(node).display;
    if (!d.startsWith("inline") && d !== "contents") parts.push(" ");
  };
  walk(document.body);
  const q = (sel) => [...document.querySelectorAll(sel)].filter((e) => !inDevUi(e));
  const root = getComputedStyle(document.documentElement);
  return {
    title: document.title,
    text: norm(parts.join("")),
    headings: q("h1,h2,h3,h4").map((h) => [h.tagName, norm(h.textContent)]),
    links: q("a[href]").map((a) => [
      a.getAttribute("href"), norm(a.textContent), a.getAttribute("aria-label") || "",
      a.getAttribute("target") || "",
    ]),
    buttons: q("button").map((b) => [norm(b.textContent), b.getAttribute("aria-label") || "", b.type]),
    images: q("img").map((i) => [i.getAttribute("src"), i.getAttribute("alt") || ""]),
    sources: q("picture source").map((s) => [s.getAttribute("srcset"), s.getAttribute("media") || ""]),
    fields: q("input,textarea,select").map((f) => [
      f.tagName, f.getAttribute("name") || "", f.getAttribute("type") || "",
      f.getAttribute("placeholder") || "", f.defaultValue || "",
      norm(f.labels && f.labels[0] ? f.labels[0].textContent : ""),
    ]),
    colors: Object.fromEntries(tokens.map((t) => [t, root.getPropertyValue(t).trim()])),
  };
}
"""


def capture():
    out = {}
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1440, "height": 900})
        for route in ROUTES:
            page.goto(BASE + route, wait_until="networkidle")
            page.wait_for_timeout(1200)
            out[route] = page.evaluate(EXTRACT, COLOR_TOKENS)
        browser.close()
    return out


def main():
    current = capture()
    if len(sys.argv) > 1 and sys.argv[1] == "capture":
        BASELINE.write_text(json.dumps(current, ensure_ascii=False, indent=2), encoding="utf-8")
        chars = sum(len(v["text"]) for v in current.values())
        print(f"Baseline written: {len(current)} routes, {chars} characters of text.")
        return 0

    baseline = json.loads(BASELINE.read_text(encoding="utf-8"))
    failures = 0
    for route in ROUTES:
        for key, want in baseline[route].items():
            got = current[route].get(key)
            if key == "text":
                # The dev server streams <title> into <body>; a production build keeps
                # it in <head>. The title is compared on its own, so drop it here.
                title = baseline[route]["title"]
                want, got = (strip_glyphs(s.removesuffix(" " + title)) for s in (want, got))
            if json.loads(json.dumps(got)) != want:
                failures += 1
                print(f"DIFF {route} [{key}]")
                if isinstance(want, str):
                    i = next((n for n, (a, b) in enumerate(zip(want, got)) if a != b), min(len(want), len(got)))
                    print("   was:", repr(want[max(0, i - 50): i + 70]))
                    print("   now:", repr(got[max(0, i - 50): i + 70]))
                elif isinstance(want, list):
                    for a in want:
                        if a not in got:
                            print("   missing:", a)
                    for b in got:
                        if b not in want:
                            print("   added:  ", b)
                    if sorted(map(str, want)) == sorted(map(str, got)):
                        print("   same items, different order")
                else:
                    for k in want:
                        if want[k] != got.get(k):
                            print(f"   {k}: {want[k]} -> {got.get(k)}")
    print("OK: content identical on all routes." if not failures else f"{failures} difference(s).")
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main())
