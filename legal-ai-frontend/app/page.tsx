"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";

const API = "https://ai-legal-backend-0f42.onrender.com"; // backend URL

/* ─────────── tiny inline style helpers ─────────── */
const S = {
  /* ── navbar ── */
  nav: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    background: "#0F2A1D",
    boxShadow: "0 2px 20px rgba(55,85,52,0.35)",
    height: 64,
    display: "flex",
    alignItems: "center",
    padding: "0 32px",
    justifyContent: "space-between",
  },
  navLogo: {
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 800,
    fontSize: 20,
    color: "#fff",
    letterSpacing: "-0.3px",
    display: "flex",
    alignItems: "center",
    gap: 10,
    textDecoration: "none",
  },
  navLinks: {
    display: "flex",
    gap: 8,
    alignItems: "center",
  },
  navLink: {
    color: "rgba(255,255,255,0.75)",
    textDecoration: "none",
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 500,
    fontSize: 14,
    padding: "6px 14px",
    borderRadius: 8,
    transition: "all 0.2s ease",
    cursor: "pointer",
  },
  /* ── page ── */
  page: {
    minHeight: "100vh",
    background: "linear-gradient(160deg, #d4e6c4 0%, #E3EED4 40%, #f4fbf0 100%)",
    paddingTop: 64,
  },
  /* ── hero ── */
  hero: {
    textAlign: "center" as const,
    padding: "80px 24px 60px",
    position: "relative" as const,
    overflow: "hidden" as const,
  },
  heroBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    background: "rgba(55,85,52,0.08)",
    border: "1px solid rgba(55,85,52,0.18)",
    color: "#375534",
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
    padding: "5px 14px",
    borderRadius: 100,
    marginBottom: 24,
  },
  heroTitle: {
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 800,
    fontSize: "clamp(36px, 6vw, 68px)",
    lineHeight: 1.08,
    letterSpacing: "-1.5px",
    color: "#0F2A1D",
    margin: "0 auto 20px",
    maxWidth: 780,
  },
  heroTitleAccent: {
    background: "linear-gradient(135deg, #0F2A1D 0%, #375534 50%, #6B9071 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  heroSub: {
    color: "#375534",
    fontSize: "clamp(16px, 2.5vw, 20px)",
    fontWeight: 400,
    maxWidth: 540,
    margin: "0 auto 48px",
    lineHeight: 1.6,
    fontStyle: "italic",
  },
  /* ── main content ── */
  content: {
    maxWidth: 860,
    margin: "0 auto",
    padding: "0 24px 80px",
    display: "flex",
    flexDirection: "column" as const,
    gap: 28,
  },
  /* ── cards ── */
  card: {
    background: "#ffffff",
    borderRadius: 20,
    border: "1px solid rgba(55,85,52,0.1)",
    boxShadow: "0 4px 24px rgba(55,85,52,0.08)",
    padding: "36px 40px",
    transition: "box-shadow 0.25s ease, transform 0.25s ease",
  },
  cardTitle: {
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 700,
    fontSize: 20,
    color: "#0F2A1D",
    marginBottom: 6,
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  cardSubtitle: {
    color: "#375534",
    fontSize: 14,
    marginBottom: 28,
    lineHeight: 1.5,
  },
  /* ── upload zone ── */
  uploadZone: {
    border: "2px dashed rgba(55,85,52,0.3)",
    borderRadius: 16,
    padding: "40px 24px",
    textAlign: "center" as const,
    cursor: "pointer",
    transition: "all 0.25s ease",
    background: "#f4fbf0",
    position: "relative" as const,
  },
  uploadIcon: {
    fontSize: 40,
    marginBottom: 12,
    display: "block",
  },
  uploadText: {
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 600,
    fontSize: 16,
    color: "#375534",
    marginBottom: 6,
  },
  uploadHelper: {
    color: "#6B9071",
    fontSize: 13,
    lineHeight: 1.5,
  },
  fileInput: {
    position: "absolute" as const,
    inset: 0,
    opacity: 0,
    cursor: "pointer",
    width: "100%",
    height: "100%",
  },
  fileChosen: {
    marginTop: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: "10px 16px",
    background: "rgba(55,85,52,0.07)",
    borderRadius: 10,
    color: "#375534",
    fontSize: 14,
    fontWeight: 500,
  },
  /* ── buttons ── */
  btnPrimary: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    background: "linear-gradient(135deg, #6B9071 0%, #375534 100%)",
    color: "#0F2A1D",
    border: "none",
    borderRadius: 12,
    padding: "14px 32px",
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 700,
    fontSize: 15,
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 4px 16px rgba(107,144,113,0.35)",
    marginTop: 20,
    width: "100%",
    letterSpacing: "0.01em",
  },
  btnAsk: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    background: "linear-gradient(135deg, #0F2A1D 0%, #375534 100%)",
    color: "#fff",
    border: "none",
    borderRadius: 12,
    padding: "14px 32px",
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 700,
    fontSize: 15,
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 4px 20px rgba(55,85,52,0.3)",
    marginTop: 16,
    width: "100%",
    letterSpacing: "0.01em",
  },
  /* ── textarea ── */
  textarea: {
    width: "100%",
    borderRadius: 14,
    border: "1.5px solid rgba(55,85,52,0.2)",
    padding: "16px 18px",
    fontSize: 15,
    fontFamily: "'Raleway', sans-serif",
    color: "#0F2A1D",
    background: "#f4fbf0",
    resize: "none" as const,
    lineHeight: 1.6,
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    outline: "none",
  },
  /* ── answer ── */
  answerCard: {
    background: "linear-gradient(135deg, #0F2A1D 0%, #375534 100%)",
    borderRadius: 20,
    padding: "32px 40px",
    boxShadow: "0 8px 32px rgba(55,85,52,0.25)",
  },
  answerHeader: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 16,
  },
  answerBadge: {
    background: "rgba(107,144,113,0.2)",
    border: "1px solid rgba(107,144,113,0.4)",
    color: "#6B9071",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
    padding: "4px 12px",
    borderRadius: 100,
  },
  answerTitle: {
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 700,
    fontSize: 18,
    color: "#fff",
    margin: 0,
  },
  answerText: {
    color: "rgba(255,255,255,0.88)",
    fontSize: 15,
    lineHeight: 1.75,
    whiteSpace: "pre-wrap" as const,
    margin: 0,
  },
  /* ── loading pill ── */
  loadingPill: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    background: "rgba(55,85,52,0.07)",
    border: "1px solid rgba(55,85,52,0.15)",
    borderRadius: 100,
    padding: "10px 24px",
    color: "#375534",
    fontSize: 14,
    fontWeight: 600,
    fontFamily: "'Raleway', sans-serif",
    animation: "pulse 1.5s ease-in-out infinite",
  },
  /* ── how it works ── */
  howSection: {
    padding: "20px 0 0",
  },
  howTitle: {
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 700,
    fontSize: 22,
    color: "#0F2A1D",
    marginBottom: 24,
    textAlign: "center" as const,
  },
  stepsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 16,
  },
  stepCard: {
    background: "linear-gradient(135deg, #d4e6c4 0%, #E3EED4 100%)",
    border: "1px solid rgba(55,85,52,0.12)",
    borderRadius: 18,
    padding: "28px 24px",
    textAlign: "center" as const,
    transition: "transform 0.25s ease, box-shadow 0.25s ease",
  },
  stepNum: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 28,
    height: 28,
    background: "#0F2A1D",
    color: "#fff",
    borderRadius: "50%",
    fontSize: 12,
    fontWeight: 700,
    fontFamily: "'Raleway', sans-serif",
    marginBottom: 14,
  },
  stepIcon: { fontSize: 32, display: "block", marginBottom: 12 },
  stepTitle: {
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 700,
    fontSize: 15,
    color: "#0F2A1D",
    marginBottom: 8,
  },
  stepDesc: { color: "#375534", fontSize: 13, lineHeight: 1.5 },
  /* ── divider ── */
  divider: {
    height: 1,
    background: "linear-gradient(90deg, transparent 0%, rgba(55,85,52,0.15) 50%, transparent 100%)",
    margin: "8px 0",
    border: "none",
  },
  /* ── footer ── */
  footer: {
    textAlign: "center" as const,
    padding: "24px",
    color: "#6B9071",
    fontSize: 13,
    borderTop: "1px solid rgba(55,85,52,0.1)",
    background: "rgba(55,85,52,0.03)",
  },
};

