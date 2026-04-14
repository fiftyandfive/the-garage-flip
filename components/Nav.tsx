import Link from "next/link";
import { BRAND } from "@/lib/brand";

export function Nav() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <img src="/logo-transparent.png" alt="The Garage Flip" style={{ height: 34, width: "auto" }} />
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, letterSpacing: "-0.01em" }}>
            THE GARAGE FLIP
          </span>
        </Link>
        <div className="nav-links">
          <Link href="/garage-cleanout-orlando">Cleanouts</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/faq">FAQ</Link>
          <a href={`tel:${BRAND.phoneTel}`} style={{ fontWeight: 700 }}>{BRAND.phone}</a>
          <Link href="/book" className="btn btn-primary" style={{ padding: "10px 18px", fontSize: 14 }}>
            Get a quote
          </Link>
        </div>
      </div>
    </nav>
  );
}
