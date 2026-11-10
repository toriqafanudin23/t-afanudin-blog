import { Suspense } from 'react'
import { Outlet } from 'react-router'
import { ScrollToHash } from './ScrollToHash'
import { SiteHeader } from './SiteHeader'

export function Layout() {
  return (
    <>
      <ScrollToHash />
      <a
        href="#konten"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-3 focus:text-white"
      >
        Lewati ke konten
      </a>
      <SiteHeader />
      <Suspense fallback={<div className="min-h-[60vh]" aria-busy="true" />}>
        <Outlet />
      </Suspense>
    </>
  )
}
