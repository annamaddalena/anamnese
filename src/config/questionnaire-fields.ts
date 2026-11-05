import type { FieldDef } from "@/types/questionnaire";
import { BASE_TRAINING_OPTION } from "@/types/questionnaire";

const o = (label: string) => ({ value: label, label });

export const allgemeinFields: FieldDef[] = [
  {
    id: "a1",
    type: "text",
    label: "Vorname",
    required: true,
    autoComplete: "given-name",
    hundNameInText: false,
  },
  {
    id: "a2",
    type: "text",
    label: "Nachname",
    required: true,
    autoComplete: "family-name",
    hundNameInText: false,
  },
  {
    id: "a3",
    type: "email",
    label: "E-Mail-Adresse",
    required: true,
    helpText: "Hierhin schicke ich dir die Terminbestätigung.",
    hundNameInText: false,
  },
  {
    id: "a4",
    type: "tel",
    label: "Telefonnummer",
    helpText:
      "Nur für kurzfristige Absprachen, z. B. wenn sich ein Termin verschiebt.",
    hundNameInText: false,
  },
  {
    id: "a5",
    type: "text",
    label: "Name deines Hundes",
    required: true,
    hundNameInText: false,
  },
  {
    id: "a6",
    type: "number",
    label: "Alter deines Hundes",
    required: true,
    helpText: "Ein ungefähres Alter reicht (z. B. 2 oder 2.5 Jahre).",
    min: 0,
    max: 25,
    step: 0.1,
    maxDecimals: 1,
    placeholder: "Jahre",
    hundNameInText: false,
  },
  {
    id: "a7",
    type: "radio",
    label: "Geschlecht",
    required: true,
    options: [o("Rüde"), o("Hündin")],
  },
  {
    id: "a8",
    type: "radio",
    label: "Kastriert / sterilisiert?",
    required: true,
    options: [o("Ja"), o("Nein"), o("Hormonchip")],
  },
  {
    id: "a9",
    type: "text",
    label: "Rasse / Mix",
    required: true,
    helpText:
      "Wenn du es nicht genau weisst, schreib einfach, was du vermutest oder 'unbekannt'.",
  },
  {
    id: "a10",
    type: "select",
    label: "Herkunft",
    required: true,
    placeholderOption: "Bitte wählen",
    options: [
      o("Züchter:in"),
      o("Tierschutz Schweiz"),
      o("Tierschutz Ausland"),
      o("Tierheim"),
      o("Privatabgabe"),
      o("Fundhund"),
      o("Sonstiges"),
    ],
  },
  {
    id: "a10_sonstiges",
    type: "text",
    label: "Sonstiges (Herkunft)",
    required: true,
    showIf: { field: "a10", equals: "Sonstiges" },
  },
  {
    id: "a11",
    type: "select",
    label: "Alter beim Einzug",
    required: true,
    placeholderOption: "Bitte wählen",
    options: [
      o("Unter 8 Wochen"),
      o("8–12 Wochen"),
      o("3–6 Monate"),
      o("6–12 Monate"),
      o("Über 1 Jahr"),
      o("Weiss ich nicht"),
    ],
  },
  {
    id: "a12",
    type: "radio",
    label: "Frühere Besitzer:innen?",
    required: true,
    options: [o("Ja"), o("Nein"), o("Weiss ich nicht")],
  },
  {
    id: "a12_details",
    type: "textarea",
    label: "Details",
    placeholder:
      "z. B. Anzahl Wechsel, Gründe, Vorgeschichte — so viel du weisst.",
    showIf: { field: "a12", equals: "Ja" },
  },
];

