"use client";

import { useRef } from "react";
import { ShortTile } from "@/components/short-tile";
import { useDragScroll } from "@/lib/use-drag-scroll";
import { shorts } from "@/lib/content/shorts";

export function ShortsStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const { handlers } = useDragScroll(ref);

  return (
    <div
      ref={ref}
      {...handlers}
      className="no-scrollbar flex cursor-grab gap-4 overflow-x-auto pb-2 active:cursor-grabbing"
    >
      {shorts.map((short) => (
        <ShortTile
          key={short.slug}
          short={short}
          className="w-[46vw] shrink-0 select-none sm:w-[220px]"
        />
      ))}
    </div>
  );
}
