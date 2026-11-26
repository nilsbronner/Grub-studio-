"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cx } from "@/lib/cx";
import { LogoMark } from "@/components/logo-mark";
import { AnimatedHighlight } from "@/components/animated-highlight";
import {
  LOCALES,
  LOCALE_SWITCH_LABEL,
  NAV_DICT,
  TRANSLATED_SLUGS,
  localeFromPathname,
  localizeHref,
  stripLocalePrefix,
} from "@/lib/content/locale-nav";

// Flip to false to pull /conseil from the nav without deleting the page —
// its place on the site is still under discussion (brief Oct 9, "en suspens").
// French-only: /conseil isn't translated yet, so it's never in the en/de nav.
const CONSEIL_NAV_ENABLED = true;

const cowork = { href: "https://www.le-grub.com/", label: "Grub Cowork" };

function ExternalLinkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3 w-3"
      aria-hidden
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const locale = localeFromPathname(pathname);
  const frPath = stripLocalePrefix(pathname ?? "/");
  const links = (
    locale === "fr" && !CONSEIL_NAV_ENABLED
      ? NAV_DICT.fr.links.filter((l) => l.href !== "/conseil")
      : NAV_DICT[locale].links
  ).map((l) => ({ ...l, href: localizeHref(l.href, locale) }));
  const homeHref = localizeHref("/", locale);

  return (
    <header className="sticky top-0 z-50 bg-transparent [filter:drop-shadow(0_1px_6px_rgb(0_0_0_/_0.8))]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link
          href={homeHref}
          className="flex items-center gap-2"
          onClick={() => setOpen(false)}
        >
          <LogoMark className="h-5 w-auto" />
          <span className="text-lg font-bold tracking-tight">Grub Studio</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-mono uppercase tracking-[0.15em] sm:flex">
          {links.map((link) => {
            const active =
              pathname === link.href || pathname?.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cx(
                  "group relative py-1 transition-colors hover:text-foreground",
                  active ? "text-foreground" : "text-muted"
                )}
              >
                {link.href.endsWith("/rush") ? (
                  <AnimatedHighlight>{link.label}</AnimatedHighlight>
                ) : (
                  <>
                    {link.label}
                    <span
                      className={cx(
                        "absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100",
                        active && "scale-x-100"
                      )}
                    />
                  </>
                )}
              </Link>
            );
          })}
          <a
            href={cowork.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 py-1 text-muted transition-colors hover:text-foreground"
          >
            {cowork.label}
            <ExternalLinkIcon />
          </a>
          <LanguageSwitch locale={locale} frPath={frPath} />
        </nav>

        <div className="flex items-center gap-4 sm:hidden">
          <LanguageSwitch locale={locale} frPath={frPath} compact />
          <button
            type="button"
            className="text-sm font-mono uppercase tracking-[0.15em]"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Menu"
          >
            {open ? NAV_DICT[locale].close : NAV_DICT[locale].menu}
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-border bg-background px-5 py-4 text-sm font-mono uppercase tracking-[0.15em] sm:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cx(
                "py-2 transition-colors",
                pathname === link.href || pathname?.startsWith(`${link.href}/`)
                  ? "text-foreground"
                  : "text-muted"
              )}
            >
              {link.href.endsWith("/rush") ? (
                <AnimatedHighlight>{link.label}</AnimatedHighlight>
              ) : (
                link.label
              )}
            </Link>
          ))}
          <a
            href={cowork.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 py-2 text-muted transition-colors"
          >
            {cowork.label}
            <ExternalLinkIcon />
          </a>
        </nav>
      )}
    </header>
  );
}

/** FR / EN / DE pills — only links to a locale a page is actually translated into, home otherwise. */
function LanguageSwitch({
  locale,
  frPath,
  compact = false,
}: {
  locale: ReturnType<typeof localeFromPathname>;
  frPath: string;
  compact?: boolean;
}) {
  const translated = (TRANSLATED_SLUGS as readonly string[]).includes(
    frPath === "/" ? "" : frPath.replace(/^\//, "")
  );

  return (
    <div
      className={cx(
        "flex items-center gap-1 text-xs",
        compact ? "" : "border-l border-border pl-5"
      )}
    >
      {LOCALES.map((l) => (
        <Link
          key={l}
          href={translated ? localizeHref(frPath, l) : localizeHref("/", l)}
          className={cx(
            "px-1 py-0.5 transition-colors hover:text-foreground",
            locale === l ? "text-foreground" : "text-muted"
          )}
        >
          {LOCALE_SWITCH_LABEL[l]}
        </Link>
      ))}
    </div>
  );
}
