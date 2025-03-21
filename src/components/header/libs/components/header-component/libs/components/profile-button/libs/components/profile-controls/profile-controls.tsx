'use client'

import AccessTimeIcon from '@mui/icons-material/AccessTime'
import BookmarksIcon from '@mui/icons-material/Bookmarks'
import PersonIcon from '@mui/icons-material/Person'
import { Stack } from '@mui/material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { LogoutButton } from '@/components/logout-button'
import { TypographyV2 } from '@/components/ui/typography'
import { EAppRoute } from '@/enums/app-route.enum'
import { ERole } from '@/enums/roles.enum'
import { useUserStore } from '@/store/user.store'

const allLinks = [
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
  {
    label: 'Pending Connections',
    path: `/${EAppRoute.PENDING_CONNECTIONS}/1`,
    icon: AccessTimeIcon,
    adminOnly: true,
  },
]

type TProps = {
  closePopup: () => void
}

const ProfileControls = ({ closePopup }: TProps) => {
  const user = useUserStore((state) => state.user)

  const links = allLinks.filter((link) => !link.adminOnly || user?.role === ERole.ADMIN)

  const pathname = usePathname()

  return (
    <Stack gap={2} width="100%">
      <Stack sx={{ borderBottom: '1px solid var(--color-disabled)' }} paddingBottom={1}>
        <TypographyV2 fontSize="text-2xl" fontWeight="bold" handwritten>
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
            color={pathname === link.path ? 'brand' : 'primary'}
          >
            {link.icon && <link.icon sx={{ width: 20, height: 20 }} />}
            {link.label}
          </TypographyV2>
        </Link>
      ))}

      <LogoutButton />
    </Stack>
  )
}

export { ProfileControls }
