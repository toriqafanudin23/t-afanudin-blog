import { Link } from 'react-router'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { simulations } from '@/data/simulations'
import { routes } from '@/lib/routes'

export function SimulationList() {
  return (
    <section id="simulasi" className="container-page scroll-mt-6 pb-14 lg:pb-20">
      <SectionHeading title="Simulasi" linkLabel="Semua simulasi" linkTo={routes.simulations} className="mb-6 lg:mb-8" />

      <div className="lg:grid lg:grid-cols-[340px_1fr] lg:gap-[72px]">
        <p className="mb-6 text-[17px] leading-[1.56] text-muted lg:mb-0">
          Setiap simulasi berjalan di halaman dan bisa dipakai langsung di kelas, tanpa memasang apa pun.
        </p>

        {/* Baris simulasi memakai hover oranye yang meluas ke kiri-kanan, sama seperti kartu tulisan. */}
        <ul className="-mx-5 md:-mx-9 lg:-mx-6">
          {simulations.map((sim) => (
            <li key={sim.slug}>
              <Link
                to={routes.simulation(sim.slug)}
                className="group grid min-h-16 grid-cols-[1fr_auto] items-center gap-x-6 px-5 py-4 transition-colors duration-150 hover:bg-brand focus-visible:bg-brand md:px-9 lg:grid-cols-[1fr_1.2fr_auto] lg:items-baseline lg:px-6"
              >
                <h3 className="text-[20px] leading-[1.2] transition-colors group-hover:text-white group-focus-visible:text-white lg:text-[22px]">
                  {sim.title}
                </h3>
                <span className="hidden text-muted transition-colors group-hover:text-white group-focus-visible:text-white lg:block">
                  {sim.description}
                </span>
                <span className="text-link underline underline-offset-2 transition-colors group-hover:text-white group-focus-visible:text-white">
                  Buka
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
