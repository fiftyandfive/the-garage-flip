import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { password } = (await req.json().catch(() => ({}))) as { password?: string };
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    return NextResponse.json(
      { error: "ADMIN_PASSWORD not configured." },
      { status: 500 }
    );
  }
  if (!password || password !== expected) {
    return NextResponse.json({ error: "Invalid password." }, { status: 401 });
  }

  const store = await cookies();
  store.set("tgf_admin", expected, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });

  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  const store = await cookies();
  store.delete("tgf_admin");
  return NextResponse.json({ ok: true });
}
