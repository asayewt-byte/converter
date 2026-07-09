import { useSyncExternalStore } from "react";

const listeners = new Set<() => void>();
let intervalId: ReturnType<typeof setInterval> | null = null;
let now = Date.now();

function subscribe(cb: () => void) {
  listeners.add(cb);
  if (intervalId === null && typeof window !== "undefined") {
    intervalId = setInterval(() => {
      now = Date.now();
      listeners.forEach((l) => l());
    }, 1000);
  }
  return () => {
    listeners.delete(cb);
    if (listeners.size === 0 && intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };
}

/**
 * Shared 1Hz clock. One interval per app, regardless of how many components
 * subscribe. Server snapshot is a fixed 0 so hydration matches; the first
 * post-hydration tick updates every subscriber together.
 */
export function useClock(): number {
  return useSyncExternalStore(
    subscribe,
    () => now,
    () => 0,
  );
}
