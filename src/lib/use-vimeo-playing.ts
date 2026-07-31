"use client";

import { useEffect, useState, type RefObject } from "react";
import Player from "@vimeo/player";

// The iframe's `load` event fires while Vimeo's player is still a blank/white
// shell; `playing` fires once pixels actually render, so we crossfade on that.
export function useVimeoPlaying(
  iframeRef: RefObject<HTMLIFrameElement | null>,
  active: boolean
) {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = iframeRef.current;
    if (!active || !el) return;

    let cancelled = false;
    const player = new Player(el);
    const reveal = () => {
      if (!cancelled) setPlaying(true);
    };
    player.on("playing", reveal);
    const fallback = window.setTimeout(reveal, 4000);

    return () => {
      cancelled = true;
      window.clearTimeout(fallback);
      player.off("playing", reveal);
      player.destroy().catch(() => {});
      setPlaying(false);
    };
  }, [active, iframeRef]);

  return active && playing;
}
