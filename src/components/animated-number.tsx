"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";
import { cx } from "@/lib/cx";

function formatNumber(n: number, decimals: number) {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function AnimatedNumber({
  value,
  decimals = 0,
  duration = 1.4,
  delay = 0,
  className,
}: {
  value: number;
  decimals?: number;
  duration?: number;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: setDisplay,
    });
    return () => controls.stop();
  }, [inView, value, duration, delay]);

  return (
    <span ref={ref} className={cx("tabular", className)}>
      {formatNumber(display, decimals)}
    </span>
  );
}

/**
 * Splits a formatted stat string ("7 193", "0,70 €", "5 mois", "600+") into
 * a leading numeric run to animate plus the trailing unit/currency text,
 * so project.stats can count up without needing separate numeric fields.
 */
function parseStatValue(raw: string) {
  const match = raw.match(/^(\d[\d\s,.]*)(.*)$/);
  if (!match) return null;
  const [, numPart, rest] = match;
  const trimmedNum = numPart.trim();
  const suffix = rest.trim();
  const hasComma = trimmedNum.includes(",");
  const decimals = hasComma ? trimmedNum.split(",")[1]?.length ?? 0 : 0;
  const value = parseFloat(trimmedNum.replace(/\s/g, "").replace(",", "."));
  if (Number.isNaN(value)) return null;
  const needsSpace = /^[a-zA-ZÀ-ÿ€]/.test(suffix);
  return { value, decimals, suffix, needsSpace };
}

export function AnimatedStatValue({
  value,
  duration = 1.2,
  delay = 0,
  className,
}: {
  value: string;
  duration?: number;
  delay?: number;
  className?: string;
}) {
  const parsed = parseStatValue(value);
  if (!parsed) return <span className={className}>{value}</span>;
  return (
    <span className={className}>
      <AnimatedNumber
        value={parsed.value}
        decimals={parsed.decimals}
        duration={duration}
        delay={delay}
      />
      {parsed.suffix ? (parsed.needsSpace ? ` ${parsed.suffix}` : parsed.suffix) : ""}
    </span>
  );
}
