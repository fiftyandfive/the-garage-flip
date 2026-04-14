import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NEIGHBORHOODS, getNeighborhood } from "@/lib/neighborhoods";
import { NeighborhoodLanding } from "@/components/NeighborhoodLanding";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqPageSchema, serviceSchema } from "@/lib/schema";
import { buildFaq } from "@/lib/faq";
import { BRAND } from "@/lib/brand";

type Params = { neighborhood: string };

export function generateStaticParams(): Params[] {
  return NEIGHBORHOODS.map((n) => ({ neighborhood: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { neighborhood } = await params;
  const n = getNeighborhood(neighborhood);
  if (!n) return { title: "Not found" };
  return {
    title: `Garage Cleanout ${n.name} | The Garage Flip Orlando`,
    description: `Garage cleanout service in ${n.name}, Orlando. From $600. Same-week availability. Fixed quote and donation receipts. Text ${BRAND.phone}.`,
    alternates: { canonical: `/garage-cleanout-${n.slug}` },
  };
}

export default async function NeighborhoodPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { neighborhood } = await params;
  const n = getNeighborhood(neighborhood);
  if (!n) notFound();

  const url = `${BRAND.url}/garage-cleanout-${n.slug}`;
  const faq = buildFaq();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: BRAND.url },
          { name: "Garage Cleanout Orlando", url: `${BRAND.url}/garage-cleanout-orlando` },
          { name: n.name, url },
        ])}
      />
      <JsonLd
        data={serviceSchema({
          serviceType: "Garage Cleanout",
          name: `Garage Cleanout — ${n.name}, Orlando, FL`,
          description: `Cleanout and organization for ${n.name} (ZIP ${n.zips.join(", ")}). Fixed quote, donation receipts, same-week scheduling.`,
          areaName: n.name,
        })}
      />
      <JsonLd data={faqPageSchema(faq)} />
      <NeighborhoodLanding n={n} />
    </>
  );
}
