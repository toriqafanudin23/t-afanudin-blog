import { useEffect } from 'react'
import { useLocation } from 'react-router'

/**
 * Router tidak mengatur scroll sendiri. Komponen ini:
 * - menggulir ke elemen dengan id sesuai hash (dan memfokus bila itu input, mis. #cari),
 * - kembali ke atas saat pindah halaman tanpa hash.
 */
export function ScrollToHash() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (target) {
        target.scrollIntoView()
        if (target instanceof HTMLInputElement) target.focus({ preventScroll: true })
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash, key])

  return null
}
