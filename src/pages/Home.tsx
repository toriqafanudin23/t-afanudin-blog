import { HomeFooter } from '@/components/layout/HomeFooter'
import { SITE } from '@/data/site'
import { LatestPosts } from './home/LatestPosts'

export default function Home() {
  return (
    <>
      <title>{`${SITE.name} — ${SITE.tagline}`}</title>
      <main id="konten">
        <LatestPosts />
      </main>
      <HomeFooter />
    </>
  )
}
