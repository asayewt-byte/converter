import { createFileRoute } from "@tanstack/react-router";
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
      { property: "og:description", content: "Convert Ethiopian ↔ Gregorian dates instantly." },
      { property: "og:url", content: "https://ethiopiatoday.online/ethiopian-calendar-converter" },
      { property: "og:locale", content: "en_US" },
      { property: "og:locale:alternate", content: "am_ET" },
    ],
    links: [{ rel: "canonical", href: "https://ethiopiatoday.online/ethiopian-calendar-converter" }],
  }),
  component: Converter,
});

const G_MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
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
    <SiteShell icon={ArrowRightLeft}
      title="Calendar Converter"
      intro="Convert dates between the Gregorian calendar and the Ethiopian (Ge'ez) calendar."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <div className="text-sm font-medium text-muted-foreground">Gregorian → Ethiopian</div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            <NumberInput label="Day" value={gD} onChange={setGD} min={1} max={31} />
            <SelectInput label="Month" value={gM} onChange={setGM}
              options={G_MONTHS.map((m, i) => ({ v: i + 1, label: m }))} />
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
            <SelectInput label="Month" value={eM} onChange={setEM}
              options={ETHIOPIAN_MONTHS.map((m, i) => ({ v: i + 1, label: `${m.en} (${m.am})` }))} />
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
    </SiteShell>
  );
}

function NumberInput({
  label, value, onChange, min, max,
}: { label: string; value: number; onChange: (v: number) => void; min: number; max: number }) {
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
  label, value, onChange, options,
}: {
  label: string; value: T; onChange: (v: T) => void;
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
          <option key={String(o.v)} value={String(o.v)}>{o.label}</option>
        ))}
      </select>
    </label>
  );
}
