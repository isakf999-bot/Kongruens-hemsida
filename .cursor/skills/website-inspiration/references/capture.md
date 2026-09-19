# Capture and inspection

Systematic screenshots plus evidence-based DOM/stack reads. Multi-page by
default; every deliverable lands in the persistent library
`references/inspiration/<host>/`.

## One-shot research

For most reference sites, do this instead of running the scripts one by one:

```bash
python <skill>/scripts/research.py "https://example.com" --pages-limit 6
```

That runs `crawl → capture (multi-page) → interact → scaffold`. See
[adaptive.md](adaptive.md) for the loop this fits inside.

## Individual scripts

```bash
# Crawl only — discover important internal pages.
python <skill>/scripts/crawl.py    "https://example.com" --limit 6

# Capture only — read sitemap.json and capture each page.
python <skill>/scripts/capture.py  "https://example.com" --sitemap references/inspiration/<host>/sitemap.json

# Capture a specific set of pages without a crawl.
python <skill>/scripts/capture.py  "https://example.com" --pages "https://example.com" "https://example.com/services"

# Capture just the homepage.
python <skill>/scripts/capture.py  "https://example.com"

# Inspect only — quick DOM dump, no screenshots.
python <skill>/scripts/probe.py    "https://example.com"

# Interactions — hamburger, dropdowns, accordions, hover.
python <skill>/scripts/interact.py "https://example.com"
```

On Windows without a `python` on PATH, use `py -3`.

Common flags: `--skip-tablet`, `--no-full-page`, `--no-stripes`,
`--timeout 60`.

If Playwright is missing:

```bash
pip install playwright
python -m playwright install chromium
```

If it still cannot run, fall back to Cursor browser tools. The browser
fallback is first class — do not block research on Playwright.

## What capture writes

Per page, per viewport:

```
references/inspiration/<host>/
  screenshots/desktop/<slug>/
    full.png
    header.png    hero.png    footer.png
    01-top.png  02-mid.png  …  NN-bottom.png       ← scroll stripes
    menu-open.png                                   ← if a menu button exists
  screenshots/tablet/<slug>/…
  screenshots/mobile/<slug>/…
```

Plus top-level artifacts:

- `sitemap.json` — from crawl.py
- `inspect.json` — homepage inspection
- `pages/<slug>/inspect.json` — per-subpage inspection
- `interactions.json` — from interact.py
- `visual-inventory.json` — every screenshot with its meta

`research.py` also scaffolds the markdown deliverables from templates:

- `analysis.md`, `structure.md`, `content-map.md`,
  `implementation-plan.md`, `comparison.md`

## Stripe screenshots

Rather than only a `sections.png`, `capture.py` scrolls the page from top
to bottom in ≈90%-viewport steps and shoots each stripe. This is the
closest you can get to *reading a site as a designer would*: you can page
through the tiles and see the whole rhythm of the page, not just its
landing state. Skip with `--no-stripes` when you only need a header shot.

## Landmark heuristics

Try in order, first visible match wins:

| Shot | Selectors |
|---|---|
| Header | `header`, `[role=banner]` |
| Hero | `[class*="hero" i]`, `main > section:first-of-type`, `[role=banner] + *` |
| Footer | `footer`, `[role=contentinfo]` |
| Menu button | `button[aria-expanded]`, `button[aria-label*="menu" i]`, `[class*="hamburger" i]` |

If a clip fails, the full-page shot is still saved. Note the miss in
`analysis.md`.

## Browser fallback

Cursor browser tools handle everything a headless capture cannot:
hover-only dropdowns, modals, sliders, scroll-triggered animation,
authenticated pages the user has explicitly asked you to log into.

1. `browser_navigate` → `browser_lock` → `browser_snapshot`
2. Interact (open menu, hover a nav item, open a dialog)
3. `browser_take_screenshot` after each state
4. Save under `screenshots/interactions/` with descriptive names
5. Append entries to `interactions.json` so the record stays complete
6. `browser_lock action=unlock` when finished

For mobile/tablet in the browser, set:

```
Emulation.setDeviceMetricsOverride
  desktop  1440×900,  DPR 1
  tablet    768×1024, DPR 2
  mobile    390×844,  DPR 3
```

Reload after changing metrics so layout reflows.

## Inspection JSON

`inspect.json` includes:

- `title`, `htmlLang`, `generator`
- `stack.frameworks`, `stack.css` — evidence-based labels only
- `cssVars` — the `--*` custom properties declared on `<html>`
- `type.body / h1 / h2 / h3 / p` — computed samples
- `scale.fontSizesPx`, `scale.paddingTopPx`, `scale.paddingBottomPx`,
  `scale.gapsPx`, `scale.maxWidthsPx` — the observed scales
- `layout` — container + header + body dimensions
- `navLinks`, `footerLinks`
- `menuButtons`, `dropdownTriggers`, `accordions`, `tabs`
- `buttons` — sampled with radius, padding, colours
- `sections` — every `<main>` child, with heading, image and button counts
- `componentCandidates` — repeating-child parents (probable
  cards/lists/grids)
- `images`, `videos` — the media inventory
- `headings` — H1/H2/H3 in reading order

Use `componentCandidates` and `sections` together to name the reusable
pieces in [components.md](components.md).

## Stack detection

Report a technology **only with evidence**. Otherwise: `Unknown`.

| Signal | Label |
|---|---|
| `__NEXT_DATA__`, `/_next/static`, `next-route-announcer` | Next.js |
| `data-reactroot`, `data-reactid`, React fiber on root | React |
| `__nuxt`, `/_nuxt/` | Nuxt |
| `data-v-` + Vue runtime | Vue |
| `wp-content`, `wp-includes`, `wp-json` | WordPress |
| `elementor` | Elementor (WordPress) |
| `data-wf-page`, `w-mod-js`, `webflow` | Webflow |
| `cdn.shopify.com`, `Shopify.theme` | Shopify |
| `squarespace.com`, `static1.squarespace` | Squarespace |
| `framerusercontent`, `Framer` | Framer |
| `svelte` kit traces | SvelteKit |
| `/astro/` asset paths | Astro |
| Tailwind CDN script, or utility class clusters (`sm:flex`, `md:grid`, `lg:px-`) in markup | Tailwind (probable) |
| `.module.css` / `*_module_` in stylesheet hrefs | CSS modules (probable) |

Multiple signals can be true (Next.js + Tailwind). Never upgrade a weak
hint to a certainty. "Lots of divs" is not evidence of React.

## After capture

Read the PNGs. Then read `inspect.json`. Then read `interactions.json`.
Then write `analysis.md` and `structure.md`. JSON will miss visual
hierarchy, overlap, and motion — the images are the source of truth for
those.
