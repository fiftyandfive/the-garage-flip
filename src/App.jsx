import { useState, useEffect, useRef } from "react";
import { Menu, X, Check, Phone, Mail, MapPin, ChevronDown, Star, ArrowRight, MessageSquare } from "lucide-react";

// ─── BRAND ───────────────────────────────────────────────────────
const BRAND = {
  name: "The Garage Flip",
  phone: "(407) 735-6450",
  phoneTel: "4077356450",
  email: "hello@thegarageflip.com",
  address: "Orlando, FL",
  calendly: "https://calendly.com/thegarageflip/free-estimate",
};

// ─── PALETTE ─────────────────────────────────────────────────────
const C = {
  canvas: "#FBFAF7",
  panel: "#FFFFFF",
  band: "#F1EFEA",
  border: "#E8E4DB",
  text: "#0E0E10",
  textMuted: "#55534D",
  textLight: "#9A978F",
  dark: "#0E0E10",
  darkSoft: "#17171A",
  accent: "#F26B1F",
  accentDeep: "#D4530A",
  accentGlow: "rgba(249,115,22,0.28)",
};

const FONT_DISPLAY = `'Space Grotesk', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif`;
const FONT_BODY = `'Inter', -apple-system, BlinkMacSystemFont, sans-serif`;
const GRADIENT_ORANGE = `linear-gradient(135deg,#F26B1F,#D4530A)`;
const SHADOW_ORANGE = `0 8px 30px rgba(242,107,31,0.32)`;

// ─── SERVICES ────────────────────────────────────────────────────
const SERVICES = [
  { id: "cleanout", icon: "🧹", name: "Garage Cleanout", desc: "Full removal of clutter, junk, and unwanted items. We handle the hauling so you don't have to.", price: "From $600" },
  { id: "organization", icon: "🏗️", name: "Garage Organization", desc: "Custom sorting, shelving installation, and layout optimization for a space that actually works.", price: "From $400" },
  { id: "epoxy", icon: "💎", name: "Epoxy Floor Coating", desc: "Durable, showroom-quality epoxy floors that transform the look and feel of any garage.", price: "From $1,500" },
  { id: "cabinets", icon: "🗄️", name: "Cabinet Installation", desc: "Custom garage cabinetry for tools, gear, and storage — built to last.", price: "From $2,000" },
  { id: "storage", icon: "📦", name: "Overhead Storage Racks", desc: "Maximize vertical space with heavy-duty overhead storage systems.", price: "From $400" },
  { id: "pressure", icon: "🚿", name: "Pressure Washing", desc: "Deep clean your garage floor, driveway, and exterior surfaces.", price: "From $200" },
  { id: "ev", icon: "⚡", name: "EV Charger Installation", desc: "Level 2 EV charger installation by licensed electricians. Future-proof your garage.", price: "From $800" },
  { id: "minisplit", icon: "❄️", name: "Mini-Split AC/Heat", desc: "Keep your garage comfortable year-round with an efficient mini-split system.", price: "From $1,500" },
  { id: "shelving", icon: "🔧", name: "Custom Shelving & Workbenches", desc: "Built-to-order shelving and workbench solutions for the serious hobbyist or professional.", price: "From $500" },
  { id: "pest", icon: "🐛", name: "Pest Treatment", desc: "Garage-specific pest and rodent treatment before or after your cleanout.", price: "From $150" },
];

// ─── PACKAGES ────────────────────────────────────────────────────
const PACKAGES = [
  { id: "reset", name: "THE RESET", range: "$800–$1,200", tagline: "Start fresh.", desc: "Cleanout + haul + basic sweep.", selects: ["cleanout"] },
  { id: "refresh", name: "THE REFRESH", range: "$2,500–$4,500", tagline: "The most popular transformation.", desc: "Cleanout + epoxy + shelving.", selects: ["cleanout", "epoxy", "shelving"], popular: true },
  { id: "retreat", name: "THE RETREAT", range: "$6,000–$12,000", tagline: "The full transformation.", desc: "Cleanout + epoxy + cabinets + AC + lighting.", selects: ["cleanout", "epoxy", "cabinets", "minisplit"] },
];

// ─── TESTIMONIALS ────────────────────────────────────────────────
const TESTIMONIALS = [
  { name: "Jason M.", area: "Winter Park", quote: "They showed up, cleared out fifteen years of junk, and had my floor looking like a showroom in a day. Not what I expected from a 'cleanout' service." },
  { name: "Priya S.", area: "College Park", quote: "Straightforward quote, no upsell, team was in and out. The garage is genuinely the cleanest room in our house now." },
  { name: "Daniel R.", area: "Thornton Park", quote: "Hired them for a Retreat package before we listed the house. Buyer walked in, saw the garage, made the offer that day." },
  { name: "Meredith K.", area: "Lake Nona", quote: "Cleanout, epoxy, cabinets, EV charger — all one call. I'd been putting this off for two years. Wish I'd called sooner." },
];

