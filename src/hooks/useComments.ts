import { useCallback, useEffect, useState } from 'react'
import { CommentsError, fetchComments, type Comment } from '@/lib/commentsApi'

type Status = 'loading' | 'ready' | 'error'

/** Memuat komentar satu halaman, dengan "muat lagi" per halaman data dan penambahan komentar baru di depan. */
export function useComments(pagePath: string) {
  const [comments, setComments] = useState<Comment[]>([])
  const [nextCursor, setNextCursor] = useState<string | null>(null)
  const [status, setStatus] = useState<Status>('loading')
  const [errorMessage, setErrorMessage] = useState('')
  const [loadingMore, setLoadingMore] = useState(false)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    setStatus('loading')
    setComments([])
    setNextCursor(null)

    fetchComments(pagePath, null, controller.signal)
      .then((page) => {
        setComments(page.comments)
        setNextCursor(page.nextCursor)
        setStatus('ready')
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        setErrorMessage(error instanceof CommentsError ? error.message : 'Komentar belum bisa dimuat.')
        setStatus('error')
      })

    return () => controller.abort()
  }, [pagePath, reloadKey])

  const loadMore = useCallback(async () => {
    if (!nextCursor || loadingMore) return
    setLoadingMore(true)
    try {
      const page = await fetchComments(pagePath, nextCursor)
      setComments((current) => [...current, ...page.comments])
      setNextCursor(page.nextCursor)
    } catch (error) {
      setErrorMessage(error instanceof CommentsError ? error.message : 'Komentar belum bisa dimuat.')
    } finally {
      setLoadingMore(false)
    }
  }, [pagePath, nextCursor, loadingMore])

  const addComment = useCallback((comment: Comment) => {
    setComments((current) => [comment, ...current])
  }, [])

  const removeComment = useCallback((id: string) => {
    setComments((current) => current.filter((comment) => comment.id !== id))
  }, [])

  const reload = useCallback(() => setReloadKey((key) => key + 1), [])

  return { comments, status, errorMessage, hasMore: nextCursor !== null, loadingMore, loadMore, addComment, removeComment, reload }
}
