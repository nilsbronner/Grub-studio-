/**
 * Meta (Facebook/Instagram) pixel helpers.
 *
 * The pixel is only loaded after the visitor accepts advertising cookies
 * (see MetaPixel). Every helper here is a safe no-op otherwise.
 */

export const META_PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_ID || "1421852566770545";

export const CONSENT_KEY = "grub-consent-ads";
export const CONSENT_EVENT = "grub:consent-change";
export const CONSENT_OPEN_EVENT = "grub:consent-open";

export type ConsentValue = "granted" | "denied";

type Fbq = ((...args: unknown[]) => void) & { queue?: unknown[] };

declare global {
  interface Window {
    fbq?: Fbq;
  }
}

export function readConsent(): ConsentValue | null {
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function writeConsent(value: ConsentValue) {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // Private mode / blocked storage: the choice only lasts for this page.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}

/** Re-open the consent banner (footer "Cookies" link). */
export function openConsentBanner() {
  window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
}

/** Fire a standard Meta event (Lead, Schedule, ViewContent…). */
export function trackPixel(event: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("track", event, params);
}
