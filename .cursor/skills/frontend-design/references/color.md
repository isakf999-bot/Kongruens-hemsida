# Color: sampling, roles, and restraint

Read [type-color.md](type-color.md) first. This file is how to mix a palette that could not be swapped onto another subject.

## Sample, then name roles

Do not start in a color picker. Start in a material.

1. Sit with a photograph or a precise description of one (hour, weather, surface).
2. Pull five swatches: the darkest still area, the lightest paper-like area, the mid ground, one chromatic note, one "almost gray."
3. Discard two. You are building a page, not a painting.
4. Assign roles, not pretty names:
   - **Paper** — largest light ground
   - **Paper-2** — the same family, shifted (cooler, duskier) for a chapter turn
   - **Surface** — raised (cards). Often paper plus a hint of light, not `#ffffff` by default
   - **Ink** — body text. Sampled from the dark of the material, then darkened or warmed until type holds
   - **Deep** — footer / dark hero chrome / featured fill
   - **Accent** — the one working chromatic, used rarely

Paper is almost never `#ffffff`. Ink is almost never `#000000`. Those two together are a default printer, not a room.

## Neutrals from the chromatic

Mix grays *through* the material. A blue-hour site wants blue-gray paper and green-black ink, not a cold CSS gray next to a teal button. A wool-and-oak site wants gray that leans umber.

`color-mix(in srgb, var(--deep) 8%, var(--paper))` is a way to stay in family. A new `#e5e5e5` is how a second, accidental brand appears in borders and disabled states.

Borders, if you need them at all, should be paper darkened through ink at 6–12%, not `#ddd`.

## Chroma discipline

Most of the page is low chroma: paper, ink, deep. The accent has chroma so that a button and a focus ring can be found. If kickers, icons, rules, and hover states all use the accent, you have no accent — you have a theme.

Featured surfaces: fill with **deep** (or paper inverted), not with a second hue. A second hue is a second brand.

Hover: lift and shadow, maybe a slightly deeper mix of the same fill. Do not jump to a complementary color for "energy."

## Temperature

Decide whether the plate is cool or warm, then let paper and ink agree. A cool sea with warm cream paper is a clash unless you *mean* the interior to feel like a lamp-lit room after dusk — in which case that is a chapter turn, not an accident in the hero.

Text on a photograph: match temperature. Cool white (`#e8eef2`) on dusk water will sit; cream on dusk water will look like a different postcard glued on.

## Type on photography without a wash

A full-image overlay (`linear-gradient`, black at 40%, `brightness(0.7)`) turns a photograph into a texture so you can ignore placement. Placement is the job.

Order of operations:

1. Move the lockup into a quiet, darker or lighter zone
2. Choose type color from the plate (a sampled mist, not `#fff` by reflex)
3. Add a *local* text-shadow or a short gradient behind the *text box only* if the zone still shimmers
4. Only then, if the brief wants a graded cinematic plate, grade — as a look, not as a crutch

If you need step 4 to read a title, the crop or the type size is wrong.

## Contrast as a floor

Body on paper should comfortably exceed WCAG AA. Captions can be quieter but not fog. Placeholder text that disappears is a bug.

White type on a hero does not get a free pass because it is "over an image." Check the actual crop at 390 and 1440. A title that reads on the desktop sky may sit on reeds on mobile.

Do not pump *all* type to 21:1 by using black on white everywhere. That is a checker passing, not a room. Reach AA, then keep the material.

## Dark chapters

Deep is a color you mixed, not `rgb(20,20,20)`. Body text on deep is paper or a mist sampled from the plate, not `#fff` at 100% on every label. Mute captions on dark with alpha *in the same hue family*. Links on dark: accent if it still reads, or paper with an underline — do not introduce neon because "dark mode needs a glow."

A dark band under a dark hero is not a chapter; it is a continuation. Change value (go to paper) or change the job of the section.

## What palettes are doing when they fail

| Failure | What you actually did |
| --- | --- |
| Looks like every "calm" site | Used cream + sage + stone without sampling |
| Looks like a template | Paper `#fff`, ink `#111`, accent from a trendy chart |
| Looks muddy | Too many mid chromas, no deep, no paper |
| Looks loud | Accent on too many roles |
| Looks dead | All neutrals from a cool CSS gray, material was warm (or the reverse) |
| Photo looks dirty | Overlay + desaturate instead of placement |

## One accent, many states

Link, button fill, focus ring, and selected state can share the accent. Visited links: a mix toward ink, not purple-from-the-browser. Focus: a 2–3px ring offset, visible on both paper and deep. Do not use outline: none without a replacement.

If the accent fails on deep (teal on teal-black), the button on dark chapters should invert (paper fill, deep type) rather than invent hue #2.
