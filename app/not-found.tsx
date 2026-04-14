import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ textAlign: "center", maxWidth: 520 }}>
        <span className="eyebrow">404</span>
        <h1>Page not found.</h1>
        <p className="lead" style={{ marginTop: 12 }}>
          Nothing here. Maybe you were looking for a free garage cleanout quote?
        </p>
        <Link href="/" className="btn btn-primary" style={{ marginTop: 20 }}>Back home →</Link>
      </div>
    </main>
  );
}
