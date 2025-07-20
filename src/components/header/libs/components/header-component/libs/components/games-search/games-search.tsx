'use client'

import { CSSProperties, useEffect, useMemo, useRef, useState } from 'react'

import { Autocomplete, Box, Button, Grid2, Stack } from '@mui/material'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { getGamesList } from '@/api/games'
import { GameCard } from '@/components/game-card'
import { NoDataLabel } from '@/components/no-data-label'
import { Input } from '@/components/ui/input'
import { TypographyV2 } from '@/components/ui/typography'
import { EAppRoute } from '@/enums/app-route.enum'
import { createQueryString } from '@/helpers/createQueryString'
import { getStoreRegionsFromQuery } from '@/helpers/getStoreRegionsFromQuery'
import { prepareGamesSearchQuery } from '@/helpers/prepareGamesSearchQuery'
import { useDebounce } from '@/hooks/useDebounce'
import { TGameSearchParams } from '@/types/game-search.types'
import { TGame } from '@/types/game.types'

import styles from './styles.module.scss'

type TProps = {
  query: TGameSearchParams
  closeDrawer: () => void
}

const ITEMS_COUNT = 15
const LIST_PADDING_X = 40

const GamesSearch = ({ query, closeDrawer }: TProps) => {
  const t = useTranslations()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [games, setGames] = useState<TGame[]>([])
  const [searchValue, setSearchValue] = useState('')
  const [popperStyle, setPopperStyle] = useState<CSSProperties>({})

  const inputRef = useRef<HTMLInputElement>(null)

  const pathname = usePathname()

  const searchRelatedQuery = useMemo(() => getStoreRegionsFromQuery(query), [query])

  const clearState = (withSearch = false) => {
    setGames([])
    if (withSearch) setSearchValue('')
  }

  const searchGames = async (value: string) => {
    try {
      if (!value) {
        handleClose()
        clearState()
        return
      }

      setLoading(true)
      const { data } = await getGamesList(
        prepareGamesSearchQuery({
          ...searchRelatedQuery,
          page: 1,
          limit: ITEMS_COUNT,
          title: value.trim(),
          allGames: true,
        }),
      )

      setGames(data[0])
      handleOpen(true)
    } catch (err) {
      console.log('err loading games', err)
      setGames([])
    } finally {
      setLoading(false)
    }
  }

  const searchGamesDebounced = useDebounce({ debounceTimeout: 500, handler: searchGames })

  const handleOpen = (force = false) => {
    if ((!games.length && !force) || !inputRef.current) return

    const rect = inputRef.current.getBoundingClientRect()
    setPopperStyle({
      left: `${rect.left - LIST_PADDING_X}px`,
      width: `${rect.width + LIST_PADDING_X * 2}px`,
      maxHeight: `calc(100dvh - ${rect.bottom}px)`,
    })

    setOpen(true)

    document.body.style.overflowY = 'hidden' // Disable global scrolling
  }

  const handleClose = (forceClear = false) => {
    document.body.style.overflowY = ''
    setOpen(false)
    if (!games.length || forceClear) clearState(true)
  }

  useEffect(() => {
    return () => {
      document.body.style.overflowY = ''
    }
  }, [])

  useEffect(() => {
    handleClose()
  }, [pathname])

  return (
    <>
      <Autocomplete
        ref={inputRef}
        fullWidth
        open={open}
        loading={loading}
        onOpen={() => handleOpen()}
        clearOnBlur={false}
        popupIcon={false}
        filterOptions={(x) => x} // This is required by the library
        inputValue={searchValue}
        onInputChange={(_, value) => {
          setSearchValue(value)
          searchGamesDebounced(value)
        }}
        noOptionsText={<NoDataLabel />}
        isOptionEqualToValue={(option, value) => option.title === value.title}
        getOptionLabel={(option) => option.title}
        options={games}
        renderOption={(option) => (
          <GameCard
            key={games[(option as any)['data-option-index']].id}
            game={games[(option as any)['data-option-index']]}
            variant="list-item"
            noShadow
            t={t}
            onClick={() => {
              handleClose()
              closeDrawer()
            }}
          />
        )}
        slotProps={{
          popper: {
            style: popperStyle,
            className: styles.gamesContainer,
          },
        }}
        slots={{
          paper: ({ children, ...props }) => (
            <Stack
              {...props}
              onClick={(e) => e.stopPropagation()}
              sx={{
                maxHeight: popperStyle.maxHeight || '100%',
                overflowY: 'hidden',
                overflowX: 'visible !important',
                paddingBottom: 2,
              }}
              className={styles.paper}
            >
              <Stack
                sx={{
                  width: '100%',
                  height: '100%',
                  overflow: 'auto !important',
                  overflowX: 'visible !important',
                  paddingTop: 3,
                }}
              >
                {children}
              </Stack>
              <Grid2 container gap={3} flexWrap="nowrap">
                <Button
                  sx={{ marginTop: 2, width: '100%' }}
                  variant={!!games.length ? 'outlined' : 'contained'}
                  onClick={() => handleClose()}
                >
                  <TypographyV2
                    fontSize="text-l"
                    isUpperCase
                    color={!!games.length ? 'brand' : 'l1'}
                    fontWeight="bold"
                  >
                    {t('GamesSearch.close')}
                  </TypographyV2>
                </Button>
                {!!games.length && (
                  <Link
                    href={`/${EAppRoute.ALL_GAMES}/1${createQueryString({ ...searchRelatedQuery, title: searchValue })}`}
                    style={{ width: '100%' }}
                    onClick={() => {
                      handleClose(true)
                      closeDrawer()
                    }}
                  >
                    <Button sx={{ marginTop: 2 }} fullWidth variant="contained">
                      <TypographyV2 fontSize="text-l" fontWeight="bold" isUpperCase color="l1">
                        {t('GamesSearch.view_all')}
                      </TypographyV2>
                    </Button>
                  </Link>
                )}
              </Grid2>
            </Stack>
          ),
          listbox: ({ children, ...props }) => (
            <Stack
              {...props}
              flexDirection="column"
              gap={1}
              sx={{
                overflowX: 'visible !important',
              }}
            >
              {children}
            </Stack>
          ),
        }}
        renderInput={(params) => (
          <Input
            {...params}
            label={t('GamesSearch.games_search')}
            size="small"
            inputRef={inputRef}
            sx={{
              zIndex: open ? 1405 : 1,
            }}
            slotProps={{
              input: params.InputProps,
            }}
            loading={loading}
          />
        )}
      />

      {open && (
        <Box
          onClick={() => handleClose()}
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'var(--backdrop)',
            zIndex: 1300,
          }}
        />
      )}
    </>
  )
}

export { GamesSearch }
