"use client";

import { useSyncExternalStore } from "react";

function subscribe() {
  return () => {};
}

function getSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

/**
 * `false` during SSR and the hydration-matching first client render, `true`
 * on every render after — for content that must be absent from the
 * server-rendered HTML (a duplicate marquee clone, an iframe whose `src`
 * depends on a viewport check the server can't make) and only added once
 * mounted. Prefer this over a bare `useState(false)` + `useEffect(() =>
 * setMounted(true), [])` pair: besides tripping the
 * `react-hooks/set-state-in-effect` lint rule, that pattern only flips
 * after the effect-flush that follows the first commit, while
 * `useSyncExternalStore` settles synchronously before paint.
 */
export function useMounted() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
