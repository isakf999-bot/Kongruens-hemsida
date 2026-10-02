import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/about-5", "/services", "/kontakt"];
  return paths.map((path) => ({
    url: `${siteUrl}${path || "/"}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
