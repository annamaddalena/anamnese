"use client";

import { useRouter } from "next/navigation";
import { useQuestionnaire } from "@/context/QuestionnaireContext";
import { sectionPath } from "@/lib/wizard-navigation";

export function ResetQuestionnaireButton() {
  const router = useRouter();
  const { resetQuestionnaire } = useQuestionnaire();

  function handleReset() {
    const confirmed = window.confirm(
      "Möchtest du wirklich neu beginnen? Alle bisherigen Eingaben auf diesem Gerät werden gelöscht.",
    );
    if (!confirmed) {
      return;
    }
    resetQuestionnaire();
    router.push(sectionPath("allgemein"));
  }

  return (
    <button
      type="button"
      onClick={handleReset}
      className="text-sm font-medium text-earth-brown/80 underline-offset-2 hover:text-deep-forest hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep-forest"
    >
      Neu beginnen
    </button>
  );
}
