import test from "node:test";
import assert from "node:assert";
import { compilePhase1 } from "../../../src/api";

test("dumpAst=true emits parse and expand astDump events in Phase1", async () => {
    const src = `(program (let* ((x 1)) x))`;
    const result = await compilePhase1(src, { dumpAst: true, enableTsc: false });
    if (result.errors.length > 0) { console.error(result.errors); }
    assert.strictEqual(result.errors.length, 0);

    const parseDump = result.events.some(e => e.kind === "astDump" && e.phase === "parse");
    const expandDump = result.events.some(e => e.kind === "astDump" && e.phase === "expand");
    assert.ok(parseDump, "Expected parse astDump event in Phase1 when dumpAst=true");
    assert.ok(expandDump, "Expected expand astDump event in Phase1 when dumpAst=true");
});


test("dumpAst=false emits no astDump events in Phase1", async () => {
    const src = `(program (let* ((x 1)) x))`;
    const result = await compilePhase1(src, { dumpAst: false, enableTsc: false });
    if (result.errors.length > 0) { console.error(result.errors); }
    assert.strictEqual(result.errors.length, 0);

    const anyDump = result.events.some(e => e.kind === "astDump");
    assert.strictEqual(anyDump, false, "Expected no astDump events when dumpAst=false");
});