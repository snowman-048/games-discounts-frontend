import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { Button, IconButton, ImageList, ImageListItem, Stack } from '@mui/material'
import * as yup from 'yup'

import { generateImage } from '@/api/openai'
import { CustomToast } from '@/utils/custom-toast'

import { Input } from '../ui/input'
import { Modal } from '../ui/modal'

type TProps = {
  open: boolean
  handleClose: () => void
  onGenerated: (images: string) => void
}

const defaultValues = {
  prompt: '',
  amount: 1,
}

const validationSchema = yup.object({
  prompt: yup.string().required(),
  amount: yup.number().required().max(5).min(1),
})

const GenerateImageModal = ({ open, handleClose, onGenerated }: TProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isPickOpen, setIsPickOpen] = useState(false)
  const [pickOptions, setPickOptions] = useState<string[]>([])

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
    disabled: isLoading,
  })

  const onClose = () => {
    setIsPickOpen(false)
    setPickOptions([])
    handleClose()
  }

  const onPickImage = (image = '') => {
    onClose()
    onGenerated(image)
  }

  const submit: SubmitHandler<typeof defaultValues> = async (payload) => {
    try {
      setIsLoading(true)
      const { data } = await generateImage({ prompt: payload.prompt, n: payload.amount })
      if (data.length > 1) {
        setPickOptions(data)
        setIsPickOpen(true)
      } else {
        onPickImage(data[0])
      }
    } catch (err) {
      CustomToast('error', `Error generating image: ${(err as Error).message}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Modal open={open} onClose={onClose} title="Generate Image">
        <form style={{ width: '100%' }} onSubmit={handleSubmit(submit)}>
          <Stack gap={2} paddingTop={1}>
            <Controller
              name="prompt"
              control={control}
              render={({ field: { ref, ...rest } }) => (
                <Input
                  variant="outlined"
                  label="Prompt"
                  size="small"
                  multiline
                  error={errors.prompt?.message}
                  {...rest}
                />
              )}
            />

            <Controller
              name="amount"
              control={control}
              render={({ field: { ref, onChange, ...rest } }) => (
                <Input
                  variant="outlined"
                  label="Amount"
                  size="small"
                  multiline
                  onChange={(value) => {
                    onChange(+value || 1)
                  }}
                  error={errors.amount?.message}
                  {...rest}
                />
              )}
            />

            <Button type="submit" variant="contained" loading={isLoading}>
              Generate
            </Button>
          </Stack>
        </form>
      </Modal>

      <Modal
        open={isPickOpen}
        onClose={() => {
          setIsPickOpen(false)
          setPickOptions([])
        }}
        title="Pick an image"
      >
        <ImageList cols={1} gap={8}>
          {pickOptions.map((item) => (
            <ImageListItem key={item} sx={{ position: 'relative' }}>
              <img srcSet={item} src={item} loading="lazy" />
              <IconButton
                onClick={() => onPickImage(item)}
                sx={{ position: 'absolute', top: 0, right: 0, width: 'fit-content' }}
              >
                <CheckCircleOutlineIcon />
              </IconButton>
            </ImageListItem>
          ))}
        </ImageList>
      </Modal>
    </>
  )
}

export { GenerateImageModal }
