import { BRAND } from "./brand";
import { NEIGHBORHOODS } from "./neighborhoods";

export const BUSINESS_ID = `${BRAND.url}/#business`;

// LocalBusiness — lives in root layout. NO aggregateRating, NO review (zero reviews yet).
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": BUSINESS_ID,
    name: BRAND.name,
    image: `${BRAND.url}/logo.png`,
    logo: `${BRAND.url}/logo.png`,
    url: BRAND.url,
    telephone: BRAND.phoneTel,
    email: BRAND.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Orlando",
      addressRegion: "FL",
      addressCountry: "US",
    },
    areaServed: [
      { "@type": "City", name: "Orlando" },
      ...NEIGHBORHOODS.map((n) => ({ "@type": "City", name: n.name })),
    ],
    priceRange: "$$",
    openingHours: "Mo-Sa 08:00-18:00",
    sameAs: [],
  };
}

export function serviceSchema(opts: {
  serviceType: string;
  name: string;
  description: string;
  areaName?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    provider: { "@id": BUSINESS_ID },
    serviceType: opts.serviceType,
    name: opts.name,
    description: opts.description,
    areaServed: opts.areaName
      ? { "@type": "Place", name: `${opts.areaName}, Orlando, FL` }
      : { "@type": "AdministrativeArea", name: "Orange County, FL" },
  };
}

export function faqPageSchema(qa: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: qa.map((x) => ({
      "@type": "Question",
      name: x.q,
      acceptedAnswer: { "@type": "Answer", text: x.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((x, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: x.name,
      item: x.url,
    })),
  };
}
