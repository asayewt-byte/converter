import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, Card } from "@/components/SiteShell";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/time-in-ethiopia")({
  head: () => ({
    meta: [
      { title: "Time in Ethiopia — Current Time in Addis Ababa (EAT)" },
      {
        name: "description",
        content: "The current time in Addis Ababa and East Africa Time (EAT · UTC+3), plus the Ethiopian 12-hour clock.",
      },
      { property: "og:title", content: "Time in Ethiopia" },
      { property: "og:description", content: "Current time in Addis Ababa (EAT · UTC+3)." },
      { property: "og:url", content: "https://ethiopiatoday.online/time-in-ethiopia" },
      { property: "og:locale", content: "en_US" },
      { property: "og:locale:alternate", content: "am_ET" },
    ],
    links: [{ rel: "canonical", href: "https://ethiopiatoday.online/time-in-ethiopia" }],
  }),
  component: TimePage,
});

function TimePage() {
  const [nowStr, setNowStr] = useState("");
  const [ethClock, setEthClock] = useState("");
  const [dateStr, setDateStr] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const parts = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Africa/Addis_Ababa",
        hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
      }).formatToParts(now);
      const hh = Number(parts.find((p) => p.type === "hour")!.value);
      const mm = parts.find((p) => p.type === "minute")!.value;
      const ss = parts.find((p) => p.type === "second")!.value;
      setNowStr(`${String(hh).padStart(2, "0")}:${mm}:${ss}`);

      // Ethiopian 12-hour clock: starts at sunrise (~6:00 AM EAT).
      // Ethiopian hour = (hh - 6 + 12) % 12, with day/night labels.
      const ethHour = ((hh - 6 + 24) % 12) || 12;
      const daylight = hh >= 6 && hh < 18;
      setEthClock(`${ethHour}:${mm} ${daylight ? "ጠዋት (day)" : "ማታ (night)"}`);

      setDateStr(
        new Intl.DateTimeFormat("en-US", {
          timeZone: "Africa/Addis_Ababa",
          weekday: "long", year: "numeric", month: "long", day: "numeric",
        }).format(now),
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <SiteShell icon={Clock}
      title="Time in Ethiopia"
      intro="Ethiopia uses East Africa Time (EAT), which is UTC+3 year-round. There is no daylight saving."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Addis Ababa · EAT</div>
          <div className="mt-2 text-6xl font-semibold tabular-nums tracking-tight">
            {nowStr || "—"}
          </div>
          <div className="mt-2 text-muted-foreground">{dateStr}</div>
        </Card>
        <Card>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Ethiopian 12-hour clock</div>
          <div className="mt-2 text-4xl font-semibold tabular-nums tracking-tight">
            {ethClock || "—"}
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            In everyday Ethiopian time, the day begins at sunrise (~6:00 AM EAT).
            So 7:00 AM EAT is "1 ጠዋት" (1 in the morning), and 7:00 PM EAT is "1 ማታ" (1 in the evening).
          </p>
        </Card>
      </div>
    </SiteShell>
  );
}
