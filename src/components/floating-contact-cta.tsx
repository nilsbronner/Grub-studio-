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
        "group fixed bottom-6 right-5 z-40 flex items-center gap-3 border border-border bg-background/90 px-6 py-4 text-sm uppercase tracking-[0.15em] text-foreground backdrop-blur transition-all duration-300 hover:border-accent hover:pr-7 sm:bottom-8 sm:right-8"
      )}
    >
      <span
        className="h-2 w-2 rounded-full bg-accent transition-transform duration-300 group-hover:scale-150"
        aria-hidden
      />
      Discutons de votre projet
    </Link>
  );
}
