'use client'

import { useEffect, useState } from 'react'

import DoubleArrowIcon from '@mui/icons-material/DoubleArrow'
import { Box, Divider, Grid2, LinearProgress, Stack, useMediaQuery } from '@mui/material'
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
import { Tabs } from '@/components/tabs/tabs'
import { Modal } from '@/components/ui/modal'
import { EAppRoute } from '@/enums/app-route.enum'
import { ERole } from '@/enums/roles.enum'
import { getTitleForLink } from '@/helpers/getTitleForLink'
import { getUniqueValuesFromArrays } from '@/helpers/getUniqueValues'
import { useCustomNavigate } from '@/hooks/useCustomNavigate'
import { useAppStore } from '@/store/app.store'
import { TGame } from '@/types/game.types'
import { CustomToast } from '@/utils/custom-toast'
import { withRouteProtection } from '@/utils/with-route-protection'

const ResolvePendingConnection = () => {
  const stores = useAppStore((state) => state.stores)

  const [pendingConnection, setPendingConnection] = useState<TPendingConnection | null>(null)
  const [formModalOpen, setFormModalOpen] = useState(false)
  const [mergedGameData, setMergedGameData] = useState<(TGame & { origin?: TGame }) | null>(null)
  const [resolveMode, setResolveMode] = useState<'merge' | 'create'>('merge')
  const [resolveLoading, setResolveLoading] = useState(false)
  const [loading, setLoading] = useState(true)

  const showMobileVersion = useMediaQuery(`(max-width: 1024px)`)

  const { resolveId } = useParams<{ resolveId: string }>()

  const navigate = useCustomNavigate()

  const closeModal = () => {
    setFormModalOpen(false)
    setMergedGameData(null)
  }

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const { data } = await getPendingConnectionById(+resolveId)
        setPendingConnection(data)
      } catch (err) {
        CustomToast('error', `Error loading data: ${(err as any).message}`)
      } finally {
        setLoading(false)
      }
    })()
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
      'familyKey',
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
        throw new Error(`Store ${pendingConnection.gameData.store} not found`)
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

      CustomToast('success', 'The connection was successfully resolved')

      navigate({
        path: `/${EAppRoute.GAME}/${data}/${getTitleForLink(mergedGameData.title)}`,
        replace: true,
      })
    } catch (err) {
      CustomToast(
        'error',
        `Error ${resolveMode === 'merge' ? 'merging' : 'creating'} the game: ${(err as any).message}`,
      )
    } finally {
      setResolveLoading(false)
    }
  }

  const tabsContent = [
    {
      label: 'New Game',
      content: (
        <Box flex={1}>
          <ResolveGameCard
            game={pendingConnection?.gameData}
            actionButton={{ label: 'Create new', onClick: onCreateNew }}
            onClick={() => window.open(pendingConnection?.gameData.gameLink, '_blank')}
          />
        </Box>
      ),
    },
    {
      label: 'Merge',
      content: (
        <Stack flex={1}>
          {pendingConnection?.gamesPendingConnectionsPotentialGames?.map((connection) => (
            <ResolveGameCard
              game={connection.game}
              key={connection.id}
              onClick={() =>
                navigate({
                  path: `/${EAppRoute.GAME}/${connection.game.id}/${getTitleForLink(connection.game.title)}`,
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
      ),
    },
  ]

  return (
    <>
      {showMobileVersion ? (
        <Tabs tabs={tabsContent} />
      ) : (
        <Grid2>
          <Grid2 container justifyContent="space-between" flex={1} flexWrap="nowrap">
            <Box flex={1}>
              <ResolveGameCard
                game={pendingConnection?.gameData}
                actionButton={{ label: 'Create new', onClick: onCreateNew }}
                onClick={() => window.open(pendingConnection?.gameData.gameLink, '_blank')}
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
                      path: `/${EAppRoute.GAME}/${connection.game.id}/${getTitleForLink(connection.game.title)}`,
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
      )}

      <Modal
        open={formModalOpen}
        onClose={closeModal}
        title={`${resolveMode === 'merge' ? 'Merge' : 'Create New Game'}`}
      >
        <>
          {!!mergedGameData && (
            <EditGameForm
              game={mergedGameData}
              customSubmit={onResolveConnection}
              readonly={resolveLoading}
            />
          )}
        </>
      </Modal>
    </>
  )
}

export default withRouteProtection(ResolvePendingConnection, [ERole.ADMIN])
