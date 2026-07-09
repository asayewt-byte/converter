// Map ISO 4217 currency codes → country flag emoji + short country label.
// Emoji flags render natively on all modern platforms without extra assets.
export const CURRENCY_FLAGS: Record<string, { flag: string; country: string }> = {
  USD: { flag: "🇺🇸", country: "United States" },
  EUR: { flag: "🇪🇺", country: "Eurozone" },
  GBP: { flag: "🇬🇧", country: "United Kingdom" },
  ETB: { flag: "🇪🇹", country: "Ethiopia" },
  SAR: { flag: "🇸🇦", country: "Saudi Arabia" },
  AED: { flag: "🇦🇪", country: "UAE" },
  CNY: { flag: "🇨🇳", country: "China" },
  JPY: { flag: "🇯🇵", country: "Japan" },
  CAD: { flag: "🇨🇦", country: "Canada" },
  CHF: { flag: "🇨🇭", country: "Switzerland" },
  AUD: { flag: "🇦🇺", country: "Australia" },
  KES: { flag: "🇰🇪", country: "Kenya" },
  DJF: { flag: "🇩🇯", country: "Djibouti" },
  ERN: { flag: "🇪🇷", country: "Eritrea" },
  SOS: { flag: "🇸🇴", country: "Somalia" },
  SDG: { flag: "🇸🇩", country: "Sudan" },
  EGP: { flag: "🇪🇬", country: "Egypt" },
  ZAR: { flag: "🇿🇦", country: "South Africa" },
  NGN: { flag: "🇳🇬", country: "Nigeria" },
  INR: { flag: "🇮🇳", country: "India" },
  TRY: { flag: "🇹🇷", country: "Turkey" },
  QAR: { flag: "🇶🇦", country: "Qatar" },
  KWD: { flag: "🇰🇼", country: "Kuwait" },
  BHD: { flag: "🇧🇭", country: "Bahrain" },
  OMR: { flag: "🇴🇲", country: "Oman" },
  JOD: { flag: "🇯🇴", country: "Jordan" },
  ILS: { flag: "🇮🇱", country: "Israel" },
  SEK: { flag: "🇸🇪", country: "Sweden" },
  NOK: { flag: "🇳🇴", country: "Norway" },
  DKK: { flag: "🇩🇰", country: "Denmark" },
  RUB: { flag: "🇷🇺", country: "Russia" },
  BRL: { flag: "🇧🇷", country: "Brazil" },
  MXN: { flag: "🇲🇽", country: "Mexico" },
  SGD: { flag: "🇸🇬", country: "Singapore" },
  HKD: { flag: "🇭🇰", country: "Hong Kong" },
  KRW: { flag: "🇰🇷", country: "South Korea" },
  NZD: { flag: "🇳🇿", country: "New Zealand" },
};

// Neutral fallback used whenever we can't resolve a real country flag.
export const FALLBACK_FLAG = "🏳️";

// ISO code → flag from the first two letters as regional-indicator characters.
// Never throws; always returns a printable glyph so the UI can't break.
export function codeToFlag(code: string | null | undefined): string {
  try {
    if (typeof code !== "string") return FALLBACK_FLAG;
    const upper = code.trim().toUpperCase();
    if (upper.length < 2) return FALLBACK_FLAG;
    const known = CURRENCY_FLAGS[upper];
    if (known) return known.flag;
    const cc = upper.slice(0, 2);
    if (!/^[A-Z]{2}$/.test(cc)) return FALLBACK_FLAG;
    const A = 0x1f1e6;
    return String.fromCodePoint(A + cc.charCodeAt(0) - 65, A + cc.charCodeAt(1) - 65);
  } catch {
    return FALLBACK_FLAG;
  }
}

export function currencyLabel(code: string | null | undefined): string {
  if (typeof code !== "string" || !code.trim()) return "—";
  const upper = code.trim().toUpperCase();
  return CURRENCY_FLAGS[upper]?.country ?? upper;
}

/** True only when we have a curated country-flag mapping for this code. */
export function hasMappedFlag(code: string | null | undefined): boolean {
  return typeof code === "string" && code.trim().toUpperCase() in CURRENCY_FLAGS;
}

// Map ISO 4217 currency code → ISO 3166-1 alpha-2 country code (lowercase).
// Handles special cases; everything else falls back to the first 2 letters.
const CURRENCY_TO_CC: Record<string, string> = {
  EUR: "eu",
  GBP: "gb",
  CHF: "ch",
  JPY: "jp",
  CNY: "cn",
  DKK: "dk",
  SEK: "se",
  NOK: "no",
  AED: "ae",
  SAR: "sa",
  QAR: "qa",
  KWD: "kw",
  BHD: "bh",
  OMR: "om",
  JOD: "jo",
  ILS: "il",
  INR: "in",
  KRW: "kr",
  SGD: "sg",
  HKD: "hk",
  NZD: "nz",
  ZAR: "za",
  BRL: "br",
  MXN: "mx",
  TRY: "tr",
  RUB: "ru",
};

export function currencyToCC(code: string | null | undefined): string | null {
  if (typeof code !== "string") return null;
  const upper = code.trim().toUpperCase();
  if (!upper) return null;
  if (CURRENCY_TO_CC[upper]) return CURRENCY_TO_CC[upper];
  const cc = upper.slice(0, 2).toLowerCase();
  return /^[a-z]{2}$/.test(cc) ? cc : null;
}

/** SVG flag URL from flagcdn.com — served over HTTPS, no auth, cached at CDN. */
export function flagUrl(code: string | null | undefined): string | null {
  const cc = currencyToCC(code);
  return cc ? `https://flagcdn.com/${cc}.svg` : null;
}


