import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, Card } from "@/components/SiteShell";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DollarSign } from "lucide-react";
import { CURRENCY_FLAGS } from "@/lib/flags";
import { ratesQueryOptions } from "@/lib/rates";

export const Route = createFileRoute("/usd-to-etb")({
  head: () => ({
    meta: [
      { title: "USD to ETB Today — US Dollar to Ethiopian Birr Rate" },
      {
        name: "description",
        content: "Today's mid-market USD to ETB exchange rate, plus conversion for common amounts.",
      },
      { property: "og:title", content: "USD to ETB Today" },
      { property: "og:description", content: "Today's US Dollar to Ethiopian Birr exchange rate." },
      { property: "og:url", content: "https://ethiopiatoday.online/usd-to-etb" },
      { property: "og:locale", content: "en_US" },
      { property: "og:locale:alternate", content: "am_ET" },
    ],
    links: [{ rel: "canonical", href: "https://ethiopiatoday.online/usd-to-etb" }],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(ratesQueryOptions),
  component: UsdEtb,
  pendingComponent: RatesPending,
  errorComponent: RatesError,
});

const AMOUNTS = [1, 5, 10, 20, 50, 100, 500, 1000];

function UsdEtb() {
  const { data } = useSuspenseQuery(ratesQueryOptions);
  const rate = data.rates.ETB;

  return (
    <SiteShell
      icon={DollarSign}
      title="USD to ETB Today"
      intro="The current US Dollar to Ethiopian Birr mid-market exchange rate."
    >
      <div className="grid gap-6 md:grid-cols-[1fr_1fr]">
        <Card>
          <div className="flex items-center justify-between">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Today's rate</div>
            <div className="text-2xl leading-none" aria-hidden>
              <span title="United States">{CURRENCY_FLAGS.USD.flag}</span>
              <span className="mx-1.5 text-muted-foreground/50 text-base">→</span>
              <span title="Ethiopia">{CURRENCY_FLAGS.ETB.flag}</span>
            </div>
          </div>
          <div className="mt-3 text-4xl md:text-5xl font-semibold tabular-nums tracking-tight">
            1 USD = {rate.toLocaleString(undefined, { maximumFractionDigits: 4 })} ETB
          </div>
          {data.updated && (
            <div className="mt-2 text-xs text-muted-foreground">
              Updated {new Date(data.updated).toUTCString()}
            </div>
          )}
          <p className="mt-4 text-xs text-muted-foreground">
            Mid-market reference. Actual bank / remittance rates may differ by 3–8%.
          </p>
        </Card>

        <Card>
          <div className="text-sm font-medium">Quick amounts</div>
          <div className="mt-3 divide-y divide-border">
            {AMOUNTS.map((a) => (
              <div key={a} className="flex items-center justify-between py-2 tabular-nums">
                <span className="text-muted-foreground flex items-center gap-2">
                  <span aria-hidden>{CURRENCY_FLAGS.USD.flag}</span>
                  ${a.toLocaleString()}
                </span>
                <span className="font-medium flex items-center gap-2">
                  {(a * rate).toLocaleString(undefined, { maximumFractionDigits: 2 })} ETB
                  <span aria-hidden>{CURRENCY_FLAGS.ETB.flag}</span>
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-8 text-sm text-muted-foreground">
        Need other currencies?{" "}
        <Link to="/currency-converter" className="text-primary underline underline-offset-4">
          Open the currency converter
        </Link>
        .
      </div>
    </SiteShell>
  );
}

function RatesPending() {
  return (
    <SiteShell icon={DollarSign} title="USD to ETB Today" intro="Loading today's rate…">
      <Card>
        <div className="text-muted-foreground">Loading…</div>
      </Card>
    </SiteShell>
  );
}

function RatesError() {
  return (
    <SiteShell icon={DollarSign} title="USD to ETB Today" intro="Rate unavailable right now.">
      <Card>
        <div className="text-destructive">Could not load exchange rates. Please try again shortly.</div>
      </Card>
    </SiteShell>
  );
}
