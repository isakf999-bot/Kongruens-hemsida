# Components — think in reusable pieces, not painted boxes

The whole point of doing research first is so that when you sit down to
build, you are assembling *named components* instead of copying visual
decisions ad hoc. This is what makes the difference between "we adapted
the design" and "we made another AI landing page".

## From evidence to components

Where the evidence comes from:

- `inspect.json → componentCandidates` — parents with ≥3 children sharing
  the same first class. These are almost always cards, list items, tiles,
  logos, testimonials, or navigation rows.
- `inspect.json → sections` — each `<main>` child section with its heading,
  image count, button count, and padding.
- `inspect.json → buttons` — button/link samples with radius, padding,
  colours.
- `inspect.json → images` — image inventory (src, dimensions, alt).
- `screenshots/desktop|tablet|mobile/*/*.png` — the visual truth.
- `interactions.json` — what opens/expands/hovers.

## Naming rule

Name components by their *job*, not by their look. `ServiceCard` is a job.
`BlueBox` is a look. Look-based names lock the design; job-based names
travel across restyles.

Good:

- `ServiceCard`, `CaseCard`, `LogoRow`, `SectionEyebrow`, `PrimaryCta`,
  `GhostButton`, `AccordionItem`, `FooterLinkColumn`, `HeroMedia`,
  `TestimonialQuote`, `MetricStat`, `TeamMember`, `PageIntro`

Bad:

- `BigBlackBox`, `BlueButton`, `WhiteCard`, `GreenBox2`

## Grouping into a system

Once you have named pieces, group them:

- **Chrome:** Header, Nav, MenuToggle, MobileDrawer, Footer, LegalStrip
- **Section shells:** SectionShell, SectionLabel, SectionHeader
- **Text primitives:** Eyebrow, Heading, Lede, Copy, Link
- **Actions:** PrimaryCta, GhostButton, IconButton, LinkArrow
- **Blocks:** ServiceCard, CaseCard, MetricStat, TestimonialQuote,
  AccordionItem, LogoRow, FormField
- **Media:** HeroMedia, InlineImage, VideoPlayer

Write them into `structure.md → Component inventory`. Cross-reference
those names from each section instead of describing the same button twice.

## Repetition ≠ reuse

Three sections that all use two-column layout do not need three
components. Add a `SplitSection` and configure its slots. Watch for:

- Sections that only differ by heading + copy → one component.
- Cards that only differ by icon + text → one component with props.
- Menus / footers that repeat their column structure → one component
  taking an array.

## When to stop

If the component list is longer than the sections list, you are
over-decomposing. Combine.

If the component list is 2 items and there are 8 sections, you missed
structure. Look again.

## Mapping components to our code

Before proposing a new component, check the project:

- Is there already a `SectionShell` / `SectionLabel`? Reuse.
- Is there already a `PrimaryCta` / `GhostButton`? Reuse.
- Does the layout already have container tokens? Do not add another.
- Does `lib/nav.ts` already model navigation groups? Extend, do not fork.

Every new component is a liability. Every reused one is a win.
