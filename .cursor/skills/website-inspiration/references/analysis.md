# Analysis — the decision document

Turn screenshots + `inspect.json` + `interactions.json` into a compact
decision document at `references/inspiration/<host>/analysis.md`.
`research.py` scaffolds this file for you; the template lives at
`assets/analysis-report.md`.

Analysis is one of five deliverables in the persistent library:

| File | What it decides |
|---|---|
| `analysis.md` | What the site *is* and what we should steal / skip |
| `structure.md` | The site expressed as sections + components (blueprint) |
| `content-map.md` | For each block: do we have it, and what is our version |
| `implementation-plan.md` | The narrow list of files we will actually change |
| `comparison.md` | After implementation: what still misses the point |

If you have less than 30 minutes, fill `analysis.md` and `structure.md`.
The other three matter for Reference→Ours mode (see
[adaptive.md](adaptive.md)).

## What to look for

### Layout

Max-width and container padding. Grid vs flex. Column counts. Section
height (compact vs cinematic). Alignment (left-ragged vs centered).
Spacing scale — the *rhythm*, not every pixel. Padding inside sections
vs gaps between them. Numbers from `inspect.json → scale`.

### Typography

Style (serif/sans/mono), hierarchy (how many heading sizes actually
exist), body size and line-height, measure (text width), alignment.
Whether headings are oversized for fashion or restrained for a product
site.

### UI

Buttons (primary/secondary, radius, padding). Cards (border vs shadow
vs flat). Icons (stroke, size). Images (full-bleed, inset, device
frames). Backgrounds and dividers.

### Visual hierarchy

Answer in the report, in plain language:

1. What does the eye hit first?
2. What does it hit second?
3. What keeps me scrolling?
4. Where is the CTA in that path?

If you cannot answer those, capture more of the hero and the first two
sections.

## Why the structure works

Do not only name blocks. Name the job of the sequence.

Example: `Header → Hero → Social proof → Features → Case studies → CTA
→ Footer` is a conversion sequence: value, then trust, then mechanism,
then proof, then ask.

Use that as inspiration. Drop, merge, or reorder blocks when they do
not fit our site. A 12-section marketing page is not a template for a
6-section freelance site.

## Fill rules

- Keep each bullet concrete. "Clean and modern" is not analysis.
  "Left-aligned hero, ~720px measure, primary CTA + text link, logo row
  immediately below the fold" is analysis.
- Reference specific screenshots / JSON keys when it helps.
- The report is the decision document; the images and JSON are the
  evidence.

## Design patterns cheat sheet

| Pattern | Typical job |
|---|---|
| Hero + single CTA | Direct the next step |
| Hero + social proof | Borrow trust before features |
| Bento / card grid | Scanable capabilities |
| Alternating image/text | Narrative, slower |
| Pricing table | Decision |
| Testimonials | Reduce risk |
| Sticky CTA bar | Recover lost conversion |
| FAQ accordion | Handle objections without leaving |
| Marquee logos | Proof, low-cost |
| Bottom-of-page contact form | Convert without a bounce |

Pick patterns that match our page's job. Do not collect them all.