// ─── FAQ ─────────────────────────────────────────────────────────
const FAQS = [
  { q: "How much does a garage cleanout cost in Orlando?", a: "The Reset package starts at $800 and covers full cleanout, haul-away, and a basic sweep. Larger or heavier jobs may run up to $1,200. Every quote is free — and usually same-week." },
  { q: "What happens to the items you haul away?", a: "Anything reusable gets donated. Metal and electronics get recycled. Only what's left after that goes to the transfer station. We can tell you exactly where your stuff went." },
  { q: "How long does a full transformation take?", a: "Cleanouts are usually same-day. The Refresh (cleanout + epoxy + shelving) is typically 2–3 days. A full Retreat with AC, lighting, cabinets, and flooring runs 3–5 days depending on scope." },
  { q: "Are you licensed and insured?", a: "Yes. Fully insured for residential and commercial work in Florida. EV charger and mini-split installs are performed by licensed electricians and HVAC techs." },
  { q: "Do you work with realtors and property managers?", a: "Yes — quick turnaround cleanouts and refreshes for listings and rentals across Orlando, Winter Park, Lake Nona, and surrounding areas. Flat-rate quotes, flexible scheduling." },
  { q: "Can you epoxy a garage floor in one day?", a: "Most residential garages — yes. Installation is same-day. Cure time is typically 24–48 hours before you walk on it, and a few days before heavy loads or vehicles." },
];

// ─── HELPERS ─────────────────────────────────────────────────────
const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

function useFadeIn() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const prm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prm) { setVisible(true); return; }
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setVisible(true)),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function useScrolled(threshold = 40) {
  const [s, setS] = useState(false);
  useEffect(() => {
    const on = () => setS(window.scrollY > threshold);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [threshold]);
  return s;
}

function useInView(id) {
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = document.getElementById(id);
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => setV(e.isIntersecting)),
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [id]);
  return v;
}

// ─── GRAIN ───────────────────────────────────────────────────────
const Grain = ({ opacity = 0.03 }) => (
  <svg aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity, mixBlendMode: "overlay" }}>
    <filter id="grain-noise"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" /><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.9 0" /></filter>
    <rect width="100%" height="100%" filter="url(#grain-noise)" />
  </svg>
);

const Section = ({ id, children, style = {}, ...rest }) => {
  const [ref, visible] = useFadeIn();
  return (
    <section id={id} ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.7s ease, transform 0.7s ease", position: "relative", ...style }} {...rest}>
      {children}
    </section>
  );
};

const SectionHeader = ({ eyebrow, title, sub, dark = false }) => (
  <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 56px" }}>
    {eyebrow && (
      <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 18, fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700, color: C.accent }}>
        <span style={{ width: 32, height: 2, background: C.accent, borderRadius: 2 }} />
        {eyebrow}
      </div>
    )}
    <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(34px, 5vw, 56px)", lineHeight: 1.05, letterSpacing: "-0.03em", color: dark ? "#fff" : C.text, marginBottom: sub ? 18 : 0 }}>{title}</h2>
    {sub && <p style={{ fontSize: "clamp(16px, 1.4vw, 19px)", lineHeight: 1.55, color: dark ? "rgba(255,255,255,0.72)" : C.textMuted }}>{sub}</p>}
  </div>
);

// ─── APP ─────────────────────────────────────────────────────────
export default function App() {
  const [selected, setSelected] = useState([]);
  const toggle = (id) => setSelected((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id]);
  const selectPackage = (ids) => {
    setSelected((prev) => {
      const set = new Set([...prev, ...ids]);
      return [...set];
    });
    setTimeout(() => scrollTo("quote"), 100);
  };

  return (
    <div style={{ minHeight: "100vh", background: C.canvas, color: C.text, fontFamily: FONT_BODY, fontSize: 16, lineHeight: 1.55 }}>
      <Nav />
      <Hero />
      <TrustStrip />
      <ServicesSection />
      <PackagesSection onSelect={selectPackage} />
      <QuoteBuilder selected={selected} toggle={toggle} setSelected={setSelected} />
      <WhySection />
      <Testimonials />
      <FAQSection />
      <Footer />
      <MobileStickyCTA />
      <GlobalStyles />
    </div>
  );
}

