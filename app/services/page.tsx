import { Reveal } from "@/components/Reveal";
import { ServiceCard } from "@/components/ServiceCard";
import { services } from "@/lib/content";
import styles from "./services.module.css";

export default function ServicesPage() {
  return (
    <main>
      <section className={styles.list}>
        <h1 className={styles.title}>Tjänster</h1>
        <div className={styles.listInner}>
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 90}>
              <ServiceCard service={s} heading="h2" variant="catalog" />
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
