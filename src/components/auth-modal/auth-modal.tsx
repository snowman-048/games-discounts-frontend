'use client'

import { useEffect, useState } from 'react'

import { Divider, Stack } from '@mui/material'
import { useTranslations } from 'use-intl'

import { Modal } from '@/components/ui/modal'
import { GoogleAuthButton } from '@/utils/google-auth'

import { TypographyV2 } from '../ui/typography'
import { LoginForm } from './libs/components/login-form'
import { RegisterForm } from './libs/components/register-form'

type TProps = {
  open: boolean
  handleClose: () => void
}

enum EAuthMode {
  LOGIN = 'login',
  REGISTER = 'register',
}

const AuthModal = ({ open, handleClose }: TProps) => {
  const t = useTranslations('AuthModal')

  const [mode, setMode] = useState(EAuthMode.LOGIN)

  useEffect(() => {
    if (open) {
      setMode(EAuthMode.LOGIN)
    }
  }, [open])

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={mode === EAuthMode.LOGIN ? t('login') : t('signup')}
    >
      <Stack gap={2} alignItems="center">
        {mode === EAuthMode.LOGIN && <LoginForm onRegister={() => setMode(EAuthMode.REGISTER)} />}
        {mode === EAuthMode.REGISTER && <RegisterForm onLogin={() => setMode(EAuthMode.LOGIN)} />}

        <Divider
          sx={{
            '::before': { background: 'var(--color-disabled)' },
            '::after': { background: 'var(--color-disabled)' },
            width: '100%',
            maxWidth: '250px',
            overflow: 'hidden',
          }}
        >
          <TypographyV2 sx={{ textTransform: 'uppercase' }}>{t('or')}</TypographyV2>
        </Divider>

        <GoogleAuthButton onSuccess={handleClose} />
      </Stack>
    </Modal>
  )
}

export { AuthModal }
