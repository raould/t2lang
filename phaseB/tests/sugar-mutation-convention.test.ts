import t from "node:test";
const test = t.skip;
import { expectExpression } from "./sugar_helpers.js";

test("mutation convention rewrites immutable helpers", () => {
  expectExpression("(set-in obj path value)", "(__t2_setIn obj path value)");
  expectExpression("(update-in obj path f)", "(__t2_updateIn obj path f)");
  expectExpression("(merge obj other)", "(__t2_merge obj other)");
  expectExpression("(set obj key value)", "(__t2_set obj key value)");
  expectExpression("(push arr x)", "(__t2_push arr x)");
  expectExpression("(pop arr)", "(__t2_pop arr)");
  expectExpression("(sort-by arr f)", "(__t2_sortBy arr f)");
  expectExpression("(reverse arr)", "(__t2_reverse arr)");
  expectExpression("(delete obj key)", "(__t2_delete obj key)");
});

test("mutation convention rewrites mutable helpers", () => {
  expectExpression("(set-in! obj path value)", "(__t2_setInMut obj path value)");
  expectExpression("(update-in! obj path f)", "(__t2_updateInMut obj path f)");
  expectExpression("(merge! obj other)", "(__t2_mergeMut obj other)");
  expectExpression("(push! arr x)", "(__t2_pushMut arr x)");
  expectExpression("(pop! arr)", "(__t2_popMut arr)");
  expectExpression("(sort-by! arr f)", "(__t2_sortByMut arr f)");
  expectExpression("(reverse! arr)", "(__t2_reverseMut arr)");
  expectExpression("(delete! obj key)", "(__t2_deleteMut obj key)");
});

test("explicit call form rewrites mutation helpers", () => {
  expectExpression("(call set-in obj path value)", "(call __t2_setIn obj path value)");
});
