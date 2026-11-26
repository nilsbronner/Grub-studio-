"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { contact } from "@/lib/content/contact";
import { CookieSettingsLink } from "@/components/meta-pixel";
import {
  FOOTER_DICT,
  NAV_DICT,
  localeFromPathname,
  localizeHref,
} from "@/lib/content/locale-nav";

const SWISS_NOTE: Record<"fr" | "en" | "de", string> = {
  fr: "Strasbourg, Grand Est & Suisse (avec Leadr)",
  en: "Strasbourg, Grand Est & Switzerland (with Leadr)",
  de: "Strasbourg, Grand Est & Schweiz (mit Leadr)",
};

export function SiteFooter() {
  const year = new Date().getFullYear();
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const footerDict = FOOTER_DICT[locale];
  const contactLabel = NAV_DICT[locale].links.find((l) =>
    l.href.endsWith("/contact")
  )?.label ?? "Contact";

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-12 sm:flex-row sm:items-end sm:justify-between sm:px-8">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted">
            {contact.coordinates.latitude} / {contact.coordinates.longitude}
          </p>
          <p className="mt-1 text-sm text-muted">{SWISS_NOTE[locale]}</p>
        </div>

        <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
          <a href={contact.phoneHref} className="hover:text-accent">
            {contact.phone}
          </a>
          <a href={`mailto:${contact.emailPro}`} className="hover:text-accent">
            {contact.emailPro}
          </a>
          <Link href={localizeHref("/contact", locale)} className="hover:text-accent">
            {contactLabel}
          </Link>
          <a
            href="https://le-grub.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent"
          >
            Grub Cowork
          </a>
          <a
            href="https://linktr.ee/nils.bronner"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent"
          >
            {footerDict.networksLabel}
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 pb-8 sm:px-8">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-6 text-xs text-muted">
          <Link href="/mentions-legales" className="hover:text-accent">
            {footerDict.legalLabel}
          </Link>
          <span aria-hidden>·</span>
          <Link href="/politique-de-confidentialite" className="hover:text-accent">
            {footerDict.confidentialityLabel}
          </Link>
          <span aria-hidden>·</span>
          <CookieSettingsLink className="hover:text-accent" />
          <span>© {year} LE GRUB SAS</span>
        </div>
      </div>
    </footer>
  );
}
