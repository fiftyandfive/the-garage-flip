import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X, Phone, Mail, MapPin, ArrowRight, Check, ChevronDown, Trophy, Zap, Handshake, Shield, Clock, Star, ChevronUp } from "lucide-react";

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
  phone: "(407) 735-6450",
  email: "hello@thegarageflip.com",
  address: "Orlando, FL",
};

// ─── FORM ENDPOINT ───
// Sign up free at formspree.io, create a form, and paste your form ID below.
// Submissions will go directly to your Gmail.
const FORMSPREE_ID = "xkokwnov";

// ─── SERVICES DATA ───
const SERVICES = [
  { id: "cleanout", icon: "\u{1F9F9}", title: "Garage Cleanout", desc: "We haul out the junk, the clutter, the 10 years of 'I'll deal with it later.' You get your space back.", price: 500 },
  { id: "organization", icon: "\u{1F4CB}", title: "Organization & Sorting", desc: "Everything gets a home. Tools, holiday decor, sports gear — sorted, labeled, and easy to find.", price: 400 },
  { id: "flooring", icon: "\u{1F48E}", title: "Premium Flooring", desc: "The floor upgrade that makes your neighbor ask who did your garage. Clean, polished, built to last.", price: 1500 },
  { id: "storage", icon: "\u{1F4E6}", title: "Smart Storage Systems", desc: "Overhead racks, wall-mounted systems, and shelving that turns dead space into usable square footage.", price: 400 },
  { id: "shelving", icon: "\u{1F527}", title: "Shelving & Workbenches", desc: "Built-to-order setups for the weekend warrior, hobbyist, or anyone who needs a real workspace.", price: 500 },
  { id: "pressure", icon: "\u{1F6BF}", title: "Pressure Washing", desc: "Deep clean your garage floor, driveway, and exterior. The first thing guests see — make it count.", price: 200 },
  { id: "ev", icon: "\u26A1", title: "EV Charger Install", desc: "Level 2 charger installed by licensed electricians. Pull in, plug in, wake up fully charged.", price: 800 },
  { id: "ac", icon: "\u2744\uFE0F", title: "Climate Control", desc: "Mini-split AC and heat so your garage is comfortable year-round. Your new favorite room in the house.", price: 1500 },
  { id: "lighting", icon: "\u{1F4A1}", title: "LED Lighting Upgrade", desc: "Bright, clean lighting that makes the whole space feel finished. No more working in the dark.", price: 300 },
  { id: "pest", icon: "\u{1F41B}", title: "Pest Treatment", desc: "Garage-specific pest and rodent treatment. Clear it out before you build it up.", price: 150 },
];

// ─── PACKAGES DATA (4-TIER OFFER LADDER) ───
const PACKAGES = [
  {
    name: "The Reset",
    range: "$500 – $1,500",
    tagline: "The cleanest garage on your street.",
    services: ["cleanout", "organization"],
    features: ["Full garage cleanout & junk hauling", "Organization & sorting", "Pressure wash & sweep", "Same-week scheduling"],
  },
  {
    name: "The Upgrade",
    range: "$2,000 – $6,000",
    tagline: "Your house just became the hangout spot.",
    popular: true,
    services: ["cleanout", "organization", "flooring", "storage"],
    features: ["Everything in The Reset", "Premium flooring install", "Smart storage systems", "Shelving & workbench setup", "Before/after documentation"],
  },
  {
    name: "The Full Flip",
    range: "$7,000 – $20,000+",
    tagline: "Your wife stops complaining about the clutter.",
    services: ["cleanout", "organization", "flooring", "storage", "ac", "lighting"],
    features: ["Everything in The Upgrade", "Climate control (AC/heat)", "LED lighting upgrade", "EV charger ready", "Custom layout design", "Dedicated project manager"],
  },
];

