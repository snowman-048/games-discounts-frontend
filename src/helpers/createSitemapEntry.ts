import { TSitemapEntry } from '@/types/sitemap.types'

import { isValidUrl } from './isValidUrl'

const createSitemapEntry = (
  path: string,
  lastModified?: Date,
  priority: number = 0.5,
  changeFrequency: TSitemapEntry['changeFrequency'] = 'weekly',
): TSitemapEntry | null => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_DOMAIN

  if (!baseUrl) {
    console.error('NEXT_PUBLIC_SITE_DOMAIN environment variable is not set')
    return null
  }

  const url = `${baseUrl}${path}`

  if (!isValidUrl(url)) {
    console.error(`Invalid URL generated: ${url}`)
    return null
  }

  return {
    url,
    lastModified: lastModified || new Date(),
    changeFrequency,
    priority,
  }
}

export { createSitemapEntry }
