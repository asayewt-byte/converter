import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, Card } from "@/components/SiteShell";
import { CalendarCheck } from "lucide-react";
import {
  ETHIOPIAN_DAYS,
  formatEthiopian,
  todayInEthiopia,
} from "@/lib/ethiopian-calendar";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/ethiopian-date-today")({
  head: () => ({
    meta: [
      { title: "Ethiopia Date Today — What's Today's Ethiopian Calendar Date?" },
      {
        name: "description",
        content: "What is today's date in Ethiopia? Get today's Ethiopian calendar date, Gregorian date, and the day of the week — updated live.",
      },
      { property: "og:title", content: "Ethiopia Date Today" },
      { property: "og:description", content: "Check today's Ethiopian date instantly. See the Ge'ez calendar and Gregorian equivalent." },
      { property: "og:url", content: "https://ethiopiatoday.online/ethiopian-date-today" },
      { property: "og:locale", content: "en_US" },
      { property: "og:locale:alternate", content: "am_ET" },
    ],
    links: [{ rel: "canonical", href: "https://ethiopiatoday.online/ethiopian-date-today" }],
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
    <SiteShell icon={CalendarCheck} title="Ethiopia Date Today" intro="What is today's date in the Ethiopian calendar?">
      <Card>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">Today</div>
        <div className="mt-2 text-4xl md:text-5xl font-semibold tracking-tight">
          {formatEthiopian(now.eth, "en")}
        </div>
        <div className="mt-1 text-xl text-muted-foreground">
          {formatEthiopian(now.eth, "am")}
        </div>
        <div className="mt-4 text-base">
          <span className="text-muted-foreground">Day: </span>
          {dow.en} ({dow.am})
        </div>
        <div className="mt-1 text-base">
          <span className="text-muted-foreground">Gregorian: </span>
          {now.greg.toLocaleDateString("en-US", { timeZone: "UTC", year: "numeric", month: "long", day: "numeric" })}
        </div>
      </Card>
    </SiteShell>
  );
}
