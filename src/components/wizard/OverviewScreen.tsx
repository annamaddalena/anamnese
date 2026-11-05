"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { getSectionByIndex, sections } from "@/config/questionnaire";
import { useQuestionnaire } from "@/context/QuestionnaireContext";
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
          Deine Angaben (Platzhalter)
        </h1>
        <p className="mt-4 max-w-3xl leading-relaxed text-earth-brown">
          Hier siehst du später alle Antworten zum Prüfen. In Schritt 2 zeigen
          wir nur die Platzhalter-Eingaben pro Abschnitt.
        </p>

        {!hydrated ? (
          <p className="mt-6 text-sm text-earth-brown/70">Wird geladen …</p>
        ) : (
          <div className="mt-10 divide-y divide-warm-cream border-y border-warm-cream">
            {sections.map((section) => {
              const value = answers[section.placeholderFieldId]?.trim();
              return (
                <section
                  key={section.slug}
                  className="flex flex-col gap-3 py-6 sm:flex-row sm:items-start sm:justify-between"
                >
                  <div className="min-w-0">
                    <h2 className="font-semibold text-deep-forest">
                      {section.title}
                    </h2>
                    <p className="mt-1 text-sm text-earth-brown">
                      {value || "Noch nichts eingetragen"}
                    </p>
                  </div>
                  <Link
                    href={sectionPath(section.slug)}
                    className="inline-flex shrink-0 text-sm font-medium text-deep-forest underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep-forest"
                  >
                    Bearbeiten
                  </Link>
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
