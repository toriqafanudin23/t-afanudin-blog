import { memo } from 'react'
import { Link } from 'react-router'
import { TagList } from '@/components/ui/TagList'
import type { Post } from '@/data/posts'
import { formatDate } from '@/lib/format'
import { routes } from '@/lib/routes'

interface PostCardProps {
  post: Post
}

/**
 * Putih dengan garis hitam tebal di atas judul. Saat di-hover/fokus, seluruh area kartu
 * (termasuk padding di atas garis dan di kiri-kanan) menjadi oranye cerah dan garisnya memutih.
 * Padding kartu = gutter halaman, jadi area oranye meluas tanpa keluar layar.
 */
export const PostCard = memo(function PostCard({ post }: PostCardProps) {
  return (
    <article className="group relative px-5 pt-7 pb-8 transition-colors duration-150 focus-within:bg-brand hover:bg-brand md:px-9 md:pt-9">
      <div className="border-t-4 border-ink pt-[18px] transition-colors duration-150 group-focus-within:border-white group-hover:border-white">
        <h3 className="mb-[18px] text-[26px] leading-[1.12] text-ink transition-colors duration-150 group-focus-within:text-white group-hover:text-white">
          {/* after:inset-0 membuat seluruh kartu bisa diklik */}
          <Link to={routes.post(post.slug)} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h3>
        {post.date ? (
          <p className="mb-3 text-[15px] text-muted transition-colors duration-150 group-focus-within:text-white group-hover:text-white">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </p>
        ) : null}
        {post.excerpt ? (
          <p className="mb-5 text-[17px] leading-[1.56] text-muted transition-colors duration-150 group-focus-within:text-white group-hover:text-white">
            {post.excerpt}
          </p>
        ) : null}
        <TagList
          tags={post.tags}
          className="text-link transition-colors duration-150 group-focus-within:text-white group-hover:text-white"
        />
      </div>
    </article>
  )
})
