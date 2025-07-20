import { useMemo, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { Button, Stack } from '@mui/material'
import { useTranslations } from 'next-intl'
import * as yup from 'yup'

import { checkUsername } from '@/api/account'
import { checkEmail, signup } from '@/api/auth'
import { Input } from '@/components/ui/input'
import { TypographyV2 } from '@/components/ui/typography'
import { useDebounce } from '@/hooks/useDebounce'
import { useHandleLogin } from '@/hooks/useHandleLogin'
import { CustomToast } from '@/utils/custom-toast'
import { emailSchema, passwordSchema, usernameSchema } from '@/validation/user.validation'

import { EmailConfirmModal } from './libs/components/email-confirm-modal'

const defaultValues = {
  username: '',
  email: '',
  password: '',
  repeatPassword: '',
}

type TProps = {
  onLogin: () => void
}

const RegisterForm = ({ onLogin }: TProps) => {
  const t = useTranslations()

  const [isUsernameAvailable, setIsUsernameAvailable] = useState(true)
  const [isUsernameChecking, setIsUsernameChecking] = useState(false)
  const [isUsernameChecked, setIsUsernameChecked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [savedData, setSavedData] = useState<typeof defaultValues | null>(null)

  const { prepareRegions, handleLogin } = useHandleLogin()

  const validationSchema = useMemo(
    () =>
      yup.object({
        username: usernameSchema(t),
        email: emailSchema(t),
        password: passwordSchema(t),
        repeatPassword: passwordSchema(t).oneOf(
          [yup.ref('password')],
          t('validation.user.password_match'),
        ),
      }),
    [t],
  )

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
    disabled: isLoading,
  })

  const usernameValue = watch('username')
  const isUsernameValid = useMemo(
    () => usernameSchema(t).isValidSync(usernameValue),
    [usernameValue],
  )

  const usernameAddornment = useMemo(() => {
    if (isUsernameChecking || !isUsernameChecked || !isUsernameAvailable || !isUsernameValid) {
      return <></>
    }
    return <CheckCircleOutlineIcon sx={{ color: 'var(--color-green)' }} />
  }, [isUsernameValid, isUsernameAvailable, isUsernameChecking, isUsernameChecked])

  const usernameAvailableError = useMemo(() => {
    if (isUsernameChecking || !isUsernameChecked || isUsernameAvailable || !isUsernameValid) {
      return ''
    }
    return t('validation.user.username_taken')
  }, [isUsernameAvailable, isUsernameChecking, isUsernameValid, isUsernameChecked, t])

  const validateUsername = async (username: string) => {
    if (!usernameSchema(t).isValidSync(username)) {
      return
    }

    try {
      setIsUsernameChecking(true)
      const { data } = await checkUsername(username.trim())
      setIsUsernameAvailable(!data)
    } catch (err) {
      setIsUsernameAvailable(false)
    } finally {
      setIsUsernameChecked(true)
      setIsUsernameChecking(false)
    }
  }

  const checkUsernameDebounced = useDebounce({ debounceTimeout: 700, handler: validateUsername })

  const createAccount = async (verificationCode: string) => {
    const payload = savedData

    if (!payload) {
      return
    }

    try {
      setIsLoading(true)

      const cookieRegions = prepareRegions()

      const { data } = await signup({ ...payload, verificationCode, regions: cookieRegions })

      handleLogin(data)

      CustomToast('success', t('RegisterForm.success_message'))
    } catch (err) {
      CustomToast('error', (err as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  const submit: SubmitHandler<typeof defaultValues> = async (payload) => {
    if (!isUsernameAvailable) {
      return
    }
    try {
      setIsLoading(true)

      await checkEmail(payload.email)

      setSavedData(payload)
    } catch (err) {
      CustomToast('error', (err as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <form style={{ width: '100%' }} onSubmit={handleSubmit(submit)}>
        <Stack gap={2} width="100%" paddingTop={1}>
          <Controller
            name="username"
            control={control}
            render={({ field: { ref, onChange, ...rest } }) => (
              <Input
                variant="outlined"
                label={t('user.username')}
                size="small"
                error={errors.username?.message || usernameAvailableError}
                onChange={(value) => {
                  onChange(value)
                  setIsUsernameChecked(false)
                  checkUsernameDebounced(value)
                }}
                loading={isUsernameChecking}
                endAdornment={usernameAddornment}
                {...rest}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field: { ref, ...rest } }) => (
              <Input
                variant="outlined"
                label={t('user.email')}
                size="small"
                error={errors.email?.message}
                {...rest}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field: { ref, ...rest } }) => (
              <Input
                variant="outlined"
                label={t('user.password')}
                size="small"
                type="password"
                error={errors.password?.message}
                {...rest}
              />
            )}
          />
          <Controller
            name="repeatPassword"
            control={control}
            render={({ field: { ref, ...rest } }) => (
              <Input
                variant="outlined"
                label={t('user.repeat_password')}
                size="small"
                type="password"
                error={errors.repeatPassword?.message}
                {...rest}
              />
            )}
          />

          <Button variant="contained" type="submit" loading={isLoading}>
            {t('RegisterForm.create_account')}
          </Button>

          <Stack alignItems="center">
            <TypographyV2 textAlign="center">{t('RegisterForm.have_account')}</TypographyV2>

            <Button sx={{ width: 'fit-content' }} onClick={onLogin} disabled={isLoading}>
              {t('RegisterForm.login')}
            </Button>
          </Stack>
        </Stack>
      </form>

      <EmailConfirmModal
        email={savedData?.email}
        handleClose={() => setSavedData(null)}
        onConfirm={createAccount}
      />
    </>
  )
}

export { RegisterForm }
