"use client";

import { motion } from "framer-motion";
import type { MethodStep } from "@/lib/content/team";

const ease = [0.16, 1, 0.3, 1] as const;

export function MethodTimeline({ steps }: { steps: MethodStep[] }) {
  return (
    <div className="relative mt-10">
      <div className="absolute left-0 right-0 top-[7px] hidden h-px bg-border sm:block" />
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease }}
        style={{ transformOrigin: "left" }}
        className="absolute left-0 right-0 top-[7px] hidden h-px bg-accent sm:block"
      />

      <ol className="grid gap-8 sm:grid-cols-5">
        {steps.map((step, i) => (
          <li key={step.step} className="relative">
            <motion.span
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.3, ease, delay: 0.15 + i * 0.15 }}
              className="hidden h-3.5 w-3.5 rounded-full border-2 border-accent bg-background sm:block"
            />
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease, delay: 0.25 + i * 0.15 }}
              className="mt-3"
            >
              <p className="font-mono text-xs text-accent">
                {String(step.step).padStart(2, "0")}
              </p>
              <p className="mt-2 text-sm font-medium">{step.title}</p>
              <p className="mt-1 text-sm text-muted">{step.description}</p>
            </motion.div>
          </li>
        ))}
      </ol>
    </div>
  );
}
