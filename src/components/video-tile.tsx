"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cx } from "@/lib/cx";
import { coverImage, type Project } from "@/lib/content/projects";
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
  trigger = "view",
}: {
  project: Project;
  className?: string;
  priority?: boolean;
  /** Open the video in a lightbox on click instead of linking to the project page — for the project's own hero video, which would otherwise link to itself. */
  lightbox?: boolean;
  /**
   * "view" (default) starts the preview as soon as the tile scrolls into
   * view — used for the small number of tiles in the home marquee and a
   * project's own hero. "hover" only loads the embed once the pointer
   * rests on the tile, so a full catalog grid doesn't run a dozen live
   * Vimeo players at once while scrolling.
   */
  trigger?: "view" | "hover";
}) {
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(false);
  const hoverTimeout = useRef<number | undefined>(undefined);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (trigger !== "view") return;
    const el = lightbox ? divRef.current : anchorRef.current;
    if (!el || !project.vimeoId) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "80px 0px", threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [project.vimeoId, lightbox, trigger]);

  useEffect(() => {
    return () => window.clearTimeout(hoverTimeout.current);
  }, []);

  const hoverHandlers =
    trigger === "hover"
      ? {
          onMouseEnter: () => {
            hoverTimeout.current = window.setTimeout(
              () => setHovered(true),
              150
            );
          },
          onMouseLeave: () => {
            window.clearTimeout(hoverTimeout.current);
            setHovered(false);
          },
        }
      : {};

  const showEmbed =
    (trigger === "view" ? inView : hovered) && Boolean(project.vimeoId);
  const { playing: embedLoaded } = useVimeoPlaying(iframeRef, showEmbed);

  const image = coverImage(project);

  const tileClassName = cx(
    "group relative block aspect-video cursor-pointer overflow-hidden bg-cover bg-center [container-type:size]",
    className
  );
  const tileStyle = image
    ? undefined
    : {
        backgroundImage: `linear-gradient(160deg, ${project.accent} 0%, #0b0b0a 85%)`,
      };

  const content = (
    <>
      {image && (
        <>
          {/* Blurred, scaled copy fills the frame so the real photo below never has to crop (and potentially cut off a face) to match the 16:9 tile. */}
          <Image
            src={image}
            alt=""
            fill
            aria-hidden
            sizes="(min-width: 1024px) 32vw, (min-width: 640px) 45vw, 85vw"
            className={cx(
              "scale-110 object-cover opacity-70 blur-2xl transition-opacity duration-500 ease-out",
              embedLoaded && "opacity-0"
            )}
          />
          <Image
            src={image}
            alt={`${project.client} — ${project.title}`}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 32vw, (min-width: 640px) 45vw, 85vw"
            className={cx(
              "object-contain transition-opacity duration-500 ease-out",
              embedLoaded && "opacity-0"
            )}
          />
        </>
      )}

      {!image && project.logo && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div
            className={cx(
              "flex h-12 items-center rounded-full px-4",
              project.logoOnDark ? "bg-black/80" : "bg-white"
            )}
          >
            <div className="relative h-7 w-16">
              <Image
                src={project.logo}
                alt={`Logo ${project.client}`}
                fill
                sizes="64px"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {showEmbed && project.vimeoId && (
        <iframe
          ref={iframeRef}
          key={project.vimeoId}
          src={`https://player.vimeo.com/video/${project.vimeoId}?background=1&autoplay=1&loop=1&muted=1&controls=0`}
          className={cx(
            // Oversize + center so the embed always crops to cover the tile
            // instead of letterboxing when a source isn't 16:9 (Vimeo's
            // background mode doesn't crop on its own). Sized in container
            // query units (cqw/cqh, via [container-type:size] on the tile)
            // rather than vw/vh — those track the *viewport*, not this
            // tile's own box, so on anything smaller than full-bleed (a
            // catalog tile, a project hero inside a narrow article) the
            // iframe was wildly oversized and both Vimeo's own cover-fit
            // and our overflow-hidden clip cropped into the frame.
            "pointer-events-none absolute left-1/2 top-1/2 h-[56.25cqw] min-h-full w-full min-w-[177.78cqh] -translate-x-1/2 -translate-y-1/2 transition-[opacity,transform] duration-700 ease-out group-hover:scale-[1.04]",
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
        <p className="text-xs font-mono uppercase tracking-[0.15em] text-white/70">
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
        {...hoverHandlers}
      >
        {content}
        {project.vimeoId && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm">
              <PlayIcon />
            </span>
          </div>
        )}
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
      {...hoverHandlers}
    >
      {content}
    </Link>
  );
}
