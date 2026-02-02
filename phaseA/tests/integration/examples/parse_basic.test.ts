import test from "node:test";import assert from "node:assert";
import { compile } from "../../../src/api";
 
test("basic parse: call", async () => {
  const source = `(program (fn foo ((x)) x) (call foo 42))`;

  const result = await compile(source, {
    prettyOption: true,
    logLevel: "none",
    enableTsc: false,
    dumpAst: false,
  });

  if (result.errors.length > 0) { console.error(result.errors); }
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /foo\(42\)/);
});

test("parse import-default", async () => {
  const source = `(program (import (import-spec "bar" (default foo))))`;

  const result = await compile(source, { enableTsc: false, dumpAst: false });

  if (result.errors.length > 0) { console.error(result.errors); }
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /import foo from "bar";/);
});

test("parse import-named", async () => {
  const source = `(program (import (import-spec "bar" (named (a b) c))))`;

  const result = await compile(source, { enableTsc: false, dumpAst: false });

  if (result.errors.length > 0) { console.error(result.errors); }
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /import \{ a as b, c \} from "bar";/);
});

test("parse import-all", async () => {
  const source = `(program (import (import-spec "bar" (namespace foo))))`;

  const result = await compile(source, { enableTsc: false, dumpAst: false });

  if (result.errors.length > 0) { console.error(result.errors); }
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /import \* as foo from "bar";/);
});

test("parse export named", async () => {
  const source = `(program (export (export-spec (named foo))))`;

  const result = await compile(source, { enableTsc: false, dumpAst: false });

  if (result.errors.length > 0) { console.error(result.errors); }
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /export \{ foo \};/);
});

test("parse export-default", async () => {
  const source = `(program (export (export-spec (default 42))))`;

  const result = await compile(source, { enableTsc: false, dumpAst: false });

  if (result.errors.length > 0) { console.error(result.errors); }
  assert.strictEqual(result.errors.length, 0);
  assert.match(result.tsSource, /export default 42;/);
});

test("identifier location uses start position", async () => {
  const source = `
    (program
      (fn foo ((x)) x)
      (call foo 1))
  `;

  const result = await compile(source, );
  if (result.errors.length > 0) { console.error(result.errors); }
  assert.strictEqual(result.errors.length, 0);

  const astDump = result.events.find(e => e.kind === "astDump");
  const ast = (astDump?.data as { ast: Program })?.ast;

  const stmt = ast.body[1];
  if (stmt.kind !== "exprStmt") throw new Error("Expected exprStmt");
  const call = stmt.expr;
  if (call.kind !== "call") throw new Error("Expected call");

  assert.ok(typeof call.callee.span.start === "number");
  assert.ok(typeof call.callee.span.end === "number");
  assert.ok(call.callee.span.end > call.callee.span.start);
});
