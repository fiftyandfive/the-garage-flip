"use client";
import { useState } from "react";
import { track, trackLead } from "@/lib/plausible";
import { BRAND } from "@/lib/brand";

type Props = {
  compact?: boolean;
  source?: string;
  defaultService?: string;
};

const INTENTS = [
  { key: "intent_epoxy", label: "Epoxy flooring" },
  { key: "intent_cabinets", label: "Custom cabinets or built-in storage" },
  { key: "intent_racks", label: "Overhead racks / heavy-duty storage systems" },
  { key: "intent_ev_charger", label: "EV charger install" },
  { key: "intent_ac", label: "AC or climate control for the garage" },
  { key: "intent_full_transformation", label: "Full garage transformation (someday)" },
] as const;

type IntentKey = typeof INTENTS[number]["key"];

export function InstantQuoteForm({ compact, source, defaultService }: Props) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    garageSize: "2-car",
    timeline: "This month",
    notes: "",
  });
  const [intent, setIntent] = useState<Record<IntentKey, boolean>>({
    intent_epoxy: false,
    intent_cabinets: false,
    intent_racks: false,
    intent_ev_charger: false,
    intent_ac: false,
    intent_full_transformation: false,
  });
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoErr, setPhotoErr] = useState<string>("");
  const [state, setState] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  function setField<K extends keyof typeof form>(k: K, v: string) {
    setForm((s) => ({ ...s, [k]: v }));
  }
  function toggleIntent(k: IntentKey) {
    setIntent((s) => ({ ...s, [k]: !s[k] }));
  }

  function onPhotos(e: React.ChangeEvent<HTMLInputElement>) {
    setPhotoErr("");
    const files = Array.from(e.target.files || []);
    const capped = files.slice(0, 3);
    const over = capped.find((f) => f.size > 4 * 1024 * 1024);
    if (over) {
      setPhotoErr(`"${over.name}" is over 4MB. Try a smaller photo.`);
      setPhotos([]);
      return;
    }
    if (files.length > 3) {
      setPhotoErr("Max 3 photos — we'll use the first 3.");
    }
    setPhotos(capped);
  }

  function fileToBase64(f: File): Promise<{ filename: string; content: string }> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.includes(",") ? result.split(",")[1] : result;
        resolve({ filename: f.name, content: base64 });
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(f);
    });
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    setErrorMsg("");
    try {
      const attachments = photos.length
        ? await Promise.all(photos.map(fileToBase64))
        : [];
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...form, ...intent, source: source || "form", service: defaultService, attachments }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Submission failed");
      }
      setState("ok");
      trackLead({
        garage_size: form.garageSize,
        timeline: form.timeline,
        source: source || "form",
      });
      // Fire per-category intent events for granular reporting
      const declared = INTENTS.filter((i) => intent[i.key]);
      if (declared.length > 0) {
        track("intent_declared", { count: declared.length });
        declared.forEach((i) => track(`intent_declared_${i.key.replace("intent_", "")}`));
      }
    } catch (err) {
      setState("err");
      setErrorMsg(err instanceof Error ? err.message : "Something glitched.");
    }
  }

  if (state === "ok") {
    return (
      <div>
        <h3 style={{ color: "var(--c-accent)" }}>Got it.</h3>
        <p style={{ marginTop: 8 }}>
          You&apos;ll hear from Lucas directly within 12 hours. Text{" "}
          <a href={`sms:${BRAND.phoneSms}`} style={{ color: "var(--c-accent)", fontWeight: 700 }}>
            {BRAND.phone}
          </a>{" "}
          if it&apos;s urgent.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit}>
      <div className="form-field">
        <label htmlFor="q-name">Full name</label>
        <input id="q-name" required value={form.name} onChange={(e) => setField("name", e.target.value)} />
      </div>
      <div className="form-field">
        <label htmlFor="q-phone">Phone</label>
        <input
          id="q-phone" type="tel" required
          placeholder="(407) 555-0000"
          pattern="[\d\s\-\(\)\+]{10,}"
          value={form.phone}
          onChange={(e) => setField("phone", e.target.value)}
        />
      </div>
      <div className="form-field">
        <label htmlFor="q-address">Address or ZIP</label>
        <input id="q-address" required value={form.address} onChange={(e) => setField("address", e.target.value)} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div className="form-field">
          <label htmlFor="q-size">Garage size</label>
          <select id="q-size" value={form.garageSize} onChange={(e) => setField("garageSize", e.target.value)}>
            <option>1-car</option>
            <option>2-car</option>
            <option>3-car</option>
            <option>Oversized</option>
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="q-timeline">Timeline</label>
          <select id="q-timeline" value={form.timeline} onChange={(e) => setField("timeline", e.target.value)}>
            <option>This week</option>
            <option>This month</option>
            <option>Just exploring</option>
          </select>
        </div>
      </div>

      {!compact ? (
        <div className="form-field">
          <label htmlFor="q-notes">Anything we should know? (optional)</label>
          <textarea id="q-notes" rows={3} value={form.notes} onChange={(e) => setField("notes", e.target.value)} />
        </div>
      ) : null}

      <div className="form-field">
        <label htmlFor="q-photo">📷 Photo of the garage (optional, but speeds things up)</label>
        <input id="q-photo" type="file" accept="image/*" multiple
          onChange={onPhotos}
          style={{ padding: 8, background: "var(--c-band)" }} />
        <span style={{ fontSize: 12, color: "var(--c-text-muted)" }}>
          A quick phone photo = faster, more accurate quote. Up to 3 photos, 4MB each.
        </span>
        {photoErr ? (
          <span style={{ fontSize: 12, color: "#c92a2a", marginTop: 4 }}>{photoErr}</span>
        ) : null}
        {photos.length ? (
          <span style={{ fontSize: 12, color: "var(--c-accent)", marginTop: 4, fontWeight: 600 }}>
            {photos.length} photo{photos.length > 1 ? "s" : ""} attached.
          </span>
        ) : null}
      </div>

      {/* Future-intent capture — structured columns, never free text */}
      <div
        style={{
          marginTop: 18, paddingTop: 18,
          borderTop: "1px dashed var(--c-border)",
        }}
      >
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>
          Eventually, I might also be interested in:
        </div>
        <div style={{ display: "grid", gridTemplateColumns: compact ? "1fr" : "1fr 1fr", gap: 4 }}>
          {INTENTS.map((i) => (
            <label key={i.key} className="checkbox-row">
              <input
                type="checkbox"
                checked={intent[i.key]}
                onChange={() => toggleIntent(i.key)}
              />
              <span>{i.label}</span>
            </label>
          ))}
        </div>
        <p style={{ fontStyle: "italic", fontSize: 12, color: "var(--c-text-light)", marginTop: 8 }}>
          We&apos;re not pitching any of this today. We just like to know what our customers are thinking about long-term.
        </p>
      </div>

      <button
        className="btn btn-primary"
        type="submit"
        disabled={state === "sending"}
        style={{ marginTop: 16, width: "100%" }}
      >
        {state === "sending" ? "Sending…" : "Get my free quote →"}
      </button>
      {state === "err" ? (
        <p style={{ color: "#c92a2a", fontSize: 13, marginTop: 10 }}>
          {errorMsg || "Something glitched."} Try texting{" "}
          <a href={`sms:${BRAND.phoneSms}`} style={{ fontWeight: 700 }}>{BRAND.phone}</a>.
        </p>
      ) : null}

      <div style={{ display: "flex", gap: 12, marginTop: 14, justifyContent: "center", flexWrap: "wrap" }}>
        <a href={`tel:${BRAND.phoneTel}`} style={{ fontSize: 13, fontWeight: 600, color: "var(--c-text-muted)" }} data-plausible-event="phone_click">
          📞 Call {BRAND.phone}
        </a>
        <a href={`sms:${BRAND.phoneSms}&body=${encodeURIComponent("Garage cleanout quote request")}`} style={{ fontSize: 13, fontWeight: 600, color: "var(--c-text-muted)" }} data-plausible-event="sms_click">
          💬 Text us a photo
        </a>
      </div>
    </form>
  );
}
