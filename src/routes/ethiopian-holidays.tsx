import { createFileRoute } from "@tanstack/react-router";
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
        content: "Ethiopian public and religious holidays: Enkutatash, Meskel, Genna, Timket, Fasika, Eid, and more — with Ethiopian and Gregorian dates.",
      },
      { property: "og:title", content: "Ethiopian Public Holidays" },
      { property: "og:description", content: "Public and religious holidays in Ethiopia." },
      { property: "og:url", content: "https://ethiopiatoday.online/ethiopian-holidays" },
      { property: "og:locale", content: "en_US" },
      { property: "og:locale:alternate", content: "am_ET" },
    ],
    links: [{ rel: "canonical", href: "https://ethiopiatoday.online/ethiopian-holidays" }],
  }),
  component: HolidaysPage,
});

// Fixed-date holidays (Ethiopian calendar; some are cross-listed with fixed Gregorian dates).
// Movable religious holidays (Fasika, Ramadan, Eid) require full lunar/paschal computation
// and are noted as movable rather than shown with an incorrect date.
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
    <SiteShell icon={CalendarDays}
      title={`Ethiopian Public Holidays · ${year}`}
      intro="Major public and religious holidays observed across Ethiopia. Movable religious dates depend on lunar or Paschal calculations and are marked accordingly."
    >
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted-foreground border-b border-border">
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
    </SiteShell>
  );
}