// ─── NAV ─────────────────────────────────────────────────────────
function Nav() {
  const scrolled = useScrolled(40);
  const [open, setOpen] = useState(false);
  const bg = scrolled ? "rgba(255,255,255,0.72)" : "rgba(14,14,16,0.5)";
  const border = scrolled ? "1px solid rgba(232,228,219,0.6)" : "1px solid rgba(255,255,255,0.08)";
  const linkColor = scrolled ? C.text : "rgba(255,255,255,0.92)";
  const links = [
    ["Services", "services"],
    ["Packages", "packages"],
    ["Quote", "quote"],
    ["Why", "why"],
    ["FAQ", "faq"],
  ];
  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: bg, backdropFilter: "blur(20px) saturate(180%)", WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderBottom: border, transition: "background 0.3s ease, border-color 0.3s ease",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
          <a href="#" onClick={(e) => { e.preventDefault(); scrollTo("top"); }} style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <img src="/logo-transparent.png" alt="The Garage Flip" style={{ height: 36, width: "auto", display: "block", filter: scrolled ? "none" : "brightness(0) invert(1)", transition: "filter 0.3s ease" }} />
            <span style={{ fontFamily: FONT_DISPLAY, fontSize: 17, letterSpacing: "-0.02em", color: linkColor, transition: "color 0.3s ease" }}>THE GARAGE FLIP</span>
          </a>
          <div className="tgf-nav-links" style={{ display: "flex", alignItems: "center", gap: 28 }}>
            {links.map(([label, id]) => (
              <a key={id} href={`#${id}`} onClick={(e) => { e.preventDefault(); scrollTo(id); }}
                style={{ textDecoration: "none", color: linkColor, fontSize: 14, fontWeight: 500, transition: "color 0.3s ease, opacity 0.2s ease" }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}>{label}</a>
            ))}
            <button onClick={() => scrollTo("quote")} style={{
              background: GRADIENT_ORANGE, color: "#fff", border: "none", padding: "10px 20px",
              borderRadius: 999, fontWeight: 700, fontSize: 14, cursor: "pointer", boxShadow: SHADOW_ORANGE, transition: "transform 0.2s ease",
            }} onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-1px)")} onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}>Get a Quote</button>
          </div>
          <button className="tgf-nav-hamburger" onClick={() => setOpen(true)} aria-label="Menu" style={{ background: "transparent", border: "none", color: linkColor, cursor: "pointer", display: "none", padding: 8 }}>
            <Menu size={24} />
          </button>
        </div>
      </nav>
      {open && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(14,14,16,0.88)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "18px 24px", display: "flex", justifyContent: "flex-end" }}>
            <button onClick={() => setOpen(false)} style={{ background: "transparent", border: "none", color: "#fff", cursor: "pointer", padding: 8 }} aria-label="Close"><X size={28} /></button>
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 28 }}>
            {links.map(([label, id]) => (
              <a key={id} href={`#${id}`} onClick={(e) => { e.preventDefault(); setOpen(false); scrollTo(id); }}
                style={{ color: "#fff", textDecoration: "none", fontFamily: FONT_DISPLAY, fontSize: 32, letterSpacing: "-0.02em" }}>{label}</a>
            ))}
            <button onClick={() => { setOpen(false); scrollTo("quote"); }} style={{ background: GRADIENT_ORANGE, color: "#fff", border: "none", padding: "14px 32px", borderRadius: 999, fontWeight: 700, fontSize: 16, cursor: "pointer", boxShadow: SHADOW_ORANGE, marginTop: 12 }}>Get a Quote</button>
          </div>
        </div>
      )}
    </>
  );
}
// ─── HERO ────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="top" style={{ position: "relative", background: C.dark, color: "#fff", overflow: "hidden", paddingTop: 140, paddingBottom: 80 }}>
      {/* Hero background image */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0,
        backgroundImage: `url("https://images.unsplash.com/photo-1632823471406-4c5c7d6e2e8f?w=1920&q=80&auto=format&fit=crop")`,
        backgroundSize: "cover", backgroundPosition: "center", opacity: 0.32, pointerEvents: "none",
      }} />
      {/* Dark gradient overlay for legibility */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0,
        background: `linear-gradient(180deg, rgba(14,14,16,0.78) 0%, rgba(14,14,16,0.62) 40%, rgba(22,22,26,0.9) 100%)`,
        pointerEvents: "none",
      }} />
      {/* Animated copper orb */}
      <div aria-hidden="true" style={{
        position: "absolute", top: "10%", right: "-15%", width: "70vw", height: "70vw", maxWidth: 900, maxHeight: 900,
        background: `radial-gradient(circle at center, rgba(242,107,31,0.38) 0%, rgba(212,83,10,0.18) 35%, transparent 65%)`,
        filter: "blur(40px)", pointerEvents: "none", animation: "tgfOrb 22s ease-in-out infinite",
      }} />
      <div aria-hidden="true" style={{
        position: "absolute", bottom: "-10%", left: "-10%", width: "50vw", height: "50vw", maxWidth: 600, maxHeight: 600,
        background: `radial-gradient(circle at center, rgba(242,107,31,0.22) 0%, transparent 60%)`,
        filter: "blur(40px)", pointerEvents: "none", animation: "tgfOrb2 28s ease-in-out infinite",
      }} />
      <Grain opacity={0.04} />
      <div style={{ position: "relative", zIndex: 2, maxWidth: 1100, margin: "0 auto", padding: "40px 24px 40px", textAlign: "center" }}>
        {/* Prominent logo */}
        <img
          src="/logo-transparent.png"
          alt="The Garage Flip"
          style={{ height: "clamp(96px, 13vw, 140px)", width: "auto", margin: "0 auto 28px", display: "block", filter: "drop-shadow(0 12px 40px rgba(242,107,31,0.35))" }}
        />
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 14px", borderRadius: 999, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.78)", marginBottom: 32, backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}>
          <span style={{ width: 6, height: 6, borderRadius: 999, background: C.accent, boxShadow: `0 0 12px ${C.accent}` }} />
          Orlando · Same-Week Service
        </div>
        <h1 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: "clamp(56px, 9vw, 104px)", lineHeight: 0.98, letterSpacing: "-0.035em", marginBottom: 24, color: "#fff" }}>
          Your Garage.<br />Transformed.
        </h1>
        <p style={{ fontSize: "clamp(17px, 1.6vw, 21px)", lineHeight: 1.5, color: "rgba(255,255,255,0.76)", maxWidth: 620, margin: "0 auto 40px", fontWeight: 400 }}>
          From cluttered chaos to clean, functional space — we handle everything.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center", marginBottom: 56 }}>
          <button onClick={() => scrollTo("quote")} style={{
            background: GRADIENT_ORANGE, color: "#fff", border: "none", padding: "16px 32px",
            borderRadius: 999, fontWeight: 700, fontSize: 16, cursor: "pointer", boxShadow: SHADOW_ORANGE,
            display: "inline-flex", alignItems: "center", gap: 10, transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(242,107,31,0.45)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = SHADOW_ORANGE; }}>
            Get Your Free Quote <ArrowRight size={18} />
          </button>
          <button onClick={() => scrollTo("why")} style={{
            background: "rgba(255,255,255,0.06)", color: "#fff", border: "1px solid rgba(255,255,255,0.16)",
            padding: "16px 32px", borderRadius: 999, fontWeight: 600, fontSize: 16, cursor: "pointer",
            backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", transition: "background 0.2s ease",
          }} onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}>
            See Our Work
          </button>
        </div>
        {/* Stats bar */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 20, maxWidth: 760, margin: "0 auto", paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          {[
            ["500+", "Garages Flipped"],
            ["4.9★", "Customer Rating"],
            ["Same-Week", "Scheduling"],
            ["Licensed", "& Insured"],
          ].map(([big, small]) => (
            <div key={small} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 24, color: "#fff", letterSpacing: "-0.02em", marginBottom: 4 }}>{big}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>{small}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
// ─── TRUST STRIP ─────────────────────────────────────────────────
function TrustStrip() {
  const items = ["Licensed", "Insured", "Orlando-Owned", "5-Star Rated"];
  return (
    <div style={{ background: C.band, borderBottom: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "18px 24px", display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "12px 28px" }}>
        {items.map((x, i) => (
          <span key={x} style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: 13, fontWeight: 600, color: C.textMuted, letterSpacing: "0.06em", textTransform: "uppercase" }}>
            {x}
            {i < items.length - 1 && <span style={{ color: C.textLight, marginLeft: 18 }}>•</span>}
          </span>
        ))}
      </div>
    </div>
  );
}
// ─── SERVICES ────────────────────────────────────────────────────
function ServicesSection() {
  return (
    <Section id="services" style={{ padding: "100px 24px", background: C.canvas }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <SectionHeader eyebrow="What We Do" title="Ten services. One team." sub="Cleanout, upgrade, or full transformation — every service handled in-house by one crew. No juggling vendors. No half-finished projects." />
        <div className="tgf-grid-services" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {SERVICES.map((s) => <ServiceCard key={s.id} s={s} />)}
        </div>
      </div>
    </Section>
  );
}

function ServiceCard({ s }) {
  const [hover, setHover] = useState(false);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        background: "rgba(255,255,255,0.72)", backdropFilter: "blur(20px) saturate(180%)", WebkitBackdropFilter: "blur(20px) saturate(180%)",
        border: `1px solid ${hover ? "rgba(242,107,31,0.32)" : C.border}`, borderRadius: 18, padding: 28,
        transform: hover ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hover ? "0 20px 50px rgba(249,115,22,0.12)" : "0 2px 8px rgba(14,14,16,0.04)",
        transition: "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
        display: "flex", flexDirection: "column", gap: 14, height: "100%",
      }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(255,255,255,0.85)", border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>
          {s.icon}
        </div>
        <span style={{ display: "inline-block", padding: "6px 12px", borderRadius: 999, background: C.band, border: `1px solid ${C.border}`, fontSize: 12, fontWeight: 700, color: C.text, letterSpacing: "0.02em" }}>
          {s.price}
        </span>
      </div>
      <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 22, letterSpacing: "-0.02em", color: C.text, lineHeight: 1.15 }}>{s.name}</h3>
      <p style={{ fontSize: 14.5, color: C.textMuted, lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
    </div>
  );
}
// ─── PACKAGES ────────────────────────────────────────────────────
function PackagesSection({ onSelect }) {
  return (
    <Section id="packages" style={{ padding: "100px 24px", background: C.band, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeader eyebrow="Transformation Packages" title="Three ways in." sub="Start with a cleanout. Add a floor. Go all the way. Pick a package or build your own below." />
        <div className="tgf-grid-packages" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22, alignItems: "stretch" }}>
          {PACKAGES.map((p) => <PackageCard key={p.id} p={p} onSelect={() => onSelect(p.selects)} />)}
        </div>
      </div>
    </Section>
  );
}

