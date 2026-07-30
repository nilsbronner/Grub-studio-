"use client";

import Link from "next/link";
import { useState } from "react";
import { cx } from "@/lib/cx";
import type { Project } from "@/lib/content/projects";
import { categoryLabel } from "@/lib/content/categories";

export function VideoTile({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const [hovered, setHovered] = useState(false);
  const showEmbed = hovered && Boolean(project.vimeoId);

  return (
    <Link
      href={`/travaux/${project.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cx(
        "group relative block aspect-video overflow-hidden bg-cover bg-center",
        className
      )}
      style={{
        backgroundImage: `linear-gradient(160deg, ${project.accent} 0%, #0b0b0a 85%)`,
      }}
    >
      {showEmbed && project.vimeoId && (
        <iframe
          key={project.vimeoId}
          src={`https://player.vimeo.com/video/${project.vimeoId}?background=1&autoplay=1&loop=1&muted=1&controls=0`}
          className="absolute inset-0 h-full w-full"
          allow="autoplay; fullscreen"
          loading="lazy"
          title={project.title}
        />
      )}

      <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-black/75 via-black/10 to-transparent p-4 opacity-100 transition-opacity duration-300 group-hover:opacity-0">
        <p className="text-sm font-medium text-white">{project.client}</p>
      </div>

      <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/20 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <p className="text-xs uppercase tracking-[0.15em] text-white/70">
          {project.sector}
        </p>
        <p className="text-sm font-medium text-white">{project.client}</p>
        <p className="mt-1 text-xs text-white/60">
          {categoryLabel(project.categories[0])}
        </p>
      </div>
    </Link>
  );
}
