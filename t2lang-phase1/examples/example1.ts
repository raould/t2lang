type TypeA = {};
type TypeB = {};
type TypeC = {};
type TypeD = {};
type AllowedElements = { video: TypeA; audio: TypeB; canvas: TypeC };
type Languages = {
  de: TypeD;
  en: TypeD;
  pt: TypeD;
  es: TypeD;
  fr: TypeD;
  ja: TypeD;
};
function isAvailable(obj, key) {
  return obj.hasOwnProperty(key);
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
