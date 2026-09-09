---
name: wix-site-clone
description: Recreates a live Wix, Wix Studio, or Editor X website in the current Cursor project as production code at about 97% visual fidelity. Use whenever the user wants to copy, clone, rebuild, migrate, pixel-match, or "göra om" a Wix site into code — including Swedish phrasing like "kopiera hemsidan", "återskapa designen", "bygg sajten i kod", screenshot-to-code of a Wix URL, or replacing Wix with Next.js/React. Prefer this skill over frontend-design and theme-factory: the job is faithful reconstruction of the existing site, not a new look.
---

# Wix → code (97% visual clone)

Rebuild the **live Wix site** as real code in this repo so a visitor cannot easily tell them apart. Success is visual match, not a redesign.

This skill **overrides** `frontend-design` and `theme-factory` for the whole job. Do not improve palette, type, spacing, copy, or layout. Do not swap fonts for Inter/system. Do not replace photos with stock. `template-imagery` is only for assets that cannot be downloaded from the source.

## What 97% means

Match these exactly (desktop, tablet, mobile):

- Colors (hex/rgba, overlays, gradients — do not round)
- Typography (family, size, weight, line-height, letter-spacing, transform, alignment)
- Spacing and section rhythm (padding, gaps, max-width, full-bleed vs boxed)
- Images, logos, icons, background media (downloaded, same crop)
- Header/footer, nav order, CTA labels, copy, decorative lines
- Button/link hover and sticky header behavior if the source has them

The leftover ~3% is allowed: Wix chat, default cookie CMP, “Made with Wix”, Wix ads, backend of forms/bookings/shop, subpixel rounding, exact animation easing.

If something is visible on the Wix page and is brand (logo, photo, type, color, layout), it is in scope.

## Do not start coding yet

If the user did not give a URL (and there is no `design-capture/source/inventory.md`), ask for the live Wix URL and which pages matter. Default: every page in the main nav, plus footer links that are real pages.

Then read, in order:

1. [references/wix-anatomy.md](references/wix-anatomy.md) — how to read a Wix DOM
2. [references/capture-protocol.md](references/capture-protocol.md) — how to extract, not guess
3. After capture exists: [references/rebuild-protocol.md](references/rebuild-protocol.md)
4. Before calling the work done: [references/qa.md](references/qa.md)

## Hard rule: measure, then code

Every visual decision comes from the live site (screenshot + computed style + downloaded asset). If a value was not measured, do not invent it.

Typical failure mode: “this looks like a modern agency site so I’ll use 8pt grid, Inter, and a 1200px container.” That produces a cousin of the site, not a clone. Wix sites often use a **980px** content well, unusual type sizes (17px, 22px), tight/loose tracking, and strip padding like 72px / 93px. Those numbers are the design.

## Workflow

Copy this checklist and keep it updated:

```
Clone progress:
- [ ] 0. URL + page list
- [ ] 1. Capture (screenshots, tokens, inventory, assets)
- [ ] 2. Stack + design tokens in the repo
- [ ] 3. Shared chrome (header, footer, fonts)
- [ ] 4. Each page, section by section
- [ ] 5. Responsive pass (desktop → tablet → mobile)
- [ ] 6. Hover / sticky / overlay states
- [ ] 7. Visual QA vs source screenshots
- [ ] 8. Fix deltas and re-QA until 97%
```

### 0. URL + page list

Open the site. Record:

- Homepage URL and extra routes (`/about`, `/contact`, Wix often uses `/home` or slug paths)
- Language of copy (keep it — do not translate)
- Engine guess: Classic Editor, Editor X, or Wix Studio (see anatomy doc)

### 1. Capture (mandatory)

Prefer the bundled script (systematic, multi-viewport, asset download). Run `--help` first. On Windows use `py -3` if `python` is not on PATH:

```bash
py -3 .cursor/skills/wix-site-clone/scripts/capture_source.py --help
py -3 .cursor/skills/wix-site-clone/scripts/capture_source.py --url "https://SOURCE" --out design-capture
```

If Playwright is missing: `py -3 -m pip install playwright pillow` then `py -3 -m playwright install chromium`.

