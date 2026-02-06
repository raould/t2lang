import test from "node:test";
import assert from "node:assert";
import { compile } from "../../../src/api";

test("class getters and setters are emitted in TS output", async () => {
  const src = `
    (program
      (class C
        (class-body
          (field private "_value" 0)
          (getter "value" ((type-number))
            (prop this "_value"))
          (setter "value" ((v (type-number)))
            (assign (prop this "_value") v))))
    )
  `;
  const result = await compile(src, );
  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.strictEqual(result.diagnostics.length, 0);
  assert.match(result.tsSource, /get\s+value\(\):\s*number/);
  assert.match(result.tsSource, /set\s+value\(v:\s*number\)/);
});
