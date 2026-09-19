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
  meta: string;
  price: string;
  image: string;
  alt: string;
  href: string;
};

export const services: Service[] = [
  {
    slug: "kursmaterial",
    title: "Paradigmskiftet",
    paragraphs: [
      "Jag kan hjälpa dig att skapa struktur, riktning och tydliga mål i livets olika områden.",
      "I våra samtal använder jag bland annat materialet Paradigmskiftet – En resa till dig själv. Det fokuserar på självkännedom, ansvar, egna reaktioner och mönster, kommunikation, relationer och verklig inre förändring.",
      "Tanken är att du ska få syn på hur du själv fungerar, varför du reagerar som du gör, vilka mönster som håller dig tillbaka och vad du faktiskt vill förändra.",
      "Målet är att du ska kunna bryta gamla mönster, ta större ansvar för ditt eget liv, kommunicera bättre, skapa tydligare riktning och leva mer medvetet utifrån det som är viktigt för dig.",
    ],
    meta: "1 hr",
    price: "4 950 kr",
    image: "/images/service-kursmaterial.jpg",
    alt: "Händer som skriver i en planerare.",
    href: "/booking-calendar/kursmaterial",
  },
  {
    slug: "personlig-vagledning",
    title: "Personlig vägledning",
    paragraphs: [
      "När du känner att du har fastnat, står inför en förändring eller vill komma vidare i livet kan personlig vägledning hjälpa dig att skapa klarhet.",
      "Vi utgår från dig, din situation och det du vill förändra. Tillsammans tittar vi på dina tankemönster, val, hinder och möjligheter för att tydliggöra vad du faktiskt vill och hur du kan ta dig dit.",
      "Målet är inte att jag ska tala om för dig hur du ska leva, utan att hjälpa dig att se tydligare, förstå dig själv bättre och hitta en riktning som känns rätt för dig.",
    ],
    meta: "40 min",
    price: "120 kr",
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
      "I kursen ingår även två enskilda samtal med mig, där vi kan fördjupa det som är särskilt viktigt för just dig.",
    ],
    meta: "",
    price: "7 950 kr",
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
