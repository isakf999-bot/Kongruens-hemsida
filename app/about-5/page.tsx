import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "Om mig — Kongruens",
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
            <h1>Om mig</h1>
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
              investeringar. Det gör att jag kan erbjuda vägledning både i personliga frågor och i mer
              praktiska frågor kring arbete, ekonomi och framtidsplanering.
            </p>
            <p>
              Min utgångspunkt är enkel: människor behöver inte alltid terapi. Ibland behöver man någon
              med erfarenhet, kunskap och perspektiv att resonera med för att komma vidare.
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

      <section className={styles.method}>
        <div className={styles.methodColumn}>
          <Reveal className={styles.quoteLockup}>
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
              <h3>Søren Kierkegaard</h3>
            </div>
          </Reveal>
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
        </div>
      </section>
    </main>
  );
}
