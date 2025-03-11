import * as yup from 'yup'

const screateWishlistSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name must be at most 50 characters'),
  discountNotificationByEmail: yup.boolean().required(),
})

export { screateWishlistSchema }
