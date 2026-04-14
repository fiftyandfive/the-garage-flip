import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, serviceSchema, faqPageSchema } from "@/lib/schema";
import { buildFaq } from "@/lib/faq";
import { FAQ } from "@/components/FAQ";
import { InstantQuoteForm } from "@/components/InstantQuoteForm";
import { NEIGHBORHOODS } from "@/lib/neighborhoods";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Garage Cleanout Orlando — From $600 | The Garage Flip",
  description:
    "Professional garage cleanout service in Orlando. 1-car to oversized. Same-week scheduling. Fixed quote, no surprises. Get a free quote in 60 seconds.",
  alternates: { canonical: "/garage-cleanout-orlando" },
};

export default function GarageCleanoutOrlando() {
  const faq = buildFaq();
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: BRAND.url },
          { name: "Garage Cleanout Orlando", url: `${BRAND.url}/garage-cleanout-orlando` },
        ])}
      />
      <JsonLd
        data={serviceSchema({
          serviceType: "Garage Cleanout",
          name: "Garage Cleanout — Orlando, FL",
          description:
            "Full-service garage cleanout in Orlando. Sort, donate, recycle, haul. Fixed quote, donation receipts.",
        })}
      />
      <JsonLd data={faqPageSchema(faq)} />

      <section style={{ background: "var(--c-dark)", color: "#fff", padding: "72px 0 48px" }}>
        <div className="container">
          <span className="eyebrow" style={{ color: "#F26B1F" }}>Orlando, FL</span>
          <h1 style={{ color: "#fff", maxWidth: 900 }}>Garage Cleanout in Orlando — from $600.</h1>
          <p className="lead" style={{ color: "rgba(255,255,255,.78)", marginTop: 18, maxWidth: 640 }}>
            1-car to oversized. Same-week scheduling. Fixed quote in writing before we start — and
            you&apos;ll know exactly where every item went.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
            <Link href="/book" className="btn btn-primary">Get a free quote →</Link>
            <a href={`tel:${BRAND.phoneTel}`} className="btn btn-dark-ghost" data-plausible-event="phone_click">
              📞 Call {BRAND.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-2">
            <div>
              <h2>Here&apos;s how an Orlando garage cleanout works with us.</h2>
              <ol style={{ listStyle: "none", padding: 0, marginTop: 24, display: "flex", flexDirection: "column", gap: 18 }}>
                <Step n={1} title="Free quote">
                  Text us a photo or book a walkthrough. You get a fixed price in writing — no day-of surprises.
                </Step>
                <Step n={2} title="We show up on time">
                  Usually same week. For urgent pre-listing or estate jobs, we can often be onsite within 48 hours.
                </Step>
                <Step n={3} title="Sort, donate, recycle, haul">
                  Reusable items go to Orlando Rescue Mission, Habitat ReStore, and Mustard Seed.
                  Metal and electronics are recycled. Only what&apos;s left goes to the transfer station.
                </Step>
                <Step n={4} title="You get receipts">
                  Donation slips, recycling center names, landfill tickets. You&apos;ll know exactly where
                  everything went.
                </Step>
                <Step n={5} title="Sweep + walk-through">
                  Basic wipe-down and a final walk-through before we leave. Payment on completion — deposit never required.
                </Step>
              </ol>

              <div style={{ marginTop: 40 }}>
                <h3>Pricing at a glance</h3>
                <ul className="pkg-list" style={{ marginTop: 16 }}>
                  <li><strong>1-car:</strong> from $600</li>
                  <li><strong>2-car:</strong> from $800</li>
                  <li><strong>3-car:</strong> from $1,000</li>
                  <li><strong>Oversized / commercial:</strong> quoted on site</li>
                </ul>
                <p style={{ marginTop: 12, color: "var(--c-text-muted)", fontSize: 14 }}>
                  Want organization baked in? <Link href="/pricing" style={{ color: "var(--c-accent)", fontWeight: 600 }}>See The Refresh package</Link>.
                </p>
              </div>

              <div style={{ marginTop: 40 }}>
                <h3>Neighborhoods we serve</h3>
                <ul style={{ listStyle: "none", padding: 0, marginTop: 14, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 8 }}>
                  {NEIGHBORHOODS.map((n) => (
                    <li key={n.slug}>
                      <Link href={`/garage-cleanout-${n.slug}`} style={{ color: "var(--c-text)", textDecoration: "underline", textUnderlineOffset: 3 }}>
                        {n.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <div className="card" style={{ position: "sticky", top: 100 }}>
                <h3 style={{ marginBottom: 6 }}>Free quote in 60 seconds</h3>
                <p className="muted" style={{ fontSize: 14, marginBottom: 14 }}>
                  Lucas replies within 12 hours. No call center.
                </p>
                <InstantQuoteForm compact source="garage-cleanout-orlando" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--c-band)" }}>
        <div className="container-narrow">
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <span className="eyebrow">FAQ</span>
            <h2>Orlando garage cleanout questions.</h2>
          </div>
          <FAQ items={faq} />
        </div>
      </section>
    </>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <li style={{ display: "flex", gap: 16 }}>
      <span style={{
        flex: "0 0 auto", width: 34, height: 34, borderRadius: 999,
        background: "var(--c-accent)", color: "#fff",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontWeight: 700, fontFamily: "var(--font-display)",
      }}>{n}</span>
      <div>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18 }}>{title}</div>
        <div style={{ color: "var(--c-text-muted)", marginTop: 4 }}>{children}</div>
      </div>
    </li>
  );
}
