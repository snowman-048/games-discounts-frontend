import { useMemo, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Stack } from '@mui/material'
import { useTranslations } from 'next-intl'
import * as yup from 'yup'

import { login } from '@/api/auth'
import { Input } from '@/components/ui/input'
import { TypographyV2 } from '@/components/ui/typography'
import { useHandleLogin } from '@/hooks/useHandleLogin.hook'
import { CustomToast } from '@/utils/custom-toast'
import { passwordSchema } from '@/validation/user.validation'

const defaultValues = {
  login: '',
  password: '',
}

type TProps = {
  onRegister: () => void
}

const LoginForm = ({ onRegister }: TProps) => {
  const t = useTranslations()

  const [isLoading, setIsLoading] = useState(false)

  const { handleLogin } = useHandleLogin()

  const validationSchema = useMemo(
    () =>
      yup.object({
        login: yup.string().required(t('validation.field_required')),
        password: passwordSchema(t),
      }),
    [t],
  )

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
    disabled: isLoading,
  })

  const submit: SubmitHandler<typeof defaultValues> = async (payload) => {
    try {
      setIsLoading(true)

      const { data } = await login(payload)

      handleLogin(data)

      CustomToast('success', t('LoginForm.success_message'))
    } catch (err) {
      CustomToast('error', (err as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form style={{ width: '100%' }} onSubmit={handleSubmit(submit)}>
      <Stack gap={2} width="100%" paddingTop={1}>
        <Controller
          name="login"
          control={control}
          render={({ field: { ref, ...rest } }) => (
            <Input
              variant="outlined"
              label={t('LoginForm.username_or_email')}
              size="small"
              error={errors.login?.message}
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

        <Button variant="contained" type="submit" loading={isLoading}>
          {t('LoginForm.login')}
        </Button>

        <Stack alignItems="center">
          <TypographyV2 textAlign="center">{t('LoginForm.no_account')}</TypographyV2>

          <Button sx={{ width: 'fit-content' }} onClick={onRegister} disabled={isLoading}>
            {t('LoginForm.register')}
          </Button>
        </Stack>
      </Stack>
    </form>
  )
}

export { LoginForm }
