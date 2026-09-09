import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import styles from "./blog.module.css";

export const metadata: Metadata = {
  title: "Blogg | Kongruens",
  description: "thoughts & notes",
};

export default function BlogPage() {
  return (
    <main>
      <section className={styles.hero}>
        <img
          src="/images/blog-hero.jpg"
          alt="Kajak på stilla vatten mot en ljus horisont."
        />
        <div className={styles.heroInner}>
          <h1>thoughts & notes</h1>
        </div>
      </section>

      <section className={styles.empty}>
        <Reveal className={styles.emptyInner}>
          <h2>Check back soon</h2>
          <p>Once posts are published, you’ll see them here.</p>
        </Reveal>
      </section>
    </main>
  );
}
