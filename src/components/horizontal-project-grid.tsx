"use client";

import { useEffect, useRef } from "react";
import { VideoTile } from "@/components/video-tile";
import { useDragScroll } from "@/lib/use-drag-scroll";
import type { Project } from "@/lib/content/projects";

const AUTO_SCROLL_SPEED = 0.6; // px per frame, ~36px/s

export function HorizontalProjectGrid({ projects }: { projects: Project[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const setWidth = useRef(0);
  const { dragging, handlers } = useDragScroll(scrollerRef);

  const loop = [...projects, ...projects];

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    function measure() {
      if (el) setWidth.current = el.scrollWidth / 2;
    }
    measure();
    window.addEventListener("resize", measure);

    // scrollLeft rounds to an integer on read, so a sub-pixel-per-frame
    // speed needs its own float accumulator or it never advances.
    let floatPos = el.scrollLeft;
    let wasActive = false;
    let raf = 0;

    function tick() {
      const active = !paused.current && !dragging.current;
      if (el && active) {
        if (!wasActive) floatPos = el.scrollLeft;
        floatPos += AUTO_SCROLL_SPEED;
        if (setWidth.current && floatPos >= setWidth.current) {
          floatPos -= setWidth.current;
        }
        el.scrollLeft = Math.round(floatPos);
      }
      wasActive = active;
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
    };
  }, [projects, dragging]);

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        onMouseEnter={() => (paused.current = true)}
        onMouseLeave={() => (paused.current = false)}
        {...handlers}
        className="no-scrollbar flex cursor-grab gap-4 overflow-x-auto px-5 pb-2 active:cursor-grabbing sm:px-8"
      >
        {loop.map((project, i) => (
          <VideoTile
            key={`${project.slug}-${i}`}
            project={project}
            priority={i < 3}
            className="w-[85vw] shrink-0 select-none sm:w-[45vw] lg:w-[32vw]"
          />
        ))}
      </div>

      <div className="mt-4 hidden justify-end gap-2 px-5 sm:flex sm:px-8">
        <button
          type="button"
          onClick={() =>
            scrollerRef.current?.scrollBy({ left: -480, behavior: "smooth" })
          }
          aria-label="Précédent"
          className="border border-border px-3 py-2 text-xs uppercase tracking-widest text-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-foreground active:translate-y-0"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() =>
            scrollerRef.current?.scrollBy({ left: 480, behavior: "smooth" })
          }
          aria-label="Suivant"
          className="border border-border px-3 py-2 text-xs uppercase tracking-widest text-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-foreground active:translate-y-0"
        >
          →
        </button>
      </div>
    </div>
  );
}
