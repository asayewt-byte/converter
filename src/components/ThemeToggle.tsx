import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

export function ThemeToggle() {
  const [theme, setTheme] = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Light mode" : "Dark mode"}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-card/60 text-muted-foreground hover:text-foreground hover:border-accent/60 backdrop-blur-sm transition-colors"
    >
      {isDark ? (
        <Sun width={16} height={16} strokeWidth={1.75} aria-hidden />
      ) : (
        <Moon width={16} height={16} strokeWidth={1.75} aria-hidden />
      )}
    </button>
  );
}
