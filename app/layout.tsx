import type { Metadata } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { serviceHref, services } from "@/lib/content";
import { siteDescription, siteUrl } from "@/lib/site";
import "./globals.css";

/*
 * Fraunces (SIL OFL, see fonts/Fraunces-OFL.txt), cut down for speed: SOFT and
 * WONK are fixed at the values the site uses, weight is limited to 300-400 and
 * the glyphs to Latin. Optical size stays variable for the large headings.
 * About half the bytes of the full Google version.
 */
const fraunces = localFont({
  src: [
    { path: "./fonts/fraunces-roman.woff2", weight: "300 400", style: "normal" },
    { path: "./fonts/fraunces-italic.woff2", weight: "300 400", style: "italic" },
  ],
  display: "swap",
  preload: false,
  fallback: ["Times New Roman", "serif"],
  variable: "--font-serif-face",
});

const grotesk = Schibsted_Grotesk({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-sans-face",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Din väg mot kongruens — Mats Svensson",
    template: "%s",
  },
  description: siteDescription,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Din väg mot kongruens — Mats Svensson",
    description: siteDescription,
    images: [
      {
        url: "/images/hero-home.jpg",
        width: 1600,
        height: 1000,
        alt: "Hand som håller en glaskula på en brygga vid en sjö omgiven av berg.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Din väg mot kongruens — Mats Svensson",
    description: siteDescription,
    images: ["/images/hero-home.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "Kongruens",
      url: siteUrl,
      description: siteDescription,
    },
    {
      "@type": "ProfessionalService",
      name: "Kongruens — Mats Svensson",
      url: siteUrl,
      image: `${siteUrl}/images/logo.png`,
      telephone: "+46705536050",
      email: "info@kongruens.se",
      description: siteDescription,
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <body className={`${grotesk.className} ${fraunces.variable} ${grotesk.variable}`}>
        <a className="skip" href="#innehall">
          Hoppa till innehåll
        </a>
        <noscript>
          <style>{".reveal{opacity:1;transform:none;filter:none}"}</style>
        </noscript>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Header
          services={services.map((s) => ({
            slug: s.slug,
            title: s.title,
            meta: s.meta,
            price: s.price,
            image: s.thumb,
            href: serviceHref(s),
          }))}
        />
        <div id="innehall">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
