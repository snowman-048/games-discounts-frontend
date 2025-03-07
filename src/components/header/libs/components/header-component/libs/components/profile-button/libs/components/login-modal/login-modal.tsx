'use client'

import { Modal } from '@/components/ui/modal'
import { GoogleAuthButton } from '@/utils/google-auth'

type TProps = {
  open: boolean
  handleClose: () => void
}

const LoginModal = ({ open, handleClose }: TProps) => {
  return (
    <Modal open={open} onClose={handleClose} title="Login/Signup">
      <GoogleAuthButton />
    </Modal>
  )
}

export { LoginModal }
