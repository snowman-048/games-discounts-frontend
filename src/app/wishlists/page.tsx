'use client'

import { Stack } from '@mui/material'

import { CreateNewWishlistButton } from '@/components/create-new-wishlist-button'
import { NoDataLabel } from '@/components/no-data-label'
import { SectionTitle } from '@/components/section-title'
import { GlassCard } from '@/components/ui/cards/glass-card'
import { Container } from '@/components/ui/container'
import { WishlistLinkItem } from '@/components/wishlist-link-item'
import { MAX_WISHLISTS } from '@/configs/wishlists.config'
import { useUserStore } from '@/store/user.store'
import { withRouteProtection } from '@/utils/with-route-protection'

const Wishlists = () => {
  const wishlists = useUserStore((state) => state.user?.wishlists)

  return (
    <Container>
      <GlassCard width="100%" asSection>
        <Stack gap={2} width="100%">
          <SectionTitle title={`My Wishlists (${wishlists?.length || 0}/${MAX_WISHLISTS})`} />

          {!wishlists?.length && <NoDataLabel label="No Wishlists yet" />}
          {!!wishlists?.length && (
            <Stack gap={1}>
              {wishlists.map((item) => (
                <WishlistLinkItem wishlist={item} key={item.id} />
              ))}
            </Stack>
          )}

          <CreateNewWishlistButton />
        </Stack>
      </GlassCard>
    </Container>
  )
}

export default withRouteProtection(Wishlists)
