'use client'

import { Stack } from '@mui/material'

import { Modal } from '@/components/ui/modal'
import { GoogleAuthButton } from '@/utils/google-auth'

import { TypographyV2 } from '../ui/typography'

type TProps = {
  open: boolean
  handleClose: () => void
}

const LoginModal = ({ open, handleClose }: TProps) => {
  return (
    <Modal open={open} onClose={handleClose} title="Login/Signup">
      <Stack gap={2} alignItems="center">
        <TypographyV2 color="brand" fontWeight="bold" fontSize="text-2xl" handwritten>
          New authentication methods will be available soon
        </TypographyV2>

        <GoogleAuthButton onSuccess={handleClose} />
      </Stack>
    </Modal>
  )
}

export { LoginModal }
