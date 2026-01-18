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
function isAvailable(obj: any, key: any): unknown {
  return obj.hasOwnProperty(key);
}
function isNotAvailable(obj: any, key: any): boolean {
  return !obj.hasOwnProperty(key);
}
function loadLanguage(collection: any, lang: any): unknown {
  if (isAvailable(collection, lang)) {
    return collection[lang];
  } else {
    return null;
  }
}
function selectElement(collection: any, elem: any): unknown {
  if (isAvailable(collection, elem)) {
    return collection[elem];
  } else {
    return null;
  }
}
console.log("hello world");
