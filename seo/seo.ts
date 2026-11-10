import { PAGE_SLUGS, posts } from '../src/data/posts.ts'
import { SITE } from '../src/data/site.ts'

export interface SeoPage {
  /** Path rute, mis. "/" atau "/tulisan/slug". */
  path: string
  title: string
  description: string
  type: 'website' | 'article'
  /** Tanggal terbit ISO (hanya artikel). */
  date?: string
  tags?: readonly string[]
}

const esc = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** Hindari "</script>" di dalam JSON-LD. */
const jsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c')

export function buildPages(): SeoPage[] {
  const home: SeoPage = {
    path: '/',
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    type: 'website',
  }
  const articles = posts
    .filter((post) => PAGE_SLUGS.includes(post.slug))
    .map<SeoPage>((post) => ({
      path: `/tulisan/${post.slug}`,
      title: `${post.title} — ${SITE.name}`,
      description: post.excerpt ?? SITE.description,
      type: 'article',
      date: post.date,
      tags: post.tags,
    }))
  return [home, ...articles]
}

/** Isi <head> khusus satu halaman. `siteUrl` tanpa garis miring di akhir; kosong = tanpa URL absolut. */
export function headTags(page: SeoPage, siteUrl: string | null): string {
  const url = siteUrl ? siteUrl + (page.path === '/' ? '/' : page.path) : null
  const image = siteUrl ? `${siteUrl}/og-image.png` : null
  const t: string[] = [
    `<meta name="description" content="${esc(page.description)}" />`,
    `<meta name="author" content="${esc(SITE.author)}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large" />`,
    `<meta property="og:site_name" content="${esc(SITE.name)}" />`,
    `<meta property="og:locale" content="id_ID" />`,
    `<meta property="og:type" content="${page.type}" />`,
    `<meta property="og:title" content="${esc(page.title)}" />`,
    `<meta property="og:description" content="${esc(page.description)}" />`,
    `<meta name="twitter:card" content="${image ? 'summary_large_image' : 'summary'}" />`,
    `<meta name="twitter:title" content="${esc(page.title)}" />`,
    `<meta name="twitter:description" content="${esc(page.description)}" />`,
  ]
  if (url) {
    t.push(`<link rel="canonical" href="${url}" />`, `<meta property="og:url" content="${url}" />`)
  }
  if (image) {
    t.push(
      `<meta property="og:image" content="${image}" />`,
      `<meta property="og:image:width" content="1200" />`,
      `<meta property="og:image:height" content="630" />`,
      `<meta property="og:image:alt" content="${esc(SITE.name)} — ${esc(SITE.tagline)}" />`,
      `<meta name="twitter:image" content="${image}" />`,
    )
  }
  if (page.type === 'article') {
    if (page.date) t.push(`<meta property="article:published_time" content="${page.date}" />`)
    page.tags?.forEach((tag) => t.push(`<meta property="article:tag" content="${esc(tag)}" />`))
  }

  const author = { '@type': 'Person', name: SITE.author }
  const graph =
    page.type === 'article'
      ? {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: page.title.replace(` — ${SITE.name}`, ''),
          description: page.description,
          inLanguage: 'id-ID',
          author,
          ...(page.date ? { datePublished: page.date } : {}),
          ...(url ? { mainEntityOfPage: url } : {}),
          ...(image ? { image } : {}),
          ...(page.tags?.length ? { keywords: page.tags.join(', ') } : {}),
          publisher: { '@type': 'Person', name: SITE.author },
        }
      : {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: SITE.name,
          description: SITE.description,
          inLanguage: 'id-ID',
          author,
          ...(url
            ? {
                url,
                potentialAction: {
                  '@type': 'SearchAction',
                  target: { '@type': 'EntryPoint', urlTemplate: `${siteUrl}/?q={search_term_string}` },
                  'query-input': 'required name=search_term_string',
                },
              }
            : {}),
        }
  t.push(`<script type="application/ld+json">${jsonLd(graph)}</script>`)
  return t.map((line) => `    ${line}`).join('\n')
}

/** Sisipkan tag SEO ke index.html hasil build: ganti <title>/<meta description> bawaan, lalu tambah sisanya. */
export function renderPage(template: string, page: SeoPage, siteUrl: string | null): string {
  let html = template
    .replace(/\s*<title>[\s\S]*?<\/title>/i, '')
    .replace(/\s*<meta\s+name="description"[^>]*>/i, '')
  html = html.replace('</head>', `\n    <title>${esc(page.title)}</title>\n${headTags(page, siteUrl)}\n  </head>`)
  // Isi cadangan untuk crawler/pengguna tanpa JavaScript; React menggantinya saat aplikasi dimuat.
  const fallback = `<noscript><h1>${esc(page.title)}</h1><p>${esc(page.description)}</p></noscript>`
  return html.replace('<div id="root"></div>', `<div id="root"></div>\n    ${fallback}`)
}

export function sitemapXml(pages: SeoPage[], siteUrl: string): string {
  const items = pages
    .map((page) => {
      const loc = siteUrl + (page.path === '/' ? '/' : page.path)
      const lastmod = page.date && page.date.length === 10 ? `<lastmod>${page.date}</lastmod>` : ''
      return `  <url><loc>${loc}</loc>${lastmod}</url>`
    })
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</urlset>\n`
}

export function robotsTxt(siteUrl: string | null): string {
  return `User-agent: *\nAllow: /\n${siteUrl ? `\nSitemap: ${siteUrl}/sitemap.xml\n` : ''}`
}

/** Ambil URL situs dari SITE_URL, atau domain produksi Vercel; null bila tidak ada. */
export function resolveSiteUrl(env: Record<string, string | undefined>): string | null {
  const raw = env.SITE_URL || (env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}` : '')
  return raw ? raw.replace(/\/+$/, '') : null
}
