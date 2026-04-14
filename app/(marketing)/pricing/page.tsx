import type { Metadata } from "next";
import Link from "next/link";
import { PackageGrid } from "@/components/PackageGrid";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Garage Cleanout Pricing in Orlando | The Garage Flip",
  description:
    "Transparent garage cleanout pricing for Orlando. The Reset from $600. The Refresh from $1,200. Fixed quote in writing, no day-of surprises.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: BRAND.url },
          { name: "Pricing", url: `${BRAND.url}/pricing` },
        ])}
      />
      <JsonLd
        data={serviceSchema({
          serviceType: "Garage Cleanout",
          name: "Garage Cleanout Pricing — Orlando",
          description: "Transparent tiered pricing for garage cleanout and organization in Orlando.",
        })}
      />

      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <span className="eyebrow">Pricing</span>
            <h1>Fixed quote. In writing. Every time.</h1>
            <p className="lead" style={{ marginTop: 12, maxWidth: 640, marginInline: "auto" }}>
              Two packages we own end-to-end. One coming 2026. You&apos;ll always see the full
              price before we start — no deposits, no day-of surprises.
            </p>
          </div>
          <PackageGrid />
        </div>
      </section>

      <section className="section" style={{ background: "var(--c-band)" }}>
        <div className="container-narrow">
          <h2>Example scopes & prices</h2>
          <div style={{ display: "grid", gap: 16, marginTop: 24 }}>
            <Example
              title="2-car garage, Winter Park bungalow — The Reset"
              price="$800"
              details="Decade of clutter, bikes, paint cans, old exercise gear. 6 hours onsite. Full haul, 3 donation drops, metal to recycler, 1 trailer to transfer station. Receipts emailed same-day."
            />
            <Example
              title="3-car garage, Lake Nona new build — The Refresh"
              price="$1,800"
              details="Clean cleanout + overhead rack install, category zoning, labeled bins, wall hook systems. 1.5 days onsite. Walk-through before handoff."
            />
            <Example
              title="1-car detached, College Park — The Reset"
              price="$600"
              details="Estate cleanout for an out-of-state executor. Photos before/after, donation slips emailed. 4 hours onsite."
            />
          </div>

          <div className="card" style={{ marginTop: 32, background: "#fff" }}>
            <h3>What&apos;s NOT included today</h3>
            <p style={{ marginTop: 8 }}>
              We focus on cleanout and organization because that&apos;s what we do well. Flooring,
              cabinetry, climate systems, and electrical are <strong>out of scope at launch</strong>.
              We&apos;ll add them in 2026 through <Link href="/#packages" style={{ color: "var(--c-accent)", fontWeight: 600 }}>The Retreat</Link> — once we have the right partners under contract.
            </p>
            <p style={{ marginTop: 10 }}>
              If you want a referral to a local Orlando pro in the meantime, we&apos;re happy to
              share who we&apos;ve seen do good work. You book and pay them directly. We don&apos;t
              mark up other people&apos;s labor.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-narrow" style={{ textAlign: "center" }}>
          <h2>Ready when you are.</h2>
          <p className="lead" style={{ marginTop: 12 }}>
            Free quote. Fixed price. Usually same week.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 20, flexWrap: "wrap" }}>
            <Link href="/book" className="btn btn-primary">Get a free quote →</Link>
            <a href={`tel:${BRAND.phoneTel}`} className="btn btn-ghost" data-plausible-event="phone_click">📞 {BRAND.phone}</a>
          </div>
        </div>
      </section>
    </>
  );
}

function Example({ title, price, details }: { title: string; price: string; details: string }) {
  return (
    <div className="card" style={{ background: "#fff" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: 16, flexWrap: "wrap" }}>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18 }}>{title}</div>
        <div style={{ color: "var(--c-accent)", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20 }}>{price}</div>
      </div>
      <p style={{ marginTop: 8, color: "var(--c-text-muted)", fontSize: 15 }}>{details}</p>
    </div>
  );
}
