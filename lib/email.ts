import { Resend } from "resend";
import { BRAND } from "./brand";
import type { QuoteRecord } from "./airtable";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

const TO = () => process.env.LEAD_NOTIFY_EMAIL || BRAND.email;

export type Attachment = { filename: string; content: string }; // content = base64 string

export async function sendQuoteEmail(r: QuoteRecord, attachments?: Attachment[]) {
  const resend = getResend();
  const intents = [
    r.intent_epoxy && "Epoxy",
    r.intent_cabinets && "Cabinets",
    r.intent_racks && "Overhead racks",
    r.intent_ev_charger && "EV charger",
    r.intent_ac && "AC / climate",
    r.intent_full_transformation && "Full transformation",
  ].filter(Boolean);

  const html = `
    <h2>New quote request — ${r.name}</h2>
    <p><strong>Phone:</strong> <a href="tel:${r.phone}">${r.phone}</a></p>
    <p><strong>Address / ZIP:</strong> ${r.address}</p>
    <p><strong>Garage size:</strong> ${r.garageSize}</p>
    <p><strong>Timeline:</strong> ${r.timeline}</p>
    <p><strong>Photos attached:</strong> ${(attachments || []).length}</p>
    <p><strong>Future interest:</strong> ${intents.length ? intents.join(", ") : "—"}</p>
    <p><small>Source: ${r.source || "site"}</small></p>
  `;

  if (!resend) {
    console.log("[email stub] would send to", TO(), html, "attachments:", (attachments || []).length);
    return { id: "stub", stubbed: true };
  }

  const sent = await resend.emails.send({
    from: `${BRAND.name} <hello@thegarageflip.com>`,
    to: [TO()],
    subject: `New quote: ${r.name} — ${r.garageSize} / ${r.timeline}`,
    html,
    attachments: (attachments || []).map((a) => ({
      filename: a.filename,
      content: a.content,
    })),
  });
  return { id: sent.data?.id || null, stubbed: false };
}

export async function sendGaragePlanEmail(opts: {
  to: string;
  customerName: string;
  jobDate: string;
  garageSize: string;
  beforePhotos: string[];
  afterPhotos: string[];
  phase1: string;
  phase2: string;
  phase3: string;
  phase4: string;
}) {
  const resend = getResend();
  const photoBlock = (label: string, urls: string[]) =>
    urls.length
      ? `<h3>${label}</h3>${urls.map((u) => `<img src="${u}" style="max-width:520px;border-radius:10px;margin:8px 0;" alt="${label}">`).join("")}`
      : "";

  const html = `
    <div style="font-family:Inter,sans-serif;color:#0E0E10;line-height:1.55;max-width:600px;">
      <h1 style="font-family:'Space Grotesk',sans-serif;">Your Garage Plan</h1>
      <p>Hi ${opts.customerName.split(" ")[0]} —</p>
      <p>Wanted to get this into your inbox while it's fresh: a quick recap of what we did
      today (${opts.jobDate}) on your ${opts.garageSize} garage, and a no-pressure roadmap for what could come next.</p>

      ${photoBlock("Before", opts.beforePhotos)}
      ${photoBlock("After", opts.afterPhotos)}

      <h2>Phase 1 — What we did today</h2>
      <p>${opts.phase1}</p>

      <h2>Phase 2 — In 3–6 months</h2>
      <p>${opts.phase2}</p>

      <h2>Phase 3 — In 12 months</h2>
      <p>${opts.phase3}</p>

      <h2>Phase 4 — The Retreat (when we launch it in 2026)</h2>
      <p>${opts.phase4}</p>

      <p style="margin-top:32px;">No CTAs, no pitch — this is a thank-you. Reply to this email
      anytime. I read every one.</p>
      <p>— ${BRAND.founder}<br>${BRAND.name}<br>${BRAND.phone}</p>
    </div>
  `;

  if (!resend) {
    console.log("[email stub] garage plan to", opts.to);
    return { id: "stub", stubbed: true };
  }

  const sent = await resend.emails.send({
    from: `Lucas at ${BRAND.name} <hello@thegarageflip.com>`,
    to: [opts.to],
    subject: `Your Garage Plan from The Garage Flip`,
    html,
  });
  return { id: sent.data?.id || null, stubbed: false };
}

export async function sendRetreatWaitlistEmail(email: string) {
  const resend = getResend();
  if (!resend) {
    console.log("[email stub] retreat waitlist", email);
    return { id: "stub", stubbed: true };
  }
  const sent = await resend.emails.send({
    from: `${BRAND.name} <hello@thegarageflip.com>`,
    to: [TO()],
    subject: `Retreat waitlist signup: ${email}`,
    html: `<p>New Retreat waitlist signup: <strong>${email}</strong></p>`,
  });
  return { id: sent.data?.id || null, stubbed: false };
}
