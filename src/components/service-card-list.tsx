"use client";

import { motion } from "framer-motion";
import type { Service } from "@/lib/content/services";

const palette = [
  "var(--accent-purple)",
  "var(--accent-pink)",
  "var(--accent-yellow)",
  "var(--accent-cyan)",
];

const ease = [0.16, 1, 0.3, 1] as const;

export function ServiceCardList({ services }: { services: Service[] }) {
  return (
    <ul className="mt-6 grid gap-5 sm:grid-cols-2">
      {services.map((service, i) => (
        <motion.li
          key={service.slug}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -3 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease, delay: (i % 6) * 0.06 }}
          className="relative overflow-hidden rounded-xl border border-border p-6"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease, delay: (i % 6) * 0.06 }}
            style={{ backgroundColor: palette[i % 4], transformOrigin: "left" }}
            className="absolute inset-x-0 top-0 h-1"
          />

          <span
            className="font-mono text-sm font-bold"
            style={{ color: palette[i % 4] }}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <p className="mt-2 text-xl font-semibold tracking-tight">
            {service.title}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-foreground/60">
            {service.description}
          </p>
        </motion.li>
      ))}
    </ul>
  );
}
