import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import FloatingChatButton from "./components/FloatingChatButton";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MentorsPage from "./pages/MentorsPage";
import PlacementsPage from "./pages/PlacementsPage";
import type { ReactNode } from "react";
import { useEffect } from "react";

// ─── Scroll to top on every route change ─────────
function ScrollRestoration() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

// ─── Page fade-in wrapper ─────────────────────────
function PageTransition({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  return (
    <div
      key={pathname}
      style={{
        animation: "pageFadeIn 0.35s cubic-bezier(0.4,0,0.2,1) both",
      }}
    >
      {children}
      <style>{`
        @keyframes pageFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

// ─── Layout: pages that include the Navbar ────────
function WithNavbar({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

// ─── 404 Not Found page ───────────────────────────
function NotFoundPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#faf7f2",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "24px",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Logo mark */}
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 14,
          background: "linear-gradient(135deg, #f59e0b, #fbbf24)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Georgia, serif",
          fontSize: "1.75rem",
          fontWeight: 700,
          color: "#0b1628",
          marginBottom: 32,
          boxShadow: "0 8px 24px rgba(245,158,11,0.35)",
        }}
      >
        E
      </div>

      {/* 404 number */}
      <div
        style={{
          fontFamily: "Georgia, serif",
          fontSize: "clamp(5rem, 15vw, 10rem)",
          fontWeight: 700,
          lineHeight: 1,
          color: "#f59e0b",
          marginBottom: 12,
          letterSpacing: "-0.04em",
        }}
      >
        404
      </div>

      <h1
        style={{
          fontFamily: "Georgia, serif",
          fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
          fontWeight: 600,
          color: "#0b1628",
          marginBottom: 12,
        }}
      >
        Page Not Found
      </h1>

      <p
        style={{
          fontSize: "1.0625rem",
          color: "#64748b",
          maxWidth: 380,
          lineHeight: 1.75,
          marginBottom: 40,
        }}
      >
        The page you're looking for doesn't exist or has been moved. Let's get you back on track.
      </p>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
        <a
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "13px 32px",
            borderRadius: 100,
            background: "linear-gradient(135deg, #f59e0b, #fbbf24)",
            color: "#0b1628",
            fontWeight: 700,
            fontSize: "0.9375rem",
            textDecoration: "none",
            boxShadow: "0 8px 24px rgba(245,158,11,0.35)",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
        >
          ← Back to Home
        </a>
        <a
          href="/login"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "13px 32px",
            borderRadius: 100,
            background: "transparent",
            color: "#334155",
            fontWeight: 600,
            fontSize: "0.9375rem",
            textDecoration: "none",
            border: "1.5px solid #e2e8f0",
            transition: "border-color 0.2s ease, color 0.2s ease",
          }}
        >
          Sign In →
        </a>
      </div>

      {/* Decorative blobs */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          top: "20%",
          right: "10%",
          width: 400,
          height: 400,
          background: "rgba(245,158,11,0.06)",
          borderRadius: "50%",
          filter: "blur(80px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        aria-hidden
        style={{
          position: "fixed",
          bottom: "15%",
          left: "5%",
          width: 300,
          height: 300,
          background: "rgba(59,130,246,0.04)",
          borderRadius: "50%",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
    </div>
  );
}

// ─── Root App ─────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>

        {/* Toast notifications — EduReach styled */}
        <Toaster
          position="top-center"
          gutter={10}
          toastOptions={{
            duration: 3500,
            style: {
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.9rem",
              fontWeight: 500,
              borderRadius: "100px",
              padding: "12px 20px",
              boxShadow: "0 8px 32px rgba(15,23,42,0.18)",
              maxWidth: 400,
            },
            success: {
              style: {
                background: "#0b1628",
                color: "#fbbf24",
                border: "1px solid rgba(245,158,11,0.25)",
              },
              iconTheme: {
                primary: "#f59e0b",
                secondary: "#0b1628",
              },
            },
            error: {
              style: {
                background: "#fff1f2",
                color: "#be123c",
                border: "1px solid rgba(244,63,94,0.2)",
              },
              iconTheme: {
                primary: "#f43f5e",
                secondary: "#fff1f2",
              },
            },
          }}
        />

        {/* Scroll restoration + page transition */}
        <ScrollRestoration />

        <PageTransition>
          <Routes>
            {/* Public pages with Navbar */}
            <Route
              path="/"
              element={
                <WithNavbar>
                  <HomePage />
                </WithNavbar>
              }
            />

            <Route
              path="/mentors"
              element={
                <WithNavbar>
                  <MentorsPage />
                </WithNavbar>
              }
            />

            <Route
              path="/placements"
              element={
                <WithNavbar>
                  <PlacementsPage />
                </WithNavbar>
              }
            />

            {/* Auth pages — no Navbar */}
            <Route path="/login"  element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* Dedicated 404 — shown before catch-all redirect */}
            <Route path="/404" element={<NotFoundPage />} />

            {/* Catch-all → 404 page (not silent redirect) */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </PageTransition>

        {/* Floating chat button — visible on all pages */}
        <FloatingChatButton />

      </AuthProvider>
    </BrowserRouter>
  );
}