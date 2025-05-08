import { FC, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { yupResolver } from '@hookform/resolvers/yup'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Button,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  Grid2,
  ImageList,
  ImageListItem,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useTranslations } from 'use-intl'
import * as yup from 'yup'

import { updateGame } from '@/api/games'
import { EDescriptionStatus } from '@/enums/description-status.enum'
import { EGameType } from '@/enums/game-type.enum'
import { EPlatform } from '@/enums/platform.enum'
import { EStore } from '@/enums/store.enum'
import { TGame } from '@/types/game.types'

import { GameImgWithBuy } from '../game-img-with-buy'
import { StoreIcon } from '../store-icon'
import { InfoItem } from '../ui/info-item'
import { MultipleAutocomplete } from '../ui/multiple-autocomplete'
import { TypographyV2 } from '../ui/typography'
import styles from './styles.module.scss'

type TProps = {
  game: TGame & { origin?: TGame }
  readonly?: boolean
  customSubmit?: (data: TGame) => void
}

const replacedColor = 'rgba(0, 255, 0, 0.1)'
const originalColor = 'rgba(255, 0, 0, 0.1)'

const PLATFORMS = Object.values(EPlatform).map((platform) => ({ title: platform, value: platform }))

const validationSchema = yup.object({
  title: yup.string().required('Title is required'),
  coverImageUrl: yup.string().optional(),
  platforms: yup.array(yup.mixed().oneOf<EPlatform>(Object.values(EPlatform))).min(1),
  type: yup.string().oneOf<EGameType>(Object.values(EGameType)),
  publisher: yup.string().optional(),
  description: yup.string().optional(),
  genres: yup.array(yup.string()),
  textLanguages: yup.array(yup.string()),
  voiceLanguages: yup.array(yup.string()),
})

