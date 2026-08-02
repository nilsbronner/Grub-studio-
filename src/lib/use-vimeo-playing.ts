"use client";

import { useEffect, useState, type RefObject } from "react";
import Player from "@vimeo/player";

// The iframe's `load` event fires while Vimeo's player is still a blank/white
// shell; `playing` fires once pixels actually render, so we crossfade on that.
// No timeout fallback here on purpose: a video that's restricted/deleted/private
// never fires "playing", and forcing the iframe visible anyway would swap a
// good poster image for Vimeo's blank error page — worse than just waiting.
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

    return () => {
      cancelled = true;
      player.off("playing", reveal);
      player.destroy().catch(() => {});
      setPlaying(false);
    };
  }, [active, iframeRef]);

  return active && playing;
}
