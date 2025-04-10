import unirest from 'unirest'

const { INITIAL_LANGUAGE, SUPPORTED_LANGUAGES } = await import('./config.mjs')
const { getTranslationsObject, findExistingTranslation, updateTranslationFile } = await import(
  './helpers.mjs'
)

const RAPID_API_KEY = 'ce98415270msh6ab4e2595456a53p1a3937jsnbcff04239de6'; // Vlad's key (free plan). Consider obtaining a paid subscription of RapidAPI

const GOOGLE_LANGUAGE_CODES = {
  ua: 'uk',
}

const args = process.argv.slice(2)

const req = unirest('POST', 'https://google-translate113.p.rapidapi.com/api/v1/translator/text')

req.headers({
  'x-rapidapi-host': 'google-translate113.p.rapidapi.com',
  'x-rapidapi-key': RAPID_API_KEY,
  'content-type': 'application/json',
})

const translateWord = (lang, text) =>
  new Promise((resolve, reject) => {
    if (lang === INITIAL_LANGUAGE) {
      return resolve(text)
    }

    const payload = { from: 'en', to: GOOGLE_LANGUAGE_CODES[lang] || lang, text };
    req.form(payload)

    req.end((res) => {
      if (res.error) {
        console.log(`Translate word ${lang}: `, res.body.message, payload)
        reject(res.error)
      } else {
        resolve(res.body.trans)
      }
    })
  })

const updateTranslation = (translationObject, keys, text) => {
  let currentObject = translationObject
  for (const index in keys) {
    const key = keys[index]
    if (typeof currentObject[key] === 'object') {
      currentObject = currentObject[key]
    } else if (typeof currentObject[key] === 'undefined') {
      if (index < keys.length - 1) {
        currentObject[key] = {}
        currentObject = currentObject[key]
      } else {
        currentObject[key] = text
      }
    }
  }

  return translationObject
}

const doTranslation = async () => {
  let out = {}
  console.log(`\x1b[33mt('${args[0]}')\x1b[0m`)
  console.log('')

  await Promise.all(
    [INITIAL_LANGUAGE, ...SUPPORTED_LANGUAGES].map(async (lang) => {
      const translationObject = await getTranslationsObject(lang)
      const currentTranslation = findExistingTranslation(translationObject, args[0].split('.'))

      if (currentTranslation) {
        console.log(
          `\x1b[34mTranslation for \x1b[33m${lang} \x1b[34malready exist. Translation is: \x1b[33m${currentTranslation}\x1b[0m`,
        )
        return
      }

      const translatedText = await translateWord(lang, args[1])
      out[lang] = translatedText
      const updatedTranslationObject = updateTranslation(
        translationObject,
        args[0].split('.'),
        translatedText,
      )
      await updateTranslationFile(lang, updatedTranslationObject)

      console.log(`\x1b[33m${lang} \x1b[34mtranslated\x1b[0m`)
    }),
  )

  return out
}

doTranslation().then((out) => {
  console.log('')
  console.log('Translations: ', JSON.stringify(out, null, 2))
})
