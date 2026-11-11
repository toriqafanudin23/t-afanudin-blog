import { useCallback } from 'react'

/**
 * Animasi ringan saat menggulir: elemen yang cocok dengan `selector` (relatif terhadap elemen
 * yang dipasangi ref) muncul pelan dari bawah ketika masuk layar. Hanya sekali per elemen.
 *
 * - Elemen yang sudah terlihat saat halaman dibuka tidak dianimasikan ulang (tanpa kedipan).
 * - Tanpa JavaScript atau dengan `prefers-reduced-motion`, konten langsung tampil biasa.
 * - Gaya ada di index.css (`.reveal`, `.reveal-in`).
 */
export function useScrollReveal<T extends HTMLElement>(selector = ':scope > *') {
  return useCallback(
    (root: T | null) => {
      if (!root || typeof IntersectionObserver === 'undefined') return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const viewportBottom = window.innerHeight
      const items = Array.from(root.querySelectorAll<HTMLElement>(selector)).filter(
        (el) => el.getBoundingClientRect().top > viewportBottom * 0.92,
      )
      if (items.length === 0) return

      const observer = new IntersectionObserver(
        (entries) => {
          // Beberapa kartu yang muncul bersamaan dibuat berurutan, selisih tipis saja.
          entries
            .filter((entry) => entry.isIntersecting)
            .forEach((entry, index) => {
              const el = entry.target as HTMLElement
              el.style.setProperty('--reveal-delay', `${Math.min(index, 5) * 70}ms`)
              el.classList.add('reveal-in')
              observer.unobserve(el)
            })
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
      )

      items.forEach((el) => {
        el.classList.add('reveal')
        observer.observe(el)
      })

      return () => {
        observer.disconnect()
        items.forEach((el) => el.classList.remove('reveal', 'reveal-in'))
      }
    },
    [selector],
  )
}
