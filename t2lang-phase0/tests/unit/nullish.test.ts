import test from "node:test";
import assert from "node:assert";
import { compilePhase0 } from "../../src/api.js";

test("nullish coalescing currently unsupported (placeholder test)", async () => {
    const src = `
  (program
    (expr (?? null "fallback"))
  )
  `;
    const res = await compilePhase0(src, { enableTsc: false });
    // Current behavior: nullish coalescing is not implemented as an operator in Phase0
    // and is emitted as a regular call-head `??(...)`. Assert that emission occurs.
    assert.strictEqual(res.errors.length, 0);
    assert.ok(res.tsSource.includes("??"), `Expected tsSource to include '??' but got:\n${res.tsSource}`);
});
