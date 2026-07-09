// Ethiopian ↔ Gregorian conversion via Beyene-Kudlek algorithm (Amete Mihret).
// JDN epoch offset for Ethiopian year 1, Meskerem 1.
const JD_EPOCH_OFFSET_AMETE_MIHRET = 1723856;

export const ETHIOPIAN_MONTHS = [
  { en: "Meskerem", am: "መስከረም" },
  { en: "Tikimt", am: "ጥቅምት" },
  { en: "Hidar", am: "ኅዳር" },
  { en: "Tahsas", am: "ታኅሣሥ" },
  { en: "Tir", am: "ጥር" },
  { en: "Yekatit", am: "የካቲት" },
  { en: "Megabit", am: "መጋቢት" },
  { en: "Miazia", am: "ሚያዝያ" },
  { en: "Ginbot", am: "ግንቦት" },
  { en: "Sene", am: "ሰኔ" },
  { en: "Hamle", am: "ሐምሌ" },
  { en: "Nehase", am: "ነሐሴ" },
  { en: "Pagume", am: "ጳጉሜ" },
] as const;

export const ETHIOPIAN_DAYS = [
  { en: "Ehud", am: "እሑድ" },      // Sunday
  { en: "Segno", am: "ሰኞ" },
  { en: "Maksegno", am: "ማክሰኞ" },
  { en: "Erob", am: "ረቡዕ" },
  { en: "Hamus", am: "ሐሙስ" },
  { en: "Arb", am: "ዓርብ" },
  { en: "Kidame", am: "ቅዳሜ" },
] as const;

export interface EthDate {
  year: number;
  month: number; // 1..13
  day: number;   // 1..30 (or 1..5/6 for Pagume)
}

function gregorianToJDN(y: number, m: number, d: number): number {
  const a = Math.floor((14 - m) / 12);
  const y2 = y + 4800 - a;
  const m2 = m + 12 * a - 3;
  return (
    d +
    Math.floor((153 * m2 + 2) / 5) +
    365 * y2 +
    Math.floor(y2 / 4) -
    Math.floor(y2 / 100) +
    Math.floor(y2 / 400) -
    32045
  );
}

function jdnToGregorian(jdn: number): { year: number; month: number; day: number } {
  const a = jdn + 32044;
  const b = Math.floor((4 * a + 3) / 146097);
  const c = a - Math.floor((146097 * b) / 4);
  const d = Math.floor((4 * c + 3) / 1461);
  const e = c - Math.floor((1461 * d) / 4);
  const m = Math.floor((5 * e + 2) / 153);
  const day = e - Math.floor((153 * m + 2) / 5) + 1;
  const month = m + 3 - 12 * Math.floor(m / 10);
  const year = 100 * b + d - 4800 + Math.floor(m / 10);
  return { year, month, day };
}

export function gregorianToEthiopian(y: number, m: number, d: number): EthDate {
  const jdn = gregorianToJDN(y, m, d);
  const r = (jdn - JD_EPOCH_OFFSET_AMETE_MIHRET) % 1461;
  const n = (r % 365) + 365 * Math.floor(r / 1460);
  const year =
    4 * Math.floor((jdn - JD_EPOCH_OFFSET_AMETE_MIHRET) / 1461) +
    Math.floor(r / 365) -
    Math.floor(r / 1460);
  const month = Math.floor(n / 30) + 1;
  const day = (n % 30) + 1;
  return { year, month, day };
}

export function ethiopianToGregorian(year: number, month: number, day: number) {
  const jdn =
    JD_EPOCH_OFFSET_AMETE_MIHRET +
    365 +
    365 * (year - 1) +
    Math.floor(year / 4) +
    30 * (month - 1) +
    day -
    1;
  return jdnToGregorian(jdn);
}

export function formatEthiopian(d: EthDate, lang: "en" | "am" = "en") {
  const mo = ETHIOPIAN_MONTHS[d.month - 1];
  const label = lang === "am" ? mo.am : mo.en;
  return `${label} ${d.day}, ${d.year}`;
}

export function todayInEthiopia(): { greg: Date; eth: EthDate } {
  // Get "now" in Africa/Addis_Ababa
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: "Africa/Addis_Ababa",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const parts = fmt.formatToParts(new Date());
  const y = Number(parts.find((p) => p.type === "year")!.value);
  const m = Number(parts.find((p) => p.type === "month")!.value);
  const d = Number(parts.find((p) => p.type === "day")!.value);
  const greg = new Date(Date.UTC(y, m - 1, d));
  return { greg, eth: gregorianToEthiopian(y, m, d) };
}
