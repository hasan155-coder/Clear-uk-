"use client";
import { useState, useEffect, useRef } from "react";

const LANGUAGES = [
  { code: "en", label: "English", flag: "🇬🇧", placeholder: "Type your question..." },
  { code: "tr", label: "Türkçe", flag: "🇹🇷", placeholder: "Sorunuzu yazın..." },
  { code: "ar", label: "العربية", flag: "🇸🇦", placeholder: "اكتب سؤالك...", rtl: true },
  { code: "pl", label: "Polski", flag: "🇵🇱", placeholder: "Napisz pytanie..." },
  { code: "ur", label: "اردو", flag: "🇵🇰", placeholder: "اپنا سوال لکھیں...", rtl: true },
  { code: "ro", label: "Română", flag: "🇷🇴", placeholder: "Scrieți întrebarea..." },
  { code: "so", label: "Soomaali", flag: "🇸🇴", placeholder: "Qor su'aashaada..." },
  { code: "bn", label: "বাংলা", flag: "🇧🇩", placeholder: "আপনার প্রশ্ন লিখুন..." },
];

const TOPICS = [
  { icon: "🏥", en: "GP / Doctor", description: "Register with NHS, find a GP, book appointments" },
  { icon: "🏫", en: "School & Education", description: "Enrol children, school places, university" },
  { icon: "🚗", en: "Driving Licence", description: "Convert foreign licence, theory test, DVLA" },
  { icon: "🏛️", en: "Council Services", description: "Council tax, housing, benefits, bin collection" },
  { icon: "📋", en: "Visa & Immigration", description: "Leave to remain, citizenship, BRP card" },
  { icon: "💰", en: "Benefits & Support", description: "Universal Credit, child benefit, tax credits" },
  { icon: "🏦", en: "Banking & NI Number", description: "Open a bank account, National Insurance number" },
  { icon: "📞", en: "Emergency & Safety", description: "999, 111, local police, domestic support" },
];

