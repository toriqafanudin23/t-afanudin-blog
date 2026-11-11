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

const BULAN = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
] as const

/** "2026-11-09" → "9 November 2026"; "2026-11" → "November 2026". */
export function formatDate(iso: string): string {
  const [year, month, day] = iso.split('-')
  const bulan = BULAN[Number(month) - 1]
  return day ? `${Number(day)} ${bulan} ${year}` : `${bulan} ${year}`
}

const commentTimeFormat = new Intl.DateTimeFormat('id-ID', { dateStyle: 'long', timeStyle: 'short' })

/** Waktu komentar dari stempel ISO penuh, dalam zona waktu pengunjung, mis. "11 November 2026 pukul 09.21". */
export function formatCommentTime(iso: string): string {
  const time = new Date(iso)
  return Number.isNaN(time.getTime()) ? '' : commentTimeFormat.format(time)
}
