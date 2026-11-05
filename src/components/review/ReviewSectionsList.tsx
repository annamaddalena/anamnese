import Link from "next/link";
import type { ReviewSection } from "@/lib/review-summary";
import { sectionPath } from "@/lib/wizard-navigation";
import type { SectionSlug } from "@/types/questionnaire";

type ReviewSectionsListProps = {
  sections: ReviewSection[];
};

export function ReviewSectionsList({ sections }: ReviewSectionsListProps) {
  if (sections.length === 0) {
    return (
      <p className="text-sm text-earth-brown/70">
        Noch keine Antworten zum Anzeigen.
      </p>
    );
  }

  return (
    <div className="space-y-10">
      {sections.map((section) => (
        <section key={section.slug}>
          <div className="flex flex-col gap-3 border-b border-warm-cream pb-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-semibold text-deep-forest">
              {section.title}
            </h2>
            <Link
              href={sectionPath(section.slug as SectionSlug)}
              className="inline-flex shrink-0 text-sm font-medium text-deep-forest underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep-forest"
            >
              Bearbeiten
            </Link>
          </div>
          <dl className="mt-4 space-y-4">
            {section.rows.map((row) => (
              <div key={row.id}>
                <dt className="text-sm font-medium text-earth-brown">
                  {row.label}
                </dt>
                <dd className="mt-1 whitespace-pre-wrap text-sm text-earth-brown/90">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
          {section.behaviorBlocks.length > 0 ? (
            <div className="mt-6 space-y-6">
              {section.behaviorBlocks.map((block) => (
                <div
                  key={block.title}
                  className="border-t border-warm-cream pt-4"
                >
                  <h3 className="font-medium text-deep-forest">{block.title}</h3>
                  <dl className="mt-3 space-y-3">
                    {block.rows.map((row) => (
                      <div key={row.label}>
                        <dt className="text-sm text-earth-brown/80">
                          {row.label}
                        </dt>
                        <dd className="mt-0.5 whitespace-pre-wrap text-sm text-earth-brown/90">
                          {row.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          ) : null}
        </section>
      ))}
    </div>
  );
}
