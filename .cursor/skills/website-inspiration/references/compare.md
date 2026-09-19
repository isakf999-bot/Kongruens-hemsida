# Compare — the visual comparison loop

After implementation, do this. Skipping it means you shipped something
you never actually looked at side-by-side with the reference.

## Capture our own site the same way

Prefer the browser tools if the dev server is running:

- `browser_navigate` to `http://localhost:<port>/…`
- Screenshot at 1440, 768, 390 (use CDP
  `Emulation.setDeviceMetricsOverride` for the smaller viewports).

Or, if you have a public preview URL, run:

```bash
python <skill>/scripts/capture.py "https://<our-site>" --out references/self
```

Save under `references/self/<host>/…` so it mirrors the reference layout.

## Fill `comparison.md`

Use the scoreboard from `assets/comparison-template.md`. Verdicts:

- ✅ matched intent
- ⚠️ close but off
- ❌ missing

The dimensions you must score:

1. Information architecture (section order)
2. Section density / rhythm
3. Header pattern
4. Hamburger drawer behavior
5. Hero: eye path + primary CTA visibility
6. Services block layout
7. Cases: proof format
8. Contact placement in the flow
9. Footer density
10. Mobile stacking order
11. Interaction (accordion / dropdown / modal)
12. Typography hierarchy
13. Spacing / breathing room
14. Slop check

For every ⚠️ or ❌: write a specific fix ("Add primary CTA to mobile
header; currently hidden under hamburger only", "Cards keep 3 columns at
768; should stack to 1 at ≤640"). Then go fix it.

## What we are NOT comparing

- Pixel positions of individual glyphs
- Exact colour values (unless the reference colour was a principle we
  chose to adopt)
- Icon shapes / logo positions
- Animation timings, unless the animation is *the point*
- Copy length in words

## What we ARE comparing

- Does every section on our page have a clear job?
- Is the eye path from hero → proof → action intact?
- Does mobile still deliver the same jobs the desktop version does?
- Does the hamburger reproduce the *pattern* (drawer / overlay / sheet),
  even if the icon differs?
- Does the density feel similar? Not "same number of cards", but
  "same amount of content per fold".

## When to stop the loop

Stop when:

- Every dimension is ✅ or a deliberate ⚠️/❌ noted in "What we chose
  to differ on".
- The QA checklist at the bottom of `comparison.md` is done.
- A colleague could open both sites and answer "what is the job of this
  section" the same way on both.

Do not stop just because iteration count is high. Do not iterate past
the point of diminishing returns; polish the last 10% by hand rather
than automating it.
