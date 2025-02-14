import moment from 'moment'
import { MetadataRoute } from 'next'

import { getGamesDataForSitemap } from '@/api/games'
import { EAppRoute } from '@/enums/app-route.enum'
import { getGameTitleForLink } from '@/helpers/getGameTitleForLink'

const SYNC_ONCE_IN_HOURS = 36

let gamesSitemap: MetadataRoute.Sitemap = []
let lastSynced = 0

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  if (!gamesSitemap.length || moment().diff(moment(lastSynced), 'hours') > SYNC_ONCE_IN_HOURS) {
    const { data } = await getGamesDataForSitemap()
    // Check if this works for Google. It can detect inccorrect date changes
    const lastModified = new Date()

    gamesSitemap = data.map(({ id, title }) => ({
      url: `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/${EAppRoute.GAME}/${id}/${getGameTitleForLink(title)}`,
      lastModified,
    }))
    lastSynced = moment().valueOf()
  }

  return [
    {
      url: `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/${EAppRoute.HOME}`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/${EAppRoute.ACTIVE_DISCOUNTS}/1`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/${EAppRoute.ABOUT_US}`,
    },
    ...gamesSitemap,
  ]
}

export default sitemap
