import Link from "next/link";
import { overviewPath } from "@/lib/wizard-navigation";

type WizardNavProps = {
  backHref: string | null;
  backLabel?: string;
  nextHref: string | null;
  nextLabel: string;
};

export function WizardNav({
  backHref,
  backLabel = "Zurück",
  nextHref,
  nextLabel,
}: WizardNavProps) {
  return (
    <div className="mt-8 flex flex-col-reverse gap-3 border-t border-warm-cream pt-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        {backHref ? (
          <Link
            href={backHref}
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-warm-cream bg-pure-white px-5 text-base font-medium text-earth-brown transition-colors hover:bg-warm-cream/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep-forest"
          >
            {backLabel}
          </Link>
        ) : (
          <span className="inline-flex min-h-12 items-center px-1 text-sm text-earth-brown/50">
            Du bist beim ersten Schritt
          </span>
        )}
      </div>
      {nextHref ? (
        <Link
          href={nextHref}
          className="inline-flex min-h-12 items-center justify-center rounded-xl bg-deep-forest px-6 py-3 text-base font-medium text-pure-white shadow-sm transition-colors hover:bg-deep-forest/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep-forest"
        >
          {nextLabel}
        </Link>
      ) : (
        <Link
          href={overviewPath()}
          className="inline-flex min-h-12 items-center justify-center rounded-xl bg-deep-forest px-6 py-3 text-base font-medium text-pure-white shadow-sm transition-colors hover:bg-deep-forest/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep-forest"
        >
          {nextLabel}
        </Link>
      )}
    </div>
  );
}
