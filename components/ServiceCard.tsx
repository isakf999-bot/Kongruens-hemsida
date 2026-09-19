import Link from "next/link";
import type { Service } from "@/lib/content";
import styles from "./ServiceCard.module.css";

export function ServiceCard({
  service,
  heading = "h3",
}: {
  service: Service;
  heading?: "h2" | "h3";
}) {
  const Title = heading;

  return (
    <article className={styles.card}>
      <div className={styles.visual}>
        <img src={service.image} alt={service.alt} width={720} height={480} loading="lazy" />
      </div>
      <div className={styles.body}>
        <Title className={styles.title}>{service.title}</Title>
        <div className={styles.meta}>
          {service.meta ? (
            <>
              <span>{service.meta}</span>
              <span className={styles.sep} aria-hidden>
                –
              </span>
              <strong>{service.price}</strong>
            </>
          ) : (
            <strong>{service.price}</strong>
          )}
        </div>
        <div className={styles.copy}>
          {service.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <Link href="/kontakt" className={`btn ${styles.cta}`}>
          Kontakta mig
        </Link>
      </div>
    </article>
  );
}
