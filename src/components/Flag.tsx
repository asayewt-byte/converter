import { flagUrl, currencyLabel } from "@/lib/flags";

/**
 * Country flag rendered as an SVG image (flagcdn.com).
 * Real image beats emoji flags — Windows Chromium doesn't render them.
 */
export function Flag({
  code,
  size = 20,
  className = "",
}: {
  code: string | null | undefined;
  size?: number;
  className?: string;
}) {
  const url = flagUrl(code);
  const label = currencyLabel(code);
  if (!url) {
    return (
      <span
        aria-hidden
        className={`inline-block rounded-[3px] bg-muted ${className}`}
        style={{ width: size * 1.4, height: size }}
      />
    );
  }
  return (
    <img
      src={url}
      alt={label}
      width={size * 1.4}
      height={size}
      loading="lazy"
      decoding="async"
      className={`inline-block rounded-[3px] object-cover shadow-[0_0_0_1px_oklch(0_0_0/0.06)] ${className}`}
      style={{ width: size * 1.4, height: size }}
    />
  );
}
