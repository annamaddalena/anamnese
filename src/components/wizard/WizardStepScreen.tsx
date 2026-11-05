"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { PageContainer } from "@/components/layout/PageContainer";
import { getSectionByIndex, getSectionIndex } from "@/config/questionnaire";
import { useQuestionnaire } from "@/context/QuestionnaireContext";
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
  const { hydrated, answers, maxStepIndex, setAnswer, registerStepVisit } =
    useQuestionnaire();
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

  const prevSlug = getPrevSectionSlug(section.slug);
  const nextSlug = getNextSectionSlug(section.slug);
  const backHref = prevSlug ? sectionPath(prevSlug) : null;
  const nextHref = nextSlug ? sectionPath(nextSlug) : overviewPath();
  const isLastStep = stepIndex === 4;

  const fieldValue = answers[section.placeholderFieldId] ?? "";

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
              <div className="mt-6 max-w-3xl space-y-2">
                <label
                  htmlFor={section.placeholderFieldId}
                  className="block text-sm font-medium text-earth-brown"
                >
                  {section.placeholderLabel}
                </label>
                <input
                  id={section.placeholderFieldId}
                  type="text"
                  value={fieldValue}
                  onChange={(e) =>
                    setAnswer(section.placeholderFieldId, e.target.value)
                  }
                  className="w-full rounded-xl border border-warm-cream bg-pure-white px-4 py-3 text-earth-brown placeholder:text-earth-brown/40 focus-visible:border-deep-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-forest/20"
                  placeholder="Platzhalter bis Schritt 3"
                />
                <p className="text-sm text-earth-brown/70">
                  Echte Fragen kommen im nächsten Schritt. Deine Eingaben
                  werden automatisch auf diesem Gerät gespeichert.
                </p>
              </div>
            )}

            <WizardNav
              backHref={backHref}
              nextHref={isLastStep ? overviewPath() : nextHref}
              nextLabel={isLastStep ? "Zur Übersicht" : "Weiter"}
            />
          </div>
        </div>
      </PageContainer>
    </main>
  );
}
