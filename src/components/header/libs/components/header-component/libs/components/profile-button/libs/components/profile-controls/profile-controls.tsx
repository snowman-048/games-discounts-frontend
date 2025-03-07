import BookmarksIcon from '@mui/icons-material/Bookmarks'
import PersonIcon from '@mui/icons-material/Person'
import { Button, Stack } from '@mui/material'
import Link from 'next/link'

import { GlassCard } from '@/components/ui/cards/glass-card'
import { TypographyV2 } from '@/components/ui/typography'
import { EAppRoute } from '@/enums/app-route.enum'
import { logout } from '@/helpers/logout'
import { useUserStore } from '@/store/user.store'

const links = [
  {
    label: 'Wishlists',
    path: `/${EAppRoute.WISHLISTS}`,
    icon: BookmarksIcon,
  },
  {
    label: 'Profile',
    path: `/${EAppRoute.PROFILE}`,
    icon: PersonIcon,
  },
]

type TProps = {
  closePopup: () => void
}

const ProfileControls = ({ closePopup }: TProps) => {
  const user = useUserStore((state) => state.user)

  return (
    <GlassCard padding={2} width="100%">
      <Stack gap={2} width="100%">
        <Stack sx={{ borderBottom: '1px solid var(--color-brand)' }} paddingBottom={1}>
          <TypographyV2 fontSize="text-l" fontWeight="bold">
            {user?.username}
          </TypographyV2>
          <TypographyV2 color="inactive" fontSize="text-s">
            {user?.email}
          </TypographyV2>
        </Stack>

        {links.map((link) => (
          <Link href={link.path} key={link.label} onClick={closePopup}>
            <TypographyV2
              fontWeight="bold"
              alignItems="center"
              display="flex"
              gap={1}
              whiteSpace="nowrap"
              fontSize="text-l"
            >
              {link.icon && <link.icon sx={{ width: 20, height: 20 }} />}
              {link.label}
            </TypographyV2>
          </Link>
        ))}

        <Button
          variant="contained"
          sx={{ background: 'var(--color-red)' }}
          fullWidth
          onClick={() => {
            logout()
          }}
        >
          <TypographyV2 variant="body2" sx={{ textTransform: 'none' }} color="l1" fontWeight="bold">
            Logout
          </TypographyV2>
        </Button>
      </Stack>
    </GlassCard>
  )
}

export { ProfileControls }
