import { unstable_cache } from 'next/cache'
import { NextResponse } from 'next/server'

import { getArticlesDataForSitemap } from '@/api/articles'
import { SITEMAP_CHUNK_SIZE } from '@/configs/sitemap.config'
import { EAppRoute } from '@/enums/app-route.enum'
import { createSitemapEntry } from '@/helpers/createSitemapEntry'
import { getTitleForLink } from '@/helpers/getTitleForLink'
import { TPagination } from '@/types/api.types'
import { createXmlUrlFromEntry, getXmlWrapper } from '@/utils/xml'

const CACHE_DURATION = 24 * 60 * 60 // 24 hours

export const GET = async (_: Request, { params }: { params: Promise<{ chunk: string }> }) => {
  const { chunk } = await params
  const page = +chunk.split('.')?.[0]
  if (!page) return new NextResponse('', { status: 404 })

  const cacheKey = `articles-sitemap-data-page-${page}`

  const getCachedArticlesData = unstable_cache(
    async (query: TPagination) => {
      try {
        const { data } = await getArticlesDataForSitemap(query)
        return data || []
      } catch (error) {
        console.error('Failed to fetch articles data for sitemap:', error)
        return []
      }
    },
    [cacheKey],
    {
      tags: [cacheKey],
      revalidate: CACHE_DURATION,
    },
  )

  try {
    const data = await getCachedArticlesData({ page, limit: SITEMAP_CHUNK_SIZE })
    if (!data.length) return new NextResponse('', { status: 404 })
    const sitemapUrls = data
      .map(({ id, title, publishedAt }) => {
        try {
          const lastModified = new Date(publishedAt)
          const path = `/${EAppRoute.VIEW_ARTICLE}/${id}/${getTitleForLink(title)}`
          const entry = createSitemapEntry(path, lastModified, 0.7, 'monthly')
          if (!entry) {
            return null
          }
          return createXmlUrlFromEntry(entry)
        } catch (error) {
          console.error(`Failed to create sitemap entry for game ${id}:`, error)
          return null
        }
      })
      .filter(Boolean)
      .join('')

    return new NextResponse(getXmlWrapper(sitemapUrls), {
      headers: {
        'Content-Type': 'application/xml',
      },
    })
  } catch (err) {
    console.log(err)
  }
  return new NextResponse('', { status: 500 })
}
