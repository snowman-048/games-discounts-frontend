import { Grid2 } from '@mui/material'

import { TUser } from '@/types/user.types'

import { TypographyV2 } from '../typography'
import { TFontSize } from '../typography/typography'

type TAvatartSize = 'small' | 'medium' | 'large'

type TProps = {
  user: TUser
  size?: TAvatartSize
}

const AVATAR_SIZE: Record<TAvatartSize, { size: number; fontSize: TFontSize }> = {
  small: { size: 24, fontSize: 'text-base' },
  medium: { size: 48, fontSize: 'text-2xl' },
  large: { size: 96, fontSize: 'heading-l' },
}

const Avatar = ({ user, size = 'small' }: TProps) => {
  const currentSize = AVATAR_SIZE[size]

  return (
    <Grid2
      sx={{
        width: '100%',
        minWidth: currentSize.size,
        minHeight: currentSize.size,
        maxWidth: currentSize.size,
        maxHeight: currentSize.size,
        aspectRatio: 1,
        borderRadius: '50%',
        background: 'var(--color-brand)',
      }}
      container
      alignItems="center"
      justifyContent="center"
    >
      <TypographyV2 color="l1" fontWeight="bold" fontSize={currentSize.fontSize} handwritten>
        {user.username[0]}
      </TypographyV2>
    </Grid2>
  )
}

export { Avatar }
