# Navigation and hamburger

Treat navigation as a product surface, not a list of links. Treat the
hamburger as its own component. Evidence comes from
`interactions.json` — see [interactions.md](interactions.md) for how it
is produced and how to fill the gaps.

## Desktop pass

Record:

- Placement: top bar, left rail, overlay, split (logo left / links right
  / CTA far right)
- Items: labels, order, which item is a CTA
- Dropdowns: hover vs click, nested levels, alignment, dismiss
- Sticky/fixed: always, after scroll, transparent-over-hero then solid
- Height, blur, border, shadow at rest vs scrolled
- How the active route is shown

Cross-reference `interactions.json` — every dropdown trigger is captured
with `openedVia: "hover" | "click"`.

## Mobile / hamburger pass

For every reference with a collapsed nav, document all of this:

| Question | Why it matters |
|---|---|
| When does the hamburger appear? | Breakpoint we must match in spirit, not in pixels |
| What does the closed icon look like? | Lines, animated to X, labeled button |
| How does it open? | Full-screen overlay, right drawer, dropdown under header, push content |
| Overlay / dimming? | Body scroll lock? Focus trap? |
| Close control | X, same toggle, tap outside, Escape |
| Animation | Duration, easing, origin. Keep ours subtler if theirs is brand-specific |
| Link size and spacing | Thumb targets vs cramped stacks |
| CTA placement in the open menu | Often last, full-width |
| Does the header stay visible while open? | |
| Submenu behavior | Nested drawer, accordion inside drawer, none |

Screenshot **closed header** and **menu-open** on mobile. If opening
fails, say so in the report — do not fake the shot. The interaction
script marks failures as `success=false`.

## Responsive nav logic

Compare desktop vs tablet vs mobile:

- What becomes a hamburger, and at which width
- Which links disappear vs move into the drawer
- Whether the CTA stays visible next to the icon
- Whether the bar height / padding changes
- Whether logo shrinks or wordmark hides

The implementation should reproduce the *behavior class* (sticky
translucent bar + full-screen mobile sheet, for example), not the icon
drawing or the brand type.

## Accessibility baseline (ours, after adapting)

When implementing, the reference may be inaccessible. Do not copy that.
Ours needs:

- A real `<button>` with `aria-expanded` and `aria-controls`
- Visible focus
- Escape to close
- Click/tap outside or an explicit close
- `aria-hidden` / `tabIndex` so closed-menu links are not tabbable
- No keyboard trap unless it is a modal overlay (then trap and restore)

## Adapting into the current project

Read the project's existing nav first (`components/Nav`, `lib/nav.ts`).
Prefer editing that component over adding a second header.

Keep:

- Our routes, labels, language, logo, CTA wording
- Our color tokens and type

Take from the reference:

- Information architecture of the bar (logo / cluster / CTA)
- Open-state pattern (sheet vs overlay vs accordion)
- Scroll appearance
- Breakpoint behavior

If the reference uses a mega-menu and we have five links, do not invent
a mega-menu.

## Menus with content

Some references use the drawer as a mini information architecture
(services grouped by category, contact block at the bottom, secondary
links in a small type row). If the reference does this, mirror the
*structure* using `serviceNavGroups` / `menuPageLinks` from our
`lib/nav.ts` — that file exists precisely to make this kind of
restructuring easy without hard-coding the menu.
