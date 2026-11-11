import { useState, type FormEvent } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { Placeholder } from '@/components/ui/Placeholder'
import { SITE } from '@/data/site'

export function HomeFooter() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const [query, setQuery] = useState(() => params.get('q') ?? '')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const q = query.trim()
    navigate(q ? `/?q=${encodeURIComponent(q)}#tulisan` : '/#tulisan')
  }

  return (
    <div className="container-page">
      <div aria-hidden="true" className="h-1.5 bg-ink" />
      <footer
        id="tentang"
        className="grid scroll-mt-6 gap-8 pt-8 pb-10 lg:grid-cols-[1.2fr_1fr] lg:gap-[72px] lg:pt-12 lg:pb-16"
      >
        <div className="flex gap-6">
          <div className="hidden shrink-0 lg:block">
            <Placeholder className="h-[150px] w-[120px] text-sm">foto</Placeholder>
          </div>
          <div>
            <h3 className="mb-2 text-[22px] leading-[1.25] lg:text-2xl">{SITE.author}</h3>
            <p className="text-[17px] leading-[1.56] text-muted">
              Saya membangun blog ini sebagai tempat berbagi, bercerita, dan tempat berinovasi, utamanya dalam pendidikan matematika.
            </p>
          </div>
        </div>

        <form role="search" onSubmit={handleSubmit}>
          <label htmlFor="cari" className="mb-2 block font-medium text-ink">
            Cari tulisan
          </label>
          <input
            id="cari"
            name="q"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Misalnya: parabola"
            className="min-h-12 w-full border-2 border-ink bg-white px-3.5 font-sans text-base transition-colors hover:border-brand focus:border-brand"
          />
        </form>
      </footer>
    </div>
  )
}
