export const topics = [
  "Relationsproblem",
  "Ekonomisk vägledning",
  "Sparande i aktier och fonder",
  "Sorgbearbetning",
  "Personlig utveckling",
  "Etiska dilemman",
];

export type Service = {
  slug: string;
  title: string;
  blurb: string;
  meta: string;
  price: string;
  image: string;
  alt: string;
  href: string;
};

export const services: Service[] = [
  {
    slug: "kursmaterial",
    title: "Kursmaterial",
    blurb: "Ge dig struktur och möjlighet att skapa mål i alla livets områden.",
    meta: "1 hr",
    price: "4 950 kr",
    image: "/images/service-kursmaterial.jpg",
    alt: "Händer som skriver i en planerare.",
    href: "/booking-calendar/kursmaterial",
  },
  {
    slug: "personlig-vagledning",
    title: "Personlig vägledning",
    blurb: "Kursmaterial med personlig vägledare 10 samtal á 40 minuter",
    meta: "40 min",
    price: "120 kr",
    image: "/images/service-vagledning.jpg",
    alt: "Två personer som skakar hand.",
    href: "/booking-calendar/personlig-vägledning",
  },
  {
    slug: "kurs-i-grupp",
    title: "Kurs i grupp",
    blurb: "- Kursmaterial i personlig utveckling - 2 samtal á 40 min",
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
