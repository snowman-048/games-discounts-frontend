import { MetadataRoute } from 'next'

import { EAppRoute } from '@/enums/app-route.enum'

const robots = (): MetadataRoute.Robots => {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          `/${EAppRoute.PROFILE}`,
          `/${EAppRoute.WISHLISTS}`,
          `/${EAppRoute.PENDING_CONNECTIONS}`,
          `/${EAppRoute.RESOLVE_PENDING_CONNECTION}`,
          `/${EAppRoute.EDIT_GAME}`,
          `/${EAppRoute.MANAGE_ARTICLES}`,
          `/${EAppRoute.EDIT_ARTICLE}`,
        ],
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/sitemap.xml`,
  }
}

export default robots
