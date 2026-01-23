import test from "node:test";
import assert from "node:assert";
import { MacroRegistry, MacroDefinition } from "../src/macroRegistry.js";
import { parseSexpr } from "../src/reader.js";

const makeLoc = () => ({ file: "macro.t2", line: 1, column: 1, endLine: 1, endColumn: 1 });

test("MacroRegistry stores definitions by name", () => {
  const registry = new MacroRegistry();
  const [foo] = parseSexpr("foo", "macro.t2");
  const def: MacroDefinition = {
    name: "foo",
    params: ["bar"],
    body: [foo],
    loc: makeLoc(),
  };

  registry.define(def);

  assert.strictEqual(registry.has("foo"), true);
  assert.strictEqual(registry.get("foo"), def);
});

test("MacroRegistry list returns all definitions", () => {
  const registry = new MacroRegistry();
  const nodeList = parseSexpr("foo", "macro.t2");
  const def: MacroDefinition = {
    name: "foo",
    params: [],
    body: nodeList,
    loc: makeLoc(),
  };
  registry.define(def);

  const definitions = registry.list();
  assert.strictEqual(definitions.length, 1);
  assert.strictEqual(definitions[0].name, "foo");
});

test("MacroRegistry overrides existing definitions", () => {
  const registry = new MacroRegistry();
  const [firstNode] = parseSexpr("foo", "macro.t2");
  const firstDef: MacroDefinition = {
    name: "foo",
    params: ["bar"],
    body: [firstNode],
    loc: makeLoc(),
  };

  registry.define(firstDef);
  const [secondNode] = parseSexpr("bar", "macro.t2");
  const overrideDef: MacroDefinition = {
    name: "foo",
    params: ["baz"],
    body: [secondNode],
    loc: makeLoc(),
  };
  registry.define(overrideDef);

  assert.strictEqual(registry.get("foo"), overrideDef);
  assert.strictEqual(registry.list()[0].params[0], "baz");
});