import { useState, useEffect } from "react";
import { siteConfig, images } from "../data/content";
import { ArrowRight, Sparkles, Play } from "lucide-react";

// ─── Animated counter ─────────────────────────────────────
function Counter({ value }: { value: string }) {
  const match = value.match(/^([#]?)(\d+)([%+KM]*)$/);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!match) return;
    const target = parseInt(match[2], 10);
    const steps  = 48;
    const delay  = 1400 / steps;
    let cur = 0;
    const t = setInterval(() => {
      cur += target / steps;
      if (cur >= target) { setCount(target); clearInterval(t); }
      else setCount(Math.floor(cur));
    }, delay);
    return () => clearInterval(t);
  }, [value]); // eslint-disable-line

  if (!match) return <>{value}</>;
  return <>{match[1]}{count}{match[3]}</>;
}

// ─── Stats data ───────────────────────────────────────────
const STATS = [
  { value: "92%",  label: "Placement Rate" },
  { value: "500+", label: "Companies" },
  { value: "25K+", label: "Alumni" },
  { value: "#1",   label: "In Telangana" },
];

// ─── Component ────────────────────────────────────────────
export default function HeroSection() {
  const [ready,    setReady]    = useState(false);
  const [counting, setCounting] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setReady(true),    80);
    const t2 = setTimeout(() => setCounting(true), 900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Try every possible key that might exist in images
  const bg =
    (images as Record<string, string>).campus       ||
    (images as Record<string, string>).hero         ||
    (images as Record<string, string>).collegeMain  ||
    (images as Record<string, string>).college      ||
    (images as Record<string, string>).students     ||
    (images as Record<string, string>).collegeClassroom ||
    "";

  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">

      {/* ══ Background ══════════════════════════════ */}

      {/* Campus photo */}
      {bg && (
        <img
          src={bg}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
          style={{ filter: "brightness(0.52) saturate(1.1)" }}
        />
      )}

      {/* Maroon colour tint — exact match to screenshot */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(140deg, rgba(110,5,5,0.78) 0%, rgba(80,4,4,0.65) 55%, rgba(50,2,2,0.50) 100%)",
        }}
      />

      {/* Bottom-to-top darkening for text legibility */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(40,2,2,0.80) 0%, rgba(40,2,2,0.25) 40%, transparent 70%)",
        }}
      />

      {/* ══ Content ═════════════════════════════════ */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 pb-16 pt-40">
        <div
          className="max-w-3xl"
          style={{
            opacity:    ready ? 1 : 0,
            transform:  ready ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.75s ease, transform 0.75s ease",
          }}
        >

          {/* ── Established pill ── */}
          <div className="mb-7">
            <span
              className="inline-flex items-center gap-2"
              style={{
                padding:        "6px 16px",
                borderRadius:   100,
                background:     "rgba(255,255,255,0.10)",
                border:         "1px solid rgba(255,255,255,0.22)",
                backdropFilter: "blur(10px)",
                fontFamily:     "'DM Mono','Fira Code',monospace",
                fontSize:       "0.7rem",
                letterSpacing:  "0.16em",
                textTransform:  "uppercase",
                color:          "rgba(255,255,255,0.88)",
              }}
            >
              <Sparkles style={{ width: 13, height: 13, color: "#fbbf24", flexShrink: 0 }} />
              EST. {siteConfig.established} · HYDERABAD, TELANGANA
            </span>
          </div>

          {/* ── Heading ── */}
          <h1
            className="mb-6"
            style={{
              fontFamily:     "'Playfair Display','Cormorant Garamond',Georgia,serif",
              fontWeight:     700,
              lineHeight:     1.1,
              letterSpacing:  "-0.015em",
            }}
          >
            {/* "Welcome to" — white, same size as screenshot */}
            <span
              className="block text-white"
              style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.25rem)" }}
            >
              Welcome to
            </span>

            {/* College name — gold gradient, same as screenshot */}
            <span
              className="block"
              style={{
                fontSize:               "clamp(2.4rem, 5.5vw, 4.25rem)",
                background:             "linear-gradient(90deg, #fde68a 0%, #f59e0b 45%, #fbbf24 100%)",
                WebkitBackgroundClip:   "text",
                WebkitTextFillColor:    "transparent",
                backgroundClip:         "text",
              }}
            >
              {siteConfig.name} College
            </span>
          </h1>

          {/* ── Tagline ── */}
          <p
            className="mb-10"
            style={{
              fontFamily: "'DM Sans',system-ui,sans-serif",
              fontSize:   "clamp(1rem, 1.7vw, 1.15rem)",
              lineHeight: 1.7,
              color:      "rgba(255,255,255,0.85)",
              maxWidth:   580,
            }}
          >
            {siteConfig.tagline}. Premier engineering institution with{" "}
            <strong style={{ color: "#fde68a", fontWeight: 600 }}>
              92% placement rate
            </strong>{" "}
            and partnerships with Google, Microsoft &amp; Amazon.
          </p>

          {/* ── CTA Buttons ── */}
          <div
            className="flex flex-wrap gap-4 items-center mb-16"
            style={{ opacity: ready ? 1 : 0, transition: "opacity 0.8s ease 0.2s" }}
          >
            {/* Primary — "Explore Programs" outlined white */}
            <button
              className="group"
              style={{
                display:        "inline-flex",
                alignItems:     "center",
                gap:            10,
                padding:        "12px 26px",
                borderRadius:   8,
                fontFamily:     "'DM Sans',sans-serif",
                fontSize:       "0.9375rem",
                fontWeight:     600,
                background:     "transparent",
                color:          "#ffffff",
                border:         "1.5px solid rgba(255,255,255,0.65)",
                cursor:         "pointer",
                transition:     "background 0.2s ease",
                letterSpacing:  "0.01em",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.13)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              Explore Programs
              <ArrowRight style={{ width: 17, height: 17 }} />
            </button>

            {/* Secondary — "Take Virtual Tour" frosted */}
            <button
              style={{
                display:        "inline-flex",
                alignItems:     "center",
                gap:            10,
                padding:        "11px 22px",
                borderRadius:   8,
                fontFamily:     "'DM Sans',sans-serif",
                fontSize:       "0.9375rem",
                fontWeight:     500,
                background:     "rgba(255,255,255,0.09)",
                color:          "rgba(255,255,255,0.82)",
                border:         "1.5px solid rgba(255,255,255,0.22)",
                backdropFilter: "blur(8px)",
                cursor:         "pointer",
                transition:     "background 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.17)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.09)";
              }}
            >
              <Play style={{ width: 15, height: 15, fill: "currentColor", flexShrink: 0 }} />
              Take Virtual Tour
            </button>
          </div>

          {/* ── Stats strip ── */}
          <div
            style={{
              display:    "flex",
              flexWrap:   "wrap",
              gap:        "0 48px",
              rowGap:     24,
              paddingTop: 28,
              borderTop:  "1px solid rgba(255,255,255,0.14)",
              opacity:    ready ? 1 : 0,
              transition: "opacity 0.8s ease 0.45s",
            }}
          >
            {STATS.map((s, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {/* Number */}
                <span
                  style={{
                    fontFamily:    "'Playfair Display','Cormorant Garamond',Georgia,serif",
                    fontSize:      "clamp(1.8rem, 3.2vw, 2.75rem)",
                    fontWeight:    700,
                    lineHeight:    1,
                    color:         "#fde68a",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {counting ? <Counter value={s.value} /> : "0"}
                </span>
                {/* Label */}
                <span
                  style={{
                    fontFamily:    "'DM Sans',sans-serif",
                    fontSize:      "0.7rem",
                    color:         "rgba(255,255,255,0.5)",
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    fontWeight:    500,
                  }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ── Scroll hint ────────────────────────────── */}
      <div
        aria-hidden
        style={{
          position:   "absolute",
          bottom:     32,
          right:      40,
          display:    "flex",
          flexDirection: "column",
          alignItems: "center",
          gap:        8,
          opacity:    ready ? 0.45 : 0,
          transition: "opacity 1.2s ease 1.2s",
        }}
        className="hidden lg:flex"
      >
        <span
          style={{
            display:    "block",
            width:      1,
            height:     44,
            background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.6))",
            animation:  "heroPulse 2.2s ease-in-out infinite",
          }}
        />
        <span
          style={{
            fontFamily:    "'DM Mono',monospace",
            fontSize:      "0.58rem",
            color:         "rgba(255,255,255,0.55)",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            writingMode:   "vertical-rl",
          }}
        >
          Scroll
        </span>
      </div>

      {/* ── Keyframes ──────────────────────────────── */}
      <style>{`
        @keyframes heroPulse {
          0%, 100% { opacity: 0.25; transform: scaleY(0.55); }
          50%       { opacity: 1;   transform: scaleY(1); }
        }
      `}</style>
    </section>
  );
}