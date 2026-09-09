# Responsive: a new composition, not a shrink

A breakpoint is a chance to re-compose. Scaling the desktop down until it fits is how lockups collide and type sits on the busy part of the crop.

## What stays

- The rail idea: identity and titles share an edge (now a smaller gutter, same rule)
- The token family
- The signature medium (if home is a living plate, it stays a plate — crop changes, job does not)
- Copy, including locks and line breaks you do not control — you typeset, you do not rewrite

## What changes

- **Crop:** `object-position` is a mobile decision. Re-check quiet zones; a sky that existed at 1440 may be gone at 390.
- **Lockup placement:** optical center may become upper third so the subject of the photo can remain. It should still be a group. Do not send the button to a random bottom safe-area while the title stays high — that is two lockups.
- **Type:** titles reduce with clamps, but must remain titles. Body stays ~16–17px; shrinking body to 14px to "fit more" is not responsive, it is unread.
- **Grid:** 2fr/3fr becomes 1 column. Featured cards become full width, then a stack. Do not keep 3 columns below 700px.
- **Nav:** row becomes a toggle. The compact primary remains visible if booking is the job.
- **Air:** 96px chapters become ~56–72px. Do not go to 16px section padding; the chapter idea dies.

## Widths to actually look at

Not every integer. These are enough to catch lies:

| Width | What usually breaks |
| --- | --- |
| 390 | Crop, lockup group, tap targets, type on reeds/faces |
| 768 | Uncanny two-column that should have stacked; nav halfway |
| 1280 | Hero vs laptop height; 100vh eating the intro |
| 1440 | The design you thought you made |
| 1920 | Max-width centering drifting off the nav rail |

If the shell is `max-width + margin: auto` and the hero copy is `100%` of a different wrapper, 1920 is where the H1 leaves the wordmark.

## Viewport height

Short screens: a 100vh hero with a huge title hides the fact that there is a page. Prefer min-heights that can yield. Sticky headers on mobile steal vertical quiet zone; account for them in the lockup padding (`env(safe-area-inset-*)` included).

## Type wrapping

Locked headlines may wrap badly. Your job is breaks and size, not a shorter slogan. Test the real string. A name in all caps at 3rem on 390px may need to be 1.75–2.25rem and still be the loudest type on the screen.

Avoid mid-word breaks in display. `hyphens: none` on titles; allow on body with `lang`.

## Images and video

Do not serve the desktop focal point blindly. A vertical crop of a wide sea often wants the horizon kept, which means more sky or more water — pick, then set position. Video: `object-fit: cover` with the same focal rule; poster must match.

## What "mobile first" is not

It is not a single column of identical cards with the same padding as desktop. It is a stack with a remaining hierarchy: title still dominates, chapters still turn, the primary action still looks like the same pill.

If the mobile page is just the desktop nav + a smaller photo + everything else 1col, look again at crop and lockup. That is a linearization, not a composition.
