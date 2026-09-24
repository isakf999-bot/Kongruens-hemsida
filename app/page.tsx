import Link from "next/link";
import { HeroMedia } from "@/components/HeroMedia";
import { Reveal } from "@/components/Reveal";
import { ServiceCard } from "@/components/ServiceCard";
import { services, topics } from "@/lib/content";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <main>
      <section className={styles.hero}>
        <HeroMedia />
        <div className={styles.heroCopy}>
          <h1>
            <span className={styles.kicker}>DIN VÄG MOT</span>
            <span className={styles.title}>KONGRUENS</span>
            <span className={styles.kicker}>STARTAR HÄR</span>
          </h1>
        </div>
      </section>

      <div className={styles.homeStack}>
      <section className={styles.intro}>
        <div className={styles.introInner}>
          <Reveal className={styles.introBody} delay={80}>
            <p className={styles.lead}>
              Ja, det ena utesluter såklart inte det andra men det är ju vanligt att man har en PT för
              den fysiska träningen emedan man låter den inre träningen stå tillbaka. Ska man vara
              ärlig blir ingen människa genuint lycklig genom att fokusera på det yttre. Det är en
              viktig del för att vi ska må fysiskt väl men en kombination av yttre och inre fokus
              kommer att ge dig harmoni och större förmåga att leva ditt ditt liv med full potential.
            </p>
            <p className={styles.emphasis}>
              Med mig som PV – Personlig Vägledare – får du någon att tänka högt tillsammans med.
            </p>
            <p>
              Många drar sig för att kontakta psykolog eller terapeut. Det kan kännas stort, dyrt och
              för vissa fortfarande förknippat med att något måste vara fel. Det kan i sig bli ett
              hinder för att söka stöd.
            </p>
            <p>
              Mitt PV-koncept är tänkt som ett mer tillgängligt och avslappnat alternativ för dig som
              vill ha någon att resonera med kring livet, relationer, arbete, beslut eller andra
              frågor som dyker upp längs vägen.
            </p>
            <p>
              Tanken är enkel: att ha en person du kan vända dig till när du behöver sortera tankar,
              få nya perspektiv eller komma vidare i en fråga.
            </p>
            <p>
              En egen PV – Personlig Vägledare – som finns där som ett kontinuerligt stöd.
            </p>
          </Reveal>
          <div className={styles.introLockup}>
            <Reveal className={styles.introHead}>
              <h2>
                Alla borde
                <span className={styles.titleBreak}>ha en PV</span>
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
              <Reveal className={styles.session} delay={160}>
                <img
                  src="/images/mats-gard.jpg"
                  alt="Mats Svensson på gården med två hundar."
                  width={800}
                  height={1000}
                />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.topics} aria-labelledby="stod-rubrik">
        <div className={styles.topicsInner}>
          <Reveal className={styles.topicsIntro}>
            <h2 id="stod-rubrik">Jag kan vara ett stöd inom bland annat:</h2>
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
                  <span aria-hidden="true">→</span>
                  {t}
                </li>
              ))}
            </ul>
            <ul>
              {topics.slice(8).map((t) => (
                <li key={t}>
                  <span aria-hidden="true">→</span>
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
              <h2>Om mig</h2>
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
              <Link href="/about-5" className="btn">
                Läs mer
              </Link>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <figure className={styles.portrait}>
              <img
                src="/images/mats-gard.jpg"
                alt="Mats Svensson på gården med två hundar."
                width={720}
                height={985}
              />
            </figure>
          </Reveal>
        </div>
      </section>

      <section className={styles.help}>
        <div className={styles.helpInner}>
          <Reveal>
            <h2>Hur jag kan hjälpa dig</h2>
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
