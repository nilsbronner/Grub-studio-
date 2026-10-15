"use client";

import { useEffect, useState, type RefObject } from "react";

// Mirrors use-vimeo-playing.ts for a native, self-hosted <video> element:
// muted autoplay is allowed almost everywhere, except cases like iOS Low
// Power Mode, which can silently block it (play() resolves without ever
// actually starting playback). We request play() ourselves, listen for the
// real "playing" event, and after a grace period fall back to checking
// `.paused` — if it's still true, we report `blocked` so the caller can
// offer a tap-to-play affordance instead of showing a frozen first frame.
export function useVideoPlaying(
  videoRef: RefObject<HTMLVideoElement | null>,
  active: boolean
) {
  const [playing, setPlaying] = useState(false);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!active || !el) return;

    let cancelled = false;
    const reveal = () => {
      if (!cancelled) {
        setPlaying(true);
        setBlocked(false);
      }
    };
    el.addEventListener("playing", reveal);

    el.play().catch(() => {});
    const fallback = window.setTimeout(() => {
      if (cancelled) return;
      if (el.paused) {
        setBlocked(true);
        setPlaying(true);
      } else {
        reveal();
      }
    }, 3000);

    return () => {
      cancelled = true;
      window.clearTimeout(fallback);
      el.removeEventListener("playing", reveal);
      setPlaying(false);
      setBlocked(false);
    };
  }, [active, videoRef]);

  const retry = () => {
    videoRef.current?.play().catch(() => {});
  };

  return { playing: active && playing, blocked: active && blocked, retry };
}
