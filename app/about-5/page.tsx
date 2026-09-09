import { AboutSocials } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import styles from "./about.module.css";

export default function AboutPage() {
  return (
    <main>
      <section className={styles.hero}>
        <img
          src="/images/about-hero.jpg"
          alt="Mats Svensson med ett barn utomhus framför en röd ekonomibyggnad."
        />
        <div className={styles.heroBox}>
          <h1>Hej!</h1>
          <p>
            Mats heter jag, en 55-årig sjubarnspappa. Jag bor på en gård strax utanför Helsingborg
            med min fru, fyra barn och många olika djur. Jag har 20 års erfarenhet som socionom och
            mitt hjärta har alltid slagit extra för det sociala arbetet, för människor och mjuka
            värden.
          </p>
          <AboutSocials />
        </div>
      </section>

      <section className={styles.story}>
        <Reveal className={styles.storyInner}>
          <h2>Min historia</h2>
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
            Idag bor jag med min familj på en gård med hästar, hundar och katter och marsvin. Jag
            har byggt upp ett finansföretag från grunden till en omsättning på 15 miljoner kr per år
            och har en vision om att alla människor ska kunna ha det gott både inombords och
            ekonomiskt.
          </p>
          <p>
            Min levnadsbana har varit krokig och många gånger svår. På vägen har jag dock lärt mig
            mycket om livet, mig själv, människor och om livets olika processer.
          </p>
        </Reveal>
      </section>

      <section className={styles.quoteRow}>
        <img src="/images/kierkegaard.jpg" alt="Blyertsporträtt av Søren Kierkegaard." />
        <div className={styles.quote}>
          <p>
            &quot;Om jag vill lyckas med att föra en människa mot ett bestämt mål måste jag först
            finna henne där hon är och börja just där. Den som inte kan det lurar sig själv när hon
            tror att hon kan hjälpa andra. För att hjälpa någon måste jag visserligen förstå mer än
            hon gör, men först och främst förstå det hon förstår.&quot;
          </p>
          <h3>Søren Kierkegaard</h3>
        </div>
      </section>

      <section className={`${styles.story} ${styles.storyAlt}`}>
        <Reveal className={styles.storyInner}>
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
        </Reveal>
      </section>
    </main>
  );
}
