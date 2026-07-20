import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, Card } from "@/components/SiteShell";
import { ArrowRightLeft } from "lucide-react";

export const Route = createFileRoute("/ethiopian-calendar-vs-gregorian")({
  head: () => ({
    meta: [
      { title: "Ethiopian Calendar vs Gregorian — Key Differences Explained" },
      {
        name: "description",
        content:
          "Compare Ethiopian and Gregorian calendars: structure, year numbering, and practical date conversion use cases.",
      },
      { property: "og:title", content: "Ethiopian Calendar vs Gregorian" },
      {
        property: "og:description",
        content: "A side-by-side comparison of Ethiopian and Gregorian calendar systems.",
      },
      { property: "og:url", content: "https://ethiopiatoday.online/ethiopian-calendar-vs-gregorian" },
    ],
    links: [{ rel: "canonical", href: "https://ethiopiatoday.online/ethiopian-calendar-vs-gregorian" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What is the main difference between Ethiopian and Gregorian calendars?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The Ethiopian calendar has 13 months and a different year numbering system, while the Gregorian calendar has 12 months with variable lengths and is the global default.",
              },
            },
            {
              "@type": "Question",
              name: "Why are Ethiopian years different?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The Ethiopian calendar follows a different historical year-count tradition, which is why its year numbers are typically 7 to 8 years behind Gregorian counting.",
              },
            },
            {
              "@type": "Question",
              name: "When should I convert dates between the two calendars?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Conversion is useful whenever a document, event, contract, travel plan, or official record crosses local Ethiopian and international contexts.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SiteShell
      icon={ArrowRightLeft}
      eyebrow="Guide"
      title="Ethiopian calendar vs Gregorian"
      intro="Both are solar calendars, but they differ in month structure, year numbering, and practical use across local and international systems."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <h2 className="font-serif text-2xl tracking-tight">Ethiopian calendar</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-7 text-muted-foreground">
            <li>13 months total</li>
            <li>12 months of 30 days plus Pagume</li>
            <li>Year count typically 7 to 8 years behind Gregorian</li>
            <li>Common for domestic civil and cultural date references</li>
          </ul>
        </Card>

        <Card>
          <h2 className="font-serif text-2xl tracking-tight">Gregorian calendar</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-7 text-muted-foreground">
            <li>12 months with varying day lengths</li>
            <li>Global default for international systems</li>
            <li>Standard in most software and APIs</li>
            <li>Common for cross-border communication and formal records</li>
          </ul>
        </Card>

        <Card className="md:col-span-2">
          <h2 className="font-serif text-2xl tracking-tight">Why the difference matters in real life</h2>
          <p className="mt-3 leading-7 text-muted-foreground">
            The difference is not only academic. It affects booking dates, employment records,
            educational documents, remittance notes, event invitations, and local planning. A date
            that looks ordinary in one system can be misunderstood if the reader assumes the other.
          </p>
          <p className="mt-3 leading-7 text-muted-foreground">
            That is why many people keep both formats together when accuracy matters: one for local
            understanding and one for global compatibility.
          </p>
        </Card>

        <Card className="md:col-span-2">
          <h2 className="font-serif text-2xl tracking-tight">When to convert</h2>
          <p className="mt-3 leading-7 text-muted-foreground">
            Convert whenever a document crosses local and international contexts: appointments,
            education records, travel, finance, and reporting. Storing both formats reduces errors
            and makes communication clearer for everyone involved.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Use the
            <Link to="/ethiopian-calendar-converter" className="mx-1 text-primary underline underline-offset-4">
              calendar converter
            </Link>
            for direct conversion and
            <Link to="/ethiopian-calendar" className="ml-1 text-primary underline underline-offset-4">
              Ethiopian calendar
            </Link>
            for month-view context.
          </p>
        </Card>

        <Card className="md:col-span-2">
          <h2 className="font-serif text-2xl tracking-tight">FAQ</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-muted-foreground">
            <div>
              <h3 className="font-medium text-foreground">Is one calendar more accurate than the other?</h3>
              <p>
                They are different systems with different conventions. The important part is using
                the right one for the right context and converting carefully when needed.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-foreground">Why do Ethiopian months seem simpler?</h3>
              <p>
                Because most Ethiopian months have exactly 30 days, which creates a more regular
                monthly pattern for much of the year.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-foreground">Should official records include both dates?</h3>
              <p>
                In many practical situations, yes. Keeping both formats helps prevent cross-system
                confusion.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </SiteShell>
  );
}
