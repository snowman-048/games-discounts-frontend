import { TypeOptions, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Stack } from '@mui/material'

import { TypographyV2 } from '@/components/ui/typography'

import { getToastStyles } from './libs/helpers/get-toast-styles'

type TOptions = {
  noTitle?: boolean
  noIcon?: boolean
}

const CustomToast = (type: TypeOptions, message: string, options?: TOptions) => {
  const tostStyles = getToastStyles(type)
  const { noIcon } = options || {}

  toast(
    () => (
      <Stack width="100%">
        {/* {!noTitle && (
          <TypographyV2 fontSize="text-l" fontWeight="bold">
            {tostStyles.title}
          </TypographyV2>
        )} */}
        <TypographyV2 fontWeight="medium" color="secondary">
          {message}
        </TypographyV2>
      </Stack>
    ),
    {
      closeOnClick: true,
      draggable: false,
      autoClose: 5000,
      type,
      icon: noIcon ? false : tostStyles.icon,
      style: {
        borderRadius: 8,
        paddingBottom: 16,
        overflow: 'hidden',
      },
      pauseOnHover: true,
    },
  )
}

export { CustomToast }
