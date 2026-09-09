# Visual QA (until ~97%)

QA is a loop, not a glance at the hero.

## Setup

1. Source screenshots in `design-capture/source/screenshots/` (same viewports you will test).
2. Dev server running (Next `3000` or Vite `5173`).
3. Compare:

```bash
py -3 .cursor/skills/wix-site-clone/scripts/compare_rebuild.py --help
py -3 .cursor/skills/wix-site-clone/scripts/compare_rebuild.py --source design-capture --rebuild http://localhost:3000 --out design-capture/diffs
```

The script screenshots localhost at 1440 / 768 / 390 and writes side-by-side + diff images.

Also inspect with Cursor browser tools: open localhost, screenshot the same sections you captured from Wix, and look at them as images (not only DOM snapshots).

## Order of fixes

Fix in this order — later issues are often caused by earlier ones:

1. **Fonts not applied** (wrong family, weight 400 vs 500, still system font)
2. **Content max-width** (line breaks differ → everything downstream looks “off”)
3. **Header height / overlap on hero**
4. **Section background** (color, image crop, overlay opacity)
5. **Type metrics** on the largest heading (size, tracking, transform)
6. **Section vertical padding** (rhythm)
7. **Column ratios and gaps**
8. **Button geometry and hover**
9. **Mobile composition** (stacking, font sizes, hamburger)
10. **Footer columns**

Do not tweak a button radius while the page is still in Inter.

## What a 97% match looks like

Side-by-side at 1440: same number of lines in the hero title, same logo size, same strip colors, photos in the same crop, CTAs in the same place. At 390: same stacking order as Wix mobile, not a squashed desktop.

Diff images should show speckle and subpixel noise, not whole bands of color (that means a section background or overlay is wrong).

## Common misses (check explicitly)

- Hero overlay too weak/strong (`rgba` alpha)
- `letter-spacing` ignored on uppercase nav/titles
- Body at 16px when source is 18px
- Boxed hero image that should be full-bleed (or the reverse)
- `object-fit: contain` letterboxing
- Extra margin from user-agent headings (`h1 { margin }`)
- Sticky header covering the first heading
- Different button on mobile vs desktop (Wix often restyles CTAs)
- Nav items translated or reordered
- Replaced photography
- Border-radius on images/cards the source does not have
- Section implemented in a different order

## Hover and sticky

Compare hover on primary CTA and nav links. If the source underlines, you underline; if it fills background, you fill. Scroll 200px and compare header (transparent vs solid vs shadow).

## When to stop

Stop when:

- Inventory pages exist in the app
- Desktop + mobile screenshots match the source for those pages at ~97%
- Remaining gaps are the allowed 3% (chat, default CMP, Wix ads, form backends, easing)

Tell the user what still differs. Do not claim 97% if the typeface or content width is wrong.

## After major CSS changes

Re-run `compare_rebuild.py`. Old diffs lie.
