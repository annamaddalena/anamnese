import {
  allgemeinFields,
  alltagFields,
  gesundheitFields,
  trainingFields,
  verhaltenFields,
} from "@/config/questionnaire-fields";
import type { SectionConfig, SectionSlug } from "@/types/questionnaire";
import { SECTION_SLUGS } from "@/types/questionnaire";

export const sections: SectionConfig[] = [
  {
    slug: "allgemein",
    title: "Allgemein",
    intro: "",
    fields: allgemeinFields,
  },
  {
    slug: "gesundheit",
    title: "Gesundheit & Ernährung",
    intro:
      "Verhalten und Gesundheit hängen eng zusammen. Schmerzen oder Krankheiten können hinter vielen Verhaltensproblemen stecken.",
    fields: gesundheitFields,
  },
  {
    slug: "alltag",
    title: "Alltag & Zuhause",
    intro:
      "Hier geht es darum, wie euer Alltag aussieht. So kann ich das Training realistisch für euch planen.",
    fields: alltagFields,
  },
  {
    slug: "verhalten",
    title: "Verhalten",
    intro:
      "Jetzt geht es um das, was dich beschäftigt. Beschreibe es so konkret wie möglich, als würdest du mir eine Szene schildern.",
    fields: verhaltenFields,
  },
  {
    slug: "training",
    title: "Training & Ziele",
    intro:
      "Zum Schluss: Was habt ihr bisher gemacht, und wohin soll es gehen?",
    fields: trainingFields,
  },
];

export function isSectionSlug(value: string): value is SectionSlug {
  return (SECTION_SLUGS as readonly string[]).includes(value);
}

export function getSectionBySlug(slug: SectionSlug): SectionConfig {
  const section = sections.find((s) => s.slug === slug);
  if (!section) {
    throw new Error(`Unknown section: ${slug}`);
  }
  return section;
}

export function getSectionIndex(slug: SectionSlug): number {
  return sections.findIndex((s) => s.slug === slug);
}

export function getSectionByIndex(index: number): SectionConfig | undefined {
  return sections[index];
}

export function getAllFields() {
  return sections.flatMap((section) => section.fields);
}
