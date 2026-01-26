import test from "node:test";
import assert from "node:assert";
import {
  Program,
  ExprStmt,
  Literal,
  Identifier,
  ForOf,
  ArrayPattern,
  ArrayExpr,
  BlockStmt,
} from "../src/phaseA1.js";
import { serializeProgram } from "../src/serialization.js";

const mkSpan = (label = "span") => ({ start: 0, end: 0, source: `phaseA-tests:${label}` });

test("serialize program with literal expression", () => {
  const program = new Program({
    body: [
      new ExprStmt({
        expr: new Literal({ value: 42, span: mkSpan("lit") }),
        span: mkSpan("expr"),
      }),
    ],
    span: mkSpan("program"),
  });

  const serialized = serializeProgram(program);
  assert.deepStrictEqual(serialized, {
    kind: "program",
    span: mkSpan("program"),
    body: [
      {
        kind: "exprStmt",
        span: mkSpan("expr"),
        expr: {
          kind: "literal",
          span: mkSpan("lit"),
          value: 42,
        },
      },
    ],
  });
});

test("serialize for-of with array pattern binding", () => {
  const target = new ArrayPattern({
    elements: [
      new Identifier({ name: "first", span: mkSpan("first") }),
      new Identifier({ name: "second", span: mkSpan("second") }),
    ],
    span: mkSpan("pattern"),
  });

  const forOfBody = new BlockStmt({
    statements: [
      new ExprStmt({ expr: new Identifier({ name: "first", span: mkSpan("body") }), span: mkSpan("body-expr") }),
    ],
    span: mkSpan("for-body"),
  });

  const forOf = new ForOf({
    binding: { target, init: new ArrayExpr({ elements: [], span: mkSpan("init") }) },
    iterable: new Identifier({ name: "values", span: mkSpan("values") }),
    body: forOfBody,
    span: mkSpan("for-of"),
  });

  const program = new Program({ body: [forOf], span: mkSpan("program") });
  const serialized = serializeProgram(program);

  assert.deepStrictEqual(serialized, {
    kind: "program",
    span: mkSpan("program"),
    body: [
      {
        kind: "for-of",
        span: mkSpan("for-of"),
        binding: {
          target: {
            kind: "array-pattern",
            span: mkSpan("pattern"),
            elements: [
              { kind: "identifier", name: "first", span: mkSpan("first") },
              { kind: "identifier", name: "second", span: mkSpan("second") },
            ],
            rest: undefined,
          },
          init: {
            kind: "array",
            span: mkSpan("init"),
            elements: [],
          },
        },
        iterable: { kind: "identifier", name: "values", span: mkSpan("values") },
        body: {
          kind: "block",
          span: mkSpan("for-body"),
          statements: [
            {
              kind: "exprStmt",
              span: mkSpan("body-expr"),
              expr: { kind: "identifier", name: "first", span: mkSpan("body") },
            },
          ],
        },
      },
    ],
  });
});