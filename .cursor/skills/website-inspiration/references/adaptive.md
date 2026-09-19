# Reference → Our website mode

The core loop for the whole skill when you have both a reference URL and
a project to build in.

```
OBSERVE  →  INTERACT  →  DOCUMENT  →  UNDERSTAND  →  RECREATE  →  COMPARE  →  IMPROVE
```

Every step has a concrete deliverable in the persistent research library
(`references/inspiration/<host>/`). Do not skip forward. Skipping is how
you end up recreating branding instead of thinking.

## The three-lens rule (OBSERVE → ABSTRACT → ADAPT)

For every block you consider copying, run it through:

1. **OBSERVE.** What does the reference actually do here?
2. **ABSTRACT.** What design/UX *principle* is that expressing?
3. **ADAPT.** How does that same principle look in *our* project, with our
   content, our voice, our routes?

If step 3 collapses back into step 1, you are cloning. Reject it.

Example:

- **Observe:** Big personal photo next to the section heading "What we help
  with".
- **Abstract:** Personal-brand agency + services introduction in the same
  block; make the person part of the offering.
- **Adapt:** Portrait of Isak beside "Vad jag hjälper företag med", using our
  paper/bronze tokens. Not their photo, not their palette.

## Phases in order

### 1. OBSERVE

Run `scripts/research.py <url>`. It crawls, captures desktop/tablet/mobile
for every important page, and (unless `--no-interact`) runs interaction
discovery. Read the resulting screenshots. Then read `inspect.json`. Only
then read `interactions.json`.

Deliverables: `sitemap.json`, `inspect.json`, `visual-inventory.json`,
`interactions.json`, plus every PNG under `screenshots/`.

### 2. INTERACT

For anything `interactions.json` marked `success=false`, decide whether it
matters. If it does (e.g. hamburger did not open), fall back to the Cursor
browser and try manually — then write what you saw. See
[interactions.md](interactions.md).

Do not describe UI states you did not actually observe.

### 3. DOCUMENT

Fill `analysis.md` from the template. Be concrete. "Left-aligned hero,
~720px measure, primary CTA + text link, logo row immediately below the
fold" is analysis. "Clean and modern" is not.

### 4. UNDERSTAND (blueprint)

Fill `structure.md` from the template. For every page you researched, list
sections in order and answer for each: purpose, layout, components, content
shape, visual hierarchy, interaction, responsive behavior, our equivalent.
See [blueprint.md](blueprint.md).

Then fill the *Component inventory* — the reusable pieces you noticed
across pages. Give them names. This is what stops you inventing three
different card styles by accident.

### 5. RECREATE (map → plan → build)

Fill `content-map.md`: for every reference block, decide **Do we have it? →
Our version** and **Notes**. See [content-map.md](content-map.md).

Fill `implementation-plan.md`: the small, ordered list of files you will
actually change and things you will actually add. See
[implementation.md](implementation.md).

Only then start editing code. Reuse existing components. Do not add
dependencies for effects the project can already do with CSS. Run the
[slop filter](slop-filter.md) before you ship.

### 6. COMPARE

Screenshot our page at the same widths. Fill `comparison.md`. Look for
missed *jobs*, not missed pixels. See [compare.md](compare.md).

### 7. IMPROVE

Loop: fix a structural miss → capture again → update `comparison.md`.
Stop when every job the reference does, our page also does (or we have
consciously decided to skip it).

## What this mode is NOT

- Not a clone. Never copy branding, unique copy, images, illustrations,
  invented statistics, testimonials, or a signature palette.
- Not a template collector. Do not port 12 sections onto a 6-section site
  just because the reference has them.
- Not a pixel-hunt. Structural intent > pixel precision.
- Not a solo pass. If Playwright cannot see a state, say so and use the
  Cursor browser. Do not invent interactions.

## Guardrails

- If the reference has a team grid and we are one person, our version is
  an About block, not a fake team.
- If the reference has a mega-menu and we have five links, our version is
  the ordinary bar.
- If the reference has aggressive motion and our design language is quiet,
  keep it quiet.
- If the reference invents statistics, do not invent statistics.

## Two quick modes users will ask for

**"Bygg vår hemsida likt denna."** Run the full loop. Stop for approval
after the plan; ask before implementing more than a couple of sections.

**"Studera bara hamburgermenyn/tjänsterna/hero'n."** Skip the crawl
(`--only-home` on research.py) and focus interactions on the target
surface. Deliver a narrow analysis + one implementation.
