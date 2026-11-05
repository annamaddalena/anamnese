import { sections } from "@/config/questionnaire";
import { getBehaviorOverviewBlocks } from "@/lib/behavior-details";
import { formatFieldAnswer, formatFieldLabel } from "@/lib/format-answer";
import { getStringAnswer } from "@/lib/answers";
import { getVisibleFields } from "@/lib/showIf";
import type { AnswersRecord } from "@/types/questionnaire";

export type ReviewRow = {
  id: string;
  label: string;
  value: string;
};

export type ReviewBehaviorBlock = {
  title: string;
  rows: { label: string; value: string }[];
};

export type ReviewSection = {
  slug: string;
  title: string;
  rows: ReviewRow[];
  behaviorBlocks: ReviewBehaviorBlock[];
};

export function buildReviewSections(answers: AnswersRecord): ReviewSection[] {
  return sections
    .map((section) => {
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
        .filter(Boolean) as ReviewRow[];

      const behaviorBlocks =
        section.slug === "verhalten"
          ? getBehaviorOverviewBlocks(answers)
          : [];

      if (rows.length === 0 && behaviorBlocks.length === 0) {
        return null;
      }

      return {
        slug: section.slug,
        title: section.title,
        rows,
        behaviorBlocks,
      };
    })
    .filter(Boolean) as ReviewSection[];
}

export function getContactSummary(answers: AnswersRecord) {
  return {
    vorname: getStringAnswer(answers, "a1").trim(),
    nachname: getStringAnswer(answers, "a2").trim(),
    email: getStringAnswer(answers, "a3").trim(),
    telefon: getStringAnswer(answers, "a4").trim(),
    hundName: getStringAnswer(answers, "a5").trim(),
  };
}

export function pdfDownloadFilename(answers: AnswersRecord): string {
  const hund =
    getStringAnswer(answers, "a5")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9äöüÄÖÜ-]/g, "")
      .slice(0, 40) || "hund";
  const date = new Date().toISOString().slice(0, 10);
  return `anamnese-${hund}-${date}.pdf`;
}
