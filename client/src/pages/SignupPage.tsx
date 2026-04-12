import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, User, Mail, Lock, Phone, ArrowLeft, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { registerUser, loginWithGoogle } from "../services/auth.service";
import { useAuth } from "../context/AuthContext";
import { images } from "../data/content";

export default function SignupPage() {
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [agreed, setAgreed]     = useState(false);
  const { login } = useAuth();
  const navigate  = useNavigate();

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("Please fill in required fields");
      return;
    }
    if (!agreed) {
      toast.error("Please accept the Terms & Privacy Policy");
      return;
    }
    setLoading(true);
    try {
      const data = await registerUser({ name, email, password, phone: phone || undefined });
      login(data.token);
      toast.success("Account created! Welcome to EduReach.");
      navigate("/");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    console.log("Google Sign-In button clicked");
    setGoogleLoading(true);
    try {
      console.log("Calling loginWithGoogle...");
      const data = await loginWithGoogle();
      console.log("Google Sign-In successful:", data);
      login(data.token);
      toast.success("Signed in with Google! Welcome to EduReach.");
      navigate("/");
    } catch (err: any) {
      console.error("Google Sign-In error:", err);
      toast.error(err.message || "Google sign-in failed");
    } finally {
      setGoogleLoading(false);
    }
  };

  // Password strength
  const strength =
    password.length === 0 ? 0
    : password.length < 6 ? 1
    : password.length < 10 ? 2
    : /[A-Z]/.test(password) && /[0-9]/.test(password) ? 4
    : 3;

  const strengthMeta = [
    { label: "",       bar: "bg-slate-200",   text: "" },
    { label: "Weak",   bar: "bg-rose-400",    text: "text-rose-500" },
    { label: "Fair",   bar: "bg-amber-400",   text: "text-amber-500" },
    { label: "Good",   bar: "bg-blue-400",    text: "text-blue-500" },
    { label: "Strong", bar: "bg-emerald-400", text: "text-emerald-500" },
  ];

  const inputBase =
    "w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/15 transition-all duration-200";

  return (
    <div className="min-h-screen flex bg-[#faf7f2]">

      {/* ── Left Panel — Form ────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-14 lg:px-14 relative overflow-y-auto">

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

        <div className="w-full max-w-[420px]">

          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-4">
            <span className="block w-6 h-px bg-amber-500" />
            <span className="font-mono text-[10px] tracking-widest uppercase text-amber-600 font-semibold">
              Free Forever
            </span>
          </div>

          {/* Heading */}
          <h1
            className="font-serif text-slate-900 font-bold leading-tight mb-2"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
          >
            Create Account
          </h1>
          <p className="text-slate-500 text-[0.9375rem] leading-relaxed mb-8">
            Join EduReach for unlimited access to AI chat &amp; counseling calls.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Full Name <span className="text-amber-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Aditya Sharma"
                  className={inputBase}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Email Address <span className="text-amber-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={inputBase}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Password <span className="text-amber-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 6 characters"
                  className={`${inputBase} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label={showPass ? "Hide password" : "Show password"}
                >
                  {showPass
                    ? <EyeOff className="w-4 h-4" />
                    : <Eye    className="w-4 h-4" />
                  }
                </button>
              </div>

              {/* Strength meter */}
              {password.length > 0 && (
                <div className="mt-2.5">
                  <div className="flex gap-1 mb-1.5">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          i <= strength
                            ? strengthMeta[strength].bar
                            : "bg-slate-200"
                        }`}
                      />
                    ))}
                  </div>
                  <p className={`text-[10px] font-mono font-semibold ${strengthMeta[strength].text}`}>
                    {strengthMeta[strength].label} password
                  </p>
                </div>
              )}
            </div>

            {/* Phone (optional) */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Phone{" "}
                <span className="text-slate-400 normal-case tracking-normal font-normal">(optional)</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className={inputBase}
                />
              </div>
            </div>

            {/* Terms checkbox */}
            <label className="flex items-start gap-2.5 cursor-pointer group mt-1">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded border-slate-300 accent-amber-500 cursor-pointer shrink-0"
              />
              <span className="text-xs text-slate-500 leading-relaxed group-hover:text-slate-700 transition-colors">
                I agree to EduReach's{" "}
                <a href="/terms"   className="text-amber-600 font-semibold hover:underline">Terms of Service</a>
                {" "}and{" "}
                <a href="/privacy" className="text-amber-600 font-semibold hover:underline">Privacy Policy</a>.
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
                  <svg className="w-4 h-4 animate-spin shrink-0" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 000 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
                  </svg>
                  Creating Account…
                </>
              ) : (
                "🚀 Create Free Account"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
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
                Signing in with Google…
              </>
            ) : (
              <>
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign up with Google
              </>
            )}
          </button>

          {/* Sign in link */}
          <p className="text-center text-sm text-slate-500 mt-7">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-amber-600 font-semibold hover:text-amber-700 transition-colors"
            >
              Sign In →
            </Link>
          </p>
        </div>
      </div>

      {/* ── Right Panel — Brand Image ─────────────── */}
      <div className="hidden lg:flex lg:w-[48%] flex-col justify-between relative overflow-hidden">

        {/* Campus photo */}
        <img
          src={images.moreStudents}
          alt="Students"
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-slate-900/65 to-slate-900/85" />

        {/* Dot texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Amber glow */}
        <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[90px] pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between h-full p-12">

          {/* Top logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-400 flex items-center justify-center shadow-[0_4px_16px_rgba(245,158,11,0.45)]">
              <GraduationCap className="w-5 h-5 text-slate-900" />
            </div>
            <span className="font-serif text-2xl font-semibold text-white">
              Edu<span className="text-amber-400">Reach</span>
            </span>
          </div>

          {/* Centre — perks */}
          <div className="max-w-sm">
            <div className="flex items-center gap-2 mb-5">
              <span className="block w-6 h-px bg-amber-500" />
              <span className="font-mono text-[10px] tracking-widest uppercase text-amber-500">
                Why Join Us
              </span>
            </div>
            <h2 className="font-serif text-white text-[2rem] font-bold leading-tight mb-8">
              Join EduReach &amp; <br />
              <em className="text-amber-400 not-italic">Unlock Your Future</em>
            </h2>

            <ul className="flex flex-col gap-5">
              {[
                { icon: "💼", title: "92% Placement Rate",   desc: "Top recruiters: Google, Microsoft, Amazon & 500+ more." },
                { icon: "🏛️", title: "25-Acre Smart Campus", desc: "Labs, hostels, sports complex & green spaces." },
                { icon: "🤖", title: "AI Counselor Access",  desc: "Unlimited AI chat and live counselor call booking." },
                { icon: "🎓", title: "NAAC A+ Accredited",   desc: "Ranked #1 private engineering college in Telangana." },
              ].map((perk) => (
                <li key={perk.title} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/6 border border-white/10 flex items-center justify-center text-lg shrink-0">
                    {perk.icon}
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold mb-0.5">{perk.title}</div>
                    <div className="text-slate-400 text-xs leading-relaxed">{perk.desc}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom stats */}
          <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10">
            {[
              { value: "92%",  label: "Placement" },
              { value: "500+", label: "Recruiters" },
              { value: "Free", label: "To Join" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-serif text-2xl font-bold text-amber-400 leading-none">{s.value}</div>
                <div className="text-slate-500 text-[10px] font-mono uppercase tracking-widest mt-1.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}