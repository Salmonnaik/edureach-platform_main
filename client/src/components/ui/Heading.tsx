import type { ReactNode } from "react";

interface HeadingProps {
  children: ReactNode;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  gradient?: boolean;
  center?: boolean;
}

export default function Heading({ 
  children, 
  level, 
  className = "", 
  gradient = false,
  center = false
}: HeadingProps) {
  const baseClasses = `
    font-bold tracking-tight
    ${center ? 'text-center' : ''}
    ${className}
  `;

  const gradientClasses = gradient 
    ? "bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent"
    : "text-gray-900";

  const sizes = {
    1: "text-4xl md:text-6xl lg:text-7xl",
    2: "text-3xl md:text-5xl lg:text-6xl",
    3: "text-2xl md:text-4xl lg:text-5xl",
    4: "text-xl md:text-3xl lg:text-4xl",
    5: "text-lg md:text-2xl lg:text-3xl",
    6: "text-base md:text-xl lg:text-2xl"
  };

  const combinedClasses = `${baseClasses} ${gradientClasses} ${sizes[level]}`;

  const renderHeading = () => {
    switch (level) {
      case 1:
        return <h1 className={combinedClasses}>{children}</h1>;
      case 2:
        return <h2 className={combinedClasses}>{children}</h2>;
      case 3:
        return <h3 className={combinedClasses}>{children}</h3>;
      case 4:
        return <h4 className={combinedClasses}>{children}</h4>;
      case 5:
        return <h5 className={combinedClasses}>{children}</h5>;
      case 6:
        return <h6 className={combinedClasses}>{children}</h6>;
      default:
        return <h2 className={combinedClasses}>{children}</h2>;
    }
  };

  return (
    <div>
      {renderHeading()}
    </div>
  );
}
