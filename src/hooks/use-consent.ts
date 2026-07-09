import { useSyncExternalStore } from "react";

export type Consent = "accepted" | "rejected";
const KEY = "et-cookie-consent";
const EVT = "et:consent";

function read(): Consent | null {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(KEY);
    return v === "accepted" || v === "rejected" ? v : null;
  } catch {
    return null;
  }
}

function subscribe(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) cb();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(EVT, cb);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(EVT, cb);
  };
}

export function useConsent() {
  return useSyncExternalStore(subscribe, read, () => null);
}

export function setConsent(v: Consent) {
  try {
    window.localStorage.setItem(KEY, v);
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent(EVT));
}

/** Clear the stored choice — used by the Cookie Policy page. */
export function resetCookieConsent() {
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent(EVT));
  if (typeof window !== "undefined") window.location.reload();
}

/** Returns true if the user has accepted non-essential cookies. */
export function hasConsent(): boolean {
  return read() === "accepted";
}
