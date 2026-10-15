"use client";

import Link from "next/link";
import { useRef } from "react";
import { cx } from "@/lib/cx";
import { useVideoPlaying } from "@/lib/use-video-playing";
import { PAGE_ACCENT_CLASSES } from "@/lib/page-accent";

export function HeroShowreel({
  webmSrc,
  mp4Src,
  catchphrase,
}: {
  /** Self-hosted WebM/VP9 rendition (e.g. `/videos/showreel.webm`) — listed first for browsers that support it. */
  webmSrc: string;
  /** Self-hosted MP4/H.264 rendition — universal fallback (notably Safari, which has no WebM support). */
  mp4Src: string;
  catchphrase: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { playing: loaded, blocked, retry } = useVideoPlaying(videoRef, true);

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden border-b border-border sm:aspect-video">
      <div className="absolute inset-0 bg-[#0b0b0a]" />
      <video
        ref={videoRef}
        className={cx(
          "absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out",
          loaded ? "opacity-100" : "opacity-0"
        )}
        muted
        loop
        playsInline
        preload="auto"
        aria-label="Showreel Grub Studio"
      >
        <source src={webmSrc} type="video/webm" />
        <source src={mp4Src} type="video/mp4" />
      </video>
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
