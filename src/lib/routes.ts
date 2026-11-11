export const routes = {
  home: '/',
  about: '/tentang',
  posts: '/tulisan',
  post: (slug: string) => `/tulisan/${slug}`,
  /** Tautan ke bagian di beranda, mis. homeSection('tulisan') → /#tulisan */
  homeSection: (id: string) => `/#${id}`,
} as const
