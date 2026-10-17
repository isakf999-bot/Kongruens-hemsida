import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Grain } from "@/components/Atmosphere";
import styles from "./CtaBand.module.css";

/** Closing call to action for a service page, built from the site's existing words. */
export function CtaBand({ subject }: { subject?: string }) {
  const href = subject ? `/kontakt?amne=${encodeURIComponent(subject)}` : "/kontakt";
  return (
    <section className={styles.band}>
      <Grain className={styles.grain} />
      <div className={styles.inner}>
        <p>Det första samtalet är kostnadsfritt.</p>
        <Link href={href} className="btn btn-on-dark">
          Boka ett första kostnadsfritt samtal
          <ArrowRight aria-hidden="true" strokeWidth={1.75} />
        </Link>
      </div>
    </section>
  );
}
