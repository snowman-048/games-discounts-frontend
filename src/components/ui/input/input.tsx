import { JSX } from 'react'

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { Grid2, TextField, TextFieldProps, styled } from '@mui/material'

import { styledInputParams } from '@/configs/styled-input-params.config'

import { Loader } from '../loader'
import { Tooltip } from '../tooltip'

type TProps = Omit<TextFieldProps, 'onChange' | 'error'> & {
  onChange?: (value: string) => void
  error?: string
  endAdornment?: JSX.Element
  loading?: boolean
}

const StyledTextField = styled(TextField)(styledInputParams)

const Input = ({
  onChange,
  error,
  sx,
  endAdornment,
  loading,
  disabled,
  slotProps,
  ...rest
}: TProps) => {
  return (
    <StyledTextField
      sx={{ flex: 1, ...sx }}
      error={!!error}
      onChange={(e) => {
        const value = e.target.value
        onChange?.(value)
      }}
      disabled={disabled || loading}
      slotProps={{
        ...slotProps,
        input: {
          ...slotProps?.input,
          endAdornment: (
            <Grid2 container alignItems="center" justifyContent="flex-end" gap={1}>
              {!!error && (
                <Tooltip title={error}>
                  <Grid2
                    sx={{ color: 'var(--color-red) !important' }}
                    container
                    alignItems="center"
                  >
                    <ErrorOutlineIcon />
                  </Grid2>
                </Tooltip>
              )}
              {!!loading && <Loader size={20} />}
              {endAdornment}
            </Grid2>
          ),
        },
      }}
      {...rest}
    />
  )
}

export { Input }
