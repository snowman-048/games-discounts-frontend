const styledInputParams = {
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'var(--color-disabled)',
      transition: 'all 0.2s',
    },
    '&:not(.Mui-disabled):not(.Mui-focused):hover fieldset': {
      borderColor: 'var(--color-secondary)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'var(--color-brand)',
    },
    '&.Mui-error': {
      input: {
        color: 'var(--color-red)',
      },
      fieldset: {
        borderColor: 'var(--color-red)',
      },
    },
  },
  '& .MuiFormLabel-root': {
    '&.Mui-error': {
      color: 'var(--color-red)',
    },
  },
}

export { styledInputParams }
