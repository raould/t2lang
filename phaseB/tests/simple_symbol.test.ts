import test from "node:test";
import assert from "node:assert";
import { runE2E_NodeJS } from "./e2e_helpers.js";

test("Symbol.iterator computed key works in for-of", async () => {
    const source = `(program
        (let* ((iterable { [Symbol.iterator] (fn generator () (yield 1) (yield 2)) }))
            (for of ((value) iterable)
                (call (prop console "log") value)))
    )`;

    const [result, tscErrors, { stdout, stderr }] = await runE2E_NodeJS(source);
    if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
    assert.strictEqual(tscErrors.length, 0, `Expected no TypeScript errors, got: ${tscErrors.join(" | ")}`);
    assert.ok(result.tsSource.length > 0, "Expected emitted TypeScript output");
    assert.strictEqual(stderr.length, 0);
    const cleanStdout = stdout.replace(/\x1B\[[0-9;]*m/g, "").trim();
    assert.strictEqual(cleanStdout, "1\n2");
});
