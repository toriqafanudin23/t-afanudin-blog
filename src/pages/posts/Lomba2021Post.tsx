import type { ReactNode } from 'react'
import { ArticleFooter } from '@/components/layout/ArticleFooter'
import { TagList } from '@/components/ui/TagList'
import { LOMBA_2021_POST_SLUG, posts } from '@/data/posts'
import { SITE } from '@/data/site'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const post = posts.find((p) => p.slug === LOMBA_2021_POST_SLUG)!

const BODY = 'mb-6 text-[17px] leading-[1.56]'

const YOUTUBE_ID = 'E_XfU2WP74g'
const YOUTUBE_URL = 'https://youtu.be/E_XfU2WP74g?si=vefIttmjHazjIZWl'
const SERTIFIKAT_1 = 'https://drive.google.com/file/d/1_-ljHexs6N052CROoMgCAwnYrV6luYy9/view?usp=sharing'
const BERITA_URL =
  'https://kumparan.com/universitas-ahmad-dahlan/mahasiswa-uad-ciptakan-media-pembelajaran-matematika-berbasis-augmented-reality-1wxz0edkhAM'
const SERTIFIKAT_2 = 'https://drive.google.com/file/d/1OkIXyh19L4q-9da47YKTJiHrGn0S7ngr/view?usp=sharing'

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="link">
      {children}
    </a>
  )
}

export default function Lomba2021Post() {
  const revealRef = useScrollReveal<HTMLElement>()

  return (
    <>
      <title>{`${post.title} — ${SITE.name}`}</title>
      <main id="konten" className="container-page pt-10 pb-16 lg:pt-14 lg:pb-24">
        <article ref={revealRef} className="mx-auto w-full max-w-[800px]">
          <h1 className="mb-4 text-[30px] leading-[1.2] text-body md:text-[40px]">{post.title}</h1>
          <TagList tags={post.tags} className="mb-3 text-link" />
          <p className="mb-8 text-[15px] text-muted">
            {SITE.author}, <time dateTime="2026-11-10">10 November 2026</time>
          </p>

          <p className={BODY}>
            Tepat lima tahun lalu, November 2021, adalah bulan yang sangat bermakna dalam hidup saya. Dalam bulan
            tersebut, saya memperoleh dua piala yang saya boyong dari UNNES dan UNY. Keduanya adalah piala juara lomba
            media pembelajaran tingkat nasional. Saya mengikuti perlombaan ini bersama teman saya, Alfika.
          </p>
          <p className={BODY}>
            Hari-hari yang akan selalu diingat: berhari-hari kurang tidur, mata perih di depan komputer hanya untuk
            mempersiapkan perlombaan. Sedikit kenangannya bisa dilihat pada{' '}
            <ExternalLink href={YOUTUBE_URL}>kanal YouTube ini</ExternalLink>. Adapun saya ingin berbagi sertifikat yang
            saya dapatkan dalam lomba penuh perjuangan tersebut:{' '}
            <ExternalLink href={SERTIFIKAT_1}>sertifikat pertama</ExternalLink> dan{' '}
            <ExternalLink href={SERTIFIKAT_2}>sertifikat kedua</ExternalLink>.
          </p>

          <div className="mb-8 aspect-video w-full bg-tint">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}`}
              title="Kenangan lomba media pembelajaran 2021"
              loading="lazy"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="size-full border-0"
            />
          </div>

          <p className={BODY}>
            Waktu itu juga pertama kalinya bagi saya masuk berita. Beritanya bisa dibaca di{' '}
            <ExternalLink href={BERITA_URL}>kumparan</ExternalLink>.
          </p>
          <p className={BODY}>
            Selama lima tahun terakhir, saya merasa tidak berprestasi lagi. Kedua piala tersebut adalah piala pertama
            dan piala terakhir yang saya miliki sepanjang hidup.
          </p>
          <p className={BODY}>Terima kasih, Alfika. Terima kasih, Bu Rima.</p>
        </article>
      </main>
      <ArticleFooter />
    </>
  )
}
