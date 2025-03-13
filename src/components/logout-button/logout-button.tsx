'use client'

import { useState } from 'react'

import LogoutIcon from '@mui/icons-material/Logout'
import { Button, ButtonProps, Grid2, Stack } from '@mui/material'

import { logout } from '@/helpers/logout'

import { Popover } from '../ui/popover'
import { TypographyV2 } from '../ui/typography'

type TProps = Omit<ButtonProps, 'onClick' | 'variant'>

const LogoutButton = ({ sx, ...rest }: TProps) => {
  const [buttonAnchorEl, setButtonAnchorEl] = useState<HTMLButtonElement | null>(null)

  return (
    <>
      <Button
        variant="contained"
        sx={{ background: 'var(--color-red)', gap: 1, color: 'var(--color-l1)', ...sx }}
        fullWidth
        onClick={(e) => {
          setButtonAnchorEl(e.currentTarget)
        }}
        {...rest}
      >
        <LogoutIcon />
        <TypographyV2 sx={{ textTransform: 'none' }} color="l1" fontWeight="semibold">
          Logout
        </TypographyV2>
      </Button>

      <Popover
        anchorEl={buttonAnchorEl}
        onClose={() => setButtonAnchorEl(null)}
        maxWidth={250}
        fitContent
        withBackdrop={false}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Stack gap={1.5}>
          <TypographyV2>Are you sure you want to logout?</TypographyV2>

          <Grid2 container alignItems="center" justifyContent="flex-end" gap={1}>
            <Button variant="contained" size="small" onClick={() => setButtonAnchorEl(null)}>
              NO
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                setButtonAnchorEl(null)
                logout()
              }}
            >
              YES
            </Button>
          </Grid2>
        </Stack>
      </Popover>
    </>
  )
}

export { LogoutButton }
