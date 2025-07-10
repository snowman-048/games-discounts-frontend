import { TSitemapEntry } from '@/types/sitemap.types'

const getXmlWrapper = (data: string) => `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${data}
  </urlset>
`

const createXmlUrlFromEntry = (entry: TSitemapEntry) => `
  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastModified?.toISOString()}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>>${entry.priority}</priority>
  </url>
`

export { getXmlWrapper, createXmlUrlFromEntry }
