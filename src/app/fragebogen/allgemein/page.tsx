import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";

export default function FragebogenAllgemeinPlaceholder() {
  return (
    <main className="flex flex-1 flex-col">
      <PageContainer>
        <p className="text-sm font-medium text-earth-brown/70">
          Schritt 1 von 5 · Allgemein
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-deep-forest">
          Fragebogen (Platzhalter)
        </h1>
        <p className="mt-4 leading-relaxed text-earth-brown">
          Hier kommt der Wizard mit allen Fragen. In diesem Schritt ist nur das
          Grundgerüst sichtbar.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block text-sm font-medium text-deep-forest underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep-forest"
        >
          Zurück zur Startseite
        </Link>
      </PageContainer>
    </main>
  );
}
