import type { ReactNode } from "react";

export function EyebrowPill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-muted">
      {children}
    </span>
  );
}
