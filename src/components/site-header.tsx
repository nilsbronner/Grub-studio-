"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cx } from "@/lib/cx";
import { LogoMark } from "@/components/logo-mark";

const links = [
  { href: "/travaux", label: "Travaux" },
  { href: "/studio", label: "Studio" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

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

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={() => setOpen(false)}
        >
          <LogoMark className="h-5 w-auto" />
          <span className="text-lg font-bold tracking-tight">Grub Studio</span>
        </Link>

        <nav className="hidden gap-8 text-sm uppercase tracking-[0.15em] sm:flex">
          {links.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cx(
                  "group relative py-1 transition-colors hover:text-foreground",
                  active ? "text-foreground" : "text-muted"
                )}
              >
                {link.label}
                <span
                  className={cx(
                    "absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100",
                    active && "scale-x-100"
                  )}
                />
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
        </nav>

        <button
          type="button"
          className="text-sm uppercase tracking-[0.15em] sm:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Menu"
        >
          {open ? "Fermer" : "Menu"}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-border px-5 py-4 text-sm uppercase tracking-[0.15em] sm:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cx(
                "py-2 transition-colors",
                pathname === link.href || pathname.startsWith(`${link.href}/`)
                  ? "text-foreground"
                  : "text-muted"
              )}
            >
              {link.label}
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
