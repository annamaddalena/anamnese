import { getArrayAnswer, getStringAnswer } from "@/lib/answers";
import { isBehaviorDetailPath, shouldShowV8Field } from "@/lib/behavior-path";
import type { FieldDef, ShowIfCondition } from "@/types/questionnaire";
import type { AnswersRecord } from "@/types/questionnaire";

export function evaluateShowIf(
  condition: ShowIfCondition | undefined,
  answers: AnswersRecord,
): boolean {
  if (!condition) {
    return true;
  }

  if ("behaviorDetailPath" in condition) {
    return isBehaviorDetailPath(answers);
  }

  if ("v8Visible" in condition) {
    return shouldShowV8Field(answers);
  }

  if ("equals" in condition) {
    return getStringAnswer(answers, condition.field) === condition.equals;
  }

  if ("notEquals" in condition) {
    return getStringAnswer(answers, condition.field) !== condition.notEquals;
  }

  if ("in" in condition) {
    return condition.in.includes(getStringAnswer(answers, condition.field));
  }

  if ("includes" in condition) {
    return getArrayAnswer(answers, condition.field).includes(condition.includes);
  }

  if ("includesAny" in condition) {
    const selected = getArrayAnswer(answers, condition.field);
    return condition.includesAny.some((opt) => selected.includes(opt));
  }

  return true;
}

export function isFieldVisible(
  field: FieldDef,
  answers: AnswersRecord,
): boolean {
  return evaluateShowIf(field.showIf, answers);
}

export function getVisibleFields(
  fields: FieldDef[],
  answers: AnswersRecord,
): FieldDef[] {
  return fields.filter((field) => isFieldVisible(field, answers));
}
