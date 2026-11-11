export interface Post {
  slug: string
  title: string
  excerpt?: string
  /** Tanpa awalan "#". */
  tags: readonly string[]
  /** Tanggal terbit, format ISO (YYYY-MM-DD atau YYYY-MM). Dipakai untuk SEO. */
  date?: string
}

/** Slug tulisan yang sudah punya halaman (sesuai desain "Halaman tulisan"). */
export const QUADRATIC_POST_SLUG = 'dari-bentuk-umum-ke-titik-puncak-fungsi-kuadrat'

/** Slug tulisan kenangan lomba media pembelajaran 2021. */
export const LOMBA_2021_POST_SLUG = 'mengingat-perjuangan-5-tahun-yang-lalu'

/** Slug yang sudah punya halaman sendiri. Hanya ini yang masuk sitemap. */
export const PAGE_SLUGS: readonly string[] = [QUADRATIC_POST_SLUG, LOMBA_2021_POST_SLUG]

/** Urutan array = urutan tampil di beranda: tulisan terbaru paling atas. */
export const posts: readonly Post[] = [
  {
    slug: LOMBA_2021_POST_SLUG,
    title: 'Mengingat perjuangan 5 tahun yang lalu',
    excerpt: 'Dua piala juara lomba media pembelajaran tingkat nasional dari UNNES dan UNY, lima tahun lalu.',
    tags: ['reminder'],
    date: '2026-11-10',
  },
  {
    slug: QUADRATIC_POST_SLUG,
    title: 'Dari bentuk umum ke titik puncak: fungsi kuadrat',
    excerpt: 'Mengapa letak puncak parabola bisa dibaca dari koefisiennya, dijelaskan dengan melengkapkan kuadrat.',
    tags: ['fungsi-kuadrat', 'aljabar'],
    date: '2026-11',
  },
]
