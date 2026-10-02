import styles from "./HeroMedia.module.css";

export function HeroMedia() {
  return (
    <div className={styles.media} aria-hidden="true">
      <link
        rel="preload"
        as="image"
        href="/images/hero-home-800.webp"
        media="(max-width: 800px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href="/images/hero-home.webp"
        media="(min-width: 801px)"
        fetchPriority="high"
      />
      <picture>
        <source media="(max-width: 800px)" srcSet="/images/hero-home-800.webp" type="image/webp" />
        <source srcSet="/images/hero-home.webp" type="image/webp" />
        <img
          className={styles.plate}
          src="/images/hero-home.jpg"
          alt=""
          width={1920}
          height={1200}
          fetchPriority="high"
          decoding="async"
        />
      </picture>
    </div>
  );
}
