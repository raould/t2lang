import test from "node:test";
import assert from "node:assert";
import { compilePhase0 } from "../../../src/api";

test("dumpAst=true emits parse astDump event", async () => {
    const src = `(program (let* ((x 1)) x))`;
    const result = await compilePhase0(src, { dumpAst: true, enableTsc: false });
    if (result.errors.length > 0) { console.error(result.errors); }
    assert.strictEqual(result.errors.length, 0);
    const hasAstDump = result.events.some(e => e.kind === "astDump" && e.phase === "parse");
    assert.ok(hasAstDump, "Expected parse astDump event when dumpAst=true");
    const astEvent = result.events.find(e => e.kind === "astDump" && e.phase === "parse");
    assert.ok(astEvent && astEvent.data && astEvent.data.ast, "astDump should include AST in data");
});

test("dumpAst=false does not emit parse astDump event", async () => {
    const src = `(program (let* ((x 1)) x))`;
    const result = await compilePhase0(src, { dumpAst: false, enableTsc: false });
    if (result.errors.length > 0) { console.error(result.errors); }
    assert.strictEqual(result.errors.length, 0);
    const hasAstDump = result.events.some(e => e.kind === "astDump" && e.phase === "parse");
    assert.strictEqual(hasAstDump, false, "Did not expect parse astDump event when dumpAst=false");
});