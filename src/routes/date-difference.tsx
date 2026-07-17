import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, Card } from "@/components/SiteShell";
import { Sigma } from "lucide-react";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/date-difference")({
  head: () => ({
    meta: [
      { title: "Date Difference Calculator — Days Between Two Dates" },
      {
        name: "description",
        content: "Calculate the number of days, weeks, months and years between any two dates.",
      },
      { property: "og:title", content: "Date Difference Calculator" },
      { property: "og:description", content: "Days between two dates." },
      { property: "og:url", content: "https://ethiopiatoday.online/date-difference" },
    ],
    links: [{ rel: "canonical", href: "https://ethiopiatoday.online/date-difference" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "How do I calculate days between two dates?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Enter start and end dates. The calculator computes exact day distance and also provides approximate weeks, months, and years.",
              },
            },
            {
              "@type": "Question",
              name: "Can the result be negative?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. If the end date is earlier than the start date, the day count becomes negative to show reverse direction.",
              },
            },
            {
              "@type": "Question",
              name: "Are month and year values exact calendar months?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Days are exact. Weeks are derived from days. Months and years are practical approximations for quick planning.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: DateDiff,
});

function DateDiff() {
  const [start, setStart] = useState(() => new Date().toISOString().slice(0, 10));
  const [end, setEnd] = useState(() => {
    const d = new Date();
    d.setUTCFullYear(d.getUTCFullYear() + 1);
    return d.toISOString().slice(0, 10);
  });

  const result = useMemo(() => {
    if (!start || !end) return null;
    const a = new Date(start);
    const b = new Date(end);
    if (Number.isNaN(a.getTime()) || Number.isNaN(b.getTime())) return null;
    const ms = b.getTime() - a.getTime();
    const days = Math.round(ms / 86400000);
    return {
      days,
      weeks: Math.floor(days / 7),
      months: Math.round(days / 30.4375),
      years: Math.round((days / 365.25) * 10) / 10,
    };
  }, [start, end]);

  return (
    <SiteShell
      icon={Sigma}
      title="Date Difference"
      intro="Calculate the number of days, weeks, months and years between any two dates."
    >
      <Card className="mb-6">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-muted-foreground">Start date</span>
            <input
              type="date"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-muted-foreground">End date</span>
            <input
              type="date"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              className="rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </label>
        </div>
      </Card>

      {result && (
        <Card>
          <div className="grid gap-6 tabular-nums sm:grid-cols-4">
            <Stat label="Days" value={result.days.toLocaleString()} />
            <Stat label="Weeks" value={result.weeks.toLocaleString()} />
            <Stat label="Months" value={result.months.toLocaleString()} />
            <Stat label="Years" value={result.years.toString()} />
          </div>
        </Card>
      )}

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card>
          <h2 className="font-serif text-2xl tracking-tight">How to interpret the result</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            The day count is the most precise output for deadlines and eligibility windows. Weeks,
            months, and years provide planning-friendly summaries for long ranges.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            If you choose an end date before the start date, values become negative to indicate the
            interval runs backward.
          </p>
        </Card>

        <Card>
          <h2 className="font-serif text-2xl tracking-tight">Common use cases</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-7 text-muted-foreground">
            <li>Count days left until events or application deadlines.</li>
            <li>Measure service duration, project windows, or travel intervals.</li>
            <li>Estimate age gaps and educational or work timeline differences.</li>
            <li>Plan payment schedules and reminder cadence.</li>
          </ul>
        </Card>
      </div>

      <Card className="mt-6">
        <h2 className="font-serif text-2xl tracking-tight">Related tools</h2>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          Need personal age detail? Open
          <Link to="/age-calculator" className="mx-1 text-primary underline underline-offset-4">
            age calculator
          </Link>
          . For Ethiopian date context, check
          <Link to="/ethiopian-date-today" className="ml-1 text-primary underline underline-offset-4">
            Ethiopia date today
          </Link>
          and
          <Link to="/ethiopian-calendar" className="ml-1 text-primary underline underline-offset-4">
            Ethiopian calendar
          </Link>
          .
        </p>
      </Card>

      <Card className="mt-6">
        <h2 className="font-serif text-2xl tracking-tight">FAQ</h2>
        <div className="mt-4 space-y-4 text-sm leading-7 text-muted-foreground">
          <div>
            <h3 className="font-medium text-foreground">Is the day count exact?</h3>
            <p>Yes, days are computed directly from date timestamps.</p>
          </div>
          <div>
            <h3 className="font-medium text-foreground">Why are months approximate?</h3>
            <p>
              Month lengths vary (28–31 days), so month totals are represented as practical rounded
              estimates for quick reading.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-foreground">Can I use this for historical and future dates?</h3>
            <p>
              Yes. You can choose past or future dates and compare any two valid calendar dates.
            </p>
          </div>
        </div>
      </Card>
    </SiteShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="mt-1 text-3xl font-semibold tracking-tight">{value}</div>
    </div>
  );
}
