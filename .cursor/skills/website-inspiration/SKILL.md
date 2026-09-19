---
name: website-inspiration
description: Deep website analysis and adaptive recreation. Reverse-engineer a live reference site as a real designer + UX researcher + frontend developer would — crawl its important pages, capture desktop/tablet/mobile screenshots (including hamburger open, dropdowns, accordions, hovers), inspect layout/typography/spacing/components, build a structural blueprint, map its blocks to our project as "reference → our version", implement one section at a time in the current project, then compare and improve. Never a pixel-perfect clone. Use whenever the user pastes a URL as inspiration, says "bygg vår hemsida likt denna", "studera exakt hur X fungerar", asks to recreate or improve a hamburger menu / hero / services / navigation / hierarchy from a reference, wants website-to-code from a real site, or wants a professional real-designer look instead of generic AI landing-page slop.
---

# Website Inspiration & Adaptive Recreation

Study a live site the way a designer, UX researcher and frontend
developer would — then translate its best structural ideas into the
current project. Never a clone. Never AI-landing-page slop.

## The core loop

```
OBSERVE  →  INTERACT  →  DOCUMENT  →  UNDERSTAND  →  RECREATE  →  COMPARE  →  IMPROVE
```

Every phase produces a real deliverable in a persistent research
library. Skipping a phase is how you end up copying branding instead
of learning from structure.

**Recreate the design thinking, not the website.**

The goal is a site that feels built by a real designer. Not a
pixel-perfect clone, not AI slop.

## Two modes

| User says | Mode | Do |
|---|---|---|
| URL only, or "analysera denna" | **A — Analyze** | Run research, fill `analysis.md` + `structure.md`. Stop before code. |
| "bygg vår hemsida likt denna" · "studera hur X fungerar och bygg en version" · "jag gillar hur de presenterar sina tjänster" | **B — Reference → Ours** | Full loop. Research → blueprint → content-map → plan → implement → compare → improve. |
| "jämför vår header mot referensen" | **B (short)** | Skip crawl if already done. Capture our side. Fill `comparison.md`. Fix misses. |

Ask for scope *only* when the request is genuinely ambiguous. If the
user names the surface ("bygg om hamburgermenyn"), proceed. If they
say "bygg vår hemsida likt denna", assume the whole loop and stop for
approval after the plan.

Details: [references/adaptive.md](references/adaptive.md).

## Inputs

Accept any of these, mixed freely:

| Input | Example |
|---|---|
| URL | `https://bravowebb.se` |
| Scope | "hela startsidan", "bara navigationen", "hero + tjänster" |
| Intent | "jag gillar hur den fungerar", "bygg en version för oss" |
| Constraints | keep our branding, 6 sections not 12, Swedish copy, no new deps |

## The persistent research library

Every reference gets its own directory. Every script writes into the
same place so results compound across turns:

```
references/inspiration/<host>/
  sitemap.json                     from crawl.py
  inspect.json                     homepage DOM/stack inspection
  pages/<slug>/inspect.json        per-subpage inspection
  interactions.json                hamburger/dropdowns/accordions/hover
  visual-inventory.json            registry of every screenshot
  research-report.json             master run report

  screenshots/
    desktop/<slug>/                full.png · header/hero/footer · stripes · menu-open
    tablet/<slug>/                 same
    mobile/<slug>/                 same (menu-open when a menu button exists)
    interactions/                  hamburger-mobile-open.png, dropdown-tjanster.png …

  analysis.md                      what the site is, what to steal / skip
  structure.md                     the blueprint (sections + components)
  content-map.md                   reference → ours decisions per block
  implementation-plan.md           narrow, ordered list of edits
  comparison.md                    after implementation, structural verdict
```

Third-party screenshots are reference, not assets to ship. Do not
commit `references/inspiration/**` unless the user asks; add it to
`.gitignore` alongside `DesignPictures/` if missing.

Full library conventions: [references/capture.md](references/capture.md).

## Tooling

Prefer the bundled scripts for repeatable work. Prefer the Cursor
browser for anything a headless capture cannot see (hover-only menus,
scroll-triggered animation, modals gated behind delay, auth flows).

Run everything from the **current project root**. On Windows without
`python`, use `py -3`.

```bash
# One command: crawl → capture (multi-page) → interact → scaffold
python <this-skill>/scripts/research.py "https://example.com" --pages-limit 6

# Or, step by step
python <this-skill>/scripts/crawl.py    "https://example.com" --limit 6
python <this-skill>/scripts/capture.py  "https://example.com" --sitemap references/inspiration/<host>/sitemap.json
python <this-skill>/scripts/interact.py "https://example.com"
python <this-skill>/scripts/probe.py    "https://example.com"
```

Always run `--help` on a script before reading its source.

If Playwright is missing:

```bash
pip install playwright
python -m playwright install chromium
```

If it still cannot run, fall back to Cursor browser tools — the
fallback is first-class, do not block research on Playwright. See
[references/interactions.md](references/interactions.md) for the
browser recipe.

`<this-skill>` is the directory that contains this `SKILL.md`.

## Phase-by-phase

### 1 · OBSERVE — crawl & capture

Discover the pages that shape the site (services, cases, about,
process, contact — not blog/legal), capture each at
desktop/tablet/mobile with full pages **plus scroll stripes**, and
inspect the DOM for stack, tokens, typography scale, spacing scale,
component candidates, images, headings, and landmarks.

- How: [references/crawl.md](references/crawl.md),
  [references/capture.md](references/capture.md)
- Emits: `sitemap.json`, `inspect.json` (per page),
  `visual-inventory.json`, every PNG under `screenshots/`

### 2 · INTERACT — surface hidden states

