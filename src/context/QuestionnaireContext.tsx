"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { applyDerivedAnswers } from "@/lib/behavior-path";
import { cleanupStaleBehaviorAnswers } from "@/lib/behavior-details";
import {
  clearPersistedState,
  createEmptyState,
  readPersistedState,
  writePersistedState,
} from "@/lib/storage";
import type { AnswerValue, AnswersRecord } from "@/types/questionnaire";

type QuestionnaireContextValue = {
  hydrated: boolean;
  answers: AnswersRecord;
  maxStepIndex: number;
  setFieldValue: (fieldId: string, value: AnswerValue) => void;
  registerStepVisit: (stepIndex: number) => void;
  resetQuestionnaire: () => void;
};

const QuestionnaireContext = createContext<QuestionnaireContextValue | null>(
  null,
);

export function QuestionnaireProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [answers, setAnswers] = useState<AnswersRecord>({});
  const [maxStepIndex, setMaxStepIndex] = useState(0);

  useEffect(() => {
    const stored = readPersistedState();
    if (stored) {
      setAnswers(
        applyDerivedAnswers(cleanupStaleBehaviorAnswers(stored.answers)),
      );
      setMaxStepIndex(stored.maxStepIndex);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }
    writePersistedState({
      version: 1,
      answers: applyDerivedAnswers(answers),
      maxStepIndex,
    });
  }, [answers, maxStepIndex, hydrated]);

  const setFieldValue = useCallback((fieldId: string, value: AnswerValue) => {
    setAnswers((prev) =>
      applyDerivedAnswers(
        cleanupStaleBehaviorAnswers({
          ...prev,
          [fieldId]: value,
        }),
      ),
    );
  }, []);

  const registerStepVisit = useCallback((stepIndex: number) => {
    setMaxStepIndex((prev) => Math.max(prev, stepIndex));
  }, []);

  const resetQuestionnaire = useCallback(() => {
    clearPersistedState();
    const empty = createEmptyState();
    setAnswers(empty.answers);
    setMaxStepIndex(empty.maxStepIndex);
  }, []);

  const value = useMemo(
    () => ({
      hydrated,
      answers,
      maxStepIndex,
      setFieldValue,
      registerStepVisit,
      resetQuestionnaire,
    }),
    [
      hydrated,
      answers,
      maxStepIndex,
      setFieldValue,
      registerStepVisit,
      resetQuestionnaire,
    ],
  );

  return (
    <QuestionnaireContext.Provider value={value}>
      {children}
    </QuestionnaireContext.Provider>
  );
}

export function useQuestionnaire(): QuestionnaireContextValue {
  const ctx = useContext(QuestionnaireContext);
  if (!ctx) {
    throw new Error("useQuestionnaire must be used within QuestionnaireProvider");
  }
  return ctx;
}
