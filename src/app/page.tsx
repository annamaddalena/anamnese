import { PageContainer } from "@/components/layout/PageContainer";
import { PrimaryButtonLink } from "@/components/ui/PrimaryButton";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <PageContainer>
        <div className="rounded-2xl border border-warm-cream bg-pure-white p-6 shadow-sm sm:p-8">
          <h1 className="text-2xl font-semibold tracking-tight text-deep-forest sm:text-3xl">
            Willkommen
          </h1>
          <p className="mt-4 text-base leading-relaxed text-earth-brown">
            Willkommen! Mit diesen Fragen lerne ich dich und deinen Hund schon
            vor unserem ersten Termin kennen. Es gibt keine falschen Antworten.
            Je ehrlicher du antwortest, desto besser kann ich das Training auf
            euch abstimmen. Das Ausfüllen dauert etwa 10–15 Minuten.
          </p>
          <div className="mt-8">
            <PrimaryButtonLink href="/fragebogen/allgemein">
              Los geht&apos;s
            </PrimaryButtonLink>
          </div>
        </div>
      </PageContainer>
    </main>
  );
}
