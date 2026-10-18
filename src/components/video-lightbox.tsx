"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { cx } from "@/lib/cx";

export function VideoLightbox({
  vimeoId,
  vimeoHash,
  title,
  open,
  onClose,
  vertical = false,
}: {
  vimeoId: string;
  vimeoHash?: string;
  title: string;
  open: boolean;
  onClose: () => void;
  vertical?: boolean;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

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
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-10"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className={cx(
              "relative",
              vertical
                ? "aspect-[9/16] h-[85vh] max-h-[85vh]"
                : "aspect-video w-full max-w-4xl"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&controls=1${vimeoHash ? `&h=${vimeoHash}` : ""}`}
              className="h-full w-full"
              allow="autoplay; fullscreen; picture-in-picture"
              title={title}
            />
          </motion.div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Fermer la vidéo"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:border-white"
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
