import { redirect } from "next/navigation";
import { getSectionBySlug, isSectionSlug } from "@/config/questionnaire";
import { WizardStepScreen } from "@/components/wizard/WizardStepScreen";
import type { SectionSlug } from "@/types/questionnaire";

type PageProps = {
  params: Promise<{ schritt: string }>;
};

export function generateStaticParams() {
  return [
    { schritt: "allgemein" },
    { schritt: "gesundheit" },
    { schritt: "alltag" },
    { schritt: "verhalten" },
    { schritt: "training" },
  ];
}

export default async function FragebogenStepPage({ params }: PageProps) {
  const { schritt } = await params;

  if (!isSectionSlug(schritt)) {
    redirect("/fragebogen/allgemein");
  }

  const section = getSectionBySlug(schritt as SectionSlug);
  return <WizardStepScreen section={section} />;
}
