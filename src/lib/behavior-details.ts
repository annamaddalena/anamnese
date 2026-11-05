import { getArrayAnswer, getStringAnswer } from "@/lib/answers";
import { isBehaviorDetailPath } from "@/lib/behavior-path";
import {
  BEHAVIOR_TOPICS,
  behaviorFieldId,
  getTopicByValue,
  isProblemBehaviorValue,
} from "@/config/behavior-details";
import { DEMO_MODE } from "@/config/app";
import type { AnswersRecord } from "@/types/questionnaire";

export type ActiveBehaviorBlock = {
  slug: string;
  title: string;
  skipTriggers: boolean;
  skipReactions: boolean;
};

export function getActiveBehaviorBlocks(
  answers: AnswersRecord,
): ActiveBehaviorBlock[] {
  if (!isBehaviorDetailPath(answers)) {
    return [];
  }

  const selected = getArrayAnswer(answers, "v1").filter(isProblemBehaviorValue);

  return selected.map((value) => {
    const topic = getTopicByValue(value)!;
    let title = topic.value;
    if (topic.slug === "sonstiges") {
      const custom = getStringAnswer(answers, "v1_sonstiges").trim();
      title = custom || "Sonstiges";
    }
    return {
      slug: topic.slug,
      title,
      skipTriggers: topic.skipTriggers ?? false,
      skipReactions: topic.skipReactions ?? false,
    };
  });
}

export function validateBehaviorDetails(
  answers: AnswersRecord,
): Record<string, string> {
  if (DEMO_MODE) {
    return {};
  }

  const errors: Record<string, string> = {};
  const blocks = getActiveBehaviorBlocks(answers);

  for (const block of blocks) {
    const describeId = behaviorFieldId(block.slug, "describe");
    const describe = getStringAnswer(answers, describeId).trim();
    if (describe.length < 10) {
      errors[describeId] =
        describe.length === 0
          ? `Bitte beschreibe «${block.title}».`
          : "Bitte beschreibe etwas ausführlicher (mindestens 10 Zeichen).";
    }

    if (!block.skipTriggers) {
      const triggersId = behaviorFieldId(block.slug, "triggers");
      const triggers = getStringAnswer(answers, triggersId).trim();
      if (!triggers) {
        errors[triggersId] = "Bitte beschreibe, was das auslöst (oder «weiss ich nicht»).";
      }
    }

    if (!block.skipReactions) {
      const reactionsId = behaviorFieldId(block.slug, "reactions");
      const reactions = getStringAnswer(answers, reactionsId).trim();
      if (!reactions) {
        errors[reactionsId] =
          "Bitte beschreibe, wie dein Hund reagiert (oder «weiss ich nicht»).";
      }
    }

    const intensityId = behaviorFieldId(block.slug, "intensity");
    const intensity = getStringAnswer(answers, intensityId).trim();
    if (!(intensityId in answers) || !intensity) {
      errors[intensityId] =
        "Bitte stelle den Regler für die Intensität ein.";
    }
  }

  return errors;
}

export function cleanupStaleBehaviorAnswers(
  answers: AnswersRecord,
): AnswersRecord {
  const next = { ...answers };
  const activeSlugs = new Set(getActiveBehaviorBlocks(answers).map((b) => b.slug));

  for (const topic of BEHAVIOR_TOPICS) {
    if (activeSlugs.has(topic.slug)) {
      continue;
    }
    for (const part of ["describe", "triggers", "reactions", "intensity"] as const) {
      delete next[behaviorFieldId(topic.slug, part)];
    }
  }

  return next;
}

/** Overview rows per behavior block */
export function getBehaviorOverviewBlocks(answers: AnswersRecord) {
  return getActiveBehaviorBlocks(answers)
    .map((block) => {
      const rows: { label: string; value: string }[] = [];
      const describe = getStringAnswer(
        answers,
        behaviorFieldId(block.slug, "describe"),
      ).trim();
      if (describe) {
        rows.push({ label: "Was passiert?", value: describe });
      }
      if (!block.skipTriggers) {
        const triggers = getStringAnswer(
          answers,
          behaviorFieldId(block.slug, "triggers"),
        ).trim();
        if (triggers) {
          rows.push({ label: "Auslöser", value: triggers });
        }
      }
      if (!block.skipReactions) {
        const reactions = getStringAnswer(
          answers,
          behaviorFieldId(block.slug, "reactions"),
        ).trim();
        if (reactions) {
          rows.push({ label: "Typische Reaktion", value: reactions });
        }
      }
      const intensity = getStringAnswer(
        answers,
        behaviorFieldId(block.slug, "intensity"),
      ).trim();
      if (intensity) {
        rows.push({ label: "Intensität", value: `${intensity} / 5` });
      }
      if (rows.length === 0) {
        return null;
      }
      return { title: block.title, rows };
    })
    .filter(Boolean) as { title: string; rows: { label: string; value: string }[] }[];
}
