'use client'

import { useEffect, useRef, useState } from 'react'
import * as React from 'react'
import { toast } from 'react-toastify'

import DoubleArrowIcon from '@mui/icons-material/DoubleArrow'
import { Box, Divider, Grid2, IconButton, LinearProgress, Modal, Stack } from '@mui/material'
import { useParams } from 'next/navigation'

import {
  createGameFromPendingConnection,
  getPendingConnectionById,
  mergeGameWithPendingConnection,
} from '@/api/pending-connections'
import { TPendingConnection } from '@/api/pending-connections/types'
import { EditGameForm } from '@/components/edit-game-form/edit-game-form'
import { NoDataLabel } from '@/components/no-data-label'
import { ResolveGameCard } from '@/components/resolve-game-card/page'
import { TwoTabs } from '@/components/two-tabs/two-tabs'
import { GlassCard } from '@/components/ui/cards/glass-card'
import { TypographyV2 } from '@/components/ui/typography'
import { EAppRoute } from '@/enums/app-route.enum'
import { ERole } from '@/enums/roles.enum'
import { getGameTitleForLink } from '@/helpers/getGameTitleForLink'
import { getUniqueValuesFromArrays } from '@/helpers/getUniqueValues'
import { useCustomNavigate } from '@/hooks/useCustomNavigate'
import { useAppStore } from '@/store/app.store'
import { TGame } from '@/types/game.types'
import { withRouteProtection } from '@/utils/with-route-protection'

