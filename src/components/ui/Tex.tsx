import katex from 'katex'
import 'katex/dist/katex.min.css'
import { memo } from 'react'

// Hasil render di-cache per rumus: rumus yang sama tidak dihitung ulang saat komponen dirender lagi.
const cache = new Map<string, string>()

function render(tex: string, display: boolean): string {
  const key = `${display ? 'd' : 'i'}:${tex}`
  let html = cache.get(key)
  if (html === undefined) {
    html = katex.renderToString(tex, {
      displayMode: display,
      throwOnError: false, // rumus salah tampil merah, halaman tidak rusak
      output: 'htmlAndMathml', // MathML tersembunyi dibacakan oleh pembaca layar
      trust: false,
    })
    cache.set(key, html)
  }
  return html
}

interface TexProps {
  /** Sintaks LaTeX tanpa pembatas $…$. */
  tex: string
}

/** Rumus di dalam kalimat. */
export const Tex = memo(function Tex({ tex }: TexProps) {
  // Aman: string berasal dari kode kita sendiri dan KaTeX dijalankan dengan trust: false.
  return <span dangerouslySetInnerHTML={{ __html: render(tex, false) }} />
})

/** Rumus terpisah di baris sendiri, di tengah, dengan garis oranye di kiri. */
export const TexBlock = memo(function TexBlock({ tex }: TexProps) {
  return (
    <div
      className="my-6 border-l-4 border-brand bg-tint px-4 py-3 text-ink md:px-8"
      dangerouslySetInnerHTML={{ __html: render(tex, true) }}
    />
  )
})
