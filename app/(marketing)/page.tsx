import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { PackageGrid } from "@/components/PackageGrid";
import { FAQ } from "@/components/FAQ";
import { JsonLd } from "@/components/JsonLd";
import { faqPageSchema, serviceSchema } from "@/lib/schema";
import { buildFaq } from "@/lib/faq";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Garage Cleanout Orlando | The Garage Flip",
  description:
    "Same-week garage cleanouts in Orlando. Fixed quote in writing, free haul-away, donation receipts. Text (407) 735-6450 for fastest response.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const faq = buildFaq();
  return (
    <>
      <JsonLd data={faqPageSchema(faq)} />
      <JsonLd
        data={serviceSchema({
          serviceType: "Garage Cleanout",
          name: "Garage Cleanout & Organization — Orlando",
          description:
            "Cleanout and organization for Orlando garages. Fixed quote, same-week scheduling, donation receipts.",
        })}
      />
      <Hero />

      <section className="section" id="packages">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <span className="eyebrow">Three ways in</span>
            <h2>Start with a cleanout. Add what you need.</h2>
            <p className="lead" style={{ marginTop: 12, maxWidth: 640, marginInline: "auto" }}>
              Two SKUs we own end-to-end. A third coming in 2026 when we have the right partners under contract.
            </p>
          </div>
          <PackageGrid />
        </div>
      </section>

      <section className="section">
        <div className="container-narrow">
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <span className="eyebrow">FAQ</span>
            <h2>Common questions.</h2>
          </div>
          <FAQ items={faq} />
          <p style={{ textAlign: "center", marginTop: 32 }}>
            Still have questions? Text{" "}
            <a href={`sms:${BRAND.phoneSms}`} style={{ color: "var(--c-accent)", fontWeight: 700 }}>{BRAND.phone}</a>.
          </p>
        </div>
      </section>
    </>
  );
}
