"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cx } from "@/lib/cx";
import type { Offer } from "@/lib/content/offers";

const palette = [
  "var(--accent-purple)",
  "var(--accent-pink)",
  "var(--accent-yellow)",
  "var(--accent-cyan)",
];

const ease = [0.16, 1, 0.3, 1] as const;

function CheckIcon({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0"
      aria-hidden
    >
      <path d="m5 12 5 5L20 7" />
    </svg>
  );
}

export function OfferList({ offers }: { offers: Offer[] }) {
  return (
    <ul
      className={cx(
        "grid gap-5",
        offers.length >= 3
          ? "sm:grid-cols-2 lg:grid-cols-3"
          : offers.length === 2 && "sm:grid-cols-2"
      )}
    >
      {offers.map((offer, i) => {
        const color = palette[i % palette.length];
        return (
          <motion.li
            key={offer.slug}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -3 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease, delay: (i % 6) * 0.06 }}
            className="relative flex flex-col overflow-hidden rounded-xl border border-border p-6"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease, delay: (i % 6) * 0.06 }}
              style={{ backgroundColor: color, transformOrigin: "left" }}
              className="absolute inset-x-0 top-0 h-1"
            />

            <p className="min-h-[3.5rem] text-xl font-semibold tracking-tight">
              {offer.title}
            </p>
            <p className="mt-3 min-h-[5.75rem] text-sm leading-relaxed text-foreground/60">
              {offer.description}
            </p>

            <ul className="mt-5 space-y-2">
              {offer.includes.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm">
                  <CheckIcon color={color} />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight">
                {offer.price}
              </span>
              <span className="text-sm text-muted">{offer.priceNote}</span>
            </div>

            <Link
              href="/contact"
              className="group mt-6 flex items-center justify-center gap-2 border border-border py-3 text-sm uppercase tracking-[0.15em] transition-all duration-300 hover:border-accent hover:text-accent"
            >
              Réserver mon tournage
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </motion.li>
        );
      })}
    </ul>
  );
}