const ResolvePendingConnection = () => {
  const [pendingConnection, setPendingConnection] = useState<TPendingConnection | null>(null)
  const [resolveId, setResolveId] = useState(0)
  const [formModalOpen, setFormModalOpen] = useState(false)
  const [mergedGameData, setMergedGameData] = useState<(TGame & { origin?: TGame }) | null>(null)
  const [resolveMode, setResolveMode] = useState<'merge' | 'create'>('merge')
  const [resolveLoading, setResolveLoading] = useState(false)
  const [loading, setLoading] = useState(true)
  const [columnWidth, setColumnWidth] = useState(0)

  const stores = useAppStore((state) => state.stores)
  const navigate = useCustomNavigate()
  const params = useParams()
  const descriptionElementRef = useRef<HTMLElement>(null)

  const closeModal = () => {
    setFormModalOpen(false)
    setMergedGameData(null)
  }

  useEffect(() => {
    if (formModalOpen) {
      const { current: descriptionElement } = descriptionElementRef
      if (descriptionElement !== null) {
        descriptionElement.focus()
      }
    }
  }, [formModalOpen])

  useEffect(() => {
    if (params?.resolveId) {
      setResolveId(+params.resolveId)
    }
  }, [params])

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const { data } = await getPendingConnectionById(+resolveId!)
        setPendingConnection(data)
      } catch (err) {
        toast(`Error loading stats: ${(err as any).message}`, { type: 'error' })
      } finally {
        setLoading(false)
      }
    })()
  }, [resolveId])

  useEffect(() => {
    const updateWidth = () => setColumnWidth(window.innerWidth)
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  if (loading) {
    return <LinearProgress />
  }

  if (!pendingConnection) {
    return <NoDataLabel />
  }

  const onCreateNew = () => {
    if (!pendingConnection?.gameData) {
      return
    }

    setResolveMode('create')
    setMergedGameData(pendingConnection.gameData)
    setFormModalOpen(true)
  }

  const onMergePreview = (game: TGame) => {
    if (!pendingConnection) {
      return
    }

    const genres = getUniqueValuesFromArrays([pendingConnection.gameData.genres, game.genres])
    const platforms = getUniqueValuesFromArrays([
      pendingConnection.gameData.platforms,
      game.platforms,
    ])
    const textLanguages = getUniqueValuesFromArrays([
      pendingConnection.gameData.textLanguages,
      game.textLanguages,
    ])
    const voiceLanguages = getUniqueValuesFromArrays([
      pendingConnection.gameData.voiceLanguages,
      game.voiceLanguages,
    ])
    const images = getUniqueValuesFromArrays([pendingConnection.gameData.images, game.images])

    const mergedPlainData = [
      'description',
      'releaseDate',
      'publisher',
      'coverImageUrl',
      'type',
      'title',
      'psnId',
      'nintendoId',
      'xboxId',
    ].reduce((acc, key) => {
      acc[key] = pendingConnection.gameData[key as keyof TGame] || game[key as keyof TGame] || null
      return acc
    }, {} as any)

    const newGameData = {
      ...mergedPlainData,
      id: game.id,
      genres,
      platforms,
      textLanguages,
      voiceLanguages,
      images,
    }

    setResolveMode('merge')
    setMergedGameData({ ...newGameData, origin: game })
    setFormModalOpen(true)
  }

  const onResolveConnection = async (mergedGameData: TGame) => {
    if (!pendingConnection?.gameData) {
      return
    }

    try {
      setResolveLoading(true)
      const store = stores?.find((item) => item.name === pendingConnection.gameData.store)

      if (!store) {
        throw new Error(`Store ${pendingConnection.gameData.store} not found in Redux`)
      }

      const { data } = await (
        resolveMode === 'merge' ? mergeGameWithPendingConnection : createGameFromPendingConnection
      )(
        {
          mergedGameData,
          sensitiveData: pendingConnection.gameData.sensitiveData,
        },
        pendingConnection.id,
        store.id,
      )

      toast('The connection was successfully resolved', { type: 'success' })

      navigate({
        path: `/${EAppRoute.GAME}/${data}/${getGameTitleForLink(mergedGameData.title)}`,
        replace: true,
      })
    } catch (err) {
      toast(
        `Error ${resolveMode === 'merge' ? 'merging' : 'creating'} the game: ${(err as any).message}`,
        { type: 'error' },
      )
    } finally {
      setResolveLoading(false)
    }
  }

  return (
    <>
      {columnWidth > 1024 ? (
        <Grid2>
          <Grid2 container justifyContent="space-between" flex={1} flexWrap="nowrap">
            <Box flex={1}>
              <ResolveGameCard
                game={pendingConnection?.gameData}
                actionButton={{ label: 'Create new', onClick: onCreateNew }}
              />
            </Box>

            <Box>
              <Divider orientation="vertical">
                <DoubleArrowIcon />
              </Divider>
            </Box>

            <Stack flex={1}>
              {pendingConnection?.gamesPendingConnectionsPotentialGames?.map((connection) => (
                <ResolveGameCard
                  game={connection.game}
                  key={connection.id}
                  onClick={() =>
                    navigate({
                      path: `/${EAppRoute.GAME}/${connection.game.id}/${getGameTitleForLink(connection.game.title)}`,
                      replace: true,
                    })
                  }
                  actionButton={{
                    label: 'Merge ',
                    onClick: () => onMergePreview(connection.game),
                  }}
                />
              ))}
            </Stack>
          </Grid2>
        </Grid2>
      ) : (
        <TwoTabs
          tab1={
            <Box flex={1}>
              <ResolveGameCard
                game={pendingConnection?.gameData}
                actionButton={{ label: 'Create new', onClick: onCreateNew }}
              />
            </Box>
          }
          tab2={
            <Stack flex={1}>
              {pendingConnection?.gamesPendingConnectionsPotentialGames?.map((connection) => (
                <ResolveGameCard
                  game={connection.game}
                  key={connection.id}
                  onClick={() =>
                    navigate({
                      path: `/${EAppRoute.GAME}/${connection.game.id}/${getGameTitleForLink(connection.game.title)}`,
                      replace: true,
                    })
                  }
                  actionButton={{
                    label: 'Merge',
                    onClick: () => onMergePreview(connection.game),
                  }}
                />
              ))}
            </Stack>
          }
        />
      )}
      <Modal open={formModalOpen} onClose={closeModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            overflow: 'auto',
            maxHeight: '100%',
            width: '100%',
            maxWidth: 1000,
          }}
        >
          <IconButton
            onClick={closeModal}
            sx={{ position: 'absolute', right: 13, top: 16, padding: 0.5, zIndex: 1000 }}
          >
            <GlassCard sx={{ padding: '8px 32px' }}>
              <TypographyV2 color="red" fontWeight="bold" fontSize="text-l" letterSpacing={4}>
                Close
              </TypographyV2>
            </GlassCard>
          </IconButton>
          {!!mergedGameData && (
            <EditGameForm
              game={mergedGameData}
              customSubmit={onResolveConnection}
              readonly={resolveLoading}
            />
          )}
        </Box>
      </Modal>
    </>
  )
}

export default withRouteProtection(ResolvePendingConnection, [ERole.ADMIN])
