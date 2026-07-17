import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, Card } from "@/components/SiteShell";
import { Cake } from "lucide-react";
import { ETHIOPIAN_MONTHS, gregorianToEthiopian, todayInEthiopia } from "@/lib/ethiopian-calendar";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/age-calculator")({
  head: () => ({
    meta: [
      { title: "Age Calculator — Ethiopian & Gregorian Age from Birth Date" },
      {
        name: "description",
        content:
          "Calculate your exact age in years, months and days — in both the Ethiopian and Gregorian calendars.",
      },
      { property: "og:title", content: "Age Calculator" },
      { property: "og:description", content: "Your age in Ethiopian and Gregorian calendars." },
      { property: "og:url", content: "https://ethiopiatoday.online/age-calculator" },
    ],
    links: [{ rel: "canonical", href: "https://ethiopiatoday.online/age-calculator" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Can I calculate age using Ethiopian calendar context?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. This page computes age from Gregorian birth input and also shows the equivalent Ethiopian birth date.",
              },
            },
            {
              "@type": "Question",
              name: "Why do I see years, months and days instead of only years?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Detailed age is more useful for official forms, school records, and eligibility checks that require exact elapsed time.",
              },
            },
            {
              "@type": "Question",
              name: "Does leap year affect age calculation?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Leap years can shift day and month totals, so this calculator uses date-based computation instead of fixed approximations.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: AgePage,
});

function AgePage() {
  const today = todayInEthiopia();
  const [dob, setDob] = useState<string>(() => {
    const g = new Date(today.greg);
    g.setUTCFullYear(g.getUTCFullYear() - 25);
    return g.toISOString().slice(0, 10);
  });

  const result = useMemo(() => {
    if (!dob) return null;
    const [y, m, d] = dob.split("-").map(Number);
    const birth = new Date(Date.UTC(y, m - 1, d));
    if (Number.isNaN(birth.getTime())) return null;
    const now = today.greg;

    let years = now.getUTCFullYear() - birth.getUTCFullYear();
    let months = now.getUTCMonth() - birth.getUTCMonth();
    let days = now.getUTCDate() - birth.getUTCDate();
    if (days < 0) {
      months -= 1;
      const prev = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 0));
      days += prev.getUTCDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }
    const totalDays = Math.floor((now.getTime() - birth.getTime()) / 86400000);
    const eth = gregorianToEthiopian(y, m, d);
    return { years, months, days, totalDays, eth };
  }, [dob, today.greg]);

  return (
    <SiteShell
      icon={Cake}
      title="Age Calculator"
      intro="Enter your date of birth to see your exact age in both the Gregorian and Ethiopian calendars."
    >
      <Card className="mb-6">
        <label className="flex max-w-xs flex-col gap-1 text-sm">
          <span className="text-muted-foreground">Date of birth (Gregorian)</span>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
        </label>
      </Card>

      {result && (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Your age</div>
            <div className="mt-2 text-4xl font-semibold tracking-tight tabular-nums">
              {result.years}{" "}
              <span className="text-lg font-normal text-muted-foreground">years</span> {result.months}{" "}
              <span className="text-lg font-normal text-muted-foreground">months</span> {result.days}{" "}
              <span className="text-lg font-normal text-muted-foreground">days</span>
            </div>
            <div className="mt-3 text-sm text-muted-foreground tabular-nums">
              Total: {result.totalDays.toLocaleString()} days ·{" "}
              {Math.floor(result.totalDays / 7).toLocaleString()} weeks
            </div>
          </Card>
          <Card>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Born on (Ethiopian)</div>
            <div className="mt-2 text-3xl font-semibold tracking-tight">
              {ETHIOPIAN_MONTHS[result.eth.month - 1].en} {result.eth.day}, {result.eth.year}
            </div>
            <div className="text-lg text-muted-foreground">
              {ETHIOPIAN_MONTHS[result.eth.month - 1].am} {result.eth.day}, {result.eth.year}
            </div>
          </Card>
        </div>
      )}

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card>
          <h2 className="font-serif text-2xl tracking-tight">How this age result is useful</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Many official and educational documents need exact age in years, months, and days rather
            than rounded years. This output helps for forms, admissions, and timeline planning.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Seeing the Ethiopian birth date alongside Gregorian also helps when records use different
            calendar systems.
          </p>
        </Card>
        <Card>
          <h2 className="font-serif text-2xl tracking-tight">Calculation notes</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-7 text-muted-foreground">
            <li>Age is computed from exact date difference, not rough formulas.</li>
            <li>Month and day rollover is handled to avoid off-by-one errors.</li>
            <li>Leap-year effects are included through actual calendar dates.</li>
          </ul>
        </Card>
      </div>

      <Card className="mt-6">
        <h2 className="font-serif text-2xl tracking-tight">Related tools</h2>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          Need interval planning? Use
          <Link to="/date-difference" className="mx-1 text-primary underline underline-offset-4">
            date difference calculator
          </Link>
          . For calendar context, check
          <Link to="/ethiopian-calendar" className="ml-1 text-primary underline underline-offset-4">
            Ethiopian calendar
          </Link>
          and
          <Link
            to="/ethiopian-calendar-converter"
            className="ml-1 text-primary underline underline-offset-4"
          >
            converter
          </Link>
          .
        </p>
      </Card>

      <Card className="mt-6">
        <h2 className="font-serif text-2xl tracking-tight">FAQ</h2>
        <div className="mt-4 space-y-4 text-sm leading-7 text-muted-foreground">
          <div>
            <h3 className="font-medium text-foreground">Can I use this for official age checks?</h3>
            <p>
              It is a practical calculator for reference. For legal or institutional matters, confirm
              with the official document authority.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-foreground">Why might my rounded age look different?</h3>
            <p>
              Rounded age (just years) can differ from exact age because months and days may not yet
              complete a full additional year.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-foreground">Does it support Ethiopian input birth dates?</h3>
            <p>
              This page takes Gregorian input and displays Ethiopian equivalent output. You can use
              the calendar converter for explicit Ethiopian-to-Gregorian conversion steps.
            </p>
          </div>
        </div>
      </Card>
    </SiteShell>
  );
}
