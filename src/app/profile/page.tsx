'use client'

import { Grid2, Stack, useMediaQuery } from '@mui/material'
import moment from 'moment'
import { useTranslations } from 'next-intl'

import { LogoutButton } from '@/components/logout-button'
import { SectionTitle } from '@/components/section-title'
import { Avatar } from '@/components/ui/avatar'
import { GlassCard } from '@/components/ui/cards/glass-card'
import { Container } from '@/components/ui/container'
import { InfoItem } from '@/components/ui/info-item'
import { Loader } from '@/components/ui/loader'
import { DEFAULT_DATE_FORMATTING } from '@/configs/date.config'
import { useUserStore } from '@/store/user.store'
import { withRouteProtection } from '@/utils/with-route-protection'

const Profile = () => {
  const t = useTranslations('Profile')

  const user = useUserStore((state) => state.user)
  const isUserLoading = useUserStore((state) => state.isUserLoading)

  const smallAvatar = useMediaQuery(`(max-width: 600px)`)

  if (isUserLoading || !user) {
    return (
      <Container>
        <Loader variant="linear" />
      </Container>
    )
  }

  return (
    <Container>
      <GlassCard asSection>
        <Stack gap={2} width="100%" alignItems="center">
          <SectionTitle title={t('my_profile')} />

          <Grid2 container alignItems="center" gap={2} width="100%">
            {smallAvatar ? (
              <Avatar user={user} size="medium" />
            ) : (
              <Avatar user={user} size="large" />
            )}

            <Stack gap={1} flex={1}>
              <InfoItem label={t('username')} data={user.username} />
              <InfoItem label={t('email')} data={user.email} />
              <InfoItem
                label={t('account_created')}
                data={moment(user.createdAt).format(DEFAULT_DATE_FORMATTING)}
                withDivider={false}
              />
            </Stack>
          </Grid2>

          <LogoutButton fullWidth />
        </Stack>
      </GlassCard>
    </Container>
  )
}

export default withRouteProtection(Profile)
