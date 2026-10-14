"use client";

import Link from "next/link";
import { useRef } from "react";
import { cx } from "@/lib/cx";
import { useVimeoPlaying } from "@/lib/use-vimeo-playing";
import { PAGE_ACCENT_CLASSES } from "@/lib/page-accent";

export function HeroShowreel({
  vimeoId,
  catchphrase,
}: {
  vimeoId: string;
  catchphrase: string;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { playing: loaded, blocked, retry } = useVimeoPlaying(iframeRef, true);

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden border-b border-border sm:aspect-video">
      <div className="absolute inset-0 bg-[#0b0b0a]" />
      <iframe
        ref={iframeRef}
        src={`https://player.vimeo.com/video/${vimeoId}?background=1&autoplay=1&loop=1&muted=1&controls=0`}
        className={cx(
          // Vimeo's own "background" mode just letterboxes the iframe box when
          // the container's aspect ratio doesn't match the source (e.g. the
          // portrait 4:5 hero on mobile vs a 16:9 showreel) — it never crops.
          // Oversizing the iframe against both the width and height axes and
          // centering it crops it to always cover the container, so there's
          // never a visible band whatever the breakpoint.
          "pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-full min-w-[177.78vh] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-700 ease-out",
          loaded ? "opacity-100" : "opacity-0"
        )}
        allow="autoplay; fullscreen"
        title="Showreel Grub Studio"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/10" />

      {blocked && (
        <button
          type="button"
          onClick={retry}
          aria-label="Lancer la vidéo"
          className="group absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white backdrop-blur-sm transition-colors hover:border-accent hover:text-accent"
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="ml-1 h-7 w-7"
            aria-hidden
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      )}

      <div className="relative flex h-full flex-col justify-end px-5 pb-10 sm:px-8 sm:pb-14">
        <div className="mx-auto w-full max-w-7xl">
          <p className="max-w-2xl text-2xl font-medium leading-tight tracking-tight sm:text-4xl">
            {catchphrase}
          </p>
          <div className="mt-6 flex items-center gap-6">
            <Link
              href="/travaux"
              className={cx(
                "border px-5 py-3 text-sm font-mono uppercase tracking-[0.15em] transition-all duration-300 hover:-translate-y-0.5",
                PAGE_ACCENT_CLASSES.pink.solid,
                PAGE_ACCENT_CLASSES.pink.hover
              )}
            >
              Voir nos réalisations
            </Link>
            <Link
              href="/contact"
              className="text-sm font-mono uppercase tracking-[0.15em] text-foreground/80 transition-colors hover:text-foreground"
            >
              Parler de votre projet →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