export const gesundheitFields: FieldDef[] = [
  {
    id: "g1",
    type: "radio",
    label:
      "Hat {hund_name} bekannte Erkrankungen oder nimmt regelmässig Medikamente?",
    required: true,
    options: [o("Ja"), o("Nein")],
  },
  {
    id: "g1_details",
    type: "textarea",
    label:
      "Welche Erkrankungen bzw. Medikamente? Gibt es tierärztliche Diagnosen, die ich kennen sollte?",
    required: true,
    showIf: { field: "g1", equals: "Ja" },
  },
  {
    id: "g2",
    type: "radio",
    label:
      "Zeigt {hund_name} Anzeichen von Schmerzen oder Bewegungseinschränkungen? (z. B. Lahmheit, Steifheit, Empfindlichkeit bei Berührung)",
    required: true,
    options: [o("Nein"), o("Ja"), o("Ich bin unsicher")],
  },
  {
    id: "g2_details",
    type: "textarea",
    label: "Was beobachtest du, und seit wann?",
    required: true,
    showIf: { field: "g2", in: ["Ja", "Ich bin unsicher"] },
  },
  {
    id: "g3",
    type: "checkbox_group",
    label: "Impfungen & Vorsorge (Zutreffendes auswählen)",
    required: true,
    exclusiveOptions: ["Nichts davon", "Weiss ich nicht"],
    options: [
      o("Grundimmunisierung und Impfungen aktuell"),
      o("Regelmässige Parasitenprophylaxe (Zecken, Flöhe, Entwurmung)"),
      o("Beim Tierarzt durchgecheckt (letzte 12 Monate)"),
      o("Nichts davon"),
      o("Weiss ich nicht"),
    ],
  },
  {
    id: "g4",
    type: "select",
    label: "Verhalten beim Tierarzt",
    required: true,
    placeholderOption: "Bitte wählen",
    options: [
      o("Entspannt"),
      o("Etwas nervös"),
      o("Sehr ängstlich"),
      o("Aggressiv oder abwehrend (Maulkorb nötig)"),
      o("War noch nie beim Tierarzt"),
    ],
  },
  {
    id: "g5",
    type: "checkbox_group",
    label: "Futterart",
    required: true,
    sonstigesOption: "Sonstiges",
    sonstigesFieldId: "g5_sonstiges",
    sonstigesRequired: true,
    options: [
      o("Trockenfutter"),
      o("Nassfutter"),
      o("Rohfütterung (BARF)"),
      o("Selbst gekocht"),
      o("Reste vom Tisch"),
      o("Sonstiges"),
    ],
  },
  {
    id: "g5_sonstiges",
    type: "text",
    label: "Sonstiges (Futterart)",
    required: true,
    showIf: { field: "g5", includes: "Sonstiges" },
  },
  {
    id: "g5_zeiten",
    type: "text",
    label: "Wie oft und wann fütterst du? Setzt du Leckerli im Training ein?",
  },
  {
    id: "g6",
    type: "radio",
    label: "Futterallergien / -unverträglichkeiten?",
    required: true,
    options: [o("Nein"), o("Ja"), o("Verdacht")],
  },
  {
    id: "g6_details",
    type: "text",
    label: "Worauf reagiert {hund_name}?",
    required: true,
    showIf: { field: "g6", in: ["Ja", "Verdacht"] },
  },
  {
    id: "g7",
    type: "radio",
    label:
      "Verteidigt {hund_name} Futter, Kauartikel oder Spielzeug? (Ressourcenverteidigung)",
    required: true,
    options: [o("Nie"), o("Manchmal"), o("Oft")],
  },
  {
    id: "g7_was",
    type: "checkbox_group",
    label: "Was wird verteidigt?",
    required: true,
    showIf: { field: "g7", in: ["Manchmal", "Oft"] },
    options: [
      o("Napf"),
      o("Kauartikel"),
      o("Spielzeug"),
      o("Gefundenes"),
      o("Sonstiges"),
    ],
  },
  {
    id: "g7_wie",
    type: "text",
    label: "Wie zeigt {hund_name} das? (z. B. Erstarren, Knurren, Schnappen)",
    showIf: { field: "g7", in: ["Manchmal", "Oft"] },
  },
];

export const alltagFields: FieldDef[] = [
  {
    id: "l1",
    type: "select",
    label: "Wohnsituation",
    required: true,
    placeholderOption: "Bitte wählen",
    options: [
      o("Wohnung ohne Balkon/Garten"),
      o("Wohnung mit Balkon oder Garten"),
      o("Haus mit Garten"),
      o("Bauernhof oder ländliches Anwesen"),
    ],
  },
  {
    id: "l1_umfeld",
    type: "radio",
    label: "Umgebung",
    required: true,
    options: [o("Stadt"), o("Agglomeration"), o("Land")],
  },
  {
    id: "l2",
    type: "checkbox_group",
    label: "Weitere Personen und Tiere im Haushalt",
    required: true,
    exclusiveOptions: ["Niemand, nur ich und {hund_name}"],
    options: [
      o("Weitere Erwachsene"),
      o("Kinder"),
      o("Andere Hunde"),
      o("Katzen"),
      o("Andere Tiere"),
      o("Niemand, nur ich und {hund_name}"),
    ],
  },
  {
    id: "l2_kinder",
    type: "text",
    label: "Wie alt sind die Kinder?",
    required: true,
    showIf: { field: "l2", includes: "Kinder" },
  },
  {
    id: "l2_tiere",
    type: "text",
    label:
      "Welche Tiere, und wie kommt {hund_name} mit ihnen klar?",
    showIf: {
      field: "l2",
      includesAny: ["Andere Hunde", "Katzen", "Andere Tiere"],
    },
  },
  {
    id: "l3_dauer",
    type: "select",
    label: "Dauer pro Tag (alle Spaziergänge zusammen)",
    required: true,
    placeholderOption: "Bitte wählen",
    options: [
      o("Unter 1 Std."),
      o("1–2 Std."),
      o("2–3 Std."),
      o("Über 3 Std."),
    ],
  },
  {
    id: "l3_orte",
    type: "checkbox_group",
    label: "Wo seid ihr meist unterwegs?",
    required: true,
    options: [
      o("Quartier"),
      o("Wald und Feld"),
      o("Hundewiese"),
      o("Stadt"),
      o("Ausflüge mit dem Auto"),
    ],
  },
  {
    id: "l4",
    type: "checkbox_group",
    label: "Beschäftigung und Auslastung",
    required: true,
    exclusiveOptions: ["Kaum zusätzliche Beschäftigung"],
    options: [
      o("Nasenarbeit/Suchspiele"),
      o("Spielen (Ball, Zerren etc.)"),
      o("Hundesport"),
      o("Trick- oder Kopfarbeit"),
      o("Kauartikel"),
      o("Hundekontakte oder Hundetreffen"),
      o("Kaum zusätzliche Beschäftigung"),
    ],
  },
  {
    id: "l5",
    type: "select",
    label:
      "Alleinbleiben: Wie lange ist {hund_name} an einem normalen Tag allein?",
    required: true,
    placeholderOption: "Bitte wählen",
    options: [
      o("Fast nie"),
      o("Bis 2 Std."),
      o("2–4 Std."),
      o("4–6 Std."),
      o("Über 6 Std."),
    ],
  },
  {
    id: "l5_verhalten",
    type: "radio",
    label: "Wie kommt {hund_name} damit klar?",
    required: true,
    showIf: { field: "l5", notEquals: "Fast nie" },
    options: [
      o("Völlig entspannt"),
      o("Etwas unruhig"),
      o("Bellt, jault oder zerstört etwas"),
      o("Weiss ich nicht"),
    ],
  },
];

