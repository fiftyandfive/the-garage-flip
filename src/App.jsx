import { useState, useEffect, useRef } from "react";
import { Menu, X, Phone, Mail, MapPin, Star, ArrowRight, CheckCircle, Truck, Clock, Sparkles, Shield, Users, ChevronDown, Home } from "lucide-react";

// ─── COLOR PALETTE: "Premium Home" ───
const C = {
  bg: "#FAF9F6",
  bgAlt: "#F0ECE3",
  bgDark: "#1E1E1E",
  text: "#2D2D2D",
  textMuted: "#6B6B63",
  textLight: "#8A8A82",
  accent: "#8B7355",
  accentHover: "#725E45",
  accentLight: "#C4A97D",
  accentBg: "rgba(139,115,85,0.07)",
  accentBorder: "rgba(139,115,85,0.18)",
  card: "#FFFFFF",
  cardBorder: "#E8E4DC",
  navBg: "rgba(250,249,246,0.92)",
  heroBg: "#1C1C1C",
};

// ─── CONFIG ───
const BRAND = {
  name: "The Garage Flip",
  tagline: "Your Garage, Transformed.",
  phone: "(407) 555-0199",
  email: "hello@thegarageflip.com",
  calendly: "https://calendly.com/thegarageflip/free-estimate",
  address: "Orlando, FL",
};

// ─── PREMIUM IMAGES (curated for each service) ───
const IMG = {
  // Hero: dramatic garage/workshop shot
  hero: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1600&q=80",
  // Garage Cleanouts: beautiful modern house with clean driveway — the dream result
  garageClean: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
  // Junk Hauling: professional team/crew at work
  hauling: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80",
  // Donation: warm community volunteering scene
  donation: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80",
  // Estate Cleanouts: bright, clean, respectful modern interior
  estate: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
  // Property Management: modern apartment building
  property: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
  // Pre-Sale Staging: luxury staged kitchen/interior
  staging: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
  // Supplemental
  team: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  before: "https://images.unsplash.com/photo-1617850687395-620757feb1f3?w=600&q=80",
  after: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
};

// ─── SMOOTH SCROLL ───
function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

