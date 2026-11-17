import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Grain } from "@/components/Atmosphere";
import { bookHref } from "@/lib/content";
import styles from "./CtaBand.module.css";

/** Closing call to action for a service page: book the free first conversation. */
export function CtaBand() {
  return (
    <section className={styles.band}>
      <Grain className={styles.grain} />
      <div className={styles.inner}>
        <p>Det första samtalet är kostnadsfritt.</p>
        <Link href={bookHref()} className="btn btn-on-dark">
          Boka ett första kostnadsfritt samtal
          <ArrowRight aria-hidden="true" strokeWidth={1.75} />
        </Link>
      </div>
    </section>
  );
}
