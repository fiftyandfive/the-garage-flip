import { NextResponse } from "next/server";
import { saveQuoteToAirtable, type QuoteRecord } from "@/lib/airtable";
import { sendQuoteEmail } from "@/lib/email";

export const runtime = "nodejs";

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
};

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

  const airtableResult = await saveQuoteToAirtable(record).catch((e) => {
    console.error("airtable error", e);
    return null;
  });
  const emailResult = await sendQuoteEmail(record).catch((e) => {
    console.error("email error", e);
    return null;
  });

  if (!airtableResult && !emailResult) {
    // Both destinations failed and no creds are set — still return OK so the user sees success.
    // Logs will show the payload for manual follow-up.
    console.log("[quote lead — NO DESTINATION CONFIGURED]", record);
  }

  return NextResponse.json({
    ok: true,
    airtable: airtableResult,
    emailed: !!emailResult && !emailResult.stubbed,
  });
}
