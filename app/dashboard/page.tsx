"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface RoadmapWeek {
  week: string;
  tasks: string[];
  resources: { name: string; url: string; type: string }[];
}

interface Roadmap {
  role: string;
  weeks: RoadmapWeek[];
  milestones: string[];
  jobBoards: string[];
  salaryNote: string;
}

export default function Dashboard() {
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("navi_roadmap");
    if (data) {
      try {
        setRoadmap(JSON.parse(data));
      } catch (err) {
        console.error("Failed to parse roadmap", err);
      }
    }
  }, []);

  if (!roadmap) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#F7FAFF" }}>
        <h2 style={{ fontSize: 24, color: "var(--blue-deep)", marginBottom: 16 }}>No Active Roadmap Found</h2>
        <p style={{ color: "#5A7494", marginBottom: 24 }}>You haven't generated or selected a career roadmap yet.</p>
        <Link href="/chat" style={{
          padding: "14px 28px", background: "var(--blue-bright)", color: "white",
          borderRadius: 12, textDecoration: "none", fontWeight: 700
        }}>
          Go to Career Coach
        </Link>
      </div>
    );
  }

  const typeColor = (t: string) => t === "course" ? "#1D6FE8" : t === "certification" ? "#7C3AED" : t === "book" ? "#059669" : "#F59E0B";

  return (
    <div style={{ minHeight: "100vh", background: "#F0F4F8", fontFamily: "var(--font-inter), sans-serif", paddingBottom: 60 }}>
      {/* Header */}
      <header style={{
        background: "linear-gradient(135deg, #1A1F2B, #2A3F5A)",
        padding: "40px 24px 80px 24px", color: "white"
      }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
            <Link href="/" style={{ fontSize: 20, fontWeight: 800, color: "white", textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, #1D6FE8, #4D9EFF)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 16 }}>🚀</span>
              </div>
              Navi
            </Link>
            <Link href="/chat" style={{ fontSize: 14, fontWeight: 600, color: "#A0B5D0", textDecoration: "none" }}>← Back to Chat</Link>
          </div>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#1D6FE8", textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>Your Personalised Dashboard</div>
          <h1 style={{ fontSize: 42, fontWeight: 800, margin: "0 0 16px 0", letterSpacing: -1 }}>Roadmap to {roadmap.role}</h1>
          <p style={{ fontSize: 16, color: "#A0B5D0", maxWidth: 600, lineHeight: 1.6 }}>{roadmap.salaryNote}</p>
        </div>
      </header>

      <main style={{ maxWidth: 1000, margin: "-40px auto 0 auto", padding: "0 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 24, alignItems: "start" }}>
          
          {/* Timeline Section */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {roadmap.weeks.map((w, i) => (
              <div key={i} style={{
                background: "white", borderRadius: 20, padding: 32,
                boxShadow: "0 4px 20px rgba(0,0,0,0.04)", border: "1px solid rgba(29,111,232,0.06)"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(29,111,232,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--blue-bright)", fontWeight: 800, fontSize: 18 }}>
                    {i + 1}
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--blue-deep)", margin: 0 }}>{w.week}</h3>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
                  <div>
                    <h4 style={{ fontSize: 13, color: "#7A93B0", fontWeight: 700, marginBottom: 16, textTransform: "uppercase", letterSpacing: 1 }}>Key Tasks</h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      {w.tasks.map((t, ti) => (
                        <label key={ti} style={{ display: "flex", gap: 12, alignItems: "flex-start", cursor: "pointer" }}>
                          <input type="checkbox" style={{ width: 18, height: 18, marginTop: 2, accentColor: "var(--blue-bright)" }} />
                          <span style={{ fontSize: 14, color: "#2A3F5A", lineHeight: 1.5 }}>{t}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 style={{ fontSize: 13, color: "#7A93B0", fontWeight: 700, marginBottom: 16, textTransform: "uppercase", letterSpacing: 1 }}>Resources</h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      {w.resources.map((r, ri) => (
                        <a key={ri} href={r.url} target="_blank" rel="noopener noreferrer" style={{
                          display: "flex", alignItems: "center", gap: 10, padding: "12px 16px",
                          background: "#F7FAFF", borderRadius: 12, textDecoration: "none",
                          border: "1px solid rgba(29,111,232,0.08)", transition: "all 0.2s"
                        }}>
                          <div style={{ padding: "4px 8px", background: `${typeColor(r.type)}15`, borderRadius: 6, fontSize: 10, fontWeight: 700, color: typeColor(r.type), textTransform: "uppercase" }}>{r.type}</div>
                          <span style={{ fontSize: 13, color: "var(--blue-bright)", fontWeight: 600 }}>{r.name}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24, position: "sticky", top: 24 }}>
            
            {/* Milestones Widget */}
            <div style={{ background: "white", borderRadius: 20, padding: 24, boxShadow: "0 4px 20px rgba(0,0,0,0.04)", border: "1px solid rgba(29,111,232,0.06)" }}>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--blue-deep)", marginTop: 0, marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
                <span>🏆</span> Milestones
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {roadmap.milestones.map((m, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--blue-bright)" }} />
                    <div style={{ fontSize: 14, color: "#4A5E7A", fontWeight: 500 }}>{m}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Job Boards Widget */}
            <div style={{ background: "linear-gradient(145deg, #1D6FE8, #3B82F6)", borderRadius: 20, padding: 24, color: "white", boxShadow: "0 8px 24px rgba(29,111,232,0.2)" }}>
              <h3 style={{ fontSize: 16, fontWeight: 800, marginTop: 0, marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
                <span>🎯</span> Target Boards
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {roadmap.jobBoards.map(j => (
                  <span key={j} style={{ padding: "6px 14px", background: "rgba(255,255,255,0.2)", borderRadius: 100, fontSize: 13, fontWeight: 600 }}>{j}</span>
                ))}
              </div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", marginTop: 16, lineHeight: 1.5 }}>
                Focus your applications on these platforms to maximize your response rate for this specific role.
              </p>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
