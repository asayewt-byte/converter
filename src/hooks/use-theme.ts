import { useSyncExternalStore } from "react";

export type Theme = "light" | "dark";
const STORAGE_KEY = "et-theme";

function readTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function subscribe(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) cb();
  };
  const mql = window.matchMedia("(prefers-color-scheme: dark)");
  window.addEventListener("storage", onStorage);
  mql.addEventListener("change", cb);
  return () => {
    window.removeEventListener("storage", onStorage);
    mql.removeEventListener("change", cb);
  };
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
}

/**
 * Reads the current theme from localStorage / OS preference and stays in sync
 * across tabs. The theme class is applied pre-hydration by an inline script
 * in __root.tsx, so there is no flash.
 */
export function useTheme(): [Theme, (next: Theme) => void] {
  const theme = useSyncExternalStore(subscribe, readTheme, () => "light" as Theme);

  const setTheme = (next: Theme) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage may be blocked */
    }
    applyTheme(next);
    // Notify same-tab subscribers (StorageEvent does not fire in the writing tab).
    window.dispatchEvent(new StorageEvent("storage", { key: STORAGE_KEY, newValue: next }));
  };

  return [theme, setTheme];
}
