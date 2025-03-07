'use client'

import { useState } from 'react'

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead'
import SportsEsportsIcon from '@mui/icons-material/SportsEsports'
import { Button, Grid2, Stack, Typography } from '@mui/material'
import Link from 'next/link'

import { CreateWishlistModal } from '@/components/create-wishlist-modal'
import { NoDataLabel } from '@/components/no-data-label'
import { SectionTitle } from '@/components/section-title'
import { GlassCard } from '@/components/ui/cards/glass-card'
import { Container } from '@/components/ui/container'
import { EAppRoute } from '@/enums/app-route.enum'
import { useUserStore } from '@/store/user.store'
import { withRouteProtection } from '@/utils/with-route-protection'

const Wishlists = () => {
  const wishlists = useUserStore((state) => state.user?.wishlists)

  const [isCreateWishlistOpen, setIsCreateWishlistOpen] = useState(false)

  return (
    <>
      <Container>
        <GlassCard width="100%" padding={3}>
          <Stack gap={2} width="100%">
            <SectionTitle title="My Wishlists" />

            {!wishlists?.length && <NoDataLabel label="No Wishlists yet" />}
            {wishlists?.length && (
              <Stack gap={1}>
                {wishlists.map((item) => (
                  <Link href={`/${EAppRoute.WISHLISTS}/${item.id}`} key={item.id}>
                    <GlassCard
                      sx={{
                        borderRadius: '10px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        boxShadow: 'none',
                        alignItems: 'center',
                      }}
                      padding={1.5}
                      width="100%"
                      gap={2}
                    >
                      <Typography>{item.name}</Typography>
                      <Grid2 container alignItems="center" gap={2}>
                        {item.discountNotificationByEmail && <MarkEmailReadIcon />}
                        <Grid2 container alignItems="center" gap={1}>
                          <SportsEsportsIcon />
                          <Typography fontWeight="bold">{item.wishlistedGames.length}</Typography>
                        </Grid2>
                        <ArrowForwardIosIcon
                          sx={{ color: 'var(--accent)', width: 18, height: 18 }}
                        />
                      </Grid2>
                    </GlassCard>
                  </Link>
                ))}
              </Stack>
            )}

            <Button
              sx={{ gap: 1, alignSelf: 'flex-start' }}
              onClick={() => setIsCreateWishlistOpen(true)}
            >
              <AddCircleOutlineIcon />
              <Typography sx={{ textTransform: 'none' }} fontWeight="bold">
                Create new
              </Typography>
            </Button>
          </Stack>
        </GlassCard>
      </Container>

      <CreateWishlistModal
        open={isCreateWishlistOpen}
        handleClose={() => setIsCreateWishlistOpen(false)}
      />
    </>
  )
}

export default withRouteProtection(Wishlists)
