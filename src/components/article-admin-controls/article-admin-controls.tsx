'use client'

import { useState } from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import EditNoteIcon from '@mui/icons-material/EditNote'
import { Button, Grid2, IconButton } from '@mui/material'

import { deleteArticle, publishArticle, unpublishArticle } from '@/api/articles'
import { EAppRoute } from '@/enums/app-route.enum'
import { getTitleForLink } from '@/helpers/getTitleForLink'
import { useCustomNavigate } from '@/hooks/useCustomNavigate'
import { useIsAdmin } from '@/hooks/useIsAdmin'
import { TArticle } from '@/types/articles.type'
import { CustomToast } from '@/utils/custom-toast'

type TProps = {
  article: TArticle
  withEdit?: boolean
}

const ArticleAdminControls = ({ article, withEdit }: TProps) => {
  const isAdmin = useIsAdmin()

  const [publishLoading, setPublishLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)

  const navigate = useCustomNavigate()

  if (!isAdmin) {
    return <></>
  }

  const togglePublishArticle = async () => {
    try {
      setPublishLoading(true)
      const { data } = await (article.published ? unpublishArticle : publishArticle)(article.id)

      const path = article.published
        ? `/${EAppRoute.EDIT_ARTICLE}/${data.id}`
        : `/${EAppRoute.VIEW_ARTICLE}/${data.id}/${getTitleForLink(data.title)}`

      navigate({
        path,
        replace: true,
      })
    } catch (err) {
      CustomToast('error', `Error publishing article: ${(err as any).message}`)
      setPublishLoading(false)
    }
  }

  const onDeleteArticle = async () => {
    try {
      setDeleteLoading(true)
      await deleteArticle(article.id)

      navigate({
        path: `/${EAppRoute.ARTICLES}/1`,
        replace: true,
      })
    } catch (err) {
      CustomToast('error', `Error deletting article: ${(err as any).message}`)
      setDeleteLoading(false)
    }
  }

  const onEdit = () => {
    navigate({
      path: `/${EAppRoute.EDIT_ARTICLE}/${article.id}`,
    })
  }

  const buttonsDisabled = publishLoading || deleteLoading

  return (
    <Grid2 container alignItems="center" justifyContent="flex-end" width="100%" gap={2}>
      <Button
        variant="contained"
        loading={publishLoading}
        onClick={togglePublishArticle}
        disabled={buttonsDisabled}
      >
        {article.published ? 'Hide' : 'Publish'} Article
      </Button>
      {!!withEdit && (
        <IconButton onClick={onEdit} disabled={buttonsDisabled}>
          <EditNoteIcon />
        </IconButton>
      )}
      <IconButton
        loading={deleteLoading}
        onClick={onDeleteArticle}
        color="error"
        disabled={buttonsDisabled}
      >
        <DeleteIcon />
      </IconButton>
    </Grid2>
  )
}

export { ArticleAdminControls }
