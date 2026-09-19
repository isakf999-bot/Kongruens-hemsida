import Link from "next/link";
import {
  IconFacebook,
  IconInstagram,
  IconLinkedin,
  IconTwitter,
  IconYoutube,
} from "@/components/icons";
import { aboutSocials, socials } from "@/lib/content";
import styles from "./Footer.module.css";

const iconMap = {
  Facebook: IconFacebook,
  Twitter: IconTwitter,
  Instagram: IconInstagram,
  YouTube: IconYoutube,
  LinkedIn: IconLinkedin,
};

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Link href="/" className={styles.mark} aria-label="Kongruens — startsidan">
            <span className={styles.markName}>MATS SVENSSON</span>
            <span className={styles.markTag}>Personlig Vägledare</span>
          </Link>
          <p className={styles.blurb}>
            Personlig vägledning som ett mer tillgängligt alternativ. Någon att resonera med kring
            livet, relationer, arbete och de beslut som betyder mest.
          </p>
        </div>

        <div className={styles.col}>
          <h2 className={styles.colHead}>Kontakt</h2>
          <p>
            <a href="tel:+46705536050">Tel: 0705-536050</a>
          </p>
          <p>
            <a href="mailto:info@kongruens.se" className={styles.email}>
              info@kongruens.se
            </a>
          </p>
          <p className={styles.hint}>Det första samtalet är kostnadsfritt.</p>
        </div>

        <div className={styles.col}>
          <h2 className={styles.colHead}>Följ oss</h2>
          <div className={styles.socials}>
            {socials.map((s) => {
              const Icon = iconMap[s.name as keyof typeof iconMap];
              return (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  target="_blank"
                  rel="noreferrer"
                >
                  {Icon ? <Icon /> : s.name}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.bottomInner}>
          <p>© Kongruens {year}</p>
          <p>
            Producerad av{" "}
            <a href="https://isakweb.se" target="_blank" rel="noreferrer">
              IsakWeb
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export function AboutSocials() {
  return (
    <div className={`${styles.socials} ${styles.socialsInk}`}>
      {aboutSocials.map((s) => {
        const Icon = iconMap[s.name as keyof typeof iconMap];
        return (
          <a key={s.name} href={s.href} aria-label={s.name} target="_blank" rel="noreferrer">
            {Icon ? <Icon /> : s.name}
          </a>
        );
      })}
    </div>
  );
}
