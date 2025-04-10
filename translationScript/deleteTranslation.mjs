const { INITIAL_LANGUAGE, SUPPORTED_LANGUAGES } = await import('./config.mjs')
const { getTranslationsObject, findExistingTranslation, updateTranslationFile } = await import('./helpers.mjs')

const args = process.argv.slice(2);
const translationKeys = args[0].split('.')

const removeTextFromJson = (translationObject) => {
  let currentObject = translationObject;
  for (const index in translationKeys) {
    const key = translationKeys[index];
    if (+index === translationKeys.length - 1) {
      delete currentObject[key];
    } else if (typeof currentObject[key] === 'object') {
      currentObject = currentObject[key];
    }
  }
  return translationObject
}

const deleteTranslation = async () => {
  await Promise.all([INITIAL_LANGUAGE, ...SUPPORTED_LANGUAGES].map(async lang => {
    const translationObject = await getTranslationsObject(lang);
    const currentTranslation = findExistingTranslation(translationObject, translationKeys);

    if (!currentTranslation) {
      console.log(`\x1b[34mTranslation for \x1b[33m${lang} \x1b[34mdoesn't exist`);
      return;
    }

    const updatedTranslationObject = removeTextFromJson(translationObject)

    await updateTranslationFile(lang, updatedTranslationObject);
  }))
}

deleteTranslation()