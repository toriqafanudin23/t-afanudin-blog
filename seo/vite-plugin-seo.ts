import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import type { Plugin } from 'vite'
import { buildPages, renderPage, resolveSiteUrl, robotsTxt, sitemapXml } from './seo.ts'

/**
 * Setelah build: tulis versi HTML tiap halaman (judul, deskripsi, canonical, Open Graph, JSON-LD) ke
 * dist/<rute>/index.html, plus sitemap.xml dan robots.txt. Vercel menyajikan file statis lebih dulu
 * daripada rewrite ke index.html, jadi crawler langsung menerima tag yang benar tanpa menjalankan JS.
 */
export function seoPlugin(): Plugin {
  let outDir = 'dist'
  return {
    name: 'seo-prerender',
    apply: 'build',
    configResolved(config) {
      outDir = join(config.root, config.build.outDir)
    },
    closeBundle() {
      const siteUrl = resolveSiteUrl(process.env)
      if (!siteUrl) {
        console.warn(
          '\n[seo] SITE_URL belum diatur: canonical, og:image, dan sitemap.xml dilewati. ' +
            'Setel SITE_URL=https://domain-anda saat build.\n',
        )
      }
      const template = readFileSync(join(outDir, 'index.html'), 'utf8')
      const pages = buildPages()
      for (const page of pages) {
        const file = join(outDir, page.path === '/' ? 'index.html' : `${page.path}/index.html`)
        mkdirSync(dirname(file), { recursive: true })
        writeFileSync(file, renderPage(template, page, siteUrl))
      }
      writeFileSync(join(outDir, 'robots.txt'), robotsTxt(siteUrl))
      if (siteUrl) writeFileSync(join(outDir, 'sitemap.xml'), sitemapXml(pages, siteUrl))
    },
  }
}
