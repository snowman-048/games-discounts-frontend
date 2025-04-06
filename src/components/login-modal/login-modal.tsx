'use client'

import { Stack } from '@mui/material'
import { useTranslations } from 'use-intl'

import { Modal } from '@/components/ui/modal'
import { GoogleAuthButton } from '@/utils/google-auth'

import { TypographyV2 } from '../ui/typography'

type TProps = {
  open: boolean
  handleClose: () => void
}

const LoginModal = ({ open, handleClose }: TProps) => {
  const t = useTranslations('LoginModal')

  return (
    <Modal open={open} onClose={handleClose} title={t('login_signup')}>
      <Stack gap={2} alignItems="center">
        <TypographyV2 color="brand" fontWeight="bold" fontSize="text-2xl" handwritten>
          {t('new_methods')}
        </TypographyV2>

        <GoogleAuthButton onSuccess={handleClose} />
      </Stack>
    </Modal>
  )
}

export { LoginModal }
