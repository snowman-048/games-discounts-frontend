'use client'

import { useEffect, useState } from 'react'

import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { IconButton, IconButtonProps } from '@mui/material'

import { Avatar } from '@/components/ui/avatar'
import { Popover } from '@/components/ui/popover'
import { Tooltip } from '@/components/ui/tooltip'
import { useUserStore } from '@/store/user.store'

import { LoginModal } from '../../../../../../../login-modal'
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
      <Tooltip title={isUserLoading ? null : user ? 'Profile' : 'Login'}>
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
          {user && !isUserLoading ? <Avatar user={user} /> : <AccountCircleIcon />}
        </IconButton>
      </Tooltip>

      <LoginModal open={isLoginModalOpen} handleClose={() => setIsLoginModalOpen(false)} />

      <Popover
        anchorEl={userControlsAnchorEl}
        onClose={() => setUserControlsAnchorEl(null)}
        maxWidth={300}
      >
        <ProfileControls closePopup={() => setUserControlsAnchorEl(null)} />
      </Popover>
    </>
  )
}

export { ProfileButton }
