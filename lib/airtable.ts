import Airtable from "airtable";

function getBase() {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  if (!apiKey || !baseId) return null;
  return new Airtable({ apiKey }).base(baseId);
}

export type QuoteRecord = {
  name: string;
  phone: string;
  address: string;
  garageSize: string;
  timeline: string;
  photoUrls?: string[];
  source?: string;
  // Structured future-intent booleans — monetization payload
  intent_epoxy: boolean;
  intent_cabinets: boolean;
  intent_racks: boolean;
  intent_ev_charger: boolean;
  intent_ac: boolean;
  intent_full_transformation: boolean;
};

export async function saveQuoteToAirtable(r: QuoteRecord): Promise<string | null> {
  const base = getBase();
  if (!base) return null;
  const table = process.env.AIRTABLE_QUOTES_TABLE || "quotes";
  const created = await base(table).create({
    name: r.name,
    phone: r.phone,
    address: r.address,
    garage_size: r.garageSize,
    timeline: r.timeline,
    photo_urls: (r.photoUrls || []).join("\n"),
    source: r.source || "site",
    intent_epoxy: r.intent_epoxy,
    intent_cabinets: r.intent_cabinets,
    intent_racks: r.intent_racks,
    intent_ev_charger: r.intent_ev_charger,
    intent_ac: r.intent_ac,
    intent_full_transformation: r.intent_full_transformation,
    submitted_at: new Date().toISOString(),
  });
  return created.getId();
}

export async function saveRetreatWaitlist(email: string): Promise<string | null> {
  const base = getBase();
  if (!base) return null;
  const table = process.env.AIRTABLE_RETREAT_WAITLIST_TABLE || "retreat_waitlist";
  const created = await base(table).create({
    email,
    submitted_at: new Date().toISOString(),
  });
  return created.getId();
}
