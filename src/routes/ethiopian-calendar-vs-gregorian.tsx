import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, Card } from "@/components/SiteShell";
import { ArrowRightLeft } from "lucide-react";

export const Route = createFileRoute("/ethiopian-calendar-vs-gregorian")({
  head: () => ({
    meta: [
      { title: "Ethiopian Calendar vs Gregorian" },
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
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SiteShell
      icon={ArrowRightLeft}
      eyebrow="Article"
      title="Ethiopian calendar vs Gregorian"
      intro="Both are solar calendars, but they differ in month structure and historical year count."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <h2 className="font-serif text-2xl tracking-tight">Ethiopian</h2>
          <ul className="mt-3 space-y-2 text-muted-foreground leading-7 list-disc pl-5">
            <li>13 months total</li>
            <li>12 months x 30 days + Pagume</li>
            <li>Year count typically 7 to 8 years behind Gregorian</li>
            <li>Common for domestic civil and cultural date references</li>
          </ul>
        </Card>

        <Card>
          <h2 className="font-serif text-2xl tracking-tight">Gregorian</h2>
          <ul className="mt-3 space-y-2 text-muted-foreground leading-7 list-disc pl-5">
            <li>12 months with varying day lengths</li>
            <li>Global default for international systems</li>
            <li>Standard in most software and APIs</li>
            <li>Common for cross-border communication and contracts</li>
          </ul>
        </Card>

        <Card className="md:col-span-2">
          <h2 className="font-serif text-2xl tracking-tight">When to convert</h2>
          <p className="mt-3 text-muted-foreground leading-7">
            Convert whenever a document crosses local and international contexts: appointments, education records,
            travel, finance, and reporting. Storing both formats reduces errors.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Use the <Link to="/ethiopian-calendar-converter" className="text-primary underline underline-offset-4">Calendar Converter</Link>{" "}
            for direct conversion.
          </p>
        </Card>
      </div>
    </SiteShell>
  );
}
