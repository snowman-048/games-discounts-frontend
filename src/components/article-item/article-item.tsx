import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { Grid2, Stack } from '@mui/material'
import moment from 'moment'
import Link from 'next/link'

import { DEFAULT_DATE_FORMATTING } from '@/configs/date.config'
import { EAppRoute } from '@/enums/app-route.enum'
import { getTitleForLink } from '@/helpers/getTitleForLink'
import { TArticle } from '@/types/articles.type'

import { GlassCard } from '../ui/cards/glass-card'
import { TypographyV2 } from '../ui/typography'
import { ArticleItemDivider } from './libs/article-item-divider'

type TProps = {
  article: TArticle
  redirectToEdit?: boolean
}

const ArticleItem = ({ article, redirectToEdit }: TProps) => {
  const href = redirectToEdit
    ? `/${EAppRoute.EDIT_ARTICLE}/${article.id}`
    : `/${EAppRoute.VIEW_ARTICLE}/${article.id}/${getTitleForLink(article.title)}`
  return (
    <GlassCard>
      <Link href={href} style={{ maxWidth: '100%', width: '100%' }}>
        <Stack maxWidth="100%" overflow="hidden">
          {!!article.articleDesktopImage && (
            <>
              <img src={article.articleDesktopImage} alt={article.title} width="100%" />
              <ArticleItemDivider />
            </>
          )}

          <Stack padding={2} gap={2}>
            <TypographyV2 fontWeight="semibold" fontSize="text-xl" textAlign="center">
              {article.title}
            </TypographyV2>
            <TypographyV2
              color="secondary"
              maxHeight="100px"
              sx={{
                overflow: 'hidden',
                '-webkit-line-clamp': '3',
                display: '-webkit-box',
                '-webkit-box-orient': 'vertical',
              }}
            >
              {article.articleDescription}
            </TypographyV2>

            <TypographyV2
              color="inactive"
              fontSize="text-s"
              maxWidth="100%"
              sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
            >
              {article.social.hashtags.join(' ')}
            </TypographyV2>

            <ArticleItemDivider />

            <Grid2 container alignItems="center" justifyContent="space-between" my={-1}>
              <TypographyV2 color="disabled" fontSize="text-s">
                {moment(article.publishedAt || article.createdAt).format(DEFAULT_DATE_FORMATTING)}
              </TypographyV2>
              <OpenInNewIcon />
            </Grid2>
          </Stack>
        </Stack>
      </Link>
    </GlassCard>
  )
}

export { ArticleItem }
