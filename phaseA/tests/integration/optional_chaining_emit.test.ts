import test from "node:test";
import assert from "node:assert";
import { compile } from "../../src/api";

test("optional chaining emits ?. syntax", async () => {
  const result = (await compile(`(program
    (call log
      (?. obj "foo")
      (?.[] obj key)
      (?.call fn 1 2)))`)) as Awaited<ReturnType<typeof compile>> & { errors: unknown[] };
  result.errors ??= [];
  if (result.errors.length > 0) { console.error(result.errors); }
  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.strictEqual(result.diagnostics.length, 0);
  assert.match(result.tsSource, /obj\?\.foo/);
  assert.match(result.tsSource, /obj\?\.\[key\]/);
  assert.match(result.tsSource, /fn\?\.\(1, 2\)/);
});
