import { createFileRoute } from "@tanstack/react-router";
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
    <SiteShell icon={Sigma}
      title="Date Difference"
      intro="Calculate the number of days, weeks, months and years between any two dates."
    >
      <Card className="mb-6">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-muted-foreground">Start date</span>
            <input type="date" value={start} onChange={(e) => setStart(e.target.value)}
              className="rounded-md border border-input bg-background px-3 py-2 text-sm" />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-muted-foreground">End date</span>
            <input type="date" value={end} onChange={(e) => setEnd(e.target.value)}
              className="rounded-md border border-input bg-background px-3 py-2 text-sm" />
          </label>
        </div>
      </Card>

      {result && (
        <Card>
          <div className="grid gap-6 sm:grid-cols-4 tabular-nums">
            <Stat label="Days" value={result.days.toLocaleString()} />
            <Stat label="Weeks" value={result.weeks.toLocaleString()} />
            <Stat label="Months" value={result.months.toLocaleString()} />
            <Stat label="Years" value={result.years.toString()} />
          </div>
        </Card>
      )}
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
