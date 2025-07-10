import { NextResponse } from 'next/server'

import { EAppRoute } from '@/enums/app-route.enum'
import { createSitemapEntry } from '@/helpers/createSitemapEntry'
import { TSitemapEntry } from '@/types/sitemap.types'
import { createXmlUrlFromEntry, getXmlWrapper } from '@/utils/xml'

export const GET = async () => {
  const staticPages: TSitemapEntry[] = [
    createSitemapEntry(`/${EAppRoute.HOME}`, new Date(), 1, 'daily'),
    createSitemapEntry(`/${EAppRoute.ACTIVE_DISCOUNTS}/1`, new Date(), 0.9, 'daily'),
    createSitemapEntry(`/${EAppRoute.NEWEST_RELEASES}/1`, new Date(), 0.8, 'daily'),
    createSitemapEntry(`/${EAppRoute.ARTICLES}/1`, new Date(), 0.7, 'daily'),
    createSitemapEntry(`/${EAppRoute.HOTTEST_DEALS}/1`, new Date(), 0.6, 'daily'),
    createSitemapEntry(`/${EAppRoute.ALL_GAMES}/1`, new Date(), 0.5, 'daily'),
    createSitemapEntry(`/${EAppRoute.ABOUT_US}`, new Date(), 0.4, 'monthly'),
  ].filter(Boolean) as TSitemapEntry[]

  const sitemapUrls = staticPages.map((page) => createXmlUrlFromEntry(page)).join('')

  return new NextResponse(getXmlWrapper(sitemapUrls), {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
