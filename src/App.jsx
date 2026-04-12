import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X, Phone, Mail, MapPin, ArrowRight, Check, ChevronDown, Trophy, Zap, Handshake } from "lucide-react";

// ─── COLOR PALETTE: "Premium Bold" ───
const C = {
  bg: "#f9f6f1",
  bgAlt: "#f0ede6",
  bgDark: "#1a1a1a",
  bgDarker: "#111111",
  text: "#1a1a1a",
  textMuted: "#5a5a52",
  textLight: "#8a8a82",
  accent: "#e85d04",
  accentHover: "#d14e00",
  accentLight: "#ff7b2e",
  accentBg: "rgba(232,93,4,0.08)",
  accentBorder: "rgba(232,93,4,0.25)",
  card: "#ffffff",
  cardBorder: "#e8e4dc",
  navBg: "rgba(249,246,241,0.94)",
  heroBg: "#1a1a1a",
  heroOverlay: "rgba(26,26,26,0.85)",
};

// ─── CONFIG ───
const BRAND = {
  name: "The Garage Flip",
  tagline: "Your Garage. Transformed.",
  phone: "(407) 555-0199",
  email: "hello@thegarageflip.com",
  address: "Orlando, FL",
};

// ─── FORM ENDPOINT ───
// Sign up free at formspree.io, create a form, and paste your form ID below.
// Submissions will go directly to your Gmail.
const FORMSPREE_ID = "xkokwnov";

// ─── SERVICES DATA ───
const SERVICES = [
  { id: "cleanout", icon: "\u{1F9F9}", title: "Garage Cleanout", desc: "Full removal of clutter, junk, and unwanted items. We handle the hauling so you don't have to.", price: 600 },
  { id: "organization", icon: "\u{1F3D7}\uFE0F", title: "Garage Organization", desc: "Custom sorting, shelving installation, and layout optimization for a space that actually works.", price: 400 },
  { id: "epoxy", icon: "\u{1F48E}", title: "Epoxy Floor Coating", desc: "Durable, showroom-quality epoxy floors that transform the look and feel of any garage.", price: 1500 },
  { id: "cabinets", icon: "\u{1F5C4}\uFE0F", title: "Cabinet Installation", desc: "Custom garage cabinetry for tools, gear, and storage — built to last.", price: 2000 },
  { id: "overhead", icon: "\u{1F4E6}", title: "Overhead Storage Racks", desc: "Maximize vertical space with heavy-duty overhead storage systems.", price: 400 },
  { id: "pressure", icon: "\u{1F6BF}", title: "Pressure Washing", desc: "Deep clean your garage floor, driveway, and exterior surfaces.", price: 200 },
  { id: "ev", icon: "\u26A1", title: "EV Charger Installation", desc: "Level 2 EV charger installation by licensed electricians. Future-proof your garage.", price: 800 },
  { id: "ac", icon: "\u2744\uFE0F", title: "Mini-Split AC/Heat", desc: "Keep your garage comfortable year-round with an efficient mini-split system.", price: 1500 },
  { id: "shelving", icon: "\u{1F527}", title: "Custom Shelving & Workbenches", desc: "Built-to-order shelving and workbench solutions for the serious hobbyist or professional.", price: 500 },
  { id: "pest", icon: "\u{1F41B}", title: "Pest Treatment", desc: "Garage-specific pest and rodent treatment before or after your cleanout.", price: 150 },
];

// ─── PACKAGES DATA ───
const PACKAGES = [
  {
    name: "The Reset",
    range: "$800 – $1,200",
    tagline: "Start fresh.",
    services: ["cleanout"],
    features: ["Full garage cleanout", "Junk hauling & disposal", "Basic sweep & cleanup", "Same-week scheduling"],
  },
  {
    name: "The Refresh",
    range: "$2,500 – $4,500",
    tagline: "The most popular transformation.",
    popular: true,
    services: ["cleanout", "epoxy", "shelving"],
    features: ["Everything in The Reset", "Epoxy floor coating", "Custom shelving install", "Before/after documentation", "Organization consultation"],
  },
  {
    name: "The Retreat",
    range: "$6,000 – $12,000",
    tagline: "The full transformation.",
    services: ["cleanout", "epoxy", "cabinets", "ac"],
    features: ["Everything in The Refresh", "Custom cabinet installation", "Mini-split AC/heat", "Lighting upgrade consultation", "Dedicated project manager"],
  },
];

