import type { Metadata } from "next";
import { ArrowDown } from "lucide-react";
import { Haze } from "@/components/Atmosphere";
import { CtaBand } from "@/components/CtaBand";
import { FocusText } from "@/components/FocusText";
import { ServiceDetail } from "@/components/ServiceDetail";
import { services } from "@/lib/content";
import styles from "../service-page.module.css";

const courses = services.filter((s) => s.page === "/paradigmskiftet");

export const metadata: Metadata = {
  title: "Paradigmskiftet — Kongruens",
  description: courses[0]?.paragraphs[0],
  alternates: { canonical: "/paradigmskiftet" },
};

export default function ParadigmskiftetPage() {
  return (
    <main className={styles.page}>
      <section className={styles.intro}>
        <Haze />
        <div className={styles.introInner}>
          <h1 className={styles.pageTitle}>
            <FocusText now text="Paradigmskiftet" delay={150} />
          </h1>
          <ul className={styles.index}>
            {courses.map((s) => (
              <li key={s.slug}>
                <a href={`#${s.slug}`}>
                  <span className={styles.indexTitle}>{s.title}</span>
                  <span className={styles.indexPrice}>{s.price}</span>
                  <ArrowDown aria-hidden="true" strokeWidth={1.5} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {courses.map((s, i) => (
        <ServiceDetail key={s.slug} service={s} flip={i % 2 === 1} />
      ))}

      <CtaBand />
    </main>
  );
}
