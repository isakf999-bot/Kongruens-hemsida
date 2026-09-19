# Implementation plan — {{host}} → our site

Date: {{date}}
Reference: {{url}}

> **Purpose.** The narrow list of things we will actually change in our
> project, in order, before writing code. Everything on this list is
> traceable back to `structure.md` (why) and `content-map.md` (what).

## Ground rules

- Keep our brand, tokens, copy, routes, framework.
- Reuse existing components before adding new ones.
- Do not add dependencies for effects the project can already do.
- Every code change gets checked at desktop + mobile, and the hamburger has
  to actually open/close.
- Slop filter (see `references/slop-filter.md`) runs before shipping.

## What we take

| Take | Where from (reference section) | Where it lives in our code |
|---|---|---|
| Hamburger drawer with grouped services | Global header | `components/Nav/Nav.tsx` + `lib/nav.ts` |
| Contact section at bottom of home | Home last block | Add `<Contact asSection />` to `app/page.tsx` |
| Services as flat text list (not cards) | Home "Vad vi hjälper till med" | `components/Home/HomeHelp.tsx` |
| … | … | … |

## What we skip

| Skip | Reason |
|---|---|
| Team grid | We are one person |
| Newsletter | Not a channel we run |
| Sliding logo marquee | Slop risk; we do not have logo permissions |
| … | … |

## Execution order

Small edits before large refactors. Ship each step in a state where the site
still runs.

1. [ ] `lib/nav.ts` — grouped `serviceNavGroups`.
2. [ ] `components/Nav/Nav.tsx` — hamburger always visible, grouped drawer.
3. [ ] Redirects: `/paket` → `/kontakt`, `/tjanster` → `/`.
4. [ ] `components/Home/HomeHelp.tsx` — remove card grid, adopt list layout.
5. [ ] `app/page.tsx` — mount `<Contact asSection />` at the end.
6. [ ] `components/Footer/Footer.tsx` — services column mirrors hamburger.
7. [ ] Sitemap + metadata cleanup (drop dead routes).
8. [ ] Verify in browser: desktop + mobile, hamburger open/close, redirects.
9. [ ] Fill `comparison.md`.

## Files we plan to touch

- …

## Files we plan to leave alone

- …

## Follow-ups (not blocking)

- …
