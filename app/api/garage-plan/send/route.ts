import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getGaragePlan, updateGaragePlan } from "@/lib/airtable";
import { sendGaragePlanEmail } from "@/lib/email";

export const runtime = "nodejs";

type Payload = {
  id: string;
  to: string;
  customer_name: string;
  job_date: string;
  garage_size: string;
  before_photos: string[];
  after_photos: string[];
  phase1: string;
  phase2: string;
  phase3: string;
  phase4: string;
};

async function isAuthed(): Promise<boolean> {
  const store = await cookies();
  const token = store.get("tgf_admin")?.value;
  const expected = process.env.ADMIN_PASSWORD;
  return !!expected && !!token && token === expected;
}

export async function POST(req: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.id || !body.to || !body.customer_name) {
    return NextResponse.json(
      { error: "id, to, and customer_name are required." },
      { status: 400 }
    );
  }

  // Ensure the plan exists before sending.
  const plan = await getGaragePlan(body.id);
  if (!plan) {
    return NextResponse.json({ error: "Plan not found." }, { status: 404 });
  }

  const emailed = await sendGaragePlanEmail({
    to: body.to,
    customerName: body.customer_name,
    jobDate: body.job_date,
    garageSize: body.garage_size,
    beforePhotos: body.before_photos || [],
    afterPhotos: body.after_photos || [],
    phase1: body.phase1 || "",
    phase2: body.phase2 || "",
    phase3: body.phase3 || "",
    phase4: body.phase4 || "",
  }).catch((e) => {
    console.error("garage-plan email error", e);
    return null;
  });

  await updateGaragePlan(body.id, {
    customer_name: body.customer_name,
    customer_email: body.to,
    job_date: body.job_date,
    garage_size: body.garage_size,
    before_photos: (body.before_photos || []).join("\n"),
    after_photos: (body.after_photos || []).join("\n"),
    phase1: body.phase1 || "",
    phase2: body.phase2 || "",
    phase3: body.phase3 || "",
    phase4: body.phase4 || "",
    status: emailed && !emailed.stubbed ? "sent" : "draft",
    sent_at: emailed && !emailed.stubbed ? new Date().toISOString() : "",
  }).catch((e) => {
    console.error("garage-plan update error", e);
  });

  return NextResponse.json({ ok: true, emailed: !!emailed && !emailed.stubbed });
}
