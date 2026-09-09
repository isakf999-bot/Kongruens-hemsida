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
          <div className={styles.heroActions}>
            <Link href="/services" className="btn btn-on-dark">
              BOKA NU
            </Link>
            <Link href="/#om" className={styles.ghost}>
              OM
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.intro}>
        <div className={styles.introInner}>
          <div className={styles.introLockup}>
            <Reveal className={styles.introHead}>
              <h2>
                Alla borde
                <span className={styles.titleBreak}>ha en PV.</span>
              </h2>
            </Reveal>
            <Reveal className={styles.close} delay={120}>
              <div className={styles.closeCopy}>
                <p>Samtal på Zoom, Teams eller mobil?</p>
                <p>Du bestämmer!</p>
              </div>
              <Link href="/services" className="btn">
                Boka nu
              </Link>
            </Reveal>
          </div>
          <Reveal className={styles.introBody} delay={80}>
            <p className={styles.lead}>
              Ja, det ena utesluter såklart inte det andra men det är ju vanligt att man har en PT för
              den fysiska träningen emedan man låter den inre träningen stå tillbaka. Ska man vara
              ärlig blir ingen människa genuint lycklig genom att fokusera på det yttre. Det är en
              viktig del för att vi ska må fysiskt väl men en kombination av yttre och inre fokus
              kommer att ge dig harmoni och större förmåga att leva ditt ditt liv med full potential.
            </p>
            <p className={styles.emphasis}>
              Med mig som PV (Personlig Vägledare) kan du uppnå din fulla potential!
            </p>
            <p>
              Många drar sig för att gå till en psykolog eller terapeut. Det är dyrt och för många är
              det fortfarande förknippat med psykisk sjukdom. Det i sig utgör ett hinder. Med mitt
              PV-koncept erbjuds du ett billigt och mer avslappnat alternativ som inte är på bekostnad
              av kvalité. Tänk att ha någon du kan ringa och dryfta olika frågeställningar med när
              helst du behöver det, din alldeles egna PV.
            </p>
            <div className={styles.topicBlock}>
              <p>Livet ger oss alla olika utmaningar. I följande ämnen kan jag vara ett stöd för dig.</p>
              <ul>
                {topics.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
            <p className={styles.free}>
              Första samtalet är kostnadsfritt då vi tillsammans ringar in dina frågeställningar och
              kommer överens om hur vi ska gå vidare.
            </p>
          </Reveal>
        </div>
      </section>

      <section id="om" className={styles.about}>
        <div className={styles.aboutInner}>
          <Reveal>
            <div className={styles.aboutCopy}>
              <h2>Om mig</h2>
              <p>
                Jag är en 55 - årig sjubarnspappa. Gift tre gånger och gått igenom två skilsmässor. Nu
                gift med min kära fru sedan 20 år tillbaka. Med henne har jag fyra barn. Tre
                tonåringar och en tre-åring.
              </p>
              <p>
                Jag har en vuxen dotter och genom henne ett barnbarn. Två av mina barn har gått bort.
                En pojke i plötslig spädbarnsdöd när han var åtta månader och en flicka som avled i
                suicid när hon var 14 år.
              </p>
              <p>
                Jag är uppväxt med knappa omständigheter i en familj med 5 storasystrar. Mina
                föräldrar skildes när jag var 10 och jag bodde med min mamma i ett höghus getto i
                Landskrona där vi barn sprang ute på nätterna och levde rövare.
              </p>
              <p>
                Idag bor jag med min familj på en gård med hästar, hundar och katter och marsvin. Jag
                har byggt upp ett finansföretag från grunden till en omsättning på 15 miljoner kr per
                år och har en vision om att alla människor ska kunna ha det gott både inombords och
                ekonomiskt.
              </p>
              <p>
                Min levnadsbana har varit krokig och många gånger svår. På vägen har jag dock lärt
                mig mycket om livet, mig själv, människor och om livets olika processer.
              </p>
              <Link href="/about-5" className="btn">
                Läs mer
              </Link>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <figure className={styles.portrait}>
              <img
                src="/images/portrait.jpg"
                alt="Mats Svensson utomhus i mörk skjorta, framför grönska."
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
                <ServiceCard service={s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
