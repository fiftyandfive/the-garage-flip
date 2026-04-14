import { Resend } from "resend";
import { BRAND } from "./brand";
import type { QuoteRecord } from "./airtable";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

const TO = () => process.env.LEAD_NOTIFY_EMAIL || BRAND.email;

export async function sendQuoteEmail(r: QuoteRecord) {
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
    ${(r.photoUrls || []).length ? `<p><strong>Photos:</strong><br>${(r.photoUrls || []).map((u) => `<a href="${u}">${u}</a>`).join("<br>")}</p>` : ""}
    <p><strong>Future interest:</strong> ${intents.length ? intents.join(", ") : "—"}</p>
    <p><small>Source: ${r.source || "site"}</small></p>
  `;

  if (!resend) {
    console.log("[email stub] would send to", TO(), html);
    return { id: "stub", stubbed: true };
  }

  const sent = await resend.emails.send({
    from: `${BRAND.name} <hello@thegarageflip.com>`,
    to: [TO()],
    replyTo: r.phone ? undefined : undefined,
    subject: `New quote: ${r.name} — ${r.garageSize} / ${r.timeline}`,
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