The script writes `design-capture/source/` (screenshots, `tokens.json`, `inventory.md`, assets). Read `inventory.md` and `tokens.json` before any UI code.

If the script cannot run, follow [references/capture-protocol.md](references/capture-protocol.md) with the browser tools + `scripts/extract_inventory.js` via CDP `Runtime.evaluate`. Do not skip capture because the script failed.

Dismiss cookie banners and ignore Wix chat **in capture**. Do not clone Wix chrome. Do clone a custom-designed cookie bar if it is clearly part of the brand.

### 2. Stack

Match the repo if it already has an app. If the project is empty:

- **Next.js App Router + TypeScript**
- **CSS modules or global CSS + custom properties** (exact px/rem from tokens)
- **No Tailwind unless it is already in the repo.** Tailwind’s spacing/type scale fights 17px / 93px / 980px values. Clone work wants measured CSS.

Fonts: `next/font` for Google families; `@font-face` for files captured from the page. If a Wix-only face cannot be legally self-hosted, pick the closest licensed Google match, record the substitution in `inventory.md`, and still match size/weight/tracking.

### 3. Tokens before components

Create a single token file from capture (example shape in [references/rebuild-protocol.md](references/rebuild-protocol.md)):

- Color names mapped to **exact** captured hex/rgba
- Type styles as real CSS (not “heading / body” guesses)
- Layout: content max-width, section paddings, header height, gutter

Every component reads these tokens. No one-off hex in a random file unless it is a one-off on the source too.

### 4. Rebuild order

1. Global CSS reset that does **not** restyle the brand (box-sizing, img max-width, no opinionated font).
2. Font loading (no FOUT that changes metrics after first paint if you can avoid it).
3. Header + footer (they frame every page).
4. Home, top to bottom, one section at a time.
5. Other pages. Reuse chrome; do not copy-paste a second header.

For each section: open the source screenshot + inventory row, implement, screenshot the rebuild, compare, then move on. Do not implement five sections blind.

Map Wix structure to semantic HTML (anatomy doc). Visual CSS can still be grid/flex that matches the strip. Do not preserve `#comp-k8f2…` as architecture.

### 5. Responsive

Capture and rebuild at least:

| Label   | Width |
| ------- | ----- |
| Desktop | 1440  |
| Tablet  | 768   |
| Mobile  | 390   |

Classic Wix is often **adaptive** (desktop min-width ~980px, separate mobile site). Studio is **responsive** with breakpoints ~1001 / 751 / 320. Clone the behavior the live site actually has, not a theoretical responsive system.

Build desktop first from desktop screenshots, then override down. Measure mobile — Wix mobile is frequently a different composition (stacked columns, hidden side-by-side images, larger tap targets), not a scaled desktop.

### 6. QA loop

Use the compare script once the app runs:

```bash
py -3 .cursor/skills/wix-site-clone/scripts/compare_rebuild.py --help
```

Then follow [references/qa.md](references/qa.md). Fix the largest mismatch first (wrong font or max-width wrecks every section). Re-capture rebuild screenshots after each serious fix.

Stop when side-by-side screenshots match at ~97% and the leftover gaps are the allowed 3%.

## Asset rules

- Download into `public/` (or the project’s static folder). Do not hotlink `static.wixstatic.com` in production.
- Keep crops. If Wix used `fill/w_1920,h_800`, the rebuild uses the same crop, not the uncropped original.
- Logos as SVG when the source is vector; otherwise PNG/WebP with transparency preserved.
- Background videos: download or keep a local poster + video file. Do not fake a video with a still if the source plays motion.

## Forms, shop, bookings

Rebuild the **look** (fields, labels, button, success/error if visible). Wire real backends only if the user asked. Note Wix apps (Stores, Bookings, Events, Members) in `inventory.md` as “visual only unless requested.”

## When to read which file

| Situation | File |
| --------- | ---- |
| Weird DOM, strips vs sections, 980px well | `references/wix-anatomy.md` |
| How to screenshot, tokens, fonts, assets | `references/capture-protocol.md` |
| File structure, CSS strategy, section mapping | `references/rebuild-protocol.md` |
| Diffing, common misses, done criteria | `references/qa.md` |
