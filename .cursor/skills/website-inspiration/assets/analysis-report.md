# Inspiration analysis — {{title}}

Source: {{url}}
Host: {{host}}
Date: {{date}}
Stack: <fill from inspect.json → stack.frameworks>

> **Purpose of this file.** A short decision document. Not a description.
> After reading this, you should know what to steal, what to skip, and why.
> Screenshots and JSON are the evidence; this file is the judgment.

---

## 1. What this site is trying to do

One or two sentences. Who is it for? What action does it push?

## 2. Information architecture (the sequence)

Name the *job* of each section, in order. Example:
`hero → what we help with → cases → process → contact`.
If a block does not have a job, it is decoration — call it out.

## 3. Website structure (deliverables)

- Header — …
- Hero — …
- Section 1 — …
- Section 2 — …
- Section N — …
- Footer — …

## 4. Navigation

- **Desktop bar:** items, order, which is CTA, sticky? transparent-then-solid?
- **Dropdowns:** hover vs click, one-level or mega, dismiss behavior.
- **Mobile bar:** which items collapse into the drawer, breakpoint.
- **Hamburger open:** overlay / drawer / full sheet, header visible or hidden,
  submenu behavior, close controls, body scroll lock.

Reference: `interactions.json` and `screenshots/interactions/*.png`.

## 5. Design system (principles, not brand colors)

- **Type:** serif/sans, heading scale, body size + line-height, measure width.
- **Color roles:** ink, paper, accent — describe roles, not brand hex names.
- **Spacing:** section rhythm, card padding, gaps. Use the numbers from
  `inspect.json → scale`.
- **Buttons:** primary/secondary, radius, padding, weight.
- **Cards:** border vs shadow vs flat. Corner radius, hover state.
- **Images:** full-bleed, framed, portrait vs landscape.

## 6. Responsive behavior

- **Desktop → Tablet:** what moves, what disappears, when hamburger arrives.
- **Tablet → Mobile:** stack order, image treatment, CTA placement.

## 7. Interaction patterns (only what was actually observed)

For each: hamburger, dropdowns, accordions, tabs, sliders, hover, modals.
Note the ones we could not open — do not invent behavior.

## 8. Inspiration opportunities

What to *steal as thinking* for our project. Be specific.

- [ ] Structural sequence (e.g. add a "what we help with" block before cases)
- [ ] Nav pattern (e.g. hamburger-always with grouped services)
- [ ] Responsive strategy (e.g. text stacks above image on mobile)
- [ ] Interaction (e.g. accordion for FAQ instead of full page)

## 9. Avoid copying

Branding, unique copy, images, signature palette, distinctive motion,
company-specific illustrations, invented statistics, testimonials.
