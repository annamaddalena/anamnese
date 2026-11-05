# Umsetzungsplan Anamnese-Fragebogen

Referenz: `anamnese_fragebogen_spec.md` (Spezifikation)

## Fortschritt

- [x] **Schritt 1:** Grundgerüst und Deployment
- [x] **Schritt 2:** Wizard und Navigation
- [ ] **Schritt 3:** Fragen und Logik
- [ ] **Schritt 4:** Übersicht, PDF und Abschluss

## Kurzüberblick

- Next.js App Router, TypeScript strict, Tailwind, keine Backend-Daten.
- Config-gesteuerte Fragen in `src/config/questionnaire.ts` (ab Schritt 2/3).
- Client-PDF und Abschluss in Schritt 4.

## Schritt 1 (erledigt)

Next.js 15-Projekt, Theme-Tokens (Pure White, Deep Forest, Warm Cream, Earth Brown), Header/Footer, zentrierte Spalte (~720px), Willkommensseite, Platzhalter `/fragebogen/allgemein`, README Deploy-Anleitung. (Tailwind 3 wegen Node 20.16; auf Vercel mit neuerem Node problemlos Next 16+ möglich.)

## Schritt 2

Wizard mit 5 Abschnitten + Übersicht (Platzhalter), Fortschritt, URL pro Schritt, localStorage, «Neu beginnen».

## Schritt 3

Vollständige Fragen-Config, FieldRenderer, show_if, Validierung, `{hund_name}`.

## Schritt 4

Übersicht, PDF, Einwilligung, Abschluss, mailto, Daten löschen.
