import { SxProps, Theme } from '@mui/material'

import { TypographyV2 } from '../ui/typography'

type TProps = {
  label?: string
  sx?: SxProps<Theme> | undefined
}

const NoDataLabel = ({ label = 'NO DATA', sx = {} }: TProps) => {
  return (
    <TypographyV2
      fontWeight="bold"
      textAlign="center"
      component="span"
      display="block"
      color="inactive"
      fontSize="text-2xl"
      sx={{ width: '100%', ...sx }}
    >
      {label}
    </TypographyV2>
  )
}

export { NoDataLabel }
