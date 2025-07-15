import { Box, Divider, Stack } from '@mui/material'

import { GlassCard } from '../ui/cards/glass-card'
import { TypographyV2 } from '../ui/typography'

type TProps = {
  title: string
  content: string
  image?: string
}

const CustomArticle = ({ title, content, image }: TProps) => {
  return (
    <GlassCard padding={2} width="100%">
      <Stack gap={{ xs: 3, md: 4 }} width="100%" alignItems="center">
        {!!image && (
          <Box
            sx={{
              width: '100%',
              maxWidth: '800px',
              height: 'fit-content',
              borderRadius: '4px',
            }}
          >
            <img src={image} alt="" width="100%" />
          </Box>
        )}

        <TypographyV2
          component="h1"
          adaptiveFontSize={{ md: 'heading-l', xs: 'heading-s' }}
          fontWeight="semibold"
          textAlign="center"
        >
          {title}
        </TypographyV2>

        <Divider sx={{ borderColor: 'var(--color-brand)', width: '100%' }} />

        <div className="ql-editor" dangerouslySetInnerHTML={{ __html: content }} />
      </Stack>
    </GlassCard>
  )
}

export { CustomArticle }
