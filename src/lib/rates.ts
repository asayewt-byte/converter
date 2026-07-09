import { queryOptions } from "@tanstack/react-query";

export type RatesPayload = {
  rates: Record<string, number>;
  updated: string;
};

async function fetchRates(): Promise<RatesPayload> {
  const res = await fetch("https://open.er-api.com/v6/latest/USD");
  if (!res.ok) throw new Error("Could not load exchange rates.");
  const d = (await res.json()) as {
    rates?: Record<string, number>;
    time_last_update_utc?: string;
  };
  if (!d?.rates) throw new Error("Could not load exchange rates.");
  return { rates: d.rates, updated: d.time_last_update_utc ?? "" };
}

/** Single source of truth for FX rates — deduped and cached across every route. */
export const ratesQueryOptions = queryOptions({
  queryKey: ["rates", "USD"] as const,
  queryFn: fetchRates,
  staleTime: 5 * 60 * 1000, // 5 min — provider updates hourly
  gcTime: 60 * 60 * 1000,
});
