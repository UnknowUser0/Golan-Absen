const PERCENTAGE_NUMBER_PATTERN = /^(100|[1-9]?\d)$/;

/**
 * Presents the single realisasi_kegiatan value consistently, including
 * historical rows that were stored without the percent suffix.
 */
export function formatRealisasiKegiatan(value: unknown): string {
  const text = String(value ?? '').trim();
  if (!text) return '-';

  const numericValue = text.replace(/%+$/, '').trim();
  if (!numericValue) return '-';
  if (PERCENTAGE_NUMBER_PATTERN.test(numericValue)) return numericValue + '%';

  // Do not invent a suffix for unrelated legacy/corrupt values, but never
  // render a duplicated suffix.
  return text.replace(/%+$/, '%');
}

/** Converts a persisted percentage into the editable numeric form. */
export function realisasiKegiatanInputValue(value: unknown): string {
  return String(value ?? '').trim().replace(/%+$/, '').trim();
}

/** Client-side validation accepts the suffix for backward compatibility. */
export function isValidRealisasiKegiatanValue(value: unknown, required = false): boolean {
  const text = String(value ?? '').trim();
  if (!text) return !required;
  const hasSuffix = text.endsWith('%');
  const numericValue = hasSuffix ? text.slice(0, -1) : text;
  if (numericValue.includes('%')) return false;
  return PERCENTAGE_NUMBER_PATTERN.test(numericValue);
}
