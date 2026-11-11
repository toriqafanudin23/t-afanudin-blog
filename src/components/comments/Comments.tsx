import clsx from 'clsx'
import { useId, useState, type FormEvent } from 'react'
import { useLocation } from 'react-router'
import { CommentItem } from '@/components/comments/CommentItem'
import { Button } from '@/components/ui/Button'
import { useComments } from '@/hooks/useComments'
import { CommentsError, commentsEnabled, postComment } from '@/lib/commentsApi'

const NAME_MAX = 60
const BODY_MAX = 1000
const NAME_KEY = 'komentar:nama'

const FIELD =
  'w-full border-2 border-ink bg-white px-3.5 font-sans text-base text-ink transition-colors hover:border-brand focus:border-brand aria-[invalid=true]:border-link'

function readSavedName(): string {
  try {
    return localStorage.getItem(NAME_KEY) ?? ''
  } catch {
    return ''
  }
}

function saveName(name: string) {
  try {
    localStorage.setItem(NAME_KEY, name)
  } catch {
    // Penyimpanan diblokir (mis. mode privat): nama cukup diketik ulang.
  }
}

/** Kolom komentar untuk halaman yang sedang dibuka (dikenali dari path-nya). Tidak tampil bila VITE_API_URL kosong. */
export function Comments({ className }: { className?: string }) {
  const { pathname } = useLocation()
  const pagePath = pathname.replace(/\/+$/, '') || '/'
  if (!commentsEnabled) return null
  // key: pindah halaman = kolom komentar baru, dengan formulir dan daftar yang bersih.
  return <CommentsSection key={pagePath} pagePath={pagePath} className={className} />
}

function CommentsSection({ pagePath, className }: { pagePath: string; className?: string }) {
  const id = useId()
  const { comments, status, errorMessage, hasMore, loadingMore, loadMore, addComment, removeComment, reload } =
    useComments(pagePath)

  const [name, setName] = useState(readSavedName)
  const [body, setBody] = useState('')
  const [website, setWebsite] = useState('')
  const [sending, setSending] = useState(false)
  const [formError, setFormError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [sent, setSent] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (sending) return
    setSending(true)
    setFormError('')
    setFieldErrors({})
    setSent(false)
    try {
      const comment = await postComment(pagePath, { name, body, website })
      // Bot yang mengisi kolom jebakan mendapat balasan kosong: jangan tampilkan.
      if (comment.body) addComment(comment)
      saveName(name.trim())
      setBody('')
      setSent(true)
    } catch (error) {
      if (error instanceof CommentsError) {
        setFormError(error.message)
        setFieldErrors(error.fields)
      } else {
        setFormError('Komentar belum bisa dikirim. Coba lagi sebentar lagi.')
      }
    } finally {
      setSending(false)
    }
  }

  const nameId = `${id}-nama`
  const bodyId = `${id}-komentar`
  const headingId = `${id}-judul`

  return (
    <section id="komentar" aria-labelledby={headingId} className={clsx('scroll-mt-6', className)}>
      <div className="border-t-4 border-ink pt-5">
        <h2 id={headingId} className="mb-6 text-[26px] leading-[1.15] md:text-[32px]">
          Komentar
        </h2>

        <form onSubmit={handleSubmit} noValidate className="mb-10 grid gap-5">
          <div>
            <label htmlFor={nameId} className="mb-2 block font-medium text-ink">
              Nama
            </label>
            <input
              id={nameId}
              name="nama"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              maxLength={NAME_MAX}
              autoComplete="name"
              required
              aria-invalid={fieldErrors.name ? true : undefined}
              aria-describedby={fieldErrors.name ? `${nameId}-galat` : undefined}
              className={clsx(FIELD, 'min-h-12')}
            />
            {fieldErrors.name ? (
              <p id={`${nameId}-galat`} className="mt-1.5 text-[15px] text-link">
                {fieldErrors.name}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor={bodyId} className="mb-2 block font-medium text-ink">
              Komentar
            </label>
            <textarea
              id={bodyId}
              name="komentar"
              value={body}
              onChange={(event) => setBody(event.target.value)}
              maxLength={BODY_MAX}
              rows={5}
              required
              aria-invalid={fieldErrors.body ? true : undefined}
              aria-describedby={fieldErrors.body ? `${bodyId}-galat` : `${bodyId}-hitung`}
              className={clsx(FIELD, 'min-h-32 resize-y py-3 leading-[1.5]')}
            />
            <div className="mt-1.5 flex justify-between gap-4 text-[15px]">
              {fieldErrors.body ? (
                <p id={`${bodyId}-galat`} className="text-link">
                  {fieldErrors.body}
                </p>
              ) : (
                <span />
              )}
              <span id={`${bodyId}-hitung`} className="shrink-0 text-muted">
                {body.length}/{BODY_MAX}
              </span>
            </div>
          </div>

          {/* Kolom jebakan: tak terlihat dan tak bisa difokuskan oleh manusia, tetapi sering diisi bot. */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label>
              Jangan diisi
              <input
                type="text"
                name="website"
                value={website}
                onChange={(event) => setWebsite(event.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Button type="submit" variant="primary" disabled={sending} className="disabled:cursor-wait disabled:opacity-70">
              {sending ? 'Mengirim…' : 'Kirim komentar'}
            </Button>
            <div role="status" aria-live="polite" className="text-[15px]">
              {formError ? <span className="text-link">{formError}</span> : null}
              {sent && !formError ? <span className="text-muted">Terima kasih, komentar Anda sudah terkirim.</span> : null}
            </div>
          </div>
        </form>

        {status === 'loading' ? (
          <p role="status" className="text-muted">
            Memuat komentar…
          </p>
        ) : null}

        {status === 'error' ? (
          <p role="alert" className="text-muted">
            {errorMessage}{' '}
            <button type="button" onClick={reload} className="link cursor-pointer">
              Coba lagi
            </button>
          </p>
        ) : null}

        {status === 'ready' && comments.length === 0 ? (
          <p className="text-muted">Belum ada komentar. Jadilah yang pertama.</p>
        ) : null}

        {comments.length > 0 ? (
          <ol className="border-b border-line">
            {comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} onDeleted={removeComment} />
            ))}
          </ol>
        ) : null}

        {hasMore ? (
          <div className="mt-6">
            <Button onClick={loadMore} disabled={loadingMore}>
              {loadingMore ? 'Memuat…' : 'Muat komentar lainnya'}
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  )
}
