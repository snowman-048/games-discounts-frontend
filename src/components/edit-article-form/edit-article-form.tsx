import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import EditNoteIcon from '@mui/icons-material/EditNote'
import PolylineIcon from '@mui/icons-material/Polyline'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { Box, Button, Grid2, IconButton, Stack } from '@mui/material'
import * as yup from 'yup'

import { CustomArticle } from '../custom-article'
import { GlassCard } from '../ui/cards/glass-card'
import { Input } from '../ui/input'
import { TextEditor } from '../ui/text-editor'

type TArticleFormValues = {
  title: string
  content: string
  image?: string
}

const defaultValues = {
  title: '',
  content: '',
  image: '',
}

const validationSchema = yup.object({
  title: yup.string().required().trim(),
  content: yup
    .string()
    .required()
    .test((value) => !!value.replaceAll('<p><br></p>', '').replaceAll('<p></p>', '').length),
  image: yup.string().optional().default(''),
})

type TProps = {
  onSubmit: SubmitHandler<typeof defaultValues>
  defaultValues?: typeof defaultValues
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
  const [previewData, setPreviewData] = useState<typeof defaultValues | null>(null)

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: parentDefaultValues,
    resolver: yupResolver(validationSchema),
    disabled,
  })

  const submit: SubmitHandler<typeof defaultValues> = async (payload) => {
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

  const onGenerateImage = async () => {}

  return (
    <form style={{ width: '100%' }} onSubmit={handleSubmit(submit)}>
      <Stack gap={2}>
        {isPreview && previewData && <CustomArticle {...previewData} />}

        {!isPreview && (
          <GlassCard width="100%" padding={2} overflow="visible">
            <Stack gap={2} width="100%">
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
                      <IconButton onClick={onGenerateImage}>
                        <PolylineIcon />
                      </IconButton>
                    </Grid2>
                  </Stack>
                )}
              />

              <Controller
                name="content"
                control={control}
                render={({ field: { ref, ...rest } }) => (
                  <TextEditor label="Content" error={!!errors.content?.message} {...rest} />
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
  )
}

export { EditArticleForm }
export type { TArticleFormValues }
