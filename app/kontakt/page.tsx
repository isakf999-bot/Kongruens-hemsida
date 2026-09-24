import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm } from "@/components/ContactForm";
import styles from "./kontakt.module.css";

export const metadata: Metadata = {
  title: "Kontakt — Kongruens",
};

export default function ContactPage() {
  return (
    <main>
      <section className={styles.page}>
        <div className={styles.panel}>
          <div className={styles.intro}>
            <h1>Kontakt</h1>
            <p>
              <a href="tel:+46705536050">Tel: 0705-536050</a>
            </p>
            <p>
              <a href="mailto:info@kongruens.se">info@kongruens.se</a>
            </p>
          </div>
          <div className={styles.formArea}>
            <Suspense fallback={null}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  );
}
