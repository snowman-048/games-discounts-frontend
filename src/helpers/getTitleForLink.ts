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

const getTitleForLink = (title: string) =>
  SYMBOLS_TO_REMOVE.reduce((acc, item) => acc.replaceAll(item, ''), title.trim().toLowerCase())
    .replace(/\s*-+\s*/g, '')
    .replace(/\s+/g, '-')

export { getTitleForLink }
