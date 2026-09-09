import type { Metadata } from "next";
import { Fraunces, Schibsted_Grotesk } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
  variable: "--font-serif-face",
});

const grotesk = Schibsted_Grotesk({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-sans-face",
});

export const metadata: Metadata = {
  title: "Kongruens — Mats Svensson",
  description: "Personlig vägledare. Din väg mot kongruens startar här.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <body className={`${grotesk.className} ${fraunces.variable} ${grotesk.variable}`}>
        <a className="skip" href="#innehall">
          Hoppa till innehåll
        </a>
        <Header />
        <div id="innehall">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
