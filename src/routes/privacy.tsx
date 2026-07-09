import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, Card } from "@/components/SiteShell";
import { ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Ethiopia Today" },
      {
        name: "description",
        content:
          "How Ethiopia Today handles data: analytics, advertising cookies, third-party services, and your choices.",
      },
      { property: "og:title", content: "Privacy Policy — Ethiopia Today" },
      { property: "og:description", content: "How Ethiopia Today handles data." },
      { property: "og:url", content: "https://ethiopiatoday.online/privacy" },
    ],
    links: [{ rel: "canonical", href: "https://ethiopiatoday.online/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const updated = "9 July 2026";
  return (
    <SiteShell
      icon={ShieldCheck}
      eyebrow="Legal"
      title="Privacy Policy"
      intro={`Last updated ${updated}. This page explains what data Ethiopia Today collects, how it is used, and the choices you have.`}
    >
      <Card className="prose-invert">
        <div className="space-y-6 text-[15px] leading-[1.7] text-foreground/85">
          <section>
            <h2 className="font-serif text-xl mb-2 text-foreground">Who we are</h2>
            <p>
              Ethiopia Today is a free daily utilities site (Ethiopian calendar,
              currency, gold price, time, holidays, calculators) operated by the
              Ethiopia Today team. Contact:{" "}
              <a className="text-primary underline underline-offset-4" href="/contact">
                the contact page
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl mb-2 text-foreground">What we collect</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong>Usage data</strong> — page views, referrer, device type,
                approximate location (country/region), browser and OS. Collected
                via privacy-respecting analytics to understand which utilities are
                useful.
              </li>
              <li>
                <strong>Cookies & similar</strong> — a small preference cookie for
                theme (light/dark), a consent cookie recording your ad-cookie
                choice, and cookies set by third-party providers listed below.
              </li>
              <li>
                <strong>Contact form</strong> — the name, email, and message you
                submit, used only to reply.
              </li>
              <li>
                We do <strong>not</strong> ask for or store account passwords,
                government IDs, or payment details.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl mb-2 text-foreground">Advertising</h2>
            <p>
              This site may display ads served by Google AdSense and its
              advertising partners. Google uses cookies and device identifiers to
              serve ads based on your prior visits to this and other websites.
              You can opt out of personalised advertising by visiting{" "}
              <a
                className="text-primary underline underline-offset-4"
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noreferrer"
              >
                Google Ads Settings
              </a>
              , or opt out of a third-party vendor's use of cookies for
              personalised advertising at{" "}
              <a
                className="text-primary underline underline-offset-4"
                href="https://www.aboutads.info"
                target="_blank"
                rel="noreferrer"
              >
                aboutads.info
              </a>
              . EU/UK/Swiss visitors are shown a consent choice before
              personalised ad cookies are set.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl mb-2 text-foreground">Third-party services</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Google AdSense — advertising</li>
              <li>Google Analytics / privacy-respecting analytics — usage stats</li>
              <li>Exchange-rate data from public APIs (open.er-api.com)</li>
              <li>Hosting via our web host and CDN</li>
            </ul>
            <p className="mt-2">
              Each provider processes limited data (IP, user-agent, request
              metadata) under its own privacy policy.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl mb-2 text-foreground">Your choices</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Change or withdraw cookie consent from the banner or your browser settings.</li>
              <li>Block third-party cookies at the browser level.</li>
              <li>
                Request access, correction, or deletion of any personal data by
                emailing us via the contact page.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl mb-2 text-foreground">Children</h2>
            <p>
              Ethiopia Today is not directed at children under 13 and does not
              knowingly collect personal information from them.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl mb-2 text-foreground">Changes</h2>
            <p>
              We may update this policy occasionally. The "last updated" date at
              the top of the page reflects the most recent change.
            </p>
          </section>
        </div>
      </Card>
    </SiteShell>
  );
}
