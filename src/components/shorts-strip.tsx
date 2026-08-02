"use client";

import { useEffect, useRef, useState } from "react";
import { ShortTile } from "@/components/short-tile";
import { useDragScroll } from "@/lib/use-drag-scroll";
import { shorts } from "@/lib/content/shorts";

export function ShortsStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const { dragging, handlers } = useDragScroll(ref);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const setWidth = useRef(0);

  const loop = [...shorts, ...shorts, ...shorts];

  useEffect(() => {
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
  }, [dragging]);

  return (
    <div
      ref={ref}
      {...handlers}
      className="no-scrollbar flex cursor-grab gap-4 overflow-x-auto pb-2 active:cursor-grabbing"
    >
      {loop.map((short, i) => (
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
      ))}
    </div>
  );
}
