"use client";

import { useEffect, useState } from "react";
import styles from "./HeroMedia.module.css";

export function HeroMedia() {
  const [live, setLive] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => setLive(true), 600);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div className={styles.media} aria-hidden="true">
      <img
        className={styles.poster}
        src="/media/hero-sea.jpg"
        alt=""
        width={1920}
        height={1080}
        fetchPriority="high"
      />
      {live ? (
        <video
          className={styles.video}
          autoPlay
          muted
          loop
          playsInline
          poster="/media/hero-sea.jpg"
        >
          <source src="/media/hero-sea.mp4" type="video/mp4" />
        </video>
      ) : null}
    </div>
  );
}
