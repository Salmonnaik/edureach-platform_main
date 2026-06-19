import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, Mail, Lock, ArrowLeft, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { loginUser, loginWithGoogle } from "../services/auth.service";
import { useAuth } from "../context/AuthContext";
import { images } from "../data/content";

export default function LoginPage() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const { login } = useAuth();
  const navigate   = useNavigate();

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      const data = await loginUser({ email, password });
      login(data.token);
      toast.success("Welcome back!");
      navigate("/");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      const data = await loginWithGoogle();
      login(data.token);
      toast.success("Welcome back!");
      navigate("/");
    } catch (err: any) {
      toast.error(err.message || "Google sign-in failed");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#faf7f2]">

      {/* ── Left Panel — Brand Image ─────────────── */}
      <div className="hidden lg:block lg:w-[52%] relative overflow-hidden">
        {/* Campus photo */}
        <img
          src={images.students}
          alt="Students"
          className="w-full h-full object-cover scale-105"
        />

        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-900/80" />

        {/* Dot grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Glow blob */}
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[90px] pointer-events-none" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-between p-12">
          {/* Top — Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-400 flex items-center justify-center shadow-[0_4px_16px_rgba(245,158,11,0.45)]">
              <GraduationCap className="w-5 h-5 text-slate-900" />
            </div>
            <span className="font-serif text-2xl font-semibold text-white">
              Edu<span className="text-amber-400">Reach</span>
            </span>
          </div>

          {/* Centre — Quote */}
          <div className="max-w-sm">
            <div className="font-serif text-8xl text-amber-400/20 leading-none mb-0 select-none -mb-4">"</div>
            <blockquote className="font-serif text-[1.4rem] text-white/85 leading-snug italic mb-7">
              The beautiful thing about learning is that no one can take it away from you.
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-400 flex items-center justify-center text-slate-900 font-bold text-sm shrink-0">
                BB
              </div>
              <div>
                <div className="text-white text-sm font-semibold">B.B. King</div>
                <div className="text-slate-400 text-xs font-mono">Musician &amp; Philosopher</div>
              </div>
            </div>
          </div>

          {/* Bottom — Stats */}
          <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10">
            {[
              { value: "15K+", label: "Alumni" },
              { value: "92%",  label: "Placement" },
              { value: "500+", label: "Companies" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-serif text-2xl font-bold text-amber-400 leading-none">{s.value}</div>
                <div className="text-slate-500 text-[10px] font-mono uppercase tracking-widest mt-1.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right Panel — Form ───────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 lg:px-14 relative">

        {/* Back link */}
        <div className="absolute top-6 left-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-slate-400 hover:text-amber-600 text-sm font-medium transition-colors duration-200 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
            Back to Home
          </Link>
        </div>

        {/* Mobile logo */}
        <div className="flex lg:hidden items-center gap-2.5 mb-10">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-400 flex items-center justify-center shadow-[0_4px_12px_rgba(245,158,11,0.4)]">
            <GraduationCap className="w-4 h-4 text-slate-900" />
          </div>
          <span className="font-serif text-xl font-semibold text-slate-900">
            Edu<span className="text-amber-500">Reach</span>
          </span>
        </div>

        <div className="w-full max-w-[400px]">

          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-5">
            <span className="block w-6 h-px bg-amber-500" />
            <span className="font-mono text-[10px] tracking-widest uppercase text-amber-600 font-semibold">
              Student &amp; Admin Portal
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-serif text-slate-900 font-bold leading-tight mb-2"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}>
            Welcome Back
          </h1>
          <p className="text-slate-500 text-[0.9375rem] leading-relaxed mb-9">
            Sign in to your EduReach account to continue.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@edureach.ac.in"
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/15 transition-all duration-200"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs text-amber-600 hover:text-amber-700 font-medium transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/15 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label={showPass ? "Hide password" : "Show password"}
                >
                  {showPass
                    ? <EyeOff className="w-4 h-4" />
                    : <Eye className="w-4 h-4" />
                  }
                </button>
              </div>
            </div>

            {/* Remember me */}
            <label className="flex items-center gap-2.5 cursor-pointer group -mt-1">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-slate-300 accent-amber-500 cursor-pointer"
              />
              <span className="text-sm text-slate-600 group-hover:text-slate-800 transition-colors">
                Keep me signed in
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2.5 py-4 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 text-slate-900 font-bold text-sm shadow-[0_8px_24px_rgba(245,158,11,0.35)] hover:shadow-[0_12px_36px_rgba(245,158,11,0.5)] hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 transition-all duration-300 mt-1"
            >
              {loading ? (
                <>
                  {/* Spinner */}
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 000 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
                  </svg>
                  Signing in…
                </>
              ) : (
                "Sign In →"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-7">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs text-slate-400 font-mono uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Google SSO */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-medium hover:border-amber-300 hover:bg-amber-50/40 hover:-translate-y-0.5 shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {googleLoading ? (
              <>
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 000 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
                </svg>
                Connecting to Google…
              </>
            ) : (
              <>
                {/* Official Google G SVG */}
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </>
            )}
          </button>

          {/* Sign up link */}
          <p className="text-center text-sm text-slate-500 mt-8">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-amber-600 font-semibold hover:text-amber-700 transition-colors"
            >
              Sign Up Free →
            </Link>
          </p>

          {/* Legal */}
          <p className="text-center text-[10px] text-slate-400 font-mono mt-5 leading-relaxed">
            By signing in you agree to EduReach's{" "}
            <a href="/terms"   className="underline hover:text-slate-600 transition-colors">Terms</a>
            {" "}and{" "}
            <a href="/privacy" className="underline hover:text-slate-600 transition-colors">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}