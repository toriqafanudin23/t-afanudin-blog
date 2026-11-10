import { ArticleFooter } from '@/components/layout/ArticleFooter'
import { ButtonLink } from '@/components/ui/Button'
import { SITE } from '@/data/site'
import { routes } from '@/lib/routes'

export default function NotFound() {
  return (
    <>
      <title>{`Halaman belum tersedia — ${SITE.name}`}</title>
      <main id="konten" className="container-page py-12 lg:py-16">
        <div className="mx-auto max-w-[800px]">
          <h1 className="mb-5 text-[32px] leading-[1.2] text-body md:text-[40px]">Halaman ini belum tersedia</h1>
          <p className="mb-9 max-w-[520px] text-[17px] leading-[1.56]">
            Tulisan atau simulasi yang Anda cari belum dibuat. Coba kembali ke beranda dan pilih yang lain.
          </p>
          <ButtonLink to={routes.home} variant="primary">
            Kembali ke beranda
          </ButtonLink>
        </div>
      </main>
      <ArticleFooter />
    </>
  )
}
