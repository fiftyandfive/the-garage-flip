import type { Metadata } from "next";
import { InstantQuoteForm } from "@/components/InstantQuoteForm";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Book a Free Garage Cleanout Quote | The Garage Flip",
  description:
    "Book a free garage cleanout quote in Orlando. Fixed price in writing, same-week scheduling. Lucas replies within 12 hours.",
  alternates: { canonical: "/book" },
  robots: { index: true, follow: true },
};

export default function BookPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: BRAND.url },
          { name: "Book a Quote", url: `${BRAND.url}/book` },
        ])}
      />

      <section className="section">
        <div className="container" style={{ maxWidth: 1000 }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <span className="eyebrow">Free · Fixed · Fast</span>
            <h1>Get your free quote.</h1>
            <p className="lead" style={{ marginTop: 12, maxWidth: 600, marginInline: "auto" }}>
              Fill this in — Lucas replies within 12 hours with a fixed price in writing.
              Urgent? Text{" "}
              <a href={`sms:${BRAND.phoneSms}`} style={{ color: "var(--c-accent)", fontWeight: 700 }}>{BRAND.phone}</a>{" "}
              or call.
            </p>
          </div>

          <div
            style={{
              display: "grid", gridTemplateColumns: "1.4fr .8fr", gap: 32, alignItems: "start",
            }}
            className="book-grid"
          >
            <div className="card">
              <InstantQuoteForm source="book-page" />
            </div>
            <div>
              <div className="card" style={{ background: "var(--c-band)" }}>
                <h3 style={{ marginBottom: 10 }}>What happens next</h3>
                <ol style={{ paddingLeft: 18, display: "flex", flexDirection: "column", gap: 10, fontSize: 15 }}>
                  <li>Lucas reviews your note within 12 hours.</li>
                  <li>
                    Quick text or call to confirm details (photos help — feel free to text{" "}
                    <a href={`sms:${BRAND.phoneSms}`} style={{ color: "var(--c-accent)", fontWeight: 600 }}>{BRAND.phone}</a>).
                  </li>
                  <li>Fixed price in writing — no deposit required.</li>
                  <li>We schedule. Usually same week.</li>
                </ol>
              </div>
              <div className="card" style={{ marginTop: 16 }}>
                <h3 style={{ marginBottom: 10, fontSize: 18 }}>Prefer to skip the form?</h3>
                <p style={{ fontSize: 14, marginBottom: 12 }}>
                  Text us a photo of your garage. Fastest route to a quote.
                </p>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <a className="btn btn-ghost" href={`tel:${BRAND.phoneTel}`} data-plausible-event="phone_click">📞 Call</a>
                  <a
                    className="btn btn-ghost"
                    href={`sms:${BRAND.phoneSms}&body=${encodeURIComponent("Garage cleanout quote request")}`}
                    data-plausible-event="sms_click"
                  >
                    💬 Text a photo
                  </a>
                </div>
              </div>
            </div>
          </div>
          <style dangerouslySetInnerHTML={{__html:`
            @media (max-width: 900px) {
              .book-grid { grid-template-columns: 1fr !important; }
            }
          `}} />
        </div>
      </section>
    </>
  );
}
