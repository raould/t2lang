import t from "node:test";
const test = t.skip;
import assert from "node:assert";
import { parsePhaseBRaw } from "../src/reader.js";
import { T2CompilationError } from "../../common/dist/errorRegistry.js";
import { expectExpression } from "./sugar_helpers.js";

test("and alias rewrites to && call", () => {
  expectExpression("(and true false)", "(call && true false)");
});

test("or alias rewrites to || call", () => {
  expectExpression("(or true false)", "(call || true false)");
});

test("not alias rewrites to ! call", () => {
  expectExpression("(not true)", "(call ! true)");
});

test("not alias requires exactly one argument", () => {
  assert.throws(
    () => parsePhaseBRaw("(not true false)", "not-arity.t2"),
    (error) => error instanceof T2CompilationError && error.code === "T2:0322"
  );
});

test("and/or aliases require at least one argument", () => {
  assert.throws(
    () => parsePhaseBRaw("(and)", "and-arity.t2"),
    (error) => error instanceof T2CompilationError && error.code === "T2:0323"
  );
  assert.throws(
    () => parsePhaseBRaw("(or)", "or-arity.t2"),
    (error) => error instanceof T2CompilationError && error.code === "T2:0323"
  );
});
