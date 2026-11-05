# Anamnese Hundetraining

Web-App für den digitalen Anamnese-Fragebogen vor dem Erstgespräch (Next.js, TypeScript, Tailwind). Alle Antworten bleiben im Browser; am Ende kann ein PDF heruntergeladen werden.

## Voraussetzungen

- Node.js 20.x oder neuer
- npm

## Demo-Modus

In `src/config/app.ts` steuert `DEMO_MODE`:

- `true` (Standard zum Testen): Keine Pflichtfeld-Validierung, du kannst leer durchklicken.
- `false`: Pflichtfelder und Fehlermeldungen wie für echte Kund:innen.

## Lokal starten

```bash
npm install
npm run dev
```

Im Browser [http://localhost:3000](http://localhost:3000) öffnen. Mit «Los geht's» gelangst du zur Platzhalter-Seite des Fragebogens (`/fragebogen/allgemein`).

## Produktions-Build

```bash
npm run build
npm start
```

## Deployment (Vercel)

1. Repository auf GitHub verbinden (z. B. `annamaddalena/anamnese`).
2. In [vercel.com](https://vercel.com) **Add New Project** wählen und das Repo importieren.
3. Framework Preset: **Next.js** (Standard).
4. Deploy — keine Umgebungsvariablen nötig für Schritt 1.

Nach dem Deploy steht die App unter der von Vercel vergebenen URL bereit.

## Projektplan

Siehe `PLAN.md` für die Schritte der Umsetzung.
