import type { AnswerValue, AnswersRecord } from "@/types/questionnaire";

export function getStringAnswer(
  answers: AnswersRecord,
  fieldId: string,
): string {
  const value = answers[fieldId];
  if (Array.isArray(value)) {
    return value.join(", ");
  }
  return typeof value === "string" ? value : "";
}

export function getArrayAnswer(
  answers: AnswersRecord,
  fieldId: string,
): string[] {
  const value = answers[fieldId];
  if (Array.isArray(value)) {
    return value;
  }
  if (typeof value === "string" && value.length > 0) {
    return [value];
  }
  return [];
}

export function isEmptyAnswer(value: AnswerValue | undefined): boolean {
  if (value === undefined) {
    return true;
  }
  if (Array.isArray(value)) {
    return value.length === 0;
  }
  return value.trim().length === 0;
}
