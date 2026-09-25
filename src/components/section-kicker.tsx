"use client";

import { motion } from "framer-motion";
import { EyebrowPill } from "@/components/eyebrow-pill";

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
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.4, ease }}
        className="inline-block"
      >
        <EyebrowPill>{kicker}</EyebrowPill>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
      >
        <Tag
          aria-label={children}
          className="mt-4 max-w-2xl text-2xl font-medium tracking-tight sm:text-3xl"
        >
          {words.map((w, i) => (
            <span key={i}>
              <motion.span
                variants={word}
                aria-hidden="true"
                className="inline-block"
              >
                {w}
              </motion.span>
              {i < words.length - 1 ? " " : ""}
            </span>
          ))}
        </Tag>
      </motion.div>
    </div>
  );
}
