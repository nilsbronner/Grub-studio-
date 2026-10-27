"use client";

import { useEffect, useRef, useState } from "react";
import { ShortTile } from "@/components/short-tile";
import { useDragScroll } from "@/lib/use-drag-scroll";
import { useMounted } from "@/lib/use-mounted";
import type { Short } from "@/lib/content/shorts";

export function ShortsStrip({ shorts }: { shorts: Short[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { dragging, handlers } = useDragScroll(ref);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const setWidth = useRef(0);

  // Same reasoning as the client logo marquee: the bidirectional loop needs
  // two extra, duplicate copies to scroll into, but server-rendering all
  // three means every short (and its lightbox trigger) appears 3x in the
  // HTML a crawler sees. Keep SSR to the one real copy; add the two clones,
  // marked `inert`, only once mounted on the client.
  const mounted = useMounted();

  const loop = mounted ? [...shorts, ...shorts, ...shorts] : shorts;

  useEffect(() => {
    if (!mounted) return;
    const el = ref.current;
    if (!el) return;

    function measure() {
      if (el) setWidth.current = el.scrollWidth / 3;
    }
    measure();
    el.scrollLeft = setWidth.current;
    window.addEventListener("resize", measure);

    let raf = 0;
    function tick() {
      if (el && setWidth.current && !dragging.current) {
        if (el.scrollLeft < setWidth.current * 0.5) {
          el.scrollLeft += setWidth.current;
        } else if (el.scrollLeft > setWidth.current * 1.5) {
          el.scrollLeft -= setWidth.current;
        }
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
    };
  }, [dragging, mounted]);

  return (
    <div
      ref={ref}
      {...handlers}
      className="no-scrollbar flex cursor-grab gap-4 overflow-x-auto pb-2 [touch-action:pan-x] active:cursor-grabbing"
    >
      {loop.map((short, i) => {
        const tile = (
          <ShortTile
            key={`${short.slug}-${i}`}
            short={short}
            isActive={activeIndex === i}
            dimmed={activeIndex !== null && activeIndex !== i}
            onActivate={() =>
              setActiveIndex((current) => (current === i ? null : i))
            }
            className="w-[46vw] shrink-0 select-none sm:w-[220px]"
          />
        );
        return i < shorts.length ? (
          tile
        ) : (
          <div key={`${short.slug}-${i}`} inert className="contents">
            {tile}
          </div>
        );
      })}
    </div>
  );
}
