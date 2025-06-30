'use client'

import { useEffect, useState } from 'react'

import { Box, Button, Grid2, LinearProgress, Stack } from '@mui/material'
import { useParams } from 'next/navigation'

import { generateArticle, getUnpublishedArticles } from '@/api/articles'
import { ArticlesList } from '@/components/articles-list'
import { NoDataLabel } from '@/components/no-data-label'
import { Pagination } from '@/components/pagination'
import { StoreIcon } from '@/components/store-icon'
import { Container } from '@/components/ui/container'
import { Loader } from '@/components/ui/loader'
import { Modal } from '@/components/ui/modal'
import { TypographyV2 } from '@/components/ui/typography'
import { EAppRoute } from '@/enums/app-route.enum'
import { ERole } from '@/enums/roles.enum'
import { EStore } from '@/enums/store.enum'
import { useCustomNavigate } from '@/hooks/useCustomNavigate'
import { TArticle } from '@/types/articles.type'
import { CustomToast } from '@/utils/custom-toast'
import { withRouteProtection } from '@/utils/with-route-protection'

const LIST_SIZE = 9

const ManageArticlesPage = () => {
  const [articles, setArticles] = useState<TArticle[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [generateModalOpen, setGenerateModalOpen] = useState(false)
  const [generateLoading, setGenerateLoading] = useState(false)

  const { page } = useParams<{ page: string }>()
  const navigate = useCustomNavigate()

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const { data } = await getUnpublishedArticles({
          page: +page,
          limit: LIST_SIZE,
          sortField: 'published',
          sortDirection: 'desc',
        })
        setArticles(data.data)
        setTotalCount(data.total)
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

  const onGenerateArticle = async (store: EStore) => {
    try {
      setGenerateLoading(true)
      const { data } = await generateArticle(store)
      navigate({ path: `/${EAppRoute.EDIT_ARTICLE}/${data.id}`, replace: true })
    } catch (err) {
      CustomToast('error', `Error generating article: ${(err as any).message}`)
      setGenerateLoading(false)
    }
  }

  return (
    <>
      <Container gap={2}>
        <Grid2 container alignItems="center" gap={2}>
          <TypographyV2 fontSize="heading-m" fontWeight="bold" component="h1">
            Manage Articles
          </TypographyV2>

          <Button variant="contained" onClick={() => setGenerateModalOpen(true)}>
            Generate Article
          </Button>
        </Grid2>

        {!articles.length && <NoDataLabel />}

        {!!articles.length && (
          <Stack gap={5} alignItems="center" justifyContent="space-between">
            <ArticlesList articles={articles} redirectToEdit />
            <Pagination
              count={Math.ceil(totalCount / LIST_SIZE)}
              page={+page}
              path={EAppRoute.MANAGE_ARTICLES}
            />
          </Stack>
        )}
      </Container>

      <Modal
        open={generateModalOpen}
        onClose={() => setGenerateModalOpen(false)}
        title="Generate Article"
      >
        <>
          {generateLoading && (
            <Grid2 container justifyContent="center">
              <Loader />
            </Grid2>
          )}
          {!generateLoading && (
            <Stack gap={2} width="100%">
              {Object.values(EStore).map((store) => (
                <Box
                  key={store}
                  onClick={() => onGenerateArticle(store)}
                  width="100%"
                  sx={{ cursor: 'pointer' }}
                >
                  <StoreIcon store={store} />
                </Box>
              ))}
            </Stack>
          )}
        </>
      </Modal>
    </>
  )
}

export default withRouteProtection(ManageArticlesPage, [ERole.ADMIN])
