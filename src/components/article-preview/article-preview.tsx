import { Stack } from '@mui/material'

import { isCustomGameArticle } from '@/helpers/isCustomGameArticle'
import { TArticle } from '@/types/articles.type'

import { ArticleAdminControls } from '../article-admin-controls'
import { ArticleStatusBadge } from '../article-status-badge'
import { BestDealsArticle } from '../best-deals-article'
import { CustomArticle } from '../custom-article'

type TProps = {
  article: TArticle
}

const ArticlePreview = ({ article }: TProps) => {
  const isGamesArticle = isCustomGameArticle(article)

  return (
    <Stack gap={{ xs: 3, md: 5 }}>
      <ArticleStatusBadge article={article} />

      {isGamesArticle && <BestDealsArticle article={article as any} />}
      {!isGamesArticle && (
        <CustomArticle
          content={(article.website as any).html}
          title={article.title}
          image={article.articleDesktopImage}
        />
      )}

      <ArticleAdminControls withEdit article={article} />
    </Stack>
  )
}

export { ArticlePreview }