function now() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function Home() {
  const [lang, setLang] = useState(LANGUAGES[0]);
  const [view, setView] = useState("home");
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  function startChat(topic) {
    setMessages([{
      role: "assistant",
      text: `Welcome to ClearPath UK 🇬🇧\n\nI'm here to help you with UK services and paperwork. Ask me anything in your own language and I'll guide you step by step — simply and clearly.`,
      time: now(),
    }]);
    setHistory([]);
    setView("chat");
    if (topic) {
      setTimeout(() => send(`I need help with: ${topic.en}`, []), 200);
    }
  }

  async function send(text, existingHistory) {
    const msgText = text || input.trim();
    if (!msgText || loading) return;

    const userMsg = { role: "user", text: msgText, time: now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    const currentHistory = existingHistory !== undefined ? existingHistory : history;
    const newHistory = [...currentHistory, { role: "user", content: msgText }];
    setHistory(newHistory);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newHistory }),
      });
      const data = await res.json();
      const reply = data.text || "Sorry, something went wrong. Please try again.";
      setMessages((prev) => [...prev, { role: "assistant", text: reply, time: now() }]);
      setHistory((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [...prev, {
        role: "assistant",
        text: "Connection error. Please try again.",
        time: now(),
      }]);
    }
    setLoading(false);
  }

  const isRTL = lang.rtl;

  // ── HOME ──
  if (view === "home") return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #003d6b 0%, #00244a 50%, #001529 100%)",
      fontFamily: "'Palatino Linotype', Palatino, Georgia, serif",
      paddingBottom: 48,
    }}>
      <div style={{ height: 4, background: "linear-gradient(90deg, #C8102E 33%, #fff 33%, #fff 66%, #012169 66%)" }} />

      <div style={{ textAlign: "center", padding: "40px 24px 20px" }}>
        <div style={{ fontSize: 52 }}>🇬🇧</div>
        <h1 style={{ color: "#fff", fontSize: 38, margin: "8px 0 0", letterSpacing: -1 }}>ClearPath UK</h1>
        <p style={{ color: "#7eb8f7", fontSize: 15, marginTop: 8 }}>
          Your guide to UK services · Türkçe · العربية · Polski · اردو
        </p>
      </div>

      {/* Language picker */}
      <div style={{ padding: "0 20px 24px", maxWidth: 500, margin: "0 auto" }}>
        <p style={{ color: "#7eb8f7", fontSize: 12, textAlign: "center", letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>
          Choose your language
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
          {LANGUAGES.map((l) => (
            <button key={l.code} onClick={() => setLang(l)} style={{
              background: lang.code === l.code ? "linear-gradient(135deg,#1a6db5,#0d4a80)" : "#ffffff12",
              border: lang.code === l.code ? "1px solid #4a9eff" : "1px solid #ffffff20",
              borderRadius: 12, padding: "10px 4px", cursor: "pointer",
              color: "#fff", fontSize: 11, display: "flex", flexDirection: "column",
              alignItems: "center", gap: 4, transition: "all 0.2s",
              boxShadow: lang.code === l.code ? "0 0 14px #4a9eff44" : "none",
            }}>
              <span style={{ fontSize: 20 }}>{l.flag}</span>
              <span>{l.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Topics */}
      <div style={{ padding: "0 20px", maxWidth: 500, margin: "0 auto" }}>
        <p style={{ color: "#7eb8f7", fontSize: 12, textAlign: "center", letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>
          What do you need help with?
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {TOPICS.map((t) => (
            <button key={t.en} onClick={() => startChat(t)} style={{
              background: "#ffffff0d", border: "1px solid #ffffff18",
              borderRadius: 14, padding: "14px 12px", cursor: "pointer",
              textAlign: "left", color: "#fff", transition: "all 0.2s",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#1a6db533"; e.currentTarget.style.borderColor = "#4a9eff55"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#ffffff0d"; e.currentTarget.style.borderColor = "#ffffff18"; }}
            >
              <div style={{ fontSize: 24, marginBottom: 6 }}>{t.icon}</div>
              <div style={{ fontSize: 13, fontWeight: "bold", color: "#e8f4ff" }}>{t.en}</div>
              <div style={{ fontSize: 11, color: "#7eb8f7", marginTop: 3, lineHeight: 1.4 }}>{t.description}</div>
            </button>
          ))}
        </div>
        <button onClick={() => startChat(null)} style={{
          width: "100%", marginTop: 12,
          background: "linear-gradient(135deg,#C8102E,#a00d24)",
          border: "none", borderRadius: 14, padding: 16,
          cursor: "pointer", color: "#fff", fontSize: 15,
          fontWeight: "bold", fontFamily: "inherit",
          boxShadow: "0 4px 20px #C8102E44",
        }}>
          💬 Ask anything in your language
        </button>
      </div>
    </div>
  );

  // ── CHAT ──
  return (
    <div style={{
      minHeight: "100vh", maxWidth: 520, margin: "0 auto",
      background: "linear-gradient(160deg,#003d6b,#001529)",
      fontFamily: "'Palatino Linotype', Palatino, Georgia, serif",
      display: "flex", flexDirection: "column",
    }}>
      {/* Header */}
      <div style={{
        background: "#001f3f", borderBottom: "1px solid #ffffff15",
        padding: "14px 16px", display: "flex", alignItems: "center", gap: 12,
      }}>
        <button onClick={() => setView("home")} style={{
          background: "#ffffff15", border: "none", color: "#fff",
          width: 34, height: 34, borderRadius: "50%", cursor: "pointer",
          fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center",
        }}>←</button>
        <div style={{ fontSize: 28 }}>🇬🇧</div>
        <div>
          <div style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>ClearPath UK</div>
          <div style={{ color: "#4a9eff", fontSize: 12 }}>{lang.flag} {lang.label} · 🟢 Ready</div>
        </div>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1, overflowY: "auto", padding: "20px 16px",
        display: "flex", flexDirection: "column", gap: 14, minHeight: 400,
      }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: msg.role === "user" ? "flex-end" : "flex-start" }}>
            {msg.role === "assistant" && (
              <div style={{ fontSize: 11, color: "#4a9eff", marginBottom: 4, paddingInline: 4 }}>🇬🇧 ClearPath UK</div>
            )}
            <div style={{
              maxWidth: "85%",
              background: msg.role === "user" ? "linear-gradient(135deg,#C8102E,#9a0b22)" : "#ffffff12",
              color: "#fff", padding: "12px 16px",
              borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
              fontSize: 14, lineHeight: 1.7,
              border: msg.role === "assistant" ? "1px solid #ffffff18" : "none",
              whiteSpace: "pre-wrap", direction: isRTL ? "rtl" : "ltr",
              textAlign: isRTL ? "right" : "left",
            }}>{msg.text}</div>
            <div style={{ color: "#ffffff30", fontSize: 11, marginTop: 3, paddingInline: 4 }}>{msg.time}</div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              background: "#ffffff12", border: "1px solid #ffffff18",
              borderRadius: "18px 18px 18px 4px", padding: "12px 16px",
              display: "flex", gap: 5, alignItems: "center",
            }}>
              {[0, 1, 2].map((d) => (
                <div key={d} style={{
                  width: 7, height: 7, background: "#4a9eff", borderRadius: "50%",
                  animation: "bounce 1.2s infinite", animationDelay: `${d * 0.2}s`,
                }} />
              ))}
            </div>
            <span style={{ color: "#4a9eff", fontSize: 12 }}>Finding answer...</span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      <div style={{ padding: "8px 16px", display: "flex", gap: 8, overflowX: "auto", borderTop: "1px solid #ffffff10" }}>
        {["How do I register with a GP?", "I need a National Insurance number", "How do I apply for Universal Credit?", "My child needs a school place"].map((s) => (
          <button key={s} onClick={() => setInput(s)} style={{
            background: "transparent", border: "1px solid #4a9eff44",
            color: "#7eb8f7", padding: "6px 12px", borderRadius: 20,
            fontSize: 11, cursor: "pointer", whiteSpace: "nowrap", fontFamily: "inherit",
          }}>{s}</button>
        ))}
      </div>

      {/* Input */}
      <div style={{
        padding: "12px 16px 24px", display: "flex", gap: 10, alignItems: "center",
        background: "#001529", borderTop: "1px solid #ffffff10",
      }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
          placeholder={lang.placeholder}
          dir={isRTL ? "rtl" : "ltr"}
          style={{
            flex: 1, background: "#ffffff10", border: "1px solid #ffffff20",
            borderRadius: 24, padding: "12px 18px", color: "#fff",
            fontSize: 14, outline: "none", fontFamily: "inherit",
          }}
        />
        <button onClick={() => send()} disabled={loading || !input.trim()} style={{
          width: 44, height: 44,
          background: loading || !input.trim() ? "#ffffff15" : "linear-gradient(135deg,#012169,#1a4a9e)",
          border: "none", borderRadius: "50%",
          cursor: loading || !input.trim() ? "not-allowed" : "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 18, transition: "all 0.2s",
          boxShadow: loading || !input.trim() ? "none" : "0 2px 12px #012169aa",
        }}>➤</button>
      </div>

      <style>{`
        @keyframes bounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-6px)} }
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-thumb{background:#ffffff20;border-radius:4px}
      `}</style>
    </div>
  );
}
