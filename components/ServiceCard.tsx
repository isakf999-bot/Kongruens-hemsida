import Link from "next/link";
import { ArrowUpRight, Check, Clock } from "lucide-react";
import { Grain } from "@/components/Atmosphere";
import GlareHover from "@/components/reactbits/GlareHover";
import type { Service } from "@/lib/content";
import styles from "./ServiceCard.module.css";

export function ServiceCard({
  service,
  heading = "h3",
  variant = "card",
  preview = false,
}: {
  service: Service;
  heading?: "h2" | "h3";
  variant?: "card" | "catalog";
  preview?: boolean;
}) {
  const Title = heading;
  const teaser = service.paragraphs.slice(0, 2).join(" ");
  const featured = service.slug === "personlig-vagledning";

  return (
    <article
      id={service.slug}
      className={`${styles.card} ${variant === "catalog" ? styles.catalog : ""} ${
        preview ? styles.preview : ""
      } ${featured ? styles.featured : ""}`}
    >
      {featured ? <Grain className={styles.grain} /> : null}
      <div className={styles.visual}>
        <GlareHover
          width="100%"
          height="100%"
          borderRadius="3px"
          glareColor="#e8eef2"
          glareOpacity={0.3}
          glareSize={38}
          variant="sheen"
          transitionDuration={900}
        >
          <img src={service.image} alt={service.alt} width={720} height={480} loading="lazy" />
        </GlareHover>
      </div>
      <div className={styles.body}>
        <Title className={styles.title}>{service.title}</Title>
        <div className={styles.meta}>
          {service.meta ? (
            <>
              <span className={styles.duration}>
                <Clock aria-hidden="true" strokeWidth={1.5} />
                {service.meta}
              </span>
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
          {preview ? (
            <p>{teaser}</p>
          ) : (
            <>
              {service.paragraphs[0] ? <p>{service.paragraphs[0]}</p> : null}
              {service.points?.length ? (
                <div className={styles.points}>
                  {service.listLead ? <p>{service.listLead}</p> : null}
                  <ul>
                    {service.points.map((item) => (
                      <li key={item}>
                        <Check aria-hidden="true" strokeWidth={1.75} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {service.paragraphs.slice(1).map((p) => (
                <p key={p}>{p}</p>
              ))}
            </>
          )}
        </div>
        <div className={styles.actions}>
          {preview ? (
            <Link
              href={`/services#${service.slug}`}
              className={`link-rule ${styles.more}`}
              aria-label={`Läs mer om ${service.title}`}
            >
              Läs mer
              <span className="srOnly"> om {service.title}</span>
              <ArrowUpRight aria-hidden="true" strokeWidth={1.75} />
            </Link>
          ) : null}
          <Link
            href={`/kontakt?amne=${encodeURIComponent(service.title)}`}
            className={`btn ${featured ? "btn-on-dark" : ""} ${styles.cta}`}
          >
            Kontakta mig
          </Link>
        </div>
      </div>
    </article>
  );
}
