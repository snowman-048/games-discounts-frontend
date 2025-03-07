'use client'

import { PropsWithChildren } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import { Fade, Grid2, IconButton, ModalProps, Modal as MuiModal, Stack } from '@mui/material'

import { GlassCard } from '@/components/ui/cards/glass-card'

import { TypographyV2 } from '../typography'

type TProps = PropsWithChildren &
  ModalProps & {
    open: boolean
    onClose: () => void
    title?: string
    withClose?: boolean
  }

const Modal = ({ open, onClose, title, withClose = true, children, ...rest }: TProps) => {
  return (
    <MuiModal
      open={open}
      onClose={onClose}
      slotProps={{
        backdrop: {
          sx: { background: 'var(--backdrop)' },
          transitionDuration: 200,
        },
      }}
      {...rest}
    >
      <Fade
        in={open}
        style={{
          transitionDuration: '0.2s',
        }}
      >
        <GlassCard
          sx={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            position: 'absolute',
            width: { xs: '100%', sm: '600px' },
            maxWidth: 'calc(100vw - 16px)',
          }}
          padding={2}
        >
          <Stack width="100%" alignItems="center" gap={2}>
            <Grid2
              container
              width="100%"
              justifyContent="center"
              sx={{ position: 'relative' }}
              px={2.5}
            >
              {!!title && (
                <TypographyV2 fontSize="text-xl" fontWeight="medium" component="h2" align="center">
                  {title}
                </TypographyV2>
              )}
              {withClose && (
                <IconButton
                  onClick={onClose}
                  sx={{ position: 'absolute', right: -12, top: 0, padding: 0.5 }}
                >
                  <CloseIcon />
                </IconButton>
              )}
            </Grid2>

            {children}
          </Stack>
        </GlassCard>
      </Fade>
    </MuiModal>
  )
}

export { Modal }
