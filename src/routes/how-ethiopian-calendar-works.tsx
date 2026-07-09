import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, Card } from "@/components/SiteShell";
import { Calendar } from "lucide-react";

export const Route = createFileRoute("/how-ethiopian-calendar-works")({
  head: () => ({
    meta: [
      { title: "How the Ethiopian Calendar Works" },
      {
        name: "description",
        content:
          "A practical guide to the Ethiopian calendar: 13 months, New Year timing, and why the year number differs from Gregorian.",
      },
      { property: "og:title", content: "How the Ethiopian Calendar Works" },
      {
        property: "og:description",
        content: "Understand the Ethiopian calendar system in plain language.",
      },
      { property: "og:url", content: "https://ethiopiatoday.online/how-ethiopian-calendar-works" },
    ],
    links: [{ rel: "canonical", href: "https://ethiopiatoday.online/how-ethiopian-calendar-works" }],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SiteShell
      icon={Calendar}
      eyebrow="Article"
      title="How the Ethiopian calendar works"
      intro="The Ethiopian calendar follows its own rhythm: 13 months, a distinct year count, and holidays aligned to local tradition."
    >
      <div className="grid gap-6">
        <Card>
          <h2 className="font-serif text-2xl tracking-tight">1) Thirteen months, not twelve</h2>
          <p className="mt-3 text-muted-foreground leading-7">
            Ethiopia uses 12 months of 30 days each, then a short 13th month called Pagume with 5 days,
            or 6 in a leap year. This keeps the calendar close to the solar year while remaining easy to count.
          </p>
        </Card>

        <Card>
          <h2 className="font-serif text-2xl tracking-tight">2) Why the year number is different</h2>
          <p className="mt-3 text-muted-foreground leading-7">
            Ethiopian year numbering follows a different historical calculation than Gregorian calendars.
            In practice, Ethiopian years are roughly 7 to 8 years behind Gregorian depending on the date.
          </p>
        </Card>

        <Card>
          <h2 className="font-serif text-2xl tracking-tight">3) New Year starts in September</h2>
          <p className="mt-3 text-muted-foreground leading-7">
            Enkutatash, the Ethiopian New Year, usually falls on September 11 (or September 12 in the year before
            a Gregorian leap year). This date marks the reset of the Ethiopian year.
          </p>
        </Card>

        <Card>
          <h2 className="font-serif text-2xl tracking-tight">4) It is a living civil calendar</h2>
          <p className="mt-3 text-muted-foreground leading-7">
            The Ethiopian calendar is not only ceremonial. It is used in day-to-day life across forms, schedules,
            holidays, and local date references, especially in domestic workflows.
          </p>
        </Card>

        <p className="text-sm text-muted-foreground">
          Continue with tools: <Link to="/ethiopian-calendar" className="text-primary underline underline-offset-4">Ethiopian Calendar</Link>{" "}
          and <Link to="/ethiopian-calendar-converter" className="text-primary underline underline-offset-4">Calendar Converter</Link>.
        </p>
      </div>
    </SiteShell>
  );
}
