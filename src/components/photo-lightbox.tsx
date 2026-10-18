"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { cx } from "@/lib/cx";

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
      aria-hidden
    >
      <path d={direction === "left" ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"} />
    </svg>
  );
}

const SWIPE_THRESHOLD = 60;

/** Fullscreen photo viewer: always shows the whole image (never crops), with swipe/drag + keyboard navigation between shots. */
export function PhotoLightbox({
  images,
  alt,
  index,
  onIndexChange,
  open,
  onClose,
}: {
  images: string[];
  alt: string;
  index: number;
  onIndexChange: (index: number) => void;
  open: boolean;
  onClose: () => void;
}) {
  const [direction, setDirection] = useState(0);

  function go(delta: number) {
    setDirection(delta);
    onIndexChange((index + delta + images.length) % images.length);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && images.length > 1) go(-1);
      if (e.key === "ArrowRight" && images.length > 1) go(1);
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, onClose, index, images.length]);

  if (typeof document === "undefined") return null;

  // Rendered into `document.body`: a `fixed` element inside an ancestor that
  // framer-motion has given a `transform` (e.g. `Reveal`) is positioned
  // relative to that ancestor instead of the viewport, which breaks both
  // the full-bleed backdrop and the close button's hit area.
  //
  // A portal only moves where the DOM node lives — React still bubbles the
  // synthetic click event up through the *component* tree, so without
  // stopping it here, a click on the backdrop or close button also reaches
  // the tile's own onClick a tick later and reopens the lightbox it just
  // closed.
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 sm:p-10"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          <div
            className="relative h-full w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={images[index]}
                custom={direction}
                drag={images.length > 1 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -SWIPE_THRESHOLD) go(1);
                  else if (info.offset.x > SWIPE_THRESHOLD) go(-1);
                }}
                initial={{ opacity: 0, x: direction >= 0 ? 60 : -60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction >= 0 ? -60 : 60 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 flex cursor-grab items-center justify-center active:cursor-grabbing"
              >
                <div className="relative h-full w-full">
                  <Image
                    src={images[index]}
                    alt={alt}
                    fill
                    sizes="100vw"
                    className="pointer-events-none select-none object-contain"
                    priority
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  go(-1);
                }}
                aria-label="Photo précédente"
                className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 text-white backdrop-blur transition-colors hover:border-white sm:left-6"
              >
                <ChevronIcon direction="left" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  go(1);
                }}
                aria-label="Photo suivante"
                className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 text-white backdrop-blur transition-colors hover:border-white sm:right-6"
              >
                <ChevronIcon direction="right" />
              </button>

              <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 text-xs font-mono text-white/70">
                {index + 1} / {images.length}
              </div>
            </>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Fermer la photo"
            className={cx(
              "absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:border-white"
            )}
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
