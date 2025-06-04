'use client'

import EditNoteIcon from '@mui/icons-material/EditNote'
import { Button } from '@mui/material'
import Link from 'next/link'

import { EAppRoute } from '@/enums/app-route.enum'
import { ERole } from '@/enums/roles.enum'
import { useUserStore } from '@/store/user.store'

import { TypographyV2 } from '../ui/typography'

type TProps = {
  gameId: string | number
}

const EditGameButton = ({ gameId }: TProps) => {
  const user = useUserStore((state) => state.user)

  if (!user || user.role !== ERole.ADMIN) {
    return <></>
  }

  return (
    <Link href={`/${EAppRoute.EDIT_GAME}/${gameId}`}>
      <Button
        sx={{
          color: 'var(--color-primary)',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          borderRadius: '5px',
          minWidth: 0,
          width: 'fit-content',
          height: 'fit-content',
        }}
      >
        <EditNoteIcon />
        <TypographyV2 fontWeight="medium" fontSize="text-xl">
          Edit
        </TypographyV2>
      </Button>
    </Link>
  )
}

export { EditGameButton }
