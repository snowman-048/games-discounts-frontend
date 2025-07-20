import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import EditNoteIcon from '@mui/icons-material/EditNote'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import PolylineIcon from '@mui/icons-material/Polyline'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { Autocomplete, Box, Button, Chip, Grid2, IconButton, Stack, TextField } from '@mui/material'
import * as yup from 'yup'

import { htmlContentValidation } from '@/validation/article.validation'

import { CustomArticle } from '../custom-article'
import { GenerateImageModal } from '../generate-image-modal'
import { SectionTitle } from '../section-title'
import { GlassCard } from '../ui/cards/glass-card'
import { Input } from '../ui/input'
import { TextEditor } from '../ui/text-editor'

type TArticleFormValues = {
  title: string
  content: string
  socialsContent: string
  image?: string
  focusKeyphrase: string
  keywords: string[]
  hashtags: string[]
  articleDescription: string
  metaDescription: string
  sourceUrl: string
}

const defaultValues = {
  title: '',
  content: '',
  articleDescription: '',
  metaDescription: '',
  socialsContent: '',
  image: '',
  focusKeyphrase: '',
  keywords: [],
  hashtags: [],
  sourceUrl: '',
}

const validationSchema = yup.object({
  title: yup.string().required().trim(),
  content: htmlContentValidation,
  socialsContent: htmlContentValidation,
  articleDescription: htmlContentValidation,
  metaDescription: htmlContentValidation,
  image: yup.string().optional(),
  focusKeyphrase: yup.string().default(''),
  keywords: yup.array(yup.string().required()).default([]),
  hashtags: yup.array(yup.string().required()).default([]),
  sourceUrl: yup.string().default(''),
})

type TProps = {
  onSubmit: SubmitHandler<TArticleFormValues>
  defaultValues?: TArticleFormValues
  submitBtnText?: string
  disabled?: boolean
}

