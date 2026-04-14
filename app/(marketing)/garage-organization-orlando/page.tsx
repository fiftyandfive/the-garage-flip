import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqPageSchema, serviceSchema } from "@/lib/schema";
import { FAQ } from "@/components/FAQ";
import { InstantQuoteForm } from "@/components/InstantQuoteForm";
import { buildFaq } from "@/lib/faq";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Garage Organization Orlando | The Garage Flip",
  description:
    "Garage organization service in Orlando. Cleanout + zoning + overhead racks + wall systems + labeled bins. Fixed quote, walk-through handoff.",
  alternates: { canonical: "/garage-organization-orlando" },
};

export default function GarageOrganizationPage() {
  const faq = buildFaq();
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: BRAND.url },
          { name: "Garage Organization Orlando", url: `${BRAND.url}/garage-organization-orlando` },
        ])}
      />
      <JsonLd
        data={serviceSchema({
          serviceType: "Garage Organization",
          name: "Garage Organization — Orlando, FL",
          description:
            "Cleanout + organization that lasts: category zoning, overhead racks, wall systems, labeled bins, walk-through handoff.",
        })}
      />
      <JsonLd data={faqPageSchema(faq)} />

      <section style={{ background: "var(--c-dark)", color: "#fff", padding: "72px 0 48px" }}>
        <div className="container">
          <span className="eyebrow" style={{ color: "#F26B1F" }}>Orlando, FL</span>
          <h1 style={{ color: "#fff", maxWidth: 940 }}>
            Garage Organization that actually sticks.
          </h1>
          <p className="lead" style={{ color: "rgba(255,255,255,.78)", marginTop: 18, maxWidth: 660 }}>
            Cleanout + zoning + overhead racks + wall hooks + labeled bins. We hand off
            a system you can maintain — not just a tidy snapshot.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
            <Link href="/book?service=refresh" className="btn btn-primary">Get a free quote →</Link>
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
              <h2>What we install (and what we don&apos;t).</h2>
              <h3 style={{ marginTop: 24, fontSize: 18 }}>What we install</h3>
              <ul className="pkg-list" style={{ marginTop: 12 }}>
                <li>Overhead storage racks — provided OR client-supplied</li>
                <li>Wall-mounted shelving and hook systems</li>
                <li>Labeled bins with category zoning (tools, sports, seasonal, kids)</li>
                <li>Workbench placement and zone walk-through</li>
                <li>Donation + recycle haul-away of everything that isn&apos;t staying</li>
              </ul>
              <h3 style={{ marginTop: 28, fontSize: 18 }}>What we don&apos;t do (today)</h3>
              <p style={{ marginTop: 8 }}>
                Floor coatings, custom cabinetry, climate, and electrical are out of scope at
                launch — see <Link href="/#packages" style={{ color: "var(--c-accent)", fontWeight: 600 }}>The Retreat</Link>{" "}
                (coming 2026) for the full transformation tier. We&apos;re happy to refer you
                to a local Orlando pro in the meantime — you book and pay them directly.
              </p>

              <h3 style={{ marginTop: 36 }}>Pricing — The Refresh</h3>
              <ul className="pkg-list" style={{ marginTop: 16 }}>
                <li><strong>1-car:</strong> from $1,200</li>
                <li><strong>2-car:</strong> from $1,500</li>
                <li><strong>3-car:</strong> from $1,800</li>
              </ul>
              <p style={{ marginTop: 12, color: "var(--c-text-muted)", fontSize: 14 }}>
                Just need a haul, not the system?{" "}
                <Link href="/garage-cleanout-orlando" style={{ color: "var(--c-accent)", fontWeight: 600 }}>The Reset starts at $600</Link>.
              </p>
            </div>

            <div>
              <div className="card" style={{ position: "sticky", top: 100 }}>
                <h3 style={{ marginBottom: 6 }}>Free organization quote</h3>
                <p className="muted" style={{ fontSize: 14, marginBottom: 14 }}>
                  Lucas replies within 12 hours.
                </p>
                <InstantQuoteForm compact source="garage-organization-orlando" defaultService="refresh" />
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
