'use client'

import { useEffect, useState } from 'react'

import { LinearProgress } from '@mui/material'
import { useParams } from 'next/navigation'

import { getArticleById, updateArticle } from '@/api/articles'
import { ArticleAdminControls } from '@/components/article-admin-controls'
import { ArticleStatusBadge } from '@/components/article-status-badge'
import { BestDealsArticle } from '@/components/best-deals-article'
import { EditArticleForm } from '@/components/edit-article-form'
import { TArticleFormValues } from '@/components/edit-article-form/edit-article-form'
import { NoDataLabel } from '@/components/no-data-label'
import { Container } from '@/components/ui/container'
import { EAppRoute } from '@/enums/app-route.enum'
import { ERole } from '@/enums/roles.enum'
import { getTitleForLink } from '@/helpers/getTitleForLink'
import { isCustomGameArticle } from '@/helpers/isCustomGameArticle'
import { useCustomNavigate } from '@/hooks/useCustomNavigate'
import { TArticle, TWebsiteGeneralArticle } from '@/types/articles.type'
import { CustomToast } from '@/utils/custom-toast'
import { withRouteProtection } from '@/utils/with-route-protection'

const EditArticle = () => {
  const [article, setArticle] = useState<TArticle | null>(null)
  const [loading, setLoading] = useState(true)
  const [saveLoading, setSaveLoading] = useState(false)

  const { id } = useParams<{ id: string }>()
  const navigate = useCustomNavigate()

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

  const isGamesArticle = isCustomGameArticle(article)

  const onEdit = async (data: TArticleFormValues) => {
    try {
      setSaveLoading(true)
      const newArticle: TArticle<TWebsiteGeneralArticle> = JSON.parse(JSON.stringify(article))
      newArticle.title = data.title
      newArticle.website.html = data.content
      newArticle.articleDesktopImage = data.image || newArticle.articleDesktopImage
      const { data: response } = await updateArticle(newArticle.id, newArticle)
      navigate({
        path: `/${EAppRoute.VIEW_ARTICLE}/${response.id}/${getTitleForLink(response.title)}`,
      })
    } catch (err) {
      CustomToast('error', `Error updating article: ${(err as any).message}`)
      setSaveLoading(false)
    }
  }

  return (
    <Container paddingBottom={5} gap={3}>
      <ArticleStatusBadge article={article} />
      {isGamesArticle && <BestDealsArticle article={article as any} />}
      {!isGamesArticle && !!(article.website as any).html && (
        <EditArticleForm
          onSubmit={onEdit}
          submitBtnText="Edit Article"
          defaultValues={{
            content: (article.website as any).html,
            title: article.title,
            image: article.articleDesktopImage || '',
          }}
          disabled={saveLoading}
        />
      )}
      <ArticleAdminControls article={article} />
    </Container>
  )
}

export default withRouteProtection(EditArticle, [ERole.ADMIN])
