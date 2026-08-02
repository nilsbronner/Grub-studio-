"use client";

import { motion } from "framer-motion";
import { cx } from "@/lib/cx";

const bars = [
  { color: "var(--accent-purple)", w: "55%", duration: 4.2, delay: 0 },
  { color: "var(--accent-pink)", w: "100%", duration: 3.6, delay: 0.3 },
  { color: "var(--accent-yellow)", w: "78%", duration: 4.8, delay: 0.6 },
  { color: "var(--accent-cyan)", w: "38%", duration: 3.9, delay: 0.9 },
];

export function HeroMotif({ className }: { className?: string }) {
  return (
    <div
      className={cx(
        "aspect-square w-full max-w-xs rounded-2xl border border-border p-8",
        className
      )}
      aria-hidden
    >
      <div className="flex h-full flex-col justify-center gap-5">
        {bars.map((bar, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <motion.div
              animate={{ width: [bar.w, "100%", bar.w] }}
              transition={{
                duration: bar.duration,
                delay: bar.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ backgroundColor: bar.color }}
              className="h-4 rounded-full"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
