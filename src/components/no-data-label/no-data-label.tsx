import { TypographyV2 } from '../ui/typography'

type TProps = {
  label?: string
}

const NoDataLabel = ({ label = 'NO DATA' }: TProps) => {
  return (
    <TypographyV2
      fontWeight="bold"
      textAlign="center"
      component="span"
      display="block"
      color="inactive"
      fontSize="text-2xl"
      sx={{ width: '100%' }}
    >
      {label}
    </TypographyV2>
  )
}

export { NoDataLabel }