function PackageCard({ p, onSelect }) {
  const [hover, setHover] = useState(false);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{ position: "relative", transform: p.popular ? "scale(1.04)" : "scale(1)", zIndex: p.popular ? 2 : 1 }}>
      {p.popular && (
        <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: GRADIENT_ORANGE, color: "#fff", fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", padding: "6px 14px", borderRadius: 999, boxShadow: SHADOW_ORANGE, zIndex: 3, whiteSpace: "nowrap" }}>
          Most Popular
        </div>
      )}
      <div style={{
        background: p.popular ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.7)",
        backdropFilter: "blur(20px) saturate(180%)", WebkitBackdropFilter: "blur(20px) saturate(180%)",
        border: p.popular ? `1px solid rgba(242,107,31,0.4)` : `1px solid ${C.border}`,
        borderRadius: 20, padding: "36px 28px 32px",
        boxShadow: p.popular ? `0 24px 60px rgba(242,107,31,0.22)` : (hover ? "0 20px 50px rgba(249,115,22,0.12)" : "0 2px 8px rgba(14,14,16,0.04)"),
        transform: hover && !p.popular ? "translateY(-4px)" : "translateY(0)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        display: "flex", flexDirection: "column", gap: 16, height: "100%",
      }}>
        <div>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 28, letterSpacing: "-0.02em", color: C.text, marginBottom: 6 }}>{p.name}</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: C.accent, letterSpacing: "0.02em" }}>{p.range}</div>
        </div>
        <div style={{ fontSize: 18, fontWeight: 600, color: C.text, fontStyle: "italic" }}>"{p.tagline}"</div>
        <div style={{ fontSize: 14.5, color: C.textMuted, lineHeight: 1.6, flex: 1 }}>{p.desc}</div>
        <button onClick={onSelect} style={{
          background: p.popular ? GRADIENT_ORANGE : "transparent", color: p.popular ? "#fff" : C.text,
          border: p.popular ? "none" : `1.5px solid ${C.text}`, padding: "13px 20px", borderRadius: 999,
          fontWeight: 700, fontSize: 14.5, cursor: "pointer", boxShadow: p.popular ? SHADOW_ORANGE : "none",
          transition: "transform 0.2s ease, background 0.2s ease",
          display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
        }} onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-1px)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}>
          Get This Package <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
