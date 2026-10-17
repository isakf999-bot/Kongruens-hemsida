import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Haze } from "@/components/Atmosphere";
import { CtaBand } from "@/components/CtaBand";
import { ServiceDetail } from "@/components/ServiceDetail";
import { services } from "@/lib/content";
import styles from "../service-page.module.css";

const service = services.find((s) => s.page === "/personlig-vagledning");

export const metadata: Metadata = {
  title: "Personlig vägledning — Kongruens",
  description: service?.paragraphs[0],
  alternates: { canonical: "/personlig-vagledning" },
};

export default function PersonligVagledningPage() {
  if (!service) notFound();
  return (
    <main className={styles.page}>
      <div className={styles.single}>
        <Haze />
        <ServiceDetail service={service} heading="h1" />
      </div>
      <CtaBand subject={service.title} />
    </main>
  );
}
