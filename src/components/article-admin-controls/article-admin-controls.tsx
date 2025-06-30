'use client'

import { useState } from 'react'

import { Button, Grid2 } from '@mui/material'

import { publishArticle, unpublishArticle } from '@/api/articles'
import { EAppRoute } from '@/enums/app-route.enum'
import { useCustomNavigate } from '@/hooks/useCustomNavigate'
import { useIsAdmin } from '@/hooks/useIsAdmin'
import { TArticle } from '@/types/articles.type'
import { CustomToast } from '@/utils/custom-toast'

type TProps = {
  article: TArticle
}

const ArticleAdminControls = ({ article }: TProps) => {
  const isAdmin = useIsAdmin()

  const [publishLoading, setPublishLoading] = useState(false)

  const navigate = useCustomNavigate()

  if (!isAdmin) {
    return <></>
  }

  const togglePublishArticle = async () => {
    try {
      setPublishLoading(true)
      const { data } = await (article.published ? unpublishArticle : publishArticle)(article.id)
      navigate({
        path: `/${article.published ? EAppRoute.EDIT_ARTICLE : EAppRoute.VIEW_ARTICLE}/${data.id}`,
        replace: true,
      })
    } catch (err) {
      CustomToast('error', `Error publishing article: ${(err as any).message}`)
      setPublishLoading(false)
    }
  }

  return (
    <Grid2 container alignItems="center" justifyContent="flex-end" width="100%">
      <Button variant="contained" loading={publishLoading} onClick={togglePublishArticle}>
        {article.published ? 'Hide' : 'Publish'} Article
      </Button>
    </Grid2>
  )
}

export { ArticleAdminControls }
