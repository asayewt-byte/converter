import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, Card } from "@/components/SiteShell";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Gem } from "lucide-react";
import { useState } from "react";
import { ratesQueryOptions } from "@/lib/rates";

export const Route = createFileRoute("/gold-price-ethiopia")({
  head: () => ({
    meta: [
      { title: "Gold Price Addis Ababa — Today's Rate per Gram (ETB)" },
      {
        name: "description",
        content:
          "Gold price Addis Ababa today and reference rates in Ethiopia: 24K, 22K, 21K and 18K per gram in ETB.",
      },
      { property: "og:title", content: "Gold Price Addis Ababa" },
      { property: "og:description", content: "Gold price Addis Ababa and Ethiopia reference rates per gram in ETB." },
      { property: "og:url", content: "https://ethiopiatoday.online/gold-price-ethiopia" },
      { property: "og:locale", content: "en_US" },
      { property: "og:locale:alternate", content: "am_ET" },
    ],
    links: [{ rel: "canonical", href: "https://ethiopiatoday.online/gold-price-ethiopia" }],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(ratesQueryOptions),
  component: GoldPage,
  pendingComponent: () => (
    <SiteShell icon={Gem} title="Gold Price in Ethiopia" intro="Loading today's reference rates…">
      <Card><div className="text-muted-foreground">Loading…</div></Card>
    </SiteShell>
  ),
  errorComponent: () => (
    <SiteShell icon={Gem} title="Gold Price in Ethiopia" intro="Reference rates unavailable right now.">
      <Card><div className="text-destructive">Could not load exchange rates.</div></Card>
    </SiteShell>
  ),
});

const OZ_TO_GRAM = 31.1034768;

function GoldPage() {
  const { data } = useSuspenseQuery(ratesQueryOptions);
  const usdEtb = data.rates.ETB;
  const updated = data.updated;

  const [spotUsd, setSpotUsd] = useState<number>(2650);
  const perGramUsd = spotUsd / OZ_TO_GRAM;
  const perGramEtb = perGramUsd * usdEtb;

  const karats = [
    { k: "24K", purity: 0.999 },
    { k: "22K", purity: 22 / 24 },
    { k: "21K", purity: 21 / 24 },
    { k: "18K", purity: 18 / 24 },
    { k: "14K", purity: 14 / 24 },
  ];

  return (
    <SiteShell icon={Gem}
      title="Gold Price Addis Ababa"
      intro="Reference gold price Addis Ababa and Ethiopia per gram in ETB, derived from spot price and today's USD to ETB rate."
    >
      <Card className="mb-6">
        <div className="grid gap-4 md:grid-cols-3">
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-muted-foreground">Spot gold (USD / oz)</span>
            <input
              type="number"
              value={spotUsd}
              onChange={(e) => setSpotUsd(Number(e.target.value) || 0)}
              className="rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </label>
          <div>
            <div className="text-sm text-muted-foreground">USD → ETB</div>
            <div className="mt-1 text-lg font-medium tabular-nums">
              {usdEtb.toLocaleString(undefined, { maximumFractionDigits: 3 })}
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Updated</div>
            <div className="mt-1 text-sm">{updated ? new Date(updated).toUTCString() : "—"}</div>
          </div>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Enter the current international spot price (USD per troy ounce). We compute the
          reference gram price in ETB using today's mid-market USD/ETB rate. Local jewellers
          typically add a 5–15% making charge on top.
        </p>
      </Card>

      <Card>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-muted-foreground border-b border-border">
              <th className="py-3">Purity</th>
              <th className="py-3">USD / gram</th>
              <th className="py-3">ETB / gram</th>
              <th className="py-3">ETB / 8 grams (wedding band)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border tabular-nums">
            {karats.map((row) => {
              const u = perGramUsd * row.purity;
              const e = perGramEtb * row.purity;
              return (
                <tr key={row.k}>
                  <td className="py-3 font-medium">{row.k}</td>
                  <td className="py-3">${u.toFixed(2)}</td>
                  <td className="py-3">{e.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                  <td className="py-3">{(e * 8).toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </SiteShell>
  );
}
