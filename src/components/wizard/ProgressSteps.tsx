"use client";

import Link from "next/link";
import { sections } from "@/config/questionnaire";
import { sectionPath } from "@/lib/wizard-navigation";
import type { SectionSlug } from "@/types/questionnaire";

type ProgressStepsProps = {
  currentSlug: SectionSlug;
  maxStepIndex: number;
  variant?: "mobile" | "desktop";
};

function StepIndicator({
  index,
  isCurrent,
  isComplete,
  isReachable,
}: {
  index: number;
  isCurrent: boolean;
  isComplete: boolean;
  isReachable: boolean;
}) {
  if (isCurrent) {
    return (
      <span
        className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-deep-forest text-xs font-semibold text-pure-white"
        aria-hidden
      >
        {index + 1}
      </span>
    );
  }

  if (isComplete) {
    return (
      <span
        className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-deep-forest text-pure-white"
        aria-hidden
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden
          className="text-pure-white"
        >
          <path
            d="M2.5 6.2 4.8 8.5 9.5 3.8"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    );
  }

  return (
    <span
      className={`relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${
        isReachable
          ? "border-deep-forest/25 bg-pure-white text-deep-forest"
          : "border-earth-brown/15 bg-pure-white text-earth-brown/35"
      }`}
      aria-hidden
    >
      {index + 1}
    </span>
  );
}

export function ProgressSteps({
  currentSlug,
  maxStepIndex,
  variant,
}: ProgressStepsProps) {
  const currentIndex = sections.findIndex((s) => s.slug === currentSlug);
  const currentSection = sections[currentIndex];

  const showMobile = variant === "mobile" || variant === undefined;
  const showDesktop = variant === "desktop" || variant === undefined;

  return (
    <>
      {showMobile && (
        <div className="border-b border-warm-cream pb-5 lg:hidden">
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-sm font-semibold text-deep-forest">
              Schritt {currentIndex + 1} von {sections.length}
            </p>
            <p className="truncate text-sm text-earth-brown/80">
              {currentSection?.title}
            </p>
          </div>
          <div className="mt-3 flex gap-1.5" role="presentation" aria-hidden>
            {sections.map((section, index) => {
              const isCurrent = index === currentIndex;
              const isPast = index < currentIndex;
              const isFilled = isPast || isCurrent;
              return (
                <div
                  key={section.slug}
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    isFilled
                      ? "bg-deep-forest"
                      : index <= maxStepIndex
                        ? "bg-deep-forest/25"
                        : "bg-warm-cream"
                  }`}
                />
              );
            })}
          </div>
        </div>
      )}

      {showDesktop && (
        <nav
          aria-label="Fragebogen-Abschnitte"
          className="hidden lg:block lg:sticky lg:top-8 lg:self-start"
        >
          <ol className="space-y-0">
            {sections.map((section, index) => {
              const isCurrent = section.slug === currentSlug;
              const isReachable = index <= maxStepIndex;
              const isComplete = index < currentIndex;
              const isLast = index === sections.length - 1;

              const labelClass = isCurrent
                ? "font-semibold text-deep-forest"
                : isComplete
                  ? "text-earth-brown"
                  : isReachable
                    ? "text-earth-brown/90"
                    : "text-earth-brown/40";

              const row = (
                <div className="flex gap-3 py-2.5 pr-2">
                  <StepIndicator
                    index={index}
                    isCurrent={isCurrent}
                    isComplete={isComplete}
                    isReachable={isReachable}
                  />
                  <div className="flex-1 pt-0.5">
                    <span
                      className={`block text-sm leading-snug lg:whitespace-nowrap ${labelClass}`}
                    >
                      {section.title}
                    </span>
                  </div>
                </div>
              );

              return (
                <li
                  key={section.slug}
                  className={`relative ${isLast ? "" : "pb-0.5"}`}
                >
                  {!isLast && (
                    <span
                      className={`absolute left-[11px] top-7 bottom-0 w-px ${
                        isComplete ? "bg-deep-forest/25" : "bg-warm-cream"
                      }`}
                      aria-hidden
                    />
                  )}
                  {isReachable && !isCurrent ? (
                    <Link
                      href={sectionPath(section.slug)}
                      className="block rounded-lg transition-colors hover:text-deep-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep-forest"
                    >
                      {row}
                    </Link>
                  ) : (
                    <span aria-current={isCurrent ? "step" : undefined}>
                      {row}
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      )}
    </>
  );
}
