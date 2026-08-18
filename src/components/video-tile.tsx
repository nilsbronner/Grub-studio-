"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cx } from "@/lib/cx";
import type { Project } from "@/lib/content/projects";
import { categoryLabel } from "@/lib/content/categories";
import { useVimeoPlaying } from "@/lib/use-vimeo-playing";
import { VideoLightbox } from "@/components/video-lightbox";

function PlayIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6"
      aria-hidden
    >
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

export function VideoTile({
  project,
  className,
  priority,
  lightbox = false,
}: {
  project: Project;
  className?: string;
  priority?: boolean;
  /** Open the video in a lightbox on click instead of linking to the project page — for the project's own hero video, which would otherwise link to itself. */
  lightbox?: boolean;
}) {
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [inView, setInView] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    const el = lightbox ? divRef.current : anchorRef.current;
    if (!el || !project.vimeoId) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "240px 0px", threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [project.vimeoId, lightbox]);

  const showEmbed = inView && Boolean(project.vimeoId);
  const embedLoaded = useVimeoPlaying(iframeRef, showEmbed);

  const tileClassName = cx(
    "group relative block aspect-video cursor-pointer overflow-hidden bg-cover bg-center",
    className
  );
  const tileStyle = project.image
    ? undefined
    : {
        backgroundImage: `linear-gradient(160deg, ${project.accent} 0%, #0b0b0a 85%)`,
      };

  const content = (
    <>
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
          ref={iframeRef}
          key={project.vimeoId}
          src={`https://player.vimeo.com/video/${project.vimeoId}?background=1&autoplay=1&loop=1&muted=1&controls=0`}
          className={cx(
            "pointer-events-none absolute inset-0 h-full w-full transition-[opacity,transform] duration-700 ease-out group-hover:scale-[1.04]",
            embedLoaded ? "opacity-100" : "opacity-0"
          )}
          style={{ backgroundColor: "var(--background)" }}
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

      <div className="pointer-events-none absolute inset-0 border border-white/0 transition-colors duration-300 group-hover:border-white/20" />
    </>
  );

  if (lightbox) {
    return (
      <div
        ref={divRef}
        role="button"
        tabIndex={0}
        onClick={() => setLightboxOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setLightboxOpen(true);
          }
        }}
        className={tileClassName}
        style={tileStyle}
      >
        {content}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm">
            <PlayIcon />
          </span>
        </div>
        {project.vimeoId && (
          <VideoLightbox
            vimeoId={project.vimeoId}
            title={project.title}
            open={lightboxOpen}
            onClose={() => setLightboxOpen(false)}
          />
        )}
      </div>
    );
  }

  return (
    <Link
      ref={anchorRef}
      href={`/travaux/${project.slug}`}
      className={tileClassName}
      style={tileStyle}
    >
      {content}
    </Link>
  );
}
