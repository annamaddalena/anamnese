"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { getSectionByIndex, sections } from "@/config/questionnaire";
import { useQuestionnaire } from "@/context/QuestionnaireContext";
import { getBehaviorOverviewBlocks } from "@/lib/behavior-details";
import { formatFieldAnswer, formatFieldLabel } from "@/lib/format-answer";
import { getVisibleFields } from "@/lib/showIf";
import { sectionPath } from "@/lib/wizard-navigation";
import { ResetQuestionnaireButton } from "./ResetQuestionnaireButton";

export function OverviewScreen() {
  const router = useRouter();
  const { hydrated, answers, maxStepIndex } = useQuestionnaire();

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
          Prüfe deine Antworten. Einwilligung, PDF und Abschluss folgen im
          nächsten Schritt.
        </p>

        {!hydrated ? (
          <p className="mt-6 text-sm text-earth-brown/70">Wird geladen …</p>
        ) : (
          <div className="mt-10 space-y-10">
            {sections.map((section) => {
              const visible = getVisibleFields(section.fields, answers);
              const rows = visible
                .map((field) => {
                  if (field.type === "behavior_details") {
                    return null;
                  }
                  const value = formatFieldAnswer(field, answers);
                  if (!value) {
                    return null;
                  }
                  return {
                    id: field.id,
                    label: formatFieldLabel(field, answers),
                    value,
                  };
                })
                .filter(Boolean) as {
                id: string;
                label: string;
                value: string;
              }[];

              const behaviorBlocks =
                section.slug === "verhalten"
                  ? getBehaviorOverviewBlocks(answers)
                  : [];

              if (rows.length === 0 && behaviorBlocks.length === 0) {
                return null;
              }

              return (
                <section key={section.slug}>
                  <div className="flex flex-col gap-3 border-b border-warm-cream pb-3 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-lg font-semibold text-deep-forest">
                      {section.title}
                    </h2>
                    <Link
                      href={sectionPath(section.slug)}
                      className="inline-flex shrink-0 text-sm font-medium text-deep-forest underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep-forest"
                    >
                      Bearbeiten
                    </Link>
                  </div>
                  <dl className="mt-4 space-y-4">
                    {rows.map((row) => (
                      <div key={row.id}>
                        <dt className="text-sm font-medium text-earth-brown">
                          {row.label}
                        </dt>
                        <dd className="mt-1 whitespace-pre-wrap text-sm text-earth-brown/90">
                          {row.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  {behaviorBlocks.length > 0 ? (
                    <div className="mt-6 space-y-6">
                      {behaviorBlocks.map((block) => (
                        <div
                          key={block.title}
                          className="border-t border-warm-cream pt-4"
                        >
                          <h3 className="font-medium text-deep-forest">
                            {block.title}
                          </h3>
                          <dl className="mt-3 space-y-3">
                            {block.rows.map((row) => (
                              <div key={row.label}>
                                <dt className="text-sm text-earth-brown/80">
                                  {row.label}
                                </dt>
                                <dd className="mt-0.5 whitespace-pre-wrap text-sm text-earth-brown/90">
                                  {row.value}
                                </dd>
                              </div>
                            ))}
                          </dl>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </section>
              );
            })}
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3 border-t border-warm-cream pt-6 sm:flex-row sm:justify-between">
          <Link
            href={sectionPath("training")}
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-warm-cream bg-pure-white px-5 text-base font-medium text-earth-brown transition-colors hover:bg-warm-cream/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep-forest"
          >
            Zurück
          </Link>
          <span className="inline-flex min-h-12 items-center text-sm text-earth-brown/70">
            PDF und Abschluss folgen in Schritt 4
          </span>
        </div>
      </PageContainer>
    </main>
  );
}
