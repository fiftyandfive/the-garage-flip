// ONE FILE ONLY where "Licensed" / "Insured" can appear as static strings.
// Both are gated behind env flags — chips do not render until coverage is bound in Vercel.
const chips = [
  { label: "Orlando-Based", show: true },
  { label: "FL-Registered LLC", show: true },
  { label: "Licensed", show: process.env.NEXT_PUBLIC_LICENSE_BOUND === "true" },
  { label: "Insured", show: process.env.NEXT_PUBLIC_INSURANCE_BOUND === "true" },
  { label: "Same-Week Service", show: true },
];

export function TrustStrip() {
  const visible = chips.filter((c) => c.show);
  return (
    <div className="trust-chips">
      {visible.map((c) => (
        <span key={c.label} className="chip">{c.label}</span>
      ))}
    </div>
  );
}
