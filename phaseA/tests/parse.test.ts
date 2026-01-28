import test from "node:test";
import assert from "node:assert";
import { parseSource } from "../src/parse.js";
import {
  LetStarExpr,
  ExprStmt,
  ArrayExpr,
  Identifier,
  ForClassic,
  ForOf,
  ForAwait,
  AssignExpr,
  CallExpr,
  ThrowExpr,
  TryCatchExpr,
  SwitchStmt,
  ImportStmt,
  ExportStmt,
  Literal,
  PropExpr,
  IndexExpr,
  ObjectExpr,
  NewExpr,
} from "../src/phaseA1.js";

test("parseSource skips comments and preserves original line numbers", () => {
  const source = `(program
; line comment
(let* ((x 1)) x) // trailing comment
/* block
comment */
(array 1 2)
)`;

  const program = parseSource(source, "comments.t2");
  const letStar = program.body[0];
  assert.ok(letStar instanceof LetStarExpr);
  assert.strictEqual(letStar.span.startLine, 3);

  const bindingTarget = letStar.bindings[0].target;
  assert.ok(bindingTarget instanceof Identifier);
  assert.strictEqual(bindingTarget.span.startLine, 3);

  const arrayStmt = program.body[1];
  assert.ok(arrayStmt instanceof ExprStmt);
  assert.ok(arrayStmt.expr instanceof ArrayExpr);
  assert.strictEqual(arrayStmt.span.startLine, 6);
});

test("parseSource handles for loops", () => {
  const source = `(program
  (for classic
    (assign i 0)
    (< i 3)
    (+ i 1)
    (call log i))
  (for of
    ((item) items)
    (call log item))
  (for await
    ((value) (call fetchValues))
    (call log value))
)`;

  const program = parseSource(source);
  const [classicLoop, forOfLoop, forAwaitLoop] = program.body;

  assert.ok(classicLoop instanceof ForClassic);
  assert.ok(forOfLoop instanceof ForOf);
  assert.ok(forAwaitLoop instanceof ForAwait);

  assert.ok(classicLoop.init instanceof AssignExpr);
  assert.ok(classicLoop.condition instanceof CallExpr);
  assert.ok(classicLoop.update instanceof CallExpr);

  assert.ok(forOfLoop.binding.target instanceof Identifier);
  assert.strictEqual((forOfLoop.binding.target as Identifier).name, "item");
  assert.ok(forAwaitLoop.binding.target instanceof Identifier);
  assert.ok(forAwaitLoop.iterable instanceof CallExpr);
});

test("parseSource handles control-flow nesting", () => {
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

  const program = parseSource(source);
  const [throwStmt, tryStmt, switchStmt] = program.body;

  assert.ok(throwStmt instanceof ExprStmt);
  assert.ok((throwStmt as ExprStmt).expr instanceof ThrowExpr);

  assert.ok(tryStmt instanceof ExprStmt);
  const tryExpr = (tryStmt as ExprStmt).expr;
  assert.ok(tryExpr instanceof TryCatchExpr);
  assert.strictEqual(tryExpr.catchClause?.body.length, 1);
  assert.strictEqual(tryExpr.finallyClause?.body.length, 1);
  assert.ok(tryExpr.catchClause?.binding?.target instanceof Identifier);

  assert.ok(switchStmt instanceof SwitchStmt);
  assert.strictEqual(switchStmt.cases.length, 3);
  assert.strictEqual(switchStmt.cases[2].test, null);
});

test("parseSource handles prop/index/object/new expressions", () => {
  const source = `(program
    (let* ((obj (object (foo 1) (bar 2))))
    (call log
      (prop obj foo)
      (index obj (call getKey))
      (new Widget obj)))
  )`;

  const program = parseSource(source);
  const [letStar] = program.body;

  assert.ok(letStar instanceof LetStarExpr);
  const bindingInit = letStar.bindings[0].init;
  assert.ok(bindingInit instanceof ObjectExpr);
  assert.strictEqual(bindingInit.fields.length, 2);

  assert.strictEqual(letStar.body.length, 1);
  const exprStmt = letStar.body[0];
  assert.ok(exprStmt instanceof ExprStmt);
  const callExpr = exprStmt.expr;
  assert.ok(callExpr instanceof CallExpr);
  assert.strictEqual(callExpr.args.length, 3);

  const [propExpr, indexExpr, newExpr] = callExpr.args;
  assert.ok(propExpr instanceof PropExpr);
  assert.ok(indexExpr instanceof IndexExpr);
  assert.ok(newExpr instanceof NewExpr);

  assert.strictEqual(propExpr.name, "foo");
  assert.ok(indexExpr.index instanceof CallExpr);
  assert.ok(indexExpr.object instanceof Identifier);
  assert.strictEqual((indexExpr.object as Identifier).name, "obj");
  assert.ok(newExpr.callee instanceof Identifier);
  assert.strictEqual(newExpr.callee.name, "Widget");
  assert.strictEqual(newExpr.args.length, 1);
});

test("parseSource handles import/export statements", () => {
  const source = `(program
    (import-default Default "./default")
    (import-named ((Foo alias) Bar) "./named")
    (import-all Everything "./all")
    (export Bar)
    (export-default (call Default))
  )`;

  const program = parseSource(source);
  const [importDefault, importNamed, importAll, exportNamed, exportDefault] = program.body;

  assert.ok(importDefault instanceof ImportStmt);
  assert.strictEqual(importDefault.spec.defaultBinding?.name, "Default");
  assert.ok(importDefault.spec.source instanceof Literal);
  assert.strictEqual(importDefault.spec.source.value, "./default");

  assert.ok(importNamed instanceof ImportStmt);
  assert.strictEqual(importNamed.spec.named?.length, 2);
  assert.strictEqual(importNamed.spec.named?.[0].imported, "Foo");
  assert.strictEqual(importNamed.spec.named?.[0].local.name, "alias");

  assert.ok(importAll instanceof ImportStmt);
  assert.strictEqual(importAll.spec.namespaceBinding?.name, "Everything");

  assert.ok(exportNamed instanceof ExportStmt);
  assert.strictEqual(exportNamed.spec.named?.[0].exported, "Bar");

  assert.ok(exportDefault instanceof ExportStmt);
  assert.ok(exportDefault.spec.defaultExport instanceof CallExpr);
});
