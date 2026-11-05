"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { ReviewSectionsList } from "@/components/review/ReviewSectionsList";
import { isValidationRequired } from "@/config/app";
import { siteConfig } from "@/config/site";
import { getSectionByIndex } from "@/config/questionnaire";
import { useQuestionnaire } from "@/context/QuestionnaireContext";
import { getStringAnswer } from "@/lib/answers";
import { downloadAnamnesePdf } from "@/lib/pdf-download";
import { buildReviewSections } from "@/lib/review-summary";
import { validateOverview } from "@/lib/validate-overview";
import { sectionPath } from "@/lib/wizard-navigation";
import { ResetQuestionnaireButton } from "./ResetQuestionnaireButton";

export function OverviewScreen() {
  const router = useRouter();
  const { hydrated, answers, maxStepIndex, setFieldValue } = useQuestionnaire();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pdfLoading, setPdfLoading] = useState(false);

  const reviewSections = useMemo(
    () => (hydrated ? buildReviewSections(answers) : []),
    [answers, hydrated],
  );

  const consentChecked = getStringAnswer(answers, "consent") === "yes";

  useEffect(() => {
    if (!hydrated) {
      return;
    }
    if (maxStepIndex < 4) {
      const fallback = getSectionByIndex(maxStepIndex) ?? getSectionByIndex(0);
      if (fallback) {
        router.replace(sectionPath(fallback.slug));
      }
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [hydrated, maxStepIndex, router]);

  async function handlePdfDownload() {
    const nextErrors = validateOverview(answers);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setPdfLoading(true);
    try {
      await downloadAnamnesePdf(answers);
      router.push("/fragebogen/fertig");
    } catch {
      setErrors({
        pdf: "Das PDF konnte nicht erstellt werden. Bitte versuche es erneut.",
      });
    } finally {
      setPdfLoading(false);
    }
  }

  return (
    <main className="flex flex-1 flex-col">
      <PageContainer>
        <div className="mb-6 flex justify-end">
          <ResetQuestionnaireButton />
        </div>

        <p className="text-sm font-medium text-earth-brown/70">Übersicht</p>
        <h1
          id="overview-heading"
          tabIndex={-1}
          className="mt-2 text-2xl font-semibold tracking-tight text-deep-forest outline-none sm:text-3xl"
        >
          Deine Angaben
        </h1>
        <p className="mt-4 max-w-3xl leading-relaxed text-earth-brown">
          Prüfe deine Antworten. Wenn alles stimmt, bestätige unten die
          Einwilligung und lade dein PDF herunter.
        </p>

        {!hydrated ? (
          <p className="mt-6 text-sm text-earth-brown/70">Wird geladen …</p>
        ) : (
          <div className="mt-10">
            <ReviewSectionsList sections={reviewSections} />
          </div>
        )}

        {hydrated ? (
          <div className="mt-10 space-y-6 border-t border-warm-cream pt-8">
            <div className="space-y-2">
              <label className="flex cursor-pointer gap-3 rounded-xl border border-warm-cream bg-warm-cream/15 p-4 has-[:checked]:border-deep-forest has-[:checked]:bg-warm-cream/30">
                <input
                  type="checkbox"
                  checked={consentChecked}
                  onChange={(e) =>
                    setFieldValue("consent", e.target.checked ? "yes" : "")
                  }
                  className="mt-1 h-4 w-4 shrink-0 rounded accent-deep-forest"
                />
                <span className="text-sm leading-relaxed text-earth-brown">
                  Ich bin damit einverstanden, dass meine Angaben zur
                  Vorbereitung und Durchführung des Trainings gespeichert und
                  verarbeitet werden.{" "}
                  <a
                    href={siteConfig.privacyPolicyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-deep-forest underline-offset-2 hover:underline"
                  >
                    {siteConfig.privacyPolicyLabel}
                  </a>
                  {isValidationRequired(true) ? (
                    <span className="text-earth-brown/60"> *</span>
                  ) : null}
                </span>
              </label>
              {errors.consent ? (
                <p className="text-sm text-error">{errors.consent}</p>
              ) : null}
            </div>

            {errors.pdf ? (
              <p className="text-sm text-error">{errors.pdf}</p>
            ) : null}

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Link
                href={sectionPath("training")}
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-warm-cream bg-pure-white px-5 text-base font-medium text-earth-brown transition-colors hover:bg-warm-cream/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep-forest"
              >
                Zurück
              </Link>
              <button
                type="button"
                onClick={handlePdfDownload}
                disabled={
                  pdfLoading ||
                  (isValidationRequired(true) && !consentChecked)
                }
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-deep-forest px-6 py-3 text-base font-medium text-pure-white shadow-sm transition-colors hover:bg-deep-forest/90 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep-forest"
              >
                {pdfLoading ? "PDF wird erstellt …" : "PDF herunterladen"}
              </button>
            </div>
            {!isValidationRequired(true) ? null : (
              <p className="text-xs text-earth-brown/60">
                Der Download-Button ist aktiv, sobald die Einwilligung
                angekreuzt ist.
              </p>
            )}
          </div>
        ) : null}
      </PageContainer>
    </main>
  );
}
