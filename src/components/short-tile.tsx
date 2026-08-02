"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cx } from "@/lib/cx";
import type { Short } from "@/lib/content/shorts";
import { useVimeoPlaying } from "@/lib/use-vimeo-playing";

export function ShortTile({
  short,
  className,
}: {
  short: Short;
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

  return (
    <div
      ref={ref}
      className={cx(
        "group relative aspect-[9/16] overflow-hidden border border-border bg-[#141412]",
        className
      )}
    >
      {short.image && (
        <Image
          src={short.image}
          alt=""
          fill
          sizes="220px"
          className={cx(
            "object-cover transition-opacity duration-500 ease-out",
            embedLoaded && "opacity-0"
          )}
        />
      )}

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
    </div>
  );
}
