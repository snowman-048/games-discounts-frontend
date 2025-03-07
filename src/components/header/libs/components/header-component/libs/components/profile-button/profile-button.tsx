'use client'

import { useEffect, useState } from 'react'

import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { IconButton, IconButtonProps, Popover } from '@mui/material'

import { useUserStore } from '@/store/user.store'

import { LoginModal } from './libs/components/login-modal'
import { ProfileControls } from './libs/components/profile-controls'

type TProps = IconButtonProps

const ProfileButton = (props: TProps) => {
  const user = useUserStore((state) => state.user)
  const isUserLoading = useUserStore((state) => state.isUserLoading)

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [userControlsAnchorEl, setUserControlsAnchorEl] = useState<HTMLButtonElement | null>(null)

  useEffect(() => {
    setIsLoginModalOpen(false)
    setUserControlsAnchorEl(null)
  }, [user])

  return (
    <>
      <IconButton
        onClick={(e) => {
          if (!user) {
            setIsLoginModalOpen(true)
            return
          }
          setUserControlsAnchorEl(e.currentTarget)
        }}
        loading={isUserLoading}
        {...props}
      >
        <AccountCircleIcon />
      </IconButton>

      <LoginModal open={isLoginModalOpen} handleClose={() => setIsLoginModalOpen(false)} />

      <Popover
        open={!!userControlsAnchorEl}
        anchorEl={userControlsAnchorEl}
        onClose={() => setUserControlsAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transitionDuration={100}
        slotProps={{
          root: {
            slotProps: {
              backdrop: {
                sx: {
                  background: 'var(--backdrop)',
                  transitionDuration: 100,
                },
              },
            },
          },
          paper: {
            sx: {
              background: 'transparent',
              boxShadow: 'none',
              width: { xs: '100%', sm: '300px' },
            },
          },
        }}
      >
        <ProfileControls closePopup={() => setUserControlsAnchorEl(null)} />
      </Popover>
    </>
  )
}

export { ProfileButton }
