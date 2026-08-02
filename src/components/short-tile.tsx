"use client";

import { useEffect, useRef, useState } from "react";
import Player from "@vimeo/player";
import { cx } from "@/lib/cx";
import type { Short } from "@/lib/content/shorts";
import { useVimeoPlaying } from "@/lib/use-vimeo-playing";

function SpeakerIcon({ muted }: { muted: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden
    >
      <path d="M4 9v6h4l5 4V5L8 9H4Z" />
      {muted ? (
        <path d="m16 9 5 6M21 9l-5 6" />
      ) : (
        <path d="M17.5 8.5a5 5 0 0 1 0 7M20 6a8.5 8.5 0 0 1 0 12" />
      )}
    </svg>
  );
}

export function ShortTile({
  short,
  isActive = false,
  dimmed = false,
  onActivate,
  className,
}: {
  short: Short;
  isActive?: boolean;
  dimmed?: boolean;
  onActivate?: () => void;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [inView, setInView] = useState(false);
  const embedLoaded = useVimeoPlaying(iframeRef, inView);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "200px 0px", threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = iframeRef.current;
    if (!inView || !el) return;
    const player = new Player(el);
    player.setMuted(!isActive).catch(() => {});
    return () => {
      player.destroy().catch(() => {});
    };
  }, [inView, isActive]);

  return (
    <div
      ref={ref}
      className={cx(
        "group relative aspect-[9/16] overflow-hidden border border-border bg-[#141412] transition-all duration-300",
        isActive && "z-10 scale-[1.03] border-accent",
        dimmed && "opacity-50",
        className
      )}
    >
      {inView && (
        <iframe
          ref={iframeRef}
          src={`https://player.vimeo.com/video/${short.vimeoId}?background=1&autoplay=1&loop=1&muted=1&controls=0`}
          className={cx(
            "absolute inset-0 h-full w-full transition-opacity duration-700 ease-out",
            embedLoaded ? "opacity-100" : "opacity-0"
          )}
          style={{ backgroundColor: "var(--background)" }}
          allow="autoplay; fullscreen"
          loading="lazy"
          title={short.title}
        />
      )}
      <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-black/10 to-transparent p-3">
        <p className="text-xs font-medium text-white">{short.title}</p>
      </div>

      {onActivate && (
        <button
          type="button"
          data-cursor="•"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onActivate();
          }}
          aria-label={isActive ? "Couper le son" : "Activer le son"}
          className={cx(
            "absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full border transition-colors duration-200",
            isActive
              ? "border-accent bg-accent text-white"
              : "border-white/30 bg-black/40 text-white hover:border-white/70"
          )}
        >
          <SpeakerIcon muted={!isActive} />
        </button>
      )}
    </div>
  );
}
