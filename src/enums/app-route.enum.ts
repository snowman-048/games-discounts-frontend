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
  RESOLVE_PENDING_CONNECTION = 'pending-connections/resolve',
  EDIT_GAME = 'game/edit',
  SEARCH_GAME_TO_MERGE = 'game/merge/search',
  MERGE_GAME = 'game/merge',
  MANAGE_ARTICLES = 'articles/manage',
  EDIT_ARTICLE = 'articles/manage/edit',
  CREATE_ARTICLE = 'articles/manage/create',
}

export { EAppRoute }
