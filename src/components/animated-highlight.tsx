import type { ReactNode } from "react";

/** A hand-drawn-marker style underline that cycles through the Grub Studio accent palette. */
export function AnimatedHighlight({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block">
      {children}
      <span
        aria-hidden
        className="rush-highlight pointer-events-none absolute inset-x-0 -bottom-1 h-[3px] rounded-full"
      />
    </span>
  );
}
