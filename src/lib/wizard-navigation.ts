import { sections } from "@/config/questionnaire";
import type { SectionSlug } from "@/types/questionnaire";

export function sectionPath(slug: SectionSlug): string {
  return `/fragebogen/${slug}`;
}

export function overviewPath(): string {
  return "/fragebogen/uebersicht";
}

export function getPrevSectionSlug(slug: SectionSlug): SectionSlug | null {
  const index = sections.findIndex((s) => s.slug === slug);
  if (index <= 0) {
    return null;
  }
  return sections[index - 1].slug;
}

export function getNextSectionSlug(slug: SectionSlug): SectionSlug | null {
  const index = sections.findIndex((s) => s.slug === slug);
  if (index < 0 || index >= sections.length - 1) {
    return null;
  }
  return sections[index + 1].slug;
}
