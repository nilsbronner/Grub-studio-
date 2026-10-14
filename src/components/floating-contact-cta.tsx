"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cx } from "@/lib/cx";
import { getPageAccentKey, PAGE_ACCENT_CLASSES } from "@/lib/page-accent";

export function FloatingContactCta() {
  const pathname = usePathname();
  if (pathname === "/contact") return null;

  const accent = PAGE_ACCENT_CLASSES[getPageAccentKey(pathname)];

  return (
    <Link
      href="/contact"
      className={cx(
        "group fixed bottom-6 right-5 z-40 flex items-center gap-3 border px-6 py-4 text-sm font-mono uppercase tracking-[0.15em] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:pr-7 sm:bottom-8 sm:right-8",
        accent.solid,
        accent.hover,
        accent.shadow
      )}
    >
      <span
        className={cx(
          "h-2 w-2 rounded-full transition-transform duration-300 group-hover:scale-150",
          accent.dot
        )}
        aria-hidden
      />
      Discutons de votre projet
    </Link>
  );
}
