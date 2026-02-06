let counter = 0;

export function gensym(prefix = "T2:G"): string {
  counter += 1;
  // pretty lame entropy, what could possibly go wrong?
  return `${prefix}_${counter}_${Math.floor(Math.random()*1e10)}`;
}

export function resetGensym(): void {
  counter = 0;
}