"use client";

import { useEffect, useRef, useState } from "react";
import { cx } from "@/lib/cx";
import type { Short } from "@/lib/content/shorts";

export function ShortTile({
  short,
  className,
}: {
  short: Short;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

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
      {inView && (
        <iframe
          src={`https://player.vimeo.com/video/${short.vimeoId}?background=1&autoplay=1&loop=1&muted=1&controls=0`}
          className="absolute inset-0 h-full w-full"
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
