"use client";
import { useState } from "react";

export function AdminLogin() {
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Login failed");
      }
      window.location.reload();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Login failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ maxWidth: 380, margin: "60px auto" }}>
      <h1 style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Admin sign-in</h1>
      <p style={{ color: "#5A5A60", marginTop: 8, marginBottom: 20 }}>
        Single-user admin. Use the shared password.
      </p>
      <form onSubmit={submit}>
        <div style={{ marginBottom: 12 }}>
          <label htmlFor="pw" style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
            Password
          </label>
          <input
            id="pw"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoFocus
            style={{
              width: "100%",
              padding: "12px 14px",
              border: "1px solid #E5E1D8",
              borderRadius: 8,
              background: "#fff",
            }}
          />
        </div>
        <button
          type="submit"
          disabled={busy}
          style={{
            background: "#F26B1F",
            color: "#fff",
            border: "none",
            padding: "12px 20px",
            borderRadius: 8,
            fontWeight: 700,
            cursor: "pointer",
            width: "100%",
          }}
        >
          {busy ? "Signing in…" : "Sign in"}
        </button>
        {err ? (
          <p style={{ color: "#c92a2a", marginTop: 12, fontSize: 13 }}>{err}</p>
        ) : null}
      </form>
    </div>
  );
}
