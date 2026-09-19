# Blueprint — the structural document

`structure.md` (from `assets/blueprint-template.md`) is what turns
research into a plan. Fill it before you write code.

## Why it exists

Analysis (`analysis.md`) captures *what the site is*.
Content map (`content-map.md`) captures *what we will do about it*.
The blueprint is the missing middle: *the site expressed as components +
jobs*. It is the object you and future turns will refer to when
implementing, comparing, and improving.

## What good looks like

For every page in `sitemap.json`, in reading order, one section entry with:

- **Purpose.** What the visitor should understand or do here.
- **Layout.** Container width, columns, alignment, media treatment.
- **Components.** Named pieces from [components.md](components.md).
- **Content shape.** Roughly how much heading, how much body, how many
  cards, how many CTAs. Match the *density*, not the words.
- **Visual hierarchy.** First / second / third thing the eye lands on;
  where the CTA sits in that path.
- **Interaction.** From `interactions.json`. If we only observed a
  static state, say so.
- **Responsive behavior.** Desktop → tablet → mobile stacking rules.
- **Our equivalent.** Which existing route/component this maps to. If
  nothing maps, note the gap and how you would fill it.

## Anti-patterns

- Section entries that only describe colours.
- Section entries with `Purpose: unclear`. Either name the job or remove
  the block from the plan.
- Repeating the same layout description across three sections.
  Extract a component.
- Blueprint that mirrors the reference 1:1. If we do not need "Team",
  drop it here — not later.

## Density calibration

Look at the reference:

- Heading length in words
- Paragraph length in lines / characters
- Card count per grid
- CTA count per section (usually 0 or 1)
- Text : image ratio
- Section height (compact rhythm vs cinematic scroll)

Then check `inspect.json → scale` for the spacing evidence. Match the
*intent* (e.g. "short heading + 2-line lede + 1 primary CTA + 1 text
link"), not the exact px values.

## Filling the blueprint quickly

1. Copy the section block for each section you can see.
2. Fill *Purpose* first for the whole page in one sitting — force the
   sequence to make sense before adding detail.
3. Add *Components* per section using the shared inventory names.
4. Add *Content shape* and *Responsive behavior*.
5. Add *Our equivalent* last — this is what triggers the content map.

## After the blueprint

Move to `content-map.md`. Do not start editing code with only the
blueprint in hand. The content map turns "here is the sequence" into
"here is what we will actually write and where it will live".
