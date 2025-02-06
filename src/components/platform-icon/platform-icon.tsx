import { storeColor } from '@/configs/store-color.config'
import { EPlatform } from '@/enums/platform.enum'
import { EStore } from '@/enums/store.enum'

import SwitchIcon from '../../../public/assets/svg/nintendo-switch.svg'
import Ps4Icon from '../../../public/assets/svg/ps4.svg'
import Ps5Icon from '../../../public/assets/svg/ps5.svg'
import WindowsIcon from '../../../public/assets/svg/windows.svg'
import XboxIcon from '../../../public/assets/svg/xbox.svg'

type TProps = {
  platform: EPlatform
}

type TMap = {
  icon: any
  color: string
  props?: {
    fill?: string
    width?: number
    height?: number
  }
}

const PLATFORM_TO_ICON_MAP: Record<EPlatform, TMap> = {
  [EPlatform.PS5]: {
    icon: Ps5Icon,
    color: storeColor[EStore.PSN],
    props: {
      width: 40,
    },
  },
  [EPlatform.PS4]: {
    icon: Ps4Icon,
    color: storeColor[EStore.NINTENDO],
    props: {
      width: 40,
    },
  },
  [EPlatform.XBOX]: {
    icon: XboxIcon,
    color: storeColor[EStore.XBOX],
  },
  [EPlatform.WINDOWS]: {
    icon: WindowsIcon,
    color: storeColor[EStore.XBOX],
  },
  [EPlatform.NINTENDO_SWITCH]: {
    icon: SwitchIcon,
    color: storeColor[EStore.XBOX],
  },
}

const PlatformIcon = ({ platform }: TProps) => {
  const config = PLATFORM_TO_ICON_MAP[platform]
  return <config.icon width={24} height={24} fill={'#fff'} {...config.props} />
}

export { PlatformIcon }
