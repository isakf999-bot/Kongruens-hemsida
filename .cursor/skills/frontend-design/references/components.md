# Components: recipes with reasons

Build these from tokens. Do not invent a second radius, shadow, or button per section. Read [spatial-craft.md](spatial-craft.md) for rails and chapters; this file is the pieces.

## Buttons

One pill language for the site.

- Shape: pill (full radius) or a decided modest radius — not mix.
- Primary: fill from accent or deep; type from paper. Used once per view when you can.
- Ghost: transparent, type currentColor, used as the second action. No fill wipe.
- Compact (nav): type size near the nav links, min-height ~2.1–2.3rem, less padding.
- Hero primary: same component, maybe one step up from compact — not a new species.
- Hover: translate -1 to -2px, shadow-m. Focus: ring from accent, offset.
- Disabled: lower opacity *and* `pointer-events: none`; still a button, not gray mystery text.

Do not put icons in every button. If you do, the icon is the same optical size as the cap-height, not a 24px blob.

Labels: the real verb. Locked copy wins. Do not invent "Get started."

## Links in body

Underline or a distinct weight, accent or ink. Hover: a shade toward deep, not a new hue. Skip buttons styled as links and links styled as giant pills in the same paragraph.

## Cards

Anatomy: media (optional) → kicker (optional) → title → 1–3 lines → action.

- Surface token, shadow-s at rest, shadow-m + lift on hover.
- No 1px border unless the brief is literally a form/table world.
- Equal padding inside; do not fake hierarchy by padding one card differently unless it is the featured exception.
- Featured = fill deep (type inverted) or a real span (1 / 2 columns), never `translateY(-12px)` on the middle of three.
- One idea. If you need a price, a duration, and a philosophy, that is a layout, not a card.

Lists of cards: 1 column on small, 2 on medium, 3 only if the content is truly parallel and short. Asymmetric 2-column with a featured cell reads as designed; 3 identical tiles read as a template.

## Nav

Identity left (or a decided center brand with links around it — rarer). Links as a row. One compact primary.

- Dark plate: paper type, no opaque bar. After scroll: paper ground, ink type, shadow-s.
- Active link: weight or a small mark, not a pill around every item.
- Mobile: a real panel or sheet, focus trapped, escape to close, the same primary button inside. Hamburger that does not animate into an ornament.

Brand stack: name over line of work, optically centered as a unit.

## Footer

Deep ground, paper type, same rail. Not a second marketing page. Identity, a short way to act, legal if required, quiet social. Do not repeat the whole nav at display size. Do not drop a huge newsletter slab unless the brief is actually a publisher.

## Forms

See [interaction.md](interaction.md) for states. Visually:

- Labels above fields, always visible (placeholder is not a label).
- Fields: surface or paper, a soft inner contrast, generous padding, radius related to buttons but not a pill unless the brief is playful.
- One primary submit, pill aligned with the system.
- Error: text under the field, ink or a mix toward a warning that still belongs (warm of the same family), not default browser red if it screams out of the palette — unless you have no other accessible choice.
- Width: a form is a measure, ~32–40rem, not full bleed.

## Prices and meta

Tabular lining numerals if columns must align. Keep `4 950 kr` style spaces if the locale locks them. Do not style prices in accent just because they are numbers; they are content. Quiet captions for duration (`á 40 minuter` stays as written if locked).

## Quotes and testimonials

If you must: a shorter measure, maybe italic *or* a display face, not both plus a 120px quotation mark. Attribution as caption. A full-bleed tinted slab with a giant mark is a tell.

## Lists and process

Use numbers only when order is the information. Otherwise a simple stack with air, or a grid of cards. Connecting dots, chevrons between columns, and "step" illustrations are usually costume.

## Empty states

A sentence and one action. Not an illustration of a sad folder plus three buzzwords.

## Chrome you skip unless the brief is that world

Badges, chips, avatars in a row, logo clouds, fake browser windows around screenshots, ribbon "Popular", progress bars on marketing pages, cookie-style floating helpers.

If a piece of chrome cannot be named in the six-line direction, it is not a component, it is fear of empty.
