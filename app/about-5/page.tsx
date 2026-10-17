import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { Compass, GraduationCap, MessageCircleQuestion, Quote } from "lucide-react";
import { Grain, Haze } from "@/components/Atmosphere";
import { FocusText } from "@/components/FocusText";
import { PathBeam } from "@/components/PathBeam";
import { Reveal } from "@/components/Reveal";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "Min historia — Kongruens",
  alternates: { canonical: "/about-5" },
};

export default function AboutPage() {
  return (
    <main>
      <section className={styles.hero}>
        <img
          src="/images/about-hero-1920.webp"
          srcSet="/images/about-hero-960.webp 960w, /images/about-hero-1920.webp 1920w"
          sizes="100vw"
          alt="Mats Svensson med ett barn utomhus framför en röd ekonomibyggnad."
          width={1920}
          height={1200}
          fetchPriority="high"
        />
      </section>

      <section className={styles.bio}>
        <div className={styles.shell}>
          <PathBeam className={styles.bioCopy}>
          <Reveal>
            <h1>
              <FocusText text="Min historia" />
            </h1>
            <p>
              Jag har varit gift tre gånger och gått igenom två skilsmässor. Nu gift med min kära fru
              sedan 20 år tillbaka. Med henne har jag fyra barn. Tre tonåringar och en tre-åring.
            </p>
            <p>
              Jag har en vuxen dotter och genom henne ett barnbarn. Två av mina barn har gått bort. En
              pojke i plötslig spädbarnsdöd när han var åtta månader och en flicka som avled i suicid
              när hon var 14 år.
            </p>
            <p>
              Jag är uppväxt med knappa omständigheter i en familj med 5 storasystrar. Mina föräldrar
              skildes när jag var 10 och jag bodde med min mamma i ett höghus getto i Landskrona där vi
              barn sprang ute på nätterna och levde rövare.
            </p>
            <p>
              Idag bor jag med min familj på en gård med hästar, hundar och katter och marsvin. Jag har
              byggt upp ett finansföretag från grunden till en omsättning på 15 miljoner kr per år och
              har en vision om att alla människor ska kunna ha det gott både inombords och ekonomiskt.
            </p>
            <p>
              Min levnadsbana har varit krokig och många gånger svår. På vägen har jag dock lärt mig
              mycket om livet, mig själv, människor och om livets olika processer.
            </p>
          </Reveal>
          </PathBeam>
          <Reveal
            className={`photo ${styles.portrait}`}
            delay={120}
            style={{ "--photo": "url(/images/mats-gard-shadow.webp)", "--photo-pos": "40% 46%" } as CSSProperties}
          >
            <img
              src="/images/mats-gard-1024.webp"
              srcSet="/images/mats-gard-660.webp 660w, /images/mats-gard-1024.webp 1024w"
              sizes="(max-width: 860px) calc(100vw - 2.5rem), 40vw"
              alt="Mats Svensson på gården med två hundar."
              width={1024}
              height={682}
              loading="lazy"
              decoding="async"
            />
          </Reveal>
        </div>
      </section>

      <section className={styles.quoteBand}>
        <Grain className={styles.quoteGrain} />
        <div className={styles.quoteBandInner}>
          <Reveal className={styles.quoteBlock}>
            <div className={styles.quoteLockup}>
              <figure className={`photo photo-on-dark ${styles.drawing}`}>
                <img
                  src="/images/kierkegaard-720.webp"
                  alt="Blyertsporträtt av Søren Kierkegaard."
                  width={720}
                  height={661}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              <div className={styles.quote}>
                <Quote className={styles.quoteMark} aria-hidden="true" strokeWidth={1} />
                <p>
                  &quot;Om jag vill lyckas med att föra en människa mot ett bestämt mål måste jag först
                  finna henne där hon är och börja just där. Den som inte kan det lurar sig själv när hon
                  tror att hon kan hjälpa andra. För att hjälpa någon måste jag visserligen förstå mer än
                  hon gör, men först och främst förstå det hon förstår.&quot;
                </p>
                <h3 className={styles.attribution}>Søren Kierkegaard</h3>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className={styles.replyBand}>
        <Haze />
        <div className={styles.reply}>
          <Reveal className={styles.replyLead}>
            <p>
              Jag tycker Kierkegaard uttrycker detta på ett bra sätt. I arbetet med samtal som grund
              vilar mitt förhållningssätt i tron på att individen har svaren inom sig. Experten på dig
              är du, inte jag. Min expertis är att sammanfatta och omformulera det centrala i det du
              uppfattar som problem för dig.Att spegla dig och dina tankar och göra dem tydliga för
              dig. Att gå nära och leda dig i rätt riktning.
            </p>
          </Reveal>
          <Reveal className={styles.replyPoints} delay={120}>
            <div className={styles.point}>
              <GraduationCap aria-hidden="true" strokeWidth={1.25} />
              <p>
              Jag är socionom sedan 1998 med bred erfarenhet av de mest skiftande arbetsuppgifter inom
              området.
              </p>
            </div>
            <div className={styles.point}>
              <Compass aria-hidden="true" strokeWidth={1.25} />
              <p>
              Min spetskompetens ligger dock i arbetet med att vägleda och handleda individer och
              grupper då min utbildning och mitt intresse är och har varit inom detta område. Därför
              har jag under tolv av mina verksamma år arbetat som handledare och kurator.
              </p>
            </div>
            <div className={styles.point}>
              <MessageCircleQuestion aria-hidden="true" strokeWidth={1.25} />
              <p>
              Med mig som vägledare kommer du alltså inte att få några svar som du inte redan har inom
              dig. Du kommer istället att få rätt frågor som leder till att du upptäcker dina egna
              svar vilket leder dina tankegångar på rätt spår.
              </p>
            </div>
            <Link href="/kontakt" className="btn">
              Kontakta mig
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
