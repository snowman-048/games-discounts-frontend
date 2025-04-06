import * as yup from 'yup'

const createWishlistSchema = (t: any) =>
  yup.object({
    name: yup
      .string()
      .required(t('validation.wishlist.name_required'))
      .min(3, t('validation.wishlist.name_min', { length: 3 }))
      .max(30, t('validation.wishlist.name_max', { length: 30 })),
    discountNotificationByEmail: yup.boolean().required(),
  })

export { createWishlistSchema }