A static capture cannot see hamburger drawers, hover dropdowns,
accordions, tabs, modals, or CTA hover states. `interact.py` tries
them all and records `success=false` on the ones it could not open.
Only claim behavior you actually observed.

- How: [references/interactions.md](references/interactions.md),
  [references/navigation.md](references/navigation.md)
- Emits: `interactions.json`, `screenshots/interactions/*.png`

### 3 · DOCUMENT — analysis

Turn the evidence into a compact decision document. What the site is,
what the sequence does, what to steal, what to skip. Screenshots and
JSON are evidence; `analysis.md` is judgment.

- How: [references/analysis.md](references/analysis.md)
- Template: `assets/analysis-report.md`
- Fill: `analysis.md`

### 4 · UNDERSTAND — blueprint

Express every researched page as a sequence of sections + reusable
components. Force a `Purpose`, `Layout`, `Components`, `Content shape`,
`Visual hierarchy`, `Interaction`, `Responsive behavior`, and `Our
equivalent` for each section. Cross-reference a shared **Component
inventory** so we build in named pieces, not painted boxes.

- How: [references/blueprint.md](references/blueprint.md),
  [references/components.md](references/components.md)
- Template: `assets/blueprint-template.md`
- Fill: `structure.md`

### 5 · RECREATE — map, plan, build

Translate the blueprint into our project. For every reference block,
decide: **Do we have it? → Our version? → Notes?** Then a narrow,
ordered implementation plan. Then code, reusing project components.

- How: [references/content-map.md](references/content-map.md),
  [references/implementation.md](references/implementation.md),
  [references/anti-copy-and-slop.md](references/anti-copy-and-slop.md)
- Templates: `assets/content-map-template.md`,
  `assets/implementation-plan-template.md`
- Fill: `content-map.md`, `implementation-plan.md`, then edit code.
- Shipping gate: [references/slop-filter.md](references/slop-filter.md)

### 6 · COMPARE — structural, not pixel

Screenshot our page at the same widths. Score against the reference on
14 structural dimensions (IA, density, header pattern, hamburger,
hero, services, cases, contact placement, footer, mobile stacking,
interactions, typography hierarchy, spacing, slop check). Every ⚠️/❌
turns into a concrete fix.

- How: [references/compare.md](references/compare.md)
- Template: `assets/comparison-template.md`
- Fill: `comparison.md`

### 7 · IMPROVE — loop

Fix a structural miss → re-capture our page → update `comparison.md`.
Stop when every job the reference does, our page also does (or we
consciously decided to skip it) and the slop filter passes.

## Extract vs copy

Never automatically copy branding, unique copy, images, illustrations,
brand-owned palette or motion. Full lists:
[references/anti-copy-and-slop.md](references/anti-copy-and-slop.md).

Do use the **OBSERVE → ABSTRACT → ADAPT** three-lens rule for every
block ([adaptive.md § three-lens](references/adaptive.md#the-three-lens-rule-observe--abstract--adapt)).

## Guardrails

- If the reference has a team grid and we are one person, our version
  is an About block — not a fake team.
- If the reference has a mega-menu and we have five links, our version
  is the ordinary bar.
- If the reference invents statistics, we do not invent statistics.
- If we cannot create the content a block requires, remove the block
  from the plan.
- If Playwright cannot see a state, say so; do not invent behavior.

## Modules

| Module | Status | Where |
|---|---|---|
| Screenshot capture (multi-page + stripes) | ready | `scripts/capture.py`, [capture.md](references/capture.md) |
| DOM / stack inspection (+ scale + components) | ready | `scripts/probe.py`, [capture.md](references/capture.md) |
| Site crawler | ready | `scripts/crawl.py`, [crawl.md](references/crawl.md) |
| Interaction discovery | ready | `scripts/interact.py`, [interactions.md](references/interactions.md) |
| One-command research | ready | `scripts/research.py`, [adaptive.md](references/adaptive.md) |
| Analysis deliverable | ready | [analysis.md](references/analysis.md), template `assets/analysis-report.md` |
| Structural blueprint | ready | [blueprint.md](references/blueprint.md), template `assets/blueprint-template.md` |
| Component detection | ready | `inspect.json → componentCandidates`, [components.md](references/components.md) |
| Content mapping | ready | [content-map.md](references/content-map.md), template `assets/content-map-template.md` |
| Implementation planning | ready | [implementation.md](references/implementation.md), template `assets/implementation-plan-template.md` |
| Visual comparison loop | ready | [compare.md](references/compare.md), template `assets/comparison-template.md` |
| Reference → Ours mode | ready | [adaptive.md](references/adaptive.md) |
| AI slop shipping gate | ready | [slop-filter.md](references/slop-filter.md), [anti-copy-and-slop.md](references/anti-copy-and-slop.md) |
| Responsive analysis | ready | [responsive.md](references/responsive.md), [navigation.md](references/navigation.md) |
| Usage & modes | ready | [usage.md](references/usage.md) |

## What to do first when a URL arrives

1. Confirm mode (Analyze vs Reference→Ours).
2. Run `scripts/research.py <url>` (or `--only-home` for narrow scope).
3. Read the screenshots first. Then `inspect.json`. Then
   `interactions.json`.
4. Fill `analysis.md` and `structure.md`.
5. In Mode B, continue with `content-map.md` and
   `implementation-plan.md`.
6. Propose the plan. Wait for approval on anything larger than one
   section.
7. Implement small-to-large; verify in the browser; fill
   `comparison.md`.
8. Loop on structural misses until the scoreboard is clean and the
   slop filter passes.

Everything else — inputs, examples, workflow narrative — lives in
[references/usage.md](references/usage.md) and
[references/adaptive.md](references/adaptive.md).
