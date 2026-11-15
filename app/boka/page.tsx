import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Haze } from "@/components/Atmosphere";
import { FocusText } from "@/components/FocusText";
import { bookHref, bookingUrl, services } from "@/lib/content";
import styles from "./boka.module.css";

export const metadata: Metadata = {
  title: "Boka tid — Kongruens",
  description: "Välj tjänst och en tid som passar dig.",
  alternates: { canonical: "/boka" },
};

/**
 * The Kaddio booking, embedded. ?tjanst=<slug> opens it at that service; the
 * row of links switches service without leaving the page.
 */
export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{ tjanst?: string }>;
}) {
  const { tjanst } = await searchParams;
  const chosen = services.find((s) => s.slug === tjanst);
  const src = chosen?.booking ?? bookingUrl;

  return (
    <main className={styles.page}>
      <Haze />
      <div className={styles.inner}>
        <h1 className={styles.title}>
          <FocusText now text="Boka tid" delay={150} />
        </h1>

        <nav className={styles.choices} aria-label="Välj tjänst">
          <Link href={bookHref()} className={!chosen ? styles.current : ""} aria-current={!chosen ? "page" : undefined}>
            Alla tjänster
          </Link>
          {services.map((s) => (
            <Link
              key={s.slug}
              href={bookHref(s)}
              className={chosen?.slug === s.slug ? styles.current : ""}
              aria-current={chosen?.slug === s.slug ? "page" : undefined}
            >
              {s.title}
            </Link>
          ))}
        </nav>

        <div className={styles.frame}>
          <iframe
            key={src}
            src={src}
            title={chosen ? `Boka tid: ${chosen.title}` : "Boka tid"}
            loading="eager"
            allow="payment"
          />
        </div>

        <p className={styles.fallback}>
          Syns inte bokningen?{" "}
          <a href={src} target="_blank" rel="noopener noreferrer" className="link-rule">
            Öppna bokningen i ett nytt fönster
            <ArrowUpRight aria-hidden="true" strokeWidth={1.75} />
          </a>
        </p>
      </div>
    </main>
  );
}
