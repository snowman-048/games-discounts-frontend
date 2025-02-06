import { Grid2, Typography } from '@mui/material'
import Link from 'next/link'

import { storeColor } from '@/configs/store-color.config'
import { EStore } from '@/enums/store.enum'

import NintendoIcon from '../../../public/assets/svg/nintendo.svg'
import PsIcon from '../../../public/assets/svg/ps.svg'
import XboxIcon from '../../../public/assets/svg/xbox-store.svg'

type TProps = {
  store: EStore
  link?: string
}

const STORE_TO_ICON_MAP = {
  [EStore.PSN]: {
    icon: PsIcon,
    color: storeColor[EStore.PSN],
  },
  [EStore.NINTENDO]: {
    icon: NintendoIcon,
    color: storeColor[EStore.NINTENDO],
  },
  [EStore.XBOX]: {
    icon: XboxIcon,
    color: storeColor[EStore.XBOX],
  },
}

const STORE_TO_STORE_NAME = {
  [EStore.PSN]: 'PlayStation',
  [EStore.NINTENDO]: 'Nintendo',
  [EStore.XBOX]: 'Xbox',
}

const StoreIcon = ({ store, link }: TProps) => {
  const config = STORE_TO_ICON_MAP[store]

  const renderItem = () => (
    <Grid2
      container
      alignItems="center"
      gap={1}
      sx={{ background: config.color, padding: '4px 12px', borderRadius: 1.5 }}
    >
      <config.icon width={24} height={24} fill="#fff" />
      <Typography fontWeight="bold">{STORE_TO_STORE_NAME[store]}</Typography>
    </Grid2>
  )

  return !!link ? (
    <Link href={link} target="_blank">
      {renderItem()}
    </Link>
  ) : (
    renderItem()
  )
}

export { StoreIcon }
