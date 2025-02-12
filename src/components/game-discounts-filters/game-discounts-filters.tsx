'use client'

import { useEffect, useMemo, useState } from 'react'

import ClearIcon from '@mui/icons-material/Clear'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import SearchIcon from '@mui/icons-material/Search'
import {
  Button,
  Checkbox,
  Dialog,
  FormControl,
  FormControlLabel,
  Grid2,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'

import { getStores } from '@/api/stores'
import { gamesSortingOptions } from '@/configs/games-sorting-options.config'
import { EAppRoute } from '@/enums/app-route.enum'
import { useCustomNavigate } from '@/hooks/useCustomNavigate'
import { useGetAllSearchParams } from '@/hooks/useGetAllSearchParams'
import { TStore } from '@/types/store.types'

import { GlassCard } from '../ui/cards/glass-card'
import { MultipleAutocomplete } from '../ui/multiple-autocomplete'

const GameDiscountsFilters = () => {
  const searchParams = useGetAllSearchParams()

  const [title, setTitle] = useState<string>((searchParams.title as string) || '')
  const [stores, setStores] = useState<TStore[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const navigate = useCustomNavigate()

  const defaultStores = useMemo(() => stores.map((item) => `${item.id}`), [stores])
  const onlySelectedStores = searchParams.onlySelectedStores === 'true'

  const handleFilterChange = (newFilter: Record<string, any>) => {
    // TODO: Handle different routes if needed
    navigate({ path: `/${EAppRoute.ACTIVE_DISCOUNTS}/1`, query: newFilter, replace: true })
  }

  useEffect(() => {
    ;(async () => {
      const { data } = await getStores()
      setStores(data)
    })()
  }, [])

  const renderSearchInput = () => {
    return (
      <Grid2
        container
        alignItems="center"
        gap={2}
        component="form"
        onSubmit={(e) => {
          e.preventDefault()
          handleFilterChange({ title: title.trim() })
          setIsModalOpen(false)
        }}
      >
        <TextField
          variant="outlined"
          label="Title"
          sx={{ flex: 1 }}
          size="small"
          value={title}
          onChange={(e) => {
            const value = e.target.value
            setTitle(value)
          }}
          slotProps={{
            input: {
              endAdornment: (
                <IconButton
                  sx={{ padding: 0.5 }}
                  onClick={() => {
                    setTitle('')
                    handleFilterChange({ title: '' })
                  }}
                >
                  <ClearIcon />
                </IconButton>
              ),
            },
          }}
        />

        <Button
          sx={{ color: 'var(--bg-main)', textTransform: 'none', gap: 1 }}
          variant="contained"
          type="submit"
        >
          <SearchIcon />
          Search
        </Button>
      </Grid2>
    )
  }

  const renderMainFilters = () => {
    return (
      <>
        <FormControl fullWidth>
          <InputLabel>Sort by</InputLabel>
          <Select
            label="Sort by"
            onChange={(e) => {
              const value = e.target.value
              handleFilterChange({ sort: value })
            }}
            size="small"
            value={searchParams.sort || gamesSortingOptions[0].value}
          >
            {gamesSortingOptions.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <MultipleAutocomplete
          label="Store"
          options={stores.map((store) => ({
            title: store.name,
            value: `${store.id}`,
          }))}
          onChange={(value) => {
            handleFilterChange({ storeIds: value })
          }}
          size="small"
          fullWidth
          value={(searchParams.storeIds || defaultStores) as string[]}
          disabled={!stores.length}
        />

        <FormControlLabel
          control={<Checkbox checked={onlySelectedStores} />}
          label="Overlaps"
          value={onlySelectedStores}
          onChange={(_, value) => handleFilterChange({ onlySelectedStores: value })}
          sx={{ marginTop: { xs: -1, md: 0 } }}
        />
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
                color: 'var(--text-primary)',
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
              Filter Games
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
              {renderSearchInput()}
              <Grid2 flex={1} container flexWrap="nowrap" gap={2} alignItems="center">
                {renderMainFilters()}
              </Grid2>
            </Stack>
          </Grid2>
        </GlassCard>
      </Grid2>

      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        fullWidth
        slotProps={{
          paper: {
            component: 'div',
            sx: {
              background: 'transparent',
              padding: 0,
              width: '100%',
              margin: {
                xs: 1,
                sm: 2,
              },
            },
          },
          backdrop: {
            sx: {
              background: 'var(--backdrop)',
            },
            transitionDuration: 100,
          },
        }}
      >
        <GlassCard style={{ width: '100%' }}>
          <Grid2 container flexDirection="column" gap={3} padding={2} width="100%">
            <Typography variant="h5" textAlign="center" fontWeight="bold" marginBottom={1}>
              Filter Games
            </Typography>
            {renderSearchInput()}
            {renderMainFilters()}
            <Button
              onClick={() => setIsModalOpen(false)}
              sx={{ fontSize: '1.2rem', marginTop: -1 }}
              fullWidth
            >
              Close
            </Button>
          </Grid2>
        </GlassCard>
      </Dialog>
    </>
  )
}

export { GameDiscountsFilters }
