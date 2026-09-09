# Capture protocol

Goal: a folder the rebuild can trust. If capture is thin, the clone will be a guess.

## Output layout

```
design-capture/source/
  inventory.md          # human-readable spec (agent reads this first)
  tokens.json           # machine tokens
  pages.json            # routes + titles
  fonts.json
  screenshots/
    desktop|tablet|mobile/<page-slug>/full.png
    desktop|tablet|mobile/<page-slug>/section-NN.png  (if script produced them)
  hovers/               # CTA hover stills when captured
  assets/               # downloaded images, logos, videos, font files
```

Run from the project root (Windows: `py -3` if `python` is missing):

```bash
py -3 .cursor/skills/wix-site-clone/scripts/capture_source.py --url "https://SITE" --out design-capture
```

Optional: `--pages /,/about,/contact` to limit routes. Optional: `--skip-assets` only if you already have files (do not skip on a first run).

## If the script cannot run

Use Cursor browser tools:

1. `browser_navigate` to the Wix URL (visible tab only if the user asked to watch).
2. `browser_lock`.
3. Dismiss cookie UI (Accept / Godkänn / Acceptera).
4. Wait until images and webfonts are in (`document.fonts.ready` via CDP).
5. `browser_take_screenshot` of the hero, then scroll and capture **each section** (full-page screenshot if the tool allows; otherwise stitch by section).
6. CDP `Runtime.evaluate` with the source of `scripts/extract_inventory.js` (it returns one JSON object). Save that JSON to `design-capture/source/tokens.json` and write `inventory.md` from it.
7. Repeat at widths 1440, 768, 390 (resize via CDP `Emulation.setDeviceMetricsOverride` when available).
8. Download every image URL in the JSON into `design-capture/source/assets/`.
9. `browser_lock` unlock when finished.

Do not rebuild from a single hero screenshot.

## Wait until the page is actually painted

Wix hydrates late. Capture too early and you get empty strips.

- Wait `networkidle` **and** `document.fonts.ready`
- Scroll to the bottom (lazy images), then back to top
- Extra 500–1500ms after scroll
- Confirm a heading and a hero image exist in the screenshot before treating capture as valid

## Hide non-brand chrome before screenshots

Hide or dismiss: cookie CMP, Wix chat, Wix ads bar. Do not hide site header, announcement bars, or cookie UI that is clearly custom-designed.

## What to extract (minimum)

**Type** — for each distinct text style (hero title, section title, body, nav, button, footer, caption):

- `font-family` (full stack)
- `font-size`, `font-weight`, `font-style`
- `line-height` (px or unitless as computed)
- `letter-spacing`, `text-transform`, `text-align`
- `color`

**Color** — unique backgrounds, text, borders, overlay rgba (including `rgba(0,0,0,0.45)` on heroes).

**Layout** — header height, content max-width, section vertical padding, column gap, button padding / radius / border.

**Chrome** — nav labels + hrefs, logo URL, footer columns, social icons.

**Media** — every `img` src, CSS `background-image`, `<video>` src/poster, inline SVG count (export the important ones).

**Breakpoints** — note if desktop and mobile are different compositions (classic Wix). Screenshot is the source of truth.

## Fonts

`document.fonts` lists loaded faces. Also scrape `@font-face` from same-origin styles when possible.

Map families:

1. Exact Google Fonts match (same family name) → `next/font/google`
2. Adobe / licensed face the user owns → they must provide files
3. Wix-hosted file with a downloadable `woff2` in the network panel → save under `public/fonts/`
4. Otherwise closest Google substitute + **write the substitution in inventory.md** (still match size/weight/tracking)

Never silently use system-ui or Inter.

## Assets

Download the URL the browser actually used (transformed Wix media). Prefer the largest density that still matches crop.

Rename on disk to stable names (`hero-home.webp`, `logo.svg`) and list the mapping in inventory:

```
hero-home.webp  ←  static.wixstatic.com/media/….jpg  (fill 1920×800)
```

Hotlinking Wix CDN in the Next app is a failed clone (expiry, branding, performance).

## inventory.md shape

Write this file even if the script already printed a stub — fill gaps the script cannot see (slider autoplay, hover zoom, sticky header):

```markdown
# Source inventory
- URL:
- Engine: studio | editor-x | classic
- Language:
- Pages:

## Tokens
- Content max-width (desktop):
- Header: height, sticky y/n, background
- Fonts: (family → role)

## Pages
### Home
1. Hero — screenshot: … — notes (overlay %, CTA)
2. Section — …

## Substitutions
- Font X → Google Y (reason)
```

## Pages beyond home

Collect same-origin links from the main nav and footer. Capture each route the user cares about. A clone that only does the homepage is unfinished if the brief was “the website.”
