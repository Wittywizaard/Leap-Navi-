import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "linear-gradient(160deg,#F7FAFF,#EBF3FF)", fontFamily: "'DM Sans', sans-serif", textAlign: "center", padding: 32 }}>
      <div style={{ fontSize: 64, marginBottom: 20 }}>🧭</div>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 48, fontWeight: 800, color: "#0A1628", marginBottom: 12 }}>Lost?</h1>
      <p style={{ fontSize: 18, color: "#5A7494", marginBottom: 36 }}>This page doesn't exist — but your next career move does.</p>
      <Link href="/" style={{ padding: "14px 36px", background: "linear-gradient(135deg,#1D6FE8,#4D9EFF)", color: "white", borderRadius: 100, fontWeight: 700, fontSize: 16, textDecoration: "none", boxShadow: "0 4px 20px rgba(29,111,232,0.3)" }}>
        Back to Navi →
      </Link>
    </div>
  );
}
