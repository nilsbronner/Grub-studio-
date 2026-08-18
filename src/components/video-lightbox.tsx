"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cx } from "@/lib/cx";

export function VideoLightbox({
  vimeoId,
  title,
  open,
  onClose,
  vertical = false,
}: {
  vimeoId: string;
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

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-10"
          onClick={onClose}
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
              src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&controls=1`}
              className="h-full w-full"
              allow="autoplay; fullscreen; picture-in-picture"
              title={title}
            />
          </motion.div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer la vidéo"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:border-white"
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
