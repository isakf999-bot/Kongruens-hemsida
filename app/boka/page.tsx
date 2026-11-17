import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { Haze } from "@/components/Atmosphere";
import { FocusText } from "@/components/FocusText";
import { bookableServices, bookHref, bookingEmbed } from "@/lib/content";
import styles from "./boka.module.css";

export const metadata: Metadata = {
  title: "Boka tid — Kongruens",
  description: "Välj en tid som passar dig.",
  alternates: { canonical: "/boka" },
};

/**
 * The Kaddio booking, embedded. Only the services with a booking link can be
 * booked here; ?tjanst=<slug> picks one when there are several.
 */
export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{ tjanst?: string }>;
}) {
  const { tjanst } = await searchParams;
  const chosen = bookableServices.find((s) => s.slug === tjanst) ?? bookableServices[0];
  const src = chosen?.booking;

  return (
    <main className={styles.page}>
      <Haze />
      <div className={styles.inner}>
        <h1 className={styles.title}>
          <FocusText now text="Boka tid" delay={150} />
        </h1>

        {bookableServices.length > 1 ? (
          <nav className={styles.choices} aria-label="Välj tjänst">
            {bookableServices.map((s) => (
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
        ) : chosen ? (
          <p className={styles.service}>
            <strong>{chosen.title}</strong>
            {chosen.meta ? (
              <span>
                <Clock aria-hidden="true" strokeWidth={1.5} />
                {chosen.meta}
              </span>
            ) : null}
            <span>{chosen.price}</span>
          </p>
        ) : null}

        {src ? (
          <>
            <p className={styles.free}>
              <strong>Det första samtalet är kostnadsfritt.</strong>
            </p>
            <div className={styles.frame}>
              <iframe key={src} src={bookingEmbed(src)} title={`Boka tid: ${chosen?.title}`} loading="eager" allow="payment" />
            </div>
            <p className={styles.fallback}>
              Syns inte bokningen?{" "}
              <a href={src} target="_blank" rel="noopener noreferrer" className="link-rule">
                Öppna bokningen i ett nytt fönster
                <ArrowUpRight aria-hidden="true" strokeWidth={1.75} />
              </a>
            </p>
          </>
        ) : (
          <p className={styles.service}>
            Just nu går det inte att boka online.{" "}
            <Link href="/kontakt" className="link-rule">
              Kontakta mig
            </Link>
          </p>
        )}
      </div>
    </main>
  );
}
