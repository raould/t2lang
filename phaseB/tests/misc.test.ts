import test from "node:test";
import assert from "node:assert";
import { runE2E_NodeJS } from "./e2e_helpers.js";

async function helper(source: string, expectedOutput: string, echoSource = false) {
    const [compileResult, tscErrors, { stdout, stderr }] = await runE2E_NodeJS(source);
    if (echoSource) { console.log(compileResult.tsSource); }
    assert.strictEqual(tscErrors.length, 0, `Expected no TypeScript errors, got: ${tscErrors.join(" | ")}`);
    assert.ok(compileResult.tsSource.length > 0, "Expected emitted TypeScript output");
    assert.ok(stdout.length > 0);
    assert.strictEqual(stderr.length, 0);
    const cleanStdout = stdout.replace(/\x1B\[[0-9;]*m/g, "").trim();
    assert.strictEqual(cleanStdout, expectedOutput);
}

test("was empirically failing #1", async () => {
    const source = `(program (console.log (+ ((lambda (x:number) (return x)) 2) 3)))`;
    helper(source, "5");
});

test("was empirically failing #2", async () => {
    const source = `(program
        (let* ((f (lambda (x:number) (return x))))
              (call (prop console "log") (call + (call f 2) 3))))`;
    helper(source, "5");
});
