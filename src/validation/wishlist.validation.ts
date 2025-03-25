import * as yup from 'yup'

const createWishlistSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters long')
    .max(30, 'Name must be at most 30 characters long'),
  discountNotificationByEmail: yup.boolean().required(),
})

export { createWishlistSchema }