// ─── QUOTE BUILDER ───────────────────────────────────────────────
function QuoteBuilder({ selected, toggle, setSelected }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", size: "", timeline: "", notes: "", company: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [flash, setFlash] = useState(false);

  const total = selected.reduce((sum, id) => {
    const svc = SERVICES.find((x) => x.id === id);
    if (!svc) return sum;
    return sum + parseInt(svc.price.replace(/[^0-9]/g, ""), 10);
  }, 0);

  useEffect(() => {
    if (selected.length === 0) return;
    setFlash(true);
    const t = setTimeout(() => setFlash(false), 320);
    return () => clearTimeout(t);
  }, [total, selected.length]);

  const handle = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = true;
    if (!form.phone.trim()) errs.phone = true;
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) errs.email = true;
    if (!form.address.trim()) errs.address = true;
    if (!form.size) errs.size = true;
    if (!form.timeline) errs.timeline = true;
    if (form.company) return; // honeypot
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    const payload = { ...form, selectedServices: selected, estimatedTotal: total, submittedAt: new Date().toISOString() };
    console.log("[TheGarageFlip] Quote submission:", payload);
    setSubmitted(true);
  };

  const quoteInView = useInView("quote");

  return (
    <Section id="quote" style={{ position: "relative", padding: "100px 24px", background: C.dark, color: "#fff", overflow: "hidden" }}>
      <div aria-hidden="true" style={{ position: "absolute", top: "20%", left: "-10%", width: "60vw", height: "60vw", maxWidth: 700, maxHeight: 700, background: `radial-gradient(circle at center, rgba(242,107,31,0.24) 0%, transparent 60%)`, filter: "blur(40px)", pointerEvents: "none" }} />
      <Grain opacity={0.035} />
      <div style={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeader dark eyebrow="Build Your Custom Quote" title="Tell us what your garage needs." sub="Select the services you want. We'll follow up with a personalized estimate within 24 hours." />
        <div className="tgf-quote-grid" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 32, alignItems: "start" }}>
          {/* Services checkboxes */}
          <div>
            <div className="tgf-checkbox-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {SERVICES.map((s) => {
                const on = selected.includes(s.id);
                return (
                  <label key={s.id} onClick={() => toggle(s.id)} style={{
                    display: "flex", alignItems: "center", gap: 14, padding: "14px 16px",
                    background: on ? "rgba(242,107,31,0.1)" : "rgba(255,255,255,0.04)",
                    backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",
                    border: on ? `1px solid ${C.accent}` : "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 14, cursor: "pointer", transition: "all 0.2s ease",
                    boxShadow: on ? `inset 0 0 20px rgba(242,107,31,0.15)` : "none",
                  }}>
                    <div style={{ width: 22, height: 22, borderRadius: 6, border: on ? `2px solid ${C.accent}` : "2px solid rgba(255,255,255,0.25)", background: on ? C.accent : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s ease" }}>
                      {on && <Check size={14} color="#fff" strokeWidth={3} />}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14.5, fontWeight: 600, color: "#fff", marginBottom: 2 }}>{s.icon} {s.name}</div>
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: on ? C.accent : "rgba(255,255,255,0.55)", whiteSpace: "nowrap", letterSpacing: "0.02em" }}>{s.price}</div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Sticky summary + form */}
          <div className="tgf-summary-wrap" style={{ position: "sticky", top: 100 }}>
            <div style={{
              background: "rgba(20,20,24,0.5)", backdropFilter: "blur(24px) saturate(160%)", WebkitBackdropFilter: "blur(24px) saturate(160%)",
              border: "1px solid rgba(255,255,255,0.12)", borderRadius: 20, padding: 28,
            }}>
              {!submitted ? (
                <>
                  {/* Summary */}
                  <div style={{ marginBottom: 22, paddingBottom: 22, borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                    <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: 10 }}>Your selections</div>
                    {selected.length === 0 ? (
                      <div style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", fontStyle: "italic" }}>No services selected yet — pick any from the list.</div>
                    ) : (
                      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                        {selected.map((id) => {
                          const s = SERVICES.find((x) => x.id === id);
                          return (
                            <li key={id} style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "rgba(255,255,255,0.82)" }}>
                              <span>{s.icon} {s.name}</span>
                              <span style={{ color: "rgba(255,255,255,0.55)" }}>{s.price}</span>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                    <div style={{ marginTop: 18, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                      <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)" }}>Starting total</div>
                      <div style={{ fontFamily: FONT_DISPLAY, fontSize: 30, color: flash ? C.accent : "#fff", letterSpacing: "-0.02em", transform: flash ? "scale(1.06)" : "scale(1)", transition: "transform 0.3s ease, color 0.3s ease" }}>
                        ${total.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <FormInput label="Full Name" value={form.name} onChange={handle("name")} error={errors.name} />
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                      <FormInput label="Phone" value={form.phone} onChange={handle("phone")} error={errors.phone} type="tel" />
                      <FormInput label="Email" value={form.email} onChange={handle("email")} error={errors.email} type="email" />
                    </div>
                    <FormInput label="Service Address" value={form.address} onChange={handle("address")} error={errors.address} />
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                      <FormSelect label="Garage Size" value={form.size} onChange={handle("size")} error={errors.size}
                        options={[["", "Select size"], ["1-car", "1-car"], ["2-car", "2-car"], ["3-car", "3-car"], ["oversized", "Oversized"]]} />
                      <FormSelect label="Timeline" value={form.timeline} onChange={handle("timeline")} error={errors.timeline}
                        options={[["", "Select timeline"], ["asap", "ASAP"], ["2wk", "Within 2 weeks"], ["month", "Within a month"], ["exploring", "Just exploring"]]} />
                    </div>
                    <FormTextarea label="Notes (optional)" value={form.notes} onChange={handle("notes")} />
                    <input type="text" name="company" autoComplete="off" tabIndex={-1}
                      value={form.company} onChange={handle("company")}
                      style={{ position: "absolute", left: -9999, width: 1, height: 1, opacity: 0 }} aria-hidden="true" />
                    <button type="submit" style={{
                      background: GRADIENT_ORANGE, color: "#fff", border: "none", padding: "15px 20px",
                      borderRadius: 12, fontWeight: 700, fontSize: 15, cursor: "pointer", boxShadow: SHADOW_ORANGE,
                      marginTop: 6, letterSpacing: "0.01em", transition: "transform 0.2s ease",
                    }} onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-1px)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}>
                      Request My Free Estimate
                    </button>
                    <div style={{ textAlign: "center", fontSize: 13, color: "rgba(255,255,255,0.62)", marginTop: 4 }}>
                      Or call/text <a href={`tel:${BRAND.phoneTel}`} style={{ color: C.accent, fontWeight: 700, textDecoration: "none" }}>{BRAND.phone}</a>
                    </div>
                  </form>
                </>
              ) : (
                <div style={{ padding: "28px 8px", textAlign: "center" }}>
                  <div style={{ width: 64, height: 64, borderRadius: 999, background: GRADIENT_ORANGE, display: "inline-flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", boxShadow: SHADOW_ORANGE, animation: "tgfPop 0.4s ease" }}>
                    <Check size={32} color="#fff" strokeWidth={3} />
                  </div>
                  <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 26, letterSpacing: "-0.02em", color: "#fff", marginBottom: 10 }}>You're on the list.</h3>
                  <p style={{ fontSize: 15, color: "rgba(255,255,255,0.72)", lineHeight: 1.55, marginBottom: 20 }}>
                    We'll be in touch within 24 hours with your custom estimate.
                  </p>
                  <a href={`tel:${BRAND.phoneTel}`} style={{ color: C.accent, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
                    Need us sooner? Call {BRAND.phone}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile floating total pill */}
      {selected.length > 0 && !quoteInView && (
        <div className="tgf-mobile-total" style={{
          position: "fixed", bottom: 78, left: 16, right: 16, zIndex: 60,
          background: "rgba(20,20,24,0.88)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
          border: `1px solid ${C.accent}`, borderRadius: 999, padding: "12px 20px",
          display: "none", justifyContent: "space-between", alignItems: "center",
          boxShadow: SHADOW_ORANGE, color: "#fff",
        }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.72)" }}>{selected.length} selected</span>
          <span style={{ fontFamily: FONT_DISPLAY, fontSize: 18, color: C.accent }}>${total.toLocaleString()}</span>
        </div>
      )}
    </Section>
  );
}

function FormInput({ label, error, ...rest }) {
  return (
    <label style={{ display: "block" }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.64)", marginBottom: 6, letterSpacing: "0.04em", textTransform: "uppercase" }}>{label}</div>
      <input {...rest} style={{
        width: "100%", padding: "12px 14px", borderRadius: 10,
        background: "rgba(255,255,255,0.06)", color: "#fff", fontSize: 15,
        border: error ? `1.5px solid ${C.accent}` : "1px solid rgba(255,255,255,0.14)",
        outline: "none", transition: "border-color 0.2s ease, background 0.2s ease",
        fontFamily: FONT_BODY,
      }} onFocus={(e) => (e.currentTarget.style.borderColor = C.accent)}
        onBlur={(e) => (e.currentTarget.style.borderColor = error ? C.accent : "rgba(255,255,255,0.14)")} />
    </label>
  );
}

function FormSelect({ label, error, options, ...rest }) {
  return (
    <label style={{ display: "block" }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.64)", marginBottom: 6, letterSpacing: "0.04em", textTransform: "uppercase" }}>{label}</div>
      <select {...rest} style={{
        width: "100%", padding: "12px 14px", borderRadius: 10,
        background: "rgba(255,255,255,0.06)", color: "#fff", fontSize: 15,
        border: error ? `1.5px solid ${C.accent}` : "1px solid rgba(255,255,255,0.14)",
        outline: "none", fontFamily: FONT_BODY, appearance: "none", cursor: "pointer",
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'><path d='M1 1L6 6L11 1' stroke='white' stroke-opacity='0.6' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/></svg>")`,
        backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center", paddingRight: 36,
      }}>
        {options.map(([val, l]) => <option key={val} value={val} style={{ background: C.darkSoft, color: "#fff" }}>{l}</option>)}
      </select>
    </label>
  );
}

function FormTextarea({ label, ...rest }) {
  return (
    <label style={{ display: "block" }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.64)", marginBottom: 6, letterSpacing: "0.04em", textTransform: "uppercase" }}>{label}</div>
      <textarea {...rest} rows={3} style={{
        width: "100%", padding: "12px 14px", borderRadius: 10,
        background: "rgba(255,255,255,0.06)", color: "#fff", fontSize: 15,
        border: "1px solid rgba(255,255,255,0.14)",
        outline: "none", fontFamily: FONT_BODY, resize: "vertical",
      }} onFocus={(e) => (e.currentTarget.style.borderColor = C.accent)}
        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)")} />
    </label>
  );
}
// ─── WHY ─────────────────────────────────────────────────────────
function WhySection() {
  const items = [
    { icon: "🏆", title: "Premium Service", desc: "We're not a junk hauler. We're a transformation team." },
    { icon: "⚡", title: "Fast & Reliable", desc: "Most jobs completed in a single day." },
    { icon: "🤝", title: "One Call Does It All", desc: "Cleanout to full renovation — one company, one call." },
  ];
  return (
    <Section id="why" style={{ padding: "100px 24px", background: C.canvas }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeader eyebrow="Why The Garage Flip" title="Built for Orlando. Done right." />
        <div className="tgf-grid-why" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }}>
          {items.map((x) => (
            <div key={x.title} style={{
              background: "rgba(255,255,255,0.72)", backdropFilter: "blur(20px) saturate(180%)", WebkitBackdropFilter: "blur(20px) saturate(180%)",
              border: `1px solid ${C.border}`, borderRadius: 18, padding: 32, textAlign: "left",
              boxShadow: "0 2px 8px rgba(14,14,16,0.04)",
            }}>
              <div style={{ fontSize: 34, marginBottom: 16 }}>{x.icon}</div>
              <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 22, letterSpacing: "-0.02em", color: C.text, marginBottom: 10 }}>{x.title}</h3>
              <p style={{ fontSize: 15, color: C.textMuted, lineHeight: 1.6, margin: 0 }}>{x.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
// ─── TESTIMONIALS ────────────────────────────────────────────────
function Testimonials() {
  return (
    <Section style={{ padding: "100px 24px", background: C.band, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeader eyebrow="From the Neighborhood" title="What Orlando is saying." />
        <div className="tgf-grid-testimonials" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 22 }}>
          {TESTIMONIALS.map((t) => (
            <div key={t.name} style={{
              background: "rgba(255,255,255,0.88)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
              border: `1px solid ${C.border}`, borderRadius: 18, padding: 28,
              boxShadow: "0 2px 8px rgba(14,14,16,0.04)",
            }}>
              <div style={{ display: "flex", gap: 3, marginBottom: 14, color: C.accent }}>
                {[0, 1, 2, 3, 4].map((i) => <Star key={i} size={16} fill={C.accent} stroke={C.accent} />)}
              </div>
              <p style={{ fontSize: 16, color: C.text, lineHeight: 1.6, marginBottom: 18, fontWeight: 500 }}>"{t.quote}"</p>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 40, height: 40, borderRadius: 999, background: C.band, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: C.textMuted, fontSize: 14 }}>
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{t.name}</div>
                  <div style={{ fontSize: 13, color: C.textMuted }}>{t.area}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
// ─── FAQ ─────────────────────────────────────────────────────────
function FAQSection() {
  const [open, setOpen] = useState(0);
  return (
    <Section id="faq" style={{ padding: "100px 24px", background: C.canvas }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <SectionHeader eyebrow="FAQ" title="Questions worth asking." />
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} style={{
                background: C.panel, border: `1px solid ${isOpen ? "rgba(242,107,31,0.32)" : C.border}`,
                borderRadius: 14, overflow: "hidden", transition: "border-color 0.2s ease",
                boxShadow: isOpen ? "0 8px 24px rgba(14,14,16,0.06)" : "none",
              }}>
                <button onClick={() => setOpen(isOpen ? -1 : i)} style={{
                  width: "100%", background: "transparent", border: "none", padding: "20px 24px",
                  display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16,
                  cursor: "pointer", textAlign: "left", fontFamily: FONT_BODY,
                }}>
                  <span style={{ fontSize: 16, fontWeight: 600, color: C.text }}>{f.q}</span>
                  <ChevronDown size={20} color={C.textMuted} style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.25s ease", flexShrink: 0 }} />
                </button>
                <div style={{ maxHeight: isOpen ? 500 : 0, opacity: isOpen ? 1 : 0, transition: "max-height 0.3s ease, opacity 0.3s ease", overflow: "hidden" }}>
                  <div style={{ padding: "0 24px 22px", fontSize: 15, color: C.textMuted, lineHeight: 1.65 }}>
                    {f.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
// ─── FOOTER ──────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: C.dark, color: "rgba(255,255,255,0.72)", padding: "60px 24px 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="tgf-footer-grid" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: 40, marginBottom: 40 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <img src="/logo-transparent.png" alt="The Garage Flip" style={{ height: 36, width: "auto", filter: "brightness(0) invert(1)" }} />
              <span style={{ fontFamily: FONT_DISPLAY, fontSize: 18, letterSpacing: "-0.02em", color: "#fff" }}>THE GARAGE FLIP</span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.65, marginBottom: 20, maxWidth: 360 }}>
              Orlando's premium garage transformation service. Cleanouts, epoxy, cabinets, EV chargers, AC — one call does it all.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 14 }}>
              <a href={`tel:${BRAND.phoneTel}`} style={{ color: "rgba(255,255,255,0.88)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 10 }}><Phone size={15} /> {BRAND.phone}</a>
              <a href={`mailto:${BRAND.email}`} style={{ color: "rgba(255,255,255,0.88)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 10 }}><Mail size={15} /> {BRAND.email}</a>
              <div style={{ color: "rgba(255,255,255,0.72)", display: "inline-flex", alignItems: "center", gap: 10 }}><MapPin size={15} /> {BRAND.address}</div>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: 16 }}>Site</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10, fontSize: 14 }}>
              {[["Services", "services"], ["Packages", "packages"], ["Quote", "quote"], ["Why", "why"], ["FAQ", "faq"]].map(([l, id]) => (
                <li key={id}><a href={`#${id}`} onClick={(e) => { e.preventDefault(); scrollTo(id); }} style={{ color: "rgba(255,255,255,0.82)", textDecoration: "none" }}>{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: 16 }}>Service Area</div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.82)", lineHeight: 1.65, margin: 0 }}>
              Orlando · Winter Park · Windermere · Lake Nona · Dr. Phillips · College Park · Thornton Park · Baldwin Park
            </p>
          </div>
        </div>
        <div style={{ paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 12, fontSize: 13, color: "rgba(255,255,255,0.55)" }}>
          <div>© 2026 The Garage Flip. All rights reserved.</div>
          <div>Proudly Orlando-owned · Licensed & Insured</div>
        </div>
      </div>
    </footer>
  );
}
// ─── MOBILE STICKY CTA ───────────────────────────────────────────
function MobileStickyCTA() {
  const quoteInView = useInView("quote");
  if (quoteInView) return null;
  return (
    <div className="tgf-sticky-mobile" style={{
      position: "fixed", bottom: 12, left: 12, right: 12, zIndex: 80,
      background: "rgba(20,20,24,0.78)", backdropFilter: "blur(24px) saturate(160%)", WebkitBackdropFilter: "blur(24px) saturate(160%)",
      border: "1px solid rgba(255,255,255,0.12)", borderRadius: 999, padding: "10px 12px",
      display: "none", justifyContent: "space-between", alignItems: "center", gap: 10,
      boxShadow: "0 12px 36px rgba(0,0,0,0.3)",
    }}>
      <a href={`tel:${BRAND.phoneTel}`} aria-label="Call" style={{ flex: 1, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6, color: "#fff", textDecoration: "none", padding: "10px 8px", fontSize: 14, fontWeight: 600 }}>
        <Phone size={16} /> Call
      </a>
      <a href={`sms:${BRAND.phoneTel}`} aria-label="Text" style={{ flex: 1, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6, color: "#fff", textDecoration: "none", padding: "10px 8px", fontSize: 14, fontWeight: 600 }}>
        <MessageSquare size={16} /> Text
      </a>
      <button onClick={() => scrollTo("quote")} style={{
        flex: 1.2, background: GRADIENT_ORANGE, color: "#fff", border: "none",
        padding: "11px 14px", borderRadius: 999, fontWeight: 700, fontSize: 14, cursor: "pointer", boxShadow: SHADOW_ORANGE,
      }}>Get Quote</button>
    </div>
  );
}
// ─── GLOBAL STYLES (responsive + keyframes) ──────────────────────
function GlobalStyles() {
  return (
    <style>{`
      /* Display font defaults to 700 weight (Space Grotesk Bold) wherever used */
      h1, h2, h3 { font-weight: 700; }

      @keyframes tgfOrb {
        0%, 100% { transform: translate(0, 0) scale(1); }
        33% { transform: translate(-6%, 4%) scale(1.05); }
        66% { transform: translate(4%, -3%) scale(0.98); }
      }
      @keyframes tgfOrb2 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(6%, -4%) scale(1.08); }
      }
      @keyframes tgfPop {
        0% { transform: scale(0.6); opacity: 0; }
        60% { transform: scale(1.15); opacity: 1; }
        100% { transform: scale(1); opacity: 1; }
      }
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }

      /* Responsive */
      @media (max-width: 1024px) {
        .tgf-quote-grid { grid-template-columns: 1fr !important; }
        .tgf-summary-wrap { position: static !important; }
      }
      @media (max-width: 900px) {
        .tgf-grid-services { grid-template-columns: repeat(2, 1fr) !important; }
        .tgf-grid-packages { grid-template-columns: 1fr !important; }
        .tgf-grid-packages > div { transform: scale(1) !important; }
        .tgf-grid-why { grid-template-columns: 1fr !important; }
        .tgf-grid-testimonials { grid-template-columns: 1fr !important; }
        .tgf-footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
      }
      @media (max-width: 700px) {
        .tgf-grid-services { grid-template-columns: 1fr !important; }
        .tgf-checkbox-grid { grid-template-columns: 1fr !important; }
      }
      @media (max-width: 768px) {
        .tgf-nav-links { display: none !important; }
        .tgf-nav-hamburger { display: inline-flex !important; }
        .tgf-sticky-mobile { display: flex !important; }
        .tgf-mobile-total { display: flex !important; }
      }
    `}</style>
  );
}
