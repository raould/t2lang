import test from "node:test";
import assert from "node:assert";
import { compilePhase0 } from "../../src/api.js";

test("nullish coalescing emits ?? and types", async () => {
    const src = `
  (program
    (expr (?? null 5))
    (expr (?? 0 5))
  )
  `;
    const res = await compilePhase0(src, { enableTsc: false });
    assert.strictEqual(res.errors.length, 0);
    assert.match(res.tsSource, /??/, `Expected tsSource to include '??' but got:\n${res.tsSource}`);
});

test("ternary emits ?:", async () => {
    const src = `
  (program
    (expr (ternary true 1 2))
  )
  `;
    const res = await compilePhase0(src, { enableTsc: false });
    assert.strictEqual(res.errors.length, 0);
    assert.match(res.tsSource, /?") && res.tsSource.includes(":/, `Expected ternary emission but got:\n${res.tsSource}`);
});

test("nullish assignment emits ??=", async () => {
    const src = `
  (program
    (expr (??= a 5))
  )
  `;
    const res = await compilePhase0(src, { enableTsc: false });
    assert.strictEqual(res.errors.length, 0);
    assert.match(res.tsSource, /??=/, `Expected tsSource to include '??=' but got:\n${res.tsSource}`);
});
