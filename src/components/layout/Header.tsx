import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-warm-cream bg-pure-white">
      <div className="mx-auto flex h-14 w-full max-w-layout items-center px-4 sm:px-6 lg:px-10">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-deep-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep-forest"
        >
          Anamnese Fragebogen
        </Link>
      </div>
    </header>
  );
}
