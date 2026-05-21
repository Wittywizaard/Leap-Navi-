"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

const testimonials = [
  { name: "Priya S.", role: "Senior PM @ Razorpay", quote: "Navi didn't just read my resume — it understood what I actually wanted to become. Week 1 tasks done, already in interviews." },
  { name: "Arjun K.", role: "Full Stack Dev @ Couchbase", quote: "Better than friends and ChatGPT combined. Clear salary data, prep timelines, and a roadmap I can actually follow." },
  { name: "Tanushree M.", role: "Product Designer @ Honeywell", quote: "The AI interpreted my achievements, not just listed them. I finally feel validated and have a direction." },
];

const steps = [
  { num: "01", title: "Upload Resume", desc: "PDF or DOCX. Parsed in seconds — skills, gaps, trajectory all extracted.", icon: "📄" },
  { num: "02", title: "AI Analysis", desc: "Gemini reads your career signals, experience depth, and growth patterns.", icon: "🧠" },
  { num: "03", title: "3 Path Cards", desc: "Distinct, realistic career paths — each with role, salary band, and timeline.", icon: "🗺️" },
  { num: "04", title: "Your Roadmap", desc: "Week-by-week plan with named courses, real job boards, and milestones.", icon: "🚀" },
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTest, setActiveTest] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    const t = setInterval(() => setActiveTest(p => (p + 1) % testimonials.length), 4000);
    return () => { window.removeEventListener("scroll", onScroll); clearInterval(t); };
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "var(--white)" }}>
      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 5%",
        height: 68,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(255,255,255,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(29,111,232,0.1)" : "none",
        transition: "all 0.3s ease"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src="/logo.png" alt="LEAP" height={48} style={{ objectFit: "contain" }} />
        </div>
        <Link href="/chat" style={{
          padding: "10px 24px",
          background: "linear-gradient(135deg, #1D6FE8, #8B5CF6)",
          color: "white", borderRadius: 100,
          fontWeight: 600, fontSize: 14, textDecoration: "none",
          boxShadow: "0 4px 20px rgba(139,92,246,0.35)",
          transition: "all 0.2s",
          display: "inline-block"
        }}>Start Free →</Link>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: "100vh", position: "relative", overflow: "hidden",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: "160px 5% 60px",
        background: "linear-gradient(160deg, #FFFFFF 0%, #F6F9FF 40%, #F5F3FF 80%, #F0F9FF 100%)"
      }}>
        {/* Orbs */}
        <div className="orb" style={{ width: 600, height: 600, background: "rgba(139,92,246,0.07)", top: -100, right: -100 }} />
        <div className="orb" style={{ width: 400, height: 400, background: "rgba(125,211,252,0.1)", bottom: -80, left: -60 }} />
        <div className="orb" style={{ width: 200, height: 200, background: "rgba(29,111,232,0.08)", top: "30%", left: "20%" }} />

        {/* Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(29,111,232,0.08)", border: "1px solid rgba(29,111,232,0.2)",
          borderRadius: 100, padding: "6px 16px", marginBottom: 28
        }}>
          <span className="pulse-dot" />
          <span style={{ fontSize: 13, fontWeight: 500, color: "var(--blue-bright)" }}>AI-Powered · Free to Start · No Signup</span>
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(42px, 7vw, 88px)",
          fontWeight: 800, textAlign: "center",
          lineHeight: 1.1, maxWidth: 1200, width: "100%",
          color: "var(--blue-deep)", marginBottom: 24
        }}>
          Your next career move,<br />
          <span className="gradient-text">mapped by AI.</span>
        </h1>

        <p style={{
          fontSize: "clamp(14px, 1.8vw, 17px)", color: "#4A5E7A",
          maxWidth: 600, textAlign: "center", lineHeight: 1.7, marginBottom: 48
        }}>
          Get personalized career paths with salaries, skill gaps,<br />
          and a week-by-week roadmap in under few seconds.
        </p>

        {/* CTA */}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
          <Link href="/chat" style={{
            padding: "16px 40px",
            background: "linear-gradient(135deg, #1D6FE8, #8B5CF6)",
            color: "white", borderRadius: 100,
            fontWeight: 700, fontSize: 17, textDecoration: "none",
            boxShadow: "0 8px 32px rgba(139,92,246,0.3)",
            transition: "transform 0.2s, box-shadow 0.2s",
            display: "inline-block"
          }}>Chart with Navi →</Link>
          <a href="#how" style={{
            padding: "16px 32px",
            background: "rgba(255,255,255,0.7)", border: "1px solid rgba(29,111,232,0.2)",
            color: "var(--blue-deep)", borderRadius: 100,
            fontWeight: 600, fontSize: 16, textDecoration: "none",
            backdropFilter: "blur(8px)"
          }}>See How It Works</a>
        </div>

        {/* Bottom Split Section */}
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: 1200, marginTop: 100, gap: 40, flexWrap: "wrap-reverse" }}>
          
          {/* Left: Stats & Card */}
          <div style={{ flex: "1 1 500px", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            {/* Stats */}
            <div style={{ display: "flex", gap: 32, flexWrap: "wrap", justifyContent: "flex-start", width: "100%", marginBottom: 48 }}>
              {[["< 15s", "Time to first insight"], ["3", "Career paths generated"], ["100%", "Personalized to you"]].map(([v, l]) => (
                <div key={l} style={{ textAlign: "left", flex: "1 1 120px" }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 700, color: "var(--blue-bright)" }}>{v}</div>
                  <div style={{ fontSize: 13, color: "#7A93B0", marginTop: 4 }}>{l}</div>
                </div>
              ))}
            </div>

            {/* Floating card mockup */}
            <div className="float" style={{
              width: "100%", maxWidth: 600,
              background: "rgba(255,255,255,0.85)", backdropFilter: "blur(20px)",
              borderRadius: 20, border: "1px solid rgba(29,111,232,0.12)",
              boxShadow: "0 24px 80px rgba(29,111,232,0.15), inset 0 1px 0 rgba(255,255,255,0.9)",
              padding: "24px 28px", position: "relative"
            }}>
              <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
                {["#FF5F57","#FEBC2E","#28C840"].map(c => <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />)}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ background: "linear-gradient(90deg, #EBF3FF, #DBEAFE)", borderRadius: 10, padding: "14px 18px" }}>
                  <span style={{ fontSize: 13, color: "#1D6FE8", fontWeight: 600 }}>🧠 Navi</span>
                  <p style={{ fontSize: 14, color: "#2A3F5A", marginTop: 6, lineHeight: 1.6 }}>
                    I can see you've spent 3 years as a Data Analyst at a B2B SaaS company. Your SQL depth and dashboard experience are strong signals. Based on your trajectory, here are 3 paths worth exploring...
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                  {[["Analytics Engineer", "₹18–28L", "6 months"], ["Product Manager", "₹20–35L", "9 months"], ["Data Science", "₹22–38L", "12 months"]].map(([r, s, t]) => (
                    <div key={r} className="path-card" style={{ borderRadius: 12, padding: "14px 14px" }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "var(--blue-deep)", marginBottom: 4 }}>{r}</div>
                      <div style={{ fontSize: 12, color: "var(--blue-bright)", fontWeight: 600 }}>{s}</div>
                      <div style={{ fontSize: 11, color: "#7A93B0", marginTop: 4 }}>⏱ {t}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Video */}
          <div style={{ flex: "1 1 400px", display: "flex", justifyContent: "center" }}>
            <video src="/hero-video.mp4" autoPlay loop muted playsInline style={{ width: "100%", maxWidth: 350, borderRadius: 20 }} />
          </div>

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" style={{ padding: "100px 5%", background: "var(--white)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: "var(--blue-bright)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Process</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, color: "var(--blue-deep)" }}>
              From resume to roadmap<br />in 4 steps.
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
            {steps.map((s, i) => (
              <div key={s.num} className="card-3d" style={{
                background: i % 2 === 0 ? "linear-gradient(145deg, #F7FAFF, #EBF3FF)" : "linear-gradient(145deg, #1D6FE8, #1550B8)",
                border: "1px solid rgba(29,111,232,0.12)",
                borderRadius: 20, padding: "32px 28px",
              }}>
                <div style={{ fontSize: 36, marginBottom: 16 }}>{s.icon}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: i % 2 === 0 ? "var(--blue-bright)" : "rgba(255,255,255,0.6)", marginBottom: 8, letterSpacing: 1 }}>{s.num}</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: i % 2 === 0 ? "var(--blue-deep)" : "white", marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: i % 2 === 0 ? "#5A7494" : "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "100px 5%", background: "linear-gradient(160deg, #F0F7FF, #EBF3FF)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "var(--blue-bright)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Real Users</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: "var(--blue-deep)", marginBottom: 48 }}>
            What they're saying.
          </h2>
          <div style={{
            background: "rgba(255,255,255,0.85)", backdropFilter: "blur(20px)",
            borderRadius: 24, padding: "40px 48px",
            border: "1px solid rgba(29,111,232,0.12)",
            boxShadow: "0 16px 48px rgba(29,111,232,0.1)",
            minHeight: 180, transition: "all 0.5s ease"
          }}>
            <p style={{ fontSize: "clamp(16px, 2.5vw, 20px)", color: "#2A3F5A", lineHeight: 1.7, fontStyle: "italic", marginBottom: 24 }}>
              "{testimonials[activeTest].quote}"
            </p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
              <div style={{
                width: 40, height: 40, borderRadius: "50%",
                background: "linear-gradient(135deg, #1D6FE8, #4D9EFF)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "white", fontWeight: 700, fontSize: 16
              }}>{testimonials[activeTest].name[0]}</div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: "var(--blue-deep)" }}>{testimonials[activeTest].name}</div>
                <div style={{ fontSize: 13, color: "#7A93B0" }}>{testimonials[activeTest].role}</div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 24 }}>
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setActiveTest(i)} style={{
                width: i === activeTest ? 24 : 8, height: 8,
                borderRadius: 4, border: "none",
                background: i === activeTest ? "var(--blue-bright)" : "rgba(29,111,232,0.2)",
                transition: "all 0.3s ease", cursor: "pointer"
              }} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section style={{
        padding: "100px 5%",
        background: "linear-gradient(135deg, #0A1628, #1E3A5F)",
        position: "relative", overflow: "hidden"
      }}>
        <div className="orb" style={{ width: 500, height: 500, background: "rgba(29,111,232,0.2)", top: -150, right: -100 }} />
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 800, color: "white", marginBottom: 20 }}>
            Your next chapter starts<br />with one upload.
          </h2>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.65)", marginBottom: 40, lineHeight: 1.7 }}>
            No account needed. Just your resume, and 30 seconds of your time.
          </p>
          <Link href="/chat" style={{
            padding: "18px 48px",
            background: "linear-gradient(135deg, #1D6FE8, #8B5CF6)",
            color: "white", borderRadius: 100,
            fontWeight: 700, fontSize: 18, textDecoration: "none",
            boxShadow: "0 8px 40px rgba(139,92,246,0.35)",
            display: "inline-block"
          }}>Chart with Navi →</Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "32px 5%", background: "#F7FAFF", borderTop: "1px solid rgba(29,111,232,0.08)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <img src="/logo.png" alt="LEAP" height={36} style={{ objectFit: "contain" }} />
          </div>
          <p style={{ fontSize: 13, color: "#7A93B0" }}>AI-powered career navigation. Not financial or legal advice.</p>
        </div>
      </footer>
    </div>
  );
}
