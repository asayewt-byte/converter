import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, Card } from "@/components/SiteShell";
import { Cookie } from "lucide-react";
import { resetCookieConsent } from "@/components/CookieConsent";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Cookie Policy — Ethiopia Today" },
      {
        name: "description",
        content:
          "What cookies Ethiopia Today uses, why, and how to change or withdraw your consent.",
      },
      { property: "og:title", content: "Cookie Policy — Ethiopia Today" },
      { property: "og:description", content: "Cookies used on Ethiopia Today and your choices." },
      { property: "og:url", content: "https://ethiopiatoday.online/cookies" },
    ],
    links: [{ rel: "canonical", href: "https://ethiopiatoday.online/cookies" }],
  }),
  component: CookiesPage,
});

function CookiesPage() {
  return (
    <SiteShell
      icon={Cookie}
      eyebrow="Legal"
      title="Cookie Policy"
      intro="A short, plain-language rundown of the cookies this site sets and how to control them."
    >
      <Card>
        <div className="space-y-6 text-[15px] leading-[1.7] text-foreground/85">
          <section>
            <h2 className="font-serif text-xl mb-2 text-foreground">Strictly necessary</h2>
            <p>
              A small cookie stores your theme (light/dark) and your cookie-
              consent choice so the banner doesn't reappear on every page.
              These cannot be disabled from the banner because the site would
              not function without them, but you can clear them in your browser.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl mb-2 text-foreground">Analytics</h2>
            <p>
              We use privacy-respecting analytics to count page views and
              understand which utilities are useful. No cross-site tracking
              profile is built from this data.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl mb-2 text-foreground">Advertising</h2>
            <p>
              When enabled, Google AdSense and its partners may set cookies to
              serve and measure ads. In the EU, UK and Switzerland, personalised
              ad cookies are only set after you accept them in the consent
              banner. You can withdraw consent any time using the button below.
            </p>
          </section>

          <section className="pt-2">
            <button
              type="button"
              onClick={resetCookieConsent}
              className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card px-4 py-2 text-sm font-medium hover:border-accent/70 transition-colors"
            >
              Review my cookie choices
            </button>
          </section>
        </div>
      </Card>
    </SiteShell>
  );
}
