"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
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
// give it a short grace period to confirm before revealing.
//
// That grace period also has to tell a genuinely blocked autoplay apart
// from one that's merely slow: browsers that disable autoplay outright
// (e.g. iOS Safari in Low Power Mode) resolve play() without ever firing
// "playing", so after the grace period we check the player's real paused
// state — if it's still paused, we report `blocked` instead of pretending
// playback started, so the caller can offer a tap-to-play affordance
// rather than reveal a frozen frame.
export function useVimeoPlaying(
  iframeRef: RefObject<HTMLIFrameElement | null>,
  active: boolean
) {
  const [playing, setPlaying] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    const el = iframeRef.current;
    if (!active || !el) return;

    let cancelled = false;
    let fallback: number | undefined;
    const player = new Player(el);
    playerRef.current = player;
    const reveal = () => {
      if (!cancelled) {
        setPlaying(true);
        setBlocked(false);
      }
    };
    player.on("playing", reveal);

    player
      .ready()
      .then(() => {
        if (cancelled) return;
        player.play().catch(() => {});
        fallback = window.setTimeout(() => {
          if (cancelled) return;
          player
            .getPaused()
            .then((paused) => {
              if (cancelled) return;
              if (paused) {
                setBlocked(true);
                setPlaying(true);
              } else {
                reveal();
              }
            })
            .catch(reveal);
        }, 3000);
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
      playerRef.current = null;
      setPlaying(false);
      setBlocked(false);
    };
  }, [active, iframeRef]);

  const retry = () => {
    playerRef.current?.play().catch(() => {});
  };

  return { playing: active && playing, blocked: active && blocked, retry };
}
