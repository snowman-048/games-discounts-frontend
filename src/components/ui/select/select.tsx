import {
  FormControl,
  FormControlProps,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  SelectProps,
  styled,
} from '@mui/material'

import { styledInputParams } from '@/configs/styled-input-params.config'
import { TOption } from '@/types/option.types'

type TProps<T> = Omit<SelectProps, 'onChange'> & {
  options: TOption<T>[]
  onChange: (value: T) => void
  containerProps?: FormControlProps
}

const StyledFormControl = styled(FormControl)(styledInputParams)

const Select = <T extends string | number>({
  options,
  onChange,
  containerProps,
  label,
  ...rest
}: TProps<T>) => {
  return (
    <StyledFormControl {...containerProps} sx={{ flex: 1, width: '100%', ...containerProps?.sx }}>
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        label={label}
        onChange={(e) => {
          const value = e.target.value as T
          onChange?.(value)
        }}
        {...rest}
      >
        {options.map((item, index) => (
          <MenuItem key={index} value={item.value}>
            {item.title}
          </MenuItem>
        ))}
      </MuiSelect>
    </StyledFormControl>
  )
}

export { Select }
