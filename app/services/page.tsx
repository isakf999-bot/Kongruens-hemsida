import { Reveal } from "@/components/Reveal";
import { ServiceCard } from "@/components/ServiceCard";
import { services } from "@/lib/content";
import styles from "./services.module.css";

export default function ServicesPage() {
  return (
    <main>
      <section className={styles.hero}>
        <img
          src="/images/hero-home.jpg"
          alt="Hand som håller en glaskula framför en brygga i skymning."
        />
        <h1>TJÄNSTER</h1>
      </section>
      <section className={styles.list}>
        <div className={styles.listInner}>
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 90}>
              <ServiceCard service={s} heading="h2" more />
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
