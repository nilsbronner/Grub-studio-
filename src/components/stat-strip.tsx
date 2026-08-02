"use client";

import { motion } from "framer-motion";
import { AnimatedStatValue } from "@/components/animated-number";
import type { ProjectStat } from "@/lib/content/projects";

const ease = [0.16, 1, 0.3, 1] as const;

export function StatStrip({ stats }: { stats: ProjectStat[] }) {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-5 rounded-xl border border-border px-6 py-6 sm:px-8">
      {stats.map((stat, i) => (
        <div key={stat.label} className="flex items-center gap-6">
          {i > 0 && (
            <motion.span
              initial={{ opacity: 0, x: -6 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, ease, delay: i * 0.15 }}
              className="text-muted"
              aria-hidden
            >
              →
            </motion.span>
          )}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease, delay: i * 0.15 }}
          >
            <AnimatedStatValue
              value={stat.value}
              delay={i * 0.15}
              className="tabular text-lg font-medium"
            />
            <p className="mt-0.5 text-xs text-muted">{stat.label}</p>
          </motion.div>
        </div>
      ))}
    </div>
  );
}
