import { BASE_TRAINING_OPTION } from "@/types/questionnaire";

export type BehaviorTopicConfig = {
  /** v1 checkbox value */
  value: string;
  slug: string;
  skipTriggers?: boolean;
  skipReactions?: boolean;
};

export const BEHAVIOR_TOPICS: BehaviorTopicConfig[] = [
  { value: "Ziehen an der Leine", slug: "leine" },
  { value: "Aggression gegenüber Hunden", slug: "aggression_hunde" },
  { value: "Aggression gegenüber Menschen", slug: "aggression_menschen" },
  { value: "Angst oder Unsicherheit", slug: "angst" },
  { value: "Jagdverhalten", slug: "jagd" },
  { value: "Schlechter Rückruf", slug: "rueckruf" },
  {
    value: "Alleinbleiben",
    slug: "alleinbleiben",
    skipTriggers: true,
    skipReactions: true,
  },
  { value: "Übermässiges Bellen", slug: "bellen" },
  { value: "Unsauberheit", slug: "unsauberkeit" },
  { value: "Anspringen", slug: "anspringen" },
  { value: "Ressourcenverteidigung", slug: "ressourcen" },
  { value: "Sonstiges", slug: "sonstiges" },
];

export function behaviorFieldId(
  slug: string,
  part: "describe" | "triggers" | "reactions" | "intensity",
): string {
  return `v_b_${slug}_${part}`;
}

export function getTopicBySlug(slug: string): BehaviorTopicConfig | undefined {
  return BEHAVIOR_TOPICS.find((t) => t.slug === slug);
}

export function getTopicByValue(value: string): BehaviorTopicConfig | undefined {
  return BEHAVIOR_TOPICS.find((t) => t.value === value);
}

export const PROBLEM_BEHAVIOR_VALUES = BEHAVIOR_TOPICS.map((t) => t.value);

export function isProblemBehaviorValue(value: string): boolean {
  return value !== BASE_TRAINING_OPTION && PROBLEM_BEHAVIOR_VALUES.includes(value);
}
