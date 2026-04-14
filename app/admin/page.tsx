import { cookies } from "next/headers";
import { AdminLogin } from "./AdminLogin";
import { NewPlanForm } from "./NewPlanForm";

export const dynamic = "force-dynamic";

async function isAuthed(): Promise<boolean> {
  const store = await cookies();
  const token = store.get("tgf_admin")?.value;
  const expected = process.env.ADMIN_PASSWORD;
  return !!expected && !!token && token === expected;
}

export default async function AdminHome() {
  const authed = await isAuthed();
  if (!authed) return <AdminLogin />;
  return (
    <div>
      <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", marginBottom: 8 }}>Garage Plans</h1>
      <p style={{ color: "#5A5A60", marginBottom: 24 }}>
        Start a new plan from a completed job. After you trigger it, you&apos;ll get a link to draft and
        send the customer their phased roadmap.
      </p>
      <NewPlanForm />
    </div>
  );
}
