"use client";

import { isValidationRequired } from "@/config/app";
import { getStringAnswer } from "@/lib/answers";
import { getActiveBehaviorBlocks } from "@/lib/behavior-details";
import { applyHundName } from "@/lib/placeholders";
import { behaviorFieldId } from "@/config/behavior-details";
import type { AnswerValue, AnswersRecord } from "@/types/questionnaire";
import {
  errorClassName,
  fieldWrapClassName,
  helpClassName,
  inputClassName,
  labelClassName,
} from "./field-styles";

type BehaviorDetailsFieldProps = {
  answers: AnswersRecord;
  errors: Record<string, string>;
  onChange: (fieldId: string, value: AnswerValue) => void;
};

export function BehaviorDetailsField({
  answers,
  errors,
  onChange,
}: BehaviorDetailsFieldProps) {
  const blocks = getActiveBehaviorBlocks(answers);

  if (blocks.length === 0) {
    return null;
  }

  return (
    <div className="space-y-10">
      <p className="text-sm text-earth-brown/80">
        Beantworte die Fragen für jedes angekreuzte Thema. So kann ich
        verstehen, was bei euch im Alltag passiert.
      </p>
      {blocks.map((block) => {
        const describeId = behaviorFieldId(block.slug, "describe");
        const triggersId = behaviorFieldId(block.slug, "triggers");
        const reactionsId = behaviorFieldId(block.slug, "reactions");
        const intensityId = behaviorFieldId(block.slug, "intensity");
        const intensityStored = getStringAnswer(answers, intensityId);
        const sliderValue = intensityStored || "3";

        return (
          <section
            key={block.slug}
            className="space-y-5 border-t border-warm-cream pt-8 first:border-t-0 first:pt-0"
          >
            <h2 className="text-lg font-semibold text-deep-forest">
              {block.title}
            </h2>

            <div className={fieldWrapClassName}>
              <label htmlFor={describeId} className={labelClassName}>
                Was passiert? Wann, wo und wie?
                {isValidationRequired(true) ? (
                  <span className="text-earth-brown/60"> *</span>
                ) : null}
              </label>
              <textarea
                id={describeId}
                rows={4}
                value={getStringAnswer(answers, describeId)}
                onChange={(e) => onChange(describeId, e.target.value)}
                className={`${inputClassName} min-h-[6rem] resize-y`}
                placeholder={applyHundName(
                  "Beschreibe eine typische Situation so konkret du kannst.",
                  answers,
                )}
              />
              {errors[describeId] ? (
                <p className={errorClassName}>{errors[describeId]}</p>
              ) : null}
            </div>

            {!block.skipTriggers ? (
              <div className={fieldWrapClassName}>
                <label htmlFor={triggersId} className={labelClassName}>
                  Was löst das typischerweise aus?
                  {isValidationRequired(true) ? (
                  <span className="text-earth-brown/60"> *</span>
                ) : null}
                </label>
                <textarea
                  id={triggersId}
                  rows={3}
                  value={getStringAnswer(answers, triggersId)}
                  onChange={(e) => onChange(triggersId, e.target.value)}
                  className={`${inputClassName} min-h-[5rem] resize-y`}
                  placeholder="z. B. andere Hunde, Velos, Türklingeln — oder «weiss ich nicht»"
                />
                {errors[triggersId] ? (
                  <p className={errorClassName}>{errors[triggersId]}</p>
                ) : null}
              </div>
            ) : null}

            {!block.skipReactions ? (
              <div className={fieldWrapClassName}>
                <label htmlFor={reactionsId} className={labelClassName}>
                  Wie reagiert {applyHundName("{hund_name}", answers)}?
                  {isValidationRequired(true) ? (
                  <span className="text-earth-brown/60"> *</span>
                ) : null}
                </label>
                <textarea
                  id={reactionsId}
                  rows={3}
                  value={getStringAnswer(answers, reactionsId)}
                  onChange={(e) => onChange(reactionsId, e.target.value)}
                  className={`${inputClassName} min-h-[5rem] resize-y`}
                  placeholder="z. B. Bellen, Knurren, Erstarren, Flucht — frei in eigenen Worten"
                />
                {errors[reactionsId] ? (
                  <p className={errorClassName}>{errors[reactionsId]}</p>
                ) : null}
              </div>
            ) : null}

            <div className={fieldWrapClassName}>
              <label htmlFor={intensityId} className={labelClassName}>
                Intensität
                {isValidationRequired(true) ? (
                  <span className="text-earth-brown/60"> *</span>
                ) : null}
              </label>
              <p className={helpClassName}>
                1 = leicht ablenkbar · 5 = kaum erreichbar
              </p>
              <div className="flex items-center gap-4 pt-1">
                <span className="text-sm font-medium text-earth-brown/70">
                  1
                </span>
                <input
                  id={intensityId}
                  type="range"
                  min={1}
                  max={5}
                  step={1}
                  value={sliderValue}
                  onChange={(e) => onChange(intensityId, e.target.value)}
                  className="h-2 flex-1 cursor-pointer appearance-none rounded-full bg-warm-cream accent-deep-forest [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-deep-forest [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-deep-forest"
                />
                <span className="text-sm font-medium text-earth-brown/70">
                  5
                </span>
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-warm-cream/50 text-sm font-semibold text-deep-forest"
                  aria-live="polite"
                >
                  {sliderValue}
                </span>
              </div>
              {errors[intensityId] ? (
                <p className={errorClassName}>{errors[intensityId]}</p>
              ) : null}
            </div>
          </section>
        );
      })}
    </div>
  );
}
