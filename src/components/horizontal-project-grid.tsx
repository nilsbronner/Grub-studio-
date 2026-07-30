"use client";

import { useRef } from "react";
import { VideoTile } from "@/components/video-tile";
import type { Project } from "@/lib/content/projects";

export function HorizontalProjectGrid({ projects }: { projects: Project[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollByAmount(amount: number) {
    scrollerRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:px-8"
      >
        {projects.map((project) => (
          <VideoTile
            key={project.slug}
            project={project}
            className="w-[85vw] shrink-0 snap-start sm:w-[45vw] lg:w-[32vw]"
          />
        ))}
      </div>

      <div className="mt-4 hidden justify-end gap-2 px-5 sm:flex sm:px-8">
        <button
          type="button"
          onClick={() => scrollByAmount(-480)}
          aria-label="Précédent"
          className="border border-border px-3 py-2 text-xs uppercase tracking-widest text-muted transition-colors hover:border-accent hover:text-foreground"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => scrollByAmount(480)}
          aria-label="Suivant"
          className="border border-border px-3 py-2 text-xs uppercase tracking-widest text-muted transition-colors hover:border-accent hover:text-foreground"
        >
          →
        </button>
      </div>
    </div>
  );
}
