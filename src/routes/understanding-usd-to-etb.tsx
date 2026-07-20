import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, Card } from "@/components/SiteShell";
import { DollarSign } from "lucide-react";

export const Route = createFileRoute("/understanding-usd-to-etb")({
  head: () => ({
    meta: [
      { title: "Understanding USD to ETB — How to Read Ethiopia Exchange Rates" },
      {
        name: "description",
        content:
          "Understand USD to ETB today, what moves the rate, and how to compare transfer costs when you send money to Ethiopia.",
      },
      { property: "og:title", content: "Understanding USD to ETB" },
      {
        property: "og:description",
        content: "A practical explainer for families, travelers, and senders who follow Ethiopia exchange rates.",
      },
      { property: "og:url", content: "https://ethiopiatoday.online/understanding-usd-to-etb" },
    ],
    links: [{ rel: "canonical", href: "https://ethiopiatoday.online/understanding-usd-to-etb" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What does USD to ETB mean?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "USD to ETB shows how many Ethiopian birr one US dollar can buy at a given exchange rate reference.",
              },
            },
            {
              "@type": "Question",
              name: "Why is my transfer rate lower than the market rate?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Transfer services often apply exchange margin and fees, so the final ETB received can be lower than the mid-market benchmark.",
              },
            },
            {
              "@type": "Question",
              name: "What should I compare before sending money to Ethiopia?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Compare the final ETB delivered after fees, payout method, transfer speed, and provider reliability rather than only the advertised headline rate.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SiteShell
      icon={DollarSign}
      eyebrow="Guide"
      title="Understanding USD to ETB"
      intro="Exchange rates affect remittances, travel budgets, import costs, and everyday planning. This guide explains what the number means and how to use it better."
    >
      <div className="grid gap-6">
        <Card>
          <h2 className="font-serif text-2xl tracking-tight">1) What the quote means</h2>
          <p className="mt-3 leading-7 text-muted-foreground">
            If the quote says 1 USD = X ETB, it means one US dollar buys X Ethiopian birr at a
            reference rate. A higher ETB number usually means the birr is weaker against the dollar
            at that moment, while a lower number means the birr is relatively stronger.
          </p>
          <p className="mt-3 leading-7 text-muted-foreground">
            This number is useful as a benchmark, but it is not always the exact rate you receive
            when moving money through a bank or remittance provider.
          </p>
        </Card>

        <Card>
          <h2 className="font-serif text-2xl tracking-tight">2) Mid-market vs real transaction rates</h2>
          <p className="mt-3 leading-7 text-muted-foreground">
            Many websites show a mid-market rate because it is a neutral reference between buy and
            sell prices. Real providers often add spread, transfer fees, payout costs, or service
            charges. That means the final ETB received can be lower than the clean reference shown
            on a chart.
          </p>
          <p className="mt-3 leading-7 text-muted-foreground">
            For a person sending money to Ethiopia, the most important number is the final birr
            amount that arrives after all deductions, not only the headline exchange quote.
          </p>
        </Card>

        <Card>
          <h2 className="font-serif text-2xl tracking-tight">3) Why rates move daily</h2>
          <p className="mt-3 leading-7 text-muted-foreground">
            Exchange rates react to many forces: broad dollar strength, domestic policy changes,
            market demand for foreign currency, trade flows, inflation expectations, and financial
            liquidity. Even when the market looks stable, small daily movements can matter for larger
            transfers or import planning.
          </p>
          <p className="mt-3 leading-7 text-muted-foreground">
            Watching rate direction over several days is often more useful than reacting to a single
            snapshot in isolation.
          </p>
        </Card>

        <Card>
          <h2 className="font-serif text-2xl tracking-tight">4) How to make better transfer decisions</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-7 text-muted-foreground">
            <li>Compare at least two providers for the same USD amount.</li>
            <li>Check both fees and quoted exchange rate.</li>
            <li>Look at final ETB delivered, not only the advertised rate.</li>
            <li>Confirm payout type: bank, cash pickup, or wallet.</li>
            <li>Recheck the quote just before payment because rates can change intraday.</li>
          </ul>
        </Card>

        <Card>
          <h2 className="font-serif text-2xl tracking-tight">5) Related tools</h2>
          <p className="mt-3 leading-7 text-muted-foreground">
            Want live numbers? Open
            <Link to="/usd-to-etb" className="mx-1 text-primary underline underline-offset-4">
              USD to ETB today
            </Link>
            for the benchmark quote and
            <Link to="/currency-converter" className="ml-1 text-primary underline underline-offset-4">
              currency converter
            </Link>
            for other currencies. If you are comparing value preservation in birr terms, you can
            also check
            <Link to="/gold-price-ethiopia" className="ml-1 text-primary underline underline-offset-4">
              gold prices in Ethiopia
            </Link>
            .
          </p>
        </Card>

        <Card>
          <h2 className="font-serif text-2xl tracking-tight">FAQ</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-muted-foreground">
            <div>
              <h3 className="font-medium text-foreground">Should I only look for the highest rate?</h3>
              <p>
                No. A provider can show a stronger rate but charge more in fees. Always compare net
                ETB delivered.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-foreground">Why do rates differ between services?</h3>
              <p>
                Different providers use different spreads, compliance costs, settlement models, and
                payout partnerships.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-foreground">Is this useful for travel too?</h3>
              <p>
                Yes. The same benchmark helps estimate local value before exchanging money or
                planning a budget in Ethiopia.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </SiteShell>
  );
}
