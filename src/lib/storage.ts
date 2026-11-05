import type { PersistedState } from "@/types/questionnaire";

export const STORAGE_KEY = "anamnese-v1";

export function createEmptyState(): PersistedState {
  return {
    version: 1,
    answers: {},
    maxStepIndex: 0,
  };
}

export function readPersistedState(): PersistedState | null {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw) as PersistedState;
    if (parsed.version !== 1 || typeof parsed.maxStepIndex !== "number") {
      return null;
    }
    return {
      version: 1,
      answers: parsed.answers ?? {},
      maxStepIndex: Math.min(
        Math.max(0, parsed.maxStepIndex),
        4,
      ),
    };
  } catch {
    return null;
  }
}

export function writePersistedState(state: PersistedState): void {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function clearPersistedState(): void {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.removeItem(STORAGE_KEY);
}
