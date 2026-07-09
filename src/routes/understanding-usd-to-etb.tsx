import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, Card } from "@/components/SiteShell";
import { DollarSign } from "lucide-react";

export const Route = createFileRoute("/understanding-usd-to-etb")({
  head: () => ({
    meta: [
      { title: "Understanding USD to ETB" },
      {
        name: "description",
        content:
          "Understand what USD to ETB means, what moves the rate, and how to read daily exchange numbers correctly.",
      },
      { property: "og:title", content: "Understanding USD to ETB" },
      {
        property: "og:description",
        content: "A simple explainer for reading USD to ETB exchange rates.",
      },
      { property: "og:url", content: "https://ethiopiatoday.online/understanding-usd-to-etb" },
    ],
    links: [{ rel: "canonical", href: "https://ethiopiatoday.online/understanding-usd-to-etb" }],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SiteShell
      icon={DollarSign}
      eyebrow="Article"
      title="Understanding USD to ETB"
      intro="Exchange rates affect imports, travel, remittances, and savings decisions. Here is how to read the number clearly."
    >
      <div className="grid gap-6">
        <Card>
          <h2 className="font-serif text-2xl tracking-tight">1) What the quote means</h2>
          <p className="mt-3 text-muted-foreground leading-7">
            If the quote says 1 USD = X ETB, it means one US dollar buys X Ethiopian birr at a reference rate.
            A higher number means ETB is weaker against USD in that moment.
          </p>
        </Card>

        <Card>
          <h2 className="font-serif text-2xl tracking-tight">2) Mid-market vs real transaction rates</h2>
          <p className="mt-3 text-muted-foreground leading-7">
            Most websites show a mid-market rate. Banks and remittance providers add spreads, fees, or transfer costs,
            so actual received ETB is usually lower than a perfect conversion.
          </p>
        </Card>

        <Card>
          <h2 className="font-serif text-2xl tracking-tight">3) Why rates move daily</h2>
          <p className="mt-3 text-muted-foreground leading-7">
            Global dollar demand, local policy changes, inflation expectations, and market liquidity all influence
            short-term movement. Daily volatility is normal in foreign exchange markets.
          </p>
        </Card>

        <Card>
          <h2 className="font-serif text-2xl tracking-tight">4) Better decisions with context</h2>
          <p className="mt-3 text-muted-foreground leading-7">
            For planning, track trends over weeks, not just one day. Compare provider fees and net payout,
            especially for large transfers.
          </p>
        </Card>

        <p className="text-sm text-muted-foreground">
          Check live numbers on <Link to="/usd-to-etb" className="text-primary underline underline-offset-4">USD to ETB</Link>{" "}
          and <Link to="/currency-converter" className="text-primary underline underline-offset-4">Currency Converter</Link>.
        </p>
      </div>
    </SiteShell>
  );
}
