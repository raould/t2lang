/// <reference lib="es2015" />
/// <reference lib="es2018.asynciterable" />
/// <reference lib="dom" />
import { addValue, VALUE } from "./A";
function useA(n: number): number {
  return addValue(n);
}
export { useA };
const RESULT = useA(VALUE);
export { RESULT };
console.log("RESULT", RESULT);
