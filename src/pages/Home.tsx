import { Comments } from '@/components/comments/Comments'
import { HomeFooter } from '@/components/layout/HomeFooter'
import { SITE } from '@/data/site'
import { LatestPosts } from './home/LatestPosts'

export default function Home() {
  return (
    <>
      <title>{`${SITE.name} — ${SITE.tagline}`}</title>
      <main id="konten">
        <LatestPosts />
        <div className="container-page pb-14 md:pb-20">
          <Comments className="mx-auto w-full max-w-[800px]" />
        </div>
      </main>
      <HomeFooter />
    </>
  )
}
