import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, Card } from "@/components/SiteShell";
import { CalendarDays } from "lucide-react";

export const Route = createFileRoute("/ethiopian-holidays-explained")({
  head: () => ({
    meta: [
      { title: "Ethiopian Holidays Explained" },
      {
        name: "description",
        content:
          "A practical overview of Ethiopian public and religious holidays, and how dates are interpreted across calendars.",
      },
      { property: "og:title", content: "Ethiopian Holidays Explained" },
      {
        property: "og:description",
        content: "Learn the main Ethiopian holidays and how their dates are presented.",
      },
      { property: "og:url", content: "https://ethiopiatoday.online/ethiopian-holidays-explained" },
    ],
    links: [{ rel: "canonical", href: "https://ethiopiatoday.online/ethiopian-holidays-explained" }],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SiteShell
      icon={CalendarDays}
      eyebrow="Article"
      title="Ethiopian holidays explained"
      intro="Holidays in Ethiopia combine civic observances and major religious events, often tracked in Ethiopian date format."
    >
      <div className="grid gap-6">
        <Card>
          <h2 className="font-serif text-2xl tracking-tight">1) Public and religious calendars overlap</h2>
          <p className="mt-3 text-muted-foreground leading-7">
            Ethiopian holiday schedules often mix fixed-date public holidays with religious observances.
            Some are best known by Ethiopian date names in local use.
          </p>
        </Card>

        <Card>
          <h2 className="font-serif text-2xl tracking-tight">2) Why date conversion matters</h2>
          <p className="mt-3 text-muted-foreground leading-7">
            International schedules are usually shared in Gregorian format. Local planning frequently uses Ethiopian dates.
            Conversion tools help avoid confusion in workplaces, schools, and travel plans.
          </p>
        </Card>

        <Card>
          <h2 className="font-serif text-2xl tracking-tight">3) Annual planning tip</h2>
          <p className="mt-3 text-muted-foreground leading-7">
            Keep a yearly holiday list in both calendars, then update monthly for details.
            This approach is useful for payroll, logistics, and event planning.
          </p>
        </Card>

        <p className="text-sm text-muted-foreground">
          Open the full list on <Link to="/ethiopian-holidays" className="text-primary underline underline-offset-4">Ethiopian Holidays</Link>.
        </p>
      </div>
    </SiteShell>
  );
}
