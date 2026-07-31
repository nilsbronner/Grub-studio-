"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cx } from "@/lib/cx";

type Flash = { id: number; x: number; y: number };

const CLAPPER_MODE = "voir";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [flashes, setFlashes] = useState<Flash[]>([]);
  const flashId = useRef(0);

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

    function onDown(e: MouseEvent) {
      const id = flashId.current++;
      setFlashes((f) => [...f, { id, x: e.clientX, y: e.clientY }]);
      window.setTimeout(() => {
        setFlashes((f) => f.filter((fl) => fl.id !== id));
      }, 550);
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
    window.addEventListener("mousedown", onDown);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  const active = label !== null;
  const clapper = label === CLAPPER_MODE;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[999]"
      >
        <div
          className={cx(
            "flex items-center justify-center rounded-full transition-[width,height,background-color,border-color] duration-200 ease-out",
            clapper
              ? "h-16 w-16 border border-accent bg-accent/10 backdrop-blur-sm"
              : active
                ? "h-14 w-14 border border-accent bg-accent/10 text-[10px] uppercase tracking-widest text-accent backdrop-blur-sm"
                : "h-0 w-0"
          )}
        >
          {clapper && <ClapperIcon />}
          {active && !clapper && <span>{label}</span>}
        </div>

        {!active && (
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            className="absolute left-0 top-0 -translate-x-[2px] -translate-y-[2px] text-accent"
            fill="currentColor"
          >
            <path d="M1 1L16 7.2L9.2 9.2L7.2 16L1 1Z" />
          </svg>
        )}
      </div>

      <AnimatePresence>
        {flashes.map((f) => (
          <motion.div
            key={f.id}
            className="pointer-events-none fixed z-[998] h-24 w-24 rounded-full"
            style={{
              left: f.x,
              top: f.y,
              translateX: "-50%",
              translateY: "-50%",
              background:
                "radial-gradient(circle, var(--accent-yellow) 0%, var(--accent-pink) 45%, transparent 72%)",
            }}
            initial={{ opacity: 0.85, scale: 0.2 }}
            animate={{ opacity: 0, scale: 2.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </>
  );
}

function ClapperIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      className="text-accent"
    >
      <path
        d="M3 10.5 20 7l.6 3-17 3.5-.6-3Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="m4.5 6 2.7 3M9.7 5l2.7 3M14.9 4l2.7 3"
        stroke="var(--background)"
        strokeWidth="1.4"
      />
      <rect
        x="3.4"
        y="13"
        width="17"
        height="7.4"
        rx="0.6"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}
