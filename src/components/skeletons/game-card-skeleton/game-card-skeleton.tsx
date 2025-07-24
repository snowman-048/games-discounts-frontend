import { Box, Grid2, Skeleton, Stack } from '@mui/material'

import { GlassCard } from '@/components/ui/cards/glass-card'

type TProps = {
  switchToListOnMobile?: boolean
}

const GameCardSkeleton = ({ switchToListOnMobile = false }: TProps) => {
  return (
    <GlassCard>
      <Grid2
        container
        flexDirection={switchToListOnMobile ? { xs: 'row', sm: 'column' } : 'column'}
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        sx={{
          span: {
            transform: 'none !important',
          },
        }}
        gap={1}
        padding={1}
        flexWrap="nowrap"
      >
        <Box
          width={switchToListOnMobile ? { xs: '135px', sm: '100%' } : '100%'}
          sx={{ flexGrow: 1 }}
        >
          <Skeleton
            width="100%"
            sx={{
              aspectRatio: 1,
              borderRadius: '12px',
              width: switchToListOnMobile
                ? { xs: '135px !important', sm: '100% !important' }
                : '100% !important',
            }}
          />
        </Box>
        <Stack gap={1} width="100%" flexGrow={1} height="100%">
          <Box width="100%" sx={{ flexGrow: 1 }}>
            <Skeleton width="100%" height={20} />
          </Box>
          <Skeleton width="100%" height={50} sx={{ borderRadius: '10px' }} />
        </Stack>
      </Grid2>
    </GlassCard>
  )
}

export { GameCardSkeleton }
