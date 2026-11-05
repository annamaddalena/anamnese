type SectionIntroProps = {
  stepLabel: string;
  title: string;
  intro: string;
  headingId: string;
};

export function SectionIntro({
  stepLabel,
  title,
  intro,
  headingId,
}: SectionIntroProps) {
  return (
    <header className="mb-6">
      <p className="text-sm font-medium text-earth-brown/70">{stepLabel}</p>
      <h1
        id={headingId}
        tabIndex={-1}
        className="mt-2 text-2xl font-semibold tracking-tight text-deep-forest outline-none sm:text-3xl"
      >
        {title}
      </h1>
      {intro.trim() ? (
        <p className="mt-4 text-base leading-relaxed text-earth-brown">
          {intro}
        </p>
      ) : null}
    </header>
  );
}
