import test from "node:test";
import assert from "node:assert";
import { compilePhase0 } from "../../../src/api";
import { Program } from "../../../src/ast/nodes";

test("basic parse: call", async () => {
  const source = `(program (function foo (x) x) (foo 42))`;

  const result = await compilePhase0(source, {
    prettyOutput: true,
    logLevel: "none",
    enableTsc: false
  });

  assert.strictEqual(result.errors.length, 0);

  const astDump = result.events.find(e => e.kind === "astDump");
  const ast = (astDump?.data as { ast: Program })?.ast;

  const stmt = ast.body[1];
  if (stmt.kind !== "exprStmt") throw new Error("Expected exprStmt");
  const call = stmt.expr;

  if (call.kind !== "call") throw new Error("Expected call");
  assert.strictEqual(call.callee.name, "foo");
  assert.strictEqual(call.args[0].kind, "literal");
});

test("parse import-default", async () => {
  const source = `(program (import-default foo "bar"))`;

  const result = await compilePhase0(source, { enableTsc: false });

  assert.strictEqual(result.errors.length, 0);

  const astDump = result.events.find(e => e.kind === "astDump");
  const ast = (astDump?.data as { ast: Program })?.ast;

  const stmt = ast.body[0];
  if (stmt.kind !== "import") throw new Error("Expected import");
  assert.strictEqual(stmt.importKind, "default");
  assert.strictEqual(stmt.name, "foo");
  assert.strictEqual(stmt.from, "bar");
});

test("parse import-named", async () => {
  const source = `(program (import-named (a b) "bar"))`;

  const result = await compilePhase0(source, { enableTsc: false });

  assert.strictEqual(result.errors.length, 0);

  const astDump = result.events.find(e => e.kind === "astDump");
  const ast = (astDump?.data as { ast: Program })?.ast;

  const stmt = ast.body[0];
  if (stmt.kind !== "import") throw new Error("Expected import");
  assert.strictEqual(stmt.importKind, "named");
  assert.deepStrictEqual(stmt.names, ["a", "b"]);
  assert.strictEqual(stmt.from, "bar");
});

test("parse import-all", async () => {
  const source = `(program (import-all foo "bar"))`;

  const result = await compilePhase0(source, { enableTsc: false });

  assert.strictEqual(result.errors.length, 0);

  const astDump = result.events.find(e => e.kind === "astDump");
  const ast = (astDump?.data as { ast: Program })?.ast;

  const stmt = ast.body[0];
  if (stmt.kind !== "import") throw new Error("Expected import");
  assert.strictEqual(stmt.importKind, "all");
  assert.strictEqual(stmt.alias, "foo");
  assert.strictEqual(stmt.from, "bar");
});

test("parse export named", async () => {
  const source = `(program (export foo))`;

  const result = await compilePhase0(source, { enableTsc: false });

  assert.strictEqual(result.errors.length, 0);

  const astDump = result.events.find(e => e.kind === "astDump");
  const ast = (astDump?.data as { ast: Program })?.ast;

  const stmt = ast.body[0];
  if (stmt.kind !== "export") throw new Error("Expected export");
  assert.strictEqual(stmt.exportKind, "named");
  assert.strictEqual(stmt.name, "foo");
});

test("parse export-default", async () => {
  const source = `(program (export-default 42))`;

  const result = await compilePhase0(source, { enableTsc: false });

  assert.strictEqual(result.errors.length, 0);

  const astDump = result.events.find(e => e.kind === "astDump");
  const ast = (astDump?.data as { ast: Program })?.ast;

  const stmt = ast.body[0];
  if (stmt.kind !== "export") throw new Error("Expected export");
  assert.strictEqual(stmt.exportKind, "default");
  assert.strictEqual(stmt.declaration?.kind, "literal");
});

test("identifier location uses start position", async () => {
  const source = `
    (program
      (function foo (x) x)
      (foo 1))
  `;

  const result = await compilePhase0(source, { enableTsc: false });
  assert.strictEqual(result.errors.length, 0);

  const astDump = result.events.find(e => e.kind === "astDump");
  const ast = (astDump?.data as { ast: Program })?.ast;

  const stmt = ast.body[1];
  if (stmt.kind !== "exprStmt") throw new Error("Expected exprStmt");
  const call = stmt.expr;
  if (call.kind !== "call") throw new Error("Expected call");

  assert.strictEqual(call.callee.location.line, 4);
  assert.strictEqual(call.callee.location.column, 8);
});
