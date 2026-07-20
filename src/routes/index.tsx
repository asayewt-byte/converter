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
  BookOpen,
  Map,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ethiopia Today — Daily Utilities for Dates, Rates, Time and Holidays" },
      {
        name: "description",
        content:
          "A practical daily reference for Ethiopia: Ethiopian date, calendar tools, exchange rates, gold prices, time, holidays, and helpful calculators.",
      },
      { property: "og:title", content: "Ethiopia Today — Daily Utilities and Guides" },
      {
        property: "og:description",
        content: "Daily reference tools for Ethiopia with date, time, currency, gold, holiday, and calculator pages in one place.",
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

const TIME_FMT = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Africa/Addis_Ababa",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

function HomePage() {
  const tick = useClock();

  const { now, parts } = useMemo(() => {
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
  const ethHour = parts.hh === "--" ? "--" : ((parseInt(parts.hh, 10) - 6 + 12) % 12) || 12;
  const ethHH = typeof ethHour === "number" ? String(ethHour).padStart(2, "0") : "--";

  return (
    <SiteShell
      eyebrow="Ethiopia Today · daily reference"
      title="Today, in numbers."
      intro="A practical daily home for Ethiopia's date, time, rates, holidays, and reference tools — designed for quick answers and clearer planning."
    >
      <Card className="mb-8">
        <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-medium">
          Popular shortcuts
        </div>
        <div className="mt-3 flex flex-wrap gap-3 text-sm">
          <Link to="/ethiopian-date-today" className="text-primary underline underline-offset-4">
            Ethiopia date today
          </Link>
          <Link to="/usd-to-etb" className="text-primary underline underline-offset-4">
            USD to ETB today
          </Link>
          <Link to="/gold-price-ethiopia" className="text-primary underline underline-offset-4">
            gold price Addis Ababa
          </Link>
          <Link to="/site-map" className="text-primary underline underline-offset-4">
            browse all pages
          </Link>
        </div>
      </Card>

      <div className="relative mb-12 md:mb-16">
        <div className="relative overflow-hidden rounded-[24px] border border-border/70 bg-card/50 p-6 shadow-[0_1px_0_oklch(1_0_0/0.45)_inset,0_30px_60px_-40px_oklch(0.20_0.02_165/0.35)] backdrop-blur-md sm:p-8 md:rounded-[28px] md:p-12">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full opacity-70"
            style={{ background: "radial-gradient(closest-side, oklch(0.82 0.13 75 / 0.35), transparent)" }}
          />
          <div className="relative grid items-start gap-8 sm:gap-10 md:grid-cols-[1.2fr_1fr] md:gap-14">
            <div className="min-w-0">
              <div className="mb-4 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                Addis Ababa · Live · EAT
              </div>
              <div className="num text-fluid-mega font-medium tracking-[-0.04em] tabular-nums">
                {parts.hh}
                <span className="colon-blink text-accent">:</span>
                {parts.mm}
                <span className="text-fluid-mega-sub ml-1 align-baseline text-muted-foreground/50 sm:ml-2">
                  :{parts.ss}
                </span>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                <span>
                  Ethiopian civil time <span className="num ml-1 text-foreground">{ethHH}:{parts.mm}</span>
                </span>
                <span className="text-border">·</span>
                <span>UTC+3, no DST</span>
              </div>
            </div>
            <div className="md:border-l md:border-border/60 md:pl-14">
              <div className="mb-4 text-[10px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
                Today's date
              </div>
              <div className="font-serif text-fluid-date tracking-[-0.02em] text-balance">
                {formatEthiopian(now.eth, "en")}
              </div>
              <div className="mt-3 text-[17px] text-muted-foreground">
                {formatEthiopian(now.eth, "am")} · {dow.am}
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-5 text-sm">
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

      <div className="mb-6 flex items-end justify-between">
        <div>
          <div className="mb-2 text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            Index
          </div>
          <h2 className="font-serif text-fluid-h2 font-normal tracking-[-0.02em]">Daily utilities</h2>
        </div>
        <span className="num pb-1 text-xs text-muted-foreground">{String(TOOLS.length).padStart(2, "0")} tools</span>
      </div>

      <div className="cv-auto grid grid-cols-2 gap-3 md:hidden">
        <Link
          to="/ethiopian-calendar"
          className="col-span-2 relative flex items-center justify-between gap-4 overflow-hidden rounded-[22px] bg-primary p-5 text-primary-foreground shadow-[0_10px_30px_-18px_oklch(0.50_0.15_250/0.55)] transition-transform duration-150 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <div className="relative z-10 min-w-0">
            <p className="mb-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-primary-foreground/70">
              Ethiopian Calendar
            </p>
            <h3 className="font-serif text-[22px] leading-tight tracking-[-0.02em]">
              {formatEthiopian(now.eth, "en")}
            </h3>
            <p className="mt-1 text-[12px] text-primary-foreground/70">
              {dow.en} · {now.greg.toLocaleDateString("en-GB", { timeZone: "UTC", month: "short", day: "2-digit", year: "numeric" })}
            </p>
          </div>
          <div className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary-foreground/10 backdrop-blur-sm">
            <Calendar width={22} height={22} strokeWidth={1.75} aria-hidden />
          </div>
          <div aria-hidden className="pointer-events-none absolute -right-6 -bottom-6 h-28 w-28 rounded-full bg-primary-foreground/[0.08]" />
        </Link>

        <ToolTile to="/ethiopian-calendar-converter" icon={ArrowRightLeft} index={2} title="Calendar Converter" />
        <ToolTile to="/currency-converter" icon={Coins} index={3} title="Currency Converter" />
        <ToolTile to="/usd-to-etb" icon={DollarSign} index={4} label="USD to ETB" value="View rate" tone="accent" />
        <ToolTile to="/gold-price-ethiopia" icon={Gem} index={5} label="Gold Price" value="ETB / gram" tone="amber" />
        <ToolTile to="/time-in-ethiopia" icon={Clock} index={6} label="Local Time" value={<span className="tabular-nums">{parts.hh}:{parts.mm}</span>} tone="muted" />
        <ToolTile to="/ethiopian-holidays" icon={CalendarDays} index={7} title="Ethiopian Holidays" />
        <ToolTile to="/age-calculator" icon={Cake} index={8} title="Age Calculator" />
        <ToolTile to="/date-difference" icon={Sigma} index={9} title="Date Difference" />
      </div>

      <ol className="cv-auto hidden border-t border-border/70 md:block">
        {TOOLS.map((t, i) => {
          const Icon = t.icon;
          return (
            <li key={t.to} className="border-b border-border/70">
              <Link
                to={t.to}
                className="group relative grid grid-cols-[3rem_2rem_minmax(0,14rem)_1fr_2rem] items-center gap-6 py-5 outline-none transition-colors duration-200 hover:bg-accent/[0.06] focus-visible:bg-accent/[0.08] lg:py-6"
              >
                <span className="num pl-1 text-[11px] tracking-[0.24em] text-muted-foreground transition-colors group-hover:text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Icon className="h-[18px] w-[18px] text-muted-foreground transition-colors group-hover:text-foreground" strokeWidth={1.75} aria-hidden />
                <h3 className="font-serif text-[22px] leading-none tracking-[-0.02em] text-foreground lg:text-[24px]">{t.title}</h3>
                <div className="flex min-w-0 items-baseline gap-4">
                  <span aria-hidden className="flex-1 translate-y-[-4px] border-b border-dotted border-border/80 transition-colors group-hover:border-accent/50" />
                  <span className="max-w-[36ch] truncate text-[14px] text-muted-foreground">{t.desc}</span>
                </div>
                <ArrowRight className="h-[18px] w-[18px] justify-self-end pr-1 text-muted-foreground/60 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:text-accent group-hover:opacity-100 -translate-x-1" strokeWidth={1.75} aria-hidden />
              </Link>
            </li>
          );
        })}
      </ol>

      <div className="mt-14 grid gap-6 md:mt-16 md:grid-cols-3">
        <Card>
          <BookOpen className="h-5 w-5 text-foreground" strokeWidth={1.75} />
          <h2 className="mt-4 font-serif text-2xl tracking-tight">Why this site exists</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Ethiopia Today is built for people who repeatedly need the same practical answers:
            today's Ethiopian date, a currency benchmark, local time, holiday timing, and simple
            planning tools. Instead of scattering these across many tabs, the goal is to keep them
            readable and easy to verify in one place.
          </p>
        </Card>
        <Card>
          <Map className="h-5 w-5 text-foreground" strokeWidth={1.75} />
          <h2 className="mt-4 font-serif text-2xl tracking-tight">How to use it well</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Use the tool pages for direct answers, then open the guide pages when you need context.
            For example, a rate page gives the number, while an explainer helps you compare providers
            or understand why a value changes.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            If you want a complete overview, visit the
            <Link to="/site-map" className="mx-1 text-primary underline underline-offset-4">
              site map
            </Link>
            and browse by category.
          </p>
        </Card>
        <Card>
          <Clock className="h-5 w-5 text-foreground" strokeWidth={1.75} />
          <h2 className="mt-4 font-serif text-2xl tracking-tight">What stays current</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            The live clock, Ethiopian date references, and market-oriented utility pages are designed
            for everyday checking. The longer guide pages remain useful as evergreen explainers that
            help users understand how to interpret the numbers they see.
          </p>
        </Card>
      </div>

      <section className="mt-14 md:mt-16">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <div className="mb-2 text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Editorial
            </div>
            <h2 className="font-serif text-fluid-h2 font-normal tracking-[-0.02em]">Explainers and guides</h2>
          </div>
          <span className="num pb-1 text-xs text-muted-foreground">{String(ARTICLES.length).padStart(2, "0")} pages</span>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {ARTICLES.map((a) => (
            <Link
              key={a.to}
              to={a.to}
              className="group rounded-[18px] border border-border/70 bg-card/70 p-5 shadow-[0_1px_0_oklch(1_0_0/0.4)_inset] transition-colors hover:border-border hover:bg-accent/[0.05]"
            >
              <h3 className="font-serif text-[22px] leading-tight tracking-[-0.02em] text-foreground">{a.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{a.desc}</p>
              <div className="mt-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors group-hover:text-accent">
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
      className="group relative flex min-h-[112px] flex-col justify-between rounded-[18px] border border-border/70 bg-card/70 p-4 shadow-[0_1px_0_oklch(1_0_0/0.4)_inset] backdrop-blur-sm transition-[transform,border-color,box-shadow] duration-150 hover:border-border hover:shadow-[0_1px_0_oklch(1_0_0/0.45)_inset,0_8px_20px_-14px_oklch(0_0_0/0.18)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <div className="flex items-start justify-between">
        <div className={`grid h-9 w-9 place-items-center rounded-xl ${TONE_ICON[tone]}`}>
          <Icon width={18} height={18} strokeWidth={1.75} aria-hidden />
        </div>
        <span className="num text-[10px] tracking-[0.18em] text-muted-foreground/70">{String(index).padStart(2, "0")}</span>
      </div>
      <div className="mt-4">
        {hasValue ? (
          <>
            <p className="text-[11px] font-medium text-muted-foreground">{label}</p>
            <p className="mt-0.5 font-serif text-[17px] leading-tight tracking-[-0.01em] text-foreground">{value}</p>
          </>
        ) : (
          <h3 className="font-serif text-[14px] leading-tight tracking-[-0.01em] text-foreground text-pretty">{title}</h3>
        )}
      </div>
    </Link>
  );
}
