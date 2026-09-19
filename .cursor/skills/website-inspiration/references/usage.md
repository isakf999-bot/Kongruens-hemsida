# Usage

How to invoke this skill, what it accepts, what it produces, and the
two modes it runs in.

## When to use it

- The user pastes a live URL and wants it studied as inspiration
- They like how a site's navigation, hero, cards, or UX works
- They want a hamburger menu / sticky header / section rhythm from a
  reference
- They want their site to feel like a real designed website, not AI
  slop
- They ask to reverse-engineer, recreate structure, or do
  website-to-code

Do not use it to clone a competitor's branding, copy, or unique
artwork.

## Two modes

### Mode A — Analyze only

User asks to study a site without asking for code.

- Run `research.py` (or the individual scripts).
- Fill `analysis.md` and `structure.md`.
- Stop. Do not open code.
- Report back with the deliverables and a short summary.

### Mode B — Reference → Ours

User names a reference and wants our project brought closer to it.
This is the main mode. It follows the loop in [adaptive.md](adaptive.md):

`OBSERVE → INTERACT → DOCUMENT → UNDERSTAND → RECREATE → COMPARE → IMPROVE`

- Run `research.py` on the reference.
- Fill `analysis.md`, `structure.md`, `content-map.md`,
  `implementation-plan.md`.
- Propose the plan before implementing more than one section.
- Implement. Reuse project components. Run the
  [slop filter](slop-filter.md) before shipping.
- Capture our site and fill `comparison.md`.
- Loop on structural misses.

## Inputs

```
url:          required for research (http/https)
scope:        optional — nav | hero | services | full page | named component
intent:       optional — analyze only | propose | implement
project:      the current workspace (branding, stack, copy stay ours)
constraints:  optional — fewer sections, keep palette, Swedish, no new deps
```

Natural language is enough. Examples that should trigger the full
workflow:

- "Analysera https://example.com och spara screenshots"
- "Jag gillar hur https://linear.app fungerar. Bygg min hemsida med
  liknande struktur, navigation och UX."
- "Implementera navigationen inspirerad av den här sidan: https://…"
- "Ta screenshots på desktop och mobile, särskilt hamburgermenyn"
- "Jämför vår header mot referensen"
- "Studera exakt hur den här hemsidans hamburger fungerar och bygg en
  version för oss."
- "Jag gillar hur de presenterar sina tjänster."

## Outputs

Always produced during research (see [capture.md](capture.md)):

```
references/inspiration/<host>/
  sitemap.json                     from crawl
  inspect.json                     homepage inspection
  pages/<slug>/inspect.json        per-subpage inspection
  interactions.json                from interact
  visual-inventory.json            registry of every screenshot
  research-report.json             master run report (when using research.py)
  screenshots/
    desktop|tablet|mobile/<slug>/  full.png, header/hero/footer, stripes
    interactions/                  hamburger, dropdowns, accordions, hover
  analysis.md                      what the site is
  structure.md                     the blueprint (sections + components)
  content-map.md                   reference → ours decisions
  implementation-plan.md           narrow, ordered list of edits
  comparison.md                    after implementation, structural verdict
```

Implementation (only in Mode B, or when scope is already clear):

- Code changes in the current project
- A short plan of what was adapted vs skipped, tied to
  `implementation-plan.md`
- Browser verification of desktop + mobile, including hamburger
  open/close
- A filled-in `comparison.md`

## Workflow summary

1. Resolve URL and scope.
2. `research.py` for a full research library. (Or crawl → capture →
   interact by hand.)
3. Read screenshots, then JSON, then interactions.
4. Fill the analysis and blueprint.
5. If Mode B: fill content-map and implementation-plan.
6. Implement, screenshot, fill comparison, loop.

Stop after step 4 in Mode A. Stop after step 6 in Mode B when every
dimension in the comparison scoreboard is ✅ or a deliberate ⚠️/❌.

## What "done" means

**Research done** (Mode A):

- Screenshots exist for every page in `sitemap.json`
- Hamburger (if any) is documented open and closed
- `analysis.md` has all seven sections
- `structure.md` has a section entry per page section
- Stack is evidenced or `Unknown`

**Implementation done** (Mode B):

- Our branding/copy remains
- The adapted pattern works at desktop and mobile
- The hamburger actually functions (open, close, Escape, focus, no
  broken scroll lock)
- `comparison.md` scoreboard has no unaddressed ❌
- Slop filter passed
