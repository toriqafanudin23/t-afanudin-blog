export const routes = {
  home: '/',
  posts: '/tulisan',
  post: (slug: string) => `/tulisan/${slug}`,
  simulations: '/simulasi',
  simulation: (slug: string) => `/simulasi/${slug}`,
  videos: '/video',
  /** Tautan ke bagian di beranda, mis. homeSection('simulasi') → /#simulasi */
  homeSection: (id: string) => `/#${id}`,
} as const
