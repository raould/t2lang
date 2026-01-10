import test from "node:test";
import assert from "node:assert";
import { QuotedToAstConverter, SpliceMarker } from "../../src/lib/convertQuotedToAst.js";
import type { CallExpr, Identifier, LiteralExpr } from "../../src/ast/nodes.js";

const loc = { file: "test", start: 0, end: 0, line: 1, column: 1 };

function id(name: string): Identifier { return { kind: "identifier", name, location: loc }; }
function lit(n: number | string | null): LiteralExpr { return { kind: "literal", value: n as any, location: loc }; }

test("convert call with splice flattens into args", () => {
    const conv = new QuotedToAstConverter();
    const splice: SpliceMarker = { kind: "__splice", items: [lit(2), lit(3)], location: loc };
    const call: CallExpr = { kind: "call", callee: id("call"), args: [id("foo"), splice], location: loc };
    const out = conv.convertQuotedToAst(call) as CallExpr;
    assert(out.kind === "call");
    // callee becomes foo
    assert((out.callee as any).name === "foo");
    // args flattened: 2,3
    const args = out.args;
    assert(args.length === 2);
});

test("convert prop with literal name", () => {
    const conv = new QuotedToAstConverter();
    const call: CallExpr = { kind: "call", callee: id("prop"), args: [id("obj"), lit("name")], location: loc };
    const out = conv.convertQuotedToAst(call) as any;
    assert(out.kind === "prop");
    assert(out.property === "name");
});

test("convert new with single array arg expands into arguments", () => {
    const conv = new QuotedToAstConverter();
    const arr = { kind: "array", elements: [lit(1), lit(2), lit(3)], location: loc } as any;
    const call: CallExpr = { kind: "call", callee: id("new"), args: [id("C"), arr], location: loc };
    const out = conv.convertQuotedToAst(call) as any;
    assert(out.kind === "new");
    assert(out.args.length === 3);
});

test("convert return with no value yields null", () => {
    const conv = new QuotedToAstConverter();
    const call: CallExpr = { kind: "call", callee: id("return"), args: [], location: loc };
    const out = conv.convertQuotedToAst(call) as any;
    assert(out.kind === "return");
    assert(out.value === null);
});

test("convert let* with array-of-bindings parses bindings", () => {
    const conv = new QuotedToAstConverter();
    // (let* ( (x 1) (y 2) ) (call (prop console "log") x y))
    const bind1 = { kind: "call", callee: id("x"), args: [lit(1)], location: loc } as CallExpr;
    const bind2 = { kind: "call", callee: id("y"), args: [lit(2)], location: loc } as CallExpr;
    const bindingsArray = { kind: "array", elements: [bind1, bind2], location: loc } as any;
    const bodyCall = { kind: "call", callee: id("call"), args: [{ kind: "call", callee: id("prop"), args: [id("console"), lit("log")], location: loc }, id("x"), id("y")], location: loc } as CallExpr;
    const call: CallExpr = { kind: "call", callee: id("let*"), args: [bindingsArray, bodyCall], location: loc };

    const out = conv.convertQuotedToAst(call) as any;
    assert(out.kind === "let*");
    assert(out.bindings.length === 2);
    assert(out.bindings[0].name.name === "x");
    assert(out.bindings[1].name.name === "y");
});
