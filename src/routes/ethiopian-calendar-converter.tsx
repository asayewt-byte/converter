import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, Card } from "@/components/SiteShell";
import { ArrowRightLeft } from "lucide-react";
import {
  ETHIOPIAN_MONTHS,
  ethiopianToGregorian,
  gregorianToEthiopian,
  todayInEthiopia,
} from "@/lib/ethiopian-calendar";
import { useState } from "react";

export const Route = createFileRoute("/ethiopian-calendar-converter")({
  head: () => ({
    meta: [
      { title: "Ethiopian Calendar Converter — Ge'ez ↔ Gregorian" },
      {
        name: "description",
        content:
          "Convert dates between the Ethiopian (Ge'ez) calendar and the Gregorian calendar instantly.",
      },
      { property: "og:title", content: "Ethiopian Calendar Converter" },
      { property: "og:description", content: "Convert Ethiopian and Gregorian dates with explanation and context." },
      { property: "og:url", content: "https://ethiopiatoday.online/ethiopian-calendar-converter" },
      { property: "og:locale", content: "en_US" },
      { property: "og:locale:alternate", content: "am_ET" },
    ],
    links: [{ rel: "canonical", href: "https://ethiopiatoday.online/ethiopian-calendar-converter" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Why convert Ethiopian dates to Gregorian?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Conversion is useful when a local Ethiopian date must be matched with international systems, documents, travel bookings, or software that uses Gregorian dates.",
              },
            },
            {
              "@type": "Question",
              name: "Can I convert Gregorian dates into Ethiopian dates here?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. This page supports both Gregorian-to-Ethiopian and Ethiopian-to-Gregorian conversion.",
              },
            },
            {
              "@type": "Question",
              name: "Why is the Ethiopian year different?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The Ethiopian calendar follows a different historical year numbering system, so the year value usually differs by around 7 to 8 years from Gregorian counting.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: Converter,
});

const G_MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function Converter() {
  const today = todayInEthiopia();
  const [gY, setGY] = useState(today.greg.getUTCFullYear());
  const [gM, setGM] = useState(today.greg.getUTCMonth() + 1);
  const [gD, setGD] = useState(today.greg.getUTCDate());

  const [eY, setEY] = useState(today.eth.year);
  const [eM, setEM] = useState(today.eth.month);
  const [eD, setED] = useState(today.eth.day);

  const gToE = gregorianToEthiopian(gY, gM, gD);
  const eToG = ethiopianToGregorian(eY, eM, eD);

  return (
    <SiteShell
      icon={ArrowRightLeft}
      title="Calendar Converter"
      intro="Convert dates between the Gregorian calendar and the Ethiopian (Ge'ez) calendar."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <div className="text-sm font-medium text-muted-foreground">Gregorian → Ethiopian</div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            <NumberInput label="Day" value={gD} onChange={setGD} min={1} max={31} />
            <SelectInput
              label="Month"
              value={gM}
              onChange={setGM}
              options={G_MONTHS.map((m, i) => ({ v: i + 1, label: m }))}
            />
            <NumberInput label="Year" value={gY} onChange={setGY} min={1} max={9999} />
          </div>
          <div className="mt-6 rounded-md bg-secondary/60 p-4">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Ethiopian</div>
            <div className="mt-1 text-2xl font-semibold tracking-tight">
              {ETHIOPIAN_MONTHS[gToE.month - 1].en} {gToE.day}, {gToE.year}
            </div>
            <div className="text-base text-muted-foreground">
              {ETHIOPIAN_MONTHS[gToE.month - 1].am} {gToE.day}, {gToE.year}
            </div>
          </div>
        </Card>

        <Card>
          <div className="text-sm font-medium text-muted-foreground">Ethiopian → Gregorian</div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            <NumberInput label="Day" value={eD} onChange={setED} min={1} max={30} />
            <SelectInput
              label="Month"
              value={eM}
              onChange={setEM}
              options={ETHIOPIAN_MONTHS.map((m, i) => ({ v: i + 1, label: `${m.en} (${m.am})` }))}
            />
            <NumberInput label="Year" value={eY} onChange={setEY} min={1} max={9999} />
          </div>
          <div className="mt-6 rounded-md bg-secondary/60 p-4">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Gregorian</div>
            <div className="mt-1 text-2xl font-semibold tracking-tight">
              {G_MONTHS[eToG.month - 1]} {eToG.day}, {eToG.year}
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card>
          <h2 className="font-serif text-2xl tracking-tight">When date conversion matters</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Date conversion is useful when records move between local Ethiopian use and international
            systems. Common cases include school documents, flight planning, legal forms, contracts,
            remittance records, and event scheduling.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Keeping both formats side by side reduces confusion and helps confirm that the intended
            day, month, and year are correctly understood.
          </p>
        </Card>
        <Card>
          <h2 className="font-serif text-2xl tracking-tight">Practical tips</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-7 text-muted-foreground">
            <li>Double-check month names when sharing converted dates.</li>
            <li>Keep both Ethiopian and Gregorian versions on important documents.</li>
            <li>Use the full year value to avoid ambiguity.</li>
            <li>For recurring events, confirm which calendar the organizer follows.</li>
          </ul>
        </Card>
      </div>

      <Card className="mt-6">
        <h2 className="font-serif text-2xl tracking-tight">Related tools</h2>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          Need daily context? See
          <Link to="/ethiopian-date-today" className="mx-1 text-primary underline underline-offset-4">
            Ethiopia date today
          </Link>
          and
          <Link to="/ethiopian-calendar" className="ml-1 text-primary underline underline-offset-4">
            full Ethiopian calendar
          </Link>
          . For background, read
          <Link
            to="/how-ethiopian-calendar-works"
            className="ml-1 text-primary underline underline-offset-4"
          >
            how the calendar works
          </Link>
          .
        </p>
      </Card>

      <Card className="mt-6">
        <h2 className="font-serif text-2xl tracking-tight">FAQ</h2>
        <div className="mt-4 space-y-4 text-sm leading-7 text-muted-foreground">
          <div>
            <h3 className="font-medium text-foreground">Does this page convert both directions?</h3>
            <p>Yes. You can convert Gregorian dates to Ethiopian and Ethiopian dates to Gregorian.</p>
          </div>
          <div>
            <h3 className="font-medium text-foreground">Why do Ethiopian months look more regular?</h3>
            <p>
              Most Ethiopian months have exactly 30 days, with the 13th month completing the year.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-foreground">Is this useful for forms and records?</h3>
            <p>
              Yes. It helps when institutions, travel systems, or digital records expect Gregorian
              dates while local references use Ethiopian dates.
            </p>
          </div>
        </div>
      </Card>
    </SiteShell>
  );
}

function NumberInput({
  label,
  value,
  onChange,
  min,
  max,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
}) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        onChange={(e) => onChange(Number(e.target.value) || min)}
        className="rounded-md border border-input bg-background px-3 py-2 text-sm"
      />
    </label>
  );
}

function SelectInput<T extends number | string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T;
  onChange: (v: T) => void;
  options: { v: T; label: string }[];
}) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <select
        value={String(value)}
        onChange={(e) => {
          const v = typeof value === "number" ? (Number(e.target.value) as T) : (e.target.value as T);
          onChange(v);
        }}
        className="rounded-md border border-input bg-background px-3 py-2 text-sm"
      >
        {options.map((o) => (
          <option key={String(o.v)} value={String(o.v)}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
