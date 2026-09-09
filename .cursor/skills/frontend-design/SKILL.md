---
name: frontend-design
description: Guidance for distinctive, intentional visual design when building or reshaping UI. Use whenever the user asks to design, redesign, restyle, or improve how a site or interface looks — heroes, typography, color themes, layout, buttons, cards, nav, spacing, motion, or making it feel less generic / less AI. Also use for Swedish briefs (designa, hemsida, färgtema, typografi, layout, hero). Do not skip this skill on CSS-only restyles; those are still design.
license: Complete terms in LICENSE.txt
---

# Frontend Design

Approach this as the design lead at a small studio known for giving every client a visual identity that could not be mistaken for anyone else's. This client has already rejected proposals that felt templated, and is paying for a distinctive point of view: make deliberate, opinionated choices about palette, typography, and layout that are specific to this brief, and take one real aesthetic risk you can justify.

When this skill triggers, read it fully. Then open references by job — not all of them at once, and not after the CSS is already generic.

**Before a first plan (always):**

- Six-line direction, signature, refusals → [references/direction.md](references/direction.md)
- Type + color method (then go deeper as needed) → [references/type-color.md](references/type-color.md)
- Rails, chapters, lockups → [references/spatial-craft.md](references/spatial-craft.md)
- Seeing: weight, grouping, three reads → [references/composition.md](references/composition.md)

**Before you commit the look:**

- Clustered tells beyond the three famous palettes → [references/anti-tells.md](references/anti-tells.md)

**Open when that material is in play:**

- Choosing and setting faces → [references/typography.md](references/typography.md)
- Sampling, chroma, type on photos → [references/color.md](references/color.md)
- Photo/video crop, living plate, honesty → [references/media.md](references/media.md)
- Cards, nav, forms, buttons as a system → [references/components.md](references/components.md)
- Hover, focus, forms, menus → [references/interaction.md](references/interaction.md)
- One choreography, time, reduced motion → [references/motion.md](references/motion.md)
- Breakpoints as recomposition → [references/responsive.md](references/responsive.md)
- Home vs interior jobs → [references/page-types.md](references/page-types.md)
- Tokens, CSS modules, visual QA → [references/implementation.md](references/implementation.md)
- Pass order and optical QA → [references/critique.md](references/critique.md)

## Ground it in the subject

If the brief does not pin down what the product or subject is, pin it yourself before designing: name one concrete subject, its audience, and the page's single job, and state your choice. If there's any information in your memory about the human's preferences, context about what they're building, or designs you've made before – use that as a hint. The subject's own world, its materials, instruments, artifacts, and vernacular, is where distinctive choices come from. Build with the brief's real content and subject matter throughout.

A palette pulled from a photograph of the actual work (water, timber, cloth, stone, metal) will always beat a palette invented in the abstract. Name the material in one sentence before you name the hex values.

## Design principles

For web designs, the hero is a thesis. Open with the most characteristic thing in the subject's world, in whatever form makes sense for it: a headline, an image, an animation, a live demo, an interactive moment. Be deliberate with your choice: a big number with a small label, supporting stats, and a gradient accent is the template answer, only use if that's truly the best option.

The hero lockup is part of that thesis. Type sits in a quiet zone of the plate (sky, shadow, still water), shares a horizontal rail with the identity in the nav, and stays a tight group — not three orphaned lines plus a button in a corner. If the plate is a wide landscape looking outward, do not default to bottom-left marketing stack.

Typography carries the personality of the page. Pair the display and body faces deliberately, not the same families you would reach for on any other project, and set a clear type scale with intentional weights, widths, and spacing. Make the type treatment itself a memorable part of the design, not a neutral delivery vehicle for the content. A display face with theatrical axes (soft, wonk, extreme optical size) can fight photography; quiet the display on a living plate, keep the character in the interior headings.

Structure is information. Structural devices, numbering, eyebrows, dividers, labels, should encode something true about the content, not decorate it. Many generic designs use numbered markers (01 / 02 / 03), but that's only appropriate if the content actually is a sequence - like a real process or a typed timeline where order carries information the reader needs. Question if choices like numbered markers actually make sense before incorporating them.

Chapter the page with air, alternating grounds, and measure — not overlapping paper bubbles that cut into the hero, not hairline register lines down the left, not a dark slab dumped under a dark hero.

Leverage motion deliberately. Think about where and if animation can serve the subject: a page-load sequence, a scroll-triggered reveal, hover micro-interactions, ambient atmosphere. An orchestrated moment usually lands harder than scattered effects; choose what the direction calls for. However, sometimes less is more, and extra animation contributes to the feeling that the design is AI-generated.

Match complexity to the vision. Maximalist directions need elaborate execution; minimal directions need precision in spacing, type, and detail. Elegance is executing the chosen vision well.

Consider written content carefully. Often a design brief may not contain real content, and it's up to you to come up with copy. Copy can make a design feel as templated as the design itself. See the below section on writing for more guidance. If the brief locks the copy (including typos), the copy is the brief — design around it, never "fix" it.

