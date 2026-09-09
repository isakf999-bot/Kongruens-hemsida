# Motion: one choreography

Read this before adding animation, scroll effects, or hover theater. Motion is expensive in attention. Spend it like chroma: mostly none, then one clear phrase.

## What motion is for

Name the job:

- **Arrival** — the page comes to rest (hero plate begins, lockup settles)
- **Continuity** — a chapter is revealed as you reach it, not as a carnival
- **Confirmation** — hover/focus/press: the control is alive
- **State** — a menu opens, a field errors, a dialog appears

If the motion is "because static felt empty," add composition, not keyframes.

## One phrase per site

Write the phrase in words: "the weather is already moving; type sits; chapters fade up once." Then forbid competing phrases (Ken Burns on interiors, scale on every card, a canvas behind the footer).

Home may own arrival (video, a single slow settle). Interior pages inherit continuity (the same reveal) and confirmation (the same hover). They do not get a new arrival.

## Time and ease

Humans read slower than UI defaults.

| Kind | Duration | Ease | Notes |
| --- | --- | --- | --- |
| Hover lift | 150–220ms | ease-out | 1–2px translate, shadow deepens |
| Focus ring | instant to 120ms | linear | Must be visible immediately |
| Menu / overlay | 200–320ms | ease-out | Opacity + a small travel, not a bounce |
| Chapter reveal | 700–900ms | ease-out or a gentle cubic | Blur + fade + 8–16px rise |
| Hero plate start | delay ~400–700ms | — | Poster first; then play |
| Page transition | skip unless the product is an app | — | Marketing sites rarely need them |

`0.4s` on everything is a tell. So is `spring` bounce on a pastoral brief, and `linear` on a lift (it feels mechanical).

Do not stagger 12 children with 80ms delays that make the page feel like a slot machine. A small stagger (2–4 items in a lockup) can group them; a whole page of staggers is a template.

## Reveals

IntersectionObserver around `0.12–0.18` threshold, once. Blur of a few pixels, not 20. Distance of a fraction of a line, not 80px (that feels like a slide deck).

Respect `prefers-reduced-motion: reduce`: opacity only, or no reveal. Never keep blur animation when reduced motion is on.

Do not reveal the hero lockup *and* run a zoom *and* start a video. Pick the plate *or* the type as the moving part.

## Hover is confirmation

Buttons: lift and shadow. Links in body: color or underline, not a translate that reflows the paragraph. Cards: lift the whole card. Images: do not scale on hover if the crop is the composition — you are undoing the crop.

Never combine: letter-spacing dance, fill wipe, growing underline, and scale. One confirmation.

## What not to move

- Body copy
- Hairlines you should have deleted
- Background gradients that drift (mesh, aurora) unless the brief is that kind of object
- Random looped canvases that do not belong to the subject
- Loading shimmers on a static site

## Reduced motion is a design

Plan the still version: poster, no zoom, reveals off or instant, menus still open. If the still version is ugly, the moving version was hiding a weak layout.
