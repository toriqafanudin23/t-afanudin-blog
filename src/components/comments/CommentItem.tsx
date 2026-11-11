import { useId, useRef, useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { CommentsError, deleteComment, type Comment } from '@/lib/commentsApi'
import { formatCommentTime } from '@/lib/format'

interface CommentItemProps {
  comment: Comment
  onDeleted: (id: string) => void
}

/** Satu komentar. Menghapus butuh sandi admin yang dicek di server; tanpa login. */
export function CommentItem({ comment, onDeleted }: CommentItemProps) {
  const id = useId()
  const triggerRef = useRef<HTMLButtonElement>(null)
  const [confirming, setConfirming] = useState(false)
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  function close() {
    setConfirming(false)
    setPassword('')
    setError('')
    // Fokus kembali ke tombol "Hapus" supaya pengguna keyboard tidak kehilangan posisi.
    requestAnimationFrame(() => triggerRef.current?.focus())
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (busy) return
    setBusy(true)
    setError('')
    try {
      await deleteComment(comment.id, password)
      onDeleted(comment.id)
    } catch (caught) {
      setError(caught instanceof CommentsError ? caught.message : 'Komentar belum bisa dihapus. Coba lagi sebentar lagi.')
      // Komentar yang sudah tidak ada di server cukup dibuang dari daftar.
      if (caught instanceof CommentsError && caught.status === 404) onDeleted(comment.id)
      setBusy(false)
    }
  }

  const passwordId = `${id}-sandi`
  const errorId = `${id}-galat`

  return (
    <li className="border-t border-line py-5">
      <div className="flex items-baseline justify-between gap-4">
        <p className="flex flex-wrap items-baseline gap-x-3">
          <strong className="font-medium text-ink">{comment.name}</strong>
          <time dateTime={comment.createdAt} className="text-[15px] text-muted">
            {formatCommentTime(comment.createdAt)}
          </time>
        </p>
        {confirming ? null : (
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setConfirming(true)}
            aria-label={`Hapus komentar dari ${comment.name}`}
            className="link shrink-0 cursor-pointer text-[15px]"
          >
            Hapus
          </button>
        )}
      </div>
      <p className="mt-2 text-[17px] leading-[1.56] break-words whitespace-pre-line">{comment.body}</p>

      {confirming ? (
        <form onSubmit={handleSubmit} className="mt-4 border-2 border-ink p-4">
          <label htmlFor={passwordId} className="mb-2 block font-medium text-ink">
            Sandi untuk menghapus komentar ini
          </label>
          <input
            id={passwordId}
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="off"
            autoFocus
            required
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
            className="min-h-12 w-full border-2 border-ink bg-white px-3.5 font-sans text-base text-ink transition-colors hover:border-brand focus:border-brand aria-[invalid=true]:border-link"
          />
          <div role="alert" id={errorId} className="mt-1.5 text-[15px] text-link">
            {error}
          </div>
          <div className="mt-3 flex flex-wrap gap-3">
            <Button type="submit" variant="primary" disabled={busy || password.length === 0} className="disabled:cursor-not-allowed disabled:opacity-70">
              {busy ? 'Menghapus…' : 'Hapus komentar'}
            </Button>
            <Button onClick={close} disabled={busy}>
              Batal
            </Button>
          </div>
        </form>
      ) : null}
    </li>
  )
}
