import { useId, useState } from 'react'
import { Comments } from '@/components/comments/Comments'
import { ArticleFooter } from '@/components/layout/ArticleFooter'
import { QuadraticSimulator } from '@/components/simulator/QuadraticSimulator'
import { Button } from '@/components/ui/Button'
import { TagList } from '@/components/ui/TagList'
import { Tex, TexBlock } from '@/components/ui/Tex'
import { QUADRATIC_POST_SLUG, posts } from '@/data/posts'
import { SITE } from '@/data/site'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const post = posts.find((p) => p.slug === QUADRATIC_POST_SLUG)!

const BODY = 'mb-6 text-[17px] leading-[1.56]'
const H2 = 'mt-12 mb-4 scroll-mt-6 text-[26px] leading-[1.2] text-body md:text-[30px]'

// Rumus dipisah dari JSX supaya mudah dibaca dan dicek. `\dfrac` = pecahan ukuran penuh di dalam kalimat.
const COMPLETE_SQUARE = String.raw`\begin{aligned}
f(x) &= ax^2 + bx + c \\[4pt]
     &= a\left(x^2 + \frac{b}{a}\,x\right) + c \\[4pt]
     &= a\left[\left(x + \frac{b}{2a}\right)^2 - \frac{b^2}{4a^2}\right] + c \\[4pt]
     &= a\left(x + \frac{b}{2a}\right)^2 + c - \frac{b^2}{4a}
\end{aligned}`

const VERTEX = String.raw`h = -\frac{b}{2a}, \qquad k = c - \frac{b^2}{4a}`

const EXERCISE_STEPS = String.raw`\begin{aligned}
f(x) &= 2x^2 - 8x + 5 \\[4pt]
     &= 2\left(x^2 - 4x\right) + 5 \\[4pt]
     &= 2\left[(x - 2)^2 - 4\right] + 5 \\[4pt]
     &= 2(x - 2)^2 - 3
\end{aligned}`

export default function Post() {
  const revealRef = useScrollReveal<HTMLElement>()

  return (
    <>
      <title>{`${post.title} — ${SITE.name}`}</title>
      <main id="konten" className="container-page pt-10 pb-16 lg:pt-14 lg:pb-24">
        <article ref={revealRef} className="mx-auto w-full max-w-[800px]">
          <h1 className="mb-4 text-[30px] leading-[1.2] text-body md:text-[40px]">{post.title}</h1>
          <TagList tags={post.tags} className="mb-3 text-link" />
          <p className="mb-8 text-[15px] text-muted">
            {SITE.author}, <time dateTime="2026-11-09">9 November 2026</time>
          </p>

          <p className={BODY}>
            Grafik <Tex tex="f(x) = ax^2 + bx + c" /> selalu berupa parabola, tetapi letak puncaknya tidak terlihat
            dari rumus itu. Bentuk puncak <Tex tex="f(x) = a(x - h)^2 + k" /> menunjukkannya langsung: puncaknya di{' '}
            <Tex tex="(h,\,k)" />.
          </p>

          <h2 id="melengkapkan-kuadrat" className={H2}>
            Melengkapkan kuadrat
          </h2>
          <p className={BODY}>
            Keluarkan <Tex tex="a" /> dari dua suku pertama, lalu tambah dan kurangkan kuadrat dari setengah koefisien{' '}
            <Tex tex="x" />.
          </p>
          <TexBlock tex={COMPLETE_SQUARE} />
          <p className={BODY}>Dengan membandingkan bentuk terakhir dengan bentuk puncak, diperoleh</p>
          <TexBlock tex={VERTEX} />
          <p className={BODY}>
            Parabola membuka ke atas bila <Tex tex="a > 0" /> dan ke bawah bila <Tex tex="a < 0" />.
          </p>

          <h2 id="coba-sendiri" className={H2}>
            Coba sendiri
          </h2>
          <QuadraticSimulator />
          <p className="mt-3 text-[15px] text-muted">
            Geser <Tex tex="a" />, <Tex tex="h" />, dan <Tex tex="k" />, lalu bandingkan titik puncak dengan rumus di
            atas.
          </p>

          <h2 id="latihan" className={H2}>
            Latihan
          </h2>
          <Exercise />
        </article>
        <Comments className="mx-auto mt-16 w-full max-w-[800px]" />
      </main>
      <ArticleFooter />
    </>
  )
}

function Exercise() {
  const [revealed, setRevealed] = useState(false)
  const panelId = useId()

  return (
    <div className="border-t-4 border-ink pt-5">
      <p className="mb-5 text-[17px] leading-[1.56]">
        Tentukan titik puncak <Tex tex="f(x) = 2x^2 - 8x + 5" />.
      </p>
      <Button aria-expanded={revealed} aria-controls={panelId} onClick={() => setRevealed((value) => !value)}>
        {revealed ? 'Sembunyikan pembahasan' : 'Lihat pembahasan'}
      </Button>

      <div id={panelId} hidden={!revealed} className="mt-6">
        <p className="text-[17px] leading-[1.56]">
          Keluarkan 2 dari dua suku pertama, lalu lengkapkan kuadratnya dengan menambah dan mengurangkan 4, kuadrat dari
          setengah koefisien <Tex tex="x" />:
        </p>
        <TexBlock tex={EXERCISE_STEPS} />
        <p className="text-[17px] leading-[1.56]">
          Jadi titik puncaknya <Tex tex="(2,\,-3)" />. Cek dengan rumus: <Tex tex="h = -\dfrac{-8}{2 \cdot 2} = 2" />{' '}
          dan <Tex tex="k = 5 - \dfrac{(-8)^2}{4 \cdot 2} = -3" />.
        </p>
      </div>
    </div>
  )
}
