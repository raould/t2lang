import test from "node:test";
import assert from "node:assert";
import { compile } from "../../../src/api";

test("default parameters emit in TS output", async () => {
  const src = `
    (program
      (fn greet ((name (type-string) default "world") (punct default "!"))
        (return name)))
  `;
  const result = await compile(src);
  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.strictEqual(result.diagnostics.length, 0);
  assert.match(result.tsSource, /function\s+greet\(name: string = "world", punct = "!"\)/);
});
