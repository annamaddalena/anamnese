import { getStringAnswer } from "@/lib/answers";
import type { AnswersRecord } from "@/types/questionnaire";

export function getHundName(answers: AnswersRecord): string {
  const name = getStringAnswer(answers, "a5").trim();
  return name || "dein Hund";
}

export function applyHundName(text: string, answers: AnswersRecord): string {
  return text.replaceAll("{hund_name}", getHundName(answers));
}

export function applyHundNameIfEnabled(
  text: string,
  answers: AnswersRecord,
  enabled: boolean | undefined,
): string {
  if (enabled === false) {
    return text;
  }
  return applyHundName(text, answers);
}
