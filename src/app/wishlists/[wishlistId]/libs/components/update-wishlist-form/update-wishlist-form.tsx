import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Button, Checkbox, FormControlLabel, Grid2, Stack } from '@mui/material'

import { deleteWishlist, updateWishlist } from '@/api/wishlist'
import { TUpdateWishlistPayload } from '@/api/wishlist/types'
import { Input } from '@/components/ui/input'
import { Popover } from '@/components/ui/popover'
import { TypographyV2 } from '@/components/ui/typography'
import { EAppRoute } from '@/enums/app-route.enum'
import { useCustomNavigate } from '@/hooks/useCustomNavigate'
import { useUserStore } from '@/store/user.store'
import { TWishlistWithGames } from '@/types/wishlist.types'
import { CustomToast } from '@/utils/custom-toast'
import { createWishlistSchema } from '@/validation/wishlist.validation'

type Tprops = {
  wishlist: TWishlistWithGames
  setWishlist: (payload: TWishlistWithGames) => void
}

const UpdateWishlistForm = ({ wishlist, setWishlist }: Tprops) => {
  const user = useUserStore((state) => state.user)
  const setUser = useUserStore((state) => state.setUser)
  const replaceWishlist = useUserStore((state) => state.replaceWishlist)

  const [isLoading, setIsLoading] = useState(false)
  const [deleteButtonAnchorEl, setDeleteButtonAnchorEl] = useState<HTMLButtonElement | null>(null)

  const navigate = useCustomNavigate()

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

  const handleDeleteWishlist = async () => {
    try {
      setIsLoading(true)
      const { data } = await deleteWishlist(wishlist.id)
      setUser({
        ...user,
        wishlists: user?.wishlists.filter((item) => item.id !== data.id),
      } as any)
      CustomToast('success', 'Wishlist deleted')
      navigate({ path: `/${EAppRoute.WISHLISTS}`, replace: true })
    } catch (err) {
      CustomToast('error', (err as Error).message)
      setIsLoading(false)
    }
  }

  return (
    <>
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
            <Button
              type="submit"
              variant="contained"
              loading={isLoading}
              sx={{ padding: 0.75, minWidth: 0 }}
            >
              <EditIcon />
            </Button>
            <Button
              type="button"
              variant="contained"
              loading={isLoading}
              sx={{ padding: 0.75, minWidth: 0, background: 'var(--color-red)' }}
              onClick={(e) => setDeleteButtonAnchorEl(e.currentTarget)}
            >
              <DeleteIcon />
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

      <Popover
        anchorEl={deleteButtonAnchorEl}
        onClose={() => setDeleteButtonAnchorEl(null)}
        maxWidth={250}
        withBackdrop={false}
        fixedWidth
      >
        <Stack gap={1.5}>
          <TypographyV2>Are you sure you want to delete this wishlist?</TypographyV2>

          <Grid2 container alignItems="center" justifyContent="flex-end" gap={1}>
            <Button
              variant="contained"
              size="small"
              onClick={() => setDeleteButtonAnchorEl(null)}
              disabled={isLoading}
            >
              NO
            </Button>
            <Button
              variant="outlined"
              size="small"
              loading={isLoading}
              onClick={handleDeleteWishlist}
            >
              YES
            </Button>
          </Grid2>
        </Stack>
      </Popover>
    </>
  )
}

export { UpdateWishlistForm }
