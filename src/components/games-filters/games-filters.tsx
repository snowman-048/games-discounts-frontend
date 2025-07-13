'use client'

import { useMemo, useState } from 'react'

import ClearIcon from '@mui/icons-material/Clear'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import SearchIcon from '@mui/icons-material/Search'
import { Button, Checkbox, FormControlLabel, Grid2, IconButton, Stack } from '@mui/material'
import { useTranslations } from 'next-intl'

import { allGamesSortingOptions, gamesSortingOptions } from '@/configs/games-sorting-options.config'
import { EFilter } from '@/enums/filter.enum'
import { EGameType } from '@/enums/game-type.enum'
import { useCustomNavigate } from '@/hooks/useCustomNavigate'
import { useGetAllSearchParams } from '@/hooks/useGetAllSearchParams'
import { useAppStore } from '@/store/app.store'

import { GlassCard } from '../ui/cards/glass-card'
import { Input } from '../ui/input'
import { Modal } from '../ui/modal'
import { MultipleAutocomplete } from '../ui/multiple-autocomplete'
import { Select } from '../ui/select'
import { Tooltip } from '../ui/tooltip'

type TProps = {
  redirectPath: string
  noDiscountsFilters?: boolean
}

const GamesFilters = ({ redirectPath, noDiscountsFilters = false }: TProps) => {
  const t = useTranslations()

  const stores = useAppStore((state) => state.stores)

  const searchParams = useGetAllSearchParams()

  const [title, setTitle] = useState<string>((searchParams.title as string) || '')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const navigate = useCustomNavigate()

  const defaultStores = useMemo(() => stores.map((item) => `${item.id}`), [stores])
  const onlySelectedStores = searchParams.onlySelectedStores === 'true'

  const sortOptions = noDiscountsFilters ? allGamesSortingOptions : gamesSortingOptions
  const sort = searchParams.sort || sortOptions[0]

  const handleFilterChange = (newFilter: Record<string, any>) => {
    // TODO: Handle different routes if needed
    navigate({
      path: `/${redirectPath}/1`,
      query: newFilter,
      replace: true,
    })
  }

  const renderTopFilters = () => {
    return (
      <Grid2
        container
        flexDirection={{ xs: 'column-reverse', md: 'row' }}
        alignItems="center"
        gap={{ xs: 3, md: 2 }}
        flexWrap="nowrap"
      >
        <Select
          label={t('GamesFilters.type')}
          size="small"
          value={searchParams.types?.[0] || EFilter.ALL}
          options={[EFilter.ALL, ...Object.values(EGameType)].map((item) => ({
            title: t(`game_type.${item}`),
            value: item,
          }))}
          onChange={(value) => {
            handleFilterChange({ types: value === EFilter.ALL ? '' : [value] })
          }}
          containerProps={{ sx: { maxWidth: { xs: '100%', md: '300px' } } }}
        />

        <Grid2
          container
          alignItems="center"
          gap={2}
          flex={1}
          width="100%"
          component="form"
          onSubmit={(e) => {
            e.preventDefault()
            handleFilterChange({ title: title.trim() })
            setIsModalOpen(false)
          }}
        >
          <Input
            variant="outlined"
            label={t('GamesFilters.title')}
            size="small"
            value={title}
            onChange={setTitle}
            endAdornment={
              <IconButton
                sx={{ padding: 0.5 }}
                onClick={() => {
                  setTitle('')
                  handleFilterChange({ title: '' })
                }}
              >
                <ClearIcon />
              </IconButton>
            }
          />

          <Button
            sx={{ color: 'var(--color-l1)', textTransform: 'none', gap: 1 }}
            variant="contained"
            type="submit"
          >
            <SearchIcon />
            {t('GamesFilters.search')}
          </Button>
        </Grid2>
      </Grid2>
    )
  }

  const renderBottomFilters = () => {
    return (
      <>
        <Select
          label={t('GamesFilters.sort_by')}
          size="small"
          value={sort}
          options={sortOptions.map((item) => ({
            title: t(`sorting.${item}`),
            value: item,
          }))}
          onChange={(value) => {
            handleFilterChange({ sort: value })
          }}
          containerProps={{ sx: { minWidth: 300 } }}
        />

        <MultipleAutocomplete
          label={t('GamesFilters.store')}
          options={stores.map((store) => ({
            title: store.name,
            value: `${store.id}`,
          }))}
          onChange={(value: string[]) => {
            handleFilterChange({ storeIds: value })
          }}
          size="small"
          fullWidth
          value={(searchParams.storeIds || defaultStores) as string[]}
          disabled={!stores.length}
        />

        <Tooltip title={t('GamesFilters.oevrlaps_tooltip')} delay={500}>
          <FormControlLabel
            control={<Checkbox checked={onlySelectedStores} />}
            label={t('GamesFilters.overlaps')}
            value={onlySelectedStores}
            onChange={(_, value) => handleFilterChange({ onlySelectedStores: value })}
            sx={{ marginTop: { xs: -1, md: 0 }, width: 'fit-content' }}
          />
        </Tooltip>
      </>
    )
  }

  return (
    <>
      <Grid2 container width="100%">
        <GlassCard style={{ width: '100%' }}>
          <Grid2
            padding={{ xs: 1, md: 3 }}
            flex={1}
            container
            flexWrap="nowrap"
            gap={2}
            alignItems="center"
          >
            <Button
              onClick={() => setIsModalOpen(true)}
              sx={{
                textTransform: 'none',
                color: 'var(--color-primary)',
                fontSize: '1rem',
                gap: 1,
                px: 2,
                display: {
                  xs: 'flex',
                  md: 'none',
                },
              }}
            >
              <FilterAltIcon />
              {t('GamesFilters.filter_games')}
            </Button>

            <Stack
              gap={2}
              width="100%"
              sx={{
                display: {
                  xs: 'none',
                  md: 'flex',
                },
              }}
            >
              {renderTopFilters()}
              <Grid2 flex={1} container flexWrap="nowrap" gap={2} alignItems="center">
                {renderBottomFilters()}
              </Grid2>
            </Stack>
          </Grid2>
        </GlassCard>
      </Grid2>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={t('GamesFilters.filter_games')}
      >
        <Stack gap={3} width="100%">
          {renderTopFilters()}
          {renderBottomFilters()}
          <Button
            onClick={() => setIsModalOpen(false)}
            sx={{ fontSize: '1.2rem', marginTop: -1 }}
            fullWidth
          >
            {t('GamesFilters.close')}
          </Button>
        </Stack>
      </Modal>
    </>
  )
}

export { GamesFilters }
