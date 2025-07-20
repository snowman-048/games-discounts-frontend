'use client'

import { EditArticleForm } from '@/components/edit-article-form'
import { TArticleFormValues } from '@/components/edit-article-form/edit-article-form'
import { Container } from '@/components/ui/container'
import { ERole } from '@/enums/roles.enum'
import { withRouteProtection } from '@/utils/with-route-protection'

const CreateArticle = () => {
  const onSubmit = (data: TArticleFormValues) => {}

  return (
    <Container paddingBottom={5} gap={3}>
      <EditArticleForm onSubmit={onSubmit} submitBtnText="Create Article" />
    </Container>
  )
}

export default withRouteProtection(CreateArticle, [ERole.ADMIN])
