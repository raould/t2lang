import test from "node:test";
import assert from "node:assert";
import { compile } from "../../../src/api";

test("enum declarations emit in TS output", async () => {
  const src = `
    (program
      (enum Direction
        (enum-body
          ("Up" 0)
          ("Down" 1)
          ("Left")
          ("Right")))
      (let* ((dir (prop Direction "Up")))
        (return dir))
    )
  `;
  const result = await compile(src, );
  if (result.errors.length > 0) { console.error(result.errors); }
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /enum\s+Direction/);
  assert.match(result.tsSource, /Up\s*=\s*0/);
  assert.match(result.tsSource, /Down\s*=\s*1/);
  assert.match(result.tsSource, /Direction\.Up/);
});
