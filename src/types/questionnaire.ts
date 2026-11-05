export const SECTION_SLUGS = [
  "allgemein",
  "gesundheit",
  "alltag",
  "verhalten",
  "training",
] as const;

export type SectionSlug = (typeof SECTION_SLUGS)[number];

export type ShowIfCondition =
  | { field: string; equals: string }
  | { field: string; notEquals: string }
  | { field: string; in: string[] }
  | { field: string; includes: string }
  | { field: string; includesAny: string[] }
  | { behaviorDetailPath: true }
  | { v8Visible: true };

export type FieldOption = {
  value: string;
  label: string;
};

type FieldBase = {
  id: string;
  label: string;
  required?: boolean;
  helpText?: string;
  showIf?: ShowIfCondition;
  /** Replace {hund_name} in label, help, placeholder (default true except early fields) */
  hundNameInText?: boolean;
};

export type TextFieldDef = FieldBase & {
  type: "text" | "email" | "tel" | "textarea";
  placeholder?: string;
  autoComplete?: string;
  minLength?: number;
};

export type NumberFieldDef = FieldBase & {
  type: "number";
  min?: number;
  max?: number;
  step?: number;
  maxDecimals?: number;
  placeholder?: string;
};

export type RadioFieldDef = FieldBase & {
  type: "radio";
  options: FieldOption[];
};

export type SelectFieldDef = FieldBase & {
  type: "select";
  options: FieldOption[];
  placeholderOption?: string;
};

export type CheckboxGroupFieldDef = FieldBase & {
  type: "checkbox_group";
  options: FieldOption[];
  exclusiveOptions?: string[];
  sonstigesOption?: string;
  sonstigesFieldId?: string;
  sonstigesRequired?: boolean;
};

export type ScaleFieldDef = FieldBase & {
  type: "scale";
  min: number;
  max: number;
  minLabel: string;
  maxLabel: string;
};

export type BehaviorDetailsFieldDef = FieldBase & {
  type: "behavior_details";
};

export type FieldDef =
  | TextFieldDef
  | NumberFieldDef
  | RadioFieldDef
  | SelectFieldDef
  | CheckboxGroupFieldDef
  | ScaleFieldDef
  | BehaviorDetailsFieldDef;

export type SectionConfig = {
  slug: SectionSlug;
  title: string;
  intro: string;
  fields: FieldDef[];
};

export type AnswerValue = string | string[];

export type AnswersRecord = Record<string, AnswerValue>;

export type PersistedState = {
  version: 1;
  answers: AnswersRecord;
  maxStepIndex: number;
};

export const BASE_TRAINING_OPTION =
  "Es gibt kein Problem, ich möchte Basistraining.";
