import { MetadataRoute } from 'next'

import { EAppRoute } from '@/enums/app-route.enum'

const robots = (): MetadataRoute.Robots => {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [`/${EAppRoute.PROFILE}`, `/${EAppRoute.WISHLISTS}`],
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/sitemap.xml`,
  }
}

export default robots