// ─── SMOOTH SCROLL ───
function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

// ─── INTERSECTION OBSERVER ───
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, style = {} }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{
      ...style,
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
    }}>{children}</div>
  );
}

// ─── FORMAT CURRENCY ───
function fmt(n) {
  return "$" + n.toLocaleString();
}

// ─── HERO IMAGE ───
const HERO_IMG = "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=1920&q=80";

// ─── LOGO COMPONENT ───
function Logo({ height = 44, dark = true }) {
  return (
    <img
      src="/logo-transparent.png"
      alt="The Garage Flip"
      style={{
        height,
        width: "auto",
        objectFit: "contain",
        // On dark backgrounds: boost brightness so charcoal parts become visible
        filter: dark ? "none" : "brightness(1.8) contrast(0.9)",
      }}
    />
  );
}

// ─── NAVIGATION ───
function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [
    { label: "Services", id: "services" },
    { label: "Packages", id: "packages" },
    { label: "Get a Quote", id: "quote" },
    { label: "Why Us", id: "why" },
  ];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(249,246,241,0.65)" : "transparent",
      backdropFilter: scrolled ? "blur(28px) saturate(200%)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(28px) saturate(200%)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.5)" : "none",
      boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.04), inset 0 -1px 0 rgba(255,255,255,0.6)" : "none",
      transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
    }}>
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 76 }}>
        <div style={{ cursor: "pointer" }} onClick={() => scrollTo("hero")}>
          <Logo height={scrolled ? 40 : 46} dark={scrolled} />
        </div>

        <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {links.map(l => (
            <span key={l.id} onClick={() => scrollTo(l.id)} style={{
              cursor: "pointer", fontSize: 13, fontWeight: 600, letterSpacing: "0.6px",
              color: scrolled ? C.textMuted : "rgba(255,255,255,0.7)", textTransform: "uppercase",
              transition: "color 0.2s",
            }}
            onMouseEnter={e => e.target.style.color = C.accent}
            onMouseLeave={e => e.target.style.color = scrolled ? C.textMuted : "rgba(255,255,255,0.7)"}
            >{l.label}</span>
          ))}
          <button onClick={() => scrollTo("quote")} style={{
            padding: "11px 26px", borderRadius: 10, border: "none", cursor: "pointer",
            background: C.accent, color: "#fff", fontWeight: 700, fontSize: 12,
            letterSpacing: "1.2px", textTransform: "uppercase",
            transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
            boxShadow: "0 0 16px rgba(232,93,4,0.2), 0 2px 8px rgba(0,0,0,0.1)",
          }}
          onMouseEnter={e => { e.target.style.background = C.accentHover; e.target.style.transform = "translateY(-1px)"; }}
          onMouseLeave={e => { e.target.style.background = C.accent; e.target.style.transform = "translateY(0)"; }}
          >Get Free Quote</button>
        </div>

        <button onClick={() => setOpen(!open)} className="mobile-menu-btn" style={{
          display: "none", background: "none", border: "none", cursor: "pointer",
          color: scrolled ? C.text : "#fff",
        }}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {open && (
        <div style={{
          position: "absolute", top: 76, left: 0, right: 0,
          background: C.navBg, backdropFilter: "blur(20px)",
          padding: "24px 32px", display: "flex", flexDirection: "column", gap: 20,
          borderBottom: `1px solid ${C.cardBorder}`,
        }}>
          {links.map(l => (
            <span key={l.id} onClick={() => { scrollTo(l.id); setOpen(false); }}
              style={{ cursor: "pointer", fontSize: 14, fontWeight: 600, color: C.textMuted, letterSpacing: "0.5px", textTransform: "uppercase" }}>{l.label}</span>
          ))}
          <button onClick={() => { scrollTo("quote"); setOpen(false); }} style={{
            padding: "14px 28px", borderRadius: 6, border: "none", cursor: "pointer",
            background: C.accent, color: "#fff", fontWeight: 700, fontSize: 13,
            letterSpacing: "1px", textTransform: "uppercase", width: "100%",
          }}>Get Free Quote</button>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}

// ─── GLASS STYLE HELPERS ───
const glass = {
  card: {
    background: "rgba(255,255,255,0.55)",
    backdropFilter: "blur(24px) saturate(180%)",
    WebkitBackdropFilter: "blur(24px) saturate(180%)",
    border: "1px solid rgba(255,255,255,0.6)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8)",
  },
  cardDark: {
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(24px) saturate(180%)",
    WebkitBackdropFilter: "blur(24px) saturate(180%)",
    border: "1px solid rgba(255,255,255,0.12)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.08)",
  },
  glow: (color = C.accent) => ({
    boxShadow: `0 0 20px ${color}33, 0 0 60px ${color}11, 0 8px 32px rgba(0,0,0,0.1)`,
  }),
};

// ─── HERO ───
function Hero() {
  return (
    <section id="hero" style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden", padding: "120px 32px 80px",
    }}>
      {/* Background image */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url(${HERO_IMG})`,
        backgroundSize: "cover", backgroundPosition: "center",
        filter: "brightness(0.35) contrast(1.1)",
      }} />
      {/* Orange accent glow */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 20% 80%, rgba(232,93,4,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(232,93,4,0.08) 0%, transparent 50%)",
      }} />
      {/* Noise texture overlay */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.03,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }} />

      <div style={{ maxWidth: 900, textAlign: "center", position: "relative", zIndex: 1 }}>
        <FadeIn>
          <div style={{
            display: "inline-block", padding: "10px 24px", borderRadius: 100,
            ...glass.cardDark, marginBottom: 36,
          }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: C.accent, textTransform: "uppercase", letterSpacing: "3px" }}>
              Orlando's #1 Garage Cleanout Service
            </span>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 style={{
            fontSize: "clamp(42px, 7vw, 80px)", fontWeight: 900, color: "#fff",
            lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: 24,
          }}>
            We Clear It Out.<br />
            <span style={{ color: C.accent }}>You Get It Back.</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p style={{
            fontSize: "clamp(16px, 2vw, 20px)", color: "rgba(255,255,255,0.65)",
            lineHeight: 1.7, maxWidth: 620, margin: "0 auto 48px",
          }}>
            Garage cleanouts, junk removal, and full transformations — done in days, not weeks. One call handles everything from the clutter to the custom finish.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => scrollTo("quote")} style={{
              padding: "18px 40px", borderRadius: 12, border: "none", cursor: "pointer",
              background: C.accent, color: "#fff", fontWeight: 700, fontSize: 15,
              letterSpacing: "0.5px", display: "flex", alignItems: "center", gap: 10,
              transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
              ...glass.glow(C.accent),
            }}
            onMouseEnter={e => { e.currentTarget.style.background = C.accentHover; e.currentTarget.style.transform = "translateY(-3px) scale(1.02)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = C.accent; e.currentTarget.style.transform = "translateY(0) scale(1)"; }}
            >Book a Free Cleanout Quote <ArrowRight size={18} /></button>

            <button onClick={() => scrollTo("services")} style={{
              padding: "18px 40px", borderRadius: 12, cursor: "pointer",
              ...glass.cardDark,
              color: "rgba(255,255,255,0.85)", fontWeight: 600, fontSize: 15,
              letterSpacing: "0.5px", transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.14)"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "rgba(255,255,255,0.85)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >See All Services</button>
          </div>
        </FadeIn>

        <FadeIn delay={0.5}>
          <div style={{
            display: "inline-flex", gap: 1, marginTop: 72,
            borderRadius: 20, overflow: "hidden",
            ...glass.cardDark,
            padding: 0, border: "1px solid rgba(255,255,255,0.1)",
          }}>
            {[
              { val: "Same Week", label: "Scheduling" },
              { val: "Licensed", label: "& Insured" },
              { val: "One Call", label: "Does It All" },
            ].map((s, i) => (
              <div key={i} style={{
                textAlign: "center", padding: "20px 36px",
                borderRight: i < 2 ? "1px solid rgba(255,255,255,0.08)" : "none",
              }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: "#fff" }}>{s.val}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", fontWeight: 500, letterSpacing: "0.5px", marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── SERVICES ───
function ServicesSection() {
  return (
    <section id="services" style={{ padding: "100px 32px 120px", background: C.bg }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 64px" }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: C.accent, textTransform: "uppercase", letterSpacing: "3px" }}>Services</span>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 800, color: C.text, margin: "12px 0 16px", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              Cleanouts. Junk removal.<br />And everything after.
            </h2>
            <p style={{ fontSize: 17, color: C.textMuted, lineHeight: 1.7 }}>
              Start with a cleanout — then upgrade to a full transformation if you want. No pressure, just options.
            </p>
          </div>
        </FadeIn>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 20,
        }}>
          {SERVICES.map((s, i) => (
            <FadeIn key={s.id} delay={i * 0.05}>
              <div style={{
                ...glass.card, borderRadius: 16, padding: 28,
                height: "100%",
                transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)", cursor: "default",
                display: "flex", flexDirection: "column",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(232,93,4,0.3)"; e.currentTarget.style.transform = "translateY(-6px) scale(1.01)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9), 0 0 24px rgba(232,93,4,0.06)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)"; e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = glass.card.boxShadow; }}
              >
                <div style={{ fontSize: 32, marginBottom: 16 }}>{s.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: C.text, marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.65, flex: 1, marginBottom: 16 }}>{s.desc}</p>
                <div style={{ fontSize: 15, fontWeight: 700, color: C.accent }}>From {fmt(s.price)}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PACKAGES ───
function PackagesSection({ onSelectPackage }) {
  return (
    <section id="packages" style={{ padding: "100px 32px 120px", background: C.bgDark }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 64px" }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: C.accent, textTransform: "uppercase", letterSpacing: "3px" }}>Packages</span>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 800, color: "#fff", margin: "12px 0 16px", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              Transformation packages.
            </h2>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
              Pick a package or build your own custom quote below.
            </p>
          </div>
        </FadeIn>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 24, alignItems: "stretch",
        }}>
          {PACKAGES.map((pkg, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{
                ...glass.cardDark,
                background: pkg.popular ? "rgba(232,93,4,0.08)" : "rgba(255,255,255,0.05)",
                borderRadius: 20, padding: 36,
                border: pkg.popular ? `1.5px solid rgba(232,93,4,0.4)` : "1px solid rgba(255,255,255,0.1)",
                position: "relative", display: "flex", flexDirection: "column", height: "100%",
                transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
                ...(pkg.popular ? glass.glow(C.accent) : {}),
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px) scale(1.01)"; e.currentTarget.style.borderColor = pkg.popular ? C.accent : "rgba(255,255,255,0.2)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.borderColor = pkg.popular ? "rgba(232,93,4,0.4)" : "rgba(255,255,255,0.1)"; }}
              >
                {pkg.popular && (
                  <div style={{
                    position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
                    background: C.accent, color: "#fff", padding: "6px 20px", borderRadius: 100,
                    fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase",
                  }}>Most Popular</div>
                )}

                <h3 style={{ fontSize: 24, fontWeight: 800, color: "#fff", marginBottom: 4 }}>{pkg.name}</h3>
                <div style={{ fontSize: 28, fontWeight: 800, color: C.accent, marginBottom: 8 }}>{pkg.range}</div>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginBottom: 28, fontStyle: "italic" }}>{pkg.tagline}</p>

                <div style={{ flex: 1, marginBottom: 28 }}>
                  {pkg.features.map((f, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12 }}>
                      <Check size={16} style={{ color: C.accent, flexShrink: 0, marginTop: 2 }} />
                      <span style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>{f}</span>
                    </div>
                  ))}
                </div>

                <button onClick={() => onSelectPackage(pkg.services)} style={{
                  width: "100%", padding: "16px 24px", borderRadius: 12, cursor: "pointer",
                  background: pkg.popular ? C.accent : "rgba(255,255,255,0.06)",
                  border: pkg.popular ? "none" : "1px solid rgba(255,255,255,0.15)",
                  color: pkg.popular ? "#fff" : "rgba(255,255,255,0.8)",
                  fontWeight: 700, fontSize: 14, letterSpacing: "0.5px",
                  transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                  ...(pkg.popular ? glass.glow(C.accent) : {}),
                }}
                onMouseEnter={e => { e.currentTarget.style.background = pkg.popular ? C.accentHover : "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = pkg.popular ? C.accent : "rgba(255,255,255,0.06)"; e.currentTarget.style.color = pkg.popular ? "#fff" : "rgba(255,255,255,0.8)"; e.currentTarget.style.transform = "translateY(0)"; }}
                >Get This Package</button>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── QUOTE BUILDER ───
function QuoteBuilder({ selectedServices, setSelectedServices }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", garageSize: "", timeline: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const toggle = useCallback((id) => {
    setSelectedServices(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  }, [setSelectedServices]);

  const total = SERVICES.filter(s => selectedServices.includes(s.id)).reduce((sum, s) => sum + s.price, 0);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = true;
    if (!form.phone.trim()) errs.phone = true;
    if (!form.email.trim() || !form.email.includes("@")) errs.email = true;
    if (!form.address.trim()) errs.address = true;
    if (!form.garageSize) errs.garageSize = true;
    if (selectedServices.length === 0) errs.services = true;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);

    const selectedNames = SERVICES.filter(s => selectedServices.includes(s.id)).map(s => `${s.title} (${fmt(s.price)})`);
    const payload = {
      ...form,
      services: selectedNames.join(", "),
      estimatedTotal: fmt(total),
      _subject: `New Quote Request from ${form.name} — ${fmt(total)}`,
    };

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        // Fallback: open mailto with form data
        const body = Object.entries(payload).map(([k, v]) => `${k}: ${v}`).join("\n");
        window.open(`mailto:${BRAND.email}?subject=${encodeURIComponent(payload._subject)}&body=${encodeURIComponent(body)}`);
        setSubmitted(true);
      }
    } catch {
      // Fallback: open mailto
      const body = Object.entries(payload).map(([k, v]) => `${k}: ${v}`).join("\n");
      window.open(`mailto:${BRAND.email}?subject=${encodeURIComponent(payload._subject)}&body=${encodeURIComponent(body)}`);
      setSubmitted(true);
    } finally {
      setSending(false);
    }
  };

  const inputStyle = (field) => ({
    width: "100%", padding: "14px 16px", borderRadius: 12, fontSize: 15,
    border: `1px solid ${errors[field] ? "#e85d04" : "rgba(255,255,255,0.5)"}`,
    background: "rgba(255,255,255,0.5)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    color: C.text, outline: "none",
    transition: "all 0.25s",
    fontFamily: "inherit",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)",
  });

  const labelStyle = { fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 6, display: "block" };

  if (submitted) {
    return (
      <section id="quote" style={{ padding: "100px 32px 120px", background: C.bg }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <FadeIn>
            <div style={{ fontSize: 64, marginBottom: 24 }}>&#x1F389;</div>
            <h2 style={{ fontSize: 36, fontWeight: 800, color: C.text, marginBottom: 16 }}>You're on the list.</h2>
            <p style={{ fontSize: 18, color: C.textMuted, lineHeight: 1.7, marginBottom: 32 }}>
              We'll be in touch within 24 hours with your custom estimate.
            </p>
            <p style={{ fontSize: 16, color: C.textMuted }}>
              <Phone size={16} style={{ display: "inline", verticalAlign: "middle", marginRight: 6 }} />
              Or call/text us directly: <a href={`tel:${BRAND.phone}`} style={{ color: C.accent, fontWeight: 700, textDecoration: "none" }}>{BRAND.phone}</a>
            </p>
          </FadeIn>
        </div>
      </section>
    );
  }

  return (
    <section id="quote" style={{ padding: "100px 32px 120px", background: C.bg }}>
      <div style={{ maxWidth: 880, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 56px" }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: C.accent, textTransform: "uppercase", letterSpacing: "3px" }}>Quote Builder</span>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 800, color: C.text, margin: "12px 0 16px", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              Build your custom quote.
            </h2>
            <p style={{ fontSize: 17, color: C.textMuted, lineHeight: 1.7 }}>
              Select the services you need. We'll follow up with your personalized estimate within 24 hours.
            </p>
          </div>
        </FadeIn>

        <form onSubmit={handleSubmit}>
          {/* Service checkboxes */}
          <FadeIn delay={0.05}>
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 12,
              marginBottom: 32,
            }}>
              {SERVICES.map(s => {
                const checked = selectedServices.includes(s.id);
                return (
                  <label key={s.id} style={{
                    display: "flex", alignItems: "center", gap: 14, padding: "16px 18px",
                    borderRadius: 10, cursor: "pointer",
                    background: checked ? C.accentBg : C.card,
                    border: `1.5px solid ${checked ? C.accent : C.cardBorder}`,
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={e => { if (!checked) e.currentTarget.style.borderColor = C.accentBorder; }}
                  onMouseLeave={e => { if (!checked) e.currentTarget.style.borderColor = C.cardBorder; }}
                  >
                    <div style={{
                      width: 22, height: 22, borderRadius: 6, flexShrink: 0,
                      border: `2px solid ${checked ? C.accent : "#ccc"}`,
                      background: checked ? C.accent : "transparent",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "all 0.2s",
                    }}>
                      {checked && <Check size={14} color="#fff" strokeWidth={3} />}
                    </div>
                    <input type="checkbox" checked={checked} onChange={() => toggle(s.id)} style={{ display: "none" }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 15, fontWeight: 600, color: C.text }}>{s.icon} {s.title}</div>
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: C.accent, whiteSpace: "nowrap" }}>from {fmt(s.price)}</div>
                  </label>
                );
              })}
            </div>
          </FadeIn>

          {/* Live total */}
          {errors.services && (
            <p style={{ textAlign: "center", color: C.accent, fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Please select at least one service.</p>
          )}
          <FadeIn delay={0.1}>
            <div style={{
              textAlign: "center", padding: "20px 32px", borderRadius: 12,
              background: C.bgDark, marginBottom: 48,
            }}>
              <span style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>Estimated Starting Total</span>
              <div style={{ fontSize: 40, fontWeight: 800, color: "#fff", marginTop: 4 }}>
                {total > 0 ? fmt(total) : "—"}
              </div>
            </div>
          </FadeIn>

          {/* Contact form */}
          <FadeIn delay={0.15}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
              <div>
                <label style={labelStyle}>Full Name *</label>
                <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle("name")} placeholder="John Smith" />
              </div>
              <div>
                <label style={labelStyle}>Phone Number *</label>
                <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} style={inputStyle("phone")} placeholder="(407) 555-1234" />
              </div>
              <div>
                <label style={labelStyle}>Email Address *</label>
                <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={inputStyle("email")} placeholder="you@email.com" />
              </div>
              <div>
                <label style={labelStyle}>Address (for estimate) *</label>
                <input type="text" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} style={inputStyle("address")} placeholder="123 Main St, Orlando, FL" />
              </div>
              <div>
                <label style={labelStyle}>Garage Size *</label>
                <select value={form.garageSize} onChange={e => setForm({ ...form, garageSize: e.target.value })} style={{ ...inputStyle("garageSize"), appearance: "auto" }}>
                  <option value="">Select size...</option>
                  <option value="1-car">1-Car Garage</option>
                  <option value="2-car">2-Car Garage</option>
                  <option value="3-car">3-Car Garage</option>
                  <option value="oversized">Oversized</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Timeline</label>
                <select value={form.timeline} onChange={e => setForm({ ...form, timeline: e.target.value })} style={{ ...inputStyle("timeline"), appearance: "auto" }}>
                  <option value="">Select timeline...</option>
                  <option value="asap">ASAP</option>
                  <option value="2weeks">Within 2 weeks</option>
                  <option value="month">Within a month</option>
                  <option value="exploring">Just exploring</option>
                </select>
              </div>
            </div>
            <div style={{ marginBottom: 28 }}>
              <label style={labelStyle}>Additional Notes</label>
              <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} rows={3}
                style={{ ...inputStyle("notes"), resize: "vertical" }} placeholder="Anything else we should know about your garage project?" />
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <button type="submit" disabled={sending} style={{
              width: "100%", padding: "20px 32px", borderRadius: 14, border: "none", cursor: sending ? "wait" : "pointer",
              background: sending ? C.accentHover : C.accent, color: "#fff", fontWeight: 700, fontSize: 17,
              letterSpacing: "0.5px", transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
              ...glass.glow(C.accent), opacity: sending ? 0.7 : 1,
            }}
            onMouseEnter={e => { if (!sending) { e.currentTarget.style.background = C.accentHover; e.currentTarget.style.transform = "translateY(-3px) scale(1.01)"; } }}
            onMouseLeave={e => { if (!sending) { e.currentTarget.style.background = C.accent; e.currentTarget.style.transform = "translateY(0) scale(1)"; } }}
            >{sending ? "Sending..." : "Request My Free Estimate"}</button>

            <p style={{ textAlign: "center", marginTop: 20, fontSize: 15, color: C.textMuted }}>
              <Phone size={15} style={{ display: "inline", verticalAlign: "middle", marginRight: 6 }} />
              Or call/text us directly: <a href={`tel:${BRAND.phone}`} style={{ color: C.accent, fontWeight: 700, textDecoration: "none" }}>{BRAND.phone}</a>
            </p>
          </FadeIn>
        </form>

        <style>{`
          @media (max-width: 680px) {
            form > div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  );
}

// ─── WHY THE GARAGE FLIP ───
function WhySection() {
  const items = [
    { icon: <Trophy size={32} />, title: "Premium Service", desc: "We're not a junk hauler. We're a transformation team." },
    { icon: <Zap size={32} />, title: "Fast & Reliable", desc: "Most jobs completed in a single day." },
    { icon: <Handshake size={32} />, title: "One Call Does It All", desc: "Cleanout to full renovation — one company, one call." },
  ];

  return (
    <section id="why" style={{ padding: "100px 32px 120px", background: C.bgAlt }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: C.accent, textTransform: "uppercase", letterSpacing: "3px" }}>Why The Garage Flip</span>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 800, color: C.text, margin: "12px 0 0", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              We do things differently.
            </h2>
          </div>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32 }}>
          {items.map((item, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{
                textAlign: "center", padding: "40px 32px", borderRadius: 20,
                ...glass.card,
                transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = glass.card.boxShadow; }}
              >
                <div style={{ color: C.accent, marginBottom: 20, display: "flex", justifyContent: "center" }}>{item.icon}</div>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: C.text, marginBottom: 12 }}>{item.title}</h3>
                <p style={{ fontSize: 16, color: C.textMuted, lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───
function Footer() {
  return (
    <footer style={{ background: C.bgDarker, padding: "64px 32px 40px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 48, marginBottom: 48 }}>
          <div>
            <Logo height={38} dark={false} />
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", lineHeight: 1.7, marginTop: 16 }}>
              Premium garage transformations for Orlando homeowners. We clear it out, build it up, and give you your space back.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 20 }}>Navigate</h4>
            {["Services", "Packages", "Get a Quote"].map(l => (
              <div key={l} onClick={() => scrollTo(l === "Get a Quote" ? "quote" : l.toLowerCase())} style={{
                cursor: "pointer", fontSize: 14, color: "rgba(255,255,255,0.4)", marginBottom: 12,
                transition: "color 0.2s",
              }}
              onMouseEnter={e => e.target.style.color = C.accent}
              onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.4)"}
              >{l}</div>
            ))}
          </div>

          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 20 }}>Contact</h4>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <Phone size={14} color={C.accent} />
              <a href={`tel:${BRAND.phone}`} style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>{BRAND.phone}</a>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <Mail size={14} color={C.accent} />
              <a href={`mailto:${BRAND.email}`} style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>{BRAND.email}</a>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <MapPin size={14} color={C.accent} />
              <span style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>{BRAND.address}</span>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 20 }}>Get Started</h4>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", lineHeight: 1.7, marginBottom: 20 }}>
              Build your custom quote and see why Orlando homeowners choose The Garage Flip.
            </p>
            <button onClick={() => scrollTo("quote")} style={{
              padding: "12px 24px", borderRadius: 6, border: "none", cursor: "pointer",
              background: C.accent, color: "#fff", fontWeight: 700, fontSize: 13,
              letterSpacing: "0.5px", transition: "all 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = C.accentHover}
            onMouseLeave={e => e.currentTarget.style.background = C.accent}
            >Build Your Quote</button>
          </div>
        </div>

        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24,
          display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12,
        }}>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.25)" }}>&copy; 2026 The Garage Flip. All rights reserved.</span>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.25)" }}>Orlando &middot; Winter Park &middot; College Park &middot; Lake Nona &amp; Beyond</span>
        </div>
      </div>
    </footer>
  );
}

// ─── APP ───
export default function App() {
  const [selectedServices, setSelectedServices] = useState([]);

  const handleSelectPackage = useCallback((serviceIds) => {
    setSelectedServices(serviceIds);
    setTimeout(() => scrollTo("quote"), 100);
  }, []);

  return (
    <>
      <Nav />
      <Hero />
      <ServicesSection />
      <PackagesSection onSelectPackage={handleSelectPackage} />
      <QuoteBuilder selectedServices={selectedServices} setSelectedServices={setSelectedServices} />
      <WhySection />
      <Footer />
    </>
  );
}
