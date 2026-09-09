# Wix anatomy (how to read the live DOM)

Wix HTML is generated. Class names like `comp-k8f2abcd` are not a design system. Read **computed styles + geometry + screenshots**. Ignore hashed class names as architecture.

## Detect the engine

Run this in the page (capture script does it; otherwise CDP `Runtime.evaluate`):

- **Wix Studio** — semantic `header` / `section` / `footer`, classes `wixui-*`, CSS variables `--wst-*` and `--color_NN` (often comma-separated RGB). Layout is grid, stack, flex, repeater. Fluid width.
- **Editor X** — CSS grid / mesh, `data-mesh-id`, still more “designer canvas” than classic strips.
- **Classic Editor** — `#SITE_CONTAINER`, `#SITE_HEADER`, `#PAGES_CONTAINER`, `#SITE_FOOTER`, many `#comp-…` nodes. Desktop content well is often **980px** centered. `min-width: 980px` on desktop is common (horizontal scroll on narrow desktop windows). Separate mobile layout rather than true fluid responsive.

The live site wins if signals mix (Studio can still embed classic widgets).

## Layout primitives → HTML

| Wix (what you see) | Rebuild as |
| ------------------ | ---------- |
| Strip / full-width band with background color or image | `<section>` full-bleed, inner wrapper for the content well |
| Columns (2–5) | CSS grid with the measured column widths and gap |
| Stack (vertical group with consistent gap) | flex column + `gap` from measured distance |
| Repeater / gallery / list of identical cards | `.map` over data; one card component |
| Lightbox / popup | dialog/modal, same overlay color and width |
| Anchor menu / in-page dots | same links and placement |
| Horizontal menu | `<nav>` with the same items, order, and breakpoint (hamburger vs inline) |
| Image + text side by side | grid 2-col desktop; stacked on mobile **if the source stacks** |
| Decorative line / shape / vector | SVG or CSS, same color and thickness |
| Background video | `<video playsInline autoPlay muted loop>` + overlay if present |

Do not keep Wix IDs. Do keep visual hierarchy: which block is full-bleed vs boxed is the most common clone miss.

## Content well vs full bleed

Measure, do not assume 1200px.

1. Pick a heading that is clearly “in the column,” not full-bleed media.
2. `getBoundingClientRect().width` at viewport 1440.
3. That width (often 980, 1000, 1100, 1200, or 1400) is `--content-max`.
4. Full-bleed sections (hero image, colored strip that hits both edges) stay `width: 100%` with **no** max-width on the background. Only the inner text/buttons use `--content-max`.

Classic Wix: background on the strip, content in a 980px box. Cloning with a 1200px container makes every line wrap wrong.

## Theme variables (Studio)

`:root` / `body` may expose:

- `--wst-color-fill-background-primary`, `--wst-color-title`, `--wst-color-action`, …
- `--wst-font-style-h1` … `h6`, `--wst-font-style-body-large|medium|small` (shorthand font values)
- `--color_12` … `--color_36` as `R, G, B` used like `rgba(var(--color_25), 1)`

Resolve them to concrete rgba/hex in `tokens.json`. In the rebuild, store the **resolved** colors. Do not depend on Wix variable names in production CSS.

Classic sites often have **no** useful `:root` theme. Harvest colors from computed `color` / `background-color` on real nodes.

## Widgets that are not the brand

Skip unless the user wants them:

- Wix Chat (`wix-chat`, chat launcher)
- Wix Ads header on free sites (`#WIX_ADS`)
- Default CMP cookie box (unless custom-styled)
- Password-protection chrome
- “Made with Wix”

Keep: custom forms, custom cookie bars, Instagram/Facebook embeds that are part of the layout, maps that occupy a designed block.

## Media URLs

Images live on `static.wixstatic.com` (and sometimes `video.wixstatic.com`). Transformed URLs look like:

`…/media/<id>/v1/fill/w_1920,h_800,al_c,q_90/file.webp`

The `fill` / `fit` / `crop` and `w_` / `h_` **are** the design. Download that transformed file (or equivalent crop), not a different aspect ratio.

## Text is not always a heading

Wix “Title” themes may render as `<p>` or `<span>`. Use the **visual** role (size/weight) to choose `h1`–`h6` / `p` in the rebuild. One `h1` per page if the source has a clear page title; do not sacrifice look for a textbook heading scale if the source uses two huge titles.

## Motion

Wix In-Page animations: fade / slide on scroll. Recreate only if clearly visible in capture (elements start offset/transparent). Prefer CSS `animation` / IntersectionObserver. Skip hyper-specific Wix easing if the rest of the section already matches; motion is in the 3% budget unless it is a signature (e.g. a slider, marquee, or hover zoom on every image).
