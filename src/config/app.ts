/**
 * Demo-Modus: `true` = keine Pflichtfelder (schnelles Testen).
 * Für echte Kund:innen auf `false` setzen.
 */
export const DEMO_MODE = true;

export function isValidationRequired(fieldRequired?: boolean): boolean {
  return !DEMO_MODE && Boolean(fieldRequired);
}
