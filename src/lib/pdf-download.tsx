"use client";

import { pdf } from "@react-pdf/renderer";
import { AnamnesePdfDocument } from "@/components/pdf/AnamnesePdfDocument";
import {
  buildReviewSections,
  getContactSummary,
  pdfDownloadFilename,
} from "@/lib/review-summary";
import type { AnswersRecord } from "@/types/questionnaire";

function formatPdfDate(date: Date): string {
  return date.toLocaleDateString("de-CH", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export async function downloadAnamnesePdf(answers: AnswersRecord): Promise<void> {
  const generatedAt = formatPdfDate(new Date());
  const doc = (
    <AnamnesePdfDocument
      generatedAt={generatedAt}
      contact={getContactSummary(answers)}
      sections={buildReviewSections(answers)}
    />
  );

  const blob = await pdf(doc).toBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = pdfDownloadFilename(answers);
  link.click();
  URL.revokeObjectURL(url);
}
