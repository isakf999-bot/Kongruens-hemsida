# Anti-copy and anti-slop

Two failure modes: cloning the reference, and replacing it with generic
AI web design. This file names both. The shipping-time checklist lives
in [slop-filter.md](slop-filter.md).

## Recreate the design thinking, not the website

### Never automatically copy

- Company name
- Logo
- Images
- Icons
- Original text
- Branding
- Unique illustrations
- Exact graphic elements
- Unique animations
- Color palette if it is strongly brand-bound

### Extract instead

- Layout ideas
- Component structure
- Navigation patterns
- UX patterns
- Spacing principles
- Responsive behavior
- Information hierarchy
- Interaction patterns
- General design principles

If a color is just "near-black text on paper," it is a principle. If it
is a unique signature orange used as identity, it is branding — keep
ours.

Content decisions belong in [content-map.md](content-map.md). Every
adopted block is captured there with **Do we have it? → Our version**
and **Notes**. If a block does not survive the content map, it does
not enter the implementation plan.

## AI slop detection

Actively reject generic generated-web aesthetics, even when the
reference is clean. Do not "upgrade" a restrained site with decoration.
Full checklist in [slop-filter.md](slop-filter.md).

### Avoid automatically

- Overdone gradients
- Random blobs
- Overdone glassmorphism
- Unnecessary glow effects
- Gradient text
- AI-looking floating cards
- Excessive rounded corners
- Too much animation
- "Everything moves" design
- Meaningless 3D ornaments
- Generic SaaS sections
- Overdone badges
- Fake statistics
- Testimonials from names Google cannot verify
- Random decorative elements
- Oversize headings just to look "premium"
- Too much whitespace just to look "premium"

### Prioritize instead

- Good spacing
- Clear hierarchy
- Good typography
- Thoughtful containers
- Simple navigation
- Real UI components
- Good responsive behavior
- Subtle animation only when it helps
- Professional layout
- Clear user experience

The result should feel like a real designer/developer built it, not:
"AI generated landing page."

## Practical checks before finishing

- Can you name the job of every section? If not, it is decoration —
  remove it.
- Are numbers, logos, and quotes real for this business? If not, do
  not invent them.
- Is motion explaining state (menu open, sticky header) or performing?
- Would this still work in grayscale? If not, you are relying on
  effects.
- Did we keep the project's existing type and color tokens?
- Did we reuse existing project components (nav, footer, buttons,
  sections)?

Run these questions before every implementation ends. The full
shipping-gate checklist is in [slop-filter.md](slop-filter.md).
