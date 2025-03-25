import { Autocomplete, Checkbox, TextField, styled } from '@mui/material'

import { styledInputParams } from '@/configs/styled-input-params.config'
import { TOption } from '@/types/option.types'

type TProps<T> = {
  options: TOption<T>[]
  label: string
  value?: string[]
  error?: boolean
  onChange: (value: string[]) => void
} & any

const StyledAutocomplete = styled(Autocomplete)(styledInputParams)

const MultipleAutocomplete = <T,>({
  options,
  value,
  onChange,
  renderInput,
  error,
  label,
  ...rest
}: TProps<T>) => {
  return (
    <StyledAutocomplete
      multiple
      options={options}
      disableCloseOnSelect
      getOptionLabel={(option: any) => (option as any).title}
      renderOption={
        ((props: any, option: TOption<T>, { selected }: any) => {
          const { key, ...optionProps } = props
          return (
            <li key={key} {...optionProps}>
              <Checkbox style={{ marginRight: 8 }} checked={selected} />
              {(option as any).title}
            </li>
          )
        }) as any
      }
      renderInput={(params) => (
        <TextField {...params} variant="outlined" label={label} error={error} />
      )}
      value={options.filter((option: any) =>
        (value || []).some((item: any) => item === option.value),
      )}
      onChange={(_, newValue) =>
        onChange((newValue as TOption<any>[]).map((option) => option.value))
      }
      {...rest}
    />
  )
}

export { MultipleAutocomplete }
