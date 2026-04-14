import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getGaragePlan } from "@/lib/airtable";
import { AdminLogin } from "../../AdminLogin";
import { PlanEditor } from "./PlanEditor";

export const dynamic = "force-dynamic";

async function isAuthed(): Promise<boolean> {
  const store = await cookies();
  const token = store.get("tgf_admin")?.value;
  const expected = process.env.ADMIN_PASSWORD;
  return !!expected && !!token && token === expected;
}

function split(val: unknown): string[] {
  if (typeof val !== "string") return [];
  return val
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

export default async function PlanPage({ params }: { params: Promise<{ id: string }> }) {
  const authed = await isAuthed();
  if (!authed) return <AdminLogin />;

  const { id } = await params;
  const plan = await getGaragePlan(id);
  if (!plan) notFound();

  const initial = {
    id,
    customer_name: (plan.customer_name as string) || "",
    customer_email: (plan.customer_email as string) || "",
    job_date: (plan.job_date as string) || "",
    garage_size: (plan.garage_size as string) || "",
    before_photos: split(plan.before_photos),
    after_photos: split(plan.after_photos),
    phase1: (plan.phase1 as string) || "",
    phase2: (plan.phase2 as string) || "",
    phase3: (plan.phase3 as string) || "",
    phase4: (plan.phase4 as string) || "",
    status: (plan.status as string) || "draft",
  };

  return (
    <div>
      <Link href="/admin" style={{ color: "#5A5A60", fontSize: 13 }}>← Back to admin</Link>
      <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", marginTop: 8 }}>
        Garage Plan — {initial.customer_name || "(unnamed)"}
      </h1>
      <p style={{ color: "#5A5A60", marginBottom: 24 }}>
        Status: <strong>{initial.status}</strong>
      </p>
      <PlanEditor initial={initial} />
    </div>
  );
}
