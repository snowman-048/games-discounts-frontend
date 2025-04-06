'use client'

import { useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Checkbox, FormControlLabel, Stack } from '@mui/material'
import { useTranslations } from 'next-intl'

import { createWishlist } from '@/api/wishlist'
import { Modal } from '@/components/ui/modal'
import { useUserStore } from '@/store/user.store'
import { createWishlistSchema } from '@/validation/wishlist.validation'

import { Input } from '../ui/input'

type TProps = {
  open: boolean
  handleClose: () => void
}

const defaultValues = {
  name: '',
  discountNotificationByEmail: true,
}

const CreateWishlistModal = ({ open, handleClose }: TProps) => {
  const t = useTranslations()

  const addWishlist = useUserStore((state) => state.addWishlist)

  const [isLoading, setIsLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(createWishlistSchema(t)),
    defaultValues,
  })

  const submit: SubmitHandler<typeof defaultValues> = async (data) => {
    try {
      setIsLoading(true)

      const { data: newWishlist } = await createWishlist(data)
      addWishlist(newWishlist)
      handleClose()
    } catch (err) {
      console.log('Error creating wishlist', (err as any).message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!open) {
      reset()
    }
  }, [open])

  return (
    <Modal open={open} onClose={handleClose} title={t('CreateWishlistModal.create_wishlist')}>
      <form style={{ width: '100%' }} onSubmit={handleSubmit(submit)}>
        <Stack width={'100%'} gap={2} paddingTop={1}>
          <Controller
            name="name"
            control={control}
            render={({ field: { ref, ...rest } }) => (
              <Input
                variant="outlined"
                label={t('CreateWishlistModal.name')}
                size="small"
                error={errors.name?.message}
                {...rest}
              />
            )}
          />

          <Controller
            name="discountNotificationByEmail"
            control={control}
            render={({ field: { ref, onChange, value, ...rest } }) => (
              <FormControlLabel
                control={<Checkbox checked={value} />}
                label={t('CreateWishlistModal.email_label')}
                value={value}
                onChange={(_, value) => onChange(value)}
                sx={{ marginTop: { xs: -1, md: 0 } }}
                {...rest}
              />
            )}
          />

          <Button type="submit" variant="contained" fullWidth loading={isLoading}>
            {t('CreateWishlistModal.create')}
          </Button>
        </Stack>
      </form>
    </Modal>
  )
}

export { CreateWishlistModal }
