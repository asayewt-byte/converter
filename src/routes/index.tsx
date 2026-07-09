import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, Card } from "@/components/SiteShell";
import { todayInEthiopia, formatEthiopian, ETHIOPIAN_DAYS } from "@/lib/ethiopian-calendar";
import { useMemo, type ComponentType, type ReactNode, type SVGProps } from "react";
import { useClock } from "@/hooks/use-clock";
import {
  Calendar,
  ArrowRightLeft,
  Coins,
  DollarSign,
  Gem,
  Clock,
  CalendarDays,
  Cake,
  Sigma,
  ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "USD to ETB Today, Gold Price Addis Ababa, Send Money to Ethiopia" },
      {
        name: "description",
        content:
          "USD to ETB today, gold price Addis Ababa, and practical tools for families who send money to Ethiopia, updated daily.",
      },
      { property: "og:title", content: "USD to ETB Today and Gold Price Addis Ababa" },
      {
        property: "og:description",
        content: "Track USD to ETB today, check gold price Addis Ababa, and plan before you send money to Ethiopia.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ethiopiatoday.online/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://ethiopiatoday.online/" }],
  }),
  component: HomePage,
});

const TOOLS = [
  { to: "/ethiopian-calendar", icon: Calendar, title: "Ethiopian Calendar", desc: "Today's date in the Ge'ez calendar with a full month view." },
  { to: "/ethiopian-calendar-converter", icon: ArrowRightLeft, title: "Calendar Converter", desc: "Convert between Ethiopian and Gregorian dates." },
  { to: "/currency-converter", icon: Coins, title: "Currency Converter", desc: "Convert ETB to USD, EUR, GBP and more." },
  { to: "/usd-to-etb", icon: DollarSign, title: "USD to ETB", desc: "Today's US Dollar to Ethiopian Birr rate." },
  { to: "/gold-price-ethiopia", icon: Gem, title: "Gold Prices", desc: "Reference gold prices in ETB per gram." },
  { to: "/time-in-ethiopia", icon: Clock, title: "Time in Ethiopia", desc: "Current time in Addis Ababa (EAT · UTC+3)." },
  { to: "/ethiopian-holidays", icon: CalendarDays, title: "Ethiopian Holidays", desc: "Public and religious holidays for this year." },
  { to: "/age-calculator", icon: Cake, title: "Age Calculator", desc: "Your age in Ethiopian and Gregorian calendars." },
  { to: "/date-difference", icon: Sigma, title: "Date Difference", desc: "Days, weeks and months between two dates." },
] as const;

const ARTICLES = [
  {
    to: "/how-ethiopian-calendar-works",
    title: "How the Ethiopian calendar works",
    desc: "13 months, New Year timing, and why the year number differs.",
  },
  {
    to: "/understanding-usd-to-etb",
    title: "Understanding USD to ETB",
    desc: "What the exchange quote means and how to read it correctly.",
  },
  {
    to: "/ethiopian-holidays-explained",
    title: "Ethiopian holidays explained",
    desc: "Public and religious observances, and date interpretation tips.",
  },
  {
    to: "/ethiopian-calendar-vs-gregorian",
    title: "Ethiopian calendar vs Gregorian",
    desc: "A side-by-side comparison for planning and conversion.",
  },
  {
    to: "/ethiopian-13-months-guide",
    title: "Ethiopian 13 months guide",
    desc: "How Pagume works and how the 13th month fits the year.",
  },
] as const;

// Cache the formatter — new Intl.DateTimeFormat() every tick is measurable at 1Hz.
const TIME_FMT = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Africa/Addis_Ababa",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

