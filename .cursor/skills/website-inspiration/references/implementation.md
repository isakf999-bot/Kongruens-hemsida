# Implementation

Adapt the reference into the current project. Do not replace the
project with the reference.

## Gate

If scope is missing, ask: **Vilken del vill du implementera?**

If scope is clear, still do: analyze → propose a short plan → implement.
The plan should list:

- What we take (structure / UX / spacing rhythm)
- What we skip (extra sections, brand motion, their copy)
- Which existing files we will edit
- Which components we will reuse

The plan lives in `implementation-plan.md` (scaffolded by
`research.py`; template at `assets/implementation-plan-template.md`).

Never recreate all 12 reference sections when we need 6.

## Before writing code

1. Read the project's existing nav, layout, tokens, and the page you
   will change. Do not build a second header when one exists.
2. Identify the framework already in use. Stay on it.
3. Read the shared inventory in `structure.md → Component inventory`.
   Reuse components (buttons, cards, section wrappers, logo). Do not
   duplicate them.
4. Do not add dependencies for effects the project can already do with
   CSS. If the project uses Tailwind, do not add styled-components.
5. Do not casually rewrite routing, global styles, or unrelated pages.
6. If nav grouping is in `lib/nav.ts` already, extend it — do not fork.

## Adapt, don't transplant

Keep ours:

- Name, logo, palette, type, voice, routes, content

Take from them:

- Layout skeleton, nav behavior, hierarchy, responsive strategy,
  interaction pattern

A good outcome is someone saying "this navigation works like that
site" — not "this is that site with our logo stuck on."

## Order of operations

Small edits before large refactors. Ship each step in a state where
the site still runs.

1. Structural constants first (`lib/nav.ts`, tokens, redirects).
2. Chrome next (Header, Nav, Footer).
3. Home page sections in reading order.
4. Subpages that changed shape.
5. Sitemap, metadata, chatbot copy that references removed sections.
6. Browser verification.
7. Fill `comparison.md`.

## Build quality

- Components stay small and named for their job (see
  [components.md](components.md))
- CSS/utility classes stay consistent with the project
- Motion stays subtle and functional (open/close, scroll state).
  Skip brand-specific flourishes.
- Hamburger: open, close, Escape, `aria-expanded`, non-tabbable when
  closed — then actually click it in the browser
- Every visible statistic / number / logo is real; kill fakes
  (see [slop-filter.md](slop-filter.md))

## Visual comparison

After implementation, screenshot our page at the same widths. Compare
against `references/inspiration/<host>/` and write `comparison.md`. See
[compare.md](compare.md) for the loop and the scoreboard.

The question is:

**Is our implementation inspired by the structure?**

Not:

**Is our implementation pixel-perfect?**

Fix only structural misses: CTA that vanished on mobile, nav that does
not stick if that was the point, cards that never stack, type hierarchy
that went flat. Do not nudge pixels toward their logo spacing.

## Test in the browser

1. Run the project if it is not running (`npm run dev`)
2. Desktop: header, hero, primary CTA, any new interaction
3. Mobile width: hamburger open/close, stacked sections, tap targets
4. A related route that shares the header/footer — confirm we did not
   break it
5. Redirects work (e.g. `/paket`, `/tjanster` from earlier work)

If browser tools are unavailable, say what you could not click, and
still reason from screenshots + code.

## The slop filter is a shipping gate

Before you announce "done", run the checklist in
[slop-filter.md](slop-filter.md). Anything you cannot justify comes out.
