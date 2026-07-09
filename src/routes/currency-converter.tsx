import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, Card } from "@/components/SiteShell";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Coins } from "lucide-react";
import { codeToFlag, currencyLabel } from "@/lib/flags";
import { Flag } from "@/components/Flag";
import { ratesQueryOptions } from "@/lib/rates";

export const Route = createFileRoute("/currency-converter")({
  head: () => ({
    meta: [
      { title: "Currency Converter — Ethiopian Birr (ETB) to USD, EUR, GBP" },
      {
        name: "description",
        content:
          "Convert Ethiopian Birr to USD, EUR, GBP, SAR, AED and more with today's exchange rates.",
      },
      { property: "og:title", content: "Currency Converter · Ethiopia Today" },
      { property: "og:description", content: "Convert ETB to major world currencies at today's rates." },
      { property: "og:url", content: "https://ethiopiatoday.online/currency-converter" },
      { property: "og:locale", content: "en_US" },
      { property: "og:locale:alternate", content: "am_ET" },
    ],
    links: [{ rel: "canonical", href: "https://ethiopiatoday.online/currency-converter" }],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(ratesQueryOptions),
  component: Converter,
  pendingComponent: () => (
    <SiteShell icon={Coins} title="Currency Converter" intro="Loading today's rates…">
      <Card><div className="text-muted-foreground">Loading…</div></Card>
    </SiteShell>
  ),
  errorComponent: () => (
    <SiteShell icon={Coins} title="Currency Converter" intro="Rates unavailable right now.">
      <Card><div className="text-destructive">Could not load exchange rates.</div></Card>
    </SiteShell>
  ),
});

const POPULAR = ["USD", "EUR", "GBP", "SAR", "AED", "CNY", "JPY", "CAD", "CHF", "ETB"] as const;

function Converter() {
  const { data } = useSuspenseQuery(ratesQueryOptions);
  const { rates, updated } = data;

  const [base, setBase] = useState("USD");
  const [target, setTarget] = useState("ETB");
  const [amount, setAmount] = useState(1);

  const converted = useMemo(() => {
    if (!rates[base] || !rates[target]) return null;
    const usd = amount / rates[base];
    return usd * rates[target];
  }, [rates, base, target, amount]);

  return (
    <SiteShell
      icon={Coins}
      title="Currency Converter"
      intro="Convert Ethiopian Birr (ETB) to major world currencies using today's mid-market rates."
    >
      <Card>
        <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr_auto] items-end">
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-muted-foreground">Amount</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value) || 0)}
              className="rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </label>
          <Select label="From" value={base} onChange={setBase} rates={rates} />
          <div className="text-2xl text-muted-foreground text-center pb-2 hidden md:block">→</div>
          <Select label="To" value={target} onChange={setTarget} rates={rates} />
        </div>

        <div className="mt-6 rounded-md bg-secondary/60 p-5">
          {converted === null ? (
            <div className="text-muted-foreground">Unsupported currency pair.</div>
          ) : (
            <>
              <div className="text-sm text-muted-foreground flex items-center gap-2">
                <Flag code={base} size={16} />
                {amount.toLocaleString()} {base} equals
              </div>
              <div className="text-3xl md:text-4xl font-semibold tracking-tight tabular-nums flex items-center gap-3 mt-1">
                {converted.toLocaleString(undefined, { maximumFractionDigits: 4 })} {target}
                <Flag code={target} size={22} />
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                1 {base} = {(rates[target] / rates[base]).toLocaleString(undefined, { maximumFractionDigits: 6 })} {target}
                {updated && <> · Rates updated {new Date(updated).toUTCString()}</>}
              </div>
            </>
          )}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Rates are mid-market reference values. Bank and remittance rates may differ.
        </p>
      </Card>
    </SiteShell>
  );
}

function Select({
  label, value, onChange, rates,
}: {
  label: string; value: string; onChange: (v: string) => void;
  rates: Record<string, number>;
}) {
  const codes = Array.from(new Set<string>([...POPULAR, ...Object.keys(rates)])).sort();
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="text-muted-foreground flex items-center gap-2">
        {label}
        <Flag code={value} size={14} />
        <span className="text-xs text-muted-foreground/70">{currencyLabel(value)}</span>
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-md border border-input bg-background px-3 py-2 text-sm"
      >
        {codes.map((c) => (
          <option key={c} value={c}>{codeToFlag(c)}  {c}</option>
        ))}
      </select>
    </label>
  );
}
