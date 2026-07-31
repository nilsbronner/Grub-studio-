"use client";

import { useEffect, useRef } from "react";
import { VideoTile } from "@/components/video-tile";
import { useDragScroll } from "@/lib/use-drag-scroll";
import type { Project } from "@/lib/content/projects";
import { cx } from "@/lib/cx";

export function VideoRow({
  projects,
  reverse = false,
  speed = 0.6,
  startOffset = 0,
  priorityFirst = false,
  tileClassName = "w-[85vw] sm:w-[45vw] lg:w-[30vw]",
}: {
  projects: Project[];
  reverse?: boolean;
  speed?: number;
  /** Fraction (0-1) of one loop's width to start scrolled into, so rows don't all show identical content. */
  startOffset?: number;
  priorityFirst?: boolean;
  tileClassName?: string;
}) {
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

    let floatPos = setWidth.current * startOffset;
    el.scrollLeft = Math.round(floatPos);

    let wasActive = false;
    let raf = 0;

    function tick() {
      const active = !paused.current && !dragging.current;
      if (el && active) {
        if (!wasActive) floatPos = el.scrollLeft;
        floatPos += reverse ? -speed : speed;
        if (setWidth.current) {
          if (floatPos >= setWidth.current) floatPos -= setWidth.current;
          if (floatPos < 0) floatPos += setWidth.current;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects, dragging, reverse, speed]);

  return (
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
          priority={priorityFirst && i < 2}
          className={cx("shrink-0 select-none", tileClassName)}
        />
      ))}
    </div>
  );
}
