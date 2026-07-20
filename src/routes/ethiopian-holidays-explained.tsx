import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, Card } from "@/components/SiteShell";
import { CalendarDays } from "lucide-react";

export const Route = createFileRoute("/ethiopian-holidays-explained")({
  head: () => ({
    meta: [
      { title: "Ethiopian Holidays Explained — Public and Religious Observances" },
      {
        name: "description",
        content:
          "A practical overview of Ethiopian public and religious holidays, and how dates are interpreted across calendars.",
      },
      { property: "og:title", content: "Ethiopian Holidays Explained" },
      {
        property: "og:description",
        content: "Learn the main Ethiopian holidays, how dates are interpreted, and how to plan around them.",
      },
      { property: "og:url", content: "https://ethiopiatoday.online/ethiopian-holidays-explained" },
    ],
    links: [{ rel: "canonical", href: "https://ethiopiatoday.online/ethiopian-holidays-explained" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Why do Ethiopian holiday dates sometimes look different internationally?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Because local planning may use Ethiopian calendar dates while international communication usually uses Gregorian dates, the same holiday can be described in two formats.",
              },
            },
            {
              "@type": "Question",
              name: "Are all Ethiopian holidays religious?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. Ethiopia observes both civic/public holidays and major religious holidays across different traditions.",
              },
            },
            {
              "@type": "Question",
              name: "How can I avoid mistakes when planning around holidays?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Track both Ethiopian and Gregorian references, and confirm movable observances closer to the actual season.",
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
      icon={CalendarDays}
      eyebrow="Guide"
      title="Ethiopian holidays explained"
      intro="Holidays in Ethiopia combine civic observances and major religious events, often tracked in Ethiopian date format and communicated in multiple ways."
    >
      <div className="grid gap-6">
        <Card>
          <h2 className="font-serif text-2xl tracking-tight">1) Public and religious calendars overlap</h2>
          <p className="mt-3 leading-7 text-muted-foreground">
            Ethiopian holiday schedules often mix fixed public holidays with religious observances.
            Some are best known by Ethiopian date names in local use, while others are easier for
            international audiences to recognize through Gregorian equivalents.
          </p>
        </Card>

        <Card>
          <h2 className="font-serif text-2xl tracking-tight">2) Why date conversion matters</h2>
          <p className="mt-3 leading-7 text-muted-foreground">
            International schedules are usually shared in Gregorian format. Local planning frequently
            uses Ethiopian dates. Conversion tools help avoid confusion in workplaces, schools,
            travel plans, and event calendars when people are reading the same holiday through two
            different systems.
          </p>
        </Card>

        <Card>
          <h2 className="font-serif text-2xl tracking-tight">3) Fixed holidays and movable holidays are not the same</h2>
          <p className="mt-3 leading-7 text-muted-foreground">
            Some holidays land in predictable seasonal windows every year, while others move because
            they depend on religious calculation or lunar timing. A useful holiday guide should not
            flatten those differences. It should tell users what is stable and what needs final
            yearly confirmation.
          </p>
        </Card>

        <Card>
          <h2 className="font-serif text-2xl tracking-tight">4) Annual planning tip</h2>
          <p className="mt-3 leading-7 text-muted-foreground">
            Keep a yearly holiday list in both calendars, then update monthly for details. This is a
            practical approach for payroll, logistics, event planning, family travel, and school
            scheduling.
          </p>
        </Card>

        <Card>
          <h2 className="font-serif text-2xl tracking-tight">Related pages</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Open the full list on
            <Link to="/ethiopian-holidays" className="mx-1 text-primary underline underline-offset-4">
              Ethiopian Holidays
            </Link>
            and use
            <Link to="/ethiopian-calendar" className="ml-1 text-primary underline underline-offset-4">
              Ethiopian calendar
            </Link>
            if you want to compare dates in month view.
          </p>
        </Card>

        <Card>
          <h2 className="font-serif text-2xl tracking-tight">FAQ</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-muted-foreground">
            <div>
              <h3 className="font-medium text-foreground">Why do people use both calendars for holidays?</h3>
              <p>
                Ethiopian dates are commonly used locally, while Gregorian dates are standard for
                international coordination and software systems.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-foreground">Can one holiday have two date references?</h3>
              <p>
                Yes. One holiday can be named in Ethiopian date terms locally and also described by
                its Gregorian equivalent for broader communication.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-foreground">Should I confirm movable observances each year?</h3>
              <p>
                Yes. Movable religious holidays should be checked each season before making final
                plans.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </SiteShell>
  );
}
