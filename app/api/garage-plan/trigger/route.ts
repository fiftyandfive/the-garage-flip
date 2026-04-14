import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createGaragePlanDraft } from "@/lib/airtable";

export const runtime = "nodejs";

type Payload = {
  customer_id?: string;
  customer_name?: string;
  customer_email?: string;
  job_id?: string;
  job_date?: string;
  garage_size?: string;
  before_photos?: string[];
  after_photos?: string[];
  notes?: string;
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

  const id = await createGaragePlanDraft({
    customer_id: body.customer_id,
    customer_name: body.customer_name,
    customer_email: body.customer_email,
    job_id: body.job_id,
    job_date: body.job_date || new Date().toISOString().slice(0, 10),
    garage_size: body.garage_size,
    before_photos: body.before_photos,
    after_photos: body.after_photos,
    notes: body.notes,
  }).catch((e) => {
    console.error("garage-plan draft error", e);
    return null;
  });

  if (!id) {
    return NextResponse.json(
      { error: "Could not create draft. Check Airtable credentials." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, id, editUrl: `/admin/garage-plans/${id}` });
}
