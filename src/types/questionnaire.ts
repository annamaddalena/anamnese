export const SECTION_SLUGS = [
  "allgemein",
  "gesundheit",
  "alltag",
  "verhalten",
  "training",
] as const;

export type SectionSlug = (typeof SECTION_SLUGS)[number];

export type SectionConfig = {
  slug: SectionSlug;
  title: string;
  intro: string;
  placeholderFieldId: string;
  placeholderLabel: string;
};

export type AnswersRecord = Record<string, string>;

export type PersistedState = {
  version: 1;
  answers: AnswersRecord;
  maxStepIndex: number;
};
