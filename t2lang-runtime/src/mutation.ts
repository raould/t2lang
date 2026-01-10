import { createRequire } from "node:module";

type Lodash = {
  set: <T>(obj: T, path: Array<string | number | symbol>, value: unknown) => T;
  update: <T>(obj: T, path: Array<string | number | symbol>, updater: (value: unknown) => unknown) => T;
  merge: <T>(obj: T, ...sources: unknown[]) => T;
  cloneDeep: <T>(value: T) => T;
  sortBy: <T>(collection: T[], iteratee?: (value: T) => unknown) => T[];
  reverse: <T>(array: T[]) => T[];
};

const require = createRequire(import.meta.url);
const lodash = require("../vendor/lodash.min.cjs") as Lodash;

type Path = Array<string | number | symbol>;

type Key = string | number | symbol;

type DeleteTarget = Record<Key, unknown> | Map<unknown, unknown>;

type SetTarget = Record<Key, unknown> | Map<unknown, unknown>;

export function setIn<T>(obj: T, path: Path, value: unknown): T {
  const copy = lodash.cloneDeep(obj);
  return lodash.set(copy, path, value);
}

export function setInMut<T>(obj: T, path: Path, value: unknown): T {
  return lodash.set(obj, path, value);
}

export function updateIn<T>(obj: T, path: Path, updater: (value: unknown) => unknown): T {
  const copy = lodash.cloneDeep(obj);
  return lodash.update(copy, path, updater);
}

export function updateInMut<T>(obj: T, path: Path, updater: (value: unknown) => unknown): T {
  return lodash.update(obj, path, updater);
}

export function merge<T>(obj: T, ...sources: unknown[]): T {
  const copy = lodash.cloneDeep(obj);
  return lodash.merge(copy, ...sources);
}

export function mergeMut<T>(obj: T, ...sources: unknown[]): T {
  return lodash.merge(obj, ...sources);
}

export function set<T extends SetTarget>(obj: T, key: Key, value: unknown): T {
  if (obj instanceof Map) {
    const copy = new Map(obj);
    copy.set(key, value);
    return copy as T;
  }
  const copy = lodash.cloneDeep(obj);
  (copy as Record<Key, unknown>)[key] = value;
  return copy as T;
}

export function setMut<T extends SetTarget>(obj: T, key: Key, value: unknown): T {
  if (obj instanceof Map) {
    obj.set(key, value);
    return obj;
  }
  (obj as Record<Key, unknown>)[key] = value;
  return obj;
}

export function push<T>(arr: T[], value: T): T[] {
  return [...arr, value];
}

export function pushMut<T>(arr: T[], value: T): T[] {
  arr.push(value);
  return arr;
}

export function pop<T>(arr: T[]): T[] {
  return arr.slice(0, -1);
}

export function popMut<T>(arr: T[]): T[] {
  arr.pop();
  return arr;
}

export function sortBy<T>(arr: T[], iteratee?: (value: T) => unknown): T[] {
  return lodash.sortBy(arr, iteratee);
}

export function sortByMut<T>(arr: T[], compareFn?: (a: T, b: T) => number): T[] {
  arr.sort(compareFn);
  return arr;
}

export function reverse<T>(arr: T[]): T[] {
  const copy = [...arr];
  return lodash.reverse(copy);
}

export function reverseMut<T>(arr: T[]): T[] {
  return lodash.reverse(arr);
}

export function deleteKey<T extends DeleteTarget>(obj: T, key: Key): T {
  if (obj instanceof Map) {
    const copy = new Map(obj);
    copy.delete(key);
    return copy as T;
  }
  const copy = lodash.cloneDeep(obj);
  delete (copy as Record<Key, unknown>)[key];
  return copy as T;
}

export function deleteKeyMut<T extends DeleteTarget>(obj: T, key: Key): T {
  if (obj instanceof Map) {
    obj.delete(key);
    return obj;
  }
  delete (obj as Record<Key, unknown>)[key];
  return obj;
}
