/**
 * Grub Motion color law: one accent per service, never an arbitrary cycle.
 * Canonical four (homeHighlights) map 1:1 to the design system's service
 * table; the longer /services case labels bucket into the closest one.
 * Purple uses the lifted tint (--accent-purple-lift) since it only ever
 * appears here as a thin bar, and plain purple disappears under 44px on ink.
 */
const SERVICE_COLORS: Record<string, string> = {
  "Films de marque": "var(--accent-purple-lift)",
  "Motion design intégré": "var(--accent-purple-lift)",
  "Contenu réseaux": "var(--accent-pink)",
  "Contenu réseaux & Ads": "var(--accent-pink)",
  "Interviews multilingues": "var(--accent-pink)",
  "Événementiel": "var(--accent-yellow)",
  "Lancement & activation événementielle": "var(--accent-yellow)",
  "Couverture événementielle": "var(--accent-yellow)",
  "Photo d'entreprise": "var(--accent-cyan)",
  "Catalogue & photo produit": "var(--accent-cyan)",
  "Reportage chantier & entreprise": "var(--accent-cyan)",
};

export function serviceColor(service: string): string {
  return SERVICE_COLORS[service] ?? "var(--accent-cyan)";
}
