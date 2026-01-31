let counter = 0;

export function gensym(prefix = "G__"): string {
  counter += 1;
  return `${prefix}${counter}`;
}

export function resetGensym(): void {
  counter = 0;
}