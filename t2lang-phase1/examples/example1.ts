export type TypeA = object;
export type TypeB = object;
export type TypeC = object;
export type TypeD = object;
export type AllowedElements = { video: TypeA; audio: TypeB; canvas: TypeC };
export type Languages = {
  de: TypeD;
  en: TypeD;
  pt: TypeD;
  es: TypeD;
  fr: TypeD;
  ja: TypeD;
};
function isAvailable(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
function loadLanguage(collection, lang) {
  if (isAvailable(collection, lang)) {
    return collection[lang];
  } else {
    return null;
  }
}
function selectElement(collection, elem) {
  if (isAvailable(collection, elem)) {
    return collection[elem];
  } else {
    return null;
  }
}

// reference example symbols to avoid unused-var lint in examples
void isAvailable;
void loadLanguage;
void selectElement;
