const SYMBOLS_TO_REMOVE = [
  ':',
  '™',
  '®',
  "'",
  '"',
  '|',
  '’',
  '(',
  ')',
  '–',
  '+',
  '=',
  '&',
  '>',
  '<',
  '@',
  '.',
  ',',
  '\\',
  '/',
  '?',
  ':',
  ';',
  '#',
  '!',
  '°',
  '~',
]

const getGameTitleForLink = (title: string) =>
  SYMBOLS_TO_REMOVE.reduce((acc, item) => acc.replaceAll(item, ''), title.trim().toLowerCase())
    .replace(/\s*-+\s*/g, '')
    .replace(/\s+/g, '-')

export { getGameTitleForLink }
