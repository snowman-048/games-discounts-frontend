import { MouseEventHandler, useCallback } from 'react'

import Link from 'next/link'

import { TypographyV2 } from '@/components/ui/typography'

type TProps = {
  label: string
  isActive?: boolean
  icon?: any
  link?: string
  onClick?: MouseEventHandler<HTMLSpanElement>
}

const NavButton = ({ label, link, icon: Icon, isActive, onClick }: TProps) => {
  const renderContent = useCallback(
    () => (
      <TypographyV2
        fontWeight="bold"
        color={isActive ? 'brand' : 'primary'}
        alignItems="center"
        display="flex"
        gap={0.5}
        whiteSpace="nowrap"
        fontSize="text-l"
        onClick={onClick}
        sx={{
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        {Icon && <Icon />}
        {label}
      </TypographyV2>
    ),
    [Icon, label, isActive, onClick],
  )

  return link ? (
    <Link href={link} key={label}>
      {renderContent()}
    </Link>
  ) : (
    renderContent()
  )
}

export { NavButton }