export default function Home() {
  /* ────────── all original state & handlers preserved ────────── */
  const [file, setFile] = useState<File | null>(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  // ✅ UPLOAD PDF
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a PDF first");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);
    try {
      const response = await axios.post(`${API}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response.data);
      alert("PDF uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Upload failed. Check backend.");
    }
    setLoading(false);
  };

  // ✅ ASK QUESTION
  const handleAsk = async () => {
    if (!question.trim()) {
      alert("Enter a question");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${API}/query`, { question });
      setAnswer(response.data.answer);
    } catch (err) {
      console.error(err);
      alert("Failed to get answer. Check backend /query API.");
    }
    setLoading(false);
  };

  /* ── drag & drop handlers ── */
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files?.[0];
    if (dropped && dropped.type === "application/pdf") setFile(dropped);
  };

  /* ── scroll to section ── */
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenu(false);
  };

  return (
    <>
      {/* ─── global keyframe injected inline ─── */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.55; }
        }
        @keyframes floatUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-animate { animation: floatUp 0.7s ease both; }
        .hero-animate-2 { animation: floatUp 0.7s 0.15s ease both; }
        .hero-animate-3 { animation: floatUp 0.7s 0.3s ease both; }
        .card-hover:hover {
          box-shadow: 0 12px 40px rgba(55,85,52,0.15) !important;
          transform: translateY(-3px);
        }
        .step-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 32px rgba(55,85,52,0.13) !important;
        }
        .upload-zone-hover:hover {
          border-color: #375534 !important;
          background: #E3EED4 !important;
          box-shadow: 0 0 0 4px rgba(55,85,52,0.08);
        }
        .upload-zone-drag {
          border-color: #6B9071 !important;
          background: rgba(107,144,113,0.06) !important;
          box-shadow: 0 0 0 4px rgba(107,144,113,0.15) !important;
        }
        .btn-gold:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(107,144,113,0.5) !important;
        }
        .btn-teal:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(55,85,52,0.4) !important;
        }
        .btn-gold:active, .btn-teal:active { transform: translateY(0) scale(0.98); }
        .nav-link:hover {
          color: #ffffff !important;
          background: rgba(255,255,255,0.12) !important;
        }
        .textarea-focus:focus {
          border-color: #375534 !important;
          box-shadow: 0 0 0 3px rgba(55,85,52,0.1) !important;
          background: #ffffff !important;
        }
        .mobile-menu {
          position: fixed;
          top: 64px;
          left: 0;
          right: 0;
          background: #375534;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          z-index: 99;
          box-shadow: 0 8px 24px rgba(55,85,52,0.3);
        }
        @media (min-width: 600px) {
          .mobile-toggle { display: none !important; }
          .desktop-nav { display: flex !important; }
        }
        @media (max-width: 599px) {
          .desktop-nav { display: none !important; }
        }
        .hero-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          pointer-events: none;
          z-index: 0;
        }
      `}</style>

      {/* ─────────── NAVBAR ─────────── */}
      <nav style={S.nav}>
        <a href="#" style={S.navLogo} onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
          <span style={{ fontSize: 22 }}></span>
          <span>LexAI</span>
          <span style={{
            background: "#6B9071", color: "#0F2A1D", fontSize: 10,
            fontWeight: 800, padding: "2px 7px", borderRadius: 5,
            letterSpacing: "0.05em", fontFamily: "'Raleway', sans-serif",
          }}>PRO</span>
        </a>

        {/* Desktop nav */}
        <div className="desktop-nav" style={S.navLinks}>
          {[["Home", "hero"], ["How It Works", "how-it-works"], ["About", "about"]].map(([label, id]) => (
            <button
              key={label}
              className="nav-link"
              onClick={() => scrollTo(id)}
              style={{ ...S.navLink, background: "transparent", border: "none" }}
            >
              {label}
            </button>
          ))}
          <button
            className="btn-gold"
            onClick={() => scrollTo("upload")}
            style={{
              ...S.btnPrimary,
              width: "auto",
              padding: "8px 20px",
              fontSize: 13,
              marginTop: 0,
              borderRadius: 8,
            }}
          >
            Get Started →
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="mobile-toggle"
          onClick={() => setMobileMenu((p) => !p)}
          style={{
            background: "transparent", border: "none", cursor: "pointer",
            color: "#fff", fontSize: 22, display: "flex", alignItems: "center",
          }}
          aria-label="Toggle menu"
        >
          {mobileMenu ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {mobileMenu && (
        <div className="mobile-menu">
          {[["Home", "hero"], ["How It Works", "how-it-works"], ["About", "about"]].map(([label, id]) => (
            <button key={label} className="nav-link" onClick={() => scrollTo(id)}
              style={{ ...S.navLink, background: "transparent", border: "none", textAlign: "left" }}>
              {label}
            </button>
          ))}
        </div>
      )}

      {/* ─────────── PAGE ─────────── */}
      <div style={S.page}>

        {/* ── HERO ── */}
        <section id="hero" style={S.hero}>
          {/* bg orbs */}
          <div className="hero-orb" style={{ width: 500, height: 500, background: "rgba(55,85,52,0.07)", top: -100, left: -100 }} />
          <div className="hero-orb" style={{ width: 350, height: 350, background: "rgba(107,144,113,0.07)", top: 50, right: -80 }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            <div className="hero-animate" style={S.heroBadge}>
              <span>✦</span> AI-Powered Legal Analysis
            </div>

            <h1 className="hero-animate-2" style={S.heroTitle}>
              Analyze Legal Docs{" "}
              <span style={S.heroTitleAccent}>Instantly with AI</span>
            </h1>

            <p className="hero-animate-3" style={S.heroSub}>
              Upload legal PDFs and let AI analyze documents automatically.
              Get precise answers to complex legal questions in seconds.
            </p>

            <div className="hero-animate-3" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <button
                className="btn-gold"
                onClick={() => scrollTo("upload")}
                style={{ ...S.btnPrimary, width: "auto", padding: "14px 32px", marginTop: 0 }}
              >
                 Upload PDF
              </button>
              <button
                onClick={() => scrollTo("how-it-works")}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "transparent",
                  border: "1.5px solid rgba(55,85,52,0.25)",
                  color: "#375534", borderRadius: 12, padding: "14px 28px",
                  fontFamily: "'Raleway', sans-serif", fontWeight: 600, fontSize: 15,
                  cursor: "pointer", transition: "all 0.2s ease",
                }}
              >
                How It Works ↓
              </button>
            </div>

            {/* trust strip */}
            <div style={{ display: "flex", gap: 24, justifyContent: "center", marginTop: 40, flexWrap: "wrap" }}>
              {[" Secure Processing", " Real-Time Analysis", " AI-Powered"].map((t) => (
                <span key={t} style={{ color: "#375534", fontSize: 13, fontWeight: 500, display: "flex", alignItems: "center", gap: 5 }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── MAIN CONTENT ── */}
        <div style={S.content}>

          {/* ── UPLOAD CARD ── */}
          <div id="upload" className="card-hover" style={S.card}>
            <div style={S.cardTitle}>
              <span style={{ fontSize: 22 }}></span> Upload Legal Document
            </div>
            <p style={S.cardSubtitle}>
              Drag & drop your PDF or click to browse. AI will extract and index all content automatically.
            </p>

            <div
              className={`upload-zone-hover ${dragging ? "upload-zone-drag" : ""}`}
              style={{ ...S.uploadZone, borderColor: dragging ? "#6B9071" : "rgba(55,85,52,0.3)" }}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept="application/pdf"
                style={S.fileInput}
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              <span style={S.uploadIcon}></span>
              <p style={S.uploadText}>{dragging ? "Drop your PDF here" : "Upload Legal PDF"}</p>
              <p style={S.uploadHelper}>
                Only PDF files are supported.<br />
                AI will process documents automatically.
              </p>
            </div>

            {file && (
              <div style={S.fileChosen}>
                <span>📎</span>
                <span style={{ fontWeight: 600 }}>{file.name}</span>
                <span style={{ color: "#6B9071", fontSize: 12 }}>({(file.size / 1024).toFixed(1)} KB)</span>
                <button
                  onClick={() => setFile(null)}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "#375534", marginLeft: "auto", fontSize: 16 }}
                  title="Remove file"
                >✕</button>
              </div>
            )}

            <button
              className="btn-gold"
              onClick={handleUpload}
              disabled={loading || !file}
              style={{
                ...S.btnPrimary,
                opacity: !file ? 0.55 : 1,
                cursor: !file ? "not-allowed" : "pointer",
              }}
            >
              {loading ? " Processing…" : "⬆ Upload & Analyze PDF"}
            </button>
          </div>

          {/* ── ASK QUESTION CARD ── */}
          <div className="card-hover" style={S.card}>
            <div style={S.cardTitle}>
              <span style={{ fontSize: 22 }}></span> Ask Legal Questions
            </div>
            <p style={S.cardSubtitle}>
              Ask anything about the uploaded document — clauses, obligations, risks, or summaries.
            </p>

            <textarea
              className="textarea-focus"
              rows={5}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask legal questions about the uploaded document…&#10;&#10;e.g. What are the termination clauses? Summarize section 4."
              style={S.textarea}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) handleAsk();
              }}
            />
            <p style={{ color: "#6B9071", fontSize: 12, marginTop: 6, marginBottom: 0 }}>
              Tip: Press <kbd style={{ background: "#E3EED4", border: "1px solid rgba(55,85,52,0.2)", padding: "1px 6px", borderRadius: 5, fontSize: 11 }}>Ctrl+Enter</kbd> to submit
            </p>

            <button
              className="btn-teal"
              onClick={handleAsk}
              disabled={loading || !question.trim()}
              style={{
                ...S.btnAsk,
                opacity: !question.trim() ? 0.55 : 1,
                cursor: !question.trim() ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Thinking…" : "Ask AI Counsel"}
            </button>
          </div>

          {/* ── LOADING ── */}
          {loading && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={S.loadingPill}>
                <span></span> AI is processing your request…
              </div>
            </div>
          )}

          {/* ── ANSWER ── */}
          {answer && !loading && (
            <div style={S.answerCard}>
              <div style={S.answerHeader}>
                <span style={S.answerTitle}>AI Response</span>
                <span style={S.answerBadge}>✦ Legal Analysis</span>
              </div>
              <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.12)", margin: "0 0 18px" }} />
              <p style={S.answerText}>{answer}</p>
            </div>
          )}

          <hr style={S.divider} />

          {/* ── HOW IT WORKS ── */}
          <div id="how-it-works" style={S.howSection}>
            <p style={{ ...S.heroBadge, display: "flex", width: "fit-content", margin: "0 auto 12px" }}>✦ Process</p>
            <h2 style={S.howTitle}>How It Works</h2>
            <div style={S.stepsGrid}>
              {[
                { num: "1",  title: "Upload Legal PDF", desc: "Drag & drop or select any legal PDF document. We support contracts, agreements, briefs, and more." },
                { num: "2", title: "AI Processes Document", desc: "Our AI reads, indexes, and understands the full legal document — structure, clauses, and context." },
                { num: "3",  title: "Get Legal Insights", desc: "Ask plain-English questions and receive precise, contextualized answers backed by the document." },
              ].map((step) => (
                <div key={step.num} className="step-hover" style={S.stepCard}>
                  <div style={S.stepNum}>{step.num}</div>
                  <span style={S.stepIcon}>{step.icon}</span>
                  <div style={S.stepTitle}>{step.title}</div>
                  <p style={S.stepDesc}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <hr style={S.divider} />

          {/* ── ABOUT ── */}
          <div id="about" style={{
            ...S.card,
            background: "linear-gradient(135deg, #e8f2e0 0%, #d4e6c4 100%)",
            border: "1px solid rgba(55,85,52,0.12)",
          }}>
            <div style={S.cardTitle}><span>✦</span> About This Tool</div>
            <p style={{ color: "#375534", fontSize: 15, lineHeight: 1.75, margin: 0 }}>
              <strong style={{ color: "#0F2A1D" }}>AI Legal Document Analyzer</strong> combines state-of-the-art language models with document understanding to help legal professionals, students, and businesses navigate complex legal texts — without needing specialized expertise for every query.
              Upload any PDF, ask natural-language questions, and get accurate, grounded answers instantly.
            </p>
          </div>

        </div>

        {/* ── FOOTER ── */}
        <footer style={S.footer}>
          <span><strong>LexAI</strong> — AI Legal Document Analyzer &nbsp;·&nbsp; © {new Date().getFullYear()} All rights reserved</span>
        </footer>
      </div>
    </>
  );
}