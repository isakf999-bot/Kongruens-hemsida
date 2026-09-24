export const topics = [
  "Relationsproblem",
  "Nedstämdhet och depression",
  "Psykiskt dåligt mående",
  "Grubblerier och oro",
  "Fobier och rädslor",
  "Sorg och förlust",
  "Personlig utveckling",
  "Etiska dilemman och svåra beslut",
  "Ekonomisk vägledning",
  "Sparande i aktier och fonder",
  "Vägledning för arbetssökande",
  "CV och personligt brev",
  "Förberedelse inför anställningsintervju",
  "Karriärval och förändring i arbetslivet",
];

export type Service = {
  slug: string;
  title: string;
  paragraphs: string[];
  listLead?: string;
  points?: string[];
  meta: string;
  price: string;
  image: string;
  alt: string;
  href: string;
};

export const services: Service[] = [
  {
    slug: "kursmaterial",
    title: "Paradigmskiftet – En resa till dig själv",
    paragraphs: [
      "En kurs för dig som vill förstå dig själv bättre och skapa verklig förändring i ditt liv.",
      "Kursen består av 14 filmmoduler med kunskap, reflektionsfrågor och praktiska övningar. Du arbetar med materialet i din egen takt och får dessutom personlig handledning vid två tillfällen, där vi tillsammans kan fördjupa det som väcks under kursen och koppla det till din egen situation.",
      "Målet är inte bara att förstå mer om dig själv, utan att omsätta insikterna i konkreta förändringar i vardagen.",
    ],
    listLead: "Du får arbeta konkret med:",
    points: [
      "dina värderingar och vad som faktiskt är viktigt för dig",
      "mål och riktning i olika delar av livet",
      "återkommande tanke-, känslo- och beteendemönster",
      "hur du reagerar i olika situationer och varför",
      "ansvar, val och möjligheten att påverka ditt eget liv",
      "kommunikation och relationer",
      "vad som håller dig tillbaka och hur du kan börja förändra det",
    ],
    meta: "",
    price: "3 900 kr",
    image: "/images/service-kursmaterial.jpg",
    alt: "Händer som skriver i en planerare.",
    href: "/booking-calendar/kursmaterial",
  },
  {
    slug: "personlig-vagledning",
    title: "Personlig vägledning",
    paragraphs: [
      "När du känner att du har fastnat, står inför en förändring eller vill komma vidare i livet kan personlig vägledning hjälpa dig att skapa klarhet och riktning.",
      "Vi utgår från dig, din situation och det du vill förändra. Tillsammans tittar vi på dina tankar, reaktioner, återkommande mönster, val, hinder och möjligheter för att tydliggöra vad du faktiskt vill och vilka steg du kan ta för att komma vidare.",
      "Samtalen kan handla om exempelvis relationer, livsval, personlig utveckling, arbete, ekonomi, sorg, oro eller andra situationer där du behöver någon att resonera med.",
      "Samtalen är enskilda och sker digitalt via videosamtal eller via mobiltelefon, beroende på vad som passar dig bäst.",
      "Målet är inte att jag ska tala om för dig hur du ska leva, utan att hjälpa dig att se tydligare, förstå dig själv bättre och hitta en riktning som känns rätt för dig.",
    ],
    meta: "50 minuter",
    price: "900 kr",
    image: "/images/service-vagledning.jpg",
    alt: "Två personer som skakar hand.",
    href: "/booking-calendar/personlig-vägledning",
  },
  {
    slug: "kurs-i-grupp",
    title: "Paradigmskiftet i grupp",
    paragraphs: [
      "En gruppkurs för dig som vill stanna upp, reflektera och skapa en tydligare riktning i livet.",
      "Vi arbetar med frågor kring dina värderingar, mål, val, relationer och de mönster som påverkar hur du lever idag. Du får möjlighet att både arbeta med materialet själv och dela erfarenheter och perspektiv tillsammans med andra.",
      "Kursen omfattar fem gruppträffar där vi går igenom materialet, diskuterar olika teman och arbetar med konkreta övningar och reflektionsfrågor.",
      "I kursen ingår även två enskilda samtal med mig, där vi kan fördjupa det som är särskilt viktigt för just dig och koppla kursens innehåll till din egen situation.",
    ],
    meta: "",
    price: "4 950 kr",
    image: "/images/service-grupp.jpg",
    alt: "Grupp som sitter i en samtalsring.",
    href: "/booking-calendar/kurs-i-grupp",
  },
];

export const socials = [
  { name: "Facebook", href: "http://www.facebook.com/wix", icon: "/icons/facebook.png" },
  { name: "Twitter", href: "http://www.twitter.com/wix", icon: "/icons/twitter.png" },
  { name: "Instagram", href: "https://instagram.com/wix/", icon: "/icons/instagram.png" },
  { name: "YouTube", href: "https://www.youtube.com/user/Wix", icon: "/icons/youtube.png" },
];

export const aboutSocials = [
  { name: "Facebook", href: "http://www.facebook.com/wix", icon: "/icons/facebook.png" },
  { name: "Twitter", href: "http://www.twitter.com/wix", icon: "/icons/twitter.png" },
  { name: "LinkedIn", href: "https://www.linkedin.com/", icon: "/icons/linkedin.png" },
  { name: "Instagram", href: "https://instagram.com/wix/", icon: "/icons/instagram.png" },
];
