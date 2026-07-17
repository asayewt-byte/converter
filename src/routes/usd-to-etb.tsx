import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, Card } from "@/components/SiteShell";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DollarSign } from "lucide-react";
import { CURRENCY_FLAGS } from "@/lib/flags";
import { ratesQueryOptions } from "@/lib/rates";

export const Route = createFileRoute("/usd-to-etb")({
  head: () => ({
    meta: [
      { title: "USD to ETB Today | Send Money to Ethiopia Rate Guide" },
      {
        name: "description",
        content:
          "USD to ETB today with live conversion for common amounts and practical context for families who send money to Ethiopia.",
      },
      { property: "og:title", content: "USD to ETB Today | Send Money to Ethiopia" },
      {
        property: "og:description",
        content: "Check USD to ETB today and plan better when you send money to Ethiopia.",
      },
      { property: "og:url", content: "https://ethiopiatoday.online/usd-to-etb" },
      { property: "og:locale", content: "en_US" },
      { property: "og:locale:alternate", content: "am_ET" },
    ],
    links: [{ rel: "canonical", href: "https://ethiopiatoday.online/usd-to-etb" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What is USD to ETB today?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "This page shows a live USD to ETB mid-market reference rate and instant conversions for common dollar amounts.",
              },
            },
            {
              "@type": "Question",
              name: "Why is my remittance rate lower than the displayed rate?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Most providers apply exchange spread and fees, so the effective rate and final ETB received can be lower than the mid-market benchmark.",
              },
            },
            {
              "@type": "Question",
              name: "Which matters more: exchange rate or transfer fee?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Both matter. Always compare the total ETB received after fees and exchange margin instead of checking only the headline USD to ETB rate.",
              },
            },
          ],
        }),
      },
    ],
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
      intro="Track USD to ETB today and estimate transfer value before you send money to Ethiopia."
    >
      <div className="grid gap-6 md:grid-cols-[1fr_1fr]">
        <Card>
          <div className="flex items-center justify-between">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Today's rate</div>
            <div className="text-2xl leading-none" aria-hidden>
              <span title="United States">{CURRENCY_FLAGS.USD.flag}</span>
              <span className="mx-1.5 text-base text-muted-foreground/50">→</span>
              <span title="Ethiopia">{CURRENCY_FLAGS.ETB.flag}</span>
            </div>
          </div>
          <div className="mt-3 text-4xl font-semibold tracking-tight tabular-nums md:text-5xl">
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
                <span className="flex items-center gap-2 text-muted-foreground">
                  <span aria-hidden>{CURRENCY_FLAGS.USD.flag}</span>
                  ${a.toLocaleString()}
                </span>
                <span className="flex items-center gap-2 font-medium">
                  {(a * rate).toLocaleString(undefined, { maximumFractionDigits: 2 })} ETB
                  <span aria-hidden>{CURRENCY_FLAGS.ETB.flag}</span>
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-8 text-sm text-muted-foreground">
        Need other currencies, or planning to send money to Ethiopia from abroad?{" "}
        <Link to="/currency-converter" className="text-primary underline underline-offset-4">
          Open the currency converter
        </Link>
        .
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card>
          <h2 className="font-serif text-2xl tracking-tight">How to read USD to ETB today</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            This page shows a mid-market reference rate. It is useful for planning, but transfer
            services and banks often add spread and service fees. Compare the final ETB received,
            not only the headline rate.
          </p>
        </Card>
        <Card>
          <h2 className="font-serif text-2xl tracking-tight">Before you send money to Ethiopia</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-7 text-muted-foreground">
            <li>Check transfer fee and exchange markup separately.</li>
            <li>Confirm payout channel: bank deposit, cash pickup, or mobile wallet.</li>
            <li>Re-check USD to ETB at the time of transfer, not earlier in the day.</li>
          </ul>
        </Card>
      </div>

      <Card className="mt-6">
        <h2 className="font-serif text-2xl tracking-tight">National Bank of Ethiopia exchange rate context</h2>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          Many users search for the National Bank of Ethiopia exchange rate as a benchmark. This
          page provides a practical market-reference number for planning, while bank settlement
          rates, remittance partner rates, and official published rates can differ.
        </p>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          For critical transactions, always confirm the final rate and fees with your bank or
          transfer provider at the time of payment.
        </p>
      </Card>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card>
          <h2 className="font-serif text-2xl tracking-tight">What affects USD to ETB movement?</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Exchange rates react to supply and demand for foreign currency, policy decisions,
            import/export payment needs, and broader global USD strength. Even small daily changes
            can affect large transfers, which is why timing and provider comparison matter.
          </p>
        </Card>

        <Card>
          <h2 className="font-serif text-2xl tracking-tight">Simple transfer comparison checklist</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-7 text-muted-foreground">
            <li>Compare two or three providers for the same USD amount.</li>
            <li>Record fee, quoted rate, and expected ETB received.</li>
            <li>Choose based on highest delivered ETB and reliable payout speed.</li>
            <li>Save screenshots to compare your next transfer against past results.</li>
          </ul>
        </Card>
      </div>

      <Card className="mt-6">
        <h2 className="font-serif text-2xl tracking-tight">FAQ</h2>
        <div className="mt-4 space-y-4 text-sm leading-7 text-muted-foreground">
          <div>
            <h3 className="font-medium text-foreground">Is this the exact bank cash-out rate?</h3>
            <p>
              Not always. This is a benchmark rate. Final bank or remittance settlement can be
              different after spread and fees.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-foreground">Why can two services quote different ETB for the same USD?</h3>
            <p>
              Providers use different exchange margins, fee structures, and payout costs, so the net
              ETB received can vary.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-foreground">Should I wait for a better rate before sending?</h3>
            <p>
              If timing is flexible, compare rates over several hours or days. For urgent payments,
              prioritize reliability and final ETB received.
            </p>
          </div>
        </div>
      </Card>
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
