import { Grid2 } from '@mui/material'

import { TArticle } from '@/types/articles.type'

import { ArticleItem } from '../article-item'

type TProps = {
  articles: TArticle[]
  redirectToEdit?: boolean
}

const ArticlesList = ({ articles, redirectToEdit }: TProps) => {
  return (
    <Grid2
      width="100%"
      display="grid"
      gridTemplateColumns={{ md: 'repeat(3, 1fr)', sm: 'repeat(2, 1fr)', xs: '1fr' }}
      gap={2}
    >
      {articles.map((article) => (
        <ArticleItem key={article.id} article={article} redirectToEdit={redirectToEdit} />
      ))}
    </Grid2>
  )
}

export { ArticlesList }
