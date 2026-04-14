"use client";
import Link from "next/link";
import { useState } from "react";
import { track } from "@/lib/plausible";

export function PackageGrid() {
  return (
    <div>
      <div className="pkg-grid">
        {/* RUNG 1 — RESET */}
        <div className="pkg-card">
          <div className="pkg-name">THE RESET</div>
          <div>
            <div className="pkg-price">From $600</div>
            <div className="pkg-price-sub">1-car · From $800 (2-car) · $1,000 (3-car) · Oversized quoted on site</div>
          </div>
          <div className="pkg-tagline">Start fresh.</div>
          <ul className="pkg-list">
            <li>Full removal of clutter, junk, and unwanted items</li>
            <li>Sort → donate → recycle → haul (we tell you where everything went)</li>
            <li>Sweep and basic wipe-down</li>
            <li>Designed to be completed same-day</li>
          </ul>
          <Link
            href="/book?service=reset"
            className="btn btn-ghost"
            onClick={() => track("package_select_reset")}
            data-plausible-event="package_select_reset"
          >
            Book The Reset →
          </Link>
        </div>

        {/* RUNG 2 — REFRESH (featured) */}
        <div className="pkg-card featured">
          <span className="pkg-badge">Most Popular</span>
          <div className="pkg-name">THE REFRESH</div>
          <div>
            <div className="pkg-price">From $1,200</div>
            <div className="pkg-price-sub">1-car · From $1,500 (2-car) · $1,800 (3-car)</div>
          </div>
          <div className="pkg-tagline">Cleanout + organization that actually sticks.</div>
          <ul className="pkg-list">
            <li>Everything in The Reset</li>
            <li>Custom sorting and category zoning (tools, sports, seasonal, kids)</li>
            <li>Overhead storage rack install (rack provided OR client-supplied)</li>
            <li>Wall-mounted shelving and hook systems</li>
            <li>Labeled bins for what stays</li>
            <li>Walk-through and handoff so the system lasts</li>
          </ul>
          <Link
            href="/book?service=refresh"
            className="btn btn-primary"
            onClick={() => track("package_select_refresh")}
            data-plausible-event="package_select_refresh"
          >
            Book The Refresh →
          </Link>
        </div>

        {/* RUNG 3 — RETREAT (coming 2026) */}
        <RetreatCard />
      </div>

      <p className="lead" style={{ marginTop: 40, textAlign: "center", maxWidth: 780, marginInline: "auto" }}>
        Cleanout and organization are what we do today — end to end, nothing subcontracted.
        The Retreat is the bigger version of that same promise, coming in 2026 when we have
        the right partners under contract. We'd rather be two things done right than ten things half-done.
      </p>
    </div>
  );
}

function RetreatCard() {
  const [open, setOpen] = useState(false);
  return (
    <div className="pkg-card soon">
      <span className="pkg-badge soon-badge">Coming 2026</span>
      <div className="pkg-name">THE RETREAT</div>
      <div className="pkg-tagline">Full garage transformation — the next chapter.</div>
      <p style={{ fontSize: 14, color: "var(--c-text-muted)" }}>
        Details in progress. We're building this to match the same standard as The Reset and
        The Refresh: one point of contact, fixed quote in writing, no surprises. Launching 2026.
      </p>
      <button
        className="btn btn-ghost"
        onClick={() => setOpen(true)}
      >
        Get notified when it launches
      </button>
      {open ? <WaitlistModal onClose={() => setOpen(false)} /> : null}
    </div>
  );
}

function WaitlistModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "ok" | "err">("idle");
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    try {
      const r = await fetch("/api/retreat-waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!r.ok) throw new Error("fail");
      setState("ok");
      track("retreat_waitlist_signup");
    } catch {
      setState("err");
    }
  }
  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed", inset: 0, background: "rgba(14,14,16,.72)",
        display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: 24,
      }}
      onClick={onClose}
    >
      <div
        className="card"
        onClick={(e) => e.stopPropagation()}
        style={{ width: "100%", maxWidth: 440, background: "#fff" }}
      >
        <h3 style={{ marginBottom: 8 }}>The Retreat waitlist</h3>
        <p className="muted" style={{ fontSize: 14, marginBottom: 18 }}>
          We'll email you once when it launches in 2026. Nothing else.
        </p>
        {state === "ok" ? (
          <p style={{ color: "var(--c-accent)", fontWeight: 700 }}>You're on the list.</p>
        ) : (
          <form onSubmit={submit}>
            <div className="form-field">
              <label htmlFor="wl-email">Email</label>
              <input
                id="wl-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button className="btn btn-primary" type="submit" disabled={state === "sending"}>
              {state === "sending" ? "Adding…" : "Add me →"}
            </button>
            {state === "err" ? (
              <p style={{ color: "#c92a2a", fontSize: 13, marginTop: 10 }}>
                Something glitched. Email {`{BRAND.email}`} and we'll add you.
              </p>
            ) : null}
          </form>
        )}
      </div>
    </div>
  );
}
