# Content map — translate, don't transplant

`content-map.md` (from `assets/content-map-template.md`) is where you
decide, block by block, what our version of a reference section is.

## The one rule

Ask: **"What is our version of this?"**

Not:

- "Should we copy this?"
- "How do we make ours look like theirs?"
- "What do we need to translate to Swedish?"

The whole point is that you already understood the *job* of each block
in the blueprint. Here you turn each job into a concrete, ours-specific
answer.

## Column-by-column

- **Reference block.** Section name (matches the entry in
  `structure.md`).
- **Job.** Why the block exists on the reference.
- **Do we have it?** Yes / No / Partial, given our current site.
- **Our version.** Concrete: which route, which component, which copy,
  which owner. Enough detail that another turn could implement it.
- **Notes.** Anything that would embarrass us if we copied it literally
  (fake team, borrowed testimonials, invented statistics, brand-owned
  palette, someone else's illustration style).

## Decisions the map is allowed to make

- **Adopt.** We take the pattern. Add it to `implementation-plan.md`.
- **Skip.** We do not have that content and inventing it would be slop.
  Say so, briefly.
- **Replace.** We adapt the job to something we actually do (e.g.
  Team → About; Newsletter → RSS + contact; Awards → Case metrics).
- **Defer.** We can copy the shape, but the content is not ready.
  Record it as a follow-up and leave the section out of the plan.

## Content we will never copy

- Company name, logo, imagery, illustrations, icons that feel
  brand-owned
- Original copy (rewrite in our voice, always)
- Testimonials, quotes, statistics, awards we did not earn
- Signature colour used as identity (they own that association)

## Content we will often need to create

- New Swedish copy for anywhere we adopted a block
- Real numbers/stats when we adopt a "metrics" section
- Real case studies when we adopt a "cases" section
- A single portrait when we adopt a "team" section as About

If we cannot create the content, remove the block from the plan.

## Handoff

The finished content map is the input to `implementation-plan.md`. That
plan should reference specific rows of the content map so anyone
reading it can see *why* the change is happening, not just *what* is
changing.
