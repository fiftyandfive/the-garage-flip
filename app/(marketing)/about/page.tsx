import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "About | The Garage Flip",
  description:
    "Why The Garage Flip exists. Hospitality-grade garage cleanouts in Orlando, FL — fixed quotes, donation receipts, no day-of surprises.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: BRAND.url },
          { name: "About", url: `${BRAND.url}/about` },
        ])}
      />
      <section className="section">
        <div className="container-narrow">
          <span className="eyebrow">About</span>
          <h1>Why The Garage Flip exists.</h1>
          <p className="lead" style={{ marginTop: 18 }}>
            Most Orlando garage services overpromise and subcontract. We do two things —
            cleanout and organization — end to end. That&apos;s the whole company today.
          </p>

          <div style={{ marginTop: 36, display: "flex", flexDirection: "column", gap: 22 }}>
            <p>
              I&apos;m Lucas, founder of The Garage Flip. We&apos;re a young Orlando company
              built by a small team of operators who came from hospitality and product.
              We figured the same standards that work in restaurants — clean handoff,
              fixed quote, real ownership of the outcome — should apply to garages too.
            </p>
            <p>
              <strong>Our promise to our first 10 customers:</strong> fixed quote in writing,
              direct line to me (not a call center), and you&apos;ll know exactly where every
              hauled item went — donation receipts, recycling addresses, landfill tickets.
              If you&apos;re not happy, your next cleanout&apos;s haul-away is on us.
            </p>
            <p>
              We&apos;re intentionally narrow at launch. Floors, cabinets, EV chargers, AC —
              all coming in 2026 as <Link href="/#packages" style={{ color: "var(--c-accent)", fontWeight: 600 }}>The Retreat</Link>{" "}
              once we have the right partners under contract. Until then, we won&apos;t pretend
              to do work we don&apos;t own.
            </p>
            <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18 }}>
              — {BRAND.founder}, Founder
            </p>
          </div>

          <div className="card" style={{ marginTop: 40, background: "var(--c-band)" }}>
            <h3>The basics</h3>
            <ul style={{ listStyle: "none", padding: 0, marginTop: 14, display: "flex", flexDirection: "column", gap: 10, fontSize: 15 }}>
              <li><strong>Company:</strong> {BRAND.legalName} (Florida-registered)</li>
              <li><strong>Service area:</strong> Orlando, Winter Park, Lake Nona, Dr. Phillips, College Park, Windermere, Baldwin Park, Thornton Park</li>
              <li><strong>Hours:</strong> Mon–Sat, 8a–6p</li>
              <li><strong>Direct line:</strong> <a href={`tel:${BRAND.phoneTel}`} style={{ color: "var(--c-accent)" }}>{BRAND.phone}</a></li>
              <li><strong>Email:</strong> <a href={`mailto:${BRAND.email}`} style={{ color: "var(--c-accent)" }}>{BRAND.email}</a></li>
            </ul>
          </div>

          <div style={{ marginTop: 32, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/book" className="btn btn-primary">Get a free quote →</Link>
            <Link href="/pricing" className="btn btn-ghost">See pricing</Link>
          </div>
        </div>
      </section>
    </>
  );
}
