import { addValue, VALUE } from "./A.js";
{
  const useA  = function(n: number): number {
    return addValue(n);
  };
  const RESULT  = useA(VALUE);
  console.log("RESULT", RESULT);
}
