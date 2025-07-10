import { NextResponse } from 'next/server'

import { getGamesCount } from '@/api/games'
import { SITEMAP_CHUNK_SIZE } from '@/configs/sitemap.config'

export const GET = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_DOMAIN

  const { data: gamesCount } = await getGamesCount()

  const numberOfChunks = Math.ceil(gamesCount / SITEMAP_CHUNK_SIZE)

  const gamesSitemapUrls = Array.from(
    { length: numberOfChunks },
    (_, i) => `<sitemap><loc>${baseUrl}/sitemap/games/${i + 1}.xml</loc></sitemap>`,
  ).join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <sitemap><loc>${baseUrl}/sitemap/general.xml</loc></sitemap>
      ${gamesSitemapUrls}
    </sitemapindex>
  `

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
