import { cache } from 'react'

import { Metadata } from 'next'

import { getArticleById } from '@/api/articles'
import { ArticlePreview } from '@/components/article-preview/article-preview'
import { NoDataLabel } from '@/components/no-data-label'
import { Container } from '@/components/ui/container'
import { EAppRoute } from '@/enums/app-route.enum'
import { getLocalesMeta } from '@/helpers/getLocalesMeta'
import { TArticle } from '@/types/articles.type'

type TProps = {
  params: Promise<{ id: string }>
}

const getArticleCached = cache(async (id: number) => {
  try {
    const { data } = await getArticleById(id)
    return data
  } catch (err) {
    console.log('Article fetch error', (err as any).message)
    return null
  }
})

export const generateMetadata = async ({ params }: TProps): Promise<Metadata> => {
  const { id } = await params
  const article = await getArticleCached(+id)

  if (!article) {
    return {}
  }

  const metadata: Metadata = {
    title: article.title || '',
    other: {
      robots: 'index, follow',
    },
    icons: {
      other: getLocalesMeta(`${EAppRoute.VIEW_ARTICLE}/${article}`),
    },
  }

  const keywords = [
    article.title,
    article.website.focusKeyphrases,
    ...article.website.keywords,
    ...article.social.hashtags.map((item) => item.replace('#', '')),
    'article',
    'post',
    'content',
    'read',
    'news',
    'game',
    'video games',
    'discount',
    'low',
    'price',
  ].filter(Boolean) as string[]

  if (keywords.length) {
    metadata.keywords = keywords
  }

  // Add image if the URL is svailable
  // if (article.articleDesktopImage) {
  //   metadata.openGraph = {
  //     images: [
  //       {
  //         url: article.articleDesktopImage,

  //       },
  //     ],
  //   }
  // }

  if (article.metaDescription) {
    metadata.description = article.metaDescription
  }

  return metadata
}

const ViewArticle = async ({ params }: TProps) => {
  const { id } = await params

  let article: TArticle | null = null

  try {
    article = await getArticleCached(+id)
  } catch (err) {
    console.log('Article fetch error', (err as any).message)
  }

  if (!article) {
    return <NoDataLabel />
  }

  return (
    <Container paddingBottom={5}>
      <ArticlePreview article={article} />
    </Container>
  )
}

export default ViewArticle
