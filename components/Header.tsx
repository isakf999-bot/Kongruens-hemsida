"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./Header.module.css";

const links = [
  { href: "/about-5", label: "Om" },
  { href: "/services", label: "Tjänster" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const darkHero =
    pathname === "/" ||
    pathname.startsWith("/about") ||
    pathname.startsWith("/booking-calendar");
  const solid =
    scrolled || pathname.startsWith("/services") || pathname.startsWith("/kontakt");
  const ink = open || solid || !darkHero;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`${styles.header} ${ink ? styles.ink : ""} ${solid ? styles.scrolled : ""} ${open ? styles.open : ""}`}
    >
      <div className={styles.inner}>
        <Link href="/" className={styles.brand} onClick={() => setOpen(false)}>
          <span className={styles.name}>MATS SVENSSON</span>
          <span className={styles.tag}>Personlig Vägledare</span>
        </Link>

        <nav className={styles.nav} aria-label="Huvudmeny">
          {links.map((l) => {
            const active =
              (l.href === "/services" && pathname.startsWith("/services")) ||
              (l.href.startsWith("/about") && pathname.startsWith("/about"));
            return (
              <Link
                key={l.label}
                href={l.href}
                className={`${styles.link} ${active ? styles.active : ""}`}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <Link href="/kontakt" className={`btn btn-nav ${styles.cta}`} onClick={() => setOpen(false)}>
          Mejla Nu
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
        {links.map((l) => (
          <Link key={l.label} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </Link>
        ))}
        <Link href="/kontakt" className="btn btn-nav" onClick={() => setOpen(false)}>
          Mejla Nu
        </Link>
      </div>
    </header>
  );
}
