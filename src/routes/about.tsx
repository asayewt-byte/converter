import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, Card } from "@/components/SiteShell";
import { Calendar, ArrowRightLeft, Coins, Clock, Sparkles, ShieldCheck, Info } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Ethiopia Today" },
      {
        name: "description",
        content:
          "Ethiopia Today is a free daily utilities site for Ethiopia — calendar, currency, gold price, time, holidays and calculators, in one clean place.",
      },
      { property: "og:title", content: "About — Ethiopia Today" },
      {
        property: "og:description",
        content:
          "A free, fast, ad-light home for Ethiopia's daily utilities: calendar, currency, gold, time and more.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteShell icon={Info}
      eyebrow="About"
      title="A calm, daily home for Ethiopia's essentials."
      intro="Ethiopia Today brings the tools people search for every day — the Ethiopian date, currency rates, gold price, current time, holidays and calculators — into one clean, fast place. No clutter, no noise."
    >
      <h2 className="sr-only">Why Ethiopia Today</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <Sparkles className="h-5 w-5 text-foreground" strokeWidth={1.75} />
          <h3 className="mt-4 font-semibold tracking-tight">Focused</h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            Every page answers one question fast — no ads mid-content, no popups.
          </p>
        </Card>
        <Card>
          <ShieldCheck className="h-5 w-5 text-foreground" strokeWidth={1.75} />
          <h3 className="mt-4 font-semibold tracking-tight">Accurate</h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            Calendar conversions use the Beyene–Kudlek algorithm. Rates refresh
            from trusted public sources.
          </p>
        </Card>
        <Card>
          <Clock className="h-5 w-5 text-foreground" strokeWidth={1.75} />
          <h3 className="mt-4 font-semibold tracking-tight">Always current</h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            Time, dates and prices update live so what you see is what's true
            right now in Addis Ababa.
          </p>
        </Card>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight">What you can do here</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            { to: "/ethiopian-calendar", label: "View the Ethiopian calendar", Icon: Calendar },
            { to: "/ethiopian-calendar-converter", label: "Convert Ethiopian ↔ Gregorian dates", Icon: ArrowRightLeft },
            { to: "/currency-converter", label: "Check today's exchange rates", Icon: ArrowRightLeft },
            { to: "/gold-price-ethiopia", label: "See today's gold price in ETB", Icon: Coins },
            { to: "/time-in-ethiopia", label: "Current time in Ethiopia", Icon: Clock },
            { to: "/ethiopian-holidays", label: "Upcoming Ethiopian holidays", Icon: Calendar },
          ].map(({ to, label, Icon }) => (
            <Link
              key={to}
              to={to}
              className="group flex items-center gap-3 rounded-[14px] border border-border bg-card px-4 py-3 text-sm hover:shadow-md transition-shadow"
            >
              <Icon className="h-4 w-4 text-muted-foreground group-hover:text-foreground" strokeWidth={1.75} />
              <span className="text-foreground">{label}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-12 rounded-[20px] border border-border bg-secondary/40 p-6 md:p-8">
        <h2 className="text-xl font-semibold tracking-tight">Have feedback?</h2>
        <p className="mt-2 text-sm text-muted-foreground max-w-xl leading-relaxed">
          We read every message. Suggest a tool, report a wrong rate, or just
          say hello.
        </p>
        <Link
          to="/contact"
          className="mt-5 inline-flex items-center rounded-[14px] bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Contact us
        </Link>
      </div>
    </SiteShell>
  );
}
