import Link from "next/link";
import type { Service } from "@/lib/content";
import styles from "./ServiceCard.module.css";

export function ServiceCard({
  service,
  heading = "h3",
  more = false,
}: {
  service: Service;
  heading?: "h2" | "h3";
  more?: boolean;
}) {
  const Title = heading;

  return (
    <article className={styles.card}>
      <div className={styles.visual}>
        <img src={service.image} alt={service.alt} width={720} height={480} loading="lazy" />
      </div>
      <div className={styles.body}>
        <Title className={styles.title}>{service.title}</Title>
        <p className={styles.blurb}>{service.blurb}</p>
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
        {more ? (
          <Link href={service.href} className={styles.more}>
            Läs mer
          </Link>
        ) : null}
        <Link href={service.href} className={`btn ${styles.cta}`}>
          Boka
        </Link>
      </div>
    </article>
  );
}
