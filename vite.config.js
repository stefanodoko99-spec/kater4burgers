import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Canonical URL, og:url, og:image, the Restaurant JSON-LD, robots.txt and
// sitemap.xml all have to agree, and they all have to change together the day
// this project moves onto its own domain. Keep the origin here: index.html
// references it as %SITE_URL%, and robots/sitemap are generated from it.
const SITE_URL = 'https://kater4burgers.vercel.app'

function siteUrl() {
  return {
    name: 'site-url',
    transformIndexHtml(html) {
      return html.replaceAll('%SITE_URL%', SITE_URL)
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
      })
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`,
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), siteUrl()],
  build: {
    chunkSizeWarningLimit: 1100,
    rollupOptions: {
      output: {
        manualChunks: {
          gsap: ['gsap', '@gsap/react'],
        },
      },
    },
  },
})
