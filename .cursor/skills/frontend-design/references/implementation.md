# Implementation that keeps the design honest

A design plan dies in CSS that almost matches it. These are the mechanical failures that make a good plan look generic.

## Token-first

Put the committed palette, type, space, and radius on `:root` (or a single tokens file) before you style components. Components consume tokens; they do not invent hex. If a one-off value appears twice, it wanted to be a token.

Shadows are layers, not outlines:

```css
--shadow-s: 0 1px 2px color-mix(in srgb, var(--ink) 6%, transparent),
  0 4px 12px color-mix(in srgb, var(--deep) 8%, transparent);
--shadow-m: 0 2px 4px color-mix(in srgb, var(--ink) 6%, transparent),
  0 12px 28px color-mix(in srgb, var(--deep) 12%, transparent);
```

Tint toward ink/deep. Black at 25% is a tell.

## CSS modules and global classes

If buttons, fields, or layout primitives live as global classes (`.btn`, `.wrap`, `.kicker`) and the page is a CSS module, a selector like `.heroCopy .btn` compiles to a local `.btn` and **will not match**. The control then ignores your size, padding, and hover.

Use `:global(.btn)` (and the same for other globals) inside modules. If a user says a button "won't get smaller," inspect the compiled class names before redesigning the button.

Keep module classes for layout unique to the page. Keep shared chrome in globals. Do not duplicate a second `.btn` inside the module "to be safe."

## Specificity and cancelled spacing

Avoid pairing a broad element selector with a class that fights it (`.section p` vs `.lede`). Prefer a named class for the exception. Section padding that disappears is almost always two rules setting the same property; delete one, do not add `!important`.

## Buttons

One global pill recipe. Nav and hero consume it at different sizes via a modifier or a context selector that actually matches:

- Height from padding + line-height, not a magic `height` that clips descenders
- Compact: around 2.1–2.3rem min-height, smaller type, less horizontal padding
- Primary fill = accent or deep, depending on the plate
- Ghost = transparent, currentColor type, no wipe

## Media

- Living video behind a hero is a signature. Still poster for LCP; delay play slightly so the poster can paint. No video on routes that are not that signature.
- Do not grade the plate with overlay + filter to make type work. Place type in the quiet zone; add a local text-shadow if needed.
- `object-fit: cover` plus a focal point. If the interesting part of the frame is the horizon, do not default `object-position: center` if that crops it out on mobile.

## Dark-hero nav

A `scrolled` (or equivalent) class on the header after a threshold. Light type until then. Do not use `backdrop-filter` as a substitute for a real scrolled surface unless the brief wants frost.

## Space and type tokens

Alongside color, commit:

- `--gutter`, `--wrap` (max-width), `--section` (chapter air)
- A spacing ladder used by layout, not ad-hoc margins
- `--font-display`, `--font-body`, and the role sizes (title, h1, h2, body, kicker, button)
- `--radius`, `--radius-pill`
- `--shadow-s`, `--shadow-m`

If a component needs a new radius, you are starting a second system. See [components.md](components.md) and [interaction.md](interaction.md) for the pieces those tokens must support.

## Visual QA (required for UI work)

A screenshot of the first paint is not verification.

1. Exercise the actual flow: click nav, open the menu, follow the primary CTA, resize.
2. Confirm lockup vs nav rail at two desktop widths and one mobile width.
3. Confirm reduced-motion: video frozen or omitted, no zoom.
4. Confirm the global button still looks like the same component in nav and in the hero.
5. Walk one other route that shares the header and tokens so a local module fix did not restyle the whole site by accident.
6. Crop-check the chapter join (last of hero + first of intro) and the nav-vs-H1 rail at 390, 1440, and 1920. Full-page screenshots hide "almost."

If you cannot drive a browser, say so, and verify with the closest substitute (computed styles, a render script). Do not claim the alignment is correct because the CSS looks like it should be.

Pass order and what to look at in those crops: [critique.md](critique.md).
