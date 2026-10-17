import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Haze } from "@/components/Atmosphere";
import { FocusText } from "@/components/FocusText";
import { Reveal } from "@/components/Reveal";
import { serviceHref, services } from "@/lib/content";
import styles from "./services.module.css";

export const metadata: Metadata = {
  title: "Tjänster — Kongruens",
  alternates: { canonical: "/services" },
};

/** The three services as a short index; each row leads to the service's own page. */
export default function ServicesPage() {
  return (
    <main>
      <section className={styles.list}>
        <Haze />
        <div className={styles.listInner}>
          <h1 className={styles.title}>
            <FocusText now text="Tjänster" delay={150} />
          </h1>
          <Reveal delay={150}>
            <ul className={styles.rows}>
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={serviceHref(s)} className={styles.row}>
                    <img src={s.image} alt={s.alt} width={480} height={360} />
                    <span className={styles.rowTitle}>{s.title}</span>
                    <span className={styles.rowMeta}>
                      {s.meta ? (
                        <span>
                          <Clock aria-hidden="true" strokeWidth={1.5} />
                          {s.meta}
                        </span>
                      ) : null}
                      <strong>{s.price}</strong>
                    </span>
                    <ArrowRight className={styles.rowArrow} aria-hidden="true" strokeWidth={1.25} />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
