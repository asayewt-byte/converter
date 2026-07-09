import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://ethiopiatoday.online";

type ChangeFreq = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

interface SitemapEntry {
  path: string;
  changefreq: ChangeFreq;
  priority: string;
}

// Home + utilities update daily; legal pages rarely.
const ENTRIES: SitemapEntry[] = [
  { path: "/", changefreq: "daily", priority: "1.0" },
  { path: "/ethiopian-calendar", changefreq: "daily", priority: "0.9" },
  { path: "/ethiopian-calendar-converter", changefreq: "weekly", priority: "0.9" },
  { path: "/ethiopian-date-today", changefreq: "daily", priority: "0.9" },
  { path: "/currency-converter", changefreq: "daily", priority: "0.9" },
  { path: "/usd-to-etb", changefreq: "daily", priority: "0.9" },
  { path: "/gold-price-ethiopia", changefreq: "daily", priority: "0.9" },
  { path: "/time-in-ethiopia", changefreq: "daily", priority: "0.8" },
  { path: "/ethiopian-holidays", changefreq: "monthly", priority: "0.8" },
  { path: "/age-calculator", changefreq: "monthly", priority: "0.7" },
  { path: "/date-difference", changefreq: "monthly", priority: "0.7" },
  { path: "/how-ethiopian-calendar-works", changefreq: "monthly", priority: "0.7" },
  { path: "/understanding-usd-to-etb", changefreq: "monthly", priority: "0.7" },
  { path: "/ethiopian-holidays-explained", changefreq: "monthly", priority: "0.7" },
  { path: "/ethiopian-calendar-vs-gregorian", changefreq: "monthly", priority: "0.7" },
  { path: "/ethiopian-13-months-guide", changefreq: "monthly", priority: "0.7" },
  { path: "/about", changefreq: "yearly", priority: "0.4" },
  { path: "/contact", changefreq: "yearly", priority: "0.4" },
  { path: "/privacy", changefreq: "yearly", priority: "0.3" },
  { path: "/terms", changefreq: "yearly", priority: "0.3" },
  { path: "/cookies", changefreq: "yearly", priority: "0.3" },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const lastmod = new Date().toISOString().slice(0, 10);
        const urls = ENTRIES.map(
          (e) =>
            `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`,
        ).join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>`;
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400",
          },
        });
      },
    },
  },
});