export const verhaltenFields: FieldDef[] = [
  {
    id: "v1",
    type: "checkbox_group",
    label:
      "Was bereitet dir mit {hund_name} aktuell Sorgen oder Schwierigkeiten?",
    required: true,
    exclusiveOptions: [BASE_TRAINING_OPTION],
    sonstigesOption: "Sonstiges",
    sonstigesFieldId: "v1_sonstiges",
    sonstigesRequired: true,
    options: [
      o("Ziehen an der Leine"),
      o("Aggression gegenüber Hunden"),
      o("Aggression gegenüber Menschen"),
      o("Angst oder Unsicherheit"),
      o("Jagdverhalten"),
      o("Schlechter Rückruf"),
      o("Alleinbleiben"),
      o("Übermässiges Bellen"),
      o("Unsauberkeit"),
      o("Anspringen"),
      o("Ressourcenverteidigung"),
      o("Sonstiges"),
      o(BASE_TRAINING_OPTION),
    ],
  },
  {
    id: "v1_sonstiges",
    type: "textarea",
    label: "Was genau?",
    required: true,
    placeholder: "Beschreibe kurz das Thema, das dich beschäftigt.",
    showIf: { field: "v1", includes: "Sonstiges" },
  },
  {
    id: "v_behaviors",
    type: "behavior_details",
    label: "Details pro Thema",
    showIf: { behaviorDetailPath: true },
  },
  {
    id: "v8",
    type: "radio",
    label:
      "Hat {hund_name} schon einmal einen Menschen oder ein Tier gebissen oder verletzt?",
    required: true,
    helpText:
      "Diese Angabe hilft mir, euer Training sicher zu planen.",
    showIf: { v8Visible: true },
    options: [o("Nein"), o("Ja")],
  },
  {
    id: "v8_details",
    type: "textarea",
    label:
      "Was ist passiert? (Wer war betroffen, wie schwer, gab es Konsequenzen?)",
    required: true,
    showIf: { field: "v8", equals: "Ja" },
  },
];

export const trainingFields: FieldDef[] = [
  {
    id: "t1",
    type: "radio",
    label: "Frühere Hundeschule / Training?",
    required: true,
    options: [o("Ja"), o("Nein")],
  },
  {
    id: "t1_details",
    type: "textarea",
    label:
      "Wo, wie lange, und was habt ihr gelernt? Wie hast du das Training erlebt?",
    required: true,
    showIf: { field: "t1", equals: "Ja" },
  },
  {
    id: "t3",
    type: "checkbox_group",
    label: "Hilfsmittel und Methoden im Training / auf Spaziergängen",
    required: true,
    sonstigesOption: "Sonstiges",
    sonstigesFieldId: "t3_sonstiges",
    options: [
      o("Leckerli"),
      o("Spielzeug"),
      o("Clicker oder Markerwort"),
      o("Geschirr"),
      o("Halsband"),
      o("Schleppleine"),
      o("Maulkorb"),
      o("Stimme (Korrekturen oder Schimpfen)"),
      o("Sonstiges"),
    ],
  },
  {
    id: "t3_sonstiges",
    type: "text",
    label: "Sonstiges (Hilfsmittel)",
    showIf: { field: "t3", includes: "Sonstiges" },
  },
  {
    id: "t4",
    type: "textarea",
    label:
      "Wie reagierst du normalerweise, wenn {hund_name} das Verhalten zeigt?",
    required: true,
    placeholder:
      "z. B. Ich bleibe stehen, gebe ein Leckerli, werde nervös oder ziehe an der Leine.",
    helpText:
      "Hier gibt es keine falsche Antwort, ich möchte nur verstehen, wie ihr aktuell damit umgeht.",
    showIf: { behaviorDetailPath: true },
  },
  {
    id: "t6",
    type: "textarea",
    label:
      "Was wünschst du dir vom Training? Was soll in 3 Monaten anders sein?",
    required: true,
    minLength: 20,
    placeholder:
      "z. B. Ich möchte entspannt an anderen Hunden vorbeigehen können.",
  },
];
