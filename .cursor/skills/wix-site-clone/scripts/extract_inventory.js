() => {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const rgbToHex = (c) => {
    if (!c || c === "transparent" || c === "rgba(0, 0, 0, 0)") return null;
    const m = c.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([0-9.]+))?\)/);
    if (!m) return c;
    const a = m[4] === undefined ? 1 : Number(m[4]);
    const hex =
      "#" +
      [m[1], m[2], m[3]]
        .map((n) => Number(n).toString(16).padStart(2, "0"))
        .join("");
    return a < 1 ? `rgba(${m[1]}, ${m[2]}, ${m[3]}, ${a})` : hex;
  };

  const cssVars = {};
  const rootStyle = getComputedStyle(document.documentElement);
  const bodyStyle = getComputedStyle(document.body);
  for (const sheet of [rootStyle, bodyStyle]) {
    for (let i = 0; i < sheet.length; i++) {
      const name = sheet[i];
      if (name && name.startsWith("--")) {
        const val = sheet.getPropertyValue(name).trim();
        if (val) cssVars[name] = val;
      }
    }
  }

  const html = document.documentElement.outerHTML.slice(0, 80000);
  const engine = (() => {
    const hasWst = Object.keys(cssVars).some((k) => k.startsWith("--wst-"));
    const hasWixui = !!document.querySelector("[class*='wixui-'], .wixui-rich-text");
    const hasSite = !!document.querySelector("#SITE_CONTAINER, #PAGES_CONTAINER");
    const hasMesh = !!document.querySelector("[data-mesh-id]");
    if (hasWst || hasWixui) return "studio";
    if (hasMesh && !hasSite) return "editor-x";
    if (hasSite) return "classic";
    if (html.includes("wixstatic") || html.includes("wix.com")) return "wix-unknown";
    return "unknown";
  })();

  const fontsLoaded = [...document.fonts].map((f) => ({
    family: f.family,
    weight: String(f.weight),
    style: f.style,
    status: f.status,
  }));

  const fontFiles = performance
    .getEntriesByType("resource")
    .map((r) => r.name)
    .filter((n) => /\.(woff2?|ttf|otf)(\?|$)/i.test(n));

  const textNodes = [
    ...document.querySelectorAll(
      "h1,h2,h3,h4,h5,h6,p,a,button,span,li,label,td,th,[role='heading']"
    ),
  ].filter((el) => {
    const t = (el.innerText || "").replace(/\s+/g, " ").trim();
    if (t.length < 2 || t.length > 180) return false;
    const r = el.getBoundingClientRect();
    return r.width > 8 && r.height > 8;
  });

  const styleKey = (cs) =>
    [
      cs.fontFamily,
      cs.fontSize,
      cs.fontWeight,
      cs.fontStyle,
      cs.lineHeight,
      cs.letterSpacing,
      cs.textTransform,
      cs.textAlign,
      rgbToHex(cs.color),
    ].join("|");

  const typeMap = new Map();
  for (const el of textNodes) {
    const cs = getComputedStyle(el);
    const key = styleKey(cs);
    const sample = (el.innerText || "").replace(/\s+/g, " ").trim().slice(0, 80);
    if (!typeMap.has(key)) {
      typeMap.set(key, {
        fontFamily: cs.fontFamily,
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
        fontStyle: cs.fontStyle,
        lineHeight: cs.lineHeight,
        letterSpacing: cs.letterSpacing,
        textTransform: cs.textTransform,
        textAlign: cs.textAlign,
        color: rgbToHex(cs.color),
        samples: [sample],
        count: 1,
        tag: el.tagName.toLowerCase(),
      });
    } else {
      const rec = typeMap.get(key);
      rec.count += 1;
      if (rec.samples.length < 3 && !rec.samples.includes(sample)) rec.samples.push(sample);
    }
  }

  const typeStyles = [...typeMap.values()].sort((a, b) => b.count - a.count).slice(0, 40);

  const colorCount = new Map();
  const bump = (val, role) => {
    const hex = rgbToHex(val);
    if (!hex) return;
    const rec = colorCount.get(hex) || { value: hex, roles: new Set(), count: 0 };
    rec.count += 1;
    rec.roles.add(role);
    colorCount.set(hex, rec);
  };

  bump(bodyStyle.backgroundColor, "body-bg");
  bump(bodyStyle.color, "body-text");

  const colorEls = document.querySelectorAll("section,header,footer,nav,button,a,div,h1,h2,h3,p");
  let n = 0;
  for (const el of colorEls) {
    if (n++ > 400) break;
    const cs = getComputedStyle(el);
    bump(cs.backgroundColor, "bg");
    bump(cs.color, "text");
    bump(cs.borderColor, "border");
  }

  const colors = [...colorCount.values()]
    .map((c) => ({ value: c.value, count: c.count, roles: [...c.roles] }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 40);

  const sectionSelector =
    engine === "classic"
      ? "#SITE_HEADER, #SITE_FOOTER, #PAGES_CONTAINER > *, [data-testid='section'], section"
      : "header, footer, main > section, [data-testid='section'], section";

  let rawSections = [...document.querySelectorAll(sectionSelector)];
  if (rawSections.length < 3) {
    rawSections = [...document.querySelectorAll("header, footer, section, [id^='comp-']")].filter(
      (el) => {
        const r = el.getBoundingClientRect();
        return r.width >= vw * 0.7 && r.height >= 70;
      }
    );
  }

  const seen = new Set();
  const sections = [];
  for (const el of rawSections) {
    const r = el.getBoundingClientRect();
    if (r.height < 40 || r.width < vw * 0.5) continue;
    const top = Math.round(r.top + window.scrollY);
    const key = `${top}-${Math.round(r.height)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const cs = getComputedStyle(el);
    const bgImg = cs.backgroundImage && cs.backgroundImage !== "none" ? cs.backgroundImage : null;
    sections.push({
      tag: el.tagName.toLowerCase(),
      id: el.id || null,
      testId: el.getAttribute("data-testid"),
      y: top,
      height: Math.round(r.height),
      width: Math.round(r.width),
      backgroundColor: rgbToHex(cs.backgroundColor),
      backgroundImage: bgImg,
      heading: (el.querySelector("h1,h2,h3,[role='heading']")?.innerText || "")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 120),
      textPreview: (el.innerText || "").replace(/\s+/g, " ").trim().slice(0, 180),
    });
  }
  sections.sort((a, b) => a.y - b.y);

  const absUrl = (u) => {
    if (!u) return null;
    try {
      return new URL(u, location.href).href;
    } catch {
      return u;
    }
  };

  const images = [...document.querySelectorAll("img")]
    .map((img) => {
      const r = img.getBoundingClientRect();
      return {
        src: absUrl(img.currentSrc || img.src),
        alt: img.alt || "",
        width: img.naturalWidth || Math.round(r.width),
        height: img.naturalHeight || Math.round(r.height),
        displayWidth: Math.round(r.width),
        displayHeight: Math.round(r.height),
        objectFit: getComputedStyle(img).objectFit,
      };
    })
    .filter((i) => i.src && !i.src.startsWith("data:"))
    .slice(0, 80);

  const bgUrls = [];
  document.querySelectorAll("*").forEach((el, i) => {
    if (i > 500) return;
    const bg = getComputedStyle(el).backgroundImage;
    const m = bg && bg.match(/url\(["']?(.*?)["']?\)/);
    if (m && m[1] && !m[1].startsWith("data:")) bgUrls.push(absUrl(m[1]));
  });

  const videos = [...document.querySelectorAll("video")].map((v) => ({
    src: absUrl(v.currentSrc || v.src),
    poster: absUrl(v.poster),
  }));

  const header = document.querySelector("header, #SITE_HEADER, [data-testid='header']");
  const headerCs = header ? getComputedStyle(header) : null;
  const headerRect = header ? header.getBoundingClientRect() : null;

  const contentCandidates = [
    ...document.querySelectorAll("h1, h2, .wixui-rich-text, p"),
  ].filter((el) => {
    const r = el.getBoundingClientRect();
    return r.width > 200 && r.width < vw * 0.95 && (el.innerText || "").trim().length > 8;
  });
  const contentWidths = contentCandidates
    .map((el) => Math.round(el.getBoundingClientRect().width))
    .sort((a, b) => a - b);
  const contentMaxWidth =
    contentWidths.length > 0 ? contentWidths[Math.floor(contentWidths.length * 0.7)] : null;

  const nav = [...document.querySelectorAll("nav a, #SITE_HEADER a, header a")]
    .map((a) => ({
      text: (a.innerText || "").replace(/\s+/g, " ").trim(),
      href: absUrl(a.href),
    }))
    .filter((a) => a.text && a.href)
    .filter((a, i, arr) => arr.findIndex((b) => b.text === a.text && b.href === a.href) === i)
    .slice(0, 40);

  const buttons = [...document.querySelectorAll("a, button, [role='button']")]
    .filter((el) => {
      const t = (el.innerText || "").replace(/\s+/g, " ").trim();
      const r = el.getBoundingClientRect();
      return t.length > 0 && t.length < 48 && r.width > 40 && r.height > 24 && r.height < 80;
    })
    .slice(0, 16)
    .map((el) => {
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return {
        text: (el.innerText || "").replace(/\s+/g, " ").trim(),
        href: el.href ? absUrl(el.href) : null,
        fontFamily: cs.fontFamily,
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
        letterSpacing: cs.letterSpacing,
        textTransform: cs.textTransform,
        color: rgbToHex(cs.color),
        backgroundColor: rgbToHex(cs.backgroundColor),
        border: `${cs.borderWidth} ${cs.borderStyle} ${rgbToHex(cs.borderColor) || cs.borderColor}`,
        borderRadius: cs.borderRadius,
        padding: cs.padding,
        width: Math.round(r.width),
        height: Math.round(r.height),
      };
    });

  const sameOriginLinks = [...document.querySelectorAll("a[href]")]
    .map((a) => absUrl(a.href))
    .filter(Boolean)
    .filter((href) => {
      try {
        const u = new URL(href);
        return u.origin === location.origin && !href.includes("#");
      } catch {
        return false;
      }
    });

  return {
    url: location.href,
    title: document.title,
    language: document.documentElement.lang || document.body.lang || null,
    viewport: { width: vw, height: vh },
    engine,
    description: document.querySelector('meta[name="description"]')?.content || null,
    favicon: absUrl(
      document.querySelector('link[rel="icon"]')?.href ||
        document.querySelector('link[rel="shortcut icon"]')?.href
    ),
    cssVars,
    fontsLoaded,
    fontFiles: [...new Set(fontFiles)],
    typeStyles,
    colors,
    sections,
    images,
    backgroundImageUrls: [...new Set(bgUrls)].slice(0, 40),
    videos,
    nav,
    buttons,
    layout: {
      headerHeight: headerRect ? Math.round(headerRect.height) : null,
      headerPosition: headerCs ? headerCs.position : null,
      headerBackground: headerCs ? rgbToHex(headerCs.backgroundColor) : null,
      contentMaxWidth,
      bodyBackground: rgbToHex(bodyStyle.backgroundColor),
    },
    sameOriginPaths: [
      ...new Set(
        sameOriginLinks.map((h) => {
          try {
            return new URL(h).pathname || "/";
          } catch {
            return "/";
          }
        })
      ),
    ].slice(0, 30),
  };
}
