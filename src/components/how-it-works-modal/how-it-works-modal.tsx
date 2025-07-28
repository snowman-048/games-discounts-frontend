import { Stack } from '@mui/material'
import { getTranslations } from 'next-intl/server'

import { Logo } from '../logo'
import { ServerModal } from '../ui/server-modal'
import { TypographyV2 } from '../ui/typography'

const HowItWorksModal = async () => {
  const t = await getTranslations('HowItWorksModal')

  const getHighlightedText = (key: string) =>
    t.rich(key, {
      highlight: (content) => <span style={{ color: 'var(--color-brand)' }}>{content}</span>,
    })

  return (
    <ServerModal
      title={t.rich('title', {
        logo: () => <Logo />,
      })}
      id="how-it-works-modal"
    >
      <Stack>
        <TypographyV2 fontSize="text-l">
          {t('p1')}
          <br />
          <br />
          {getHighlightedText('p2')}
          <br />
          <br />
          {getHighlightedText('p3')}
          <br />
          <br />
          {getHighlightedText('p4')}
          <br />
          <br />
          {getHighlightedText('p5')}
        </TypographyV2>
      </Stack>
    </ServerModal>
  )
}

export { HowItWorksModal }
