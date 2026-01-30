import test from "node:test";
import assert from "node:assert";
import { compilePhaseA } from "../src/api.js";
import { generateCode } from "../src/codegen.js";
import {
  Program,
  ExprStmt,
  Identifier,
  FunctionExpr,
  ReturnExpr,
  Span,
  TypeParam,
  TypePrimitive,
  TypeRef,
} from "../src/phaseA1.js";

const makeSpan = (label = "codegen"): Span => ({
  start: 0,
  end: label.length,
  source: label,
  startLine: 1,
  startColumn: 1,
  endLine: 1,
  endColumn: label.length,
});

const mkIdentifier = (name: string): Identifier => new Identifier({ name, span: makeSpan(`ident:${name}`) });
const makeTypeRef = (name: string): TypeRef => new TypeRef({ identifier: mkIdentifier(name), span: makeSpan(`type:${name}`) });
const makeTypePrimitive = (kind: TypePrimitive["kind"]): TypePrimitive =>
  new TypePrimitive({ kind, span: makeSpan(`type:${kind}`) });

test("compilePhaseA parses/serializes/codegens simple let*", async () => {
  const source = `(program (let* ((x 42)) x))`;
  const result = await compilePhaseA(source);
  if (result.diagnostics.length > 0) {
    console.error(result.diagnostics);
  }
  assert.strictEqual(result.snapshots.length, 4);
  assert.strictEqual(result.events.length, 12);
  assert.ok(result.tsSource.includes("let x = 42"));
  assert.ok(result.tsSource.includes("x"));
});

test("compilePhaseA generates for loops", async () => {
  const source = `(program
    (for classic
      (assign i 0)
      (< i 2)
      (+ i 1)
      (call log i))
    (for of
      ((item) items)
      (call log item))
    (for await
      ((value) (call fetchValues))
      (call log value))
  )`;
  const result = await compilePhaseA(source);
  if (result.diagnostics.length > 0) {
    console.error(result.diagnostics);
  }
  assert.ok(result.tsSource.includes("for ("));
  assert.ok(result.tsSource.includes("for (let item of items)"));
  assert.ok(result.tsSource.includes("for await (let value of fetchValues())"));
});

test("compilePhaseA emits control-flow nesting", async () => {
  const source = `(program
    (throw 42)
    (try
      (call run)
      (catch (err)
        (call handle err))
      (finally
        (call cleanup)))
    (switch x
      (case 1 (call branchOne))
      (case 2 (call branchTwo))
      (default (call fallback))))`;
  const result = await compilePhaseA(source);
  assert.ok(result.tsSource.includes("throw 42"));
  assert.ok(result.tsSource.includes("try {"));
  assert.ok(result.tsSource.includes("catch (err)"));
  assert.ok(result.tsSource.includes("finally {"));
  assert.ok(result.tsSource.includes("switch (x)"));
});

test("compilePhaseA emits prop/index/object/new output", async () => {
  const source = `(program
    (let* ((obj (object (foo 1) (bar 2))))
    (call log
      (prop obj foo)
      (index obj (call getKey))
      (new Widget obj)))
  )`;
  const result = await compilePhaseA(source);
  if (result.diagnostics.length > 0) {
    console.error(result.diagnostics);
  }
  assert.ok(result.tsSource.includes("let obj = { foo: 1, bar: 2 }"));
  assert.ok(result.tsSource.includes("obj.foo"));
  assert.ok(result.tsSource.includes("obj[getKey()]"));
  assert.ok(result.tsSource.includes("new Widget(obj)"));
});

test("compilePhaseA emits import/export statements", async () => {
  const source = `(program
    (import-default Default "./default")
    (import-named ((Foo alias) Bar) "./named")
    (import-all Everything "./all")
    (export Bar)
    (export-default (call Default 42))
  )`;
  const result = await compilePhaseA(source);
  if (result.diagnostics.length > 0) {
    console.error(result.diagnostics);
  }
  assert.ok(result.tsSource.includes("import Default from \"./default\";"));
  assert.ok(result.tsSource.includes("import { Foo as alias, Bar } from \"./named\";"));
  assert.ok(result.tsSource.includes("import * as Everything from \"./all\";"));
  assert.ok(result.tsSource.includes("export { Bar };"));
  assert.ok(result.tsSource.includes("export default Default(42);"));
});

test("generateCode emits function expressions", async () => {
  const paramId = mkIdentifier("value");
  const fn = new FunctionExpr({
    signature: { parameters: [{ name: paramId }] },
    body: [
      new ReturnExpr({
        span: makeSpan("return"),
        value: mkIdentifier("value"),
      }),
    ],
    span: makeSpan("function"),
  });
  const stmt = new ExprStmt({ expr: fn, span: makeSpan("expr") });
  const program = new Program({ body: [stmt], span: makeSpan("program") });
  const result = await generateCode(program);
  assert.ok(result.tsSource.includes("function"));
  assert.ok(result.tsSource.includes("return value;"));
});

test("compilePhaseA emits type alias definitions", async () => {
  const source = `(program
    (type-alias OptionalValue
      (typeparams (T (extends (type-string)) (default (type-number))))
      (type-union
        (type-ref T)
        (type-null)))
    (type-alias MapIt
      (type-mapped (T)
        (type-ref Value)
        (type-ref Identity)
        readonly
        optional
        (type-null)))
)`;
  const result = await compilePhaseA(source);
  assert.ok(
    result.tsSource.includes("type OptionalValue<T extends string = number> = T | null;")
  );
  assert.ok(
    result.tsSource.includes("type MapIt = { readonly [T in null as Identity]?: Value };")
  );
});

test("generateCode emits async generator with type params", async () => {
  const typeParam = new TypeParam({
    name: mkIdentifier("T"),
    span: makeSpan("type-param"),
    constraint: makeTypePrimitive("type-string"),
  });
  const paramId = mkIdentifier("value");
  const fn = new FunctionExpr({
    signature: {
      parameters: [{
        name: paramId,
        typeAnnotation: makeTypeRef("T"),
      }],
      returnType: makeTypePrimitive("type-number"),
    },
    body: [
      new ReturnExpr({
        span: makeSpan("return"),
        value: paramId,
      }),
    ],
    span: makeSpan("function"),
    async: true,
    generator: true,
    typeParams: [typeParam],
  });
  const stmt = new ExprStmt({ expr: fn, span: makeSpan("expr") });
  const program = new Program({ body: [stmt], span: makeSpan("program") });
  const result = await generateCode(program);
  assert.ok(
    result.tsSource.includes("async function*<T extends string>(value: T): number {")
  );
  assert.ok(result.tsSource.includes("return value;"));
});