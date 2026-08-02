"use client";

import { motion } from "framer-motion";
import { AnimatedNumber } from "@/components/animated-number";

function ClapperIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
      aria-hidden
    >
      <path d="M4 8.5 19 5l1 4-15 3.5Z" />
      <path d="M4 10v9a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1v-8" />
      <path d="m8 6 2 3M13 5l2 3" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
      aria-hidden
    >
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="0.5" fill="currentColor" />
    </svg>
  );
}

const headingWords = "Les codes ont changé".split(" ");

const avantPoints = [
  "Message progressif",
  "Structure linéaire",
  "Plans d’illustration",
  "Rythme lent",
  "On explique",
];

const maintenantPoints = [
  "Message immédiat",
  "Structure par hooks",
  "Plans qui attirent l’œil",
  "Rythme rapide",
  "On fait ressentir",
];

const headingContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const wordVariant = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function PitchNarrative() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">
          Notre point de départ
        </p>

        <motion.h2
          className="mt-4 max-w-3xl text-2xl font-medium tracking-tight sm:text-4xl"
          variants={headingContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {headingWords.map((w, i) => (
            <motion.span
              key={i}
              variants={wordVariant}
              className="mr-[0.3em] inline-block"
            >
              {w}
            </motion.span>
          ))}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="mt-4 max-w-xl text-base leading-relaxed text-foreground/70"
        >
          Les formats, le rythme et la narration déterminent ce qui est vu…
          et ce qui ne l&rsquo;est pas. Aujourd&rsquo;hui, le défi n&rsquo;est
          plus de produire du contenu, mais de réussir à exister dans un flux
          saturé.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 flex flex-col items-start gap-6 rounded-2xl border border-border bg-gradient-to-br from-accent-purple/15 via-transparent to-transparent p-8 sm:flex-row sm:items-center sm:gap-10 sm:p-12"
        >
          <p className="font-mono text-6xl font-semibold tracking-tight sm:text-7xl">
            <AnimatedNumber value={71} duration={1.6} />
            <span>%</span>
          </p>
          <div>
            <p className="max-w-md text-base leading-relaxed sm:text-lg">
              C&rsquo;est le pourcentage de personnes qui décident de rester
              ou de scroller dans les 3 premières secondes.
            </p>
            <p className="mt-3 text-xs uppercase tracking-[0.15em] text-muted">
              Source : TikTok Marketing Report
            </p>
          </div>
        </motion.div>

        <div className="mt-14">
          <p className="max-w-xl text-base leading-relaxed text-foreground/70">
            Avant, une vidéo était faite pour être regardée. Maintenant, elle
            doit d&rsquo;abord arrêter le scroll.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-xl border border-border p-6"
            >
              <div className="flex items-center gap-2.5 text-muted">
                <ClapperIcon />
                <p className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  Avant
                </p>
              </div>
              <ul className="mt-5 space-y-2.5 text-sm text-foreground/70">
                {avantPoints.map((point, i) => (
                  <motion.li
                    key={point}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
                  >
                    {point}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.6,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="rounded-xl bg-accent-purple p-6 text-white"
            >
              <div className="flex items-center gap-2.5">
                <TargetIcon />
                <p className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Maintenant
                </p>
              </div>
              <ul className="mt-5 space-y-2.5 text-sm">
                {maintenantPoints.map((point, i) => (
                  <motion.li
                    key={point}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
                  >
                    {point}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 max-w-xl text-base leading-relaxed text-foreground/70"
        >
          Nous pensons chaque projet comme une stratégie de contenu, pas
          comme une simple production.
        </motion.p>
      </div>
    </section>
  );
}
