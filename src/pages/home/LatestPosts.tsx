import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router'
import { PostCard } from '@/components/PostCard'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { posts, type Post } from '@/data/posts'
import { useColumnCount } from '@/hooks/useColumnCount'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { routes } from '@/lib/routes'

// Indeks pencarian dibangun sekali; huruf kecil di-cache agar tidak dihitung ulang tiap ketikan.
const SEARCH_INDEX = posts.map((post) => ({
  post,
  text: [post.title, post.excerpt ?? '', ...post.tags].join(' ').toLowerCase(),
}))

/** Bagi kartu ke kolom bergiliran (1, 2, 3, 1, 2, 3 …) supaya tiap kolom mengalir sendiri seperti masonry. */
function toColumns(items: readonly Post[], count: number): Post[][] {
  const columns: Post[][] = Array.from({ length: count }, () => [])
  items.forEach((item, index) => columns[index % count].push(item))
  return columns
}

export function LatestPosts() {
  const [params] = useSearchParams()
  const query = (params.get('q') ?? '').trim()
  const columnCount = useColumnCount()

  const results = useMemo(() => {
    if (!query) return posts
    const needle = query.toLowerCase()
    return SEARCH_INDEX.filter((entry) => entry.text.includes(needle)).map((entry) => entry.post)
  }, [query])

  const columns = useMemo(() => toColumns(results, columnCount), [results, columnCount])
  const revealRef = useScrollReveal<HTMLDivElement>(':scope > div > article')

  return (
    <section id="tulisan" className="container-page scroll-mt-6 pb-14 md:pb-20">
      {query ? (
        <SectionHeading
          title={`Hasil untuk “${query}”`}
          linkLabel="Hapus pencarian"
          linkTo={routes.homeSection('tulisan')}
          linkAlwaysVisible
          rule={false}
          className="mb-6"
        />
      ) : null}

      {results.length > 0 ? (
        // -mx = padding kartu, jadi isi kartu sejajar dengan garis header sementara area oranye meluas ke gutter.
        // key: susunan kartu berubah saat pencarian/jumlah kolom berubah, jadi animasi dipasang ulang.
        <div
          key={`${query}-${columnCount}`}
          ref={revealRef}
          className="-mx-5 grid grid-cols-1 items-start md:-mx-9 md:grid-cols-2 lg:grid-cols-3"
        >
          {columns.map((column, index) => (
            <div key={index} className="flex flex-col">
              {column.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ))}
        </div>
      ) : (
        <p role="status" className="text-[19px] leading-[1.6] text-muted">
          Tidak ada tulisan yang cocok.{' '}
          <Link to={routes.homeSection('tulisan')} className="link">
            Tampilkan semua tulisan
          </Link>
        </p>
      )}
    </section>
  )
}
