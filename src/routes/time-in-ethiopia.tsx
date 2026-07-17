import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, Card } from "@/components/SiteShell";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/time-in-ethiopia")({
  head: () => ({
    meta: [
      { title: "Time in Ethiopia — Current Time in Addis Ababa (EAT)" },
      {
        name: "description",
        content:
          "The current time in Addis Ababa and East Africa Time (EAT · UTC+3), plus the Ethiopian 12-hour clock.",
      },
      { property: "og:title", content: "Time in Ethiopia" },
      { property: "og:description", content: "Current time in Addis Ababa (EAT · UTC+3)." },
      { property: "og:url", content: "https://ethiopiatoday.online/time-in-ethiopia" },
      { property: "og:locale", content: "en_US" },
      { property: "og:locale:alternate", content: "am_ET" },
    ],
    links: [{ rel: "canonical", href: "https://ethiopiatoday.online/time-in-ethiopia" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What time is it in Ethiopia now?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Ethiopia uses East Africa Time (UTC+3) year-round with no daylight saving. This page shows the live Addis Ababa time.",
              },
            },
            {
              "@type": "Question",
              name: "Does Ethiopia use daylight saving time?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. Ethiopia remains on East Africa Time (UTC+3) throughout the year.",
              },
            },
            {
              "@type": "Question",
              name: "How is Ethiopian civil clock different from standard clock?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Ethiopian civil time counts from sunrise. For example, around 7:00 AM EAT is often expressed as 1 in the morning in local civil time.",
              },
            },
          ],
        }),
      },
    ],
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
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).formatToParts(now);
      const hh = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
      const mm = parts.find((p) => p.type === "minute")?.value ?? "00";
      const ss = parts.find((p) => p.type === "second")?.value ?? "00";
      setNowStr(`${String(hh).padStart(2, "0")}:${mm}:${ss}`);

      // Ethiopian 12-hour clock: starts at sunrise (~6:00 AM EAT).
      // Ethiopian hour = (hh - 6 + 12) % 12, with day/night labels.
      const ethHour = ((hh - 6 + 24) % 12) || 12;
      const daylight = hh >= 6 && hh < 18;
      setEthClock(`${ethHour}:${mm} ${daylight ? "ጠዋት (day)" : "ማታ (night)"}`);

      setDateStr(
        new Intl.DateTimeFormat("en-US", {
          timeZone: "Africa/Addis_Ababa",
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }).format(now),
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <SiteShell
      icon={Clock}
      title="Time in Ethiopia"
      intro="Ethiopia uses East Africa Time (EAT), which is UTC+3 year-round. There is no daylight saving."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Addis Ababa · EAT</div>
          <div className="mt-2 text-6xl font-semibold tracking-tight tabular-nums">{nowStr || "—"}</div>
          <div className="mt-2 text-muted-foreground">{dateStr}</div>
        </Card>
        <Card>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Ethiopian 12-hour clock</div>
          <div className="mt-2 text-4xl font-semibold tracking-tight tabular-nums">{ethClock || "—"}</div>
          <p className="mt-4 text-sm text-muted-foreground">
            In everyday Ethiopian time, the day begins at sunrise (~6:00 AM EAT). So 7:00 AM EAT
            is "1 ጠዋት" (1 in the morning), and 7:00 PM EAT is "1 ማታ" (1 in the evening).
          </p>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card>
          <h2 className="font-serif text-2xl tracking-tight">Why this matters for calls and transfers</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Knowing the exact local time in Ethiopia helps when planning support calls, bank
            confirmations, and family communication across time zones. Using a live clock reduces
            mistakes caused by manual timezone conversion.
          </p>
        </Card>
        <Card>
          <h2 className="font-serif text-2xl tracking-tight">EAT quick facts</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-7 text-muted-foreground">
            <li>Timezone: East Africa Time (UTC+3).</li>
            <li>No daylight saving switches during the year.</li>
            <li>Addis Ababa follows the same national timezone year-round.</li>
          </ul>
        </Card>
      </div>

      <Card className="mt-6">
        <h2 className="font-serif text-2xl tracking-tight">Related tools</h2>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          Check
          <Link to="/ethiopian-date-today" className="mx-1 text-primary underline underline-offset-4">
            Ethiopia date today
          </Link>
          for date context, then use
          <Link to="/date-difference" className="ml-1 text-primary underline underline-offset-4">
            date difference calculator
          </Link>
          for planning timelines.
        </p>
      </Card>

      <Card className="mt-6">
        <h2 className="font-serif text-2xl tracking-tight">FAQ</h2>
        <div className="mt-4 space-y-4 text-sm leading-7 text-muted-foreground">
          <div>
            <h3 className="font-medium text-foreground">Does Ethiopia change clocks seasonally?</h3>
            <p>No. Ethiopia keeps UTC+3 all year and does not observe daylight saving time.</p>
          </div>
          <div>
            <h3 className="font-medium text-foreground">Why do some locals say 1 o'clock at 7 AM?</h3>
            <p>
              Ethiopian civil clock starts counting from sunrise, so about 7 AM EAT corresponds to 1
              in local clock expression.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-foreground">Is this page suitable for meeting planning?</h3>
            <p>
              Yes, it gives live Addis Ababa time and helps avoid offset mistakes in international
              scheduling.
            </p>
          </div>
        </div>
      </Card>
    </SiteShell>
  );
}
