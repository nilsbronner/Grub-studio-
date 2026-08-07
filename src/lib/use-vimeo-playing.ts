"use client";

import { useEffect, useState, type RefObject } from "react";
import Player from "@vimeo/player";

// The iframe's `load` event fires while Vimeo's player is still a blank/white
// shell; `playing` fires once pixels actually render, so we crossfade on that.
//
// Relying on the "playing" event alone is racy: the URL's autoplay=1 can
// kick in and finish before our listener is attached, so the event is
// missed and the tile is stuck on the poster forever. ready() tells us the
// iframe actually loaded a real player (a restricted/deleted video rejects
// it, and we correctly never reveal), so once it resolves we explicitly
// request play() ourselves — a stronger trigger than the URL param — and
// give it a short grace period to confirm before revealing regardless.
export function useVimeoPlaying(
  iframeRef: RefObject<HTMLIFrameElement | null>,
  active: boolean
) {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = iframeRef.current;
    if (!active || !el) return;

    let cancelled = false;
    let fallback: number | undefined;
    const player = new Player(el);
    const reveal = () => {
      if (!cancelled) setPlaying(true);
    };
    player.on("playing", reveal);

    player
      .ready()
      .then(() => {
        if (cancelled) return;
        player.play().catch(() => {});
        fallback = window.setTimeout(reveal, 3000);
      })
      .catch(() => {
        // Iframe never loaded a valid player (private/deleted/restricted) —
        // leave the poster showing instead of revealing a blank iframe.
      });

    return () => {
      cancelled = true;
      if (fallback) window.clearTimeout(fallback);
      player.off("playing", reveal);
      player.destroy().catch(() => {});
      setPlaying(false);
    };
  }, [active, iframeRef]);

  return active && playing;
}
