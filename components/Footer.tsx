import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { NEIGHBORHOODS } from "@/lib/neighborhoods";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <img src="/logo-transparent.png" alt="" style={{ height: 34, filter: "brightness(0) invert(1)" }} />
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: "#fff" }}>
              THE GARAGE FLIP
            </span>
          </div>
          <p style={{ color: "rgba(255,255,255,.7)", fontSize: 14, maxWidth: 320 }}>
            Garage cleanout and organization in Orlando, FL. Fixed quote, free haul-away, donation receipts.
          </p>
          {/* NAP — must be identical on every page */}
          <address style={{ fontStyle: "normal", marginTop: 20, fontSize: 14, lineHeight: 1.7 }}>
            <strong style={{ color: "#fff" }}>{BRAND.name}</strong><br />
            Orlando, FL<br />
            <a href={`tel:${BRAND.phoneTel}`}>{BRAND.phone}</a><br />
            <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
          </address>
        </div>

        <div>
          <h4>Services</h4>
          <ul>
            <li><Link href="/garage-cleanout-orlando">Garage cleanout</Link></li>
            <li><Link href="/garage-organization-orlando">Garage organization</Link></li>
            <li><Link href="/junk-removal-orlando">Junk removal</Link></li>
            <li><Link href="/pricing">Pricing</Link></li>
            <li><Link href="/book">Free quote</Link></li>
          </ul>
        </div>

        <div>
          <h4>Neighborhoods</h4>
          <ul>
            {NEIGHBORHOODS.map((n) => (
              <li key={n.slug}>
                <Link href={`/garage-cleanout-${n.slug}`}>{n.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Company</h4>
          <ul>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
            <li><a href={`tel:${BRAND.phoneTel}`}>Call {BRAND.phone}</a></li>
            <li><a href={`sms:${BRAND.phoneSms}`}>Text us a photo</a></li>
            <li><a href={`mailto:${BRAND.email}`}>{BRAND.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} {BRAND.legalName}. Orlando, FL.</span>
        <span>Garage cleanout · Garage organization · Junk removal · Orlando &amp; Orange County</span>
      </div>
    </footer>
  );
}
