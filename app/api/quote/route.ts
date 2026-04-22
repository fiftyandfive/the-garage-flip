import { NextResponse } from "next/server";
import { saveQuoteToAirtable, type QuoteRecord } from "@/lib/airtable";
import { sendQuoteEmail, type Attachment } from "@/lib/email";

export const runtime = "nodejs";

const FORMSPREE_URL = "https://formspree.io/f/xkokwnov";

type Payload = {
  name: string;
  phone: string;
  address: string;
  garageSize: string;
  timeline: string;
  notes?: string;
  source?: string;
  service?: string;
  intent_epoxy?: boolean;
  intent_cabinets?: boolean;
  intent_racks?: boolean;
  intent_ev_charger?: boolean;
  intent_ac?: boolean;
  intent_full_transformation?: boolean;
  attachments?: Attachment[];
};

async function submitToFormspree(record: QuoteRecord) {
  const intents = [
    record.intent_epoxy && "Epoxy",
    record.intent_cabinets && "Cabinets",
    record.intent_racks && "Overhead racks",
    record.intent_ev_charger && "EV charger",
    record.intent_ac && "AC / climate",
    record.intent_full_transformation && "Full transformation",
  ].filter(Boolean);

  const res = await fetch(FORMSPREE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      name: record.name,
      phone: record.phone,
      address: record.address,
      garageSize: record.garageSize,
      timeline: record.timeline,
      source: record.source,
      futureInterest: intents.length ? intents.join(", ") : "None selected",
      _subject: `New quote: ${record.name} — ${record.garageSize} / ${record.timeline}`,
    }),
  });
  if (!res.ok) throw new Error(`Formspree ${res.status}`);
  return true;
}

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.name || !body.phone || !body.address) {
    return NextResponse.json(
      { error: "Name, phone, and address are required." },
      { status: 400 }
    );
  }

  const record: QuoteRecord = {
    name: body.name,
    phone: body.phone,
    address: body.address,
    garageSize: body.garageSize || "Unknown",
    timeline: body.timeline || "Unknown",
    source: body.source || (body.service ? `site:${body.service}` : "site"),
    intent_epoxy: !!body.intent_epoxy,
    intent_cabinets: !!body.intent_cabinets,
    intent_racks: !!body.intent_racks,
    intent_ev_charger: !!body.intent_ev_charger,
    intent_ac: !!body.intent_ac,
    intent_full_transformation: !!body.intent_full_transformation,
  };

  const safeAttachments: Attachment[] = Array.isArray(body.attachments)
    ? body.attachments
        .filter((a) => a && typeof a.filename === "string" && typeof a.content === "string")
        .slice(0, 3)
        .filter((a) => a.content.length < 6 * 1024 * 1024)
    : [];

  const formspreeResult = await submitToFormspree(record).catch((e) => {
    console.error("formspree error", e);
    return null;
  });

  const airtableResult = await saveQuoteToAirtable(record).catch((e) => {
    console.error("airtable error", e);
    return null;
  });

  const emailResult = await sendQuoteEmail(record, safeAttachments).catch((e) => {
    console.error("email error", e);
    return null;
  });

  if (!formspreeResult && !airtableResult && !emailResult) {
    console.log("[quote lead — NO DESTINATION CONFIGURED]", record);
  }

  return NextResponse.json({
    ok: true,
    formspree: !!formspreeResult,
    airtable: airtableResult,
    emailed: !!emailResult && !emailResult.stubbed,
  });
}
