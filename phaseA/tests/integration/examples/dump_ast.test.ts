import test from "node:test";
import assert from "node:assert";
import { compile } from "../../../src/api";

test("dumpAst=true emits parse astDump event", async () => {
    const src = `(program (let* ((x 1)) x))`;
    const result = await compile(src, { dumpAst: true });
    if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
    assert.strictEqual(result.diagnostics.length, 0);
    const hasAstDump = result.events.some(e => e.kind === "astDump" && e.phase === "parse");
    assert.ok(hasAstDump, "Expected parse astDump event when dumpAst=true");
    const astEvent = result.events.find(e => e.kind === "astDump" && e.phase === "parse");
    assert.ok(astEvent && astEvent.data && astEvent.data.ast, "astDump should include AST in data");
});

test("dumpAst=false does not emit parse astDump event", async () => {
    const src = `(program (let* ((x 1)) x))`;
    const result = await compile(src, { dumpAst: false });
    if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
    assert.strictEqual(result.diagnostics.length, 0);
    const hasAstDump = result.events.some(e => e.kind === "astDump" && e.phase === "parse");
    assert.strictEqual(hasAstDump, false, "Did not expect parse astDump event when dumpAst=false");
});