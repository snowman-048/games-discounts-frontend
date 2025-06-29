'use client'

import { useEffect, useState } from 'react'

import { LinearProgress } from '@mui/material'
import { useParams } from 'next/navigation'

import { getArticles } from '@/api/articles'
import { ArticlesList } from '@/components/articles-list'
import { NoDataLabel } from '@/components/no-data-label'
import { Container } from '@/components/ui/container'
import { TypographyV2 } from '@/components/ui/typography'
import { ERole } from '@/enums/roles.enum'
import { TArticle } from '@/types/articles.type'
import { CustomToast } from '@/utils/custom-toast'
import { withRouteProtection } from '@/utils/with-route-protection'

const LIST_SIZE = 10

const ManageArticlesPage = () => {
  const [articles, setArticles] = useState<TArticle[]>([])
  const [loading, setLoading] = useState(true)

  const { page } = useParams<{ page: string }>()

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const { data } = await getArticles({
          page: +page,
          limit: LIST_SIZE,
          sortField: 'published',
          sortDirection: 'desc',
        })
        setArticles(data)
        console.log('data', data)
      } catch (err) {
        CustomToast('error', `Error loading articles: ${(err as any).message}`)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  if (loading) {
    return <LinearProgress />
  }

  if (!articles.length) {
    return <NoDataLabel />
  }

  return (
    <Container gap={2}>
      <TypographyV2 fontSize="heading-m" fontWeight="bold" component="h1">
        Manage Articles
      </TypographyV2>

      <ArticlesList articles={articles} redirectToEdit />
    </Container>
  )
}

export default withRouteProtection(ManageArticlesPage, [ERole.ADMIN])
