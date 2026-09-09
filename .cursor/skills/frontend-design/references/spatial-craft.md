# Spatial craft

This is how a page holds together in space. Read it whenever you are placing a hero lockup, a nav, a section chapter, a card grid, or any element that sits against photography.

For *seeing* (weight, grouping, three reads) use [composition.md](composition.md). For the pieces themselves, [components.md](components.md). For widths as a new composition, [responsive.md](responsive.md).

## Measure first

Pick one horizontal rail and keep identity, hero type, and primary actions on it. The rail is usually the header's inner max-width plus its gutter. If the wordmark sits 4.5rem from the viewport edge, the H1 sits 4.5rem from the viewport edge — not "roughly left-aligned." Guessing produces a lockup that looks almost professional. Measuring produces one that is.

The gutter is a token (`--gutter`), not a one-off padding on the hero. Nav inner and hero copy must use the same shell (same max-width, same gutter, same centering). Two wrappers that both "look like 90rem" will diverge at 1920.

On interior pages the same rail continues. Do not invent a second content width for the first screen.

Space itself should come from a scale (4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96). Section rhythm lives at the top of that scale; gaps inside a lockup live at the bottom. If you need 18px, you wanted 16 or 24.

## Hero lockup

The hero is a thesis, not a banner with a caption.

- Find the quiet zone of the plate (sky, still water, shadow, negative space) and put type there. Do not drop marketing copy onto the busiest part of the photograph.
- Keep the lockup a group: kicker, title, one supporting line, actions. Tight vertical rhythm inside the group; generous air around it. Gaps inside the group should be a step or two on the spacing scale (8–24px); the gap from the group to the nav and to the fold should be clearly larger. If the button has drifted into its own region, it has left the lockup.
- Share the nav rail horizontally. Vertically, prefer a true optical center in the quiet zone over a bottom-left stack, unless the plate is a portrait with empty ground at the feet.
- Wide landscape looking outward wants type that feels like it belongs in the weather, not a sticker in the corner.
- Do not put a static `transform` on the same element that is being animated (zoom, Ken Burns, scale). The static transform wins or they fight. `animation-fill-mode: both` if you need the first keyframe on load.

## Chaptering, not collage

A page turns like chapters, not like overlapping magazines.

- Alternate grounds: dark hero → light surface → tinted paper → deep footer. Rhythm around 80–112px of vertical air on desktop; compress on small screens, do not delete the idea.
- Start the next section after the hero. Do not float a rounded paper sheet, bubble, or card that bites into the hero image. That is collage, and it dates immediately.
- Asymmetric grids (`0.85fr 1.15fr`, `1fr 1.2fr`) beat two identical slabs stacked forever. When you do stack, vary the measure and the photo side.
- Cards: one idea per card. Photo on top, white (or token surface) below, lift on hover. Featured state is a fill change or a true size change — not a middle card nudged up for "hierarchy."

## What structure is not

Hairline rules, left register lines, frames around photographs, and 1px borders used as "craft" are drawing, not structure. Structure is spacing, ground, and type scale. If you need to separate two thoughts, add air or change the ground. If you still need a line, you have not designed the chapter yet.

Image frames and card hairlines make photography look like it is in a template. Shadow + radius is enough for a card. Media gets shadow + radius only — never a stroke around the picture.

## Buttons and actions

Pills, not boxes with a wipe. One primary fill, one ghost if you need a second action. Hover lifts a couple of pixels with a deeper shadow; it does not dance letter-spacing, does not fill-wipe, does not grow a border. Compact nav CTAs are allowed — they should match the type size of the nav, not the display size of the hero.

A second action in a hero (ghost "about", ghost "work") must be quieter than the primary. Same height, lighter weight, transparent fill, hairline only if the plate is so busy that the ghost disappears — prefer contrast via type color and a real gap, not a new chrome language.

## Nav on dark heroes

When the first screen is a dark photograph or video, the nav starts light (white type, light brand) and becomes ink on paper after scroll. Do not leave a white bar over a dark plate "for contrast." Do not keep white type after the plate has ended.

Brand stacks (name over profession) are optically centered as a unit. The smaller line sits under the larger one, not left-aligned to a different origin unless the identity is a horizontal lockup by intent.

## Reveals

Blur + fade-up, roughly 0.7–0.9s, IntersectionObserver threshold around 0.12–0.18. One choreography for the site. Do not add a second signature motion on interior pages if the home hero already has one (living video, slow zoom). Restraint here is how the signature stays a signature.

`prefers-reduced-motion: reduce` freezes video, cancels Ken Burns, and shortens or removes reveals. Plan that path; do not bolt it on.

## Alignment QA

Before you ship a hero:

1. Same viewport width, inspect the nav brand's left edge and the H1's left edge. They match or you fix the padding, not the copy.
2. Check 1440 and at least one larger width. Max-width + auto margins will drift the lockup off the brand if the hero copy uses a different wrapper.
3. Check 390-wide. The group still reads; actions wrap as a group, not as orphans.
