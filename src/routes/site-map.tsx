import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, Card } from "@/components/SiteShell";
import { Map } from "lucide-react";

const UTILITIES = [
  { to: "/ethiopian-date-today", label: "Ethiopia Date Today" },
  { to: "/ethiopian-calendar", label: "Ethiopian Calendar" },
  { to: "/ethiopian-calendar-converter", label: "Ethiopian Calendar Converter" },
  { to: "/currency-converter", label: "Currency Converter" },
  { to: "/usd-to-etb", label: "USD to ETB" },
  { to: "/gold-price-ethiopia", label: "Gold Price Ethiopia" },
  { to: "/time-in-ethiopia", label: "Time in Ethiopia" },
  { to: "/ethiopian-holidays", label: "Ethiopian Holidays" },
  { to: "/age-calculator", label: "Age Calculator" },
  { to: "/date-difference", label: "Date Difference" },
] as const;

const GUIDES = [
  { to: "/how-ethiopian-calendar-works", label: "How the Ethiopian Calendar Works" },
  { to: "/ethiopian-calendar-vs-gregorian", label: "Ethiopian Calendar vs Gregorian" },
  { to: "/ethiopian-13-months-guide", label: "Ethiopian 13 Months Guide" },
  { to: "/understanding-usd-to-etb", label: "Understanding USD to ETB" },
  { to: "/ethiopian-holidays-explained", label: "Ethiopian Holidays Explained" },
] as const;

const SITE = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/privacy", label: "Privacy" },
  { to: "/terms", label: "Terms" },
  { to: "/cookies", label: "Cookies" },
] as const;

export const Route = createFileRoute("/site-map")({
  head: () => ({
    meta: [
      { title: "Site Map — Ethiopia Today" },
      {
        name: "description",
        content: "Browse all Ethiopia Today pages including tools, guides, and policy pages.",
      },
      { property: "og:title", content: "Site Map — Ethiopia Today" },
      {
        property: "og:description",
        content: "All tools and guide pages in one place for faster navigation.",
      },
      { property: "og:url", content: "https://ethiopiatoday.online/site-map" },
    ],
    links: [{ rel: "canonical", href: "https://ethiopiatoday.online/site-map" }],
  }),
  component: SiteMapPage,
});

function SiteMapPage() {
  return (
    <SiteShell
      icon={Map}
      title="Site Map"
      intro="All pages on Ethiopia Today in one place. Use this index to quickly navigate tools and guides."
    >
      <div className="grid gap-6 md:grid-cols-3">
        <Section title="Daily utilities" links={UTILITIES} />
        <Section title="Guides and explainers" links={GUIDES} />
        <Section title="Site pages" links={SITE} />
      </div>
    </SiteShell>
  );
}

function Section({
  title,
  links,
}: {
  title: string;
  links: ReadonlyArray<{ to: string; label: string }>;
}) {
  return (
    <Card>
      <h2 className="font-serif text-2xl tracking-tight">{title}</h2>
      <ul className="mt-4 space-y-2 text-sm">
        {links.map((link) => (
          <li key={link.to}>
            <Link to={link.to} className="text-primary underline underline-offset-4">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  );
}
