export interface Post {
  slug: string
  title: string
  excerpt?: string
  /** Tanpa awalan "#". */
  tags: readonly string[]
}

/** Slug tulisan yang sudah punya halaman (sesuai desain "Halaman tulisan"). */
export const QUADRATIC_POST_SLUG = 'dari-bentuk-umum-ke-titik-puncak-fungsi-kuadrat'

export const posts: readonly Post[] = [
  {
    slug: QUADRATIC_POST_SLUG,
    title: 'Dari bentuk umum ke titik puncak: fungsi kuadrat',
    excerpt: 'Mengapa letak puncak parabola bisa dibaca dari koefisiennya, dijelaskan dengan melengkapkan kuadrat.',
    tags: ['fungsi-kuadrat', 'aljabar'],
  },
  {
    slug: 'irisan-kerucut',
    title: 'Irisan kerucut: elips, parabola, dan hiperbola dari satu kerucut',
    excerpt: 'Potong kerucut dengan bidang, ubah sudutnya, lalu lihat kurva mana yang muncul.',
    tags: ['irisan-kerucut', 'geometri'],
  },
  {
    slug: 'peluang-kelas-10',
    title: 'Peluang kelas 10: menghitung dulu, memakai rumus kemudian',
    excerpt:
      'Catatan mengajar tentang urutan yang membuat aturan penjumlahan dan perkalian masuk akal bagi siswa.',
    tags: ['peluang', 'mengajar'],
  },
  {
    slug: 'transformasi-geometri-tanpa-matriks',
    title: 'Transformasi geometri tanpa menghafal matriks',
    tags: ['transformasi', 'geometri'],
  },
  {
    slug: 'bilangan-kompleks-bidang-argand',
    title: 'Bilangan kompleks di bidang Argand',
    tags: ['bilangan-kompleks'],
  },
  {
    slug: 'kombinatorika-osn-sarang-merpati',
    title: 'Kombinatorika untuk OSN: prinsip sarang merpati',
    tags: ['kombinatorika', 'olimpiade'],
  },
]
