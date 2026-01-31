import assert from "node:assert";
import test from "node:test";
import { parseSexpr, SExprNode, SymbolNode } from "../src/reader.js";
import { PhaseBAst, MacroDefNode, DotAccessNode, InfixExprNode } from "../src/ast.js";

const createLoc = () => ({ file: "test.t2", line: 1, column: 1, endLine: 1, endColumn: 1 });

test("MacroDefNode can represent a surface macro definition", () => {
  const [symbol] = parseSexpr("foo", "macro.t2");
  assert.strictEqual(symbol.kind, "symbol");
  const macro: MacroDefNode = {
    kind: "macro-def",
    name: symbol as SymbolNode,
    params: [symbol as SymbolNode],
    body: [symbol],
    loc: createLoc(),
  };
  assert.strictEqual(macro.kind, "macro-def");
  assert.strictEqual(macro.name.name, "foo");
});

test("DotAccessNode chains object and property nodes", () => {
  const [objectSymbol] = parseSexpr("obj", "access.t2");
  assert.strictEqual(objectSymbol.kind, "symbol");
  const propertySymbol = parseSexpr("prop", "access.t2")[0] as SymbolNode;
  const dotAccess: DotAccessNode = {
    kind: "dot-access",
    object: objectSymbol,
    property: propertySymbol,
    loc: createLoc(),
  };
  assert.strictEqual(dotAccess.kind, "dot-access");
  assert.strictEqual((dotAccess.property as SymbolNode).name, "prop");
});

test("InfixExprNode can wrap symbol operands", () => {
  const nodes = parseSexpr("left right", "infix.t2");
  const left = nodes[0];
  const right = nodes[1];
  const infix: InfixExprNode = {
    kind: "infix-expr",
    operator: left as SymbolNode,
    left,
    right,
    loc: createLoc(),
  };
  assert.strictEqual(infix.kind, "infix-expr");
  assert.strictEqual((infix.left as SExprNode).kind, "symbol");
});

test("PhaseBAst collects surface nodes", () => {
  const nodes = parseSexpr("a b c", "ast.t2");
  const ast: PhaseBAst = { nodes };
  assert.strictEqual(ast.nodes.length, 3);
  const allSymbols = ast.nodes.every((node) => node.kind === "symbol");
  assert.strictEqual(allSymbols, true);
});