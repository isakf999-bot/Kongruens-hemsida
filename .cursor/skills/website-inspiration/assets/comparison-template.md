# Comparison — our site vs {{host}}

Date: {{date}}
Reference: {{url}}

> **Rule.** We are comparing *structural intent*, not pixels. The goal is to
> catch missed jobs — a CTA that vanished on mobile, a hamburger that no
> longer scroll-locks, cards that never stack — not to match their logo
> spacing.

## Evidence

- Reference screenshots: `references/inspiration/{{host}}/screenshots/…`
- Our screenshots (add): `references/self/…` (capture with the same viewports)

## Scoreboard

For each dimension: ✅ matched intent · ⚠️ close but off · ❌ missing

| Dimension | Reference | Ours | Verdict | Fix |
|---|---|---|---|---|
| Information architecture (section order) | | | | |
| Section density / rhythm | | | | |
| Header pattern (bar + hamburger + CTA) | | | | |
| Hamburger drawer behavior | | | | |
| Hero: eye path + primary CTA visibility | | | | |
| Services block layout | | | | |
| Cases: proof format | | | | |
| Contact placement in flow | | | | |
| Footer density | | | | |
| Mobile stacking order | | | | |
| Interaction (accordion / dropdown / modal) | | | | |
| Typography hierarchy | | | | |
| Spacing / breathing room | | | | |
| Slop check (see `slop-filter.md`) | n/a | | | |

## Structural misses to fix

Numbered actions, tied back to `implementation-plan.md`.

1. …
2. …

## What we chose to differ on (deliberate)

Not everything is a miss. Record the ones we consciously did *not* copy.

- …

## Final QA (before closing the loop)

- [ ] Desktop layout matches intent, not pixels.
- [ ] Tablet stacking looks intentional, not "broken desktop".
- [ ] Mobile hamburger opens, closes, traps focus if it should, restores scroll.
- [ ] Every section has a clear job (see `structure.md`).
- [ ] Nothing on the page looks generic-AI (see `slop-filter.md`).
