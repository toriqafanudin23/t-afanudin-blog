import { Link } from 'react-router'
import { SITE } from '@/data/site'
import { routes } from '@/lib/routes'

export function ArticleFooter() {
  return (
    <div className="container-page">
      <div aria-hidden="true" className="h-1.5 bg-ink" />
      <footer className="flex flex-col gap-3 pt-8 pb-12 text-muted sm:flex-row sm:justify-between">
        <span>
          {SITE.name}, oleh {SITE.author}
        </span>
        <Link to={routes.homeSection('tulisan')} className="link">
          Kembali ke semua tulisan
        </Link>
      </footer>
    </div>
  )
}