const EditGameForm: FC<TProps> = ({ game, readonly = false, customSubmit }) => {
  const t = useTranslations()

  const [loading, setLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      ...game,
      title: game.title || '',
      coverImageUrl: game.coverImageUrl || '',
      platforms: game.platforms || [],
      type: game.type || '',
      publisher: game.publisher || '',
      description:
        (game.origin?.descriptionStatus === EDescriptionStatus.PROCESSED
          ? game.origin?.description
          : game.description) || '',
      genres: game.genres || [],
      textLanguages: game.textLanguages || [],
      voiceLanguages: game.voiceLanguages || [],
    },
    disabled: readonly || loading,
    resolver: yupResolver(validationSchema as any),
  })

  const submit = async (data: TGame & { origin?: TGame }) => {
    const { origin, ...formattedData } = { ...data, title: data.title.trim() }
    if (customSubmit) {
      customSubmit(formattedData)
      return
    }
    try {
      setLoading(true)
      await updateGame(game.id, formattedData)
      toast('The game was successfully updated', { type: 'success' })
    } catch (err) {
      toast(`Error updating the game: ${(err as any).message}`, { type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const watchedValues = watch()

  const isChanged = (key: keyof TGame) => {
    if (!game.origin) {
      return {}
    }
    return watchedValues[key] !== game.origin?.[key]
      ? { backgroundColor: replacedColor }
      : { backgroundColor: originalColor }
  }

  return (
    <form style={{ width: '100%' }} onSubmit={handleSubmit(submit)}>
      <Grid2 sx={{ position: 'relative', width: '100%' }} container flexDirection="column" gap={3}>
        <GameImgWithBuy
          game={{ ...game, coverImageUrl: watch('coverImageUrl'), type: watch('type') }}
          t={t}
          className={styles.mainImgWrapper}
        />

        <Stack>
          <GameImgWithBuy game={game} className={styles.fakeImgWrapper} isFake t={t} />

          <Stack flex={1} position="relative" paddingTop={{ xs: 1, md: 2 }} gap={2}>
            <Controller
              name="title"
              control={control}
              render={({ field: { value, onChange, ...rest } }) => (
                <Stack>
                  <Stack gap={2}>
                    <TypographyV2
                      fontSize="heading-m"
                      fontWeight="bold"
                      component="h2"
                      sx={{ wordBreak: 'break-word' }}
                    >
                      {value}
                    </TypographyV2>

                    <TextField
                      variant="outlined"
                      label="Title"
                      fullWidth
                      value={value}
                      onChange={onChange}
                      sx={isChanged('title')}
                      error={!!errors.title?.message}
                      {...rest}
                    />
                  </Stack>
                  {game.origin && (
                    <RadioGroup value={value} onChange={onChange}>
                      <Stack flexDirection="row" alignItems="center">
                        <FormControlLabel value={game.title} control={<Radio />} label="New" />
                        <FormControlLabel
                          value={game.origin?.title}
                          control={<Radio />}
                          label="Original"
                        />
                      </Stack>
                    </RadioGroup>
                  )}
                </Stack>
              )}
            />

            <Divider sx={{ margin: '16px 0', background: 'var(--color-brand)' }} />

            <InfoItem
              label="Stores ID"
              data={
                <Grid2 container gap={3}>
                  {[
                    { platform: EStore.PSN, id: game.psnId },
                    { platform: EStore.NINTENDO, id: game.nintendoId },
                    { platform: EStore.XBOX, id: game.xboxId },
                  ]
                    .filter((entry) => entry.id)
                    .map(({ platform, id }) => {
                      return (
                        <Grid2 container alignItems="center" gap={1} key={id}>
                          <StoreIcon store={platform} withLabel={false} />
                          <strong>{id}</strong>
                        </Grid2>
                      )
                    })}
                </Grid2>
              }
            />

            <Controller
              name="coverImageUrl"
              control={control}
              render={({ field: { value, onChange, ...rest } }) => (
                <Stack>
                  <TextField
                    variant="outlined"
                    label="Caver URL"
                    fullWidth
                    value={value}
                    onChange={onChange}
                    sx={isChanged('coverImageUrl')}
                    error={!!errors.coverImageUrl?.message}
                    {...rest}
                  />
                  {game.origin && (
                    <RadioGroup value={value} onChange={onChange}>
                      <Stack flexDirection="row" alignItems="center">
                        <FormControlLabel
                          value={game.coverImageUrl}
                          control={<Radio />}
                          label="New"
                        />
                        <FormControlLabel
                          value={game.origin?.coverImageUrl}
                          control={<Radio />}
                          label="Origin"
                        />
                      </Stack>
                    </RadioGroup>
                  )}
                </Stack>
              )}
            />

            <Controller
              name="platforms"
              control={control}
              render={({ field: { ref, onChange, ...rest } }) => (
                <MultipleAutocomplete
                  label="Platforms"
                  options={PLATFORMS}
                  onChange={onChange}
                  error={!!errors.platforms?.message}
                  {...rest}
                />
              )}
            />

            <Controller
              name="type"
              control={control}
              render={({ field: { ref, value, onChange, ...rest } }) => (
                <FormControl fullWidth>
                  <Stack>
                    <InputLabel>Type</InputLabel>
                    <Select
                      label="Type"
                      onChange={onChange}
                      error={!!errors.type?.message}
                      {...rest}
                      value={value}
                      sx={isChanged('type')}
                    >
                      {Object.values(EGameType).map((item) => (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                    {game.origin && (
                      <RadioGroup value={value} onChange={onChange}>
                        <Stack flexDirection="row" alignItems="center">
                          <FormControlLabel value={game.type} control={<Radio />} label="New" />
                          <FormControlLabel
                            value={game.origin?.type}
                            control={<Radio />}
                            label="Origin"
                          />
                        </Stack>
                      </RadioGroup>
                    )}
                  </Stack>
                </FormControl>
              )}
            />

            <Controller
              name="publisher"
              control={control}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  label="Publisher"
                  fullWidth
                  error={!!errors.publisher?.message}
                  {...field}
                />
              )}
            />

            <Controller
              name="genres"
              control={control}
              render={({ field: { ref, onChange, value, ...rest } }) => (
                <Autocomplete
                  multiple
                  options={[]}
                  freeSolo
                  value={value}
                  onChange={(_, newValue) => {
                    onChange(newValue)
                  }}
                  renderTags={(tagValue, getTagProps) =>
                    tagValue.map((option, index) => {
                      const isChanged = game.origin && !game.origin?.genres?.includes(option)
                      return (
                        <Chip
                          {...getTagProps({ index })}
                          key={option}
                          label={option}
                          sx={isChanged ? { backgroundColor: replacedColor } : {}}
                        />
                      )
                    })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Genres"
                      placeholder="Genres"
                      error={!!errors.genres?.message}
                    />
                  )}
                  {...rest}
                />
              )}
            />

            <Controller
              name="textLanguages"
              control={control}
              render={({ field: { ref, onChange, value, ...rest } }) => (
                <Autocomplete
                  multiple
                  options={[]}
                  freeSolo
                  value={value}
                  onChange={(_, newValue) => {
                    onChange(newValue)
                  }}
                  renderTags={(tagValue, getTagProps) =>
                    tagValue.map((option, index) => {
                      const isChanged = game.origin && !game.origin?.textLanguages?.includes(option)
                      return (
                        <Chip
                          {...getTagProps({ index })}
                          key={option}
                          label={option}
                          sx={isChanged ? { backgroundColor: replacedColor } : {}}
                        />
                      )
                    })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Text languages"
                      placeholder="Text languages"
                      error={!!errors.textLanguages?.message}
                    />
                  )}
                  {...rest}
                />
              )}
            />

            <Controller
              name="voiceLanguages"
              control={control}
              render={({ field: { ref, onChange, ...rest } }) => (
                <Autocomplete
                  multiple
                  options={[]}
                  freeSolo
                  onChange={(_, value) => {
                    onChange(value)
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Voice languages"
                      placeholder="Voice languages"
                      error={!!errors.voiceLanguages?.message}
                    />
                  )}
                  {...rest}
                />
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  label="Description"
                  multiline
                  fullWidth
                  error={!!errors.description?.message}
                  {...field}
                />
              )}
            />

            {!!game.images?.length && (
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography component="span">Images</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <ImageList cols={3} gap={8}>
                    {game.images.map((item) => (
                      <ImageListItem key={item}>
                        <img srcSet={item} src={item} loading="lazy" />
                      </ImageListItem>
                    ))}
                  </ImageList>
                </AccordionDetails>
              </Accordion>
            )}

            {!readonly && (
              <Button variant="contained" type="submit" disabled={loading}>
                Submit
              </Button>
            )}
          </Stack>
        </Stack>
      </Grid2>
    </form>
  )
}

export { EditGameForm }
