import test from "node:test";
import assert from "node:assert";
import { QuotedToAstConverter } from "../../src/lib/convertQuotedToAst.js";

const loc = { file: "test", start: 0, end: 0, line: 1, column: 1 };
function lit(n: number | string | null) { return { kind: "literal", value: n as any, location: loc }; }
function id(name: string) { return { kind: "identifier", name, location: loc }; }

// Splice marker type used by the converter
const splice = (items: any[]) => ({ kind: "__splice", items, location: loc });

test("flattenQuotedArgs flattens splice markers inline", () => {
    const conv = new QuotedToAstConverter();
    const nodes: any[] = [lit(1), splice([lit(2), lit(3)]), lit(4)];
    const out = conv.flattenQuotedArgs(nodes as any);
    const vals = out.map((n: any) => (n.kind === 'literal') ? n.value : null);
    assert.deepStrictEqual(vals, [1, 2, 3, 4]);
});

test("flattenQuotedArgs preserves array elements as single array entry", () => {
    const conv = new QuotedToAstConverter();
    const arr = { kind: "array", elements: [lit(5), lit(6)], location: loc } as any;
    const nodes: any[] = [lit(1), arr, lit(7)];
    const out = conv.flattenQuotedArgs(nodes as any);
    // Expect second element to be an ArrayExpr
    assert.strictEqual(out.length, 3);
    assert.strictEqual(out[0].kind, 'literal');
    assert.strictEqual(out[1].kind, 'array');
    assert.strictEqual(out[1].elements.length, 2);
    assert.strictEqual(out[1].elements[0].value, 5);
    assert.strictEqual(out[1].elements[1].value, 6);
    assert.strictEqual(out[2].kind, 'literal');
});

test("flattenQuotedArgs treats non-splice elements as single items", () => {
    const conv = new QuotedToAstConverter();
    const nodes: any[] = [id('a'), id('b'), id('c')];
    const out = conv.flattenQuotedArgs(nodes as any);
    assert.strictEqual(out.length, 3);
    assert.strictEqual(out[0].name, 'a');
    assert.strictEqual(out[1].name, 'b');
    assert.strictEqual(out[2].name, 'c');
});
