import type { SectionConfig, SectionSlug } from "@/types/questionnaire";
import { SECTION_SLUGS } from "@/types/questionnaire";

export const sections: SectionConfig[] = [
  {
    slug: "allgemein",
    title: "Allgemein",
    intro:
      "Willkommen! Mit diesen Fragen lerne ich dich und deinen Hund schon vor unserem ersten Termin kennen. Es gibt keine falschen Antworten. Je ehrlicher du antwortest, desto besser kann ich das Training auf euch abstimmen. Das Ausfüllen dauert etwa 10–15 Minuten.",
    placeholderFieldId: "_placeholder_allgemein",
    placeholderLabel: "Platzhalter (Schritt 1)",
  },
  {
    slug: "gesundheit",
    title: "Gesundheit & Ernährung",
    intro:
      "Verhalten und Gesundheit hängen eng zusammen. Schmerzen oder Krankheiten können hinter vielen Verhaltensproblemen stecken.",
    placeholderFieldId: "_placeholder_gesundheit",
    placeholderLabel: "Platzhalter (Schritt 2)",
  },
  {
    slug: "alltag",
    title: "Alltag & Zuhause",
    intro:
      "Hier geht es darum, wie euer Alltag aussieht. So kann ich das Training realistisch für euch planen.",
    placeholderFieldId: "_placeholder_alltag",
    placeholderLabel: "Platzhalter (Schritt 3)",
  },
  {
    slug: "verhalten",
    title: "Verhalten",
    intro:
      "Jetzt geht es um das, was dich beschäftigt. Beschreibe es so konkret wie möglich, als würdest du mir eine Szene schildern.",
    placeholderFieldId: "_placeholder_verhalten",
    placeholderLabel: "Platzhalter (Schritt 4)",
  },
  {
    slug: "training",
    title: "Training & Ziele",
    intro:
      "Zum Schluss: Was habt ihr bisher gemacht, und wohin soll es gehen?",
    placeholderFieldId: "_placeholder_training",
    placeholderLabel: "Platzhalter (Schritt 5)",
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
