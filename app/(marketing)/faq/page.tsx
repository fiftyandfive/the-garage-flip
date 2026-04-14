import type { Metadata } from "next";
import { FAQ } from "@/components/FAQ";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import { buildFaq } from "@/lib/faq";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "FAQ — Garage Cleanout Orlando | The Garage Flip",
  description:
    "Answers to common questions about garage cleanouts in Orlando: pricing, haul-away, donation receipts, scheduling, and scope.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  const faq = buildFaq();
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: BRAND.url },
          { name: "FAQ", url: `${BRAND.url}/faq` },
        ])}
      />
      <JsonLd data={faqPageSchema(faq)} />
      <section className="section">
        <div className="container-narrow">
          <span className="eyebrow">FAQ</span>
          <h1>Common questions.</h1>
          <p className="lead" style={{ marginTop: 12 }}>
            Everything we hear most often. Something missing?{" "}
            <a href={`sms:${BRAND.phoneSms}`} style={{ color: "var(--c-accent)", fontWeight: 700 }}>
              Text {BRAND.phone}
            </a>
            .
          </p>
          <div style={{ marginTop: 24 }}>
            <FAQ items={faq} />
          </div>
        </div>
      </section>
    </>
  );
}
