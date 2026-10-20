"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CONSENT_EVENT,
  CONSENT_OPEN_EVENT,
  META_PIXEL_ID,
  readConsent,
  writeConsent,
  type ConsentValue,
} from "@/lib/meta-pixel";

function loadPixel(id: string) {
  if (window.fbq) return;
  /* Official Meta base code, unminified. */
  const fbq = function (...args: unknown[]) {
    const self = fbq as unknown as {
      callMethod?: (...a: unknown[]) => void;
      queue: unknown[];
    };
    if (self.callMethod) self.callMethod(...args);
    else self.queue.push(args);
  } as unknown as NonNullable<Window["fbq"]> & {
    push: unknown;
    loaded: boolean;
    version: string;
    queue: unknown[];
  };
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  window.fbq = fbq;
  (window as unknown as { _fbq: unknown })._fbq = fbq;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  window.fbq("init", id);
}

/**
 * Loads the Meta pixel once the visitor has accepted advertising cookies,
 * tracks a PageView on every client-side navigation, and shows the consent
 * banner when no choice has been recorded yet. Renders nothing at all when
 * NEXT_PUBLIC_META_PIXEL_ID is not configured.
 */
function subscribeConsent(onChange: () => void) {
  window.addEventListener(CONSENT_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CONSENT_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/** "unknown" during server render / before hydration, so the banner never flashes. */
const getServerConsent = () => "unknown" as const;

export function MetaPixel() {
  const pathname = usePathname();
  const consent = useSyncExternalStore(
    subscribeConsent,
    readConsent,
    getServerConsent
  );
  const [reopened, setReopened] = useState(false);
  const lastTracked = useRef<string | null>(null);

  useEffect(() => {
    const onOpen = () => setReopened(true);
    window.addEventListener(CONSENT_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!META_PIXEL_ID || consent !== "granted") return;
    loadPixel(META_PIXEL_ID);
    if (lastTracked.current !== pathname) {
      lastTracked.current = pathname;
      window.fbq?.("track", "PageView");
    }
  }, [consent, pathname]);

  const bannerOpen = consent === null || reopened;

  if (!META_PIXEL_ID || !bannerOpen) return null;

  const choose = (value: ConsentValue) => {
    writeConsent(value);
    setReopened(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Gestion des cookies"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-xl border border-border bg-background p-5 shadow-2xl sm:bottom-5"
    >
      <p className="text-sm leading-relaxed">
        Nous utilisons le pixel Meta pour mesurer l&rsquo;efficacité de nos
        publicités Facebook et Instagram. Il ne se charge que si vous
        l&rsquo;acceptez.{" "}
        <Link
          href="/politique-de-confidentialite#cookies"
          className="text-accent underline"
        >
          En savoir plus
        </Link>
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => choose("denied")}
          className="border border-border px-4 py-2 text-xs font-mono uppercase tracking-[0.15em] transition-colors hover:border-foreground"
        >
          Refuser
        </button>
        <button
          type="button"
          onClick={() => choose("granted")}
          className="border border-accent bg-accent px-4 py-2 text-xs font-mono uppercase tracking-[0.15em] text-white transition-colors hover:border-accent-purple hover:bg-accent-purple"
        >
          Accepter
        </button>
      </div>
    </div>
  );
}

/** Footer link to change the cookie choice later. */
export function CookieSettingsLink({ className }: { className?: string }) {
  if (!META_PIXEL_ID) return null;
  return (
    <>
      <button
        type="button"
        onClick={() => window.dispatchEvent(new Event(CONSENT_OPEN_EVENT))}
        className={className}
      >
        Cookies
      </button>
      <span aria-hidden>·</span>
    </>
  );
}
