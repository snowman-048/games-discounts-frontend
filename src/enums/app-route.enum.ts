enum EAppRoute {
  // Public
  HOME = '',
  ACTIVE_DISCOUNTS = 'active-discounts',
  ALL_GAMES = 'all-games',
  HOTTEST_DEALS = 'hottest-deals',
  NEWEST_RELEASES = 'newest-releases',
  GAME = 'game',
  ABOUT_US = 'about-us',
  ARTICLES = 'articles',
  VIEW_ARTICLE = 'articles/view',
  // Private
  WISHLISTS = 'wishlists',
  PROFILE = 'profile',
  // Admin
  PENDING_CONNECTIONS = 'pending-connections',
  RESOLVE_PENDING_CONNECTION = 'resolve-pending-connection',
  EDIT_GAME = 'game/edit',
  MANAGE_ARTICLES = 'articles/manage',
  EDIT_ARTICLE = 'articles/manage/edit',
}

export { EAppRoute }
