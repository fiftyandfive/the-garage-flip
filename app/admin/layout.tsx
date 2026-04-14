import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "#F4F1EB" }}>
      <header
        style={{
          padding: "16px 24px",
          background: "#0E0E10",
          color: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link href="/admin" style={{ color: "#fff", textDecoration: "none", fontWeight: 700 }}>
          The Garage Flip · Admin
        </Link>
        <form action="/api/admin/login" method="post">
          <button
            type="submit"
            formMethod="DELETE"
            style={{
              background: "transparent",
              color: "#F26B1F",
              border: "1px solid #F26B1F",
              padding: "6px 12px",
              borderRadius: 6,
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Sign out
          </button>
        </form>
      </header>
      <main style={{ padding: "32px 24px", maxWidth: 900, margin: "0 auto" }}>{children}</main>
    </div>
  );
}
