import { load } from 'cheerio'

const replaceClassesWithStyleModules = (htmlString: string, styles: Record<string, string>) => {
  const $ = load(htmlString)
  $('[class]').each(function () {
    const originalClasses = $(this).attr('class')!.split(' ')
    const scopedClasses = originalClasses.map((cls) => styles[cls] || cls).join(' ')
    $(this).attr('class', scopedClasses)
  })
  return $.html()
}

export { replaceClassesWithStyleModules }