// ─── INTERSECTION OBSERVER ───
function useInView(threshold = 0.12) {
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

function FadeIn({ children, delay = 0, className = "", style = {} }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} className={className} style={{
      ...style,
      opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`
    }}>{children}</div>
  );
}

// ─── INLINE SVG LOGO ───
function GarageLogo({ size = 42, showText = false, textSize = 15, dark = true }) {
  const textColor = dark ? C.text : "#fff";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: showText ? 12 : 0 }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width={size} height={size}>
        <defs>
          <linearGradient id="glogo" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#8B7355" }} />
            <stop offset="50%" style={{ stopColor: "#C4A97D" }} />
            <stop offset="100%" style={{ stopColor: "#8B7355" }} />
          </linearGradient>
        </defs>
        <rect width="120" height="120" rx="20" fill={dark ? C.bgAlt : "#2A2A2A"} />
        <g transform="translate(18, 16)">
          <rect x="8" y="38" width="68" height="48" rx="2" fill="none" stroke="url(#glogo)" strokeWidth="2.2" />
          <path d="M0 42 L42 10 L84 42" fill="none" stroke="url(#glogo)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="20" y="52" width="44" height="34" rx="1.5" fill="none" stroke="url(#glogo)" strokeWidth="1.5" />
          <line x1="20" y1="60.5" x2="64" y2="60.5" stroke="url(#glogo)" strokeWidth="0.8" opacity="0.4" />
          <line x1="20" y1="69" x2="64" y2="69" stroke="url(#glogo)" strokeWidth="0.8" opacity="0.4" />
          <line x1="20" y1="77.5" x2="64" y2="77.5" stroke="url(#glogo)" strokeWidth="0.8" opacity="0.4" />
          <rect x="30" y="54" width="8" height="5" rx="1" fill="url(#glogo)" opacity="0.12" stroke="url(#glogo)" strokeWidth="0.6" />
          <rect x="46" y="54" width="8" height="5" rx="1" fill="url(#glogo)" opacity="0.12" stroke="url(#glogo)" strokeWidth="0.6" />
          <g transform="translate(50, 16)">
            <path d="M0 20 C0 8, 12 0, 24 0" fill="none" stroke="url(#glogo)" strokeWidth="2.2" strokeLinecap="round" />
            <polygon points="22,-5 29,0 22,5" fill="url(#glogo)" />
          </g>
        </g>
      </svg>
      {showText && (
        <span style={{ fontWeight: 700, fontSize: textSize, color: textColor, letterSpacing: "0.5px" }}>THE GARAGE FLIP</span>
      )}
    </div>
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
    { label: "Process", id: "process" },
    { label: "Pricing", id: "pricing" },
    { label: "Results", id: "results" },
    { label: "FAQ", id: "faq" },
  ];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? C.navBg : "transparent",
      backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
      borderBottom: scrolled ? `1px solid ${C.cardBorder}` : "none",
      transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)"
    }}>
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 80 }}>
        <div style={{ cursor: "pointer" }} onClick={() => scrollTo("hero")}>
          <GarageLogo size={42} showText={true} textSize={17} dark={scrolled} />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 36 }} className="desktop-nav">
          {links.map(l => (
            <span key={l.id} onClick={() => scrollTo(l.id)} style={{
              cursor: "pointer", fontSize: 13, fontWeight: 500, letterSpacing: "0.8px",
              color: scrolled ? C.textMuted : "rgba(255,255,255,0.65)", textTransform: "uppercase",
              transition: "color 0.2s"
            }}
            onMouseEnter={e => e.target.style.color = C.accent}
            onMouseLeave={e => e.target.style.color = scrolled ? C.textMuted : "rgba(255,255,255,0.65)"}
            >{l.label}</span>
          ))}
          <button onClick={() => window.open(BRAND.calendly, "_blank")} style={{
            padding: "12px 28px", borderRadius: 6, border: `1px solid ${C.accent}`, cursor: "pointer",
            background: "transparent", color: C.accent, fontWeight: 600, fontSize: 12,
            letterSpacing: "1.5px", textTransform: "uppercase",
            transition: "all 0.3s"
          }}
          onMouseEnter={e => { e.target.style.background = C.accent; e.target.style.color = "#fff"; }}
          onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = C.accent; }}
          >Book Estimate</button>
        </div>

        <button onClick={() => setOpen(!open)} style={{
          display: "none", background: "none", border: "none", cursor: "pointer",
          color: scrolled ? C.text : "#fff"
        }} className="mobile-menu-btn">
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {open && (
        <div style={{
          position: "absolute", top: 80, left: 0, right: 0,
          background: C.navBg, backdropFilter: "blur(20px)",
          padding: "24px 32px", display: "flex", flexDirection: "column", gap: 20,
          borderBottom: `1px solid ${C.cardBorder}`
        }}>
          {links.map(l => (
            <span key={l.id} onClick={() => { scrollTo(l.id); setOpen(false); }}
              style={{ cursor: "pointer", fontSize: 14, fontWeight: 500, color: C.textMuted, letterSpacing: "0.5px", textTransform: "uppercase" }}>{l.label}</span>
          ))}
          <button onClick={() => window.open(BRAND.calendly, "_blank")} style={{
            padding: "14px 28px", borderRadius: 6, border: "none", cursor: "pointer",
            background: C.accent, color: "#fff", fontWeight: 600, fontSize: 13,
            letterSpacing: "1px", textTransform: "uppercase", width: "100%"
          }}>Book Estimate</button>
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

// ─── HERO (Dark section — emotional punch) ───
function Hero() {
  return (
    <section id="hero" style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      position: "relative", overflow: "hidden", background: C.heroBg
    }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url(${IMG.hero})`,
        backgroundSize: "cover", backgroundPosition: "center",
        filter: "brightness(0.25) contrast(1.1)"
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(135deg, rgba(28,28,28,0.88) 0%, rgba(28,28,28,0.4) 50%, rgba(139,115,85,0.08) 100%)"
      }} />
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 200,
        background: `linear-gradient(to top, ${C.bg}, transparent)`
      }} />

      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "140px 32px 100px", position: "relative", zIndex: 1, width: "100%" }}>
        <div style={{ maxWidth: 720 }}>
          <FadeIn>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 18px",
              borderRadius: 4, background: "rgba(196,169,125,0.12)", border: "1px solid rgba(196,169,125,0.25)",
              marginBottom: 28
            }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.accentLight }} />
              <span style={{ fontSize: 12, color: C.accentLight, fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase" }}>
                Orlando's Premium Garage Service
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 style={{
              fontSize: "clamp(40px, 7vw, 72px)", fontWeight: 800, color: "#fff",
              lineHeight: 1.08, margin: "0 0 24px", letterSpacing: "-0.03em"
            }}>
              You've been staring at 
that garage for <span style={{ color: C.accentLight }}>years.</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p style={{
              fontSize: "clamp(17px, 2vw, 20px)", color: "rgba(255,255,255,0.55)",
              lineHeight: 1.7, margin: "0 0 44px", maxWidth: 540, fontWeight: 400
            }}>
              The boxes from three moves ago. The treadmill you swore you'd use. The "I'll deal with it this weekend" that never comes. We show up, clear it all out, and hand you back a garage that actually feels like part of your home.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <button onClick={() => window.open(BRAND.calendly, "_blank")} style={{
                padding: "18px 40px", borderRadius: 6, border: "none", cursor: "pointer",
                background: `linear-gradient(135deg, ${C.accent}, ${C.accentHover})`, color: "#fff",
                fontWeight: 700, fontSize: 14, letterSpacing: "1px", textTransform: "uppercase",
                display: "flex", alignItems: "center", gap: 10,
                boxShadow: "0 4px 30px rgba(139,115,85,0.3)", transition: "transform 0.2s, box-shadow 0.2s"
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 40px rgba(139,115,85,0.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 30px rgba(139,115,85,0.3)"; }}
              >
                End the Procrastination <ArrowRight size={18} />
              </button>
              <button onClick={() => scrollTo("process")} style={{
                padding: "18px 40px", borderRadius: 6, cursor: "pointer",
                background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.7)",
                fontWeight: 600, fontSize: 14, letterSpacing: "1px", textTransform: "uppercase",
                border: "1px solid rgba(255,255,255,0.12)", transition: "all 0.2s"
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
              >
                See How It Works
              </button>
            </div>
          </FadeIn>
        </div>

        {/* Stats bar */}
        <FadeIn delay={0.5}>
          <div style={{
            display: "flex", gap: 48, marginTop: 80, paddingTop: 40,
            borderTop: "1px solid rgba(255,255,255,0.08)", flexWrap: "wrap"
          }}>
            {[
              { num: "500+", label: "Garages Transformed" },
              { num: "4.9", label: "Google Rating", sub: "★" },
              { num: "3–5 hrs", label: "Avg Completion Time" },
              { num: "Same Week", label: "Scheduling Available" },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontSize: 30, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>
                  {s.num}{s.sub && <span style={{ color: C.accentLight, marginLeft: 2 }}>{s.sub}</span>}
                </div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", fontWeight: 500, marginTop: 4, letterSpacing: "0.5px", textTransform: "uppercase" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── TRUST STRIP ───
function TrustStrip() {
  return (
    <div style={{ background: C.bg, borderBottom: `1px solid ${C.cardBorder}`, padding: "24px 32px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", justifyContent: "center", gap: 40, flexWrap: "wrap", alignItems: "center" }}>
        {["Licensed & Insured", "Eco-Friendly Disposal", "Same-Week Availability", "Free On-Site Estimates"].map((t, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <CheckCircle size={14} color={C.accent} />
            <span style={{ fontSize: 12, fontWeight: 600, color: C.textMuted, letterSpacing: "0.5px", textTransform: "uppercase" }}>{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PAIN POINTS SECTION (NEW — emotional hook) ───
function PainPoints() {
  const pains = [
    { emoji: "📦", text: "Boxes from 3 moves ago you've never opened" },
    { emoji: "🏋️", text: "The gym equipment that became an expensive clothes rack" },
    { emoji: "🚗", text: "A 2-car garage where 0 cars can actually fit" },
    { emoji: "😓", text: "Weekend plans that never include \"finally clean the garage\"" },
  ];

  return (
    <section style={{ padding: "80px 32px 0", background: C.bg }}>
      <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
        <FadeIn>
          <p style={{ fontSize: 15, color: C.textLight, fontWeight: 500, letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: 20 }}>Sound familiar?</p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
            {pains.map((p, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  padding: "12px 20px", borderRadius: 40,
                  background: C.card, border: `1px solid ${C.cardBorder}`,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)"
                }}>
                  <span style={{ fontSize: 18 }}>{p.emoji}</span>
                  <span style={{ fontSize: 14, color: C.text, fontWeight: 500 }}>{p.text}</span>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.4}>
            <p style={{ fontSize: 20, color: C.text, fontWeight: 700, marginTop: 32, marginBottom: 0 }}>
              You don't need a weekend. You need <span style={{ color: C.accent }}>a crew</span>.
            </p>
          </FadeIn>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── SERVICES ───
function Services() {
  const services = [
    { title: "Garage Cleanouts", desc: "Complete garage clearing from floor to ceiling. We sort, organize, and leave you with a space you're proud to walk into.", icon: <Sparkles size={22} />, img: IMG.garageClean },
    { title: "Junk Hauling", desc: "Furniture, appliances, debris — if you want it gone, it's gone. Fast, clean, responsible disposal.", icon: <Truck size={22} />, img: IMG.hauling },
    { title: "Donation Coordination", desc: "Usable items go to local charities — not the landfill. We handle sorting, scheduling pickups, and providing donation receipts.", icon: <Clock size={22} />, img: IMG.donation },
    { title: "Estate Cleanouts", desc: "Compassionate, thorough clearing of a loved one's property. We handle everything with care and respect.", icon: <Shield size={22} />, img: IMG.estate },
    { title: "Property Management", desc: "Recurring contracts for landlords, Airbnb hosts, and property managers. Priority scheduling, volume pricing.", icon: <Users size={22} />, img: IMG.property },
    { title: "Pre-Sale Staging", desc: "Realtors: we clear and prep garages before listing photos. First impressions close deals.", icon: <Star size={22} />, img: IMG.staging },
  ];

  return (
    <section id="services" style={{ padding: "100px 32px 120px", background: C.bg }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ maxWidth: 560, marginBottom: 72 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: C.accent, textTransform: "uppercase", letterSpacing: "3px" }}>Services</span>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 800, color: C.text, margin: "12px 0 16px", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              More than junk removal.
            </h2>
            <p style={{ fontSize: 17, color: C.textMuted, lineHeight: 1.7 }}>
              Full-service garage transformations — from cluttered chaos to clean, usable space.
            </p>
          </div>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: 20 }}>
          {services.map((s, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div style={{
                background: C.card, borderRadius: 12,
                border: `1px solid ${C.cardBorder}`, overflow: "hidden",
                transition: "border-color 0.3s, transform 0.3s, box-shadow 0.3s", cursor: "default",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)"
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.accentBorder; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.08)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.cardBorder; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)"; }}
              >
                <div style={{
                  height: 200, backgroundImage: `url(${s.img})`, backgroundSize: "cover", backgroundPosition: "center",
                  position: "relative"
                }}>
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 50%)" }} />
                  <div style={{
                    position: "absolute", top: 16, left: 16, width: 40, height: 40, borderRadius: 8,
                    background: "rgba(255,255,255,0.9)", backdropFilter: "blur(8px)",
                    border: `1px solid ${C.cardBorder}`,
                    display: "flex", alignItems: "center", justifyContent: "center", color: C.accent
                  }}>{s.icon}</div>
                </div>
                <div style={{ padding: "20px 24px 28px" }}>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: C.text, margin: "0 0 8px" }}>{s.title}</h3>
                  <p style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.65, margin: 0 }}>{s.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PROCESS ───
function Process() {
  const steps = [
    { num: "01", title: "Book Your Estimate", desc: "Schedule a free 15-minute walkthrough. We assess volume, plan the cleanout, and quote a fixed price — no surprises." },
    { num: "02", title: "We Handle Everything", desc: "Our crew arrives on your schedule. We sort, pack, haul, and leave your garage spotless. You don't lift a finger." },
    { num: "03", title: "Enjoy Your Space", desc: "Walk into a clean, organized garage you're proud of. Most clients gain back 200+ sq ft of usable space." },
  ];

  return (
    <section id="process" style={{ padding: "120px 32px", background: C.bgAlt, position: "relative" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 80 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: C.accent, textTransform: "uppercase", letterSpacing: "3px" }}>Process</span>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 800, color: C.text, margin: "12px 0 16px", letterSpacing: "-0.02em" }}>
              Three steps. Zero stress.
            </h2>
          </div>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 32 }}>
          {steps.map((s, i) => (
            <FadeIn key={i} delay={i * 0.15}>
              <div style={{
                position: "relative", padding: "40px 32px", borderRadius: 12,
                background: C.card, border: `1px solid ${C.cardBorder}`,
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)"
              }}>
                <div style={{
                  fontSize: 64, fontWeight: 900, color: C.accentBg.replace("0.07", "0.12"),
                  position: "absolute", top: 16, right: 24, lineHeight: 1, letterSpacing: "-0.04em"
                }}>{s.num}</div>
                <div style={{
                  width: 48, height: 2, background: `linear-gradient(90deg, ${C.accent}, transparent)`,
                  marginBottom: 24, borderRadius: 1
                }} />
                <h3 style={{ fontSize: 22, fontWeight: 700, color: C.text, margin: "0 0 12px" }}>{s.title}</h3>
                <p style={{ fontSize: 15, color: C.textMuted, lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── URGENCY BANNER (emotional closer) ───
function UrgencyBanner() {
  return (
    <section style={{
      padding: "80px 32px", position: "relative", overflow: "hidden",
      background: C.bgDark,
    }}>
      <div style={{
        position: "absolute", inset: 0, opacity: 0.04,
        backgroundImage: `url(${IMG.hero})`, backgroundSize: "cover"
      }} />
      <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <FadeIn>
          <span style={{ fontSize: 12, fontWeight: 700, color: C.accentLight, textTransform: "uppercase", letterSpacing: "3px" }}>Enough Is Enough</span>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, color: "#fff", margin: "16px 0 20px", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
            Every weekend you say<br />"<span style={{ color: C.accentLight }}>I'll get to it next week.</span>"
          </h2>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.5)", maxWidth: 560, margin: "0 auto 40px", lineHeight: 1.7 }}>
            The average homeowner waits 2.5 years before actually cleaning out their garage. One call to us and it's done in an afternoon. No guilt. No wasted weekends. Just your space, back.
          </p>
          <button onClick={() => window.open(BRAND.calendly, "_blank")} style={{
            padding: "18px 48px", borderRadius: 6, border: "none", cursor: "pointer",
            background: `linear-gradient(135deg, ${C.accent}, ${C.accentHover})`, color: "#fff",
            fontWeight: 700, fontSize: 14, letterSpacing: "1px", textTransform: "uppercase",
            boxShadow: "0 4px 30px rgba(139,115,85,0.3)", display: "inline-flex", alignItems: "center", gap: 10
          }}>
            Schedule Your Flip <ArrowRight size={18} />
          </button>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── PRICING ───
function Pricing() {
  const tiers = [
    {
      name: "Essential", price: "600", popular: false,
      features: ["Full garage cleanout", "Junk hauling & disposal", "Basic sweep & cleanup", "Same-week scheduling"],
      desc: "Straightforward clearing for garages that need a reset."
    },
    {
      name: "Premium", price: "800", popular: true,
      features: ["Everything in Essential", "Donation coordination & receipts", "Before/after documentation", "Organization consultation", "Eco-friendly disposal guarantee"],
      desc: "Our signature service — the complete garage transformation."
    },
    {
      name: "Total Transformation", price: "1,200", popular: false,
      features: ["Everything in Premium", "Deep cleaning & sanitization", "Storage solution design", "Priority scheduling", "Dedicated project manager"],
      desc: "The full luxury garage makeover experience."
    },
  ];

  return (
    <section id="pricing" style={{ padding: "120px 32px", background: C.bg }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: C.accent, textTransform: "uppercase", letterSpacing: "3px" }}>Pricing</span>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 800, color: C.text, margin: "12px 0 16px", letterSpacing: "-0.02em" }}>
              Transparent pricing.
            </h2>
            <p style={{ fontSize: 17, color: C.textMuted, maxWidth: 460, margin: "0 auto" }}>
              Every project starts with a free on-site estimate. No hidden fees, ever.
            </p>
          </div>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20, alignItems: "start" }}>
          {tiers.map((t, i) => (
            <FadeIn key={i} delay={i * 0.12}>
              <div style={{
                borderRadius: 12, padding: "40px 32px",
                background: t.popular ? `linear-gradient(165deg, rgba(139,115,85,0.06) 0%, ${C.card} 40%)` : C.card,
                border: t.popular ? `1px solid ${C.accentBorder}` : `1px solid ${C.cardBorder}`,
                position: "relative",
                boxShadow: t.popular ? "0 8px 30px rgba(139,115,85,0.1)" : "0 1px 3px rgba(0,0,0,0.04)"
              }}>
                {t.popular && (
                  <div style={{
                    position: "absolute", top: -1, left: 32, right: 32, height: 2,
                    background: `linear-gradient(90deg, transparent, ${C.accent}, transparent)`
                  }} />
                )}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: C.text, margin: 0 }}>{t.name}</h3>
                  {t.popular && <span style={{ fontSize: 10, fontWeight: 700, color: C.accent, letterSpacing: "1.5px", textTransform: "uppercase", padding: "4px 12px", borderRadius: 4, background: C.accentBg }}>Popular</span>}
                </div>
                <p style={{ fontSize: 14, color: C.textMuted, margin: "0 0 24px" }}>{t.desc}</p>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 32 }}>
                  <span style={{ fontSize: 14, color: C.textLight }}>$</span>
                  <span style={{ fontSize: 48, fontWeight: 800, color: C.text, letterSpacing: "-0.03em", lineHeight: 1 }}>{t.price}</span>
                  <span style={{ fontSize: 14, color: C.textLight, marginLeft: 6 }}>starting</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 32 }}>
                  {t.features.map((f, fi) => (
                    <div key={fi} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <CheckCircle size={16} color={C.accent} style={{ marginTop: 2, flexShrink: 0 }} />
                      <span style={{ fontSize: 14, color: C.textMuted }}>{f}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => window.open(BRAND.calendly, "_blank")} style={{
                  width: "100%", padding: "16px 24px", borderRadius: 6, cursor: "pointer",
                  background: t.popular ? `linear-gradient(135deg, ${C.accent}, ${C.accentHover})` : "transparent",
                  color: t.popular ? "#fff" : C.accent,
                  border: t.popular ? "none" : `1px solid ${C.accentBorder}`,
                  fontWeight: 700, fontSize: 13, letterSpacing: "1px", textTransform: "uppercase",
                  transition: "all 0.3s"
                }}
                onMouseEnter={e => { if (!t.popular) { e.target.style.background = C.accentBg; }}}
                onMouseLeave={e => { if (!t.popular) { e.target.style.background = "transparent"; }}}
                >Get Free Estimate</button>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── RESULTS / REVIEWS ───
function Results() {
  const reviews = [
    { name: "Sarah M.", loc: "Winter Park", text: "Three years of accumulated junk — gone in one afternoon. I can actually park both cars in the garage now. Incredible.", rating: 5 },
    { name: "Mark & Lisa R.", loc: "College Park", text: "We couldn't believe how fast and professional the crew was. Our garage looks brand new. Already referred two neighbors.", rating: 5 },
    { name: "David K.", loc: "Thornton Park", text: "As a realtor, I need garages camera-ready fast. The Garage Flip is now my go-to. They've prepped 6 listings for me.", rating: 5 },
    { name: "Jennifer W.", loc: "Lake Nona", text: "They handled my late mother's estate cleanout with so much care and respect. I can't recommend them highly enough.", rating: 5 },
  ];

  return (
    <section id="results" style={{ padding: "120px 32px", background: C.bgAlt }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: C.accent, textTransform: "uppercase", letterSpacing: "3px" }}>Results</span>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 800, color: C.text, margin: "12px 0", letterSpacing: "-0.02em" }}>
              What our clients say.
            </h2>
          </div>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {reviews.map((r, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{
                padding: "32px 28px", borderRadius: 12,
                background: C.card, border: `1px solid ${C.cardBorder}`,
                display: "flex", flexDirection: "column", height: "100%",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)"
              }}>
                <div style={{ display: "flex", gap: 3, marginBottom: 20 }}>
                  {Array(r.rating).fill(0).map((_, si) => <Star key={si} size={14} fill={C.accentLight} color={C.accentLight} />)}
                </div>
                <p style={{ fontSize: 15, color: C.textMuted, lineHeight: 1.7, margin: "0 0 24px", flex: 1 }}>
                  "{r.text}"
                </p>
                <div style={{ borderTop: `1px solid ${C.cardBorder}`, paddingTop: 16 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{r.name}</div>
                  <div style={{ fontSize: 12, color: C.textLight, marginTop: 2 }}>{r.loc}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ───
function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);
  const faqs = [
    { q: "How much does a garage cleanout cost?", a: "Most 2-car garage cleanouts run $800–$1,200 depending on volume and complexity. Oversized items may require additional transportation and disposal fees. We provide a free video conference estimate before any work begins — the price we quote is the price you pay." },
    { q: "What happens to my stuff?", a: "We sort everything into three categories: keep (stays with you), donate (local charities), and dispose (eco-friendly disposal). Anything usable goes to a good home — not the landfill. You approve the plan before we start." },
    { q: "Do you donate usable items?", a: "Absolutely. We partner with local Orlando charities to donate furniture, tools, and household goods. For Premium and Total Transformation packages, we provide donation receipts for your records." },
    { q: "How long does a cleanout take?", a: "Most standard garages take 3–5 hours. Heavily packed garages may take a full day. We provide a time estimate along with your price quote." },
    { q: "Are you licensed and insured?", a: "Absolutely. The Garage Flip is fully licensed in the state of Florida with comprehensive general liability insurance." },
    { q: "Do you work with realtors and property managers?", a: "Yes — we offer recurring contracts and priority scheduling for real estate agents, property managers, and Airbnb hosts. Contact us for custom B2B pricing." },
  ];

  return (
    <section id="faq" style={{ padding: "120px 32px", background: C.bg }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: C.accent, textTransform: "uppercase", letterSpacing: "3px" }}>FAQ</span>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 800, color: C.text, margin: "12px 0", letterSpacing: "-0.02em" }}>
              Common questions.
            </h2>
          </div>
        </FadeIn>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {faqs.map((f, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div style={{
                borderRadius: 8, border: `1px solid ${openIdx === i ? C.accentBorder : C.cardBorder}`,
                background: openIdx === i ? C.accentBg : C.card,
                overflow: "hidden", transition: "all 0.3s",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)"
              }}>
                <button onClick={() => setOpenIdx(openIdx === i ? null : i)} style={{
                  width: "100%", padding: "20px 24px", border: "none",
                  background: "none", cursor: "pointer", display: "flex",
                  justifyContent: "space-between", alignItems: "center", textAlign: "left"
                }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: C.text, paddingRight: 16 }}>{f.q}</span>
                  <ChevronDown size={18} color={C.textLight} style={{
                    transition: "transform 0.3s", transform: openIdx === i ? "rotate(180deg)" : "rotate(0)",
                    flexShrink: 0
                  }} />
                </button>
                <div style={{
                  maxHeight: openIdx === i ? 300 : 0, overflow: "hidden",
                  transition: "max-height 0.4s cubic-bezier(0.16,1,0.3,1)"
                }}>
                  <p style={{ padding: "0 24px 20px", fontSize: 14, color: C.textMuted, lineHeight: 1.7, margin: 0 }}>{f.a}</p>
                </div>
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
    <footer style={{ background: C.bgDark, borderTop: `1px solid ${C.cardBorder}`, padding: "72px 32px 40px" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 48, marginBottom: 56 }}>
          <div>
            <div style={{ marginBottom: 20 }}>
              <GarageLogo size={36} showText={true} textSize={15} dark={false} />
            </div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", lineHeight: 1.65 }}>
              Premium garage cleanouts for Orlando homeowners. We clear it out, haul it away, and give you your space back.
            </p>
          </div>

          <div>
            <h4 style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: 700, margin: "0 0 20px", textTransform: "uppercase", letterSpacing: "2px" }}>Navigate</h4>
            {["Services", "Process", "Pricing", "Results", "FAQ"].map(l => (
              <div key={l} onClick={() => scrollTo(l.toLowerCase())}
                style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", cursor: "pointer", marginBottom: 12, transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = C.accentLight}
                onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.4)"}
              >{l}</div>
            ))}
          </div>

          <div>
            <h4 style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: 700, margin: "0 0 20px", textTransform: "uppercase", letterSpacing: "2px" }}>Contact</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { icon: <Phone size={14} />, text: BRAND.phone },
                { icon: <Mail size={14} />, text: BRAND.email },
                { icon: <MapPin size={14} />, text: BRAND.address },
              ].map((c, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, color: "rgba(255,255,255,0.4)", fontSize: 14 }}>
                  <span style={{ color: C.accentLight }}>{c.icon}</span> {c.text}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: 700, margin: "0 0 20px", textTransform: "uppercase", letterSpacing: "2px" }}>Get Started</h4>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", lineHeight: 1.6, marginBottom: 20 }}>
              Book your free estimate and see why Orlando homeowners choose The Garage Flip.
            </p>
            <button onClick={() => window.open(BRAND.calendly, "_blank")} style={{
              padding: "14px 32px", borderRadius: 6, border: "none", cursor: "pointer",
              background: `linear-gradient(135deg, ${C.accent}, ${C.accentHover})`, color: "#fff",
              fontWeight: 700, fontSize: 12, letterSpacing: "1px", textTransform: "uppercase"
            }}>Book Estimate</button>
          </div>
        </div>

        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 28,
          display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12
        }}>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>&copy; {new Date().getFullYear()} The Garage Flip. All rights reserved.</span>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>Orlando · Winter Park · College Park · Lake Nona & Beyond</span>
        </div>
      </div>
    </footer>
  );
}

// ─── APP ───
export default function App() {
  return (
    <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", margin: 0, background: C.bg }}>
      <Nav />
      <Hero />
      <TrustStrip />
      <PainPoints />
      <Services />
      <Process />
      <UrgencyBanner />
      <Pricing />
      <Results />
      <FAQ />
      <Footer />
    </div>
  );
}
