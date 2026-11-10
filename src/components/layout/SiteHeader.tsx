import { Link, useLocation } from 'react-router'
import { Logo } from '@/components/ui/Logo'
import { SITE } from '@/data/site'
import { routes } from '@/lib/routes'

/** Logo + nama blog, garis hitam tebal, lalu tagline. Tanpa navbar. */
export function SiteHeader() {
  const { pathname } = useLocation()
  const isHome = pathname === routes.home

  return (
    <header className="container-page pt-8 md:pt-[60px]">
      <Link to={routes.home} className="flex items-center gap-4 md:gap-6">
        <Logo className="size-14 shrink-0 md:size-20" />
        <span className="font-sans text-[28px] leading-tight text-black md:text-[48px]">{SITE.name}</span>
      </Link>

      <div aria-hidden="true" className="mt-6 h-1.5 bg-ink md:mt-[30px]" />

      <p className="py-6 font-serif text-[17px] italic text-ink md:pt-7 md:pb-8">{SITE.tagline}</p>

      {/* Halaman dalam memakai garis kedua di bawah tagline (seperti referensi); beranda langsung ke kartu. */}
      {isHome ? null : <div aria-hidden="true" className="h-1 bg-ink" />}
    </header>
  )
}
