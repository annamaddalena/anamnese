import { getStringAnswer } from "@/lib/answers";
import { DEMO_MODE } from "@/config/app";
import type { AnswersRecord } from "@/types/questionnaire";

export function validateOverview(answers: AnswersRecord): Record<string, string> {
  const errors: Record<string, string> = {};

  if (DEMO_MODE) {
    return errors;
  }

  if (getStringAnswer(answers, "consent") !== "yes") {
    errors.consent =
      "Bitte bestätige die Einwilligung, bevor du das PDF erstellst.";
  }

  return errors;
}
