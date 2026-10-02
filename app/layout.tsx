import type { Metadata } from "next";
import { Fraunces, Schibsted_Grotesk } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { siteDescription, siteUrl } from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
  preload: false,
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
        width: 1920,
        height: 1200,
        alt: "Hand som håller en glaskula vid en brygga i skymningen.",
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Header />
        <div id="innehall">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
