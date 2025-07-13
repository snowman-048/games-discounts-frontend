'use client'

import MergeIcon from '@mui/icons-material/Merge'
import { Button } from '@mui/material'
import Link from 'next/link'

import { EAppRoute } from '@/enums/app-route.enum'
import { useIsAdmin } from '@/hooks/useIsAdmin'

import { TypographyV2 } from '../ui/typography'

type TProps = {
  gameId: string | number
  title: string
}

const MergeGameButton = ({ gameId, title }: TProps) => {
  const isAdmin = useIsAdmin()

  if (!isAdmin) {
    return <></>
  }

  return (
    <Link href={`/${EAppRoute.SEARCH_GAME_TO_MERGE}/${gameId}/${title}/1`}>
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
        <MergeIcon />
        <TypographyV2 fontWeight="medium" fontSize="text-xl">
          Merge
        </TypographyV2>
      </Button>
    </Link>
  )
}

export { MergeGameButton }
