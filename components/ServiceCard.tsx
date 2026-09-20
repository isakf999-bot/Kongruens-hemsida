import Link from "next/link";
import type { Service } from "@/lib/content";
import styles from "./ServiceCard.module.css";

export function ServiceCard({
  service,
  heading = "h3",
  variant = "card",
}: {
  service: Service;
  heading?: "h2" | "h3";
  variant?: "card" | "catalog";
}) {
  const Title = heading;

  return (
    <article
      className={`${styles.card} ${variant === "catalog" ? styles.catalog : ""} ${
        service.slug === "personlig-vagledning" ? styles.featured : ""
      }`}
    >
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
          {service.paragraphs[0] ? <p>{service.paragraphs[0]}</p> : null}
          {service.points?.length ? (
            <div className={styles.points}>
              {service.listLead ? <p>{service.listLead}</p> : null}
              <ul>
                {service.points.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}
          {service.paragraphs.slice(1).map((p) => (
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
