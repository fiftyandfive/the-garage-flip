import type { MetadataRoute } from "next";
import { BRAND } from "@/lib/brand";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [
    { url: `${BRAND.url}/`, lastModified: now, priority: 1.0, changeFrequency: "weekly" },
    { url: `${BRAND.url}/garage-cleanout-orlando`, lastModified: now, priority: 0.9, changeFrequency: "weekly" },
    { url: `${BRAND.url}/book`, lastModified: now, priority: 0.9, changeFrequency: "monthly" },
    { url: `${BRAND.url}/pricing`, lastModified: now, priority: 0.8, changeFrequency: "monthly" },
    { url: `${BRAND.url}/faq`, lastModified: now, priority: 0.6, changeFrequency: "monthly" },
  ];
  return entries;
}
