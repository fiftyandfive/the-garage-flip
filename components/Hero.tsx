import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { TrustStrip } from "./TrustStrip";
import { InstantQuoteForm } from "./InstantQuoteForm";

export function Hero() {
  return (
    <section
      style={{
        position: "relative",
        background: "linear-gradient(180deg, #0E0E10 0%, #17171B 100%)",
        color: "#fff",
        overflow: "hidden",
        paddingTop: 48,
        paddingBottom: 64,
      }}
    >
      {/* Copper orb ambient */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", top: "-10%", right: "-12%", width: "60vw", height: "60vw",
          maxWidth: 820, maxHeight: 820,
          background:
            "radial-gradient(circle at center, rgba(242,107,31,.34) 0%, rgba(212,83,10,.14) 38%, transparent 66%)",
          filter: "blur(36px)", pointerEvents: "none",
        }}
      />
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr .9fr",
            gap: 48,
            alignItems: "start",
            paddingTop: 32,
            paddingBottom: 32,
          }}
          className="hero-grid"
        >
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 12px", borderRadius: 999, background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.12)", fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(255,255,255,.78)", marginBottom: 22 }}>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: "#F26B1F", boxShadow: "0 0 10px #F26B1F" }} />
              Orlando · Same-Week Service
            </div>
            <h1 style={{ color: "#fff" }}>
              Garage Cleanout &amp; Organization, Orlando.
            </h1>
            <p className="lead" style={{ color: "rgba(255,255,255,.78)", marginTop: 20, maxWidth: 560 }}>
              Clutter out. Space back. Same-week scheduling — and you&apos;ll know the full price
              before we start.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 28 }}>
              <Link href="/book" className="btn btn-primary">
                Get a free quote →
              </Link>
              <a
                href={`sms:${BRAND.phoneSms}&body=${encodeURIComponent("Garage cleanout quote request")}`}
                className="btn btn-dark-ghost"
                data-plausible-event="sms_click"
              >
                💬 Text {BRAND.phone}
              </a>
            </div>
            <div style={{ marginTop: 28, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <p style={{ color: "rgba(255,255,255,.72)", fontSize: 14, maxWidth: 520 }}>
                Built by a team of entrepreneurs, designers, and operators bringing
                hospitality-grade service to garage cleanouts.
              </p>
            </div>
            <div style={{ marginTop: 18 }}>
              <TrustStripOnDark />
            </div>
          </div>

          <div
            style={{
              background: "rgba(255,255,255,.96)",
              color: "var(--c-text)",
              borderRadius: 18,
              padding: 24,
              boxShadow: "0 20px 60px rgba(0,0,0,.32)",
            }}
          >
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20 }}>
                Get your free quote
              </div>
              <div style={{ fontSize: 13, color: "var(--c-text-muted)" }}>
                Takes under 60 seconds. Lucas replies within 12 hours.
              </div>
            </div>
            <InstantQuoteForm compact source="hero" />
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 960px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
        }
      `}} />
    </section>
  );
}

function TrustStripOnDark() {
  // Render dark-mode chips; reuse logic from TrustStrip but with inverted colors
  return (
    <div className="trust-chips">
      <style dangerouslySetInnerHTML={{ __html: `
        .hero-chips .chip {
          background: rgba(255,255,255,.06);
          border-color: rgba(255,255,255,.14);
          color: rgba(255,255,255,.82);
        }
      `}} />
      <div className="hero-chips"><TrustStrip /></div>
    </div>
  );
}
