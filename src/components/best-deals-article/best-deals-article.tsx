import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { Box, Grid2, List, ListItem, Stack } from '@mui/material'
import Link from 'next/link'

import { EAppRoute } from '@/enums/app-route.enum'
import { getTitleForLink } from '@/helpers/getTitleForLink'
import { TArticle } from '@/types/articles.type'

import { ArticleAdminControls } from '../article-admin-controls'
import { SectionTitle } from '../section-title'
import { GlassCard } from '../ui/cards/glass-card'
import { TypographyV2 } from '../ui/typography'

type TProps = {
  article: TArticle
}

const getRatingColor = (rating: number) => {
  if (rating >= 9) {
    return 'green'
  }
  if (rating >= 8) {
    return 'green-dark'
  }
  if (rating >= 7) {
    return 'brand'
  }
  if (rating >= 6) {
    return 'orange'
  }
  if (rating >= 5) {
    return 'red'
  }
  return 'fire'
}

const BestDealsArticle = ({ article }: TProps) => {
  return (
    <Stack gap={{ xs: 3, md: 5 }}>
      {!article.published && (
        <TypographyV2
          fontSize="heading-s"
          fontWeight="bold"
          textAlign="center"
          padding={0.5}
          color="l1"
          sx={{ background: 'var(--color-brand)', width: '100%', letterSpacing: '10px' }}
        >
          UNPUBLISHED
        </TypographyV2>
      )}
      <GlassCard padding={2}>
        <Grid2
          container
          alignItems="center"
          justifyContent="space-between"
          gap={2}
          flexWrap="nowrap"
          flexDirection={{ xs: 'column-reverse', md: 'row' }}
        >
          <Box
            maxWidth={{ lg: '500px', md: '400px', xs: '100%' }}
            width="100%"
            sx={{ borderRadius: '20px', overflow: 'hidden' }}
          >
            {article.articleDesktopImage && (
              <img src={article.articleDesktopImage} width="100%" alt={article.title} />
            )}
          </Box>

          <TypographyV2
            component="h1"
            adaptiveFontSize={{ md: 'heading-l', xs: 'heading-s' }}
            fontWeight="semibold"
            textAlign="center"
          >
            {article.title}
          </TypographyV2>
        </Grid2>
      </GlassCard>

      <GlassCard padding={2} width="100%">
        <Stack width="100%" gap={2}>
          <SectionTitle title="Summary" />

          <TypographyV2 adaptiveFontSize={{ xs: 'text-base', md: 'text-l' }}>
            {article.articleDescription}
          </TypographyV2>
        </Stack>
      </GlassCard>

      <GlassCard padding={2} width="100%">
        <Stack gap={2} width="100%">
          <SectionTitle title="Content" />

          {article.website.games
            .sort((a, b) => b.persent - a.persent)
            .map((item, index) => {
              const gameLink = `/${EAppRoute.GAME}/${item.id}/${getTitleForLink(item.title)}`
              const normalDirection = index % 2 === 0
              return (
                <Grid2
                  container
                  gap={{ md: 3, xs: 1 }}
                  flexWrap="nowrap"
                  key={item.id}
                  flexDirection={{ sm: normalDirection ? 'row' : 'row-reverse', xs: 'column' }}
                  alignItems="center"
                  px={{ md: 1, xs: 0 }}
                  paddingBottom={{ md: 2, xs: 1 }}
                  borderBottom={
                    index !== article.website.games.length - 1 ? '1px solid var(--color-l3)' : ''
                  }
                >
                  <Box
                    maxWidth={{ md: '300px', sm: '180px', xs: '280px' }}
                    width="100%"
                    sx={{ borderRadius: '20px', overflow: 'hidden', aspectRatio: 1 }}
                  >
                    <Link href={gameLink}>
                      <img src={item.coverImageUrl} alt={item.title} width="100%" />
                    </Link>
                  </Box>

                  <Stack gap={{ md: 3, xs: 1 }} width="100%">
                    <Link href={gameLink}>
                      <TypographyV2
                        component="h2"
                        adaptiveFontSize={{ md: 'heading-m', xs: 'text-xl' }}
                        fontWeight="semibold"
                        textAlign="center"
                        width="100%"
                        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <span>
                          <span>{item.title}</span>
                          <TypographyV2
                            adaptiveFontSize={{ md: 'heading-s', sm: 'text-2xl', xs: 'text-l' }}
                            color="green"
                            fontWeight="bold"
                            component="span"
                            mx={{ md: 1, xs: 0.5 }}
                          >
                            -{item.persent}%
                          </TypographyV2>
                          <OpenInNewIcon
                            sx={{ transform: 'scale(0.8)', verticalAlign: 'middle' }}
                          />
                        </span>
                      </TypographyV2>
                    </Link>

                    <Grid2
                      container
                      gap={{ md: 2, xs: 1 }}
                      height="100%"
                      flexWrap="nowrap"
                      flexDirection={{ sm: normalDirection ? 'row-reverse' : 'row', xs: 'row' }}
                      alignItems="center"
                    >
                      <TypographyV2
                        sx={{
                          borderLeft: {
                            sm: normalDirection ? '1px solid var(--color-brand)' : 'none',
                            xs: 'none',
                          },
                          borderRight: {
                            sm: normalDirection ? 'none' : '1px solid var(--color-brand)',
                            xs: '1px solid var(--color-brand)',
                          },
                          paddingLeft: {
                            md: normalDirection ? 2 : 0,
                            sm: normalDirection ? 1 : 0,
                            xs: 0,
                          },
                          paddingRight: {
                            md: normalDirection ? 0 : 2,
                            sm: normalDirection ? 0 : 1,
                            xs: 1,
                          },
                        }}
                        adaptiveFontSize={{ md: 'text-base', xs: 'text-sm' }}
                      >
                        {item.description}
                      </TypographyV2>

                      <List disablePadding>
                        {Object.keys(item.ratings).map((key) => (
                          <ListItem key={key} sx={{ display: 'flex', gap: 1 }} disablePadding>
                            <TypographyV2
                              adaptiveFontSize={{ md: 'text-l', xs: 'text-sm' }}
                              fontWeight="semibold"
                              color="secondary"
                            >
                              {key}:
                            </TypographyV2>
                            <TypographyV2
                              adaptiveFontSize={{ md: 'text-2xl', xs: 'text-l' }}
                              fontWeight="bold"
                              color={getRatingColor(item.ratings[key])}
                            >
                              {item.ratings[key]}
                            </TypographyV2>
                          </ListItem>
                        ))}
                      </List>
                    </Grid2>
                  </Stack>
                </Grid2>
              )
            })}
        </Stack>
      </GlassCard>

      <ArticleAdminControls article={article} />
    </Stack>
  )
}

export { BestDealsArticle }
