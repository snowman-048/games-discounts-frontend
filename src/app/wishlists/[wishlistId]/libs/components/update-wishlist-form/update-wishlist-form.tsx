import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Checkbox, FormControlLabel, Grid2, Stack } from '@mui/material'

import { updateWishlist } from '@/api/wishlist'
import { TUpdateWishlistPayload } from '@/api/wishlist/types'
import { Input } from '@/components/ui/input'
import { useUserStore } from '@/store/user.store'
import { TWishlistWithGames } from '@/types/wishlist.types'
import { CustomToast } from '@/utils/custom-toast'
import { createWishlistSchema } from '@/validation/wishlist.validation'

type Tprops = {
  wishlist: TWishlistWithGames
  setWishlist: (payload: TWishlistWithGames) => void
}

const UpdateWishlistForm = ({ wishlist, setWishlist }: Tprops) => {
  const replaceWishlist = useUserStore((state) => state.replaceWishlist)

  const [isLoading, setIsLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createWishlistSchema),
    defaultValues: {
      name: wishlist.name,
      discountNotificationByEmail: wishlist.discountNotificationByEmail,
    },
    disabled: isLoading,
  })

  const updateInfo = async (newData: TUpdateWishlistPayload) => {
    if (isLoading) {
      return
    }
    try {
      setIsLoading(true)
      const { data } = await updateWishlist(wishlist.id, newData)
      replaceWishlist(wishlist.id, data)
      setWishlist(data)
      CustomToast('success', 'Wishlist updated')
    } catch (err) {
      CustomToast('error', (err as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(updateInfo)}>
      <Stack gap={2}>
        <Grid2 container alignItems="center" gap={2}>
          <Controller
            name="name"
            control={control}
            render={({ field: { ref, ...rest } }) => (
              <Input
                variant="outlined"
                label="Name"
                size="small"
                error={errors.name?.message}
                {...rest}
              />
            )}
          />
          <Button type="submit" variant="contained" loading={isLoading}>
            Rename
          </Button>
        </Grid2>

        <Controller
          name="discountNotificationByEmail"
          control={control}
          render={({ field: { ref, onChange, value, ...rest } }) => (
            <FormControlLabel
              control={<Checkbox checked={value} />}
              label="Receive email notifications about new discounts for items in this wishlist"
              value={value}
              onChange={(_, value) => {
                onChange(value)
                updateInfo({ discountNotificationByEmail: value })
              }}
              {...rest}
            />
          )}
        />
      </Stack>
    </form>
  )
}

export { UpdateWishlistForm }
