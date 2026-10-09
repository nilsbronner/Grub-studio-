"use client";

import Link from "next/link";
import { useRef } from "react";
import { cx } from "@/lib/cx";
import { useVimeoPlaying } from "@/lib/use-vimeo-playing";

export function HeroShowreel({
  vimeoId,
  catchphrase,
}: {
  vimeoId: string;
  catchphrase: string;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const loaded = useVimeoPlaying(iframeRef, true);

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden border-b border-border sm:aspect-video">
      <div className="absolute inset-0 bg-[#0b0b0a]" />
      <iframe
        ref={iframeRef}
        src={`https://player.vimeo.com/video/${vimeoId}?background=1&autoplay=1&loop=1&muted=1&controls=0`}
        className={cx(
          "pointer-events-none absolute inset-0 h-full w-full transition-opacity duration-700 ease-out",
          loaded ? "opacity-100" : "opacity-0"
        )}
        allow="autoplay; fullscreen"
        title="Showreel Grub Studio"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/10" />

      <div className="relative flex h-full flex-col justify-end px-5 pb-10 sm:px-8 sm:pb-14">
        <div className="mx-auto w-full max-w-7xl">
          <p className="max-w-2xl text-2xl font-medium leading-tight tracking-tight sm:text-4xl">
            {catchphrase}
          </p>
          <div className="mt-6 flex items-center gap-6">
            <Link
              href="/travaux"
              className="border border-border bg-background/60 px-4 py-2 text-sm uppercase tracking-[0.15em] backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
            >
              Voir nos réalisations
            </Link>
            <Link
              href="/contact"
              className="text-sm uppercase tracking-[0.15em] text-foreground/80 transition-colors hover:text-foreground"
            >
              Parler de votre projet →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
