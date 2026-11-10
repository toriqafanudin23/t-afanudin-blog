export interface Video {
  id: string
  title: string
  description?: string
}

export const featuredVideo: Video = {
  id: 'titik-puncak-parabola',
  title: 'Memahami titik puncak parabola',
  description: 'Pembahasan langkah demi langkah, dari bentuk umum sampai grafik.',
}

export const otherVideos: readonly Video[] = [
  { id: 'peluang-aturan-perkalian', title: 'Peluang: aturan perkalian' },
  { id: 'transformasi-rotasi', title: 'Transformasi geometri: rotasi' },
  { id: 'kompleks-bentuk-polar', title: 'Bilangan kompleks: bentuk polar' },
]
