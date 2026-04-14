import { NextResponse } from "next/server";
import { saveRetreatWaitlist } from "@/lib/airtable";
import { sendRetreatWaitlistEmail } from "@/lib/email";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: { email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const email = (body.email || "").trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  await saveRetreatWaitlist(email).catch((e) => console.error("waitlist airtable", e));
  await sendRetreatWaitlistEmail(email).catch((e) => console.error("waitlist email", e));

  return NextResponse.json({ ok: true });
}
