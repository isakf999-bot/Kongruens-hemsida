import {
  IconFacebook,
  IconInstagram,
  IconLinkedin,
  IconTwitter,
  IconYoutube,
} from "@/components/icons";
import { ContactForm } from "./ContactForm";
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
  return (
    <footer id="kontakt" className={styles.footer}>
      <div className={styles.grid}>
        <div className={styles.info}>
          <h2>Kontakt</h2>
          <p>
            <a href="tel:+46705536050">Tel: 0705-536050</a>
          </p>
          <p>
            <a href="mailto:info@kongruens.se">info@kongruens.se</a>
          </p>
          <div className={styles.socials}>
            {socials.map((s) => {
              const Icon = iconMap[s.name as keyof typeof iconMap];
              return (
                <a key={s.name} href={s.href} aria-label={s.name} target="_blank" rel="noreferrer">
                  {Icon ? <Icon /> : s.name}
                </a>
              );
            })}
          </div>
        </div>
        <ContactForm />
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
