export interface Comment {
  id: string
  name: string
  body: string
  createdAt: string
}

export interface CommentsPage {
  comments: Comment[]
  nextCursor: string | null
}

export interface NewComment {
  name: string
  body: string
  /** Kolom jebakan untuk bot: harus selalu kosong dari pengunjung sungguhan. */
  website: string
}

/** Alamat API komentar (tanpa garis miring di akhir). Kosong = fitur komentar dimatikan. */
const API_URL = (import.meta.env.VITE_API_URL ?? '').replace(/\/+$/, '')

export const commentsEnabled = API_URL !== ''

export class CommentsError extends Error {
  readonly fields: Record<string, string>
  readonly status: number

  constructor(message: string, fields: Record<string, string> = {}, status = 0) {
    super(message)
    this.name = 'CommentsError'
    this.fields = fields
    this.status = status
  }
}

const NETWORK_MESSAGE = 'Tidak bisa terhubung ke server. Periksa koneksi Anda lalu coba lagi.'
const GENERIC_MESSAGE = 'Terjadi kesalahan. Coba lagi sebentar lagi.'

function toError(data: unknown, status: number): CommentsError {
  const error = typeof data === 'object' && data !== null && 'error' in data ? data.error : null
  if (typeof error !== 'object' || error === null) return new CommentsError(GENERIC_MESSAGE, {}, status)

  const message = 'message' in error && typeof error.message === 'string' ? error.message : GENERIC_MESSAGE
  const fields: Record<string, string> = {}
  if ('fields' in error && typeof error.fields === 'object' && error.fields !== null) {
    for (const [key, value] of Object.entries(error.fields)) {
      if (typeof value === 'string') fields[key] = value
    }
  }
  return new CommentsError(message, fields, status)
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response
  try {
    response = await fetch(`${API_URL}${path}`, init)
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') throw error
    throw new CommentsError(NETWORK_MESSAGE)
  }
  const data: unknown = await response.json().catch(() => null)
  if (!response.ok) throw toError(data, response.status)
  return data as T
}

export function fetchComments(page: string, before: string | null, signal?: AbortSignal): Promise<CommentsPage> {
  const params = new URLSearchParams({ page })
  if (before) params.set('before', before)
  return request<CommentsPage>(`/api/comments?${params}`, { signal })
}

export async function postComment(page: string, input: NewComment): Promise<Comment> {
  const { comment } = await request<{ comment: Comment }>('/api/comments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ page, ...input }),
  })
  return comment
}

/** Hapus komentar. Sandi dikirim sekali dan tidak disimpan di mana pun di browser. */
export async function deleteComment(id: string, password: string): Promise<void> {
  await request<{ ok: boolean }>(`/api/comments/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  })
}
