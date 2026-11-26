"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { GrubChat } from "@/components/grub-chat";
import { localeFromPathname } from "@/lib/content/locale-nav";

// Dedicated ad-campaign landing pages ship their own compact header and
// footer and skip the main site's — a single conversion path, no detour
// via the site nav or the chat widget.
const BARE_PREFIXES = ["/evenementiel/rdv"];

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const bare = BARE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname?.startsWith(`${prefix}/`)
  );

  // The root <html lang> stays "fr" (it can't vary per-route from a single
  // root layout) — this overrides it for the en/de subtree, which browsers
  // and screen readers resolve from the nearest ancestor `lang`, not just
  // the document root.
  const locale = localeFromPathname(pathname);

  if (bare) return <>{children}</>;

  return (
    <>
      <SiteHeader />
      <main className="flex-1" lang={locale === "fr" ? undefined : locale}>
        {children}
      </main>
      <SiteFooter />
      <GrubChat />
    </>
  );
}
