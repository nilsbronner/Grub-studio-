"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cx } from "@/lib/cx";
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

type GalleryVideo = {
  vimeoId: string;
  vimeoHash?: string;
  title: string;
  image?: string;
};

function VideoCard({ video }: { video: GalleryVideo }) {
  const ref = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [inView, setInView] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const { playing: loaded } = useVimeoPlaying(iframeRef, inView);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "80px 0px", threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      role="button"
      tabIndex={0}
      onClick={() => setLightboxOpen(true)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setLightboxOpen(true);
        }
      }}
      className="group relative aspect-video cursor-pointer select-none overflow-hidden rounded-lg border border-border bg-[#141412]"
    >
      {video.image && (
        <Image
          src={video.image}
          alt=""
          fill
          aria-hidden
          sizes="(min-width: 640px) 33vw, 100vw"
          className={cx(
            "scale-110 object-cover opacity-70 blur-2xl transition-opacity duration-500 ease-out",
            loaded && "opacity-0"
          )}
        />
      )}

      {inView && (
        <iframe
          ref={iframeRef}
          src={`https://player.vimeo.com/video/${video.vimeoId}?background=1&autoplay=1&loop=1&muted=1&controls=0${video.vimeoHash ? `&h=${video.vimeoHash}` : ""}`}
          className={cx(
            // Oversize + center so the embed always crops to cover the tile
            // instead of letterboxing when a source isn't exactly 16:9.
            "pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-full min-w-[177.78vh] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-700 ease-out",
            loaded ? "opacity-100" : "opacity-0"
          )}
          style={{ backgroundColor: "var(--background)" }}
          allow="autoplay; fullscreen"
          loading="lazy"
          title={video.title}
        />
      )}

      <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-black/10 to-transparent p-3">
        <p className="text-xs font-medium text-white">{video.title}</p>
      </div>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm">
          <PlayIcon />
        </span>
      </div>

      <VideoLightbox
        vimeoId={video.vimeoId}
        vimeoHash={video.vimeoHash}
        title={video.title}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
}

/** Grid of several distinct clips for a project with more than one deliverable video — each tile previews muted on scroll-into-view and opens full-screen with sound on click. */
export function ProjectVideoGallery({ videos }: { videos: GalleryVideo[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {videos.map((video) => (
        <VideoCard key={video.vimeoId} video={video} />
      ))}
    </div>
  );
}
