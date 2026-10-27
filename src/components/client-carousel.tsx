"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { coverImage, type Project } from "@/lib/content/projects";
import { useDragScroll } from "@/lib/use-drag-scroll";
import { useMounted } from "@/lib/use-mounted";
import { cx } from "@/lib/cx";

function LogoCard({ project }: { project: Project }) {
  const image = coverImage(project);
  return (
    <Link
      href={`/travaux/${project.slug}`}
      className="group relative h-40 w-60 shrink-0 select-none overflow-hidden rounded-xl border border-border"
      style={
        image
          ? undefined
          : {
              backgroundImage: `linear-gradient(160deg, ${project.accent} 0%, #0b0b0a 85%)`,
            }
      }
    >
      {image && (
        <Image
          src={image}
          alt=""
          fill
          aria-hidden
          sizes="240px"
          className="scale-110 object-cover opacity-90 blur-[1px] brightness-[0.55] transition-transform duration-700 ease-out group-hover:scale-[1.16]"
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-black/35" />

      {project.logo && (
        <div
          className={cx(
            "absolute left-4 top-4 flex h-11 items-center justify-center rounded-lg px-3",
            project.logoOnDark ? "bg-black/85" : "bg-white"
          )}
        >
          <div className="relative h-7 w-24">
            <Image
              src={project.logo}
              alt={project.client}
              fill
              sizes="96px"
              className="object-contain"
            />
          </div>
        </div>
      )}

      <div className="absolute inset-x-3.5 bottom-3">
        <p className="text-[13px] font-semibold leading-tight text-white">
          {project.client}
        </p>
        <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.1em] text-white/60">
          {project.sector}
        </p>
      </div>
    </Link>
  );
}

/** One continuously auto-scrolling row of logo cards — same scrollLeft/rAF mechanism as the video marquees, so drag and pause-on-hover behave identically. */
function LogoRow({
  projects,
  reverse,
  speed,
}: {
  projects: Project[];
  reverse: boolean;
  speed: number;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const setWidth = useRef(0);
  const { dragging, handlers } = useDragScroll(scrollerRef);

  // The seamless loop needs a second, duplicate copy of the row in the DOM
  // to scroll into — but server-rendering that duplicate means every client
  // logo (and its link to /travaux/<slug>) appears twice in the HTML a
  // crawler sees. Rendering just the one real copy until the component has
  // mounted, then adding the clone marked `inert` (out of the a11y tree and
  // tab order, same effect as "aria-hidden after hydration"), keeps SSR
  // markup to one copy of each link while the loop still works for visitors.
  const mounted = useMounted();

  const loop = mounted ? [...projects, ...projects] : projects;

  useEffect(() => {
    if (!mounted) return;
    const el = scrollerRef.current;
    if (!el) return;

    function measure() {
      if (el) setWidth.current = el.scrollWidth / 2;
    }
    measure();
    window.addEventListener("resize", measure);

    let floatPos = reverse ? setWidth.current : 0;
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
  }, [projects, dragging, reverse, speed, mounted]);

  return (
    <div
      ref={scrollerRef}
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      {...handlers}
      className="no-scrollbar -mx-5 flex cursor-grab gap-4 overflow-x-auto px-5 pb-1 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] [touch-action:pan-x] active:cursor-grabbing sm:-mx-8 sm:px-8"
    >
      {loop.map((project, i) =>
        i < projects.length ? (
          <LogoCard key={`${project.slug}-${i}`} project={project} />
        ) : (
          <div key={`${project.slug}-${i}`} inert className="contents">
            <LogoCard project={project} />
          </div>
        )
      )}
    </div>
  );
}

export function ClientCarousel({ projects }: { projects: Project[] }) {
  const mid = Math.ceil(projects.length / 2);
  const rowA = projects.slice(0, mid);
  const rowB = projects.slice(mid);

  return (
    <div className="flex flex-col gap-4">
      <LogoRow projects={rowA} reverse={false} speed={0.4} />
      <LogoRow projects={rowB.length > 0 ? rowB : rowA} reverse={true} speed={0.35} />
    </div>
  );
}
