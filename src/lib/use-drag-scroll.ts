"use client";

import { useRef, type RefObject } from "react";

export function useDragScroll(ref: RefObject<HTMLDivElement | null>) {
  const dragging = useRef(false);
  const moved = useRef(false);
  const startX = useRef(0);
  const startScroll = useRef(0);

  function onPointerDown(e: React.PointerEvent) {
    const el = ref.current;
    if (!el) return;
    dragging.current = true;
    moved.current = false;
    startX.current = e.clientX;
    startScroll.current = el.scrollLeft;
    // Pointer capture is deferred to the first real move (below), not taken
    // here: on iOS Safari, capturing the pointer immediately on a row that's
    // still auto-scrolling makes the browser treat a plain tap as a scroll
    // gesture and swallow the click — so a tap on a link never registers
    // unless the row happened to already be paused by a hover first.
  }

  function onPointerMove(e: React.PointerEvent) {
    const el = ref.current;
    if (!el || !dragging.current) return;
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 4) {
      if (!moved.current) el.setPointerCapture(e.pointerId);
      moved.current = true;
    }
    if (moved.current) el.scrollLeft = startScroll.current - dx;
  }

  function endDrag() {
    dragging.current = false;
  }

  function onClickCapture(e: React.MouseEvent) {
    if (moved.current) {
      e.preventDefault();
      e.stopPropagation();
      moved.current = false;
    }
  }

  function onWheel(e: React.WheelEvent) {
    const el = ref.current;
    if (!el) return;
    const delta =
      Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    el.scrollLeft += delta;
    e.preventDefault();
  }

  return {
    dragging,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: endDrag,
      onPointerCancel: endDrag,
      onClickCapture,
      onWheel,
    },
  };
}
