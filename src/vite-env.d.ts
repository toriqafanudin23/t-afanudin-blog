/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Alamat API komentar, mis. https://blog-komentar.vercel.app. Kosong = komentar dimatikan. */
  readonly VITE_API_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
