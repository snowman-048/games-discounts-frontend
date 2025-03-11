import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead'
import SportsEsportsIcon from '@mui/icons-material/SportsEsports'
import { Button, Grid2 } from '@mui/material'
import Link from 'next/link'

import { EAppRoute } from '@/enums/app-route.enum'
import { TUserWishlist } from '@/types/wishlist.types'

import { GlassCard } from '../ui/cards/glass-card'
import { TypographyV2 } from '../ui/typography'

type TProps = {
  wishlist: TUserWishlist
  withLink?: boolean
  onClick?: () => void
  isSmall?: boolean
  disabled?: boolean
}

const WishlistLinkItem = ({
  wishlist,
  withLink = true,
  isSmall = false,
  disabled,
  onClick,
}: TProps) => {
  const renderContent = () => (
    <GlassCard
      onClick={() => {
        if (!disabled) onClick?.()
      }}
      width="100%"
      sx={{
        boxShadow: 'none',
        maxWidth: '100%',
        overflow: 'hidden',
      }}
    >
      <Button sx={{ width: '100%', padding: 0 }} disabled={disabled}>
        <Grid2
          sx={{
            borderRadius: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: 'var(--color-primary)',
          }}
          py={isSmall ? 0.7 : 1.5}
          px={1.5}
          width="100%"
        >
          <TypographyV2
            fontSize="text-l"
            sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0 }}
          >
            {wishlist.name}
          </TypographyV2>
          <Grid2 container alignItems="center" gap={{ xs: 1, sm: 2 }} flexWrap="nowrap">
            {wishlist.discountNotificationByEmail && (
              <MarkEmailReadIcon sx={{ width: { xs: 15, sm: 20 }, height: { xs: 15, sm: 20 } }} />
            )}
            <Grid2 container alignItems="center" gap={{ xs: 0.7, sm: 1 }} flexWrap="nowrap">
              <SportsEsportsIcon sx={{ width: { xs: 15, sm: 20 }, height: { xs: 15, sm: 20 } }} />
              <TypographyV2 fontSize="text-l" fontWeight="bold">
                {wishlist.wishlistedGames.length}
              </TypographyV2>
            </Grid2>
            {withLink && (
              <ArrowForwardIosIcon sx={{ color: 'var(--color-brand)', width: 18, height: 18 }} />
            )}
          </Grid2>
        </Grid2>
      </Button>
    </GlassCard>
  )

  return withLink ? (
    <Link href={`/${EAppRoute.WISHLISTS}/${wishlist.id}`}>{renderContent()}</Link>
  ) : (
    renderContent()
  )
}

export { WishlistLinkItem }
