import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, Card } from "@/components/SiteShell";
import { Calendar } from "lucide-react";
import {
  ETHIOPIAN_DAYS,
  ETHIOPIAN_MONTHS,
  ethiopianToGregorian,
  gregorianToEthiopian,
  todayInEthiopia,
} from "@/lib/ethiopian-calendar";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/ethiopian-calendar")({
  head: () => ({
    meta: [
      { title: "Ethiopian Calendar — Today's Ge'ez Date & Full Month View" },
      {
        name: "description",
        content:
          "See today's Ethiopian date and browse any month of the Ethiopian (Ge'ez) calendar with the matching Gregorian dates.",
      },
      { property: "og:title", content: "Ethiopian Calendar" },
      { property: "og:description", content: "Today's Ethiopian date and full-month view." },
      { property: "og:url", content: "https://ethiopiatoday.online/ethiopian-calendar" },
      { property: "og:locale", content: "en_US" },
      { property: "og:locale:alternate", content: "am_ET" },
    ],
    links: [{ rel: "canonical", href: "https://ethiopiatoday.online/ethiopian-calendar" }],
  }),
  component: CalendarPage,
});

function CalendarPage() {
  const today = todayInEthiopia();
  const [year, setYear] = useState(today.eth.year);
  const [month, setMonth] = useState(today.eth.month);

  const days = useMemo(() => {
    // Ethiopian months: 1..12 have 30 days, 13 (Pagume) has 5 (6 in leap year: year % 4 == 3)
    const total = month === 13 ? (year % 4 === 3 ? 6 : 5) : 30;
    const cells: { d: number; greg: ReturnType<typeof ethiopianToGregorian>; dow: number }[] = [];
    for (let d = 1; d <= total; d++) {
      const greg = ethiopianToGregorian(year, month, d);
      const jsDate = new Date(Date.UTC(greg.year, greg.month - 1, greg.day));
      cells.push({ d, greg, dow: jsDate.getUTCDay() });
    }
    return cells;
  }, [year, month]);

  const firstDow = days[0]?.dow ?? 0;

  return (
    <SiteShell icon={Calendar}
      title="Ethiopian Calendar"
      intro="Browse any Ethiopian month with the matching Gregorian dates. Today is highlighted."
    >
      <Card className="mb-6">
        <div className="flex flex-wrap items-end gap-4">
          <Field label="Month">
            <select
              className="rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
            >
              {ETHIOPIAN_MONTHS.map((m, i) => (
                <option key={i} value={i + 1}>
                  {m.en} ({m.am})
                </option>
              ))}
            </select>
          </Field>
          <Field label="Year">
            <input
              type="number"
              className="w-28 rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={year}
              onChange={(e) => setYear(Number(e.target.value) || today.eth.year)}
            />
          </Field>
          <button
            type="button"
            onClick={() => {
              setYear(today.eth.year);
              setMonth(today.eth.month);
            }}
            className="ml-auto rounded-md bg-secondary px-3 py-2 text-sm font-medium hover:bg-secondary/70"
          >
            Today
          </button>
        </div>
      </Card>

      <Card className="overflow-hidden p-0">
        <div className="flex items-baseline justify-between gap-3 border-b border-border/60 bg-gradient-to-br from-primary/[0.06] via-background to-background px-5 py-4">
          <div>
            <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              {ETHIOPIAN_MONTHS[month - 1].en}
            </div>
            <div className="mt-0.5 text-2xl font-semibold tracking-tight tabular-nums">
              {ETHIOPIAN_MONTHS[month - 1].am}{" "}
              <span className="text-muted-foreground/80">{year}</span>
            </div>
          </div>
          <div className="text-right text-[11px] leading-tight text-muted-foreground">
            <div>Today</div>
            <div className="mt-0.5 font-medium tabular-nums text-foreground">
              {today.eth.day} {ETHIOPIAN_MONTHS[today.eth.month - 1].en}
            </div>
          </div>
        </div>

        <div className="px-3 pb-4 pt-3 sm:px-5 sm:pb-5">
          <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground/80">
            {ETHIOPIAN_DAYS.map((d, i) => (
              <div key={d.en} className={`py-2 ${i === 0 || i === 6 ? "text-primary/70" : ""}`}>
                {d.am}
              </div>
            ))}
          </div>
          <div className="mt-1 grid grid-cols-7 gap-1 text-center">
            {Array.from({ length: firstDow }).map((_, i) => (
              <div key={`e${i}`} />
            ))}
            {days.map((cell) => {
              const isToday =
                year === today.eth.year && month === today.eth.month && cell.d === today.eth.day;
              const isWeekend = cell.dow === 0 || cell.dow === 6;
              return (
                <div
                  key={cell.d}
                  className={`group relative flex aspect-square flex-col items-center justify-center rounded-lg border transition-colors ${
                    isToday
                      ? "border-primary bg-primary text-primary-foreground shadow-sm"
                      : isWeekend
                        ? "border-transparent bg-muted/40 hover:bg-muted"
                        : "border-transparent hover:border-border/60 hover:bg-secondary/50"
                  }`}
                >
                  <div className="text-[15px] font-semibold leading-none tabular-nums">
                    {cell.d}
                  </div>
                  <div
                    className={`mt-1 text-[9px] leading-none tabular-nums ${
                      isToday ? "opacity-80" : "text-muted-foreground"
                    }`}
                  >
                    {cell.greg.day}/{cell.greg.month}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>
    </SiteShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
