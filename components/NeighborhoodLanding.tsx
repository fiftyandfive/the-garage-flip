import Link from "next/link";
import type { Neighborhood } from "@/lib/neighborhoods";
import { NEIGHBORHOODS } from "@/lib/neighborhoods";
import { InstantQuoteForm } from "./InstantQuoteForm";
import { FAQ } from "./FAQ";
import { buildFaq } from "@/lib/faq";
import { BRAND } from "@/lib/brand";

export function NeighborhoodLanding({ n }: { n: Neighborhood }) {
  const faq = buildFaq();
  const others = NEIGHBORHOODS.filter((x) => x.slug !== n.slug);

  return (
    <>
      <section style={{ background: "var(--c-dark)", color: "#fff", padding: "72px 0 48px" }}>
        <div className="container">
          <span className="eyebrow" style={{ color: "#F26B1F" }}>{n.name}, FL</span>
          <h1 style={{ color: "#fff", maxWidth: 940 }}>
            Garage Cleanout in {n.name} — from $600.
          </h1>
          <p className="lead" style={{ color: "rgba(255,255,255,.78)", marginTop: 18, maxWidth: 660 }}>
            Same-week scheduling for {n.name} ({n.zips.join(", ")}) and the rest of Orange County.
            Fixed quote in writing, donation receipts, no day-of surprises.
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
              <h2>Cleanouts we run in {n.name}.</h2>
              <p className="lead" style={{ marginTop: 12 }}>
                Two scenarios we see most often around {n.landmarks[0]} and the {n.name} side of Orlando:
              </p>
              <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 18 }}>
                {n.scenarios.map((s, i) => (
                  <div key={i} className="card">
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, marginBottom: 6, color: "var(--c-accent)" }}>
                      Scenario {i + 1}
                    </div>
                    <p style={{ fontSize: 16 }}>{s}</p>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 36 }}>
                <h3>Pricing in {n.name}</h3>
                <ul className="pkg-list" style={{ marginTop: 16 }}>
                  <li><strong>1-car:</strong> from $600</li>
                  <li><strong>2-car:</strong> from $800</li>
                  <li><strong>3-car:</strong> from $1,000</li>
                  <li><strong>Oversized / commercial:</strong> quoted on site</li>
                </ul>
                <p style={{ marginTop: 12 }}>
                  Want organization baked in?{" "}
                  <Link href="/pricing" style={{ color: "var(--c-accent)", fontWeight: 600 }}>See The Refresh package</Link>{" "}
                  ($1,200–$1,800 in {n.name}).
                </p>
              </div>

              <div style={{ marginTop: 36 }}>
                <h3>Areas we cover near {n.name}</h3>
                <p style={{ marginTop: 8, color: "var(--c-text-muted)" }}>
                  {n.landmarks.join(" · ")} · ZIP {n.zips.join(" / ")}
                </p>
              </div>

              <div style={{ marginTop: 36 }}>
                <h3>Cleanouts elsewhere in Orlando</h3>
                <ul style={{ listStyle: "none", padding: 0, marginTop: 14, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 8 }}>
                  {others.map((x) => (
                    <li key={x.slug}>
                      <Link href={`/garage-cleanout-${x.slug}`} style={{ color: "var(--c-text)", textDecoration: "underline", textUnderlineOffset: 3 }}>
                        {x.name}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link href="/garage-cleanout-orlando" style={{ color: "var(--c-text)", textDecoration: "underline", textUnderlineOffset: 3 }}>
                      Orlando (all areas)
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <div className="card" style={{ position: "sticky", top: 100 }}>
                <h3 style={{ marginBottom: 6 }}>Free quote — {n.name}</h3>
                <p className="muted" style={{ fontSize: 14, marginBottom: 14 }}>
                  Lucas replies within 12 hours. No call center.
                </p>
                <InstantQuoteForm compact source={`neighborhood:${n.slug}`} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--c-band)" }}>
        <div className="container-narrow">
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <span className="eyebrow">FAQ</span>
            <h2>{n.name} cleanout questions.</h2>
          </div>
          <FAQ items={faq} />
        </div>
      </section>
    </>
  );
}
