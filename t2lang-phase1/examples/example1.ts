/* eslint-disable @typescript-eslint/no-unused-vars */
type TypeA = Record<string, unknown>;
type TypeB = Record<string, unknown>;
type TypeC = Record<string, unknown>;
type TypeD = Record<string, unknown>;
type AllowedElements = { video: TypeA; audio: TypeB; canvas: TypeC };
type Languages = {
  de: TypeD;
  en: TypeD;
  pt: TypeD;
  es: TypeD;
  fr: TypeD;
  ja: TypeD;
};
function isAvailable(obj: Record<string, unknown>, key: string) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
function loadLanguage(collection: Record<string, any>, lang: string) {
  if (isAvailable(collection, lang)) {
    return collection[lang];
  } else {
    return null;
  }
}
function selectElement(collection: Record<string, any>, elem: string) {
  if (isAvailable(collection, elem)) {
    return collection[elem];
  } else {
    return null;
  }
}
