"use client";
import { useState } from "react";

export function NewPlanForm() {
  const [form, setForm] = useState({
    customer_name: "",
    customer_email: "",
    job_date: new Date().toISOString().slice(0, 10),
    garage_size: "2-car",
    notes: "",
  });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  function set<K extends keyof typeof form>(k: K, v: string) {
    setForm((s) => ({ ...s, [k]: v }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr("");
    try {
      const res = await fetch("/api/garage-plan/trigger", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.error || "Trigger failed");
      window.location.href = j.editUrl || "/admin";
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Trigger failed");
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
  };

  return (
    <form
      onSubmit={submit}
      style={{ background: "#fff", padding: 24, borderRadius: 12, border: "1px solid #E5E1D8" }}
    >
      <h2 style={{ marginBottom: 16, fontFamily: "'Space Grotesk', sans-serif" }}>
        Start a new Garage Plan
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>Customer name</label>
          <input style={input} required value={form.customer_name} onChange={(e) => set("customer_name", e.target.value)} />
        </div>
        <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>Customer email</label>
          <input style={input} type="email" required value={form.customer_email} onChange={(e) => set("customer_email", e.target.value)} />
        </div>
        <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>Job date</label>
          <input style={input} type="date" value={form.job_date} onChange={(e) => set("job_date", e.target.value)} />
        </div>
        <div>
          <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>Garage size</label>
          <select style={input} value={form.garage_size} onChange={(e) => set("garage_size", e.target.value)}>
            <option>1-car</option>
            <option>2-car</option>
            <option>3-car</option>
            <option>Oversized</option>
          </select>
        </div>
      </div>
      <div style={{ marginTop: 12 }}>
        <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>Internal notes</label>
        <textarea
          style={{ ...input, minHeight: 80 }}
          value={form.notes}
          onChange={(e) => set("notes", e.target.value)}
        />
      </div>
      <button
        type="submit"
        disabled={busy}
        style={{
          marginTop: 16,
          background: "#F26B1F",
          color: "#fff",
          border: "none",
          padding: "12px 20px",
          borderRadius: 8,
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        {busy ? "Creating…" : "Create draft →"}
      </button>
      {err ? <p style={{ color: "#c92a2a", marginTop: 12, fontSize: 13 }}>{err}</p> : null}
    </form>
  );
}
