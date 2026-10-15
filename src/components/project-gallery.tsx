"use client";

import Image from "next/image";
import { useState } from "react";
import { cx } from "@/lib/cx";
import { PhotoLightbox } from "@/components/photo-lightbox";

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden
    >
      <path d={direction === "left" ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"} />
    </svg>
  );
}

/**
 * Carousel for photo-only projects (no vimeoId). The inline preview never
 * crops a face out of frame: a blurred, scaled copy of the photo fills the
 * box behind it, while the real photo sits on top fully visible
 * (`object-contain`) regardless of whether the shot is portrait or
 * landscape. Clicking opens the full-bleed PhotoLightbox for a proper look.
 */
export function ProjectGallery({
  images,
  alt,
  className,
}: {
  images: string[];
  alt: string;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const current = images[index];

  return (
    <div className={cx("group relative overflow-hidden", className)}>
      <button
        type="button"
        onClick={() => setLightboxOpen(true)}
        aria-label="Agrandir la photo"
        className="absolute inset-0 h-full w-full cursor-zoom-in"
      >
        <Image
          src={current}
          alt=""
          fill
          aria-hidden
          sizes="(min-width: 1024px) 896px, 100vw"
          className="scale-110 object-cover opacity-70 blur-2xl"
        />
        <Image
          key={current}
          src={current}
          alt={alt}
          fill
          priority={index === 0}
          sizes="(min-width: 1024px) 896px, 100vw"
          className="object-contain"
        />
      </button>

      {images.length > 1 && (
        <>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

          <button
            type="button"
            onClick={() =>
              setIndex((i) => (i - 1 + images.length) % images.length)
            }
            aria-label="Photo précédente"
            className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-background/60 text-foreground opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100 hover:bg-background/80"
          >
            <ChevronIcon direction="left" />
          </button>
          <button
            type="button"
            onClick={() => setIndex((i) => (i + 1) % images.length)}
            aria-label="Photo suivante"
            className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-background/60 text-foreground opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100 hover:bg-background/80"
          >
            <ChevronIcon direction="right" />
          </button>

          <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
            {images.map((img, i) => (
              <span
                key={img}
                className={cx(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === index ? "w-6 bg-foreground" : "w-1.5 bg-foreground/40"
                )}
              />
            ))}
          </div>
        </>
      )}

      <PhotoLightbox
        images={images}
        alt={alt}
        index={index}
        onIndexChange={setIndex}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
}
