# Interactions — what a static screenshot cannot see

A designer opening the reference in a real browser would immediately do
these things: click the hamburger, hover the primary nav, expand a FAQ,
scroll a slider, open a modal. This skill has to do the same.

## Script

```bash
python <skill>/scripts/interact.py "https://example.com"
```

For each interaction it tries, it writes:

- a PNG under `screenshots/interactions/`
- an entry in `interactions.json` with `success`, `viewport`, `kind`,
  `label`, `selector`, and (for dropdowns) whether it opened on `hover`
  or `click`

It attempts:

| Viewport | What |
|---|---|
| desktop | Every visible dropdown trigger (`aria-haspopup`, hover-menus) |
| desktop | Hover on the header CTA |
| desktop | First visible accordion/details/FAQ item |
| desktop | Second tab in a tablist |
| mobile  | Hamburger toggle |
| mobile  | First accordion (many sites collapse content into accordions on mobile) |

Failed attempts are recorded with `success=false` and a `note`. That
matters: it stops downstream steps from inventing behavior.

## What to do when the script cannot see something

Reach for the Cursor browser and drive it by hand. Use it for anything
that needs sequence or precise timing:

- Multi-step forms
- Sliders / carousels that autoplay
- Custom animations only triggered by scroll velocity
- Modals gated behind an intent (exit intent, delay, scroll depth)
- Auth flows (only when the user asked, and the site allows demo access)

Recipe:

1. `browser_navigate` to the URL.
2. `browser_lock` the tab.
3. `browser_snapshot` for structure.
4. `browser_click` / `browser_type` / `browser_scroll` etc.
5. `browser_take_screenshot` after each meaningful state.
6. `browser_lock` `action=unlock` when done.

Save the screenshots under
`references/inspiration/<host>/screenshots/interactions/` with descriptive
names (`carousel-slide-3.png`, `modal-newsletter.png`,
`sticky-header-scrolled.png`) and append entries by hand to
`interactions.json` so the record stays complete.

## What to observe (checklist)

Navigation:

- Placement, order, active-route indicator
- Hover vs click dropdowns
- Overlay dimming, focus trap, scroll lock
- Close: X button, same toggle, Escape, tap outside

Hamburger (mandatory when a menu button exists):

- Breakpoint where it appears
- Icon: static lines / animated / labeled
- Open pattern: full-screen, right drawer, dropdown under header, push
- Header behavior while open
- Submenu behavior (nested drawer, accordion, none)
- CTA placement in the open menu
- Animation duration and easing — copy the *spirit*, keep ours subtler

Content interactions:

- Accordion / details expansion
- Tabs
- Sliders / carousels (arrows, dots, autoplay)
- Image galleries / lightboxes
- Video autoplay + poster behavior
- Forms (client-side validation, inline errors)

Scroll-driven:

- Sticky header state changes
- Parallax
- Reveal-on-scroll animations
- Anchor scroll offsets

## Reporting rules

- Only claim behavior you or the script actually observed.
- If a state is speculative, say so explicitly ("looks like a hover
  menu but never opened").
- Prefer under-claiming to over-claiming. Missing a subtle animation is
  cheap; inventing one poisons the plan.
