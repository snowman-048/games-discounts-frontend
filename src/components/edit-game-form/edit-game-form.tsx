import { FC, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { yupResolver } from '@hookform/resolvers/yup'
import DeleteIcon from '@mui/icons-material/Delete'
import {
  Autocomplete,
  Button,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  Grid2,
  IconButton,
  ImageList,
  ImageListItem,
  Radio,
  RadioGroup,
  Stack,
  TextField,
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
import { Input } from '../ui/input'
import { MultipleAutocomplete } from '../ui/multiple-autocomplete'
import { Select } from '../ui/select'
import { TypographyV2 } from '../ui/typography'
import styles from './styles.module.scss'

type TProps = {
  game: TGame & { origin?: TGame; new?: TGame }
  readonly?: boolean
  customSubmit?: (data: TGame) => void
}

const storeIdConfigs = [
  { platform: EStore.PSN, name: 'psnId' },
  { platform: EStore.NINTENDO, name: 'nintendoId' },
  { platform: EStore.XBOX, name: 'xboxId' },
] as { platform: EStore; name: 'psnId' | 'nintendoId' | 'xboxId' }[]

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
  images: yup.array(yup.string()),
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
    storeIdConfigs.forEach(({ name }) => {
      ;(formattedData as any)[name] = formattedData[name] || null
    })
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

                    <Input
                      variant="outlined"
                      label="Title"
                      fullWidth
                      value={value}
                      onChange={onChange}
                      sx={isChanged('title')}
                      error={errors.title?.message}
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

            <Stack gap={2}>
              {storeIdConfigs.map(({ platform, name }) => {
                return (
                  <Controller
                    name={name as any}
                    control={control}
                    render={({ field: { ref, value, onChange, ...rest } }) => (
                      <Stack>
                        <Grid2 container alignItems="center" gap={1}>
                          <StoreIcon store={platform} withLabel={false} />
                          <Input
                            variant="outlined"
                            value={value || ''}
                            onChange={(value) => {
                              onChange(value || null)
                            }}
                            label={name}
                            fullWidth
                            sx={isChanged(name)}
                            error={errors[name]?.message}
                            {...rest}
                          />
                        </Grid2>
                        {game.origin && (
                          <RadioGroup
                            value={value || ''}
                            onChange={(e) => {
                              onChange(e.target.value || null)
                            }}
                          >
                            <Stack flexDirection="row" alignItems="center">
                              <FormControlLabel
                                value={(game.new ? game.new?.[name] : game[name]) || ''}
                                control={<Radio />}
                                label="New"
                              />
                              <FormControlLabel
                                value={game.origin?.[name] || ''}
                                control={<Radio />}
                                label="Original"
                              />
                            </Stack>
                          </RadioGroup>
                        )}
                      </Stack>
                    )}
                  />
                )
              })}
            </Stack>

            <Divider sx={{ margin: '16px 0', background: 'var(--color-brand)' }} />

            <Controller
              name="coverImageUrl"
              control={control}
              render={({ field: { value, onChange, ...rest } }) => (
                <Stack>
                  <Input
                    variant="outlined"
                    label="Cover URL"
                    fullWidth
                    value={value}
                    onChange={onChange}
                    sx={isChanged('coverImageUrl')}
                    error={errors.coverImageUrl?.message}
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
                    <Select
                      label="Type"
                      value={value}
                      options={Object.values(EGameType).map((item) => ({
                        title: item,
                        value: item,
                      }))}
                      onChange={onChange}
                      sx={isChanged('type')}
                      {...rest}
                    />
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
                <Input
                  variant="outlined"
                  label="Publisher"
                  fullWidth
                  error={errors.publisher?.message}
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
                <Input
                  variant="outlined"
                  label="Description"
                  multiline
                  fullWidth
                  error={errors.description?.message}
                  {...field}
                />
              )}
            />

            <Controller
              name="images"
              control={control}
              render={({ field: { value, onChange } }) =>
                !!value?.length ? (
                  <Stack gap={1}>
                    <TypographyV2 fontSize="heading-s" fontWeight="medium">
                      Images
                    </TypographyV2>
                    <ImageList cols={3} gap={8}>
                      {value.map((item) => (
                        <ImageListItem key={item} sx={{ position: 'relative' }}>
                          <img srcSet={item} src={item} loading="lazy" />
                          <IconButton
                            className={styles.deleteImageBtn}
                            onClick={() => onChange(value.filter((i) => i !== item))}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ImageListItem>
                      ))}
                    </ImageList>
                  </Stack>
                ) : (
                  <></>
                )
              }
            />

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
