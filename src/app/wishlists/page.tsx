'use client'

import { useMemo } from 'react'

import { Stack } from '@mui/material'
import { useTranslations } from 'use-intl'

import { CreateNewWishlistButton } from '@/components/create-new-wishlist-button'
import { NoDataLabel } from '@/components/no-data-label'
import { SectionTitle } from '@/components/section-title'
import { GlassCard } from '@/components/ui/cards/glass-card'
import { Container } from '@/components/ui/container'
import { InfoItem } from '@/components/ui/info-item'
import { WishlistLinkItem } from '@/components/wishlist-link-item'
import { MAX_WISHLISTS } from '@/configs/wishlists.config'
import { useUserStore } from '@/store/user.store'
import { withRouteProtection } from '@/utils/with-route-protection'

const Wishlists = () => {
  const t = useTranslations('Wishlists')

  const wishlists = useUserStore((state) => state.user?.wishlists)

  const totalWishlistedGames = useMemo(
    () =>
      wishlists?.reduce((acc, item) => {
        acc += item.wishlistedGames?.length || 0
        return acc
      }, 0),
    [wishlists],
  )

  return (
    <Container>
      <GlassCard asSection>
        <Stack gap={2} width="100%">
          <SectionTitle
            title={t('my_wishlists', { total: wishlists?.length || 0, max: MAX_WISHLISTS })}
          />

          {!wishlists?.length && <NoDataLabel label="No Wishlists yet" />}
          {!!wishlists?.length && (
            <Stack gap={1}>
              {wishlists.map((item) => (
                <WishlistLinkItem wishlist={item} key={item.id} noBlur />
              ))}
            </Stack>
          )}

          {!!wishlists?.length && (
            <InfoItem
              label={t('total_tracking_items')}
              data={totalWishlistedGames}
              withDivider={false}
            />
          )}

          <CreateNewWishlistButton />
        </Stack>
      </GlassCard>
    </Container>
  )
}

export default withRouteProtection(Wishlists)
