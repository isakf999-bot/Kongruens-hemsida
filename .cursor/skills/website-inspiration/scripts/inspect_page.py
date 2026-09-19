"""Deep DOM inspection.

Beyond stack + tokens, this also extracts things you need to think in
components: repeating grids, an image inventory, a rough type & spacing
scale, buttons, headings by section, and section-level landmarks.

Everything comes from computed styles / DOM structure — no guessing.
"""

from __future__ import annotations

from common import detect_stack

INSPECT_JS = r"""() => {
  const q = (sel, root=document) => [...root.querySelectorAll(sel)];
  const srcs = q("script[src]").map((s) => s.src);
  const hrefs = q("link[rel='stylesheet']").map((l) => l.href);
  const metas = q("meta").map((m) => ({
    name: m.getAttribute("name") || m.getAttribute("property"),
    content: m.getAttribute("content"),
  }));
  const generator = document.querySelector("meta[name='generator']")?.content || null;

  // --- CSS custom properties on <html> --------------------------------------
  const cssVars = {};
  const root = getComputedStyle(document.documentElement);
  for (const name of root) {
    if (name.startsWith("--")) {
      const value = root.getPropertyValue(name).trim();
      if (value) cssVars[name] = value;
    }
  }

  // --- Type samples ---------------------------------------------------------
  const sample = (el) => {
    if (!el) return null;
    const s = getComputedStyle(el);
    return {
      tag: el.tagName.toLowerCase(),
      fontFamily: s.fontFamily,
      fontSize: s.fontSize,
      fontWeight: s.fontWeight,
      lineHeight: s.lineHeight,
      letterSpacing: s.letterSpacing,
      color: s.color,
      textAlign: s.textAlign,
    };
  };

  // --- Type + spacing scale (rounded to whole px, deduped) ------------------
  const bucket = (arr, size = 300) => arr.slice(0, size);
  const px = (v) => Math.round(parseFloat(v) || 0);
  const distinct = (arr) => [...new Set(arr)].filter(Boolean).sort((a, b) => a - b);

  const bodyEls = q("main *, header *, footer *, body > *").slice(0, 2000);
  const fontSizes = distinct(bodyEls.map((el) => px(getComputedStyle(el).fontSize)));
  const spacingTop = distinct(bodyEls.map((el) => px(getComputedStyle(el).paddingTop)));
  const spacingBot = distinct(bodyEls.map((el) => px(getComputedStyle(el).paddingBottom)));
  const gaps = distinct(bodyEls.map((el) => px(getComputedStyle(el).gap)));
  const maxWidths = distinct(
    bodyEls.map((el) => px(getComputedStyle(el).maxWidth)).filter((v) => v > 400 && v < 2000)
  );

  // --- Container / layout ---------------------------------------------------
  const container = document.querySelector(
    "main > div, header > div, .container, [class*='container' i]"
  );
  const containerStyle = container ? getComputedStyle(container) : null;

  const header = document.querySelector("header, [role='banner']");
  const headerStyle = header ? getComputedStyle(header) : null;

  // --- Nav links (header + nav) --------------------------------------------
  const navLinks = q("header a, [role='banner'] a, nav a")
    .slice(0, 60)
    .map((a) => ({
      text: (a.innerText || "").trim().slice(0, 80),
      href: a.getAttribute("href"),
    }))
    .filter((a) => a.text);

  // --- Footer links (used by crawler for site map) --------------------------
  const footerLinks = q("footer a, [role='contentinfo'] a")
    .slice(0, 100)
    .map((a) => ({
      text: (a.innerText || "").trim().slice(0, 80),
      href: a.getAttribute("href"),
    }))
    .filter((a) => a.text);

  // --- Buttons (visual style samples) --------------------------------------
  const buttons = q("a, button").filter((el) => {
    const s = getComputedStyle(el);
    const pad = parseFloat(s.paddingLeft) + parseFloat(s.paddingRight);
    return pad > 24 && (el.tagName === "BUTTON" || el.getAttribute("href"));
  }).slice(0, 20).map((el) => {
    const s = getComputedStyle(el);
    return {
      text: (el.innerText || "").trim().slice(0, 60),
      borderRadius: s.borderRadius,
      padding: `${s.paddingTop} ${s.paddingRight} ${s.paddingBottom} ${s.paddingLeft}`,
      background: s.backgroundColor,
      color: s.color,
      fontSize: s.fontSize,
      border: s.border,
    };
  });

  // --- Section-level landmarks (main > sections) ---------------------------
  const mainSections = q("main > *, main section, [role='main'] > *").slice(0, 40);
  const sections = mainSections.map((el, i) => {
    const heading = el.querySelector("h1, h2, h3");
    const s = getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    return {
      index: i,
      tag: el.tagName.toLowerCase(),
      id: el.id || null,
      className: (el.className && typeof el.className === "string")
        ? el.className.slice(0, 120) : null,
      heading: heading ? (heading.innerText || "").trim().slice(0, 120) : null,
      headingTag: heading ? heading.tagName.toLowerCase() : null,
      height: Math.round(rect.height),
      paddingTop: s.paddingTop,
      paddingBottom: s.paddingBottom,
      background: s.backgroundColor,
      imageCount: el.querySelectorAll("img, picture, video").length,
      buttonCount: el.querySelectorAll("a[class*='btn' i], button, a[class*='cta' i]").length,
    };
  });

  // --- Repeating patterns → component candidates ---------------------------
  // Heuristic: parent with >=3 direct children that share the same first class
  // is probably a grid/list of the same component.
  const componentCandidates = [];
  const seenParents = new Set();
  for (const parent of q("main *, section *, div").slice(0, 5000)) {
    if (seenParents.has(parent)) continue;
    const kids = [...parent.children];
    if (kids.length < 3) continue;
    const firstClass = (el) => {
      const cls = (el.className && typeof el.className === "string")
        ? el.className.split(/\s+/)[0] : "";
      return cls || el.tagName.toLowerCase();
    };
    const cls = firstClass(kids[0]);
    if (!cls) continue;
    const same = kids.filter((k) => firstClass(k) === cls);
    if (same.length >= 3 && same.length / kids.length >= 0.75) {
      seenParents.add(parent);
      const rect = parent.getBoundingClientRect();
      componentCandidates.push({
        count: same.length,
        childTag: kids[0].tagName.toLowerCase(),
        childClass: cls.slice(0, 60),
        parentTag: parent.tagName.toLowerCase(),
        parentClass: firstClass(parent).slice(0, 60),
        gap: getComputedStyle(parent).gap,
        display: getComputedStyle(parent).display,
        gridTemplateColumns: getComputedStyle(parent).gridTemplateColumns,
        width: Math.round(rect.width),
        heading: parent.closest("section, article, main")?.querySelector("h1,h2,h3")?.innerText
          ?.trim().slice(0, 100) || null,
      });
    }
    if (componentCandidates.length >= 40) break;
  }

  // --- Image inventory -----------------------------------------------------
  const images = q("img").slice(0, 80).map((img) => ({
    src: img.currentSrc || img.src,
    alt: (img.alt || "").slice(0, 120),
    width: img.naturalWidth || img.width || null,
    height: img.naturalHeight || img.height || null,
    loading: img.getAttribute("loading"),
    role: img.getAttribute("role"),
    parentTag: img.parentElement?.tagName.toLowerCase() || null,
  }));

  const videos = q("video").slice(0, 20).map((v) => ({
    src: v.currentSrc || v.src,
    autoplay: v.autoplay,
    loop: v.loop,
    muted: v.muted,
    poster: v.poster,
  }));

  // --- Headings hierarchy (order matters) ----------------------------------
  const headings = q("h1, h2, h3").slice(0, 60).map((h) => ({
    tag: h.tagName.toLowerCase(),
    text: (h.innerText || "").trim().slice(0, 140),
    fontSize: getComputedStyle(h).fontSize,
    fontWeight: getComputedStyle(h).fontWeight,
  }));

  // --- Menu triggers ------------------------------------------------------
  const menuButtons = q(
    "button[aria-expanded], button[aria-label*='menu' i], button[aria-label*='meny' i], [class*='hamburger' i]"
  ).map((b) => ({
    ariaExpanded: b.getAttribute("aria-expanded"),
    ariaControls: b.getAttribute("aria-controls"),
    ariaLabel: b.getAttribute("aria-label"),
    text: (b.innerText || "").trim().slice(0, 40),
  }));

  const dropdownTriggers = q(
    "header [aria-haspopup], nav [aria-haspopup], header [data-hover-menu]"
  ).map((b) => ({
    text: (b.innerText || "").trim().slice(0, 40),
    ariaHaspopup: b.getAttribute("aria-haspopup"),
    ariaControls: b.getAttribute("aria-controls"),
  }));

  const accordions = q(
    "details, [role='button'][aria-expanded], [class*='accordion' i] [aria-expanded], [class*='faq' i] [aria-expanded]"
  ).slice(0, 30).map((b) => ({
    tag: b.tagName.toLowerCase(),
    text: (b.innerText || "").trim().slice(0, 60),
    open: b.hasAttribute("open") ? true
      : b.getAttribute("aria-expanded") === "true",
  }));

  const tabs = q("[role='tab']").slice(0, 20).map((t) => ({
    text: (t.innerText || "").trim().slice(0, 40),
    selected: t.getAttribute("aria-selected") === "true",
  }));

  const landmarks = q(
    "header, nav, main, section, aside, footer, [role]"
  ).slice(0, 60).map((el) => ({
    tag: el.tagName.toLowerCase(),
    role: el.getAttribute("role"),
    id: el.id || null,
    ariaLabel: el.getAttribute("aria-label"),
    heading: (el.querySelector("h1,h2,h3")?.innerText || "").trim().slice(0, 80),
  }));

  return {
    title: document.title,
    generator,
    htmlLang: document.documentElement.lang,
    scriptSrcs: srcs.slice(0, 80),
    stylesheetHrefs: hrefs.slice(0, 40),
    metas: metas.filter((m) => m.name).slice(0, 40),
    cssVars: Object.fromEntries(Object.entries(cssVars).slice(0, 120)),
    type: {
      body: sample(document.body),
      h1: sample(document.querySelector("h1")),
      h2: sample(document.querySelector("h2")),
      h3: sample(document.querySelector("h3")),
      p: sample(document.querySelector("main p, p")),
    },
    scale: {
      fontSizesPx: bucket(fontSizes, 24),
      paddingTopPx: bucket(spacingTop, 24),
      paddingBottomPx: bucket(spacingBot, 24),
      gapsPx: bucket(gaps, 24),
      maxWidthsPx: bucket(maxWidths, 12),
    },
    layout: {
      bodyBackground: getComputedStyle(document.body).backgroundColor,
      containerMaxWidth: containerStyle ? containerStyle.maxWidth : null,
      containerWidth: containerStyle ? containerStyle.width : null,
      headerPosition: headerStyle ? headerStyle.position : null,
      headerHeight: headerStyle ? headerStyle.height : null,
      bodyHeight: Math.round(document.body.scrollHeight),
      documentHeight: Math.round(document.documentElement.scrollHeight),
    },
    navLinks,
    footerLinks,
    menuButtons,
    dropdownTriggers,
    accordions,
    tabs,
    buttons,
    landmarks,
    sections,
    componentCandidates,
    images,
    videos,
    headings,
    htmlSnippet: document.documentElement.outerHTML.slice(0, 150000),
  };
}"""


def inspect_page(page, url: str) -> dict:
    raw = page.evaluate(INSPECT_JS)
    html = raw.pop("htmlSnippet", "") or ""
    stack = detect_stack(html, raw.get("scriptSrcs") or [], raw.get("stylesheetHrefs") or [])
    data = {
        "url": url,
        "title": raw.get("title"),
        "stack": stack,
    }
    data.update(raw)
    # Trim noise from the top-level output; the model reads this file by hand.
    data["scriptSrcs"] = (raw.get("scriptSrcs") or [])[:20]
    data["stylesheetHrefs"] = (raw.get("stylesheetHrefs") or [])[:20]
    return data
