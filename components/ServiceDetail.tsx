import Link from "next/link";
import type { CSSProperties } from "react";
import { Check, Clock } from "lucide-react";
import { FocusText } from "@/components/FocusText";
import { Reveal } from "@/components/Reveal";
import type { Service } from "@/lib/content";
import styles from "./ServiceDetail.module.css";

/** One service presented in full, for its own campaign page. */
export function ServiceDetail({
  service,
  heading = "h2",
  flip = false,
}: {
  service: Service;
  heading?: "h1" | "h2";
  flip?: boolean;
}) {
  const Title = heading;
  const [lead, ...rest] = service.paragraphs;

  return (
    <section id={service.slug} className={`${styles.detail} ${flip ? styles.flip : ""}`}>
      <div className={styles.top}>
        <div className={styles.intro}>
          <Reveal plain>
            <Title className={styles.title}>
              <FocusText text={service.title} now={heading === "h1"} delay={heading === "h1" ? 150 : 0} />
            </Title>
          </Reveal>
          <Reveal delay={120}>
            <div className={styles.meta}>
              <strong>{service.price}</strong>
              {service.meta ? (
                <span>
                  <Clock aria-hidden="true" strokeWidth={1.5} />
                  {service.meta}
                </span>
              ) : null}
            </div>
            {lead ? <p className={styles.lead}>{lead}</p> : null}
            <Link href={`/kontakt?amne=${encodeURIComponent(service.title)}`} className="btn">
              Kontakta mig
            </Link>
          </Reveal>
        </div>
        <Reveal
          className={`photo ${styles.media}`}
          delay={80}
          style={{ "--photo": `url(${service.image})` } as CSSProperties}
        >
          <img src={service.image} alt={service.alt} width={1200} height={1500} />
        </Reveal>
      </div>

      <div className={`${styles.body} ${service.points?.length ? "" : styles.textOnly}`}>
        {service.points?.length ? (
          <Reveal className={styles.points}>
            {service.listLead ? <p className={styles.listLead}>{service.listLead}</p> : null}
            <ul>
              {service.points.map((item) => (
                <li key={item}>
                  <Check aria-hidden="true" strokeWidth={1.75} />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ) : null}
        <Reveal className={styles.text} delay={100}>
          {rest.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
