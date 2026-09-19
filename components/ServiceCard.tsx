"use client";

import Link from "next/link";
import { useState } from "react";
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
  const [open, setOpen] = useState(false);
  const shown = open ? service.paragraphs : service.paragraphs.slice(0, 1);

  return (
    <article className={styles.card}>
      <div className={styles.visual}>
        <img src={service.image} alt={service.alt} width={720} height={480} loading="lazy" />
      </div>
      <div className={styles.body}>
        <Title className={styles.title}>{service.title}</Title>
        <div className={`${styles.copy} ${open ? styles.copyOpen : ""}`}>
          {shown.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <button
          type="button"
          className={styles.more}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          Läs mer
        </button>
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
        <Link href={service.href} className={`btn ${styles.cta}`}>
          Boka
        </Link>
      </div>
    </article>
  );
}
