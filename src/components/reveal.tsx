"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className,
  y = 24,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      // ease-snap (Grub Motion): entrances snap in, they don't glide —
      // ease-roll [0.16,1,0.3,1] is reserved for the Counter odometer.
      transition={{ duration: 0.6, ease: [0.2, 0, 0, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
