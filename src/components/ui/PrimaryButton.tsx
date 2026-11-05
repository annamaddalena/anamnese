import Link from "next/link";
import type { ReactNode } from "react";

type PrimaryButtonLinkProps = {
  href: string;
  children: ReactNode;
};

export function PrimaryButtonLink({ href, children }: PrimaryButtonLinkProps) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-12 items-center justify-center rounded-xl bg-deep-forest px-6 py-3 text-base font-medium text-pure-white shadow-sm transition-colors hover:bg-deep-forest/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep-forest"
    >
      {children}
    </Link>
  );
}
