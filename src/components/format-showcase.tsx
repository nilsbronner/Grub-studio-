"use client";

import { motion } from "framer-motion";

type Format = {
  ratio: string;
  label: string;
  usage: string;
};

const ease = [0.16, 1, 0.3, 1] as const;

const aspectClass: Record<string, string> = {
  "16:9": "aspect-video",
  "1:1": "aspect-square",
  "9:16": "aspect-[9/16]",
};

export function FormatShowcase({ formats }: { formats: Format[] }) {
  return (
    <div className="flex flex-wrap items-center gap-4 sm:flex-nowrap sm:gap-3">
      {formats.map((format, i) => (
        <div key={format.ratio} className="flex items-center gap-4 sm:gap-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease, delay: i * 0.25 }}
            className="w-28 shrink-0 sm:w-32"
          >
            <div
              className={`${aspectClass[format.ratio] ?? "aspect-video"} flex items-center justify-center rounded-md border border-border bg-foreground/[0.03]`}
            >
              <span className="font-mono text-xs text-muted">
                {format.ratio}
              </span>
            </div>
            <p className="mt-2 text-sm font-medium">{format.label}</p>
            <p className="text-xs text-muted">{format.usage}</p>
          </motion.div>

          {i < formats.length - 1 && (
            <motion.span
              initial={{ opacity: 0, x: -6 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, ease, delay: i * 0.25 + 0.2 }}
              className="hidden text-muted sm:block"
              aria-hidden
            >
              →
            </motion.span>
          )}
        </div>
      ))}
    </div>
  );
}
