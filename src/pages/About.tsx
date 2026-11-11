import { Link } from 'react-router'
import { ArticleFooter } from '@/components/layout/ArticleFooter'
import { LOMBA_2021_POST_SLUG } from '@/data/posts'
import { ABOUT, SITE } from '@/data/site'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { routes } from '@/lib/routes'

const BODY = 'mb-6 text-[17px] leading-[1.56]'
const HEADING = 'mt-10 mb-4 text-[24px] leading-[1.25] md:text-[28px]'

export default function About() {
  const revealRef = useScrollReveal<HTMLElement>()

  return (
    <>
      <title>{`${ABOUT.title} — ${SITE.name}`}</title>
      <meta name="description" content={ABOUT.description} />
      <main id="konten" className="container-page pt-10 pb-16 lg:pt-14 lg:pb-24">
        <article ref={revealRef} className="mx-auto w-full max-w-[800px]">
          <h1 className="mb-8 text-[30px] leading-[1.2] text-body md:text-[40px]">{ABOUT.title}</h1>

          <p className={BODY}>
            Saat tulisan ini saya ketik, saya masih menganggur. Saya baru saja lulus sarjana pada 31 Oktober 2026 dari
            Program Studi Pendidikan Matematika, Universitas Ahmad Dahlan. Saya tinggal di Desa Kembaran, Kecamatan
            Kalikajar, Kabupaten Wonosobo.
          </p>

          <h2 className={HEADING}>Sebelum kuliah</h2>
          <p className={BODY}>
            Saya sudah menyukai matematika sejak lama. Nilai ujian nasional matematika saya waktu SMP adalah 100. Lulus
            SMP, saya bersekolah di SMKN Jawa Tengah sebagai angkatan 2, saat sekolah itu baru berdiri. Setelah lulus,
            saya memilih bekerja sebagai buruh pabrik di PT Komatsu Undercarriage Indonesia.
          </p>

          <h2 className={HEADING}>Selama kuliah</h2>
          <p className={BODY}>
            Di kampus, saya sempat menjadi ketua himpunan mahasiswa Program Studi Pendidikan Matematika UAD. Jujur saja,
            saya menjabat karena terpaksa, sebab saat itu sedang masa pandemi Covid-19. Saya juga menjadi asisten dosen
            untuk mata kuliah Dasar Pemrograman Komputer dan Komputasi Statistika, sehingga sempat mengajar pemrograman.
          </p>
          <p className={BODY}>
            Saya dua kali menjuarai lomba media pembelajaran tingkat nasional. Kisahnya saya tulis di{' '}
            <Link to={routes.post(LOMBA_2021_POST_SLUG)} className="link">
              Mengingat perjuangan 5 tahun yang lalu
            </Link>
            . Di luar kampus, saya juga mengajar lepas di bimbingan belajar CerMat Eduka Jogja.
          </p>

          <h2 className={HEADING}>Matematika, coding, dan blog ini</h2>
          <p className={BODY}>
            Cita-cita saya menjadi guru, tetapi kadang saya juga ingin menjadi programmer. Aneh, bukan? Memang begitu,
            karena saya suka matematika sekaligus suka coding. Dua hal itu pula yang membuat saya banyak berkarya
            mengembangkan media pembelajaran berbasis digital. Belakangan, hobi saya bergeser menjadi membuat website,
            dan blog ini adalah salah satu hasilnya.
          </p>
          <p className={BODY}>Oh ya, saya pernah berpacaran satu kali, dan sudah kapok.</p>
        </article>
      </main>
      <ArticleFooter />
    </>
  )
}
