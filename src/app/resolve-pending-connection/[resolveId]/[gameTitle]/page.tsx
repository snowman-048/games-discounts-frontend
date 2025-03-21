'use client'

import { useEffect, useRef, useState } from 'react'
import * as React from 'react'
import { toast } from 'react-toastify'

import DoubleArrowIcon from '@mui/icons-material/DoubleArrow'
import { Box, Divider, Grid2, LinearProgress, Modal, Stack } from '@mui/material'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
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

  const stores = useAppStore((state) => state.stores)
  const navigate = useCustomNavigate()
  const params = useParams()

  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const closeModal = () => {
    setFormModalOpen(false)
    setMergedGameData(null)
  }

  const descriptionElementRef = useRef<HTMLElement>(null)
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

  if (!pendingConnection) {
    return <NoDataLabel />
  }
  

  // return (
  //   <Box sx={{ width: '100%' }}>
  //     <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
  //       <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered   variant="fullWidth">
  //         <Tab label="New Game" {...a11yProps(0)} />
  //         <Tab label="Merge with this" {...a11yProps(1)} />
  //       </Tabs>
  //     </Box>
  //     <CustomTabPanel value={value} index={0}>
  //       <Box flex={1}>
  //         <ResolveGameCard
  //           game={pendingConnection?.gameData}
  //           actionButton={{ label: 'Create new', onClick: onCreateNew }}
  //         />
  //       </Box>
  //     </CustomTabPanel>
  //     <CustomTabPanel value={value} index={1}>
  //       <Stack gap={0} flex={1}>
  //         {pendingConnection?.gamesPendingConnectionsPotentialGames?.map((connection) => (
  //           <ResolveGameCard
  //             game={connection.game}
  //             key={connection.id}
  //             onClick={() =>
  //               navigate({
  //                 path: `/${EAppRoute.GAME}/${connection.game.id}/${getGameTitleForLink(connection.game.title)}`,
  //                 replace: true,
  //               })
  //             }
  //             actionButton={{
  //               label: 'Merge ',
  //               onClick: () => onMergePreview(connection.game),
  //             }}
  //           />
  //         ))}
  //       </Stack>
  //     </CustomTabPanel>
  //   </Box>
  // )

  return (
    <>
      <Grid2 container justifyContent="space-between" flex={1} gap={1} flexWrap="nowrap">
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

        <Stack gap={0} flex={1}>
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

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

export default withRouteProtection(ResolvePendingConnection, [ERole.ADMIN])
