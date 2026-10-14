import type { Metadata } from "next";
import { Suspense } from "react";
import { Mail, Phone } from "lucide-react";
import { Grain, Rings } from "@/components/Atmosphere";
import { ContactForm } from "@/components/ContactForm";
import { FocusText } from "@/components/FocusText";
import styles from "./kontakt.module.css";

export const metadata: Metadata = {
  title: "Kontakt — Kongruens",
  alternates: { canonical: "/kontakt" },
};

export default function ContactPage() {
  return (
    <main>
      <section className={styles.page}>
        <div className={styles.panel}>
          <div className={styles.intro}>
            <Grain className={styles.grain} />
            <Rings className={styles.rings} />
            <h1>
              <FocusText now text="Kontakt" delay={120} />
            </h1>
            <p>
              <a href="tel:+46705536050">
                <Phone aria-hidden="true" strokeWidth={1.5} />
                Tel: 0705-536050
              </a>
            </p>
            <p>
              <a href="mailto:info@kongruens.se">
                <Mail aria-hidden="true" strokeWidth={1.5} />
                info@kongruens.se
              </a>
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
