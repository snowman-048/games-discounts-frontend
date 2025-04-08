import fs from 'fs';
import path from 'path';

export const getTranslationsObject = (lang) => new Promise((resolve, reject) => {
  const filePath = path.join('messages', `${lang}.json`);

  fs.readFile(filePath, 'utf-8', (err, content) => {
    if (err) {
      reject(`getTranslationObject [${lang}] ERROR:`, err);
    } else {
      resolve(JSON.parse(content));
    }
  });
});

export const findExistingTranslation = (translationObject, translationKeys) => {
  let currentTranslation = translationObject;

  let keyIndex = 0;
  while (typeof currentTranslation === 'object' && keyIndex < translationKeys.length) {
    currentTranslation = currentTranslation?.[translationKeys[keyIndex]];
    keyIndex++;
  }

  return currentTranslation;
};

export const updateTranslationFile = (lang, obj) => {
  const filePath = path.join('messages', `${lang}.json`);

  new Promise((resolve, reject) => {
    fs.writeFileSync(filePath, JSON.stringify(obj, null, 2), err => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
};