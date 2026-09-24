import Link from "next/link";
import { services } from "@/lib/content";
import styles from "./book.module.css";

export default async function BookingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const decoded = decodeURIComponent(slug);
  const service =
    services.find((s) => s.href.endsWith(decoded)) ||
    services.find((s) => s.slug === decoded) ||
    services[0];

  return (
    <main className={styles.page}>
      <div className={styles.visual}>
        <img src={service.image} alt={service.alt} width={1600} height={1200} />
      </div>
      <article className={styles.sheet}>
        <h1>{service.title}</h1>
        {service.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
        {service.meta ? <p className={styles.meta}>{service.meta}</p> : null}
        <p className={styles.price}>{service.price}</p>
        <Link className="btn" href={`/kontakt?amne=${encodeURIComponent(service.title)}`}>
          Kontakta mig
        </Link>
      </article>
    </main>
  );
}
