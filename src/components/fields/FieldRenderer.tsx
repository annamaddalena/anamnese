"use client";

import type { ReactNode } from "react";
import { isValidationRequired } from "@/config/app";
import { getArrayAnswer, getStringAnswer } from "@/lib/answers";
import { applyHundNameIfEnabled } from "@/lib/placeholders";
import { isFieldVisible } from "@/lib/showIf";
import type { FieldDef } from "@/types/questionnaire";
import type { AnswerValue, AnswersRecord } from "@/types/questionnaire";
import { BehaviorDetailsField } from "./BehaviorDetailsField";
import {
  errorClassName,
  fieldWrapClassName,
  helpClassName,
  inputClassName,
  labelClassName,
  selectClassName,
  selectWrapClassName,
} from "./field-styles";

type FieldRendererProps = {
  field: FieldDef;
  answers: AnswersRecord;
  errors: Record<string, string>;
  onChange: (fieldId: string, value: AnswerValue) => void;
};

function resolveOptionLabel(
  label: string,
  answers: AnswersRecord,
  hundNameInText: boolean | undefined,
): string {
  return applyHundNameIfEnabled(label, answers, hundNameInText !== false);
}

export function FieldRenderer({
  field,
  answers,
  errors,
  onChange,
}: FieldRendererProps) {
  if (!isFieldVisible(field, answers)) {
    return null;
  }

  const label = resolveOptionLabel(
    field.label,
    answers,
    field.hundNameInText,
  );
  const error = errors[field.id];
  const helpText = field.helpText
    ? resolveOptionLabel(field.helpText, answers, field.hundNameInText)
    : undefined;

  const wrap = (id: string, control: ReactNode) => (
    <div className={fieldWrapClassName}>
      <label htmlFor={id} className={labelClassName}>
        {label}
        {isValidationRequired(field.required) ? (
          <span className="text-earth-brown/60"> *</span>
        ) : null}
      </label>
      {helpText ? <p className={helpClassName}>{helpText}</p> : null}
      {control}
      {error ? <p className={errorClassName}>{error}</p> : null}
    </div>
  );

  switch (field.type) {
    case "text":
    case "email":
    case "tel":
      return wrap(
        field.id,
        <input
          id={field.id}
          type={field.type}
          value={getStringAnswer(answers, field.id)}
          autoComplete={field.autoComplete}
          onChange={(e) => onChange(field.id, e.target.value)}
          className={inputClassName}
          placeholder={
            field.placeholder
              ? resolveOptionLabel(
                  field.placeholder,
                  answers,
                  field.hundNameInText,
                )
              : undefined
          }
        />,
      );

    case "textarea":
      return wrap(
        field.id,
        <textarea
          id={field.id}
          rows={4}
          value={getStringAnswer(answers, field.id)}
          onChange={(e) => onChange(field.id, e.target.value)}
          className={`${inputClassName} min-h-[6rem] resize-y`}
          placeholder={
            field.placeholder
              ? resolveOptionLabel(
                  field.placeholder,
                  answers,
                  field.hundNameInText,
                )
              : undefined
          }
        />,
      );

    case "number":
      return wrap(
        field.id,
        <input
          id={field.id}
          type="number"
          inputMode={field.step && field.step < 1 ? "decimal" : "numeric"}
          min={field.min}
          max={field.max}
          step={field.step ?? 1}
          value={getStringAnswer(answers, field.id)}
          onChange={(e) => onChange(field.id, e.target.value)}
          className={inputClassName}
          placeholder={field.placeholder}
        />,
      );

    case "radio":
      return (
        <fieldset className={fieldWrapClassName}>
          <legend className={labelClassName}>
            {label}
            {isValidationRequired(field.required) ? (
              <span className="text-earth-brown/60"> *</span>
            ) : null}
          </legend>
          {helpText ? <p className={helpClassName}>{helpText}</p> : null}
          <div className="space-y-2">
            {field.options.map((option) => {
              const optionLabel = resolveOptionLabel(
                option.label,
                answers,
                field.hundNameInText,
              );
              return (
                <label
                  key={option.value}
                  className="flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border border-warm-cream px-4 py-2 has-[:checked]:border-deep-forest has-[:checked]:bg-warm-cream/25"
                >
                  <input
                    type="radio"
                    name={field.id}
                    value={option.value}
                    checked={getStringAnswer(answers, field.id) === option.value}
                    onChange={() => onChange(field.id, option.value)}
                    className="h-4 w-4 accent-deep-forest"
                  />
                  <span className="text-sm text-earth-brown">{optionLabel}</span>
                </label>
              );
            })}
          </div>
          {error ? <p className={errorClassName}>{error}</p> : null}
        </fieldset>
      );

    case "select":
      return (
        <div className={fieldWrapClassName}>
          <label htmlFor={field.id} className={labelClassName}>
            {label}
            {isValidationRequired(field.required) ? (
              <span className="text-earth-brown/60"> *</span>
            ) : null}
          </label>
          {helpText ? <p className={helpClassName}>{helpText}</p> : null}
          <div className={selectWrapClassName}>
            <select
              id={field.id}
              value={getStringAnswer(answers, field.id)}
              onChange={(e) => onChange(field.id, e.target.value)}
              className={selectClassName}
            >
              {field.placeholderOption ? (
                <option value="">{field.placeholderOption}</option>
              ) : null}
              {field.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {resolveOptionLabel(
                    option.label,
                    answers,
                    field.hundNameInText,
                  )}
                </option>
              ))}
            </select>
            <span
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-earth-brown/50"
              aria-hidden
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M4 6l4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
          {error ? <p className={errorClassName}>{error}</p> : null}
        </div>
      );

    case "checkbox_group": {
      const selected = getArrayAnswer(answers, field.id);
      const exclusiveList = field.exclusiveOptions ?? [];

      function toggleOption(optionValue: string) {
        const isExclusive = exclusiveList.includes(optionValue);

        if (isExclusive) {
          onChange(
            field.id,
            selected.includes(optionValue) ? [] : [optionValue],
          );
          return;
        }

        let next = selected.filter((v) => !exclusiveList.includes(v));
        if (next.includes(optionValue)) {
          next = next.filter((v) => v !== optionValue);
        } else {
          next = [...next, optionValue];
        }
        onChange(field.id, next);
      }

      return (
        <fieldset className={fieldWrapClassName}>
          <legend className={labelClassName}>
            {label}
            {isValidationRequired(field.required) ? (
              <span className="text-earth-brown/60"> *</span>
            ) : null}
          </legend>
          {helpText ? <p className={helpClassName}>{helpText}</p> : null}
          <div className="space-y-2">
            {field.options.map((option) => {
              const optionLabel = resolveOptionLabel(
                option.label,
                answers,
                field.hundNameInText,
              );
              const checked = selected.includes(option.value);
              return (
                <label
                  key={option.value}
                  className="flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border border-warm-cream px-4 py-2 has-[:checked]:border-deep-forest has-[:checked]:bg-warm-cream/25"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleOption(option.value)}
                    className="h-4 w-4 rounded accent-deep-forest"
                  />
                  <span className="text-sm text-earth-brown">{optionLabel}</span>
                </label>
              );
            })}
          </div>
          {error ? <p className={errorClassName}>{error}</p> : null}
        </fieldset>
      );
    }

    case "scale":
      return (
        <fieldset className={fieldWrapClassName}>
          <legend className={labelClassName}>
            {label}
            {isValidationRequired(field.required) ? (
              <span className="text-earth-brown/60"> *</span>
            ) : null}
          </legend>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: field.max - field.min + 1 }, (_, i) => {
              const value = String(field.min + i);
              return (
                <label
                  key={value}
                  className="flex min-h-11 min-w-[2.75rem] cursor-pointer items-center justify-center rounded-xl border border-warm-cream px-3 has-[:checked]:border-deep-forest has-[:checked]:bg-warm-cream/25"
                >
                  <input
                    type="radio"
                    name={field.id}
                    value={value}
                    checked={getStringAnswer(answers, field.id) === value}
                    onChange={() => onChange(field.id, value)}
                    className="sr-only"
                  />
                  <span className="text-sm font-medium text-deep-forest">
                    {value}
                  </span>
                </label>
              );
            })}
          </div>
          <div className="mt-2 flex justify-between gap-4 text-xs text-earth-brown/70">
            <span>
              {field.min} ={" "}
              {resolveOptionLabel(field.minLabel, answers, field.hundNameInText)}
            </span>
            <span className="text-right">
              {field.max} ={" "}
              {resolveOptionLabel(field.maxLabel, answers, field.hundNameInText)}
            </span>
          </div>
          {error ? <p className={errorClassName}>{error}</p> : null}
        </fieldset>
      );

    case "behavior_details":
      return (
        <BehaviorDetailsField
          answers={answers}
          errors={errors}
          onChange={onChange}
        />
      );

    default:
      return null;
  }
}
