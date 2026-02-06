export function normalizeGensymName(name: string): string {
  return name.replace(/_(\d+)_\d+$/, "_$1").replace(/__([0-9]+)/g, "_$1");
}

export function normalizeSerialized(serialized: string): string {
  return serialized.replace(/_(\d+)_\d+/g, "_$1").replace(/__([0-9]+)/g, "_$1");
}
