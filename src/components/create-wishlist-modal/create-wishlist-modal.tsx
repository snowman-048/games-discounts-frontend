'use client'

import { useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Checkbox, FormControlLabel, Stack, TextField } from '@mui/material'
import * as yup from 'yup'

import { createWishlist } from '@/api/wishlist'
import { Modal } from '@/components/ui/modal'
import { useUserStore } from '@/store/user.store'

type TProps = {
  open: boolean
  handleClose: () => void
}

const validationSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name must be at most 50 characters'),
  discountNotificationByEmail: yup.boolean().required(),
})

const defaultValues = {
  name: '',
  discountNotificationByEmail: true,
}

const CreateWishlistModal = ({ open, handleClose }: TProps) => {
  const addWishlist = useUserStore((state) => state.addWishlist)

  const [isLoading, setIsLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
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
    <Modal open={open} onClose={handleClose} title="Create Wishlist">
      <form style={{ width: '100%' }} onSubmit={handleSubmit(submit)}>
        <Stack width={'100%'} gap={2}>
          <Controller
            name="name"
            control={control}
            render={({ field: { ref, onChange, ...rest } }) => (
              <TextField
                variant="outlined"
                label="Name"
                sx={{ flex: 1 }}
                size="small"
                error={!!errors.name?.message}
                onChange={(e) => {
                  const value = e.target.value
                  onChange(value)
                }}
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
                label="Receive email notifications about new discounts for items in this wishlist"
                value={value}
                onChange={(_, value) => onChange(value)}
                sx={{ marginTop: { xs: -1, md: 0 } }}
                {...rest}
              />
            )}
          />

          <Button type="submit" variant="contained" fullWidth loading={isLoading}>
            Create
          </Button>
        </Stack>
      </form>
    </Modal>
  )
}

export { CreateWishlistModal }
