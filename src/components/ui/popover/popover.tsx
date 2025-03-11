import { PropsWithChildren } from 'react'

import { BoxProps, Popover as MuiPopover, PopoverOrigin } from '@mui/material'

import { GlassCard } from '../cards/glass-card'

type TProps = PropsWithChildren &
  Partial<PopoverOrigin> & {
    anchorEl: HTMLElement | null
    onClose: () => void
    maxWidth?: number
    cardProps?: BoxProps
  }

const Popover = ({ anchorEl, onClose, cardProps, children, maxWidth = 500, ...rest }: TProps) => {
  const { sx, ...restCardProps } = cardProps || {}

  return (
    <MuiPopover
      open={!!anchorEl}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transitionDuration={100}
      slotProps={{
        root: {
          slotProps: {
            backdrop: {
              sx: {
                background: 'var(--backdrop)',
                transitionDuration: 100,
              },
            },
          },
        },
        paper: {
          sx: {
            background: 'transparent',
            boxShadow: 'none',
            width: { xs: '100%', sm: maxWidth },
          },
        },
      }}
      {...rest}
    >
      <GlassCard sx={{ padding: 2, ...sx }} {...restCardProps}>
        {children}
      </GlassCard>
    </MuiPopover>
  )
}

export { Popover }
