"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cx } from "@/lib/cx";

export function FloatingContactCta() {
  const pathname = usePathname();
  if (pathname === "/contact") return null;

  return (
    <Link
      href="/contact"
      className={cx(
        "group fixed bottom-6 right-5 z-40 flex items-center gap-3 border border-accent bg-accent px-6 py-4 text-sm font-mono uppercase tracking-[0.15em] text-white shadow-lg shadow-accent/30 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-purple hover:bg-accent-purple hover:pr-7 sm:bottom-8 sm:right-8"
      )}
    >
      <span
        className="h-2 w-2 rounded-full bg-white transition-transform duration-300 group-hover:scale-150"
        aria-hidden
      />
      Discutons de votre projet
    </Link>
  );
}