function HomePage() {
  // Shared 1Hz clock — one interval per app, deduped across every subscriber.
  const tick = useClock();

  const { now, parts } = useMemo(() => {
    // tick===0 during SSR / pre-hydration → stable "--" fallback (no mismatch).
    if (tick === 0) {
      return {
        now: todayInEthiopia(),
        parts: { hh: "--", mm: "--", ss: "--" },
      };
    }
    const p = TIME_FMT.formatToParts(new Date(tick));
    const get = (t: string) => p.find((x) => x.type === t)?.value ?? "--";
    return {
      now: todayInEthiopia(),
      parts: { hh: get("hour"), mm: get("minute"), ss: get("second") },
    };
  }, [tick]);


  const dow = ETHIOPIAN_DAYS[now.greg.getUTCDay()];
  // Ethiopian civil clock: 6h offset from EAT (dawn = 0)
  const ethHour = parts.hh === "--" ? "--" : ((parseInt(parts.hh, 10) - 6 + 12) % 12) || 12;
  const ethHH = typeof ethHour === "number" ? String(ethHour).padStart(2, "0") : "--";

  return (
    <SiteShell
      eyebrow="Ethiopia Today · daily reference"
      title="Today, in numbers."
      intro="USD to ETB today, gold price Addis Ababa, and practical daily tools for people at home and in the diaspora."
    >
      <Card className="mb-8">
        <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-medium">Diaspora essentials</div>
        <div className="mt-3 flex flex-wrap gap-3 text-sm">
          <Link to="/usd-to-etb" className="text-primary underline underline-offset-4">USD to ETB today</Link>
          <Link to="/currency-converter" className="text-primary underline underline-offset-4">send money to Ethiopia</Link>
          <Link to="/gold-price-ethiopia" className="text-primary underline underline-offset-4">gold price Addis Ababa</Link>
        </div>
      </Card>

      {/* Signature: dual clock + date, floated on a soft card */}
      <div className="mb-12 md:mb-16 relative">
        <div className="relative overflow-hidden rounded-[24px] md:rounded-[28px] border border-border/70 bg-card/50 backdrop-blur-md p-6 sm:p-8 md:p-12 shadow-[0_1px_0_oklch(1_0_0/0.45)_inset,0_30px_60px_-40px_oklch(0.20_0.02_165/0.35)]">
          {/* inner glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full opacity-70"
            style={{ background: "radial-gradient(closest-side, oklch(0.82 0.13 75 / 0.35), transparent)" }}
          />
          <div className="relative grid gap-8 sm:gap-10 md:grid-cols-[1.2fr_1fr] md:gap-14 items-start">
            <div className="min-w-0">
              <div className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground font-medium mb-4 flex items-center gap-2">
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                Addis Ababa · Live · EAT
              </div>
              <div className="num text-fluid-mega font-medium tracking-[-0.04em] tabular-nums">
                {parts.hh}
                <span className="colon-blink text-accent">:</span>
                {parts.mm}
                <span className="text-muted-foreground/50 text-fluid-mega-sub align-baseline ml-1 sm:ml-2">
                  :{parts.ss}
                </span>
              </div>

              <div className="mt-5 text-sm text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-1">
                <span>
                  Ethiopian civil time{" "}
                  <span className="num text-foreground ml-1">
                    {ethHH}:{parts.mm}
                  </span>
                </span>
                <span className="text-border">·</span>
                <span>UTC+3, no DST</span>
              </div>
            </div>
            <div className="md:border-l md:border-border/60 md:pl-14">
              <div className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground font-medium mb-4">
                Today's date
              </div>
              <div className="font-serif text-fluid-date tracking-[-0.02em] text-balance">
                {formatEthiopian(now.eth, "en")}
              </div>
              <div className="mt-3 text-[17px] text-muted-foreground">
                {formatEthiopian(now.eth, "am")} · {dow.am}
              </div>
              <div className="mt-5 pt-5 border-t border-border/60 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Gregorian</span>
                <span className="num text-foreground">
                  {now.greg.toLocaleDateString("en-GB", {
                    timeZone: "UTC",
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section heading */}
      <div className="mb-6 flex items-end justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground font-medium mb-2">
            Index
          </div>
          <h2 className="font-serif text-fluid-h2 font-normal tracking-[-0.02em]">
            Daily utilities
          </h2>
        </div>
        <span className="num text-xs text-muted-foreground pb-1">
          {String(TOOLS.length).padStart(2, "0")} tools
        </span>
      </div>

      {/* MOBILE — hero + dashboard: featured Ethiopian Calendar, then compact tiles with live values */}
      <div className="cv-auto md:hidden grid grid-cols-2 gap-3">
        {/* 01 · Ethiopian Calendar — hero */}
        <Link
          to="/ethiopian-calendar"
          className={[
            "col-span-2 relative overflow-hidden rounded-[22px]",
            "bg-primary text-primary-foreground p-5",
            "shadow-[0_10px_30px_-18px_oklch(0.50_0.15_250/0.55)]",
            "flex items-center justify-between gap-4",
            "transition-transform duration-150 active:scale-[0.99]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          ].join(" ")}
        >
          <div className="min-w-0 relative z-10">
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-primary-foreground/70 mb-1.5">
              Ethiopian Calendar
            </p>
            <h3 className="font-serif text-[22px] leading-tight tracking-[-0.02em]">
              {formatEthiopian(now.eth, "en")}
            </h3>
            <p className="mt-1 text-[12px] text-primary-foreground/70">
              {dow.en} ·{" "}
              {now.greg.toLocaleDateString("en-GB", {
                timeZone: "UTC",
                month: "short",
                day: "2-digit",
                year: "numeric",
              })}
            </p>
          </div>
          <div className="shrink-0 relative z-10 grid h-12 w-12 place-items-center rounded-2xl bg-primary-foreground/10 backdrop-blur-sm">
            <Calendar width={22} height={22} strokeWidth={1.75} aria-hidden />
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute -right-6 -bottom-6 h-28 w-28 rounded-full bg-primary-foreground/[0.08]"
          />
        </Link>

        <ToolTile to="/ethiopian-calendar-converter" icon={ArrowRightLeft} index={2} title="Calendar Converter" />
        <ToolTile to="/currency-converter" icon={Coins} index={3} title="Currency Converter" />
        <ToolTile to="/usd-to-etb" icon={DollarSign} index={4} label="USD to ETB" value="View rate" tone="accent" />
        <ToolTile to="/gold-price-ethiopia" icon={Gem} index={5} label="Gold Price" value="ETB / gram" tone="amber" />
        <ToolTile
          to="/time-in-ethiopia"
          icon={Clock}
          index={6}
          label="Local Time"
          value={<span className="tabular-nums">{parts.hh}:{parts.mm}</span>}
          tone="muted"
        />
        <ToolTile to="/ethiopian-holidays" icon={CalendarDays} index={7} title="Ethiopian Holidays" />
        <ToolTile to="/age-calculator" icon={Cake} index={8} title="Age Calculator" />
        <ToolTile to="/date-difference" icon={Sigma} index={9} title="Date Difference" />
      </div>

      {/* DESKTOP — editorial index: numbered rows, dotted leader, hover-reveal arrow */}
      <ol className="cv-auto hidden md:block border-t border-border/70">
        {TOOLS.map((t, i) => {
          const Icon = t.icon;
          return (
            <li key={t.to} className="border-b border-border/70">
              <Link
                to={t.to}
                
                className={[
                  "group relative grid items-center gap-6 py-5 lg:py-6",
                  "grid-cols-[3rem_2rem_minmax(0,14rem)_1fr_2rem]",
                  "outline-none transition-colors duration-200",
                  "hover:bg-accent/[0.06]",
                  "focus-visible:bg-accent/[0.08]",
                ].join(" ")}
              >
                {/* Number */}
                <span className="num text-[11px] tracking-[0.24em] text-muted-foreground pl-1 group-hover:text-accent transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Icon */}
                <Icon
                  className="h-[18px] w-[18px] text-muted-foreground group-hover:text-foreground transition-colors"
                  strokeWidth={1.75}
                  aria-hidden
                />

                {/* Title */}
                <h3 className="font-serif text-[22px] lg:text-[24px] leading-none tracking-[-0.02em] text-foreground">
                  {t.title}
                </h3>

                {/* Dotted leader + description */}
                <div className="flex items-baseline gap-4 min-w-0">
                  <span
                    aria-hidden
                    className="flex-1 border-b border-dotted border-border/80 translate-y-[-4px] group-hover:border-accent/50 transition-colors"
                  />
                  <span className="text-[14px] text-muted-foreground truncate max-w-[36ch]">
                    {t.desc}
                  </span>
                </div>

                {/* Arrow */}
                <ArrowRight
                  className="h-[18px] w-[18px] text-muted-foreground/60 justify-self-end pr-1 -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-accent transition-all duration-200"
                  strokeWidth={1.75}
                  aria-hidden
                />
              </Link>
            </li>
          );
        })}
      </ol>

      <section className="mt-14 md:mt-16">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground font-medium mb-2">
              Editorial
            </div>
            <h2 className="font-serif text-fluid-h2 font-normal tracking-[-0.02em]">
              Explainers and guides
            </h2>
          </div>
          <span className="num text-xs text-muted-foreground pb-1">
            {String(ARTICLES.length).padStart(2, "0")} pages
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {ARTICLES.map((a) => (
            <Link
              key={a.to}
              to={a.to}
              className="group rounded-[18px] border border-border/70 bg-card/70 p-5 shadow-[0_1px_0_oklch(1_0_0/0.4)_inset] transition-colors hover:border-border hover:bg-accent/[0.05]"
            >
              <h3 className="font-serif text-[22px] leading-tight tracking-[-0.02em] text-foreground">
                {a.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{a.desc}</p>
              <div className="mt-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground group-hover:text-accent transition-colors">
                <span>Read article</span>
                <ArrowRight width={14} height={14} aria-hidden />
              </div>
            </Link>
          ))}
        </div>
      </section>

    </SiteShell>
  );
}

type Tone = "accent" | "amber" | "muted" | "default";

const TONE_ICON: Record<Tone, string> = {
  accent: "bg-accent/15 text-accent",
  amber:
    "bg-[oklch(0.92_0.08_82)] text-[oklch(0.52_0.14_70)] dark:bg-[oklch(0.30_0.05_70)] dark:text-[oklch(0.82_0.13_75)]",
  muted: "bg-secondary text-foreground/70",
  default: "bg-primary/10 text-primary",
};

function ToolTile({
  to,
  icon: Icon,
  index,
  title,
  label,
  value,
  tone = "default",
}: {
  to: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  index: number;
  title?: string;
  label?: string;
  value?: ReactNode;
  tone?: Tone;
}) {
  const hasValue = value !== undefined;
  return (
    <Link
      to={to}
      className={[
        "group relative flex flex-col justify-between",
        "rounded-[18px] border border-border/70 bg-card/70 backdrop-blur-sm",
        "p-4 min-h-[112px]",
        "shadow-[0_1px_0_oklch(1_0_0/0.4)_inset]",
        "transition-[transform,border-color,box-shadow] duration-150",
        "hover:border-border hover:shadow-[0_1px_0_oklch(1_0_0/0.45)_inset,0_8px_20px_-14px_oklch(0_0_0/0.18)]",
        "active:scale-[0.98]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      ].join(" ")}
    >
      <div className="flex items-start justify-between">
        <div className={`grid h-9 w-9 place-items-center rounded-xl ${TONE_ICON[tone]}`}>
          <Icon width={18} height={18} strokeWidth={1.75} aria-hidden />
        </div>
        <span className="num text-[10px] tracking-[0.18em] text-muted-foreground/70">
          {String(index).padStart(2, "0")}
        </span>
      </div>
      <div className="mt-4">
        {hasValue ? (
          <>
            <p className="text-[11px] font-medium text-muted-foreground">{label}</p>
            <p className="mt-0.5 font-serif text-[17px] leading-tight tracking-[-0.01em] text-foreground">
              {value}
            </p>
          </>
        ) : (
          <h3 className="font-serif text-[14px] leading-tight tracking-[-0.01em] text-foreground text-pretty">
            {title}
          </h3>
        )}
      </div>
    </Link>
  );
}
