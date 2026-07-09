import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, Card } from "@/components/SiteShell";
import { FileText } from "lucide-react";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use — Ethiopia Today" },
      {
        name: "description",
        content:
          "The terms that govern your use of Ethiopia Today's free daily utilities.",
      },
      { property: "og:title", content: "Terms of Use — Ethiopia Today" },
      { property: "og:description", content: "Terms that govern your use of Ethiopia Today." },
      { property: "og:url", content: "https://ethiopiatoday.online/terms" },
    ],
    links: [{ rel: "canonical", href: "https://ethiopiatoday.online/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <SiteShell
      icon={FileText}
      eyebrow="Legal"
      title="Terms of Use"
      intro="Please read these terms before using Ethiopia Today. By using the site you agree to them."
    >
      <Card>
        <div className="space-y-6 text-[15px] leading-[1.7] text-foreground/85">
          <section>
            <h2 className="font-serif text-xl mb-2 text-foreground">Service</h2>
            <p>
              Ethiopia Today provides free reference utilities — Ethiopian
              calendar, currency and gold rates, time, holidays and calculators.
              The service is offered "as is" without warranty of any kind.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl mb-2 text-foreground">Accuracy of information</h2>
            <p>
              Exchange rates, gold prices and calendar conversions are
              reference values sourced from third-party providers. They are not
              financial, legal or religious advice. Actual bank, remittance and
              retail prices may differ. Always verify important figures with a
              qualified source before acting on them.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl mb-2 text-foreground">Acceptable use</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Do not attempt to disrupt, overload or scrape the site at abusive rates.</li>
              <li>Do not use the site for anything unlawful.</li>
              <li>Do not misrepresent the site or republish content as your own.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl mb-2 text-foreground">Third-party content and links</h2>
            <p>
              Pages may contain ads and links to third-party sites. We are not
              responsible for the content, policies or practices of those
              third parties.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl mb-2 text-foreground">Limitation of liability</h2>
            <p>
              To the maximum extent permitted by law, Ethiopia Today and its
              operators are not liable for any indirect, incidental or
              consequential damages arising from use of the site or reliance on
              the information it displays.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl mb-2 text-foreground">Changes</h2>
            <p>We may update these terms. Continued use after changes means you accept the updated terms.</p>
          </section>
        </div>
      </Card>
    </SiteShell>
  );
}
