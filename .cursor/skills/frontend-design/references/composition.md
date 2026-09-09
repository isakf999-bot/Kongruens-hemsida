# Composition: how a page is seen

Read this with [spatial-craft.md](spatial-craft.md). Spatial-craft is rails, chapters, and components in space. This file is *seeing*: weight, entry, grouping, and the three speeds a screen is read.

## The three reads

Design for all three, in order. If the first read fails, the other two are decoration.

**One second.** What is this, and where do I look? One dominant: a plate, a title, or an object. Not a title *and* a competing photo *and* a bright button of equal weight.

**Five seconds.** Can I group the page? Identity, thesis, way forward. The lockup must be a single silhouette, not four leftover pieces.

**Thirty seconds.** Does the next chapter feel like a turn, or like more of the same block? Alternating grounds and a change of measure do this. Another row of three cards does not.

Test by squinting (or a 20px blur on a screenshot). The dominant should still be obvious. If the blur is a gray mush with a bright pill in the corner, the hierarchy is the pill, and you did not mean that.

## Figure and ground

The plate is either figure or ground. If a photograph is the thesis, type is a guest: small enough, placed in a quiet zone, related to the identity. If type is the thesis, the photograph is a crop or it is absent.

Most generic heroes try to make both figure. That is why they grow a gradient scrim — to knock the photo back into ground after the fact. Place first. Grade never, unless the brief is a graded plate.

Quiet zones are not "the left third." They are where the image has less frequency: sky, still water, wall, out-of-focus field, shadow. High frequency (reeds, gravel, a face, type already in the photo) will fight your type no matter how large you set it.

## Optical vs mathematical

Align to what the eye believes, not only to the box.

- A lockup centered in the hero's bounding box often sits too low; optical center on a tall field is slightly above geometric center.
- A wordmark and an H1 can share a left coordinate and still look misaligned if one has a wide capital and the other starts with a round letter. Nudge by a fraction of the type size, or choose the rail from the identity's optical edge (the stem of the H, not the bounding box of a ghost button).
- A stack of name + profession that is `align-items: flex-start` will look like the profession is sliding off. Center them as a unit unless the identity is a horizontal lockup.

Measure the rail with the inspector. Then look. If they disagree, the eye wins *after* you understand why (usually overhang of O/C/S, or a wrapper with different padding).

## Visual weight

Weight is not font-weight. A small solid pill can outweigh a large thin headline. A face in a photograph outweighs a paragraph. White type on a busy sea can outweigh the sea if you add a slab behind it — which is how overlapping cards happen.

Balance asymmetry by trading weight, not by mirroring. A heavy photo on the right wants quieter type and more rag on the left, or a smaller photo and a stronger title — not a second photo "for balance."

## Grouping (use this, do not cite it)

- **Proximity:** kicker, title, lede, actions sit closer to each other than to the nav or the fold. If the button has wandered 8rem below the title, it is not in the lockup.
- **Similarity:** one button language, one caption language, one card language. A second radius or a second shadow family splits the site into two products.
- **Continuity:** the nav rail continues as the text rail. A break in that line is a new section, and should come with a new ground, not a random indent.
- **Common region:** a card is a region. A whole section is a region. A rounded sheet floating across the hero+intro boundary is two regions pretending to be one — collage.

## Entry path

The eye enters at the highest contrast near the optical top, then follows faces, then large type, then buttons.

On a living landscape, entry is often the horizon or the sun. Put the lockup *related* to that line (above it in the sky, or in the still water), not pasted in a corner that the eye never visits. Bottom-left is a print-ad habit from when the logo had to clear a product shot. It is not a law.

Interior pages with a dark still: entry is the title. Do not also run a Ken Burns; you are asking the eye to watch the picture and read the thesis.

## Negative space is drawn

Air is a shape. Even padding around a lockup should feel intended: more below a title than between title and kicker; more around the group than inside it. Equal padding on all four sides of a hero lockup looks like a component dropped in a slot.

Section rhythm (roughly 5–7rem on desktop) is the large beat. Inside a section, use a smaller beat (1–2rem) consistently. Mixing 11px, 27px, and 64px gaps with no scale reads as unsettled, not "organic."

A spacing scale (4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96) is a decision tool. When you want 18px, you probably wanted 16 or 24.

## Grids without looking like a grid

A 12-column mental grid is fine. What reads as templated is *always using it the same way*: 6/6 splits, three 4s, hero 12. Prefer 5/7, 4/8, 0.85fr/1.15fr, or a full-bleed plate with type on the rail. Break the grid on purpose for the signature (full-bleed media, a quote at a wider measure) and return.

Max-width is part of composition. 90rem with a generous gutter is a different site from 70ch centered. Body text should still land near 60–72 characters; a wide shell is for lockups and images, not for stretching paragraphs.

## Fold and field

The fold is not a hard line. It is whether the thesis is complete before the first scroll: identity visible, title readable, a way forward visible. Do not hide the only CTA below a 100vh plate unless the plate *is* the product.

On short laptops, 100vh heroes eat the intro. Prefer `min-height: min(100vh, …)` or a hero that can shrink; do not crop the quiet zone away to save the button.

## Interior vs home

Home may have a living signature. Interior heroes are usually still, shorter, and quieter — same rail, same type relatives, less duration. Repeating the home stunt on every route makes the signature ordinary.

## What "more composition" is not

It is not more boxes. If a layout feels weak, change the relationship between two existing things (scale, crop, rail, ground) before introducing a third.