const EditArticleForm = ({
  defaultValues: parentDefaultValues = defaultValues,
  onSubmit,
  submitBtnText = 'Submit',
  disabled,
}: TProps) => {
  const [isPreview, setIsPreview] = useState(false)
  const [previewData, setPreviewData] = useState<TArticleFormValues | null>(null)
  const [generateImageModalOpen, setGenerateImageModalOpen] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm({
    defaultValues: parentDefaultValues,
    resolver: yupResolver(validationSchema),
    disabled,
  })

  const submit: SubmitHandler<TArticleFormValues> = async (payload) => {
    console.log('payload', payload)
    onSubmit(payload)
  }

  const togglePreview = () => {
    if (isPreview) {
      setIsPreview(false)
      return
    }

    const values = getValues()
    if (validationSchema.isValidSync(values)) {
      setPreviewData(values)
      setIsPreview(true)
    }
  }

  return (
    <>
      <form style={{ width: '100%' }} onSubmit={handleSubmit(submit)}>
        <Stack gap={2}>
          {isPreview && previewData && <CustomArticle {...previewData} />}

          {!isPreview && (
            <GlassCard width="100%" padding={2} overflow="visible">
              <Stack gap={2} width="100%">
                <SectionTitle title="Main Info" />

                <Controller
                  name="title"
                  control={control}
                  render={({ field: { ref, ...rest } }) => (
                    <Input
                      variant="outlined"
                      label="Title"
                      size="small"
                      error={errors.title?.message}
                      {...rest}
                    />
                  )}
                />

                <Controller
                  name="image"
                  control={control}
                  render={({ field: { ref, value, ...rest } }) => (
                    <Stack gap={2}>
                      {!!value && (
                        <Box sx={{ width: '100%', maxWidth: '500px' }}>
                          <img src={value} alt="" width="100%" />
                        </Box>
                      )}
                      <Grid2 container gap={2}>
                        <Input
                          variant="outlined"
                          value={value}
                          label="Image src"
                          size="small"
                          error={errors.image?.message}
                          {...rest}
                        />
                        <IconButton onClick={() => setGenerateImageModalOpen(true)}>
                          <PolylineIcon />
                        </IconButton>
                      </Grid2>
                    </Stack>
                  )}
                />

                <Controller
                  name="sourceUrl"
                  control={control}
                  render={({ field: { ref, value, ...rest } }) => (
                    <Grid2 container flexWrap="nowrap" alignItems="center" gap={2}>
                      <Input
                        variant="outlined"
                        label="Source URL"
                        size="small"
                        value={value}
                        error={errors.sourceUrl?.message}
                        {...rest}
                      />
                      <a
                        href={value}
                        target="_blank"
                        style={{ textDecoration: 'underline', fontSize: '12px' }}
                      >
                        <IconButton>
                          <OpenInNewIcon />
                        </IconButton>
                      </a>
                    </Grid2>
                  )}
                />

                <Controller
                  name="articleDescription"
                  control={control}
                  render={({ field: { ref, ...rest } }) => (
                    <TextEditor
                      label="Article Description"
                      error={!!errors.articleDescription?.message}
                      {...rest}
                    />
                  )}
                />

                <Controller
                  name="content"
                  control={control}
                  render={({ field: { ref, ...rest } }) => (
                    <TextEditor label="Content" error={!!errors.content?.message} {...rest} />
                  )}
                />

                <SectionTitle title="Metadata" />

                <Controller
                  name="focusKeyphrase"
                  control={control}
                  render={({ field: { ref, ...rest } }) => (
                    <Input
                      variant="outlined"
                      label="Focus keyphrase"
                      size="small"
                      error={errors.focusKeyphrase?.message}
                      {...rest}
                    />
                  )}
                />

                <Controller
                  name="keywords"
                  control={control}
                  render={({ field: { ref, onChange, ...rest } }) => (
                    <Autocomplete
                      multiple
                      options={[]}
                      freeSolo
                      onChange={(_, newValue) => {
                        onChange(newValue)
                      }}
                      renderTags={(tagValue, getTagProps) =>
                        tagValue.map((option, index) => (
                          <Chip {...getTagProps({ index })} key={option} label={option} />
                        ))
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Keywords"
                          placeholder="Keywords"
                          error={!!errors.keywords?.message}
                        />
                      )}
                      {...rest}
                    />
                  )}
                />

                <Controller
                  name="metaDescription"
                  control={control}
                  render={({ field: { ref, ...rest } }) => (
                    <Input
                      variant="outlined"
                      label="Meta Description"
                      size="small"
                      error={errors.metaDescription?.message}
                      multiline
                      {...rest}
                    />
                  )}
                />

                <SectionTitle title="Social Info" />

                <Controller
                  name="socialsContent"
                  control={control}
                  render={({ field: { ref, ...rest } }) => (
                    <Input
                      variant="outlined"
                      label="Socials Content"
                      size="small"
                      error={errors.socialsContent?.message}
                      multiline
                      {...rest}
                    />
                  )}
                />

                <Controller
                  name="hashtags"
                  control={control}
                  render={({ field: { ref, onChange, ...rest } }) => (
                    <Autocomplete
                      multiple
                      options={[]}
                      freeSolo
                      renderTags={(tagValue, getTagProps) =>
                        tagValue.map((option, index) => (
                          <Chip {...getTagProps({ index })} key={option} label={option} />
                        ))
                      }
                      onChange={(_, newValue) => {
                        onChange(newValue)
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Hashtags"
                          placeholder="Hashtags"
                          error={!!errors.hashtags?.message}
                        />
                      )}
                      {...rest}
                    />
                  )}
                />
              </Stack>
            </GlassCard>
          )}

          <Grid2 container justifyContent="flex-end" gap={2}>
            <IconButton onClick={togglePreview} disabled={disabled}>
              {isPreview ? <EditNoteIcon /> : <VisibilityIcon />}
            </IconButton>
            <Button variant="contained" type="submit" disabled={disabled}>
              {submitBtnText}
            </Button>
          </Grid2>
        </Stack>
      </form>

      <GenerateImageModal
        open={generateImageModalOpen}
        handleClose={() => setGenerateImageModalOpen(false)}
        onGenerated={(image) => setValue('image', image || '')}
      />
    </>
  )
}

export { EditArticleForm }
export type { TArticleFormValues }
