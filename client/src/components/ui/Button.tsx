import type { ReactNode } from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  className = "",
  onClick,
  type = "button",
}: ButtonProps) {

  const variants: Record<string, string> = {
    // Gold gradient — main CTA
    primary: [
      "bg-gradient-to-r from-amber-500 to-amber-400",
      "text-slate-900 font-bold",
      "shadow-[0_8px_24px_rgba(245,158,11,0.35)]",
      "hover:shadow-[0_12px_36px_rgba(245,158,11,0.55)]",
      "hover:from-amber-400 hover:to-amber-300",
      "focus:ring-amber-400",
    ].join(" "),

    // Dark navy — secondary solid
    secondary: [
      "bg-slate-900 text-white",
      "border border-slate-700",
      "hover:bg-slate-800 hover:border-amber-500/40",
      "shadow-[0_4px_16px_rgba(15,23,42,0.2)]",
      "hover:shadow-[0_8px_24px_rgba(15,23,42,0.35)]",
      "focus:ring-slate-500",
    ].join(" "),

    // Gold-bordered outline
    outline: [
      "bg-transparent text-amber-600",
      "border-2 border-amber-500",
      "hover:bg-amber-500 hover:text-slate-900",
      "focus:ring-amber-400",
    ].join(" "),

    // Subtle ghost
    ghost: [
      "bg-transparent text-slate-600",
      "hover:bg-slate-100 hover:text-slate-900",
      "focus:ring-slate-300",
    ].join(" "),
  };

  const sizes: Record<string, string> = {
    sm: "px-5 py-2.5 text-sm gap-1.5",
    md: "px-7 py-3.5 text-[0.9375rem] gap-2",
    lg: "px-9 py-4 text-base gap-2.5",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={[
        // Base
        "relative inline-flex items-center justify-center",
        "font-semibold rounded-full",
        "transition-all duration-300 ease-out",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
        "select-none overflow-hidden",
        // Variant + size
        variants[variant],
        sizes[size],
        className,
      ].join(" ")}
    >
      {/* Shimmer layer — primary only */}
      {variant === "primary" && !disabled && !loading && (
        <span
          aria-hidden
          className="absolute inset-0 -translate-x-full hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
        />
      )}

      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      ) : null}

      {children}
    </button>
  );
}