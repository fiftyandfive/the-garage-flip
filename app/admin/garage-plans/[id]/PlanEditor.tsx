"use client";
import { useState } from "react";

type Initial = {
  id: string;
  customer_name: string;
  customer_email: string;
  job_date: string;
  garage_size: string;
  before_photos: string[];
  after_photos: string[];
  phase1: string;
  phase2: string;
  phase3: string;
  phase4: string;
  status: string;
};

export function PlanEditor({ initial }: { initial: Initial }) {
  const [form, setForm] = useState({
    customer_name: initial.customer_name,
    customer_email: initial.customer_email,
    job_date: initial.job_date,
    garage_size: initial.garage_size,
    before: initial.before_photos.join("\n"),
    after: initial.after_photos.join("\n"),
    phase1: initial.phase1,
    phase2: initial.phase2,
    phase3: initial.phase3,
    phase4: initial.phase4,
  });
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  function set<K extends keyof typeof form>(k: K, v: string) {
    setForm((s) => ({ ...s, [k]: v }));
  }

  async function send() {
    if (!form.customer_email) {
      setErr("Customer email required.");
      return;
    }
    setBusy(true);
    setErr("");
    setMsg("");
    try {
      const res = await fetch("/api/garage-plan/send", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          id: initial.id,
          to: form.customer_email,
          customer_name: form.customer_name,
          job_date: form.job_date,
          garage_size: form.garage_size,
          before_photos: form.before.split("\n").map((s) => s.trim()).filter(Boolean),
          after_photos: form.after.split("\n").map((s) => s.trim()).filter(Boolean),
          phase1: form.phase1,
          phase2: form.phase2,
          phase3: form.phase3,
          phase4: form.phase4,
        }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.error || "Send failed");
      setMsg(j.emailed ? "Sent to customer." : "Saved (email stubbed — no RESEND_API_KEY).");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Send failed");
    } finally {
      setBusy(false);
    }
  }

  const input: React.CSSProperties = {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #E5E1D8",
    borderRadius: 8,
    background: "#fff",
    fontFamily: "inherit",
  };
  const card: React.CSSProperties = {
    background: "#fff",
    padding: 24,
    borderRadius: 12,
    border: "1px solid #E5E1D8",
    marginBottom: 16,
  };

  return (
    <div>
      <div style={card}>
        <h2 style={{ marginBottom: 12, fontFamily: "'Space Grotesk', sans-serif" }}>Customer</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div>
            <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>Name</label>
            <input style={input} value={form.customer_name} onChange={(e) => set("customer_name", e.target.value)} />
          </div>
          <div>
            <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>Email</label>
            <input style={input} type="email" value={form.customer_email} onChange={(e) => set("customer_email", e.target.value)} />
          </div>
          <div>
            <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>Job date</label>
            <input style={input} type="date" value={form.job_date} onChange={(e) => set("job_date", e.target.value)} />
          </div>
          <div>
            <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>Garage size</label>
            <input style={input} value={form.garage_size} onChange={(e) => set("garage_size", e.target.value)} />
          </div>
        </div>
      </div>

      <div style={card}>
        <h2 style={{ marginBottom: 12, fontFamily: "'Space Grotesk', sans-serif" }}>Photos</h2>
        <p style={{ color: "#5A5A60", fontSize: 13, marginBottom: 12 }}>
          One URL per line. Paste hosted image URLs (Airtable attachments, S3, etc.).
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div>
            <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>Before photos</label>
            <textarea style={{ ...input, minHeight: 120 }} value={form.before} onChange={(e) => set("before", e.target.value)} />
          </div>
          <div>
            <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>After photos</label>
            <textarea style={{ ...input, minHeight: 120 }} value={form.after} onChange={(e) => set("after", e.target.value)} />
          </div>
        </div>
      </div>

      <div style={card}>
        <h2 style={{ marginBottom: 12, fontFamily: "'Space Grotesk', sans-serif" }}>The 4 Phases</h2>
        <Phase label="Phase 1 — What we did today" value={form.phase1} set={(v) => set("phase1", v)} />
        <Phase label="Phase 2 — In 3–6 months" value={form.phase2} set={(v) => set("phase2", v)} />
        <Phase label="Phase 3 — In 12 months" value={form.phase3} set={(v) => set("phase3", v)} />
        <Phase label="Phase 4 — The Retreat (2026)" value={form.phase4} set={(v) => set("phase4", v)} />
      </div>

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <button
          onClick={send}
          disabled={busy}
          style={{
            background: "#F26B1F",
            color: "#fff",
            border: "none",
            padding: "12px 24px",
            borderRadius: 8,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          {busy ? "Sending…" : "Save + send to customer →"}
        </button>
        {msg ? <span style={{ color: "#0a7a2f", fontWeight: 600 }}>{msg}</span> : null}
        {err ? <span style={{ color: "#c92a2a", fontWeight: 600 }}>{err}</span> : null}
      </div>
    </div>
  );
}

function Phase({ label, value, set }: { label: string; value: string; set: (v: string) => void }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>{label}</label>
      <textarea
        style={{
          width: "100%",
          padding: "10px 12px",
          border: "1px solid #E5E1D8",
          borderRadius: 8,
          background: "#fff",
          fontFamily: "inherit",
          minHeight: 90,
        }}
        value={value}
        onChange={(e) => set(e.target.value)}
      />
    </div>
  );
}
