type TWishlist = {
  id: number
  name: string
  discountNotificationByEmail: boolean
  wishlistedGames: { id: number }[]
}

type TUser = {
  id: number
  email: string
  username: string
  wishlists: TWishlist[]
}

export type { TUser, TWishlist }
