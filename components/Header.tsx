"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";

/** What the menu shows for each service; passed in so the full texts stay off the client. */
export type MenuService = {
  slug: string;
  title: string;
  meta: string;
  price: string;
  image: string;
  href: string;
};
import styles from "./Header.module.css";

const servicePaths = ["/services", "/paradigmskiftet", "/personlig-vagledning"];

export function Header({ services }: { services: MenuService[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [menuServices, setMenuServices] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const hoverTimer = useRef<number | undefined>(undefined);
  const hoverOpenedAt = useRef(0);

  const darkHero =
    pathname === "/" || pathname.startsWith("/booking-calendar");
  const onServices = servicePaths.some((p) => pathname.startsWith(p));
  const solid =
    scrolled ||
    pathname.startsWith("/about") ||
    onServices ||
    pathname.startsWith("/kontakt");
  const ink = open || solid || !darkHero;

  const closeAll = () => {
    setOpen(false);
    setDropdown(false);
    setMenuServices(false);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    closeAll();
  }, [pathname]);

  useEffect(() => {
    if (!open && !dropdown) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (dropdown) triggerRef.current?.focus();
      closeAll();
    };
    const onPointer = (e: PointerEvent) => {
      if (dropdown && !dropRef.current?.contains(e.target as Node)) setDropdown(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [open, dropdown]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Pointer users get the list on hover; a short delay lets the cursor cross the gap.
  const hoverOpen = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    window.clearTimeout(hoverTimer.current);
    if (!dropdown) hoverOpenedAt.current = Date.now();
    setDropdown(true);
  };
  const hoverClose = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setDropdown(false), 160);
  };

  return (
    <header
      className={`${styles.header} ${ink ? styles.ink : ""} ${solid ? styles.solid : ""} ${scrolled ? styles.floating : ""} ${open ? styles.open : ""}`}
    >
      <div className={styles.inner}>
        <Link href="/" className={styles.brand} onClick={closeAll}>
          <BrandLogo className={styles.logo} onDark={!ink} />
        </Link>

        <nav className={styles.nav} aria-label="Huvudmeny">
          <Link
            href="/about-5"
            className={`${styles.link} ${pathname.startsWith("/about") ? styles.active : ""}`}
            onClick={closeAll}
          >
            Om
          </Link>

          <div
            ref={dropRef}
            className={styles.drop}
            onPointerEnter={hoverOpen}
            onPointerLeave={hoverClose}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) setDropdown(false);
            }}
          >
            <button
              ref={triggerRef}
              type="button"
              className={`${styles.link} ${styles.trigger} ${onServices ? styles.active : ""}`}
              aria-expanded={dropdown}
              aria-controls="tjanstemeny"
              onClick={() => {
                // A click right after hover opened the list should not close it again.
                if (Date.now() - hoverOpenedAt.current < 600) return;
                setDropdown((v) => !v);
              }}
            >
              Tjänster
              <ChevronDown aria-hidden="true" strokeWidth={1.75} />
            </button>
            <div id="tjanstemeny" className={`${styles.dropPanel} ${dropdown ? styles.dropOpen : ""}`}>
              <ul>
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={s.href} className={styles.dropItem} onClick={closeAll}>
                      <img src={s.image} alt="" width={96} height={72} loading="lazy" />
                      <span className={styles.dropText}>
                        <span className={styles.dropTitle}>{s.title}</span>
                        <span className={styles.dropMeta}>
                          {s.meta ? `${s.meta} · ` : ""}
                          {s.price}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>

        <Link href="/kontakt" className={`btn btn-nav ${styles.cta}`} onClick={closeAll}>
          Kontakta mig
        </Link>

        <button
          className={styles.burger}
          aria-label="Meny"
          aria-expanded={open}
          aria-controls="mobilmeny"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      <div id="mobilmeny" className={`${styles.panel} ${open ? styles.panelOpen : ""}`}>
        <Link
          href="/about-5"
          className={styles.panelLink}
          style={{ transitionDelay: open ? "90ms" : "0ms" }}
          onClick={closeAll}
        >
          Om
          <ArrowUpRight aria-hidden="true" strokeWidth={1.25} />
        </Link>
        <button
          type="button"
          className={`${styles.panelLink} ${styles.panelTrigger}`}
          style={{ transitionDelay: open ? "160ms" : "0ms" }}
          aria-expanded={menuServices}
          aria-controls="mobil-tjanster"
          onClick={() => setMenuServices((v) => !v)}
        >
          Tjänster
          <ChevronDown aria-hidden="true" strokeWidth={1.25} />
        </button>
        <ul
          id="mobil-tjanster"
          className={`${styles.panelSub} ${menuServices ? styles.panelSubOpen : ""}`}
        >
          {services.map((s) => (
            <li key={s.slug}>
              <Link href={s.href} onClick={closeAll} tabIndex={menuServices ? 0 : -1}>
                <span>{s.title}</span>
                <span className={styles.dropMeta}>
                  {s.meta ? `${s.meta} · ` : ""}
                  {s.price}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/kontakt" className="btn btn-nav" onClick={closeAll}>
          Kontakta mig
        </Link>
      </div>
    </header>
  );
}
