import type { MetadataRoute } from "next";
import { BRAND } from "@/lib/brand";
import { NEIGHBORHOODS } from "@/lib/neighborhoods";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [
    { url: `${BRAND.url}/`, lastModified: now, priority: 1.0, changeFrequency: "weekly" },
    { url: `${BRAND.url}/garage-cleanout-orlando`, lastModified: now, priority: 0.9, changeFrequency: "weekly" },
    { url: `${BRAND.url}/garage-organization-orlando`, lastModified: now, priority: 0.85, changeFrequency: "weekly" },
    { url: `${BRAND.url}/junk-removal-orlando`, lastModified: now, priority: 0.85, changeFrequency: "weekly" },
    { url: `${BRAND.url}/book`, lastModified: now, priority: 0.9, changeFrequency: "monthly" },
    { url: `${BRAND.url}/pricing`, lastModified: now, priority: 0.8, changeFrequency: "monthly" },
    { url: `${BRAND.url}/about`, lastModified: now, priority: 0.5, changeFrequency: "monthly" },
    { url: `${BRAND.url}/faq`, lastModified: now, priority: 0.6, changeFrequency: "monthly" },
    ...NEIGHBORHOODS.map((n) => ({
      url: `${BRAND.url}/garage-cleanout-${n.slug}`,
      lastModified: now,
      priority: 0.75,
      changeFrequency: "weekly" as const,
    })),
  ];
  return entries;
}