// ─── RECURRING / MAINTENANCE ADD-ONS ───
const RECURRING_FEATURES = [
  { title: "Seasonal Re-Org", desc: "Quarterly garage tune-up. Swap seasonal gear, re-sort, keep it dialed.", price: "$149/quarter" },
  { title: "Monthly Maintenance", desc: "Monthly cleaning, pest check, and touch-ups. Your garage stays showroom-ready.", price: "$99/month" },
  { title: "Add-On Projects", desc: "Gym setup, workshop build-out, lighting upgrades, holiday storage systems — whatever's next.", price: "Custom quote" },
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

// ─── HERO IMAGES (rotating) ───
const HERO_IMGS = [
  "https://images.unsplash.com/photo-1635108198395-82a67cd5eaec?w=1920&q=80",
  "https://images.unsplash.com/photo-1635108198854-26645ffe6714?w=1920&q=80",
  "https://images.unsplash.com/photo-1642948815603-2358193c3241?w=1920&q=80",
  "https://images.unsplash.com/photo-1619335680796-54f13b88c6ba?w=1920&q=80",
  "https://images.unsplash.com/photo-1586582636676-9ca2d4cedb9a?w=1920&q=80",
];

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
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 120 }}>
        <div style={{ cursor: "pointer" }} onClick={() => scrollTo("hero")}>
          <Logo height={scrolled ? 90 : 100} dark={scrolled} />
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
          position: "absolute", top: 120, left: 0, right: 0,
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
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % HERO_IMGS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden", padding: "120px 32px 80px",
      background: C.bgDark,
    }}>
      {/* Rotating background images with crossfade */}
      {HERO_IMGS.map((img, i) => (
        <div key={i} style={{
          position: "absolute", inset: 0, background: C.bgDark,
          backgroundImage: `url(${img})`,
          backgroundSize: "cover", backgroundPosition: "center",
          filter: "brightness(0.3) contrast(1.15) saturate(0.8)",
          opacity: i === current ? 1 : 0,
          transition: "opacity 1.5s ease-in-out",
        }} />
      ))}
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
              Orlando's Garage Transformation Experts
            </span>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 style={{
            fontSize: "clamp(42px, 7vw, 80px)", fontWeight: 900, color: "#fff",
            lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: 24,
          }}>
            From Chaos.<br />
            <span style={{ color: C.accent }}>To Clean.</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p style={{
            fontSize: "clamp(16px, 2vw, 20px)", color: "rgba(255,255,255,0.65)",
            lineHeight: 1.7, maxWidth: 620, margin: "0 auto 48px",
          }}>
            Junk removal, deep cleaning, and full garage transformations for Orlando homeowners. We show up, clear it out, and leave it spotless.
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

        {/* Image carousel dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 32 }}>
          {HERO_IMGS.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} style={{
              width: i === current ? 24 : 8, height: 8,
              borderRadius: 100, border: "none", cursor: "pointer",
              background: i === current ? C.accent : "rgba(255,255,255,0.25)",
              transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
            }} />
          ))}
        </div>
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
              Everything between "I can't park in here"<br />and "come check out my garage."
            </h2>
            <p style={{ fontSize: 17, color: C.textMuted, lineHeight: 1.7 }}>
              Start with a cleanout. Upgrade to a full transformation when you're ready. No pressure — just options that actually get used.
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
              Pick your level of transformation.
            </h2>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
              Most people start with a cleanout. The smart ones come back for the full flip.
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

// ─── RECURRING / KEEP IT CLEAN ───
function RecurringSection() {
  return (
    <section style={{ padding: "80px 32px 100px", background: C.bgDarker }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 48px" }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: C.accent, textTransform: "uppercase", letterSpacing: "3px" }}>Keep It Clean</span>
            <h2 style={{ fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 800, color: "#fff", margin: "12px 0 16px", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              Don't let it slide back to chaos.
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>
              We didn't transform your garage just for it to become a storage unit again. Stay on top of it.
            </p>
          </div>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {RECURRING_FEATURES.map((item, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div style={{
                ...glass.cardDark,
                borderRadius: 16, padding: 28, height: "100%",
                display: "flex", flexDirection: "column",
                transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(232,93,4,0.3)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <h3 style={{ fontSize: 20, fontWeight: 800, color: "#fff", marginBottom: 8 }}>{item.title}</h3>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, flex: 1, marginBottom: 16 }}>{item.desc}</p>
                <div style={{ fontSize: 18, fontWeight: 800, color: C.accent }}>{item.price}</div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <button onClick={() => scrollTo("quote")} style={{
              padding: "16px 36px", borderRadius: 12, border: "none", cursor: "pointer",
              background: C.accent, color: "#fff", fontWeight: 700, fontSize: 15,
              transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
              ...glass.glow(C.accent),
            }}
            onMouseEnter={e => { e.currentTarget.style.background = C.accentHover; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = C.accent; e.currentTarget.style.transform = "translateY(0)"; }}
            >Ask About Maintenance Plans</button>
          </div>
        </FadeIn>
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
    { icon: <Trophy size={32} />, title: "The Cleanest Garage on Your Street", desc: "Your neighbors will ask what happened. That's the whole point." },
    { icon: <Zap size={32} />, title: "Done in Days, Not Weeks", desc: "Most cleanouts done same week. Full transformations in under 5 days." },
    { icon: <Handshake size={32} />, title: "One Call. Everything Handled.", desc: "Cleanout, upgrade, maintenance — one team, one number, zero headaches." },
  ];

  return (
    <section id="why" style={{ padding: "100px 32px 120px", background: C.bgAlt }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: C.accent, textTransform: "uppercase", letterSpacing: "3px" }}>Why The Garage Flip</span>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 800, color: C.text, margin: "12px 0 0", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              Park your car in your garage again.
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

// ─── FAQ SECTION ───
const FAQ_DATA = [
  {
    q: "How much does a garage cleanout cost in Orlando?",
    a: "Our Reset package starts at $500 for a full garage cleanout — that includes junk removal, hauling, disposal, organization, and a clean sweep. Larger garages or heavy situations may run $1,000–$1,500. Free estimates with same-week scheduling."
  },
  {
    q: "Can I just get a cleanout without a full transformation?",
    a: "Absolutely. Most people start with The Reset ($500–$1,500) — just a cleanout and organization. No upsell pressure. If you want to upgrade to flooring, storage, or a full flip later, we're here. But a clean garage is a great garage."
  },
  {
    q: "How long does a full garage transformation take?",
    a: "Cleanouts are usually same-week, often same-day. Partial upgrades (The Upgrade tier) take 2–3 days. A Full Flip with climate control, flooring, lighting, and storage runs about 3–5 days depending on the scope."
  },
  {
    q: "What areas do you serve near Orlando?",
    a: "We serve the greater Orlando metro including Winter Park, Windermere, Lake Nona, Dr. Phillips, College Park, Baldwin Park, Celebration, Lake Mary, Horizon West, and surrounding communities."
  },
  {
    q: "Do you install EV chargers?",
    a: "Yes — Level 2 EV charger installation by licensed electricians starting at $800. We handle permitting, panel upgrades if needed, and full installation. It's a popular add-on to any package."
  },
  {
    q: "Do you offer maintenance plans?",
    a: "Yes. After your transformation, we offer quarterly seasonal re-orgs ($149/quarter) and monthly maintenance plans ($99/month) so your garage stays dialed. We also do add-on projects like gym setups, workshop builds, and lighting upgrades."
  },
  {
    q: "What's included in The Full Flip?",
    a: "Everything — cleanout, organization, premium flooring, smart storage systems, climate control, LED lighting, EV charger prep, custom layout design, and a dedicated project manager. Starts at $7,000 and goes up based on your vision. This is the one that makes your neighbors jealous."
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        ...glass.card,
        borderRadius: 14,
        overflow: "hidden",
        transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
        cursor: "pointer",
      }}
      onClick={() => setOpen(!open)}
      onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(232,93,4,0.25)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)"; }}
    >
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "20px 24px", gap: 16,
      }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: C.text, lineHeight: 1.4, margin: 0 }}>{q}</h3>
        <ChevronDown
          size={20}
          style={{
            color: C.accent, flexShrink: 0,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
      </div>
      <div style={{
        maxHeight: open ? 300 : 0,
        overflow: "hidden",
        transition: "max-height 0.4s cubic-bezier(0.16,1,0.3,1)",
      }}>
        <p style={{
          padding: "0 24px 20px", fontSize: 15, color: C.textMuted, lineHeight: 1.7, margin: 0,
        }}>{a}</p>
      </div>
    </div>
  );
}

function FAQSection() {
  return (
    <section id="faq" style={{ padding: "100px 32px 120px", background: C.bg }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 56px" }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: C.accent, textTransform: "uppercase", letterSpacing: "3px" }}>FAQ</span>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 800, color: C.text, margin: "12px 0 16px", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              Questions homeowners ask.
            </h2>
            <p style={{ fontSize: 17, color: C.textMuted, lineHeight: 1.7 }}>
              Everything you need to know before booking your garage cleanout or transformation.
            </p>
          </div>
        </FadeIn>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {FAQ_DATA.map((item, i) => (
            <FadeIn key={i} delay={i * 0.04}>
              <FAQItem q={item.q} a={item.a} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SERVICE AREAS (HIGH-INCOME NEIGHBORHOODS) ───
const SERVICE_AREAS = [
  {
    city: "Winter Park",
    desc: "Premium garage transformations for Winter Park's historic homes and luxury estates. Slatwall systems, epoxy floors, and full cleanouts tailored to homes on Park Avenue, Via Tuscany, and beyond.",
  },
  {
    city: "Windermere",
    desc: "Serving Windermere's lakefront properties and gated communities like Isleworth and Keene's Pointe. Oversized 3- and 4-car garage transformations are our specialty here.",
  },
  {
    city: "Dr. Phillips",
    desc: "Garage cleanouts and premium upgrades for Dr. Phillips homeowners. From Bay Hill estates to Sand Lake corridor, we turn cluttered garages into showrooms.",
  },
  {
    city: "Lake Nona",
    desc: "Lake Nona's modern homes deserve modern garages. EV charger installs, smart organization, and epoxy floors for Orlando's fastest-growing premium community.",
  },
  {
    city: "College Park",
    desc: "Bungalow and mid-century garage makeovers in one of Orlando's most desirable neighborhoods. Cleanouts, organization, and custom shelving built for character homes.",
  },
  {
    city: "Baldwin Park",
    desc: "Full-service garage transformations for Baldwin Park's walkable village community. From townhome single-car garages to detached estates — we handle it all.",
  },
  {
    city: "Celebration",
    desc: "Disney-area homeowners trust The Garage Flip for HOA-friendly garage makeovers. Clean, organized, and camera-ready — the Celebration standard.",
  },
  {
    city: "Lake Mary",
    desc: "Garage cleanouts and full transformations for Lake Mary's growing family communities. From Colonial TownPark to Heathrow — organized garages for organized lives.",
  },
  {
    city: "Horizon West",
    desc: "New construction meets premium garage upgrades in one of Orlando's fastest-growing luxury corridors. Epoxy floors, EV chargers, and smart storage from day one.",
  },
];

function ServiceAreaSection() {
  return (
    <section id="areas" style={{ padding: "100px 32px 120px", background: C.bgDark }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", maxWidth: 700, margin: "0 auto 64px" }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: C.accent, textTransform: "uppercase", letterSpacing: "3px" }}>Service Areas</span>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 800, color: "#fff", margin: "12px 0 16px", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              Serving Orlando's most sought-after neighborhoods.
            </h2>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
              From Winter Park estates to Windermere lakefronts — we bring premium garage transformations to the communities that value their homes most.
            </p>
          </div>
        </FadeIn>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
          gap: 20,
        }}>
          {SERVICE_AREAS.map((area, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div style={{
                ...glass.cardDark,
                borderRadius: 16, padding: 28,
                transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
                height: "100%", display: "flex", flexDirection: "column",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(232,93,4,0.3)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ marginBottom: 12 }}>
                  <h3 style={{ fontSize: 22, fontWeight: 800, color: "#fff", margin: 0 }}>
                    <MapPin size={18} style={{ display: "inline", verticalAlign: "middle", marginRight: 8, color: C.accent }} />
                    {area.city}
                  </h3>
                </div>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, flex: 1, marginBottom: 16 }}>{area.desc}</p>
                <button onClick={() => scrollTo("quote")} style={{
                  padding: "12px 20px", borderRadius: 10, cursor: "pointer",
                  background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
                  color: "rgba(255,255,255,0.7)", fontWeight: 600, fontSize: 13,
                  transition: "all 0.25s", width: "100%",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(232,93,4,0.15)"; e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
                >Get a Quote in {area.city}</button>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── GUARANTEE / TRUST SECTION ───
function GuaranteeSection() {
  const guarantees = [
    { icon: <Shield size={28} />, title: "100% Satisfaction Guarantee", desc: "If you're not happy with the result, we'll make it right — no questions asked. Your space, your standards." },
    { icon: <Clock size={28} />, title: "Same-Week Scheduling", desc: "We know you want it done now, not next month. Most cleanouts are scheduled within the same week you call." },
    { icon: <Star size={28} />, title: "Transparent Pricing", desc: "No hidden fees, no surprise upcharges. You'll see your full estimate before we start — and we stick to it." },
  ];

  return (
    <section style={{ padding: "80px 32px 100px", background: C.bgAlt }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: C.accent, textTransform: "uppercase", letterSpacing: "3px" }}>Our Promise</span>
            <h2 style={{ fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 800, color: C.text, margin: "12px 0 0", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              Zero risk. Zero hassle.
            </h2>
          </div>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {guarantees.map((g, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div style={{
                textAlign: "center", padding: "36px 28px", borderRadius: 16,
                ...glass.card,
                transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ color: C.accent, marginBottom: 16, display: "flex", justifyContent: "center" }}>{g.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: C.text, marginBottom: 10 }}>{g.title}</h3>
                <p style={{ fontSize: 15, color: C.textMuted, lineHeight: 1.7 }}>{g.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── STICKY MOBILE CTA ───
function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const h = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <>
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 99,
        background: "rgba(26,26,26,0.92)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        padding: "12px 16px",
        display: "flex", gap: 10, justifyContent: "center",
        transform: visible ? "translateY(0)" : "translateY(100%)",
        transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
      }}>
        <a href={`tel:${BRAND.phone}`} style={{
          flex: 1, maxWidth: 200, padding: "14px 20px", borderRadius: 10,
          background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)",
          color: "#fff", fontWeight: 700, fontSize: 14, textDecoration: "none",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        }}>
          <Phone size={16} /> Call Now
        </a>
        <button onClick={() => scrollTo("quote")} style={{
          flex: 1, maxWidth: 200, padding: "14px 20px", borderRadius: 10,
          background: C.accent, border: "none", cursor: "pointer",
          color: "#fff", fontWeight: 700, fontSize: 14,
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          boxShadow: "0 0 16px rgba(232,93,4,0.3)",
        }}>
          <ArrowRight size={16} /> Free Quote
        </button>
      </div>

      <style>{`
        @media (min-width: 769px) {
          div[style*="position: fixed"][style*="bottom: 0"] { display: none !important; }
        }
      `}</style>
    </>
  );
}

// ─── BLOG / GARAGE TALK ───
const BLOG_POSTS = [
  {
    slug: "garage-cleanout-cost-orlando",
    title: "How Much Does a Garage Cleanout Actually Cost in Orlando? (2026 Guide)",
    category: "Pricing",
    readTime: "4 min",
    excerpt: "If you've Googled 'garage cleanout cost Orlando' you've probably seen everything from $200 to $2,000. Here's what actually determines the price — and why most estimates you see online are wrong.",
    body: `Most Orlando homeowners pay between $500 and $1,500 for a professional garage cleanout. The price depends on three things: how much stuff is in there, how heavy it is, and how fast you want it done.\n\nA standard two-car garage with moderate clutter runs about $500–$800. If you're dealing with years of accumulation, heavy furniture, or appliances, expect $1,000–$1,500. Hoarding situations can go higher.\n\nWhat's included at The Garage Flip: full junk removal, hauling to donation centers or disposal, sorting and organization of what stays, pressure wash of the floor, and a final sweep. Same-week scheduling is standard — most cleanouts are done within 48 hours of booking.\n\nDIY vs. pro? A dumpster rental alone costs $300–$500. Add a full weekend of your time, dump fees, and the truck rentals — you're at $600+ and exhausted. We do it in a day while you go to brunch.\n\nBottom line: if you can't park in your garage, $500 to get it back is one of the best ROI home projects in Orlando.`,
  },
  {
    slug: "winter-park-garage-transformation",
    title: "Winter Park Garage Transformations: What Homeowners on Park Avenue Are Doing",
    category: "Winter Park",
    readTime: "3 min",
    excerpt: "Winter Park homeowners are turning cluttered garages into showpieces. Here's what the smartest upgrades look like in the 32789 — and why your garage might be the most undervalued room in your house.",
    body: `Winter Park homes have character. Brick streets, mature oaks, architecture that actually means something. But behind those beautiful front doors? A garage full of stuff that hasn't been touched since 2019.\n\nWe're seeing a wave of Winter Park homeowners — especially in the Via Tuscany, Palmer Avenue, and Genius Drive corridors — investing in their garages. Not just cleanouts. Full transformations.\n\nThe most popular package in Winter Park is The Upgrade ($2,000–$6,000). That gets you a cleanout, premium flooring, smart storage systems, and custom shelving. The result? A garage that matches the rest of your home.\n\nFor larger estates, The Full Flip ($7,000–$20,000+) adds climate control, LED lighting, and EV charger prep. Several homeowners near Rollins College have turned their garages into hybrid workshop/gym spaces.\n\nWinter Park real estate averages $550K+. Your garage is 400–600 sq ft of space that's currently being used as a junk drawer. At $10–$15/sq ft for a full transformation, this is the most underpriced upgrade in your home.`,
  },
  {
    slug: "windermere-luxury-garage",
    title: "Windermere's Luxury Garage Problem (And How to Fix It in 5 Days)",
    category: "Windermere",
    readTime: "3 min",
    excerpt: "You live in a million-dollar home with a $0 garage. Isleworth, Keene's Pointe, and Lakeside families are finally fixing the one room they've been ignoring.",
    body: `Windermere has some of the most beautiful homes in Central Florida. Isleworth. Keene's Pointe. Lake Butler Sound. Homes that sell for $1M–$10M+.\n\nAnd almost every single one has a garage that looks like a storage unit.\n\nHere's the thing: Windermere garages are BIG. 3-car and 4-car setups are standard. That's 800–1,200 sq ft of prime real estate being used to store pool noodles and boxes from 2017.\n\nThe Full Flip is the most popular package in Windermere. At $7,000–$20,000+, it includes cleanout, premium flooring, smart storage, climate control, and LED lighting. We've built workshop spaces, home gyms, golf simulator bays, and even music studios inside Windermere garages.\n\nTimeline: 3–5 days from start to finish. We handle everything — you just tell us what you want the space to become.\n\nIf your home is worth $1M+ and your garage looks like it belongs in a different zip code, that's the gap we close.`,
  },
  {
    slug: "lake-nona-ev-charger-garage",
    title: "Lake Nona Homeowners: Your Garage Should Be as Smart as Your House",
    category: "Lake Nona",
    readTime: "3 min",
    excerpt: "Lake Nona is built for the future. Smart homes, medical city, Innovation District. But most garages in 32827 are stuck in 2015. Here's the fix.",
    body: `Lake Nona is Orlando's most forward-thinking community. Medical City. Innovation District. Smart homes with automation built in.\n\nSo why does your garage still look like a scene from Storage Wars?\n\nLake Nona homeowners are the biggest adopters of our EV charger installation add-on. Tesla, Rivian, BMW — the EV density in 32827 is some of the highest in Central Florida. A Level 2 charger install starts at $800 and takes half a day.\n\nBut the real move is pairing it with a full garage upgrade. Climate control matters in Florida — a mini-split AC keeps your garage at 72° year-round, which is better for your car, your tools, and your sanity.\n\nThe Upgrade package ($2,000–$6,000) is the sweet spot for most Lake Nona homes: cleanout, premium flooring, storage systems, and optional EV charger. Modern home, modern garage.\n\nLake Nona homes average $500K–$800K. A $3,000–$5,000 garage upgrade adds real resale value and daily quality of life. That's a no-brainer.`,
  },
  {
    slug: "best-garage-upgrades-orlando-2026",
    title: "The 5 Garage Upgrades Orlando Homeowners Are Actually Doing in 2026",
    category: "Trends",
    readTime: "4 min",
    excerpt: "Forget the Pinterest fantasy. These are the upgrades real Orlando homeowners are paying for right now — ranked by ROI and satisfaction.",
    body: `We've done hundreds of garage consultations across Orlando. Here are the five upgrades people actually pull the trigger on — and why.\n\n1. THE CLEANOUT (Starting at $500)\nThis is where 80% of customers start. Just getting the junk out and the space organized changes everything. Most people don't even know what they have in their garage until we sort it.\n\n2. PREMIUM FLOORING (Starting at $1,500)\nThe single biggest visual transformation. Takes 1–2 days. Lasts 15–20 years. Every single customer who gets flooring says the same thing: "I should have done this years ago."\n\n3. SMART STORAGE SYSTEMS (Starting at $400)\nOverhead racks and wall-mounted systems. The floor stays clear, everything has a place. This is the upgrade that makes your spouse happy.\n\n4. CLIMATE CONTROL (Starting at $1,500)\nMini-split AC/heat. In Florida, this turns your garage from an oven into an actual usable room. The customers who add this spend 10x more time in their garage.\n\n5. LED LIGHTING (Starting at $300)\nThe most underrated upgrade. Bright, clean lighting makes the whole space feel finished and professional. It's the difference between "garage" and "room."\n\nBest ROI? The cleanout + flooring combo at $2,000–$3,000 total. It's the sweet spot between cost and transformation.`,
  },
  {
    slug: "dr-phillips-garage-makeover",
    title: "Dr. Phillips Garage Makeovers: Bay Hill to Sand Lake",
    category: "Dr. Phillips",
    readTime: "3 min",
    excerpt: "Dr. Phillips homeowners are sitting on some of the nicest houses in Orlando — with garages that don't match. Here's what the upgrade looks like from Bay Hill to Restaurant Row.",
    body: `Dr. Phillips is one of Orlando's best-kept secrets for quality of life. Great schools, Restaurant Row, Bay Hill — the neighborhood has everything.\n\nExcept clean garages, apparently.\n\nWe serve the entire Dr. Phillips corridor from Bay Hill estates through the Sand Lake area. The most common request? "I just want to be able to park my car in my garage again."\n\nThat's The Reset ($500–$1,500). A full cleanout with organization. Done in a day.\n\nBut Dr. Phillips homeowners who've seen what a full transformation looks like usually upgrade. The area's average home value is $450K–$700K, and a $3,000–$6,000 garage upgrade is one of the highest-ROI improvements you can make.\n\nPopular add-ons in Dr. Phillips: premium flooring (the Florida humidity means coated floors last longer), smart storage (these homes have deep 2-car garages with tons of vertical space), and EV charger installs.\n\nIf you're in 32819 and your garage needs work, you're in our core service area. Same-week scheduling, free estimates.`,
  },
  // ─── SERVICE-SPECIFIC ARTICLES ───
  {
    slug: "garage-cleanout-what-to-expect",
    title: "What Actually Happens During a Professional Garage Cleanout",
    category: "Cleanout",
    readTime: "3 min",
    excerpt: "You call, we show up, and three hours later you can see your garage floor. Here's exactly what the process looks like — no surprises.",
    body: `Step 1: We walk the garage together. You point at what stays and what goes. Takes 10 minutes.\n\nStep 2: Our crew sorts everything into keep, donate, and dispose piles. We're fast — most two-car garages are fully sorted in under two hours.\n\nStep 3: Junk gets loaded and hauled. Anything in good condition goes to local donation centers. The rest goes to proper disposal. You don't lift a finger.\n\nStep 4: We sweep and pressure wash the floor if it's part of your package. The stuff that stays gets organized and put back in a way that actually makes sense.\n\nStep 5: You walk into your garage and wonder why you didn't do this three years ago.\n\nTotal time: 3–6 hours depending on size and clutter level. Cost: $500–$1,500. Most cleanouts are scheduled within the same week you call.\n\nThe number one thing people say after a cleanout: "I had no idea my garage was this big."`,
  },
  {
    slug: "garage-organization-systems-orlando",
    title: "Garage Organization That Actually Sticks (Not the Pinterest Version)",
    category: "Organization",
    readTime: "3 min",
    excerpt: "The difference between 'organized for the Instagram photo' and 'organized for real life' is a system. Here's how we build ones that last.",
    body: `Most garage organization fails within 6 months. Here's why: it's designed for how the garage looks, not how you actually use it.\n\nOur approach is different. We start with three questions: What do you use weekly? What's seasonal? What haven't you touched in a year?\n\nWeekly items go at grab-and-go height. Seasonal gear goes overhead or high shelving. And the stuff you haven't touched? Probably time to donate it.\n\nThe system: wall-mounted tool organizers for the things you reach for every week. Overhead storage racks for holiday decorations, camping gear, and seasonal items. Clear bins with labels so you can find the Christmas lights in December without a search party.\n\nFor families: dedicated zones. Kids' sports gear in one area. Tools in another. Beach and pool stuff easy to grab on the way out.\n\nOur organization service starts at $400 and usually pairs with a cleanout ($500+). The combo is $800–$1,200 and honestly it's the best value on the menu.\n\nPro tip: if your garage has been a mess for more than a year, skip the DIY weekend and call us. We've organized hundreds of garages — we know the shortcuts.`,
  },
  {
    slug: "garage-flooring-options-orlando",
    title: "Garage Flooring in Orlando: Which Option Actually Survives Florida?",
    category: "Flooring",
    readTime: "4 min",
    excerpt: "Florida humidity destroys cheap garage floors. Here's what works, what doesn't, and why your neighbor's peeling floor was a predictable mistake.",
    body: `Orlando's climate is brutal on garage floors. 90% humidity, 95° heat, constant moisture from rain-soaked cars pulling in. The wrong flooring fails in under two years.\n\nWhat doesn't work: peel-and-stick tiles (they peel), cheap one-coat epoxy (it yellows and chips), and rubber mats over cracked concrete (moisture gets trapped underneath).\n\nWhat works: polyurea and polyaspartic coatings. They cure faster than traditional epoxy (same-day vs. 3-day), they're UV-stable (no yellowing), and they handle Florida's temperature swings without cracking.\n\nOur premium flooring service starts at $1,500 for a standard two-car garage. That includes concrete prep (diamond grinding), crack and chip repair, moisture barrier primer, color flake broadcast, and a clear topcoat.\n\nInstall time: 1 day for prep, 1 day for coating. You can park on it within 24–48 hours.\n\nLifespan: 15–20 years with normal use. We've seen plenty of 10-year-old installations in Orlando that still look brand new.\n\nThe flooring upgrade is the single biggest visual transformation in a garage. It's the difference between "storage space" and "this is actually a nice room."`,
  },
  {
    slug: "smart-storage-garage-systems",
    title: "Smart Garage Storage: How to Get 50% More Space Without Adding Square Footage",
    category: "Storage",
    readTime: "3 min",
    excerpt: "Your garage isn't too small. It's just using the wrong dimensions. Here's how overhead racks and wall systems unlock space you didn't know you had.",
    body: `The average Orlando two-car garage has about 400 sq ft of floor space. But it also has 400 sq ft of ceiling space and 200+ sq ft of wall space that's completely unused.\n\nThat's where smart storage systems come in.\n\nOverhead storage racks mount to the ceiling joists and hold 500–600 lbs each. That's your holiday decorations, camping gear, luggage, and seasonal items — all off the floor and out of the way.\n\nWall-mounted systems (slatwall panels, track systems, and pegboard) put tools, bikes, sports equipment, and yard gear on the walls where you can see and grab them.\n\nThe result: your floor is clear for parking, your workbench is usable, and you can actually find things.\n\nOur smart storage systems start at $400 for a basic overhead rack setup. A full wall-and-ceiling system for a two-car garage runs $800–$1,500.\n\nBiggest unlock: combining storage with a cleanout. Customers who do both spend an average of $1,000 and gain back 50–60% of their usable floor space. That's 200+ sq ft of space that was buried under stuff.\n\nThe look on someone's face when they can park both cars in the garage for the first time in years — that's why we do this.`,
  },
  {
    slug: "ev-charger-installation-orlando",
    title: "EV Charger Installation in Orlando: The Complete Homeowner's Guide",
    category: "EV Charging",
    readTime: "4 min",
    excerpt: "Level 1 vs Level 2, permitting, panel upgrades, and actual costs. Everything you need to know before installing an EV charger in your Orlando garage.",
    body: `If you drive a Tesla, Rivian, BMW, or any EV in Orlando, you're probably tired of Supercharger lines. A home Level 2 charger changes everything — pull in, plug in, wake up at 100%.\n\nLevel 1 (standard outlet): charges 4–5 miles of range per hour. That's 40–50 miles overnight. Fine if you drive very little.\n\nLevel 2 (240V dedicated circuit): charges 25–30 miles of range per hour. That's a full charge overnight for any EV. This is what 90% of homeowners want.\n\nOur Level 2 installation starts at $800 and includes: the charger unit, a dedicated 240V 50-amp circuit, professional mounting, permitting with Orange County, and a final inspection.\n\nDo you need a panel upgrade? Maybe. Homes built after 2000 usually have 200-amp panels and can handle a charger no problem. Older homes with 100-amp panels may need an upgrade ($1,500–$2,500 additional). We assess this during the free estimate.\n\nInstall time: half a day for standard installations.\n\nPopular combo: EV charger + garage cleanout + flooring. If you're already upgrading the garage, adding the charger while we're there saves a separate service call.\n\nOrlando's EV adoption is growing fast, especially in Lake Nona, Windermere, and Winter Park. A home charger adds real resale value — buyers expect it now.`,
  },
  {
    slug: "garage-climate-control-florida",
    title: "Why Your Florida Garage Needs Climate Control (And What It Actually Costs)",
    category: "Climate Control",
    readTime: "3 min",
    excerpt: "Your garage hits 120°F in July. Your tools are rusting, your paint cans are exploding, and you haven't used your workbench since March. Here's the fix.",
    body: `In Orlando, an unconditioned garage reaches 110–130°F in summer. That's not just uncomfortable — it's destructive. Paint warps. Tools rust. Rubber degrades. Electronics overheat.\n\nA mini-split AC/heat system solves this completely. It's a wall-mounted unit that cools in summer and heats in winter (yes, those 40° January mornings exist). No ductwork needed.\n\nCost: starting at $1,500 installed for a single-zone mini-split that handles a standard two-car garage. Larger or insulated garages may need a higher BTU unit ($2,000–$3,000).\n\nEnergy cost: about $30–$50/month to run during peak summer if you're keeping the garage at 75°F. Most people set it to 78° and only run it when they're in the garage.\n\nThe ROI isn't just comfort. Climate control protects everything stored in your garage — that alone can save thousands in damaged goods. And it turns 400 sq ft of unusable hot space into the most versatile room in your house.\n\nCustomers who add climate control report spending 10x more time in their garage. Home gyms, workshops, music spaces, remote offices — all possible once the temperature is handled.\n\nBest paired with: premium flooring and LED lighting. The trifecta that turns a garage into a room.`,
  },
];

function BlogPost({ post }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article id={`blog-${post.slug}`} style={{
      ...glass.card,
      borderRadius: 16, overflow: "hidden",
      transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
    }}
    onMouseEnter={e => { if (!expanded) { e.currentTarget.style.borderColor = "rgba(232,93,4,0.25)"; e.currentTarget.style.transform = "translateY(-3px)"; } }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)"; e.currentTarget.style.transform = "translateY(0)"; }}
    >
      <div style={{ padding: "28px 28px 20px" }}>
        <div style={{ display: "flex", gap: 12, marginBottom: 12, alignItems: "center" }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: C.accent, background: C.accentBg, padding: "4px 10px", borderRadius: 100, textTransform: "uppercase", letterSpacing: "0.5px" }}>
            {post.category}
          </span>
          <span style={{ fontSize: 12, color: C.textLight }}>{post.readTime} read</span>
        </div>
        <h3 style={{ fontSize: 19, fontWeight: 800, color: C.text, lineHeight: 1.35, marginBottom: 10 }}>{post.title}</h3>
        <p style={{ fontSize: 15, color: C.textMuted, lineHeight: 1.7, marginBottom: 16 }}>{post.excerpt}</p>

        {expanded && (
          <div style={{ fontSize: 15, color: C.textMuted, lineHeight: 1.8, whiteSpace: "pre-line", marginBottom: 16, borderTop: `1px solid ${C.cardBorder}`, paddingTop: 20 }}>
            {post.body}
          </div>
        )}

        <button onClick={() => { setExpanded(!expanded); if (!expanded) window.history.replaceState(null, "", `#blog-${post.slug}`); }} style={{
          background: "none", border: "none", cursor: "pointer",
          color: C.accent, fontWeight: 700, fontSize: 14,
          display: "flex", alignItems: "center", gap: 6, padding: 0,
        }}>
          {expanded ? "Read less" : "Read more"}
          <ChevronDown size={16} style={{
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s",
          }} />
        </button>
      </div>
    </article>
  );
}

function BlogSection() {
  return (
    <section id="blog" style={{ padding: "100px 32px 120px", background: C.bg }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 56px" }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: C.accent, textTransform: "uppercase", letterSpacing: "3px" }}>Garage Talk</span>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 800, color: C.text, margin: "12px 0 16px", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              Tips, pricing, and neighborhood spotlights.
            </h2>
            <p style={{ fontSize: 17, color: C.textMuted, lineHeight: 1.7 }}>
              Real talk about garage transformations in Orlando — what it costs, what to expect, and what your neighbors are doing.
            </p>
          </div>
        </FadeIn>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
          gap: 24,
        }}>
          {BLOG_POSTS.map((post, i) => (
            <FadeIn key={post.slug} delay={i * 0.05}>
              <BlogPost post={post} />
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
            <Logo height={80} dark={false} />
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", lineHeight: 1.7, marginTop: 16 }}>
              Premium garage transformations for Orlando homeowners. We clear it out, build it up, and give you your space back.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 20 }}>Navigate</h4>
            {["Services", "Packages", "Get a Quote", "Garage Talk", "FAQ", "Service Areas"].map(l => (
              <div key={l} onClick={() => scrollTo(l === "Get a Quote" ? "quote" : l === "Service Areas" ? "areas" : l === "Garage Talk" ? "blog" : l.toLowerCase())} style={{
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
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.25)" }}>Orlando &middot; Winter Park &middot; Windermere &middot; Dr. Phillips &middot; Lake Nona &middot; College Park &middot; Baldwin Park &middot; Celebration &middot; Lake Mary &middot; Horizon West</span>
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
      <RecurringSection />
      <QuoteBuilder selectedServices={selectedServices} setSelectedServices={setSelectedServices} />
      <WhySection />
      <GuaranteeSection />
      <FAQSection />
      <BlogSection />
      <ServiceAreaSection />
      <StickyMobileCTA />
      <Footer />
    </>
  );
}
