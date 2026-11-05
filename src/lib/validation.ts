import { getArrayAnswer, getStringAnswer } from "@/lib/answers";
import { isValidationRequired, DEMO_MODE } from "@/config/app";
import { applyHundNameIfEnabled } from "@/lib/placeholders";
import { validateBehaviorDetails } from "@/lib/behavior-details";
import { isFieldVisible } from "@/lib/showIf";
import type { FieldDef, SectionConfig } from "@/types/questionnaire";
import type { AnswersRecord } from "@/types/questionnaire";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function fieldLabel(field: FieldDef, answers: AnswersRecord): string {
  return applyHundNameIfEnabled(
    field.label,
    answers,
    field.hundNameInText !== false,
  );
}

function validateField(
  field: FieldDef,
  answers: AnswersRecord,
): string | null {
  if (!isFieldVisible(field, answers)) {
    return null;
  }

  const required = isValidationRequired(field.required);

  switch (field.type) {
    case "behavior_details":
      return null;
    case "checkbox_group": {
      const selected = getArrayAnswer(answers, field.id);
      if (required && selected.length === 0) {
        return `Bitte wähle mindestens eine Option bei «${fieldLabel(field, answers)}».`;
      }
      return null;
    }
    case "email": {
      const value = getStringAnswer(answers, field.id).trim();
      if (required && !value) {
        return "Bitte gib deine E-Mail-Adresse ein.";
      }
      if (value && !EMAIL_PATTERN.test(value)) {
        return "Bitte gib eine gültige E-Mail-Adresse ein.";
      }
      return null;
    }
    case "tel": {
      const value = getStringAnswer(answers, field.id).trim();
      if (!value) {
        return null;
      }
      const normalized = value.replace(/[\s\-().]/g, "");
      if (!/^(\+41|0)\d{8,11}$/.test(normalized)) {
        return "Bitte gib eine gültige Telefonnummer ein (z. B. +41 … oder 07…).";
      }
      return null;
    }
    case "textarea":
    case "text":
    case "number":
    case "radio":
    case "select":
    case "scale": {
      const value = getStringAnswer(answers, field.id).trim();
      if (required && !value) {
        const label = fieldLabel(field, answers);
        if (field.type === "select" || field.type === "radio") {
          return `Bitte wähle eine Option bei «${label}».`;
        }
        return `Bitte fülle «${label}» aus.`;
      }
      if (
        !DEMO_MODE &&
        field.type === "textarea" &&
        field.minLength &&
        value.length > 0 &&
        value.length < field.minLength
      ) {
        return `Bitte schreib mindestens ${field.minLength} Zeichen.`;
      }
      if (field.type === "number" && value) {
        const normalized = value.replace(",", ".");
        if (field.maxDecimals === 1 && !/^\d+(?:\.\d)?$/.test(normalized)) {
          return "Bitte gib eine Zahl mit höchstens einer Dezimalstelle ein.";
        }
        const n = Number(normalized);
        if (Number.isNaN(n)) {
          return "Bitte gib eine gültige Zahl ein.";
        }
        if (field.min !== undefined && n < field.min) {
          return `Bitte gib mindestens ${field.min} ein.`;
        }
        if (field.max !== undefined && n > field.max) {
          return `Bitte gib höchstens ${field.max} ein.`;
        }
      }
      return null;
    }
    default:
      return null;
  }
}

export function validateSection(
  section: SectionConfig,
  answers: AnswersRecord,
): Record<string, string> {
  if (DEMO_MODE) {
    return {};
  }

  const errors: Record<string, string> = {};

  for (const field of section.fields) {
    const message = validateField(field, answers);
    if (message) {
      errors[field.id] = message;
    }
  }

  if (section.slug === "verhalten") {
    Object.assign(errors, validateBehaviorDetails(answers));
  }

  return errors;
}

export function hasValidationErrors(errors: Record<string, string>): boolean {
  return Object.keys(errors).length > 0;
}
