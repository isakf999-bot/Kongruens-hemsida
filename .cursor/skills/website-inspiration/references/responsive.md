# Responsive behavior

The point is the **reflow logic**, not a gallery of three widths.

## Viewports

Capture and compare at least:

| Name | Width | Notes |
|---|---|---|
| Desktop | 1440 | Primary composition |
| Tablet | 768 | Often where nav collapses |
| Mobile | 390 | Thumb layout, hamburger required |

If the reference is clearly a large-desktop design (wide bento, side
nav), also glance at 1280. `capture.py` handles all three viewports by
default; `--skip-tablet` is available when the site clearly does not
change between 1440 and 768.

## Questions to answer

For each major region (header, hero, sections, cards, footer):

- What disappears?
- What moves?
- What stacks, and in which order?
- How does navigation change, and when does the hamburger appear?
- How does typography change (size, line length, alignment)?
- How does spacing change (section padding, gaps)?
- How does the grid change (4 → 2 → 1, or 3 → 1)?
- How do images change (crop, full-bleed, hide)?
- How do buttons change (full-width, stacked, hidden secondary)?
- How is overflow handled (horizontal scroll vs wrap vs hide)?

Write those answers under **Responsive behavior** in `analysis.md` and,
per section, in `structure.md`. A table is fine.

## Mobile is not an afterthought

Treat mobile as its own design pass, not "desktop with narrower
columns". Ask:

- Which desktop decisions do not survive at 390?
- Where does the primary CTA live on mobile? Is it still above the fold?
- Does the hero image sit above or below the headline?
- Do sections that were "text on the left, image on the right" become
  "text then image" or "image then text"? Order matters — it changes
  what the visitor sees first.
- Does the hamburger open into a drawer, a full sheet, or a dropdown?
  See [navigation.md](navigation.md).

Record these decisions in the *Responsive behavior* row of each section
in the blueprint. During implementation, resize our site through the
same three widths and confirm nothing we adapted only works at 1440.

## Implementation rule

Match the *strategy* (stack cards to one column; keep CTA visible
beside the menu icon; hero image drops below the headline). Do not
match their exact breakpoints (`lg:`, `768px`, etc.) unless they
already align with the current project's scale.

## Evidence in JSON

`inspect.json → scale.maxWidthsPx` and
`inspect.json → sections[].height` give you a rough sense of the
reference's container and section rhythm. Match the *intent* (e.g. "a
wide 1200 container with generous 96–128px section padding"), not the
exact numbers.
