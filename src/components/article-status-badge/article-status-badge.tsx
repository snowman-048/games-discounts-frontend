'use client'

import { useIsAdmin } from '@/hooks/useIsAdmin'
import { TArticle } from '@/types/articles.type'

import { TypographyV2 } from '../ui/typography'

type TProps = {
  article: TArticle
}

const ArticleStatusBadge = ({ article }: TProps) => {
  const isAdmin = useIsAdmin()

  if (!isAdmin || article.published) {
    return null
  }

  return (
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
  )
}

export { ArticleStatusBadge }
