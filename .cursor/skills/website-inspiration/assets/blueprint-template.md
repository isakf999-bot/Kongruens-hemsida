# Structural blueprint — {{title}}

Source: {{url}}
Date: {{date}}

> **How to use this file.** For every page you researched, list its sections
> in order and answer the questions for each. Copy the `Section` block as many
> times as needed. Keep it in the language of *jobs* and *components*, not
> pixels.

Pages covered (from `sitemap.json`):

- [ ] home
- [ ] …

---

## Global — header

- **Purpose:** …
- **Layout (desktop):** logo | primary nav | CTA | hamburger?
- **Layout (mobile):** logo | hamburger
- **Components:** Logo, PrimaryNavItem, PrimaryCta, MenuToggle
- **Sticky / transparent:** …
- **Interaction:** hover states, active-route indicator, dropdown pattern
- **Responsive change:** breakpoint where nav collapses, which items move
  into the drawer, which stay in the bar

## Global — footer

- **Purpose:** …
- **Blocks:** logo + tagline, sitemap columns, contact, socials, legal
- **Components:** FooterLinkColumn, ContactBlock, SocialRow
- **Density:** few links / many
- **Responsive change:** column collapse order

---

## Page: home

### Section 01 — <name>

- **Purpose:** what this makes the visitor understand or do
- **Layout:** container width, columns, alignment, image treatment
- **Components:** SectionEyebrow, Heading, Lede, PrimaryCta, SecondaryCta,
  MediaBlock, …
- **Content shape:** eyebrow (~2 words), heading (~6 words), lede (~2 lines),
  1 primary + 1 secondary CTA, hero media (video / photo / illustration)
- **Visual hierarchy:** what the eye hits first / second / third
- **Interaction:** motion, scroll behavior, hover
- **Responsive behavior:** desktop → tablet → mobile stacking rules
- **Our equivalent:** which section of our site this maps to; if none, note it

### Section 02 — <name>

Same structure.

### Section 03 — <name>

Same structure.

*(add more)*

---

## Page: services

### Section 01 — <name>

…

---

## Component inventory (cross-page)

Reusable pieces you have identified. Reference these from each section instead
of redescribing them.

- **Card / ServiceCard** — icon + heading + 1-line description + arrow link;
  hover raises border tint
- **Card / CaseCard** — image 4:3, category tag, title, link
- **List / LinkList** — heading + 4–8 anchor links, no cards
- **CTA / PrimaryButton** — pill, ink background, small arrow glyph
- **CTA / GhostButton** — bordered, transparent background
- **FAQ / AccordionItem** — question + plus icon → answer body
- **Marquee / LogoRow** — proof bar, monochrome logos
- **…**

## Design tokens observed

- **Typography scale (px):** from `inspect.json → scale.fontSizesPx`
- **Section padding (px):** from `inspect.json → scale.paddingTopPx`
- **Grid gaps (px):** from `inspect.json → scale.gapsPx`
- **Container max-widths (px):** from `inspect.json → scale.maxWidthsPx`
- **Body colour / ink:** …
- **Radius scale:** …

## Interaction summary (from `interactions.json`)

- Hamburger: overlay / drawer / …
- Dropdowns: hover / click / not present
- Accordion: …
- Tabs: …
- Modal: …
- Marked as *not observed*: …
