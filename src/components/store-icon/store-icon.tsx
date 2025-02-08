import { Grid2, Typography } from '@mui/material'
import Link from 'next/link'

import { storeColor } from '@/configs/store-color.config'
import { EPriceHistoryMetaType } from '@/enums/price-history-meta-type.enum'
import { EStore } from '@/enums/store.enum'
import { getStoreDisplayName } from '@/helpers/getStoreDisplayName'

import NintendoIcon from '../../../public/assets/svg/nintendo.svg'
import PsIcon from '../../../public/assets/svg/ps.svg'
import XboxIcon from '../../../public/assets/svg/xbox-store.svg'

type TProps = {
  store: EStore | EPriceHistoryMetaType
  link?: string
  withLabel?: boolean
}

const STORE_TO_ICON_MAP = {
  [EStore.PSN]: {
    icon: PsIcon,
    color: storeColor[EStore.PSN],
  },
  // TODO: Set PS PLUS icon
  [EPriceHistoryMetaType.PS_PLUS]: {
    icon: () => (
      <Typography color={storeColor[EPriceHistoryMetaType.PS_PLUS]} fontWeight="bold">
        PS+
      </Typography>
    ),
    color: 'transparent',
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

const StoreIcon = ({ store, link, withLabel = true }: TProps) => {
  const config = STORE_TO_ICON_MAP[store]

  const renderItem = () => (
    <Grid2
      container
      alignItems="center"
      gap={1}
      sx={{ background: config.color, padding: '4px 12px', borderRadius: 1.5 }}
    >
      <config.icon width={24} height={24} fill="#fff" />
      {withLabel && <Typography fontWeight="bold">{getStoreDisplayName(store).short}</Typography>}
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
