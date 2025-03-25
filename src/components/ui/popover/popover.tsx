import { PropsWithChildren } from 'react'

import { BoxProps, Popover as MuiPopover, PopoverProps, Zoom } from '@mui/material'

import { GlassCard } from '../cards/glass-card'

type TProps = PropsWithChildren &
  Omit<PopoverProps, 'open' | 'anchorEl' | 'onClose'> & {
    anchorEl: HTMLElement | null
    onClose: () => void
    maxWidth?: number
    fixedWidth?: boolean
    fitContent?: boolean
    cardProps?: BoxProps
    withBackdrop?: boolean
  }

const Popover = ({
  anchorEl,
  onClose,
  cardProps,
  children,
  maxWidth = 500,
  withBackdrop = true,
  fixedWidth,
  fitContent,
  ...rest
}: TProps) => {
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
                background: withBackdrop ? 'var(--backdrop)' : 'transparent',
                transitionDuration: 100,
              },
            },
          },
        },
        paper: {
          sx: {
            background: 'transparent',
            boxShadow: 'none',
            width: {
              xs: fixedWidth ? maxWidth : fitContent ? 'fit-content' : '100%',
              sm: fitContent ? 'fit-content' : maxWidth,
            },
            overflow: 'visible',
          },
        },
      }}
      TransitionComponent={Zoom}
      TransitionProps={{
        easing: {
          enter: 'cubic-bezier(0.02,0.56,0.39,0.98)',
          exit: 'cubic-bezier(0.66,0.01,0.99,0.38)',
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
