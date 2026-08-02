"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import type { MethodStep, MethodStepIcon } from "@/lib/content/team";

const ease = [0.16, 1, 0.3, 1] as const;

const palette = [
  "var(--accent-purple)",
  "var(--accent-pink)",
  "var(--accent-yellow)",
  "var(--accent-cyan)",
];

export function MethodTimeline({
  steps,
  icons,
  fallbackIcon,
}: {
  steps: MethodStep[];
  icons?: Partial<Record<MethodStepIcon, ReactNode>>;
  fallbackIcon?: ReactNode;
}) {
  return (
    <div className="relative mt-10">
      <div className="absolute left-0 right-0 top-[7px] hidden h-px bg-border sm:block" />
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease }}
        style={{
          transformOrigin: "left",
          background: `linear-gradient(90deg, ${palette.join(", ")})`,
        }}
        className="absolute left-0 right-0 top-[7px] hidden h-px sm:block"
      />

      <ol className="grid gap-8 sm:grid-cols-5">
        {steps.map((step, i) => {
          const icon = icons?.[step.icon] ?? fallbackIcon;
          const color = palette[i % palette.length];
          return (
            <li key={step.step} className="group relative">
              <motion.span
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.3, ease, delay: 0.15 + i * 0.15 }}
                style={{ borderColor: color }}
                className="hidden h-3.5 w-3.5 rounded-full border-2 bg-background sm:block"
              />
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease, delay: 0.25 + i * 0.15 }}
                className="mt-3"
              >
                <div className="flex items-center gap-2">
                  {icon && (
                    <span style={{ color }} className="flex">
                      {icon}
                    </span>
                  )}
                  <p className="font-mono text-xs" style={{ color }}>
                    {String(step.step).padStart(2, "0")}
                  </p>
                </div>
                <p className="mt-2 text-sm font-medium">{step.title}</p>
                <p className="mt-1 text-sm text-muted">{step.description}</p>
              </motion.div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
