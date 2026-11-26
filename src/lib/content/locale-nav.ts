export type SiteLocale = "fr" | "en" | "de";

export const LOCALES: SiteLocale[] = ["fr", "en", "de"];

/** The 4 page slugs translated so far — used to build the language switcher without 404ing on pages that don't exist yet in en/de. */
export const TRANSLATED_SLUGS = ["", "services", "travaux", "contact"] as const;

/** Reads the locale off a pathname (`/en/services` -> "en"); defaults to "fr" (unprefixed). */
export function localeFromPathname(pathname: string | null): SiteLocale {
  if (pathname?.startsWith("/en/") || pathname === "/en") return "en";
  if (pathname?.startsWith("/de/") || pathname === "/de") return "de";
  return "fr";
}

/** Strips a known locale prefix off a pathname, returning the fr-equivalent path (e.g. `/en/services` -> `/services`). */
export function stripLocalePrefix(pathname: string): string {
  if (pathname === "/en" || pathname === "/de") return "/";
  if (pathname.startsWith("/en/")) return pathname.slice(3);
  if (pathname.startsWith("/de/")) return pathname.slice(3);
  return pathname;
}

/** Builds the href for a given locale from an fr-rooted path (`/services`, "en") -> `/en/services`. */
export function localizeHref(frPath: string, locale: SiteLocale): string {
  if (locale === "fr") return frPath;
  return frPath === "/" ? `/${locale}` : `/${locale}${frPath}`;
}

type NavDict = {
  links: { href: string; label: string }[];
  cowork: string;
  menu: string;
  close: string;
};

export const NAV_DICT: Record<SiteLocale, NavDict> = {
  fr: {
    links: [
      { href: "/services", label: "Services" },
      { href: "/conseil", label: "Conseil" },
      { href: "/rush", label: "Rush" },
      { href: "/contact", label: "Contact" },
    ],
    cowork: "Grub Cowork",
    menu: "Menu",
    close: "Fermer",
  },
  en: {
    // /rush and /conseil aren't translated yet — left out of the en/de nav
    // so it never links to an untranslated French page.
    links: [
      { href: "/services", label: "Services" },
      { href: "/contact", label: "Contact" },
    ],
    cowork: "Grub Cowork",
    menu: "Menu",
    close: "Close",
  },
  de: {
    links: [
      { href: "/services", label: "Leistungen" },
      { href: "/contact", label: "Kontakt" },
    ],
    cowork: "Grub Cowork",
    menu: "Menü",
    close: "Schließen",
  },
};

type FooterDict = {
  legalLabel: string;
  confidentialityLabel: string;
  networksLabel: string;
};

export const FOOTER_DICT: Record<SiteLocale, FooterDict> = {
  fr: {
    legalLabel: "Mentions légales",
    confidentialityLabel: "Confidentialité",
    networksLabel: "Réseaux",
  },
  en: {
    legalLabel: "Legal notice",
    confidentialityLabel: "Privacy",
    networksLabel: "Social",
  },
  de: {
    legalLabel: "Impressum",
    confidentialityLabel: "Datenschutz",
    networksLabel: "Social Media",
  },
};

export const LOCALE_SWITCH_LABEL: Record<SiteLocale, string> = {
  fr: "FR",
  en: "EN",
  de: "DE",
};
