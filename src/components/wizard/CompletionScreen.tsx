"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { useQuestionnaire } from "@/context/QuestionnaireContext";
import { getStringAnswer } from "@/lib/answers";

export function CompletionScreen() {
  const router = useRouter();
  const { hydrated, answers, resetQuestionnaire } = useQuestionnaire();
  const [submitAcknowledged, setSubmitAcknowledged] = useState(false);

  const vorname = getStringAnswer(answers, "a1").trim() || "du";

  function handleClearData() {
    const confirmed = window.confirm(
      "Alle lokal gespeicherten Angaben auf diesem Gerät löschen?",
    );
    if (!confirmed) {
      return;
    }
    resetQuestionnaire();
    router.push("/");
  }

  function handleSubmitToTrainer() {
    setSubmitAcknowledged(true);
  }

  if (!hydrated) {
    return (
      <main className="flex flex-1 flex-col">
        <PageContainer>
          <p className="text-sm text-earth-brown/70">Wird geladen …</p>
        </PageContainer>
      </main>
    );
  }

  return (
    <main className="flex flex-1 flex-col">
      <PageContainer width="narrow">
        <h1 className="text-2xl font-semibold tracking-tight text-deep-forest sm:text-3xl">
          Danke, {vorname}!
        </h1>
        <p className="mt-4 leading-relaxed text-earth-brown">
          Ich melde mich bei dir, bevor wir starten. Dein PDF liegt auf deinem
          Gerät — du findest es in deinen Downloads.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <button
            type="button"
            onClick={handleSubmitToTrainer}
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-deep-forest px-6 py-3 text-base font-medium text-pure-white shadow-sm transition-colors hover:bg-deep-forest/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep-forest"
          >
            An Trainerin senden
          </button>
          <Link
            href="/"
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-warm-cream bg-pure-white px-5 text-base font-medium text-earth-brown transition-colors hover:bg-warm-cream/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep-forest"
          >
            Zur Startseite
          </Link>
        </div>

        {submitAcknowledged ? (
          <p className="mt-4 text-sm text-earth-brown/70" role="status">
            Noch nicht verfügbar in diesem Prototyp — das PDF bleibt bei dir
            gespeichert.
          </p>
        ) : null}

        <button
          type="button"
          onClick={handleClearData}
          className="mt-10 text-sm font-medium text-earth-brown/80 underline-offset-2 hover:text-deep-forest hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep-forest"
        >
          Gespeicherte Angaben auf diesem Gerät löschen
        </button>
      </PageContainer>
    </main>
  );
}
