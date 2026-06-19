import type { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
  background?: "white" | "gray" | "gradient";
}

export default function SectionWrapper({ 
  children, 
  className = "", 
  id,
  background = "white" 
}: SectionWrapperProps) {
  const backgrounds = {
    white: "bg-white",
    gray: "bg-gray-50",
    gradient: "bg-gradient-to-br from-indigo-50 via-white to-purple-50"
  };

  return (
    <section 
      id={id}
      className={`w-full py-16 px-6 ${backgrounds[background]} ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  );
}
