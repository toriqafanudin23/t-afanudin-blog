// Di-hoist ke level modul supaya Intl.NumberFormat tidak dibuat ulang tiap render.
const numberFormat = new Intl.NumberFormat('id-ID', { maximumFractionDigits: 2 })
const LEADING_HYPHEN = /^-/

/** Format angka gaya Indonesia: koma desimal dan tanda minus sebenarnya (−), mis. -1.83 → "−1,83". */
export function formatNumber(value: number): string {
  const rounded = Math.round(value * 100) / 100
  // Hindari "−0" untuk nilai yang dibulatkan ke nol.
  const text = numberFormat.format(rounded === 0 ? 0 : rounded)
  return text.replace(LEADING_HYPHEN, '\u2212')
}
