import { Link } from "@tanstack/react-router";
import { useConsent, setConsent } from "@/hooks/use-consent";

// Re-exports keep existing import paths working.
export { hasConsent, resetCookieConsent } from "@/hooks/use-consent";

export function CookieConsent() {
  const consent = useConsent();
  if (consent !== null) return null;

  return (
    <div
      role="region"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-3 bottom-3 z-50 md:inset-x-auto md:right-6 md:bottom-6 md:max-w-md"
    >
      <div className="rounded-2xl border border-border/70 bg-card/95 backdrop-blur-md shadow-lg p-4 md:p-5">
        <p className="text-[13.5px] leading-[1.55] text-foreground/85">
          We use cookies for basic site features and, with your consent, for
          personalised ads and analytics. See our{" "}
          <Link to="/cookies" className="text-primary underline underline-offset-4">
            Cookie Policy
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="text-primary underline underline-offset-4">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="mt-3 flex flex-wrap gap-2 justify-end">
          <button
            type="button"
            onClick={() => setConsent("rejected")}
            className="inline-flex items-center rounded-full border border-border px-3.5 py-1.5 text-[13px] font-medium text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
          >
            Reject non-essential
          </button>
          <button
            type="button"
            onClick={() => setConsent("accepted")}
            className="inline-flex items-center rounded-full bg-foreground px-3.5 py-1.5 text-[13px] font-medium text-background hover:bg-foreground/90 transition-colors"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
