'use client'

import { useMemo, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Stack } from '@mui/material'
import { useTranslations } from 'next-intl'
import * as yup from 'yup'

import { Input } from '@/components/ui/input'
import { Modal } from '@/components/ui/modal'
import { CustomToast } from '@/utils/custom-toast'

type TProps = {
  email?: string | null
  handleClose: () => void
  onConfirm: (code: string) => Promise<void>
}

const defaultValues = {
  code: '',
}

const EmailConfirmModal = ({ email, handleClose, onConfirm }: TProps) => {
  const t = useTranslations()

  const [isLoading, setIsLoading] = useState(false)

  const validationSchema = useMemo(
    () => yup.object({ code: yup.string().required(t('validation.field_required')) }),
    [t],
  )

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
    disabled: isLoading,
  })

  const submit: SubmitHandler<typeof defaultValues> = async (payload) => {
    try {
      setIsLoading(true)
      await onConfirm(payload.code)
    } catch (err) {
      CustomToast('error', (err as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal
      open={!!email}
      onClose={() => {
        handleClose()
        reset()
      }}
      title={t('EmailConfirmModal.confirm_email')}
    >
      <form style={{ width: '100%' }} onSubmit={handleSubmit(submit)}>
        <Stack gap={2} width="100%" paddingTop={1}>
          <Controller
            name="code"
            control={control}
            render={({ field: { ref, ...rest } }) => (
              <Input
                variant="outlined"
                label={t('EmailConfirmModal.confirmation_code')}
                size="small"
                error={errors.code?.message}
                {...rest}
              />
            )}
          />

          <Button variant="contained" type="submit" loading={isLoading}>
            {t('confirm')}
          </Button>
        </Stack>
      </form>
    </Modal>
  )
}

export { EmailConfirmModal }
