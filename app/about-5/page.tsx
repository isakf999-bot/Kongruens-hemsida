import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "Min historia — Kongruens",
};

export default function AboutPage() {
  return (
    <main>
      <section className={styles.hero}>
        <img
          src="/images/about-hero.jpg"
          alt="Mats Svensson med ett barn utomhus framför en röd ekonomibyggnad."
          width={1600}
          height={1067}
        />
      </section>

      <section className={styles.bio}>
        <div className={styles.shell}>
          <Reveal className={styles.bioCopy}>
            <h1>Min historia</h1>
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
          <Reveal className={styles.portrait} delay={120}>
            <img
              src="/images/portrait.jpg"
              alt="Mats Svensson utomhus i mörk skjorta, framför grönska."
              width={720}
              height={985}
            />
          </Reveal>
        </div>
      </section>

      <section className={styles.quoteBand}>
        <div className={styles.quoteBandInner}>
          <Reveal className={styles.quoteBlock}>
            <div className={styles.quoteLockup}>
              <figure className={styles.drawing}>
                <img
                  src="/images/kierkegaard.jpg"
                  alt="Blyertsporträtt av Søren Kierkegaard."
                  width={640}
                  height={800}
                />
              </figure>
              <div className={styles.quote}>
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
        <Reveal className={styles.reply} delay={80}>
            <p>
              Jag tycker Kierkegaard uttrycker detta på ett bra sätt. I arbetet med samtal som grund
              vilar mitt förhållningssätt i tron på att individen har svaren inom sig. Experten på dig
              är du, inte jag. Min expertis är att sammanfatta och omformulera det centrala i det du
              uppfattar som problem för dig.Att spegla dig och dina tankar och göra dem tydliga för
              dig. Att gå nära och leda dig i rätt riktning.
            </p>
            <p>
              Jag är socionom sedan 1998 med bred erfarenhet av de mest skiftande arbetsuppgifter inom
              området.
            </p>
            <p>
              Min spetskompetens ligger dock i arbetet med att vägleda och handleda individer och
              grupper då min utbildning och mitt intresse är och har varit inom detta område. Därför
              har jag under tolv av mina verksamma år arbetat som handledare och kurator.
            </p>
            <p>
              Med mig som vägledare kommer du alltså inte att få några svar som du inte redan har inom
              dig. Du kommer istället att få rätt frågor som leder till att du upptäcker dina egna
              svar vilket leder dina tankegångar på rätt spår.
            </p>
            <Link href="/services" className="btn">
              Boka nu
            </Link>
          </Reveal>
        </section>
    </main>
  );
}
