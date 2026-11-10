import { useSyncExternalStore } from 'react'

// MediaQueryList dibuat sekali di level modul; sama dengan breakpoint md (768px) dan lg (1024px).
const LG = typeof window === 'undefined' ? null : window.matchMedia('(min-width: 1024px)')
const MD = typeof window === 'undefined' ? null : window.matchMedia('(min-width: 768px)')

function subscribe(onChange: () => void) {
  LG?.addEventListener('change', onChange)
  MD?.addEventListener('change', onChange)
  return () => {
    LG?.removeEventListener('change', onChange)
    MD?.removeEventListener('change', onChange)
  }
}

const getSnapshot = () => (LG?.matches ? 3 : MD?.matches ? 2 : 1)
const getServerSnapshot = () => 3

/** Jumlah kolom kartu: 3 (desktop), 2 (tablet), 1 (ponsel). */
export function useColumnCount(): number {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
