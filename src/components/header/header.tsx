import { Grid2 } from '@mui/material'

import { Logo } from '../logo'
import { GlassCard } from '../ui/cards/glass-card'
import { Container } from '../ui/container'

const Header = () => {
  return (
    <Grid2
      container
      width="100%"
      marginBottom={3}
      position="fixed"
      sx={{ top: 0, left: 0, zIndex: 5, height: 64 }}
    >
      <GlassCard
        style={{
          width: '100%',
          height: '100%',
          borderTopRightRadius: 0,
          borderTopLeftRadius: 0,
          marginTop: -1,
        }}
      >
        <Container justifyContent="center">
          <Logo />
        </Container>
      </GlassCard>
    </Grid2>
  )
}

export { Header }
