"use client";

import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import { PAGE_ACCENT_CLASSES, type PageAccentKey } from "@/lib/page-accent";
import { trackPixel } from "@/lib/meta-pixel";

export const BOOKING_URL =
  "https://calendly.com/grub-studio/parlons-de-votre-projet";

/** Primary "book a call" button for the ad landing pages — sends a Meta "Schedule" event on click. */
export function BookingButton({
  accent,
  source,
  children = "Réserver un appel de 15 min",
  className,
}: {
  accent: PageAccentKey;
  source: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackPixel("Schedule", { content_name: source })}
      className={cx(
        "group inline-flex items-center gap-3 border px-5 py-3 text-sm font-mono uppercase tracking-[0.15em] transition-all duration-300 hover:-translate-y-0.5",
        PAGE_ACCENT_CLASSES[accent].solid,
        PAGE_ACCENT_CLASSES[accent].hover,
        className
      )}
    >
      {children}
      <span className="transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </a>
  );
}

/** Vertical (9:16) Vimeo player with sound controls — the offer's hero video. */
export function VerticalVideo({
  vimeoId,
  hash,
  title,
}: {
  vimeoId: string;
  hash: string;
  title: string;
}) {
  return (
    <div className="relative mx-auto aspect-[9/16] w-full max-w-[320px] overflow-hidden border border-border bg-black">
      <iframe
        src={`https://player.vimeo.com/video/${vimeoId}?h=${hash}&badge=0&autopause=0&dnt=1`}
        title={title}
        allow="autoplay; fullscreen; picture-in-picture"
        loading="lazy"
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}
