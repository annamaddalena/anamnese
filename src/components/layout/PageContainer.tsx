import type { ReactNode } from "react";

type PageContainerProps = {
  children: ReactNode;
  className?: string;
  width?: "narrow" | "wide";
};

export function PageContainer({
  children,
  className = "",
  width = "wide",
}: PageContainerProps) {
  const maxClass = width === "narrow" ? "max-w-content" : "max-w-layout";

  return (
    <div
      className={`mx-auto w-full ${maxClass} px-4 py-8 sm:px-6 sm:py-10 lg:px-10 ${className}`}
    >
      {children}
    </div>
  );
}
