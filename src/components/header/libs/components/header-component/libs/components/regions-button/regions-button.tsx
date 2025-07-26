'use client'

import { useState } from 'react'

import LocationOnIcon from '@mui/icons-material/LocationOn'
import { Button, ButtonProps } from '@mui/material'
import { useTranslations } from 'next-intl'

import { RegionSettings } from '@/components/region-settings'
import { Popover } from '@/components/ui/popover'

type TProps = ButtonProps & {
  inDrawer?: boolean
}

const RegionsButton = ({ sx, inDrawer, ...rest }: TProps) => {
  const t = useTranslations('Header')

  const [locationAnchorEl, setLocationAnchorEl] = useState<HTMLButtonElement | null>(null)

  return (
    <>
      <Button
        onClick={(e) => setLocationAnchorEl(e.currentTarget)}
        sx={{
          color: 'var(--color-primary)',
          gap: 1,
          textTransform: 'none',
          width: inDrawer ? '100%' : 'fit-content',
          ...sx,
        }}
        variant="outlined"
        {...rest}
      >
        {t('regions')}
        <LocationOnIcon />
      </Button>

      <Popover anchorEl={locationAnchorEl} onClose={() => setLocationAnchorEl(null)} maxWidth={400}>
        <RegionSettings />
      </Popover>
    </>
  )
}

export { RegionsButton }
