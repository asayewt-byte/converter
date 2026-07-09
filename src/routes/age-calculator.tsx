import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, Card } from "@/components/SiteShell";
import { Cake } from "lucide-react";
import {
  ETHIOPIAN_MONTHS,
  gregorianToEthiopian,
  todayInEthiopia,
} from "@/lib/ethiopian-calendar";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/age-calculator")({
  head: () => ({
    meta: [
      { title: "Age Calculator — Ethiopian & Gregorian Age from Birth Date" },
      {
        name: "description",
        content: "Calculate your exact age in years, months and days — in both the Ethiopian and Gregorian calendars.",
      },
      { property: "og:title", content: "Age Calculator" },
      { property: "og:description", content: "Your age in Ethiopian and Gregorian calendars." },
      { property: "og:url", content: "https://ethiopiatoday.online/age-calculator" },
    ],
    links: [{ rel: "canonical", href: "https://ethiopiatoday.online/age-calculator" }],
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
    <SiteShell icon={Cake}
      title="Age Calculator"
      intro="Enter your date of birth to see your exact age in both the Gregorian and Ethiopian calendars."
    >
      <Card className="mb-6">
        <label className="flex flex-col gap-1 text-sm max-w-xs">
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
            <div className="mt-2 text-4xl font-semibold tabular-nums tracking-tight">
              {result.years} <span className="text-lg font-normal text-muted-foreground">years</span>{" "}
              {result.months} <span className="text-lg font-normal text-muted-foreground">months</span>{" "}
              {result.days} <span className="text-lg font-normal text-muted-foreground">days</span>
            </div>
            <div className="mt-3 text-sm text-muted-foreground tabular-nums">
              Total: {result.totalDays.toLocaleString()} days · {Math.floor(result.totalDays / 7).toLocaleString()} weeks
            </div>
          </Card>
          <Card>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">
              Born on (Ethiopian)
            </div>
            <div className="mt-2 text-3xl font-semibold tracking-tight">
              {ETHIOPIAN_MONTHS[result.eth.month - 1].en} {result.eth.day}, {result.eth.year}
            </div>
            <div className="text-lg text-muted-foreground">
              {ETHIOPIAN_MONTHS[result.eth.month - 1].am} {result.eth.day}, {result.eth.year}
            </div>
          </Card>
        </div>
      )}
    </SiteShell>
  );
}
