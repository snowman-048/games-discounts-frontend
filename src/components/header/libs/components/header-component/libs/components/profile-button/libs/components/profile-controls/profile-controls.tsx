import BookmarksIcon from '@mui/icons-material/Bookmarks'
import PersonIcon from '@mui/icons-material/Person'
import { Button, Stack, Typography } from '@mui/material'
import Link from 'next/link'

import { GlassCard } from '@/components/ui/cards/glass-card'
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
        <Stack sx={{ borderBottom: '1px solid var(--accent)' }} paddingBottom={1}>
          <Typography fontWeight="bold">{user?.username}</Typography>
          <Typography color="var(--text-secondary)" variant="caption">
            {user?.email}
          </Typography>
        </Stack>

        {links.map((link) => (
          <Link href={link.path} key={link.label} onClick={closePopup}>
            <Typography
              fontWeight="bold"
              color={'var(--text-primary)'}
              alignItems="center"
              display="flex"
              gap={1}
              whiteSpace="nowrap"
            >
              {link.icon && <link.icon sx={{ width: 20, height: 20 }} />}
              {link.label}
            </Typography>
          </Link>
        ))}

        <Button
          variant="contained"
          sx={{ background: 'var(--red-light)' }}
          fullWidth
          onClick={() => {
            logout()
          }}
        >
          <Typography variant="body2" sx={{ textTransform: 'none' }} fontWeight="bold">
            Logout
          </Typography>
        </Button>
      </Stack>
    </GlassCard>
  )
}

export { ProfileControls }
