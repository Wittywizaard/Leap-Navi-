"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Message {
  role: "user" | "assistant";
  content: string;
  id: string;
}

interface PathCard {
  id: string;
  title: string;
  hook: string;
  salaryRange: string;
  timeline: string;
  effort: string;
  skillGaps: string[];
  whyFit: string;
}

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

function parsePaths(text: string): PathCard[] | null {
  const match = text.match(/<PATHS>([\s\S]*?)<\/PATHS>/);
  if (!match) return null;
  try { return JSON.parse(match[1].trim()); } catch { return null; }
}

function parseRoadmap(text: string): Roadmap | null {
  const match = text.match(/<ROADMAP>([\s\S]*?)<\/ROADMAP>/);
  if (!match) return null;
  try { return JSON.parse(match[1].trim()); } catch { return null; }
}

function cleanText(text: string): string {
  return text.replace(/<PATHS>[\s\S]*?<\/PATHS>/g, "").replace(/<ROADMAP>[\s\S]*?<\/ROADMAP>/g, "").trim();
}

function TypingDots() {
  return (
    <div style={{ display: "flex", gap: 5, padding: "8px 4px", alignItems: "center" }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          width: 8, height: 8, borderRadius: "50%",
          background: "var(--blue-bright)", opacity: 0.6,
          animation: `pulse-dot 1.4s ease ${i * 0.2}s infinite`
        }} />
      ))}
    </div>
  );
}

function PathCards({ paths, onSelect }: { paths: PathCard[]; onSelect: (p: PathCard) => void }) {
  const effortColor = (e: string) => e === "Low" ? "#22C55E" : e === "Medium" ? "#F59E0B" : "#EF4444";
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, margin: "12px 0" }}>
      {paths.map((p, i) => (
        <button key={p.id} onClick={() => onSelect(p)} className="path-card" style={{
          borderRadius: 18, padding: "22px 20px", border: "1.5px solid rgba(29,111,232,0.15)",
          textAlign: "left", cursor: "pointer", background: "white",
          position: "relative", overflow: "hidden"
        }}>
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 3,
            background: ["linear-gradient(90deg,#1D6FE8,#4D9EFF)", "linear-gradient(90deg,#7C3AED,#A78BFA)", "linear-gradient(90deg,#059669,#34D399)"][i % 3]
          }} />
          <div style={{ fontSize: 11, fontWeight: 600, color: "#7A93B0", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>
            Path {String.fromCharCode(65 + i)}
          </div>
          <div style={{ fontSize: 18, fontWeight: 800, color: "var(--blue-deep)", marginBottom: 6, lineHeight: 1.2 }}>{p.title}</div>
          <p style={{ fontSize: 13, color: "#5A7494", lineHeight: 1.5, marginBottom: 14 }}>{p.hook}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
            <span style={{ padding: "4px 10px", background: "rgba(29,111,232,0.08)", borderRadius: 100, fontSize: 12, color: "var(--blue-bright)", fontWeight: 600 }}>{p.salaryRange}</span>
            <span style={{ padding: "4px 10px", background: "rgba(0,0,0,0.04)", borderRadius: 100, fontSize: 12, color: "#5A7494" }}>⏱ {p.timeline}</span>
            <span style={{ padding: "4px 10px", background: `${effortColor(p.effort)}15`, borderRadius: 100, fontSize: 12, color: effortColor(p.effort), fontWeight: 600 }}>{p.effort} effort</span>
          </div>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11, color: "#7A93B0", marginBottom: 6, fontWeight: 600 }}>SKILL GAPS</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {p.skillGaps.map(s => (
                <span key={s} style={{ padding: "3px 8px", background: "#F0F4FF", borderRadius: 6, fontSize: 11, color: "#3B6FC7" }}>{s}</span>
              ))}
            </div>
          </div>
          <div style={{ padding: "12px 14px", background: "rgba(29,111,232,0.04)", borderRadius: 10, fontSize: 12, color: "#4A5E7A", lineHeight: 1.5 }}>{p.whyFit}</div>
          <div style={{
            marginTop: 16, padding: "10px 0", textAlign: "center",
            borderTop: "1px solid rgba(29,111,232,0.1)",
            fontSize: 13, fontWeight: 700, color: "var(--blue-bright)"
          }}>Choose this path →</div>
        </button>
      ))}
    </div>
  );
}

