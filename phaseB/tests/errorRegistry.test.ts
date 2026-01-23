import test from "node:test";
import assert from "node:assert";
import type { ListNode, SymbolNode } from "../src/reader.js";
import type { MacroDefNode, PhaseBSurfaceNode } from "../src/ast.js";
import type { SourceLoc } from "../src/location.js";
import { parseSexpr } from "../src/reader.js";
import { expand } from "../src/expander.js";
import { MacroRegistry } from "../src/macroRegistry.js";
import { PhaseBError } from "../src/errorRegistry.js";
import { parseTypeExpression } from "../src/typeExpr.js";

const fakeLoc: SourceLoc = {
  file: "errors.test.t2",
  line: 1,
  column: 1,
  endLine: 1,
  endColumn: 1,
};

function createSymbol(name: string): SymbolNode {
  return { kind: "symbol", name, loc: fakeLoc };
}

function createList(elements: PhaseBSurfaceNode[]): ListNode {
  return { kind: "list", elements: elements as ListNode["elements"], loc: fakeLoc };
}

test("type parser reports unexpected trailing token as E110", () => {
  assert.throws(
    () => parseTypeExpression("number foo"),
    (error) => error instanceof PhaseBError && error.code === "E110" && error.message.includes("foo")
  );
});

test("type parser reports missing identifier after typeof as E111", () => {
  assert.throws(
    () => parseTypeExpression("typeof"),
    (error) => error instanceof PhaseBError && error.code === "E111"
  );
});

test("type parser reports missing closing bracket as E112", () => {
  assert.throws(
    () => parseTypeExpression("[number"),
    (error) => error instanceof PhaseBError && error.code === "E112" && error.message.includes("]")
  );
});

test("expander surfaces unsupported macro substitution as E101", () => {
  const registry = new MacroRegistry();
  const macroBody = [createList([createSymbol("wrap"), createSymbol("x")])];
  registry.define({ name: "bad", params: ["x"], body: macroBody, loc: fakeLoc });
  const macroDef: MacroDefNode = {
    kind: "macro-def",
    name: createSymbol("inner"),
    params: [],
    body: [],
    loc: fakeLoc,
  };
  const invocation = createList([
    createSymbol("bad"),
    macroDef as unknown as PhaseBSurfaceNode,
  ]);
  assert.throws(
    () => expand([invocation], registry),
    (error) => error instanceof PhaseBError && error.code === "E101"
  );
});

test("expander surfaces unsupported unquote-splicing as E102", () => {
  const registry = new MacroRegistry();
  const nodes = parseSexpr("`(a ~@b)", "errors.t2");
  assert.throws(
    () => expand(nodes, registry),
    (error) => error instanceof PhaseBError && error.code === "E102"
  );
});
