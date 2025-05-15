import { Grid2, Icon } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

import { storeColor } from '@/configs/store-color.config'
import { EPriceHistoryMetaType } from '@/enums/price-history-meta-type.enum'
import { EStore } from '@/enums/store.enum'
import { getStoreDisplayName } from '@/helpers/getStoreDisplayName'

import PsPlus from '../../../public/assets/svg/PlayStationPlus.png'
import NintendoIcon from '../../../public/assets/svg/nintendo.svg'
import PsIcon from '../../../public/assets/svg/ps.svg'
import XboxIcon from '../../../public/assets/svg/xbox-store.svg'
import { TypographyV2 } from '../ui/typography'

type TProps = {
  store: EStore | EPriceHistoryMetaType
  link?: string
  withLabel?: boolean
  customLabel?: string
}

const STORE_TO_ICON_MAP = {
  [EStore.PSN]: {
    type: 'svg',
    icon: PsIcon,
    color: storeColor[EStore.PSN],
  },
  [EPriceHistoryMetaType.PS_PLUS]: {
    type: 'img',
    icon: PsPlus,
    color: storeColor[EPriceHistoryMetaType.PS_PLUS],
  },
  [EStore.NINTENDO]: {
    type: 'svg',
    icon: NintendoIcon,
    color: storeColor[EStore.NINTENDO],
  },
  [EStore.XBOX]: {
    type: 'svg',
    icon: XboxIcon,
    color: storeColor[EStore.XBOX],
  },
}

const StoreIcon = ({ store, link, withLabel = true, customLabel }: TProps) => {
  const config = STORE_TO_ICON_MAP[store]

  const renderItem = () => (
    <Grid2
      container
      alignItems="center"
      flexWrap="nowrap"
      gap={1}
      sx={{ background: config.color, padding: '4px 8px', borderRadius: 1.5 }}
    >
      {/* <config.icon width={24} height={24} fill="#fff" /> */}
      {config.type === 'svg' ? (
        <config.icon width={24} height={24} fill="#fff" />
      ) : (
        <Image src={config.icon} alt="" width={24} height={24} />
      )}
      {withLabel && store !== EPriceHistoryMetaType.PS_PLUS && (
        <TypographyV2
          fontWeight="bold"
          adaptiveFontSize={{ xs: 'text-sm', sm: 'text-l' }}
          className="store-display-name-in-chip"
        >
          {getStoreDisplayName(store).short}
        </TypographyV2>
      )}
      {!!customLabel && (
        <TypographyV2 fontWeight="bold" adaptiveFontSize={{ xs: 'text-sm', sm: 'text-l' }}>
          {customLabel}
        </TypographyV2>
      )}
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
