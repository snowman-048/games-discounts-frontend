import { Zoom, styled } from '@mui/material'
import MuiTooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'

import { TypographyV2 } from '../typography'

type TProps = TooltipProps & {
  maxWidth?: number
  title?: string | null
  delay?: number
}

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <MuiTooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'var(--color-primary)',
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: 'var(--color-primary)',
  },
}))

const Tooltip = ({ title, maxWidth = 180, delay = 0, children }: TProps) => {
  if (!children) {
    return <></>
  }

  if (!title) {
    return children
  }

  return (
    <StyledTooltip
      title={
        <TypographyV2 fontWeight="medium" color="l1" textAlign="center">
          {title}
        </TypographyV2>
      }
      sx={{
        maxWidth,
      }}
      arrow
      enterDelay={delay}
      enterNextDelay={delay}
      slots={{
        transition: Zoom,
      }}
    >
      {children}
    </StyledTooltip>
  )
}

export { Tooltip }
