import { BRAND } from "@/lib/brand";

export function FounderPromise() {
  return (
    <section className="section" style={{ background: "var(--c-band)" }}>
      <div className="container-narrow">
        <span className="eyebrow">No fake reviews</span>
        <h2>We&apos;re new. Here&apos;s what that means for you.</h2>
        <div className="card" style={{ marginTop: 28, background: "#fff" }}>
          <p style={{ fontSize: 17, lineHeight: 1.7 }}>
            The Garage Flip is a young company. I&apos;m not going to invent reviews we haven&apos;t earned yet.
            What I can promise our first 10 customers:
          </p>
          <ul style={{ listStyle: "none", padding: 0, marginTop: 18, display: "flex", flexDirection: "column", gap: 12, fontSize: 16 }}>
            <li><strong>Fixed quote, in writing, before any work.</strong> No day-of surprises.</li>
            <li><strong>Free haul-away on your next cleanout</strong> if you aren&apos;t happy with the first one.</li>
            <li>
              <strong>Direct line to me ({BRAND.founder.split(" ")[0]}), not a call center</strong> — text or call the number below any time during your job.
            </li>
            <li>
              <strong>You&apos;ll know exactly where your stuff went</strong> — donation receipts, recycling center names, landfill tickets.
            </li>
          </ul>
          <div style={{ marginTop: 26, display: "flex", alignItems: "center", gap: 14 }}>
            <div
              aria-hidden="true"
              style={{
                width: 52, height: 52, borderRadius: 999, background: "var(--c-band)",
                border: "1px solid var(--c-border)", display: "flex", alignItems: "center",
                justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 700,
                color: "var(--c-text-muted)",
              }}
              title="TODO: Lucas — founder headshot"
            >
              LV
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>— {BRAND.founder}</div>
              <div style={{ fontSize: 13, color: "var(--c-text-muted)" }}>Founder, {BRAND.name}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
