import styles from "./HeroMedia.module.css";

export function HeroMedia() {
  return (
    <div className={styles.media} aria-hidden="true">
      <img
        className={styles.plate}
        src="/images/hero-home.jpg"
        alt=""
        width={1920}
        height={1280}
        fetchPriority="high"
      />
    </div>
  );
}
