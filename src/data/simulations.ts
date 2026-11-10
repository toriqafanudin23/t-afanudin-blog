export interface Simulation {
  slug: string
  title: string
  description: string
}

export const simulations: readonly Simulation[] = [
  { slug: 'fungsi-kuadrat', title: 'Fungsi kuadrat', description: 'Parameter a, h, k, titik puncak, dan akar' },
  { slug: 'irisan-kerucut', title: 'Irisan kerucut', description: 'Elips, parabola, dan hiperbola' },
  {
    slug: 'sistem-persamaan-linear',
    title: 'Sistem persamaan linear',
    description: 'Perpotongan dua garis dan daerah penyelesaian',
  },
  { slug: 'vektor', title: 'Vektor', description: 'Penjumlahan vektor dan komponennya' },
]
