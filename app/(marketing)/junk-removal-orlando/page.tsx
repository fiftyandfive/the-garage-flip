import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqPageSchema, serviceSchema } from "@/lib/schema";
import { FAQ } from "@/components/FAQ";
import { InstantQuoteForm } from "@/components/InstantQuoteForm";
import { buildFaq } from "@/lib/faq";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Garage Junk Removal Orlando | The Garage Flip",
  description:
    "Specialized garage junk removal across Orlando. Full haul, sort, donate, recycle. Transparent pricing. Get a free quote today.",
  alternates: { canonical: "/junk-removal-orlando" },
};

export default function JunkRemovalPage() {
  const faq = buildFaq();
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: BRAND.url },
          { name: "Junk Removal Orlando", url: `${BRAND.url}/junk-removal-orlando` },
        ])}
      />
      <JsonLd
        data={serviceSchema({
          serviceType: "Junk Removal",
          name: "Garage Junk Removal — Orlando, FL",
          description:
            "Specialized garage junk removal in Orlando: full haul, sort, donate, recycle. Fixed quote, donation receipts.",
        })}
      />
      <JsonLd data={faqPageSchema(faq)} />

      <section style={{ background: "var(--c-dark)", color: "#fff", padding: "72px 0 48px" }}>
        <div className="container">
          <span className="eyebrow" style={{ color: "#F26B1F" }}>Orlando, FL</span>
          <h1 style={{ color: "#fff", maxWidth: 900 }}>Garage Junk Removal in Orlando.</h1>
          <p className="lead" style={{ color: "rgba(255,255,255,.78)", marginTop: 18, maxWidth: 660 }}>
            We&apos;re garage specialists, not generalists. Decades of accumulated stuff,
            estate cleanouts, pre-listing hauls — we sort, donate, recycle, and haul. You
            get receipts for every drop-off.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
            <Link href="/book" className="btn btn-primary">Get a free quote →</Link>
            <a href={`tel:${BRAND.phoneTel}`} className="btn btn-dark-ghost" data-plausible-event="phone_click">
              📞 {BRAND.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-2">
            <div>
              <h2>What sets garage junk removal apart.</h2>
              <p className="lead" style={{ marginTop: 12 }}>
                Generalist haulers throw it all in the truck and bill by volume. We sort first.
              </p>
              <ul className="pkg-list" style={{ marginTop: 24 }}>
                <li><strong>Donation-first triage</strong> — Orlando Rescue Mission, Habitat ReStore, Mustard Seed</li>
                <li><strong>Metal &amp; electronics recycled</strong> separately, every job</li>
                <li><strong>Receipts for every drop-off</strong> — donation slips, recycling addresses, landfill tickets</li>
                <li><strong>Fixed quote in writing</strong> — never billed by surprise</li>
                <li><strong>Same-week scheduling</strong> across Orange County</li>
              </ul>

              <h3 style={{ marginTop: 36 }}>Pricing</h3>
              <ul className="pkg-list" style={{ marginTop: 16 }}>
                <li><strong>1-car garage haul:</strong> from $600</li>
                <li><strong>2-car garage haul:</strong> from $800</li>
                <li><strong>3-car garage haul:</strong> from $1,000</li>
                <li><strong>Single-item / partial loads:</strong> ask — we quote fairly</li>
              </ul>
              <p style={{ marginTop: 12, color: "var(--c-text-muted)", fontSize: 14 }}>
                Need organization installed too? <Link href="/pricing" style={{ color: "var(--c-accent)", fontWeight: 600 }}>The Refresh package</Link>{" "}
                bundles cleanout + zoning + racks.
              </p>
            </div>

            <div>
              <div className="card" style={{ position: "sticky", top: 100 }}>
                <h3 style={{ marginBottom: 6 }}>Free haul quote</h3>
                <p className="muted" style={{ fontSize: 14, marginBottom: 14 }}>
                  Lucas replies within 12 hours.
                </p>
                <InstantQuoteForm compact source="junk-removal-orlando" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--c-band)" }}>
        <div className="container-narrow">
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <span className="eyebrow">FAQ</span>
            <h2>Common questions.</h2>
          </div>
          <FAQ items={faq} />
        </div>
      </section>
    </>
  );
}
