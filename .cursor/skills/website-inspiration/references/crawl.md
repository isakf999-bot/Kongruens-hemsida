# Crawl — discover the pages that shape the site

You cannot reason about a website from its homepage alone. Even for a
brochure site, at least these pages usually matter:

- One service / offering detail page (drills into the promise)
- Cases / work / portfolio (the proof)
- About / person / team (the trust)
- Process / methodology (the reassurance)
- Contact (the action)

## Script

```bash
python <skill>/scripts/crawl.py "https://example.com" --limit 8
```

Writes `references/inspiration/<host>/sitemap.json`. Feed that file into
`capture.py --sitemap …` or use `research.py`, which chains them.

The crawler looks in this order:

1. Header nav links (`header a`, `[role=banner] a`, `nav a`)
2. Footer links (`footer a`, `[role=contentinfo] a`)
3. `/sitemap.xml` if the site publishes one
4. Anchors on the homepage body (only used to top up)

Then it ranks by a small heuristic:

- Structural words (`service/tjanst`, `work/case`, `about/om`, `process`,
  `pricing/priser`, `contact/kontakt`, `team`, `faq`) score higher.
- Blog / news / tag / pagination pages score lower.
- Deeper paths score lower.
- The homepage always makes the list.

## How many pages to keep

- 6 is a good default (`--limit 6`, and `research.py --pages-limit 6`).
- Lift to 8–10 only if the site is unusually navigation-driven (agency
  with many service subpages, or a SaaS with many product pages you
  genuinely need to study).
- Lower to 3 or use `research.py --only-home` when the request is narrow
  ("bygg om vår hero", "studera hamburgermenyn").

## When crawl breaks

- **Single-page apps that hydrate slowly.** The crawler waits for
  `domcontentloaded` and up to 8s of networkidle; then it reads whatever
  is in the DOM. If the nav renders after that, you will get thin
  results. Solution: pass `--pages` to `capture.py` yourself, or use the
  Cursor browser to scrape links manually.
- **Cookie / geo walls.** The crawler cannot dismiss them. Note the wall
  in `analysis.md` and screenshot the state you *can* see.
- **Hostnames diverging** (e.g. `example.com` vs `app.example.com`). The
  crawler stays on the seed host. If you need the app subdomain, run a
  second crawl on it and write two libraries.

## Etiquette

- One reference at a time. Sequential, not parallel.
- Do not commit `references/inspiration/**` unless the user asked. It
  contains third-party screenshots and text.
- Add `references/inspiration/` to `.gitignore` alongside `DesignPictures/`
  if it is missing.
