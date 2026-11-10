import { HomeFooter } from '@/components/layout/HomeFooter'
import { SITE } from '@/data/site'
import { LatestPosts } from './home/LatestPosts'
import { SimulationList } from './home/SimulationList'
import { VideoSection } from './home/VideoSection'

export default function Home() {
  return (
    <>
      <title>{SITE.name}</title>
      <main id="konten">
        <LatestPosts />
        <SimulationList />
        <VideoSection />
      </main>
      <HomeFooter />
    </>
  )
}
