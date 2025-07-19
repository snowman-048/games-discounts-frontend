import { NextResponse } from 'next/server'

import { getArticlesCount } from '@/api/articles'
import { getGamesCount } from '@/api/games'
import { SITEMAP_CHUNK_SIZE } from '@/configs/sitemap.config'

export const GET = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_DOMAIN

  const [{ data: gamesCount }, { data: articlesCount }] = await Promise.all([
    getGamesCount(),
    getArticlesCount(),
  ])

  const numberOfGameChunks = Math.ceil(gamesCount / SITEMAP_CHUNK_SIZE)
  const numberOfArticleChunks = Math.ceil(articlesCount / SITEMAP_CHUNK_SIZE)

  const gamesSitemapUrls = Array.from(
    { length: numberOfGameChunks },
    (_, i) => `<sitemap><loc>${baseUrl}/sitemap/games/${i + 1}.xml</loc></sitemap>`,
  ).join('')

  const articlesSitemapUrls = Array.from(
    { length: numberOfArticleChunks },
    (_, i) => `<sitemap><loc>${baseUrl}/sitemap/articles/${i + 1}.xml</loc></sitemap>`,
  ).join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <sitemap><loc>${baseUrl}/sitemap/general.xml</loc></sitemap>
      ${gamesSitemapUrls}
      ${articlesSitemapUrls}
    </sitemapindex>
  `

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
