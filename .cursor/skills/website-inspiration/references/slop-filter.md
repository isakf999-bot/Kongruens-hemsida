# Slop filter — before you ship

Every implementation step in this skill passes through the filter below
before you commit. It is not optional. AI-generated-looking websites
are usually the sum of many "harmless" small choices; this list catches
those before they compound.

## The one question

> "Would an experienced web studio actually build this?"

If the answer is no, or if you have to justify it, simplify.

## Reject on sight

- Gratuitous gradients (background + text + border all gradient)
- Random abstract blobs / meshes without a compositional reason
- Frosted-glass everything (glassmorphism as a default aesthetic)
- Neon glows on flat backgrounds
- Gradient text where the same word in solid ink would work
- Free-floating cards angled to fake depth
- 12px+ border radius on every card
- Overuse of motion; content animating on every scroll tick
- Meaningless 3D ornaments
- Fake statistics ("2500+ happy clients", "98% success rate")
- Stock "diverse team at a wooden table" photography
- Generic feature grids with icon + heading + one line, all identical
- Big empty hero with a single hyphen "The — future — of — X"
- Marquee logo rows with logos the site does not have permission for
- Testimonials from names Google cannot verify
- Copy that only says "Streamline your workflow. Empower your team."

## Prefer instead

- Real typography hierarchy (a heading scale that is used)
- Deliberate spacing rhythm (padding numbers that repeat across sections)
- Real imagery that we own or have the right to use
- Layout choices that reveal the site's information architecture
- Interactions that carry a job (open menu, expand FAQ, sticky header,
  scroll snap to sections)
- Copy in our voice, in the reader's language, doing one job per block
- Consistent radius, weight, colour tokens across the whole site
- Motion that only shows up when it explains state

## Before shipping any change

- [ ] Every section has a nameable job (see `structure.md`).
- [ ] Every visible statistic / number / logo is real.
- [ ] Every quote / testimonial is real and attributable.
- [ ] The page still works in grayscale (i.e. hierarchy does not rely on
      colour effects alone).
- [ ] Motion explains state; nothing decorative moves on load.
- [ ] Container widths, radii, and spacing use existing project tokens.
- [ ] Hamburger opens, closes, escapes, does not scroll-lock the page in
      a broken way.
- [ ] Desktop AND mobile were opened in the browser; nothing was
      "obvious" without checking.
- [ ] No brand-owned motif from the reference sneaked in (signature
      colour, illustration style, animation timing).
- [ ] The reference-only sections we chose to skip are documented in
      `content-map.md → skip`.

## The mid-implementation reset

If you are 30 minutes into an implementation and the file count is
climbing and the design still doesn't feel intentional, stop.

Reopen the reference. Reopen `structure.md`. Pick the *one* section
that is off. Fix that one. Screenshot. Keep going.

Skill regressions from feature creep are more common than from missing
features.
