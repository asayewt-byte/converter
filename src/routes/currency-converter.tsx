import { createFileRoute, Link } from "@tanstack/react-router";
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
      {
        property: "og:description",
        content: "Convert ETB to major world currencies at today's rates.",
      },
      { property: "og:url", content: "https://ethiopiatoday.online/currency-converter" },
      { property: "og:locale", content: "en_US" },
      { property: "og:locale:alternate", content: "am_ET" },
    ],
    links: [{ rel: "canonical", href: "https://ethiopiatoday.online/currency-converter" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Is this currency converter rate the final bank transfer rate?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. This page shows a mid-market reference rate. Banks and remittance providers may add margin and fees.",
              },
            },
            {
              "@type": "Question",
              name: "Which currency pairs are most useful for Ethiopia?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Commonly checked pairs include USD/ETB, EUR/ETB, GBP/ETB, SAR/ETB and AED/ETB for travel, business and remittance planning.",
              },
            },
            {
              "@type": "Question",
              name: "How often should I re-check rates before sending money?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Re-check immediately before confirming payment because rates can change during the day.",
              },
            },
          ],
        }),
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(ratesQueryOptions),
  component: Converter,
  pendingComponent: () => (
    <SiteShell icon={Coins} title="Currency Converter" intro="Loading today's rates…">
      <Card>
        <div className="text-muted-foreground">Loading…</div>
      </Card>
    </SiteShell>
  ),
  errorComponent: () => (
    <SiteShell icon={Coins} title="Currency Converter" intro="Rates unavailable right now.">
      <Card>
        <div className="text-destructive">Could not load exchange rates.</div>
      </Card>
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
        <div className="grid items-end gap-4 md:grid-cols-[1fr_auto_1fr_auto]">
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
          <div className="hidden pb-2 text-center text-2xl text-muted-foreground md:block">→</div>
          <Select label="To" value={target} onChange={setTarget} rates={rates} />
        </div>

        <div className="mt-6 rounded-md bg-secondary/60 p-5">
          {converted === null ? (
            <div className="text-muted-foreground">Unsupported currency pair.</div>
          ) : (
            <>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Flag code={base} size={16} />
                {amount.toLocaleString()} {base} equals
              </div>
              <div className="mt-1 flex items-center gap-3 text-3xl font-semibold tracking-tight tabular-nums md:text-4xl">
                {converted.toLocaleString(undefined, { maximumFractionDigits: 4 })} {target}
                <Flag code={target} size={22} />
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                1 {base} = {(rates[target] / rates[base]).toLocaleString(undefined, { maximumFractionDigits: 6 })}{" "}
                {target}
                {updated && <> · Rates updated {new Date(updated).toUTCString()}</>}
              </div>
            </>
          )}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Rates are mid-market reference values. Bank and remittance rates may differ.
        </p>
      </Card>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card>
          <h2 className="font-serif text-2xl tracking-tight">How to use this converter correctly</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Use this page as a planning benchmark before sending money, exchanging cash, or pricing
            imports. The displayed conversion is based on a mid-market reference and helps you
            estimate fair value across currencies.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            For final transactions, confirm provider-specific spread and fixed fees because two
            services can return different final ETB amounts for the same source currency.
          </p>
        </Card>

        <Card>
          <h2 className="font-serif text-2xl tracking-tight">Popular Ethiopia transfer checks</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-7 text-muted-foreground">
            <li>USD to ETB for family remittances.</li>
            <li>EUR or GBP to ETB for diaspora support.</li>
            <li>SAR or AED to ETB for Gulf payroll transfers.</li>
            <li>ETB to USD for travel and budgeting estimates.</li>
          </ul>
        </Card>
      </div>

      <Card className="mt-6">
        <h2 className="font-serif text-2xl tracking-tight">Related tools</h2>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          Need a focused USD page or market context? Go to
          <Link to="/usd-to-etb" className="mx-1 text-primary underline underline-offset-4">
            USD to ETB today
          </Link>
          and
          <Link to="/understanding-usd-to-etb" className="ml-1 text-primary underline underline-offset-4">
            exchange-rate guide
          </Link>
          . You can also compare with
          <Link to="/gold-price-ethiopia" className="ml-1 text-primary underline underline-offset-4">
            gold prices in ETB
          </Link>
          .
        </p>
      </Card>

      <Card className="mt-6">
        <h2 className="font-serif text-2xl tracking-tight">FAQ</h2>
        <div className="mt-4 space-y-4 text-sm leading-7 text-muted-foreground">
          <div>
            <h3 className="font-medium text-foreground">Why does my bank quote differ from this page?</h3>
            <p>
              Banks and remittance providers usually add exchange margin and service fees on top of
              mid-market references.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-foreground">Can I rely on one morning quote for evening transfer?</h3>
            <p>It is better to check again before payment. Rates can move during the day.</p>
          </div>
          <div>
            <h3 className="font-medium text-foreground">Which number should I compare across providers?</h3>
            <p>
              Compare final delivered amount in ETB after all fees, not only headline exchange rate.
            </p>
          </div>
        </div>
      </Card>
    </SiteShell>
  );
}

function Select({
  label,
  value,
  onChange,
  rates,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rates: Record<string, number>;
}) {
  const codes = Array.from(new Set<string>([...POPULAR, ...Object.keys(rates)])).sort();
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="flex items-center gap-2 text-muted-foreground">
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
          <option key={c} value={c}>
            {codeToFlag(c)} {c}
          </option>
        ))}
      </select>
    </label>
  );
}
