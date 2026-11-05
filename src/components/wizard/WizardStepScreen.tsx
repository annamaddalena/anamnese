"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FieldRenderer } from "@/components/fields/FieldRenderer";
import { PageContainer } from "@/components/layout/PageContainer";
import { getSectionByIndex, getSectionIndex } from "@/config/questionnaire";
import { useQuestionnaire } from "@/context/QuestionnaireContext";
import {
  hasValidationErrors,
  validateSection,
} from "@/lib/validation";
import {
  getNextSectionSlug,
  getPrevSectionSlug,
  overviewPath,
  sectionPath,
} from "@/lib/wizard-navigation";
import type { SectionConfig } from "@/types/questionnaire";
import { ProgressSteps } from "./ProgressSteps";
import { ResetQuestionnaireButton } from "./ResetQuestionnaireButton";
import { SectionIntro } from "./SectionIntro";
import { WizardNav } from "./WizardNav";

type WizardStepScreenProps = {
  section: SectionConfig;
};

export function WizardStepScreen({ section }: WizardStepScreenProps) {
  const router = useRouter();
  const { hydrated, answers, maxStepIndex, setFieldValue, registerStepVisit } =
    useQuestionnaire();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const stepIndex = getSectionIndex(section.slug);
  const headingId = `section-heading-${section.slug}`;
  const stepNumber = stepIndex + 1;

  useEffect(() => {
    registerStepVisit(stepIndex);
  }, [registerStepVisit, stepIndex]);

  useEffect(() => {
    if (!hydrated || stepIndex <= maxStepIndex) {
      return;
    }
    const allowed = getSectionByIndex(maxStepIndex);
    if (allowed) {
      router.replace(sectionPath(allowed.slug));
    }
  }, [hydrated, maxStepIndex, router, stepIndex]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const heading = document.getElementById(headingId);
    heading?.focus({ preventScroll: true });
  }, [section.slug, headingId]);

  useEffect(() => {
    setErrors({});
  }, [section.slug]);

  const prevSlug = getPrevSectionSlug(section.slug);
  const backHref = prevSlug ? sectionPath(prevSlug) : null;
  const isLastStep = stepIndex === 4;
  function handleNext() {
    const nextErrors = validateSection(section, answers);
    setErrors(nextErrors);
    if (hasValidationErrors(nextErrors)) {
      const firstId = Object.keys(nextErrors)[0];
      document.getElementById(firstId)?.focus();
      return;
    }

    if (isLastStep) {
      router.push(overviewPath());
      return;
    }
    const nextSlug = getNextSectionSlug(section.slug);
    if (nextSlug) {
      router.push(sectionPath(nextSlug));
    }
  }

  return (
    <main className="flex flex-1 flex-col">
      <PageContainer>
        <div className="mb-6 flex justify-end">
          <ResetQuestionnaireButton />
        </div>

        <ProgressSteps
          currentSlug={section.slug}
          maxStepIndex={maxStepIndex}
          variant="mobile"
        />

        <div className="mt-6 lg:mt-0 lg:flex lg:min-h-[32rem]">
          <aside className="hidden lg:block lg:w-80 xl:w-80 lg:shrink-0 lg:border-r lg:border-warm-cream lg:pr-10">
            <ProgressSteps
              currentSlug={section.slug}
              maxStepIndex={maxStepIndex}
              variant="desktop"
            />
          </aside>

          <div className="min-w-0 flex-1 lg:pl-10 xl:pl-12">
            <SectionIntro
              stepLabel={`Schritt ${stepNumber} von 5`}
              title={section.title}
              intro={section.intro}
              headingId={headingId}
            />

            {!hydrated ? (
              <p className="text-sm text-earth-brown/70">
                Formular wird geladen …
              </p>
            ) : (
              <div className="mt-6 max-w-3xl space-y-8">
                {section.fields.map((field) => (
                  <FieldRenderer
                    key={field.id}
                    field={field}
                    answers={answers}
                    errors={errors}
                    onChange={setFieldValue}
                  />
                ))}
              </div>
            )}

            <WizardNav
              backHref={backHref}
              nextLabel={isLastStep ? "Zur Übersicht" : "Weiter"}
              onNext={handleNext}
            />
          </div>
        </div>
      </PageContainer>
    </main>
  );
}
