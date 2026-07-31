"use client";

import { useEffect, useRef, useState } from "react";
import { cx } from "@/lib/cx";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const onChange = () => setEnabled(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const target = { ...pos };
    let raf = 0;

    function onMove(e: MouseEvent) {
      target.x = e.clientX;
      target.y = e.clientY;
    }

    function onOver(e: MouseEvent) {
      const el = (e.target as HTMLElement).closest?.(
        "[data-cursor]"
      ) as HTMLElement | null;
      setLabel(el ? el.dataset.cursor || "" : null);
    }

    function tick() {
      pos.x += (target.x - pos.x) * 0.22;
      pos.y += (target.y - pos.y) * 0.22;
      const el = dotRef.current;
      if (el) {
        el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden
      className={cx(
        "pointer-events-none fixed left-0 top-0 z-[999] flex items-center justify-center rounded-full transition-[width,height,background-color,border-color] duration-200 ease-out",
        label
          ? "h-16 w-16 border border-accent/70 bg-accent/10 text-[10px] uppercase tracking-widest text-accent backdrop-blur-sm"
          : "h-2.5 w-2.5 bg-foreground"
      )}
    >
      {label && <span>{label}</span>}
    </div>
  );
}
