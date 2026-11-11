import type { ReactNode } from 'react'
import { ArticleFooter } from '@/components/layout/ArticleFooter'
import { TagList } from '@/components/ui/TagList'
import { SIMULASI_POST_SLUG, posts } from '@/data/posts'
import { SITE } from '@/data/site'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { formatDate } from '@/lib/format'

const post = posts.find((p) => p.slug === SIMULASI_POST_SLUG)!

const BODY = 'mb-6 text-[17px] leading-[1.56]'

const SITUS_URL = 'https://1729.blog/'
const YOUTUBE_ID = 'Bn-3BOJDx_o'
const EMAIL = 'toriqafanudin@gmail.com'

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="link">
      {children}
    </a>
  )
}

export default function SimulasiPost() {
  const revealRef = useScrollReveal<HTMLElement>()

  return (
    <>
      <title>{`${post.title} — ${SITE.name}`}</title>
      <main id="konten" className="container-page pt-10 pb-16 lg:pt-14 lg:pb-24">
        <article ref={revealRef} className="mx-auto w-full max-w-[800px]">
          <h1 className="mb-4 text-[30px] leading-[1.2] text-body md:text-[40px]">{post.title}</h1>
          <TagList tags={post.tags} className="mb-3 text-link" />
          <p className="mb-8 text-[15px] text-muted">
            {SITE.author}, <time dateTime={post.date}>{formatDate(post.date!)}</time>
          </p>

          <p className={BODY}>
            Terinspirasi dari GeoGebra dan Desmos, saya ingin punya website untuk melakukan simulasi matematika sendiri.
            Setelah bertanya kepada Claude AI, akhirnya saya mendapat jawaban dari keinginan saya tersebut, yaitu React
            dan JSXGraph. Dengan kedua teknologi tersebut, saya berhasil membuat website simulasi matematika yang keren.
          </p>
          <p className={BODY}>
            Website ini punya keunggulan: simulasinya sudah jadi dan tinggal dipakai mengajar. Saya berharap konsep
            matematika yang sulit, seperti limit, turunan, dan integral, dapat disampaikan dengan lebih baik sehingga
            anak-anak mudah memahaminya. Kunjungi <ExternalLink href={SITUS_URL}>1729.blog</ExternalLink> untuk
            mencobanya.
          </p>

          <div className="mb-8 aspect-video w-full bg-tint">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}`}
              title="Demo website simulasi matematika 1729"
              loading="lazy"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="size-full border-0"
            />
          </div>

          <p className={BODY}>
            Saran dan masukan yang membangun sangat saya harapkan dari kalian. Silakan kirim ke{' '}
            <a href={`mailto:${EMAIL}`} className="link">
              {EMAIL}
            </a>
            .
          </p>
        </article>
      </main>
      <ArticleFooter />
    </>
  )
}
