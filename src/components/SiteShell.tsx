import { Link, useLocation } from "@tanstack/react-router";
import type { ComponentType, ReactNode, SVGProps } from "react";
import { ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/ethiopian-calendar", label: "Calendar" },
  { to: "/ethiopian-calendar-converter", label: "Converter" },
  { to: "/currency-converter", label: "Currency" },
  { to: "/gold-price-ethiopia", label: "Gold" },
  { to: "/time-in-ethiopia", label: "Time" },
  { to: "/ethiopian-holidays", label: "Holidays" },
] as const;

export function SiteShell({
  eyebrow,
  title,
  intro,
  children,
  hero,
  icon: Icon,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  children: ReactNode;
  /** If true, render ambient hero backdrop (glow + grain). Default true. */
  hero?: boolean;
  /** Optional lucide icon shown above the title. */
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
}) {
  const showHero = hero !== false;
  return (
    <div className="relative min-h-dvh flex flex-col bg-background text-foreground overflow-hidden">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-foreground focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-background"
      >
        Skip to main content
      </a>
      {/* Paper grain overlay (fixed, ultra-subtle) */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.35] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.16  0 0 0 0 0.14  0 0 0 0 0.10  0 0 0 0.06 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          backgroundSize: "240px 240px",
        }}
      />
      <Header />
      <main id="main" className="relative flex-1 z-10">
        {showHero && (
          <>
            {/* Ambient hero glow — Meskel saffron dissolving into imperial green */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-[640px] -z-10"
              style={{
                background:
                  "radial-gradient(60% 55% at 78% 12%, oklch(0.82 0.13 75 / 0.42), transparent 70%), radial-gradient(48% 45% at 12% 8%, oklch(0.55 0.10 155 / 0.24), transparent 72%)",
              }}
            />
            {/* Hairline horizon */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-0 right-0 top-[560px] h-px bg-gradient-to-r from-transparent via-foreground/12 to-transparent"
            />
          </>
        )}
        <section className="mx-auto w-full max-w-5xl px-6 pt-10 md:pt-14 pb-10">
          <BackToHome />
          <div className="anim-stagger">
            {eyebrow && (
              <div className="mb-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-medium">
                <span className="h-px w-8 bg-foreground/40" aria-hidden />
                {eyebrow}
              </div>
            )}
            {Icon && (
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-border/70 bg-card/70 backdrop-blur-sm text-foreground/80 shadow-[0_1px_0_oklch(1_0_0/0.45)_inset]">
                <Icon width={20} height={20} strokeWidth={1.5} aria-hidden />
              </div>
            )}
            <h1 className="font-serif text-fluid-display font-normal tracking-[-0.025em] text-balance max-w-3xl">
              {title}
            </h1>
            {intro && (
            <p className="mt-6 max-w-2xl text-[15px] sm:text-base md:text-[17px] leading-[1.6] text-muted-foreground text-pretty">
              {intro}
            </p>

            )}
          </div>
        </section>
        <section className="mx-auto w-full max-w-5xl px-6 pb-24 anim-fade-up">{children}</section>

      </main>
      <Footer />
    </div>
  );
}

function BackToHome() {
  const { pathname } = useLocation();
  if (pathname === "/") return null;
  return (
    <Link
      to="/"
      // Hidden on mobile — the sticky header shows an equivalent back pill there.
      className="mb-8 hidden md:inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors group"
    >
      <ArrowLeft
        width={14}
        height={14}
        strokeWidth={1.75}
        className="transition-transform group-hover:-translate-x-0.5"
        aria-hidden
      />
      <span>Back to home</span>
    </Link>
  );
}

function HeaderBackPill() {
  const { pathname } = useLocation();
  if (pathname === "/") return null;
  return (
    <Link
      to="/"
      aria-label="Back to home"
      className="md:hidden inline-flex items-center gap-1.5 h-9 pl-2.5 pr-3 rounded-full border border-border/70 bg-card/70 backdrop-blur-sm text-[13px] text-foreground/85 hover:text-foreground hover:border-accent/60 transition-colors"
    >
      <ArrowLeft width={14} height={14} strokeWidth={1.75} aria-hidden />
      <span>Home</span>
    </Link>
  );
}

export function Header() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 sm:px-6 h-16 gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <HeaderBackPill />
          <Link
            to="/"
            className={`flex items-baseline gap-2.5 font-serif text-[18px] tracking-tight min-w-0 ${
              !isHome ? "hidden sm:flex" : ""
            }`}
          >
            <span
              aria-hidden
              className="relative inline-flex h-2 w-2 translate-y-[-2px] rounded-full bg-accent shadow-[0_0_16px_2px_oklch(0.72_0.14_75_/_0.7)] shrink-0"
            />
            <span className="font-medium truncate">Ethiopia Today</span>
            <span className="hidden sm:inline font-sans text-[10px] uppercase tracking-[0.22em] text-muted-foreground translate-y-[-1px]">
              daily
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <nav className="hidden md:flex items-center gap-0.5 text-[13px]">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="press px-3 py-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary/70 transition-colors"
                activeProps={{
                  className:
                    "press px-3 py-1.5 rounded-full text-foreground bg-secondary font-medium",
                }}
              >
                {n.label}
              </Link>

            ))}
          </nav>
          <ThemeToggle />
        </div>

      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t border-border/60 mt-auto bg-secondary/30 backdrop-blur-sm z-10">
      <div className="mx-auto w-full max-w-6xl px-6 py-12 text-sm text-muted-foreground flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden
            className="inline-flex h-1.5 w-1.5 rounded-full bg-accent"
          />
          <span>© {new Date().getFullYear()} Ethiopia Today · Daily utilities for Ethiopia.</span>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <Link to="/about" className="hover:text-foreground transition-colors">
            About
          </Link>
          <Link to="/contact" className="hover:text-foreground transition-colors">
            Contact
          </Link>
          <Link to="/privacy" className="hover:text-foreground transition-colors">
            Privacy
          </Link>
          <Link to="/terms" className="hover:text-foreground transition-colors">
            Terms
          </Link>
          <Link to="/cookies" className="hover:text-foreground transition-colors">
            Cookies
          </Link>
          <Link to="/usd-to-etb" className="hover:text-foreground transition-colors">
            USD to ETB
          </Link>
          <Link to="/ethiopian-date-today" className="hover:text-foreground transition-colors">
            Date today
          </Link>
        </div>
      </div>
    </footer>
  );
}


export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`lift rounded-[20px] border border-border/70 bg-card/60 backdrop-blur-sm p-6 shadow-[0_1px_0_oklch(1_0_0/0.4)_inset,0_1px_2px_oklch(0_0_0/0.04)] hover:border-border hover:shadow-[0_1px_0_oklch(1_0_0/0.45)_inset,0_10px_24px_-14px_oklch(0_0_0/0.18)] ${className}`}
    >
      {children}
    </div>
  );
}
