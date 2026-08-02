"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const word = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
};

export function SectionKicker({
  kicker,
  children,
  as: Tag = "h1",
  className,
}: {
  kicker: string;
  children: string;
  as?: "h1" | "h2";
  className?: string;
}) {
  const words = children.split(" ");

  return (
    <div className={className}>
      <motion.span
        initial={{ opacity: 0, y: -8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.4, ease }}
        className="inline-block rounded-full border border-border px-4 py-1 text-xs uppercase tracking-[0.15em] text-muted"
      >
        {kicker}
      </motion.span>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
      >
        <Tag className="mt-4 max-w-2xl text-2xl font-medium tracking-tight sm:text-3xl">
          {words.map((w, i) => (
            <motion.span
              key={i}
              variants={word}
              className="mr-[0.25em] inline-block"
            >
              {w}
            </motion.span>
          ))}
        </Tag>
      </motion.div>
    </div>
  );
}
