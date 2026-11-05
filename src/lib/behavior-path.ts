import { getArrayAnswer } from "@/lib/answers";
import { BASE_TRAINING_OPTION, type AnswersRecord } from "@/types/questionnaire";

/** v2–v7, t4 sichtbar wenn v1 nicht nur Basistraining */
export function isBehaviorDetailPath(answers: AnswersRecord): boolean {
  const selected = getArrayAnswer(answers, "v1");
  if (selected.length === 0) {
    return false;
  }
  if (selected.length === 1 && selected[0] === BASE_TRAINING_OPTION) {
    return false;
  }
  return true;
}

export function shouldShowV8Field(answers: AnswersRecord): boolean {
  const v1 = getArrayAnswer(answers, "v1");
  if (v1.includes("Aggression gegenüber Hunden")) {
    return true;
  }
  if (v1.includes("Aggression gegenüber Menschen")) {
    return true;
  }
  if (v1.includes("Ressourcenverteidigung")) {
    return true;
  }
  return false;
}

export function applyDerivedAnswers(answers: AnswersRecord): AnswersRecord {
  const next = { ...answers };
  if (!shouldShowV8Field(next)) {
    next.v8 = "Nein";
    delete next.v8_details;
  }
  return next;
}
