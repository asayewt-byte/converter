import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, Card } from "@/components/SiteShell";
import { Calendar } from "lucide-react";

export const Route = createFileRoute("/ethiopian-13-months-guide")({
  head: () => ({
    meta: [
      { title: "Ethiopian 13 Months Guide" },
      {
        name: "description",
        content:
          "A quick guide to Ethiopia's 13-month calendar design and how Pagume fits into annual planning.",
      },
      { property: "og:title", content: "Ethiopian 13 Months Guide" },
      {
        property: "og:description",
        content: "Understand Pagume and the 13-month structure in the Ethiopian calendar.",
      },
      { property: "og:url", content: "https://ethiopiatoday.online/ethiopian-13-months-guide" },
    ],
    links: [{ rel: "canonical", href: "https://ethiopiatoday.online/ethiopian-13-months-guide" }],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SiteShell
      icon={Calendar}
      eyebrow="Article"
      title="Ethiopian 13 months guide"
      intro="The extra month is not a quirk. It is a clean calendar design that simplifies month lengths for most of the year."
    >
      <div className="grid gap-6">
        <Card>
          <h2 className="font-serif text-2xl tracking-tight">Why 13 months is practical</h2>
          <p className="mt-3 text-muted-foreground leading-7">
            Most months have exactly 30 days, which makes manual planning and recurring schedules easier.
            The calendar then closes with Pagume, a short month that completes the solar cycle.
          </p>
        </Card>

        <Card>
          <h2 className="font-serif text-2xl tracking-tight">How Pagume works</h2>
          <p className="mt-3 text-muted-foreground leading-7">
            Pagume has 5 days in common years and 6 in leap years. It is effectively a compact transition period
            before New Year starts in Meskerem.
          </p>
        </Card>

        <Card>
          <h2 className="font-serif text-2xl tracking-tight">Planning with two calendars</h2>
          <p className="mt-3 text-muted-foreground leading-7">
            Teams that report globally can keep Ethiopian dates for local scheduling and Gregorian dates for external
            systems. A consistent converter step prevents mismatches.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Continue with <Link to="/ethiopian-date-today" className="text-primary underline underline-offset-4">Ethiopian Date Today</Link>.
          </p>
        </Card>
      </div>
    </SiteShell>
  );
}
