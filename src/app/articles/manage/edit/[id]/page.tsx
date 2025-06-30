'use client'

import { useEffect, useState } from 'react'

import { LinearProgress } from '@mui/material'
import { useParams } from 'next/navigation'

import { getArticleById } from '@/api/articles'
import { BestDealsArticle } from '@/components/best-deals-article'
import { NoDataLabel } from '@/components/no-data-label'
import { Container } from '@/components/ui/container'
import { ERole } from '@/enums/roles.enum'
import { TArticle } from '@/types/articles.type'
import { CustomToast } from '@/utils/custom-toast'
import { withRouteProtection } from '@/utils/with-route-protection'

const EditArticle = () => {
  const [article, setArticle] = useState<TArticle | null>(null)
  const [loading, setLoading] = useState(true)

  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const { data } = await getArticleById(+id)
        setArticle(data)
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

  if (!article) {
    return <NoDataLabel />
  }

  return (
    <Container paddingBottom={5} gap={3}>
      <BestDealsArticle article={article} />
    </Container>
  )
}

export default withRouteProtection(EditArticle, [ERole.ADMIN])
