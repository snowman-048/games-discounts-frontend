const SYMBOLS_TO_REMOVE = [':', '™', '®', "'", '"']

const getGameTitleForLink = (title: string) =>
  SYMBOLS_TO_REMOVE.reduce(
    (acc, item) => acc.replaceAll(item, ''),
    title.trim().toLowerCase().replaceAll('-', '').replaceAll(' ', '-'),
  )

export { getGameTitleForLink }
