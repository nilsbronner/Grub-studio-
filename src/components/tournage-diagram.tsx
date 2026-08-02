"use client";

import { motion } from "framer-motion";

const targets = [
  { label: "Spot cible 1" },
  { label: "Spot cible 2" },
  { label: "Spot cible 3" },
];

const ease = [0.16, 1, 0.3, 1] as const;

export function TournageDiagram() {
  return (
    <div className="flex flex-col items-center py-4">
      <motion.div
        initial={{ opacity: 0, y: -12, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease }}
        className="rounded-lg border border-border bg-foreground/[0.03] px-6 py-3 text-center"
      >
        <p className="text-sm font-medium">Spot principal</p>
        <p className="text-xs text-muted">1 tournage</p>
      </motion.div>

      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.4, ease, delay: 0.35 }}
        style={{ transformOrigin: "top" }}
        className="h-8 w-px bg-border"
      />

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease, delay: 0.55 }}
        className="hidden h-px w-full max-w-2xl bg-border sm:block"
      />

      <div className="mt-8 grid w-full max-w-3xl gap-6 sm:mt-0 sm:grid-cols-3 sm:gap-8">
        {targets.map((t, i) => (
          <motion.div
            key={t.label}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease, delay: 0.7 + i * 0.12 }}
            className="flex flex-col items-center rounded-lg border border-border p-5 text-center"
          >
            <p className="text-sm font-medium">{t.label}</p>
            <div className="mt-3 flex items-center gap-1.5">
              {[0, 1, 2].map((j) => (
                <motion.span
                  key={j}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.3,
                    delay: 0.95 + i * 0.12 + j * 0.06,
                  }}
                  className="h-1.5 w-1.5 rounded-full bg-accent"
                />
              ))}
            </div>
            <p className="mt-2 text-xs text-muted">3 shorts</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