function RoadmapView({ roadmap }: { roadmap: Roadmap }) {
  const typeColor = (t: string) => t === "course" ? "#1D6FE8" : t === "certification" ? "#7C3AED" : t === "book" ? "#059669" : "#F59E0B";
  return (
    <div style={{ background: "linear-gradient(145deg, #F7FAFF, #EBF3FF)", borderRadius: 20, padding: "28px 24px", border: "1px solid rgba(29,111,232,0.12)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg,#1D6FE8,#4D9EFF)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🚀</div>
        <div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "var(--blue-deep)" }}>Your Roadmap: {roadmap.role}</div>
          <div style={{ fontSize: 13, color: "#7A93B0" }}>{roadmap.salaryNote}</div>
        </div>
      </div>
      {/* Milestones */}
      <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
        {roadmap.milestones?.map((m, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, background: "white", borderRadius: 100, padding: "6px 14px", border: "1px solid rgba(29,111,232,0.12)" }}>
            <span style={{ fontSize: 14 }}>🏁</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: "var(--blue-deep)" }}>{m}</span>
          </div>
        ))}
      </div>
      {/* Weeks */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {roadmap.weeks?.map((w, i) => (
          <div key={i} style={{ background: "white", borderRadius: 16, padding: "20px 20px", border: "1px solid rgba(29,111,232,0.08)" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--blue-bright)", marginBottom: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>{w.week}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <div style={{ fontSize: 12, color: "#7A93B0", fontWeight: 600, marginBottom: 8 }}>TASKS</div>
                {w.tasks?.map((t, ti) => (
                  <div key={ti} style={{ display: "flex", gap: 8, marginBottom: 6, fontSize: 13, color: "#2A3F5A" }}>
                    <span style={{ color: "#22C55E", fontWeight: 700, flexShrink: 0 }}>✓</span> {t}
                  </div>
                ))}
              </div>
              <div>
                <div style={{ fontSize: 12, color: "#7A93B0", fontWeight: 600, marginBottom: 8 }}>RESOURCES</div>
                {w.resources?.map((r, ri) => (
                  <a key={ri} href={r.url} target="_blank" rel="noopener noreferrer" style={{
                    display: "flex", alignItems: "center", gap: 6, marginBottom: 8,
                    textDecoration: "none"
                  }}>
                    <span style={{ padding: "2px 6px", background: `${typeColor(r.type)}15`, borderRadius: 4, fontSize: 10, fontWeight: 600, color: typeColor(r.type), textTransform: "uppercase" }}>{r.type}</span>
                    <span style={{ fontSize: 12, color: "var(--blue-bright)", fontWeight: 500 }}>{r.name} ↗</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Job boards */}
      {roadmap.jobBoards?.length > 0 && (
        <div style={{ marginTop: 20, padding: "16px 20px", background: "rgba(29,111,232,0.05)", borderRadius: 12 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#7A93B0", marginBottom: 10 }}>JOB BOARDS TO TARGET</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {roadmap.jobBoards.map(j => <span key={j} style={{ padding: "5px 12px", background: "white", borderRadius: 100, fontSize: 12, fontWeight: 600, color: "var(--blue-deep)", border: "1px solid rgba(29,111,232,0.12)" }}>{j}</span>)}
          </div>
        </div>
      )}
    </div>
  );
}

function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";
  const paths = !isUser ? parsePaths(msg.content) : null;
  const roadmap = !isUser ? parseRoadmap(msg.content) : null;
  const displayText = !isUser ? cleanText(msg.content) : msg.content;

  return (
    <div className="msg-appear" style={{ display: "flex", flexDirection: isUser ? "row-reverse" : "row", gap: 10, marginBottom: 20, alignItems: "flex-start" }}>
      {!isUser && (
        <div style={{ width: 36, height: 36, borderRadius: 11, background: "linear-gradient(135deg,#1D6FE8,#4D9EFF)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: 14, flexShrink: 0, boxShadow: "0 4px 12px rgba(29,111,232,0.3)" }}>N</div>
      )}
      <div style={{ maxWidth: "80%", display: "flex", flexDirection: "column", gap: 12 }}>
        {displayText && (
          <div style={{
            padding: "14px 18px", borderRadius: isUser ? "20px 20px 6px 20px" : "6px 20px 20px 20px",
            background: isUser ? "linear-gradient(135deg,#1D6FE8,#3B82F6)" : "white",
            color: isUser ? "white" : "#2A3F5A",
            fontSize: 14, lineHeight: 1.7,
            border: isUser ? "none" : "1px solid rgba(29,111,232,0.1)",
            boxShadow: isUser ? "0 4px 16px rgba(29,111,232,0.25)" : "0 2px 12px rgba(0,0,0,0.06)",
            whiteSpace: "pre-wrap"
          }}>{displayText}</div>
        )}
        {paths && <PathCards paths={paths} onSelect={() => {}} />}
        {roadmap && <RoadmapView roadmap={roadmap} />}
      </div>
    </div>
  );
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [resumeText, setResumeText] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadedName, setUploadedName] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const [phase, setPhase] = useState<"upload" | "chat">("upload");
  const [pathRound, setPathRound] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  const handleFile = useCallback(async (file: File) => {
    if (!file) return;
    setUploading(true);
    setUploadedName(file.name);
    const form = new FormData();
    form.append("file", file);
    try {
      const res = await fetch("/api/parse-resume", { method: "POST", body: form });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResumeText(data.text);
      setPhase("chat");
      // Auto-trigger first analysis
      await sendFirstMessage(data.text, file.name);
    } catch (err) {
      console.error(err);
      alert("Error parsing resume. Please try again.");
    } finally {
      setUploading(false);
    }
  }, []);

  const sendFirstMessage = async (resumeContent: string, fileName: string) => {
    const firstMsg: Message = {
      role: "user",
      content: `I've uploaded my resume (${fileName}). Please analyze it and guide me on my career path.`,
      id: Date.now().toString()
    };
    setMessages([firstMsg]);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [firstMsg], resumeText: resumeContent })
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setMessages(prev => [...prev, { role: "assistant", content: data.content, id: Date.now().toString() }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: "assistant", content: "Sorry, I encountered an error. Please check your API key and try again.", id: Date.now().toString() }]);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (content?: string) => {
    const text = content || input.trim();
    if (!text || loading) return;
    setInput("");
    const userMsg: Message = { role: "user", content: text, id: Date.now().toString() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, resumeText })
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setMessages(prev => [...prev, { role: "assistant", content: data.content, id: Date.now().toString() }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: "assistant", content: "An error occurred. Please try again.", id: Date.now().toString() }]);
    } finally {
      setLoading(false);
    }
  };

  const handlePathSelect = (path: PathCard) => {
    sendMessage(`I'd like to explore the ${path.title} path. Please build me a detailed roadmap for this career transition.`);
  };

  const handleRegeneratePaths = () => {
    const nextRound = pathRound + 1;
    setPathRound(nextRound);
    sendMessage(`__REGEN_PATHS_ROUND_${nextRound}__`);
  };

  // Inject path selection handler into messages
  const messagesWithHandlers = messages.map(msg => {
    if (msg.role === "assistant") {
      const paths = parsePaths(msg.content);
      if (paths) {
        return { ...msg, _paths: paths };
      }
    }
    return msg;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: "#F7FAFF" }}>
      {/* Header */}
      <header style={{
        height: 64, display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 24px", background: "rgba(255,255,255,0.95)", backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(29,111,232,0.1)", zIndex: 50, flexShrink: 0
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: "linear-gradient(135deg,#1D6FE8,#4D9EFF)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: 14 }}>N</div>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: "var(--blue-deep)" }}>Navi</span>
          </Link>
          {uploadedName && (
            <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 12px", background: "rgba(29,111,232,0.06)", borderRadius: 100, border: "1px solid rgba(29,111,232,0.12)" }}>
              <span style={{ fontSize: 12 }}>📄</span>
              <span style={{ fontSize: 12, color: "var(--blue-bright)", fontWeight: 500 }}>{uploadedName}</span>
            </div>
          )}
        </div>
        {phase === "chat" && (
          <button onClick={() => { setPhase("upload"); setMessages([]); setResumeText(""); setUploadedName(""); setPathRound(0); }} style={{
            padding: "8px 16px", background: "rgba(29,111,232,0.06)", border: "1px solid rgba(29,111,232,0.15)",
            borderRadius: 100, fontSize: 13, color: "var(--blue-bright)", fontWeight: 600, cursor: "pointer"
          }}>+ New Resume</button>
        )}
      </header>

      {/* Main area */}
      {phase === "upload" ? (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
          <div style={{ maxWidth: 520, width: "100%", textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 20 }}>🧭</div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px,5vw,40px)", fontWeight: 800, color: "var(--blue-deep)", marginBottom: 12 }}>
              Find your next career move.
            </h1>
            <p style={{ fontSize: 16, color: "#5A7494", marginBottom: 36, lineHeight: 1.6 }}>
              Upload your resume and Navi will analyze your background, surface career signals, and generate personalized paths with real roadmaps according to your profile.
            </p>
            {/* Upload zone */}
            <div
              className={`upload-zone ${isDragOver ? "active" : ""}`}
              style={{ borderRadius: 24, padding: "48px 32px", cursor: "pointer", background: "white" }}
              onDragOver={e => { e.preventDefault(); setIsDragOver(true); }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={e => { e.preventDefault(); setIsDragOver(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
              onClick={() => fileInputRef.current?.click()}
            >
              <input ref={fileInputRef} type="file" accept=".pdf,.docx,.txt" style={{ display: "none" }} onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
              {uploading ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 48, height: 48, border: "3px solid rgba(29,111,232,0.2)", borderTop: "3px solid #1D6FE8", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                  <p style={{ fontSize: 15, color: "var(--blue-bright)", fontWeight: 600 }}>Parsing your resume...</p>
                  <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                </div>
              ) : (
                <>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>📄</div>
                  <p style={{ fontSize: 17, fontWeight: 700, color: "var(--blue-deep)", marginBottom: 8 }}>Drop your resume here</p>
                  <p style={{ fontSize: 14, color: "#7A93B0", marginBottom: 20 }}>PDF, DOCX, or TXT · Analyzed in seconds</p>
                  <div style={{
                    display: "inline-block", padding: "12px 32px",
                    background: "linear-gradient(135deg,#1D6FE8,#4D9EFF)",
                    color: "white", borderRadius: 100, fontWeight: 600, fontSize: 15,
                    boxShadow: "0 4px 20px rgba(29,111,232,0.3)"
                  }}>Choose File</div>
                </>
              )}
            </div>
            <p style={{ marginTop: 16, fontSize: 12, color: "#B0C4DE" }}>Your resume is processed securely and never stored.</p>
          </div>
        </div>
      ) : (
        <>
          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "24px 16px" }}>
            <div style={{ maxWidth: 800, margin: "0 auto" }}>
              {messagesWithHandlers.map(msg => {
                const paths = msg.role === "assistant" ? parsePaths(msg.content) : null;
                const roadmap = msg.role === "assistant" ? parseRoadmap(msg.content) : null;
                const displayText = msg.role === "assistant" ? cleanText(msg.content) : msg.content;
                const isUser = msg.role === "user";
                return (
                  <div key={msg.id} className="msg-appear" style={{ display: "flex", flexDirection: isUser ? "row-reverse" : "row", gap: 10, marginBottom: 20, alignItems: "flex-start" }}>
                    {!isUser && (
                      <div style={{ width: 36, height: 36, borderRadius: 11, background: "linear-gradient(135deg,#1D6FE8,#4D9EFF)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: 14, flexShrink: 0, boxShadow: "0 4px 12px rgba(29,111,232,0.3)" }}>N</div>
                    )}
                    <div style={{ maxWidth: "85%", display: "flex", flexDirection: "column", gap: 12 }}>
                      {displayText && (
                        <div style={{
                          padding: "14px 18px", borderRadius: isUser ? "20px 20px 6px 20px" : "6px 20px 20px 20px",
                          background: isUser ? "linear-gradient(135deg,#1D6FE8,#3B82F6)" : "white",
                          color: isUser ? "white" : "#2A3F5A",
                          fontSize: 14, lineHeight: 1.7,
                          border: isUser ? "none" : "1px solid rgba(29,111,232,0.1)",
                          boxShadow: isUser ? "0 4px 16px rgba(29,111,232,0.25)" : "0 2px 12px rgba(0,0,0,0.06)",
                          whiteSpace: "pre-wrap"
                        }}>{displayText}</div>
                      )}
                      {paths && (
                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
                            {paths.map((p, i) => {
                              const effortColor = (e: string) => e === "Low" ? "#22C55E" : e === "Medium" ? "#F59E0B" : "#EF4444";
                              return (
                                <button key={p.id} onClick={() => handlePathSelect(p)} className="path-card" style={{
                                  borderRadius: 18, padding: "22px 20px", border: "1.5px solid rgba(29,111,232,0.15)",
                                  textAlign: "left", cursor: "pointer", background: "white", position: "relative", overflow: "hidden"
                                }}>
                                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: ["linear-gradient(90deg,#1D6FE8,#4D9EFF)", "linear-gradient(90deg,#7C3AED,#A78BFA)", "linear-gradient(90deg,#059669,#34D399)"][i % 3] }} />
                                  <div style={{ fontSize: 11, fontWeight: 600, color: "#7A93B0", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Path {String.fromCharCode(65 + i)}</div>
                                  <div style={{ fontSize: 18, fontWeight: 800, color: "var(--blue-deep)", marginBottom: 6, lineHeight: 1.2 }}>{p.title}</div>
                                  <p style={{ fontSize: 13, color: "#5A7494", lineHeight: 1.5, marginBottom: 14 }}>{p.hook}</p>
                                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
                                    <span style={{ padding: "4px 10px", background: "rgba(29,111,232,0.08)", borderRadius: 100, fontSize: 12, color: "var(--blue-bright)", fontWeight: 600 }}>{p.salaryRange}</span>
                                    <span style={{ padding: "4px 10px", background: "rgba(0,0,0,0.04)", borderRadius: 100, fontSize: 12, color: "#5A7494" }}>⏱ {p.timeline}</span>
                                    <span style={{ padding: "4px 10px", background: `${effortColor(p.effort)}15`, borderRadius: 100, fontSize: 12, color: effortColor(p.effort), fontWeight: 600 }}>{p.effort} effort</span>
                                  </div>
                                  <div style={{ marginBottom: 14 }}>
                                    <div style={{ fontSize: 11, color: "#7A93B0", marginBottom: 6, fontWeight: 600 }}>SKILL GAPS</div>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                                      {p.skillGaps.map(s => <span key={s} style={{ padding: "3px 8px", background: "#F0F4FF", borderRadius: 6, fontSize: 11, color: "#3B6FC7" }}>{s}</span>)}
                                    </div>
                                  </div>
                                  <div style={{ padding: "12px 14px", background: "rgba(29,111,232,0.04)", borderRadius: 10, fontSize: 12, color: "#4A5E7A", lineHeight: 1.5 }}>{p.whyFit}</div>
                                  <div style={{ marginTop: 16, padding: "10px 0", textAlign: "center", borderTop: "1px solid rgba(29,111,232,0.1)", fontSize: 13, fontWeight: 700, color: "var(--blue-bright)" }}>Choose this path →</div>
                                </button>
                              );
                            })}
                          </div>
                          {/* "Show different paths" button — only on the latest path message and if loop isn't closed */}
                          {msg.id === messages.filter(m => m.role === "assistant" && m.content.includes("<PATHS>")).slice(-1)[0]?.id && pathRound < 3 && !loading && (
                            <button
                              onClick={handleRegeneratePaths}
                              style={{
                                alignSelf: "flex-start", padding: "10px 20px",
                                background: "white", border: "1.5px solid rgba(29,111,232,0.25)",
                                borderRadius: 100, fontSize: 13, color: "var(--blue-bright)",
                                fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8,
                                boxShadow: "0 2px 8px rgba(29,111,232,0.08)", transition: "all 0.2s"
                              }}
                            >
                              🔄 None of these feel right — show me 3 different paths
                              <span style={{ fontSize: 11, color: "#7A93B0", fontWeight: 400 }}>({3 - pathRound} left)</span>
                            </button>
                          )}
                        </div>
                      )}
                      {roadmap && (() => {
                        const typeColor = (t: string) => t === "course" ? "#1D6FE8" : t === "certification" ? "#7C3AED" : t === "book" ? "#059669" : "#F59E0B";
                        return (
                          <div style={{ background: "linear-gradient(145deg,#F7FAFF,#EBF3FF)", borderRadius: 20, padding: "28px 24px", border: "1px solid rgba(29,111,232,0.12)" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                              <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg,#1D6FE8,#4D9EFF)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🚀</div>
                              <div>
                                <div style={{ fontSize: 20, fontWeight: 800, color: "var(--blue-deep)" }}>Your Roadmap: {roadmap.role}</div>
                                <div style={{ fontSize: 13, color: "#7A93B0" }}>{roadmap.salaryNote}</div>
                              </div>
                            </div>
                            {roadmap.milestones?.length > 0 && (
                              <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
                                {roadmap.milestones.map((m, i) => (
                                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, background: "white", borderRadius: 100, padding: "6px 14px", border: "1px solid rgba(29,111,232,0.12)" }}>
                                    <span style={{ fontSize: 14 }}>🏁</span>
                                    <span style={{ fontSize: 12, fontWeight: 600, color: "var(--blue-deep)" }}>{m}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                              {roadmap.weeks?.map((w, i) => (
                                <div key={i} style={{ background: "white", borderRadius: 16, padding: "20px 20px", border: "1px solid rgba(29,111,232,0.08)" }}>
                                  <div style={{ fontSize: 13, fontWeight: 700, color: "var(--blue-bright)", marginBottom: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>{w.week}</div>
                                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                                    <div>
                                      <div style={{ fontSize: 12, color: "#7A93B0", fontWeight: 600, marginBottom: 8 }}>TASKS</div>
                                      {w.tasks?.map((t, ti) => (
                                        <div key={ti} style={{ display: "flex", gap: 8, marginBottom: 6, fontSize: 13, color: "#2A3F5A" }}>
                                          <span style={{ color: "#22C55E", fontWeight: 700, flexShrink: 0 }}>✓</span> {t}
                                        </div>
                                      ))}
                                    </div>
                                    <div>
                                      <div style={{ fontSize: 12, color: "#7A93B0", fontWeight: 600, marginBottom: 8 }}>RESOURCES</div>
                                      {w.resources?.map((r, ri) => (
                                        <a key={ri} href={r.url} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8, textDecoration: "none" }}>
                                          <span style={{ padding: "2px 6px", background: `${typeColor(r.type)}15`, borderRadius: 4, fontSize: 10, fontWeight: 600, color: typeColor(r.type), textTransform: "uppercase" }}>{r.type}</span>
                                          <span style={{ fontSize: 12, color: "var(--blue-bright)", fontWeight: 500 }}>{r.name} ↗</span>
                                        </a>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                            {roadmap.jobBoards?.length > 0 && (
                              <div style={{ marginTop: 20, padding: "16px 20px", background: "rgba(29,111,232,0.05)", borderRadius: 12 }}>
                                <div style={{ fontSize: 12, fontWeight: 700, color: "#7A93B0", marginBottom: 10 }}>JOB BOARDS TO TARGET</div>
                                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                                  {roadmap.jobBoards.map((j: string) => <span key={j} style={{ padding: "5px 12px", background: "white", borderRadius: 100, fontSize: 12, fontWeight: 600, color: "var(--blue-deep)", border: "1px solid rgba(29,111,232,0.12)" }}>{j}</span>)}
                                </div>
                              </div>
                            )}

                            {/* LAUNCH DASHBOARD CTA */}
                            <button
                              onClick={() => {
                                localStorage.setItem("navi_roadmap", JSON.stringify(roadmap));
                                const router = require("next/navigation").useRouter;
                                window.location.href = "/dashboard";
                              }}
                              style={{
                                width: "100%", marginTop: 24, padding: "18px 24px",
                                background: "linear-gradient(135deg, #1D6FE8, #4D9EFF)",
                                borderRadius: 16, color: "white", fontSize: 16, fontWeight: 800,
                                border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between",
                                alignItems: "center", boxShadow: "0 8px 24px rgba(29,111,232,0.3)",
                                transition: "transform 0.2s"
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
                              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
                            >
                              <span>Launch My Full Career Dashboard 🚀</span>
                              <span style={{ fontSize: 20 }}>→</span>
                            </button>

                          </div>
                        );
                      })()}
                    </div>
                  </div>
                );
              })}
              {loading && (
                <div className="msg-appear" style={{ display: "flex", gap: 10, marginBottom: 20, alignItems: "flex-start" }}>
                  <div style={{ width: 36, height: 36, borderRadius: 11, background: "linear-gradient(135deg,#1D6FE8,#4D9EFF)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: 14, flexShrink: 0 }}>N</div>
                  <div style={{ padding: "14px 18px", background: "white", borderRadius: "6px 20px 20px 20px", border: "1px solid rgba(29,111,232,0.1)" }}>
                    <TypingDots />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input */}
          <div style={{ padding: "16px 16px 24px", background: "rgba(255,255,255,0.95)", backdropFilter: "blur(16px)", borderTop: "1px solid rgba(29,111,232,0.08)" }}>
            <div style={{ maxWidth: 800, margin: "0 auto" }}>
              {/* Quick replies */}
              {messages.length === 2 && !loading && (
                <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
                  {["I want higher salary", "Better work-life balance", "More creativity & impact", "I want to switch industries"].map(q => (
                    <button key={q} onClick={() => sendMessage(q)} style={{
                      padding: "8px 16px", background: "white", border: "1px solid rgba(29,111,232,0.2)",
                      borderRadius: 100, fontSize: 13, color: "var(--blue-bright)", fontWeight: 500,
                      cursor: "pointer", transition: "all 0.2s"
                    }}>{q}</button>
                  ))}
                </div>
              )}
              <div style={{ display: "flex", gap: 10 }}>
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                  placeholder="Reply to Navi..."
                  style={{
                    flex: 1, padding: "14px 20px",
                    background: "white", border: "1.5px solid rgba(29,111,232,0.2)",
                    borderRadius: 100, fontSize: 14, color: "var(--blue-deep)",
                    outline: "none", boxShadow: "0 2px 12px rgba(0,0,0,0.04)"
                  }}
                />
                <button onClick={() => sendMessage()} disabled={!input.trim() || loading} style={{
                  width: 50, height: 50, borderRadius: "50%",
                  background: input.trim() && !loading ? "linear-gradient(135deg,#1D6FE8,#4D9EFF)" : "rgba(29,111,232,0.15)",
                  border: "none", cursor: input.trim() && !loading ? "pointer" : "not-allowed",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
                  boxShadow: input.trim() && !loading ? "0 4px 16px rgba(29,111,232,0.3)" : "none",
                  transition: "all 0.2s", flexShrink: 0
                }}>→</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
