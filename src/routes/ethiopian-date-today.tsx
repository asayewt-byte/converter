import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, Card } from "@/components/SiteShell";
import { CalendarCheck } from "lucide-react";
import { ETHIOPIAN_DAYS, formatEthiopian, todayInEthiopia } from "@/lib/ethiopian-calendar";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/ethiopian-date-today")({
  head: () => ({
    meta: [
      { title: "Ethiopia Date Today — What's Today's Ethiopian Calendar Date?" },
      {
        name: "description",
        content:
          "What is today's date in Ethiopia? Get today's Ethiopian calendar date, Gregorian date, and the day of the week — updated live.",
      },
      { property: "og:title", content: "Ethiopia Date Today" },
      {
        property: "og:description",
        content: "Check today's Ethiopian date instantly. See the Ge'ez calendar and Gregorian equivalent.",
      },
      { property: "og:url", content: "https://ethiopiatoday.online/ethiopian-date-today" },
      { property: "og:locale", content: "en_US" },
      { property: "og:locale:alternate", content: "am_ET" },
    ],
    links: [{ rel: "canonical", href: "https://ethiopiatoday.online/ethiopian-date-today" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What is today's date in Ethiopia right now?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "This page shows the current Ethiopian calendar date in real time, along with the matching Gregorian date and weekday.",
              },
            },
            {
              "@type": "Question",
              name: "Why is the Ethiopian year different from Gregorian?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The Ethiopian calendar follows a different historical year numbering system, so it is usually around 7 to 8 years behind Gregorian counting.",
              },
            },
            {
              "@type": "Question",
              name: "Does Ethiopia have 13 months?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. The Ethiopian calendar has 12 months of 30 days plus a 13th month, Pagume, with 5 days or 6 in leap years.",
              },
            },
            {
              "@type": "Question",
              name: "When does the Ethiopian date change each day?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "For daily use, dates follow local Ethiopia time. This page refreshes regularly so the shown Ethiopian date stays current.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: DateToday,
});

function DateToday() {
  const [now, setNow] = useState(() => todayInEthiopia());

  useEffect(() => {
    const id = setInterval(() => setNow(todayInEthiopia()), 60_000);
    return () => clearInterval(id);
  }, []);

  const dow = ETHIOPIAN_DAYS[now.greg.getUTCDay()];

  return (
    <SiteShell
      icon={CalendarCheck}
      title="Ethiopia Date Today"
      intro="What is today's date in the Ethiopian calendar?"
    >
      <Card>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">Today</div>
        <div className="mt-2 text-4xl md:text-5xl font-semibold tracking-tight">
          {formatEthiopian(now.eth, "en")}
        </div>
        <div className="mt-1 text-xl text-muted-foreground">{formatEthiopian(now.eth, "am")}</div>
        <div className="mt-4 text-base">
          <span className="text-muted-foreground">Day: </span>
          {dow.en} ({dow.am})
        </div>
        <div className="mt-1 text-base">
          <span className="text-muted-foreground">Gregorian: </span>
          {now.greg.toLocaleDateString("en-US", {
            timeZone: "UTC",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </Card>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card>
          <h2 className="font-serif text-2xl tracking-tight">How Ethiopia date today is calculated</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            The Ethiopian calendar uses a 13-month structure: 12 regular months of 30 days and
            one short month called Pagume. The date you see here is computed from the current
            Gregorian day and mapped to the equivalent Ethiopian year, month, and day.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            This is useful when you need a quick answer to questions like "what is the date in
            Ethiopia today" without manually converting from Gregorian dates.
          </p>
        </Card>

        <Card>
          <h2 className="font-serif text-2xl tracking-tight">Why the year looks different</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Ethiopian year numbering is based on a different historical tradition, so the year
            value is not the same as Gregorian. In most parts of the year, Ethiopian dates appear
            about 7 to 8 years behind Gregorian year numbers.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            That year difference is normal and expected. It does not indicate an error in the
            calendar conversion.
          </p>
        </Card>
      </div>

      <Card className="mt-6">
        <h2 className="font-serif text-2xl tracking-tight">Common uses for Ethiopia date today</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-7 text-muted-foreground">
          <li>Filling forms that ask for Ethiopian calendar dates.</li>
          <li>Checking holiday timing and local event schedules.</li>
          <li>Comparing Ethiopian and Gregorian dates for travel or paperwork.</li>
          <li>Daily reference for schools, offices, and family planning.</li>
        </ul>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">
          Need a full month view or conversion tool? Use the
          <Link to="/ethiopian-calendar" className="mx-1 text-primary underline underline-offset-4">
            Ethiopian calendar
          </Link>
          and
          <Link
            to="/ethiopian-calendar-converter"
            className="ml-1 text-primary underline underline-offset-4"
          >
            date converter
          </Link>
          .
        </p>
      </Card>

      <Card className="mt-6">
        <h2 className="font-serif text-2xl tracking-tight">FAQ</h2>
        <div className="mt-4 space-y-4 text-sm leading-7 text-muted-foreground">
          <div>
            <h3 className="font-medium text-foreground">Is this Ethiopian date updated live?</h3>
            <p>
              Yes. The page refreshes the date regularly so the Ethiopian date display stays in
              sync.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-foreground">
              Is Ethiopian New Year always on the same Gregorian day?
            </h3>
            <p>
              Usually it falls on September 11, and in some years on September 12 due to leap-year
              alignment rules.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-foreground">What is Pagume in the Ethiopian calendar?</h3>
            <p>
              Pagume is the 13th month. It has 5 days in regular years and 6 days in Ethiopian leap
              years.
            </p>
          </div>
        </div>
      </Card>
    </SiteShell>
  );
}
