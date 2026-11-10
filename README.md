# T Afanudin's Blog

Blog matematika dengan tampilan mengikuti blog referensi: header logo + nama blog, garis hitam tebal,
kartu tulisan tiga kolom yang berubah menjadi oranye cerah saat di-hover. **Tanpa navbar.**
Rumus ditulis dengan **KaTeX**.

Stack: React 19 + TypeScript + Tailwind CSS v4 + Vite, React Router 7, clsx, KaTeX.

## Menjalankan

```bash
npm install
npm run dev        # http://localhost:5173
npm run build
```

## Rumus (KaTeX)

`src/components/ui/Tex.tsx`:

- `<Tex tex="f(x) = ax^2 + bx + c" />` — rumus di dalam kalimat
- `<TexBlock tex={String.raw`\begin{aligned} ... \end{aligned}`} />` — rumus terpisah (tengah, bisa digulir)

Hasil render di-cache per rumus, MathML tersembunyi disertakan untuk pembaca layar, dan KaTeX hanya
dimuat bersama halaman tulisan (lazy), bukan di beranda.

## Token desain (`src/index.css`)

| Token | Nilai | Dipakai untuk |
|---|---|---|
| `brand` | `#ff4d00` | latar kartu saat hover, tombol, slider |
| `link` | `#db3a00` | tag & tautan di atas putih (kontras ≥ 4,5:1) |
| `ink` | `#000` | judul, garis tebal |
| `body` / `muted` | `#4a4a4a` / `#5a5a5a` | teks isi / ringkasan |

Font: Rubik (isi, nama blog) dan Libre Baskerville (judul, tagline) lewat Google Fonts di `index.html`.

Nama blog dan tagline ada di `src/data/site.ts`.

## SEO

Setiap `npm run build` menjalankan `seo/vite-plugin-seo.ts`, yang menulis ulang HTML tiap halaman
(`dist/<rute>/index.html`) dengan judul, deskripsi, canonical, Open Graph/Twitter Card, dan JSON-LD
(`WebSite` di beranda, `BlogPosting` di tulisan), lalu membuat `sitemap.xml` dan `robots.txt`.

- **Setel `SITE_URL`** (mis. `https://blogku.vercel.app`) di Vercel → Settings → Environment Variables.
  Tanpa itu (dan tanpa `VERCEL_PROJECT_PRODUCTION_URL`), canonical, `og:image`, dan sitemap dilewati.
- Tulisan baru: isi `title`, `excerpt` (jadi deskripsi), `tags`, dan `date` di `src/data/posts.ts`, lalu
  tambahkan slug-nya ke `PAGE_SLUGS` supaya masuk sitemap.
- Gambar pratinjau tautan: `public/og-image.png` (1200×630).
- Setelah deploy, kirim `https://domain-anda/sitemap.xml` di Google Search Console.