## Process: brainstorm, explore, plan, critique, build, critique again

For calibration: AI-generated design right now clusters around three looks: (1) a warm cream background (near #F4F1EA) with a high-contrast serif display and a terracotta accent; (2) a near-black background with a single bright acid-green or vermilion accent; (3) a broadsheet-style layout with hairline rules, zero border-radius, and dense newspaper-like columns. All three are legitimate for some briefs, but they are defaults rather than choices, and they appear regardless of subject. Where the brief pins down a visual direction, follow it exactly — the brief's own words always win, including when it asks for one of these looks. Where it leaves an axis free, don't spend that freedom on one of these defaults. Just like a human designer who's hired, there's often a careful balance between doing what you're good at and taking each project as a chance to experiment and learn.

There are more tells than those three. Read [references/anti-tells.md](references/anti-tells.md) before you commit a plan.

Work in two passes. First write the six-line direction in [references/direction.md](references/direction.md) (subject, job, material, voice, signature, refusals). Then brainstorm a short design plan from that direction: compact tokens for color, type, layout, and the signature.

**Color:** 4–6 named hex values derived from the subject's materials, not from a generic "calm wellness" or "premium SaaS" moodboard. Include paper, ink, a deep, and one working accent at most.

**Type:** display, body, and if needed a utility face for captions or data. State why this pair belongs to this subject. State the body size (~16–18px is a floor for reading, not a brand).

**Layout:** one-sentence prose plus a tiny ASCII wireframe. Compare two compositions (asymmetric vs centered lockup, stacked slabs vs chaptered grounds) and pick one for a reason.

**Signature:** the single unique element this page will be remembered by. Everything else stays quieter than that.

Then review that plan against the brief before building: if any part of it reads like the generic default you would produce for any similar page (work through a similar prompt to see if you arrive somewhere similar) rather than a choice made for this specific brief — revise that part, say what you changed and why. Only after you've confirmed the relative uniqueness of your design plan should you start to write the code, following the revised plan exactly and deriving every color and type decision from it.

When writing the code, be careful of structuring your CSS selector specificities. It's easy to generate CSS classes that cancel each other out (especially with a type-based selector like .section and a element-based selector like .cta). This can happen often with paddings/margins between sections. CSS modules will not style a global class like `btn` unless you use `:global(.btn)` — if a control "doesn't change size," that is usually why. Details in [references/implementation.md](references/implementation.md).

Try to do a lot of this planning and iteration in your thinking, and only show ideas to the user when you have higher confidence it'll delight them.

## Restraint and self-critique

Spend your boldness in one place. Let the signature element be the one memorable thing, keep everything around it quiet and disciplined, and cut any decoration that does not serve the brief. Not taking a risk can be a risk itself! Build to a quality floor without announcing it: responsive down to mobile, visible keyboard focus, reduced motion respected. Critique your own work as you build, taking screenshots if your environment supports it – a picture is worth 1000 tokens. Consider Chanel's advice: before leaving the house, take a look in the mirror and remove one accessory. Human creators have memory and always try to do something new, so if you have a space to quickly jot down notes about what you've tried, it can help you in future passes.

Before you call a pass done, run the pass order in [references/critique.md](references/critique.md), then this short list:

- Does the type lockup share the nav's left rail? Measure, don't guess.
- Did you put a gray wash, heavy scrim, or saturate/brightness crush on a photograph or video? If yes, undo it unless the brief asked for a graded plate.
- Did a rounded paper sheet overlap the hero? Undo it. Sections start after the hero.
- Is the signature fighting the rest of the page (second hero animation, second accent color, second display stunt)? Remove one.
- On mobile, does the lockup still read, and does the plate still have a quiet zone for type?

## More on writing in design

Words appear in a design for one reason: to make it easier to understand, and therefore easier to use. They are design material, not decoration. Bring the same intentionality to copy that you would bring to spacing and color. Before writing anything, ask what the design needs to say, and how it can best be said to help the person navigate the experience.

Write from the end user's side of the screen. Name things by what they control and recognize, never by how the system is built. A person manages notifications, not webhook config. Describe what something does in plain terms rather than selling it. Being specific is always better than being clever.

Use active voice as default. A control should say exactly what happens when it is used: "Save changes," not "Submit." An action keeps the same name through the whole flow, so the button that says "Publish" produces a toast that says "Published." The vocabulary of an interface is the signposting for someone navigating the product. Cohesion and consistency are how people learn their way around.

Treat failure and emptiness as moments for direction, not mood. Explain what went wrong and how to fix it, in the interface's voice rather than a person's. Errors don't apologize, and they are never vague about what happened. An empty screen is an invitation to act.

Keep the register conversational and tuned: plain verbs, sentence case, no filler, with tone matched to the brand and the audience. Let each element do exactly one job. A label labels, an example demonstrates, and nothing quietly does double duty.
