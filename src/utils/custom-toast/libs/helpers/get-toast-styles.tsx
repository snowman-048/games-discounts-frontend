import { TypeOptions } from 'react-toastify'

import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import DangerousIcon from '@mui/icons-material/Dangerous'
import InfoIcon from '@mui/icons-material/Info'
import ReportIcon from '@mui/icons-material/Report'

const icons = {
  info: InfoIcon,
  error: DangerousIcon,
  success: CheckCircleIcon,
  warning: ReportIcon,
  default: InfoIcon,
}

// Translations doesn't work for now
const getToastStyles = (type: TypeOptions) => {
  // const t = getTranslations('toast')
  // const titles = useMemo(
  //   () => ({
  //     info: t('attention'),
  //     error: t('error'),
  //     success: t('success'),
  //     warning: t('warning'),
  //     default: t('attention'),
  //   }),
  //   [t],
  // )
  return {
    // title: titles[type] || titles.default,
    icon: icons[type] || icons.default,
  }
}

export { getToastStyles }
