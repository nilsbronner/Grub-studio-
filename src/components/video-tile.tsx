"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cx } from "@/lib/cx";
import type { Project } from "@/lib/content/projects";
import { categoryLabel } from "@/lib/content/categories";

export function VideoTile({
  project,
  className,
  priority,
}: {
  project: Project;
  className?: string;
  priority?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [inView, setInView] = useState(false);
  const [embedLoaded, setEmbedLoaded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !project.vimeoId) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "240px 0px", threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [project.vimeoId]);

  const showEmbed = inView && Boolean(project.vimeoId);

  return (
    <Link
      ref={ref}
      href={`/travaux/${project.slug}`}
      data-cursor="voir"
      className={cx(
        "group relative block aspect-video overflow-hidden bg-cover bg-center",
        className
      )}
      style={
        project.image
          ? undefined
          : {
              backgroundImage: `linear-gradient(160deg, ${project.accent} 0%, #0b0b0a 85%)`,
            }
      }
    >
      {project.image && (
        <Image
          src={project.image}
          alt=""
          fill
          priority={priority}
          sizes="(min-width: 1024px) 32vw, (min-width: 640px) 45vw, 85vw"
          className={cx(
            "object-cover transition-opacity duration-500 ease-out",
            embedLoaded && "opacity-0"
          )}
        />
      )}

      {showEmbed && project.vimeoId && (
        <iframe
          key={project.vimeoId}
          src={`https://player.vimeo.com/video/${project.vimeoId}?background=1&autoplay=1&loop=1&muted=1&controls=0`}
          className="absolute inset-0 h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          style={{ backgroundColor: "var(--background)" }}
          allow="autoplay; fullscreen"
          loading="lazy"
          title={project.title}
          onLoad={() => setEmbedLoaded(true)}
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

      <div className="pointer-events-none absolute inset-0 border border-white/0 transition-colors duration-300 group-hover:border-white/20" />
    </Link>
  );
}
