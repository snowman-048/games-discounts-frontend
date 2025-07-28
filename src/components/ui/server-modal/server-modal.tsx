import { PropsWithChildren } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import { Box, BoxProps, Grid2, IconButton, Stack } from '@mui/material'

import { GlassCard } from '@/components/ui/cards/glass-card'

import { TypographyV2 } from '../typography'
import styles from './styles.module.scss'

type TProps = PropsWithChildren &
  Omit<BoxProps, 'title'> & {
    id: string
    title?: any
    withClose?: boolean
  }

const ServerModal = ({ title, withClose = true, children, sx, id, ...rest }: TProps) => {
  return (
    <Box className={styles.backdrop} id={id} {...rest}>
      <GlassCard
        sx={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          position: 'absolute',
          width: { xs: '100%', sm: '600px' },
          maxWidth: `calc(100vw - ${withClose ? 24 : 16}px)`,
          overflow: 'visible',
          maxHeight: `calc(100dvh - ${withClose ? 24 : 16}px)`,
          zIndex: 100,
        }}
        padding={2}
      >
        <Stack width="100%" alignItems="center" gap={2}>
          <Grid2 container width="100%" justifyContent="center" sx={{ position: 'relative' }}>
            {!!title && (
              <TypographyV2 fontSize="text-2xl" fontWeight="medium" component="h2" align="center">
                {title}
              </TypographyV2>
            )}
            {withClose && (
              <IconButton
                id={`close-modal-${id}`}
                sx={{ position: 'absolute', right: -26, top: -26, padding: 0.5 }}
              >
                <CloseIcon />
              </IconButton>
            )}
          </Grid2>

          <Box overflow="auto" width="100%">
            {children}
          </Box>
        </Stack>
      </GlassCard>
    </Box>
  )
}

export { ServerModal }
