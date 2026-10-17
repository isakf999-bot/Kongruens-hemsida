import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Haze, Rings } from "@/components/Atmosphere";
import { FocusText } from "@/components/FocusText";
import { HeroMedia } from "@/components/HeroMedia";
import { Marker } from "@/components/Marker";
import { Reveal } from "@/components/Reveal";
import { ServiceCard } from "@/components/ServiceCard";
import { services, topics } from "@/lib/content";
import { siteDescription } from "@/lib/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Din väg mot kongruens — Mats Svensson",
  description: siteDescription,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <main>
      <section className={styles.hero}>
        <HeroMedia />
        <div className={styles.heroCopy}>
          <h1>
            <span className="srOnly">Din väg mot kongruens startar här</span>
            <span className={styles.kicker} aria-hidden="true">
              <FocusText now text="DIN VÄG MOT" delay={150} step={90} />
            </span>
            <span className={styles.title} aria-hidden="true">
              <FocusText now by="letters" text="KONGRUENS" delay={380} step={55} />
            </span>
            <span className={styles.kicker} aria-hidden="true">
              <FocusText now text="STARTAR HÄR" delay={950} step={90} />
            </span>
          </h1>
        </div>
      </section>

      <div className={styles.homeStack}>
      <section className={styles.intro}>
        <div className={styles.introInner}>
          <Reveal className={styles.introBody} delay={80}>
            <p className={styles.emphasis}>
              Är det något i livet som skaver – eller har du svårt att komma överens med dig själv?
            </p>
            <p>
              Kanske fungerar inte en relation som du vill. Kanske grubblar du över ett beslut, känner
              dig vilsen i arbete eller ekonomi, har svårt att sätta gränser eller undrar om du
              verkligen lever i linje med dina egna värderingar.
            </p>
            <p>
              Du behöver inte alltid terapi för att komma vidare. Ibland behöver du bara någon
              utomstående som hjälper dig att sortera tankarna, se nya perspektiv och hitta nästa steg.
            </p>
            <p className={styles.emphasis}>
              <Marker>Det är där jag kommer in.</Marker>
            </p>
            <p>
              Som din PV – Personliga Vägledare – får du någon att tänka högt tillsammans med när
              livet känns oklart, komplicerat eller när du behöver hjälp att hitta riktning.
            </p>
            <Link href="/kontakt" className="btn">
              Boka ett första kostnadsfritt samtal
              <ArrowRight aria-hidden="true" strokeWidth={1.75} />
            </Link>
          </Reveal>
          <div className={styles.introLockup}>
            <Rings className={styles.introRings} />
            <Reveal plain className={styles.introHead}>
              <h2>
                <FocusText text="Alla borde" />
                <span className={styles.titleBreak}>
                  <FocusText text="ha en PV" delay={170} />
                </span>
              </h2>
            </Reveal>
            <div className={styles.introMedia}>
              <Reveal className={styles.close} delay={120}>
                <div className={styles.closeCopy}>
                  <p>Samtal på Zoom, Teams eller mobil?</p>
                  <p>Du bestämmer!</p>
                </div>
                <Link href="/kontakt" className="btn">
                  Kontakta mig
                </Link>
              </Reveal>
              <Reveal
                className={`photo ${styles.session}`}
                delay={160}
                style={{ "--photo": "url(/images/mats-gard-shadow.webp)", "--photo-pos": "40% 46%" } as CSSProperties}
              >
                <img
                  src="/images/mats-gard-1024.webp"
                  srcSet="/images/mats-gard-660.webp 660w, /images/mats-gard-1024.webp 1024w"
                  sizes="(max-width: 900px) calc(100vw - 2.5rem), 40vw"
                  alt="Mats Svensson på gården med två hundar."
                  width={1024}
                  height={682}
                  loading="lazy"
                  decoding="async"
                />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.topics} aria-labelledby="stod-rubrik">
        <Haze />
        <div className={styles.topicsInner}>
          <Reveal plain className={styles.topicsIntro}>
            <h2 id="stod-rubrik">
              <FocusText text="Jag kan vara ett stöd inom bland annat:" step={55} />
            </h2>
            <p className={styles.topicLead}>
              Livet ställer oss alla inför olika utmaningar. I vissa perioder kan det vara
              värdefullt att ha någon utomstående att resonera med, få perspektiv av och sortera
              tankarna tillsammans med.
            </p>
          </Reveal>
          <Reveal className={styles.topicLists} delay={80}>
            <ul>
              {topics.slice(0, 8).map((t) => (
                <li key={t}>
                  <ArrowRight aria-hidden="true" strokeWidth={1.5} />
                  {t}
                </li>
              ))}
            </ul>
            <ul>
              {topics.slice(8).map((t) => (
                <li key={t}>
                  <ArrowRight aria-hidden="true" strokeWidth={1.5} />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
          <p className={styles.free}>
            Det första samtalet är kostnadsfritt. Då ringar vi tillsammans in vad du vill ha hjälp
            med och ser om mitt sätt att arbeta passar dig. Därefter kommer vi överens om hur vi går
            vidare.
          </p>
        </div>
      </section>

      <section id="om" className={styles.about}>
        <div className={styles.aboutInner}>
          <Reveal>
            <div className={styles.aboutCopy}>
              <h2>
                <FocusText text="Om mig" />
              </h2>
              <p>
                Jag är socionom sedan 1998 och har bred erfarenhet av många olika arbetsområden inom
                socialt arbete, bland annat som kurator, handledare, socialkonsulent,
                familjehemskonsulent och barnsekreterare.
              </p>
              <p>
                Min spetskompetens ligger i arbetet med att vägleda, stödja och handleda individer och
                grupper. Under omkring tolv år har jag arbetat särskilt med handledning, samtal och
                personlig utveckling, både individuellt och i grupp.
              </p>
              <p>
                Jag har även lång erfarenhet av att leda grupper och utvecklingsprocesser och har genom
                åren arbetat med många människor i olika livssituationer – kring relationer, sorg,
                arbete, förändring, personlig utveckling och svåra beslut.
              </p>
              <p>
                Jag vidareutbildar mig för närvarande inom psykoterapi och går en grundläggande
                psykoterapiutbildning med inriktning mot affektfokuserat och psykodynamiskt arbete.
              </p>
              <p>
                Parallellt har jag under många år arbetat med ekonomi, företagande, sparande och
                investeringar. Det gör att jag kan erbjuda vägledning både i personliga frågor och i
                mer praktiska frågor kring arbete, ekonomi och framtidsplanering.
              </p>
              <p>
                Min utgångspunkt är enkel: människor behöver inte alltid terapi. Ibland behöver man
                någon med erfarenhet, kunskap och perspektiv att resonera med för att komma vidare.
              </p>
              <Link href="/about-5" className="btn" aria-label="Läs mer om Mats Svensson">
                Läs mer
                <span className="srOnly"> om Mats Svensson</span>
              </Link>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <figure
              className={`photo ${styles.portrait}`}
              style={{ "--photo": "url(/images/mats-gard-shadow.webp)", "--photo-pos": "40% 46%" } as CSSProperties}
            >
              <img
                src="/images/mats-gard-1024.webp"
                srcSet="/images/mats-gard-660.webp 660w, /images/mats-gard-1024.webp 1024w"
                sizes="(max-width: 900px) min(100vw - 2.5rem, 26rem), 45vw"
                alt="Mats Svensson på gården med två hundar."
                width={1024}
                height={682}
                loading="lazy"
                decoding="async"
              />
            </figure>
          </Reveal>
        </div>
      </section>

      <section className={styles.help}>
        <Haze flip />
        <div className={styles.helpInner}>
          <Reveal plain>
            <h2>
              <FocusText text="Hur jag kan hjälpa dig" />
            </h2>
          </Reveal>
          <div className={styles.cards}>
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={i * 90}>
                  <ServiceCard service={s} preview />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      </div>
    </main>
  );
}
