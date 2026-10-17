import Link from "next/link";
import { Phone } from "lucide-react";
import { IconFacebook } from "@/components/icons";
import { BrandLogo } from "@/components/BrandLogo";
import { aboutSocials, socials } from "@/lib/content";
import styles from "./Footer.module.css";

// Skool's mark is its "sk" lettering; drawn in one colour here so it sits with the other icons.
function IconSkool() {
  return (
    <span aria-hidden="true" className={styles.skool}>
      sk
    </span>
  );
}

const iconMap = {
  Facebook: IconFacebook,
  Skool: IconSkool,
};

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Link href="/" className={styles.mark}>
            <BrandLogo className={styles.logo} onDark loading="lazy" />
          </Link>
          <p className={styles.blurb}>
            Personlig vägledning som ett mer tillgängligt alternativ. Någon att resonera med kring
            livet, relationer, arbete och de beslut som betyder mest.
          </p>
        </div>

        <div className={styles.col}>
          <h2 className={styles.colHead}>Kontakt</h2>
          <p>
            <a href="tel:+46705536050" className={styles.contact}>
              <Phone aria-hidden="true" strokeWidth={1.5} />
              Tel: 0705-536050
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
                  title={s.name}
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
