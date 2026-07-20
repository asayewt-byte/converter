import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, Card } from "@/components/SiteShell";
import { CalendarDays } from "lucide-react";
import { todayInEthiopia, ETHIOPIAN_MONTHS } from "@/lib/ethiopian-calendar";
import { useMemo } from "react";

export const Route = createFileRoute("/ethiopian-holidays")({
  head: () => ({
    meta: [
      { title: "Ethiopian Public Holidays — Full List with Dates" },
      {
        name: "description",
        content:
          "Ethiopian public and religious holidays: Enkutatash, Meskel, Genna, Timket, Fasika, Eid, and more — with Ethiopian and Gregorian dates.",
      },
      { property: "og:title", content: "Ethiopian Public Holidays" },
      { property: "og:description", content: "Public and religious holidays in Ethiopia with practical planning context." },
      { property: "og:url", content: "https://ethiopiatoday.online/ethiopian-holidays" },
      { property: "og:locale", content: "en_US" },
      { property: "og:locale:alternate", content: "am_ET" },
    ],
    links: [{ rel: "canonical", href: "https://ethiopiatoday.online/ethiopian-holidays" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Are all Ethiopian holidays on fixed Gregorian dates?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. Some holidays are fixed in the Ethiopian calendar, while others such as Fasika and major Islamic observances move each year.",
              },
            },
            {
              "@type": "Question",
              name: "Why are some holidays shown as approximate Gregorian dates?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "A fixed Ethiopian calendar holiday lands around the same Gregorian date each year, but leap-year alignment can shift the exact equivalent slightly.",
              },
            },
            {
              "@type": "Question",
              name: "How should I plan around movable holidays?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Use the yearly list as a guide and confirm exact current-year observance dates closer to the season, especially for travel, payroll, and event planning.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: HolidaysPage,
});

const HOLIDAYS = [
  { name: "Enkutatash (Ethiopian New Year)", ethMonth: 1, ethDay: 1, gregNote: "≈ Sep 11 / 12", type: "Public" },
  { name: "Meskel (Finding of the True Cross)", ethMonth: 1, ethDay: 17, gregNote: "≈ Sep 27", type: "Religious" },
  { name: "Genna (Ethiopian Christmas)", ethMonth: 4, ethDay: 29, gregNote: "≈ Jan 7", type: "Religious" },
  { name: "Timket (Epiphany)", ethMonth: 5, ethDay: 11, gregNote: "≈ Jan 19", type: "Religious" },
  { name: "Adwa Victory Day", ethMonth: 6, ethDay: 23, gregNote: "Mar 2", type: "Public" },
  { name: "International Labour Day", ethMonth: 8, ethDay: 23, gregNote: "May 1", type: "Public" },
  { name: "Ethiopian Patriots' Victory Day", ethMonth: 8, ethDay: 27, gregNote: "May 5", type: "Public" },
  { name: "Downfall of the Derg Regime", ethMonth: 9, ethDay: 20, gregNote: "May 28", type: "Public" },
  { name: "Fasika (Ethiopian Easter)", movable: true, gregNote: "Movable — Orthodox Easter", type: "Religious" },
  { name: "Eid al-Fitr", movable: true, gregNote: "Movable — end of Ramadan", type: "Religious" },
  { name: "Eid al-Adha (Arafa)", movable: true, gregNote: "Movable — Hajj", type: "Religious" },
  { name: "Mawlid (Birth of the Prophet)", movable: true, gregNote: "Movable — Rabi' al-awwal", type: "Religious" },
] as const;

function HolidaysPage() {
  const today = todayInEthiopia();
  const year = today.eth.year;

  const rows = useMemo(
    () =>
      HOLIDAYS.map((h) => ({
        ...h,
        ethLabel:
          "ethMonth" in h && h.ethMonth
            ? `${ETHIOPIAN_MONTHS[h.ethMonth - 1].en} ${h.ethDay}, ${year}`
            : "—",
      })),
    [year],
  );

  return (
    <SiteShell
      icon={CalendarDays}
      title={`Ethiopian Public Holidays · ${year}`}
      intro="Major public and religious holidays observed across Ethiopia. Movable religious dates depend on lunar or Paschal calculations and are marked accordingly."
    >
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="py-3">Holiday</th>
                <th className="py-3">Ethiopian</th>
                <th className="py-3">Gregorian</th>
                <th className="py-3">Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((h) => (
                <tr key={h.name}>
                  <td className="py-3 font-medium">{h.name}</td>
                  <td className="py-3 text-muted-foreground">{h.ethLabel}</td>
                  <td className="py-3 text-muted-foreground">{h.gregNote}</td>
                  <td className="py-3">
                    <span className="rounded-full bg-secondary px-2 py-0.5 text-xs">{h.type}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card>
          <h2 className="font-serif text-2xl tracking-tight">Fixed holidays vs movable observances</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Some Ethiopian holidays are easy to track because they are fixed in the Ethiopian
            calendar. Others depend on religious computation, lunar observation, or annual church
            calculations. That is why a useful holiday page should clearly distinguish fixed dates
            from movable ones instead of pretending they behave the same way.
          </p>
        </Card>
        <Card>
          <h2 className="font-serif text-2xl tracking-tight">How this helps with planning</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            A dual-calendar holiday reference is helpful for leave planning, payroll timing, travel,
            family events, and school or office schedules. When the audience includes people outside
            Ethiopia, showing both Ethiopian and Gregorian context reduces misunderstandings.
          </p>
        </Card>
      </div>

      <Card className="mt-6">
        <h2 className="font-serif text-2xl tracking-tight">Related pages</h2>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          For background reading, open
          <Link to="/ethiopian-holidays-explained" className="mx-1 text-primary underline underline-offset-4">
            Ethiopian holidays explained
          </Link>
          . You can also use
          <Link to="/ethiopian-calendar" className="ml-1 text-primary underline underline-offset-4">
            Ethiopian calendar
          </Link>
          and
          <Link
            to="/ethiopian-calendar-converter"
            className="ml-1 text-primary underline underline-offset-4"
          >
            calendar converter
          </Link>
          for date comparison.
        </p>
      </Card>

      <Card className="mt-6">
        <h2 className="font-serif text-2xl tracking-tight">FAQ</h2>
        <div className="mt-4 space-y-4 text-sm leading-7 text-muted-foreground">
          <div>
            <h3 className="font-medium text-foreground">Are Islamic holidays fixed on the same day every year?</h3>
            <p>
              No. Islamic holidays move because they follow a different lunar calendar system.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-foreground">Why is Enkutatash sometimes shown as September 11 or 12?</h3>
            <p>
              Gregorian leap-year alignment can shift the matching date slightly across years.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-foreground">Should I confirm dates before booking travel?</h3>
            <p>
              Yes. For movable observances or official closures, always confirm the current year's
              exact schedule before making final arrangements.
            </p>
          </div>
        </div>
      </Card>
    </SiteShell>
  );
}
