import test from "node:test";
import assert from "node:assert";
import { Substitutor } from "../../src/lib/substitute.js";
import type { Identifier, Expr } from "../../src/ast/nodes.js";

const loc = { file: "test", start: 0, end: 0, line: 1, column: 1 };
function id(name: string): Identifier { return { kind: "identifier", name, location: loc }; }
function lit(n: number | string | null) { return { kind: "literal", value: n as unknown as number | string | null, location: loc } as Expr; }



test("substituteAndExpand replaces identifier bound in bindings", () => {
    const s = new Substitutor();
    const bindings = new Map<string, Expr>();
    bindings.set("x", lit(42));
    const out = s.substituteAndExpand(id("x"), bindings) as Expr;
    assert.strictEqual(out.kind, "literal");
    assert.strictEqual((out as Expr).value, 42);
});

test("substituteInQuote handles ~ shorthand identifier", () => {
    const s = new Substitutor();
    const bindings = new Map<string, Expr>();
    bindings.set("a", lit(9));
    const idTok = { kind: "identifier", name: "~a", location: loc } as Identifier;
    const out = s.substituteInQuote(idTok, bindings) as Expr;
    // This should behave like unquote ~a -> literal 9
    assert.strictEqual(out.kind, "literal");
    assert.strictEqual(out.value, 9);
});

test("substituteInQuote returns splice marker for unquote-splice result", () => {
    const s = new Substitutor();
    const bindings = new Map<string, Expr>();
    bindings.set("x", { kind: "array", elements: [lit(1), lit(2)], location: loc } as any);
    // simulate unquote-splice form
    const out = s.substituteInQuote({ kind: "unquote-splice", expr: id("x"), location: loc } as any, bindings) as any;
    assert.strictEqual(out.kind, "__splice");
    assert.deepStrictEqual((out as any).items.map((i: any) => i.value), [1, 2]);
});
