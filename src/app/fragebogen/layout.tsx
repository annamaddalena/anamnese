import type { ReactNode } from "react";
import { QuestionnaireProvider } from "@/context/QuestionnaireContext";

export default function FragebogenLayout({ children }: { children: ReactNode }) {
  return <QuestionnaireProvider>{children}</QuestionnaireProvider>;
}
