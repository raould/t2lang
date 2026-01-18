type TypeA = object;
type TypeB = object;
type TypeC = object;
type TypeD = object;
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
  return Object.prototype.hasOwnProperty.call(obj, key);
}
function isNotAvailable(obj: any, key: any): unknown {
  if (Object.prototype.hasOwnProperty.call(obj, key)) {
    return false;
  } else {
    return true;
  }
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

// reference types and functions to avoid unused-variable lint errors in example
const _typeRef: AllowedElements | Languages = {} as any;
void _typeRef;
void isNotAvailable;
void loadLanguage;
void selectElement;
