# Typography: choosing and setting type

Read [type-color.md](type-color.md) first for the method. This file is the craft underneath a pairing.

## Typographic color, not hue

A block of text has a gray value — how dark the paragraph feels as a rectangle. That "color" comes from weight, size, leading, tracking, and the face's stroke. Two faces at `400` / `1rem` / `1.6` can look like different inks.

Set a paragraph, squint. If the body is pale and spindly, you need a slightly heavier book cut or a hair less leading — not a darker hex on the same thin face. If the body is a slab of charcoal, you need leading or a lighter cut, not `#444`.

Display type has a different color: it should be a shape in the layout, not a black bar. Tracking and leading at display size are compositional, not "readability settings."

## Contrast of structure

Pair by contrast of *structure*, not by collecting novelties.

Useful contrasts:

- Humanist serif display + neo-grotesk body
- Old-style serif body + a sharp grotesque for UI
- Geometric sans display + a readable humanist sans body (only if the brief is actually geometric)

Useless contrasts:

- Two display faces
- Serif + serif that share the same stress and x-height (looks like a mistake)
- A costume face (brush, blackletter, neon script) plus a "neutral" sans — the costume does all the work and dates in a year

Same-family pairings (display + text optical sizes, or a superfamily) are legitimate when the subject wants one voice spoken at two volumes. They are not a cop-out if the optical sizes actually differ.

## How to pick a face (procedure)

1. Write the voice adjective. Search and shortlist from that word and from materials (a tide log, a hymnal, a metal stencil), not from "best Google fonts 2024."
2. Test a *paragraph* of the real language (Swedish åäö, English, prices, long compounds) at 17px. Reject faces that crumple å/ä/ö, or whose italic is a sloped roman with no contrast.
3. Test the display at the real headline string, at the real size, on a photograph *and* on paper. Many faces are charming in a type tester and vulgar on a sea.
4. Check numerals in the real prices. Lining tabular for a price list; oldstyle can be right in running text and wrong in a tariff.
5. Limit weights to what you will use: book + medium + one bold is a system. Loading 200–900 is a costume rack.

Reject as a default body: Inter, Roboto, Open Sans, system-ui as the personality, Poppins as "friendly," Montserrat as "startup." They can exist in UI chrome; they should not be the voice unless the brief is actually that institution.

## Optical size and axes

Text cuts have sturdier serifs and looser spacing. Display cuts are high-contrast and tight. Using a display cut at 16px looks brittle; using a text cut at 80px looks sleepy.

Variable axes (SOFT, WONK, opsz, wdth):

- On paper, in a quiet interior, a little character is voice
- On photography and video, character becomes noise — the plate is already speaking
- `opsz` should follow actual size; do not freeze a display opsz on a mobile headline that has become 32px
- Extreme wonk is a poster trick. Posters are not heroes.

If the family has no optical sizes, compensate: slightly looser tracking at text sizes, slightly tighter at display, and do not push weight to fake contrast.

## Scale that can be seen

A scale is a set of roles, not a list of pixel values:

| Role | Job | Typical relationship |
| --- | --- | --- |
| Display / home title | Thesis | Clearly larger than h1 on interiors |
| h1 | Page title | Strong, not competing with a living plate |
| h2 | Chapter | Distinct from body by size *and* face or weight |
| Kicker | Label | Smaller than body, not louder than body |
| Body | Reading | 16–18px floor, 60–72ch, leading ~1.45–1.65 |
| Caption | Meta | Smaller, quieter, still readable |
| Button | Action | Related to nav, not to display |

Modular ratios (1.25, 1.333) are starting points. Optical jumps matter more: if h2 and body are only 2px apart, they are the same role. If the home title is 4rem and the interior h1 is 3.75rem, you do not have a hierarchy, you have jitter.

Do not scale type with viewport so aggressively that a title becomes a caption on mobile or a mural on 1920. Clamp with a mind: mobile title still a title.

## Setting

- **Alignment:** left rag for most UI and marketing. Centered only for short lockups that are actually centered as a group. Justified on the web makes rivers; skip it.
- **Rag:** watch for a jagged right edge with one-word leftovers. A slightly narrower measure often heals rag better than hyphenation everywhere.
- **Hyphens:** Swedish compounds get long; `hyphens: auto` with `lang="sv"` can help body, not display.
- **Tracking:** never on body. Small amounts on all-caps identity and some kickers. Archival/industrial voices can take more; pastoral voices usually take less. If you track a kicker over 0.2em, you are drawing a line, not setting type.
- **Case:** all-caps display of a person's name can be identity. All-caps paragraphs are shouting. Title Case on Swedish buttons often looks imported; sentence case or the locked label wins.
- **Line length:** 60–72 characters for body. Wider for a lede only if the lede is short. Full-bleed text is not luxurious.
- **Leading:** display tight (1.05–1.2) so the title is a block; body open enough to read; stacked all-caps identity tighter still, with a measured gap to the line beneath.
- **Hanging punctuation** is a nicety for pull quotes, not a reason to add a quote-mark illustration.

## Hierarchy without decoration

You do not need a bar, a number, or an underline to make an h2. Size, weight, face, and the air above it are enough. If an h2 still disappears, the body is too loud (too big, too bold, or too dark a measure of type color), or the section has no chapter turn.

Kickers that repeat on every block ("Our story", "What I do") become wallpaper. Use them when they classify; skip them when the heading already classifies.

## Identity and the H1 are relatives

Same rail, related case, related weight, related color (or a planned inversion on a dark plate). If the nav is a quiet sans and the hero title is a wonky serif, you have two brands sharing a browser tab. Either bring the title toward the identity on the plate, or bring the identity toward the title on paper — pick one family story.

## Language

Set `lang` correctly. Swedish needs faces with proper åäö and a capital Ö that does not look like an afterthought. Do not letterspace uppercase Swedish like American wood type unless that is actually the voice; the diacritics need room, not more tracking.

When copy is locked, including odd hyphenation or doubled words, the lockup is a typesetting problem: size, break, and rag. It is not a license to rewrite.
