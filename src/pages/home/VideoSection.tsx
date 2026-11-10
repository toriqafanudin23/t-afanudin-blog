import { Placeholder } from '@/components/ui/Placeholder'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { featuredVideo, otherVideos } from '@/data/videos'
import { routes } from '@/lib/routes'

/** Bagian video hanya tampil di layar lebar. */
export function VideoSection() {
  return (
    <section id="video" className="container-page hidden scroll-mt-6 pb-20 lg:block">
      <SectionHeading title="Video" linkLabel="Semua video" linkTo={routes.videos} className="mb-8" />

      <div className="grid grid-cols-[1.6fr_1fr] gap-10">
        <div>
          <div className="relative flex aspect-video items-center justify-center bg-tint">
            <svg viewBox="0 0 640 360" aria-hidden="true" className="absolute inset-0 size-full">
              <g className="stroke-line">
                <line x1={0} y1={180} x2={640} y2={180} />
                <line x1={320} y1={0} x2={320} y2={360} />
              </g>
              <path d="M80 40Q320 460 560 40" fill="none" className="stroke-cobalt" strokeWidth={4} />
            </svg>
            <button
              type="button"
              aria-label="Putar video"
              className="relative flex h-14 w-20 cursor-pointer items-center justify-center rounded-2xl bg-brand transition-colors hover:bg-ink"
            >
              <svg width="26" height="26" viewBox="0 0 30 30" aria-hidden="true">
                <path d="M9 4l18 11L9 26z" className="fill-white" />
              </svg>
            </button>
          </div>
          <h3 className="mt-5 mb-2 text-[24px] leading-[1.2]">{featuredVideo.title}</h3>
          <p className="text-[17px] leading-[1.56] text-muted">{featuredVideo.description}</p>
        </div>

        <ul>
          {otherVideos.map((video) => (
            <li key={video.id} className="grid grid-cols-[120px_1fr] gap-4 border-t-4 border-ink pt-4 pb-5">
              <Placeholder className="aspect-video text-xs">video</Placeholder>
              <h3 className="text-[18px] leading-[1.2]">{video.title}</h3>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
