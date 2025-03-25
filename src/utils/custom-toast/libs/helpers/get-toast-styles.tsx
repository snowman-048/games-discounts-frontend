import { TypeOptions } from 'react-toastify'

import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import DangerousIcon from '@mui/icons-material/Dangerous'
import InfoIcon from '@mui/icons-material/Info'
import ReportIcon from '@mui/icons-material/Report'

const titles = {
  info: 'Attention',
  error: 'Error',
  success: 'Success',
  warning: 'Warning',
  default: 'Attention',
}

const icons = {
  info: InfoIcon,
  error: DangerousIcon,
  success: CheckCircleIcon,
  warning: ReportIcon,
  default: InfoIcon,
}

const getToastStyles = (type: TypeOptions) => {
  return {
    title: titles[type] || titles.default,
    icon: icons[type] || icons.default,
  }
}

export { getToastStyles }
