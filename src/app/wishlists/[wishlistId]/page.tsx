'use client'

import { useEffect, useState } from 'react'

import { Stack } from '@mui/material'
import { useParams } from 'next/navigation'

import { getUserWishlistById } from '@/api/wishlist'
import { SectionTitle } from '@/components/section-title'
import { GlassCard } from '@/components/ui/cards/glass-card'
import { Container } from '@/components/ui/container'
import { Loader } from '@/components/ui/loader'
import { TWishlistWithGames } from '@/types/wishlist.types'
import { CustomToast } from '@/utils/custom-toast'
import { withRouteProtection } from '@/utils/with-route-protection'

import { UpdateWishlistForm } from './libs/components/update-wishlist-form'
import { WishlistedItemsList } from './libs/components/wishlisted-items-list'

const WishlistDetails = () => {
  const [wishlist, setWishlist] = useState<TWishlistWithGames | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const { wishlistId } = useParams<{ wishlistId: string }>()

  useEffect(() => {
    ;(async () => {
      try {
        setIsLoading(true)
        const { data } = await getUserWishlistById(wishlistId)

        setWishlist(data)
      } catch (err) {
        CustomToast('error', (err as Error).message)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])

  if (isLoading || !wishlist) {
    return (
      <Container>
        <Loader variant="linear" />
      </Container>
    )
  }

  return (
    <Container gap={{ xs: 2, md: 5 }} paddingBottom={5}>
      <GlassCard asSection>
        <Stack gap={2} width="100%">
          <SectionTitle title={wishlist.name} />

          <UpdateWishlistForm setWishlist={setWishlist} wishlist={wishlist} />
        </Stack>
      </GlassCard>

      <GlassCard asSection>
        <Stack gap={3} width="100%">
          <SectionTitle
            title={`Wishlisted Items${!!wishlist.wishlistedGames.length ? ` (${wishlist.wishlistedGames.length})` : ''}`}
          />

          <WishlistedItemsList setWishlist={setWishlist} wishlist={wishlist} />
        </Stack>
      </GlassCard>
    </Container>
  )
}

export default withRouteProtection(WishlistDetails)
