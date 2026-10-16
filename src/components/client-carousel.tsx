"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { coverImage, type Project } from "@/lib/content/projects";
import { useDragScroll } from "@/lib/use-drag-scroll";
import { cx } from "@/lib/cx";

/**
 * Auto-scrolling marquee of client cards, each built around its logo shown
 * large (the brand is the headline, the project photo is atmosphere behind
 * it) — mirrors the loop/drag mechanics already used for the video rows.
 */
export function ClientCarousel({ projects }: { projects: Project[] }) {
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

    let floatPos = 0;
    let wasActive = false;
    let raf = 0;
    const speed = 0.5;

    function tick() {
      const active = !paused.current && !dragging.current;
      if (el && active) {
        if (!wasActive) floatPos = el.scrollLeft;
        floatPos += speed;
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
  }, [dragging]);

  return (
    <div
      ref={scrollerRef}
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      {...handlers}
      className="no-scrollbar flex cursor-grab gap-4 overflow-x-auto pb-2 [touch-action:pan-x] active:cursor-grabbing"
    >
      {loop.map((project, i) => {
        const image = coverImage(project);
        return (
          <Link
            key={`${project.slug}-${i}`}
            href={`/travaux/${project.slug}`}
            className="group relative aspect-[4/5] w-[70vw] shrink-0 select-none snap-start overflow-hidden border border-border transition-colors duration-300 hover:border-accent/60 sm:w-[320px]"
            style={
              image
                ? undefined
                : {
                    backgroundImage: `linear-gradient(160deg, ${project.accent} 0%, #0b0b0a 85%)`,
                  }
            }
          >
            {image && (
              <>
                <Image
                  src={image}
                  alt=""
                  fill
                  aria-hidden
                  sizes="(min-width: 640px) 320px, 70vw"
                  className="scale-110 object-cover opacity-50 blur-2xl"
                />
                <div className="pointer-events-none absolute inset-0 bg-black/35" />
              </>
            )}

            {project.logo ? (
              <div className="pointer-events-none absolute inset-x-6 top-10 flex items-center justify-center sm:inset-x-8">
                <div
                  className={cx(
                    "flex h-20 w-full max-w-[220px] items-center justify-center rounded-xl px-6 py-4 shadow-lg transition-transform duration-500 ease-out group-hover:scale-[1.04] sm:h-24",
                    project.logoOnDark ? "bg-black/85" : "bg-white"
                  )}
                >
                  <div className="relative h-full w-full">
                    <Image
                      src={project.logo}
                      alt={project.client}
                      fill
                      sizes="220px"
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="pointer-events-none absolute inset-x-6 top-10 flex items-center justify-center text-center sm:inset-x-8">
                <p className="text-2xl font-semibold tracking-tight text-white">
                  {project.client}
                </p>
              </div>
            )}

            {/* Bottom scrim fading up into the full, uncropped photo. */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-4">
              <p className="text-lg font-semibold leading-tight tracking-tight text-white">
                {project.client}
              </p>
              <p className="mt-1 text-xs font-mono uppercase tracking-[0.15em] text-white/60">
                {project.sector}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
