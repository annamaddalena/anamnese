import { getArrayAnswer, getStringAnswer, isEmptyAnswer } from "@/lib/answers";
import { applyHundNameIfEnabled } from "@/lib/placeholders";
import { isFieldVisible } from "@/lib/showIf";
import type { FieldDef } from "@/types/questionnaire";
import type { AnswersRecord } from "@/types/questionnaire";

export function formatFieldAnswer(
  field: FieldDef,
  answers: AnswersRecord,
): string | null {
  if (!isFieldVisible(field, answers)) {
    return null;
  }

  if (field.type === "behavior_details") {
    return null;
  }

  if (field.type === "number" && field.id === "a6") {
    const value = getStringAnswer(answers, field.id).trim();
    return value ? `${value} Jahre` : null;
  }

  if (field.type === "checkbox_group") {
    const values = getArrayAnswer(answers, field.id);
    if (values.length === 0) {
      return null;
    }
    return values
      .map((v) =>
        applyHundNameIfEnabled(v, answers, field.hundNameInText !== false),
      )
      .join(", ");
  }

  const value = getStringAnswer(answers, field.id).trim();
  if (isEmptyAnswer(value)) {
    return null;
  }

  if (field.type === "scale") {
    return value;
  }

  return value;
}

export function formatFieldLabel(field: FieldDef, answers: AnswersRecord): string {
  return applyHundNameIfEnabled(
    field.label,
    answers,
    field.hundNameInText !== false,
  );
}
