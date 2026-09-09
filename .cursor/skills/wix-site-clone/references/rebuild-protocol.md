# Rebuild protocol

Code from `design-capture/source/`, not from taste.

## Suggested repo layout (empty Next.js app)

```
app/
  layout.tsx              # fonts, Header, Footer, metadata from source
  page.tsx                # home sections in source order
  globals.css             # tokens + reset only
  <route>/page.tsx
components/
  Header/
  Footer/
  sections/               # one component per distinct band
public/
  images/                 # from design-capture/source/assets
  fonts/                  # if self-hosted
  favicon.ico
```

Copy captured assets into `public/` as part of the first implementation commit of UI, not later. Broken images guarantee a failed QA.

If the repo already uses Vite/`src/pages`, follow that instead of forcing App Router.

## Token file

Put captured values in `app/globals.css` (or `src/styles/tokens.css`):

```css
:root {
  --color-bg: #ffffff;
  --color-text: #1a1a1a;
  --color-accent: #c4a574;
  --content-max: 980px;
  --gutter: 20px;
  --header-h: 80px;
  --section-y: 72px;
  --font-display: "Playfair Display", serif;
  --font-body: "Lato", sans-serif;
}

.title-hero {
  font-family: var(--font-display);
  font-size: 64px;
  font-weight: 500;
  line-height: 1.15;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
```

Numbers above are **examples**. Replace with inventory. Create a class (or CSS module) per distinct type style found in capture — usually 6–12 styles, not 2.

Buttons: padding, radius, border, background, color, hover — all from a measured primary and secondary CTA. If the source has square buttons with 2px gold borders, do not emit `border-radius: 999px`.

## CSS strategy

- Exact measured values. `72px` stays `72px` (or `4.5rem` if the root is 16px and you verified it).
- Section backgrounds on the `<section>`, not on `body`, unless the whole page is one color.
- Inner wrapper: `max-width: var(--content-max); margin-inline: auto; padding-inline: var(--gutter)`.
- Full-bleed media: break out of the wrapper (full viewport width).
- Prefer CSS Grid for column strips; percentages should match measured column ratios (e.g. 42% / 58%, not 50/50).

Avoid:

- Tailwind utility soup for the first clone (unless the project already is Tailwind — then use arbitrary values: `text-[17px]`, `max-w-[980px]`, `pt-[93px]`)
- Global `p { margin: 1em }` that fights Wix’s tight stacks
- `img { border-radius: 1rem }` if the source is square

## Header and footer first

Implement nav labels in source order and language. Dropdowns: same items. Mobile: same pattern as the live mobile screenshot (hamburger, overlay, accordion) — classic Wix mobile menus are often full-screen overlays.

Logo: captured file, measured height. Do not regenerate a logo in CSS.

Sticky: `position: sticky` / `fixed` only if capture shows it. If the header becomes solid after scroll, implement that; if it stays transparent on the hero, keep it transparent.

## Section loop

For section N:

1. Open `screenshots/desktop/<page>/full.png` (and section crop if present).
2. Read the inventory bullet (copy, media, padding).
3. Implement HTML + CSS.
4. Screenshot the rebuild at 1440.
5. Compare overlay/diff (see qa.md). If the heading wraps onto the wrong number of lines, the max-width or type metrics are wrong — fix before section N+1.

Data: put repeated copy in arrays (`lib/content.ts`) so pages stay readable. Copy must be **verbatim**.

## Images in Next.js

Use `next/image` only with local files and correct `width`/`height` (intrinsic from the downloaded file). For full-bleed heroes, `fill` + a parent with the measured min-height.

`object-fit: cover` vs `contain` must match the source (Wix fill vs fit). Wrong fit is an obvious miss.

## Interactions

- Links: real `href`s (internal routes you will create, external as on source).
- Buttons that submit Wix forms: visual clone + `mailto:` or a later API if the user asks.
- Sliders: same number of slides, similar autoplay if obvious.
- Hover: screenshot `hovers/` if present; otherwise hover the live site and match.

## Metadata

`<title>`, description, favicon, OG image from the source if present. Language attribute = site language (`sv`, `en`, …).

## Empty project bootstrap

If there is no `package.json`, scaffold Next.js (App Router, TS, no Tailwind, no src-dir unless you prefer it), then install and run. Do not drop a single 2000-line `index.html` unless the user asked for a static dump — this repo is a Cursor project meant to keep growing.

## Parallel skills

- Do **not** run `frontend-design`’s “take a risk / distinctive identity” pass.
- Do **not** apply `theme-factory` palettes.
- `webapp-testing` / browser tools are for QA screenshots of localhost, not for restyling.
