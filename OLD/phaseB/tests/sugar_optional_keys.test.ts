import test from "node:test";
import assert from "node:assert";
import { expectExpression } from "./sugar_helpers.js";
import { compile } from "../../phaseB/dist/api.js";
import { runE2E_NodeJS } from "./e2e_helpers.js";

test("optional object keys mixed eval e2eNodeJS", async () => {
  const source = `(program
    (let* ((name "Alice")
          (role undefined)
          (age 0)           ;; falsy but valid!
          (active false)    ;; falsy but valid!
          (myobj {name role? role age? age active? active}))
      (console.log myobj))
  )`;
  const [result, tscErrors, { stdout, stderr }] = await runE2E_NodeJS(source);
  assert.strictEqual(tscErrors.length, 0, `Expected no TypeScript errors, got: ${tscErrors.join(" | ")}`);
  assert.ok(result.tsSource.length > 0, "Expected emitted TypeScript output");
  assert.ok(stdout.length > 0);
  assert.strictEqual(stderr.length, 0);
  assert.match(
    result.tsSource,
    /\{\s*name: name,\s*\.\.\.\(\(role != null\) && \{ role: role \}\),\s*\.\.\.\(\(age != null\) && \{ age: age \}\),\s*\.\.\.\(\(active != null\) && \{ active: active \}\)\s*\}/
  );
  const cleanStdout = stdout.replace(/\x1B\[[0-9;]*m/g, "");
  assert.ok(cleanStdout.includes("{ name: 'Alice', age: 0, active: false }"), cleanStdout);
});

test("optional object keys mixed compiled", async () => {
  const result = await compile(`(program
    (let* ((name "Alice")
          (role undefined)
          (age 0)           ;; falsy but valid!
          (active false))    ;; falsy but valid!
    {name role? role age? age active? active})
  )`);
  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.strictEqual(result.diagnostics.length, 0);
  assert.match(result.tsSource, /\{ name: name/);
  assert.match(result.tsSource, /\.\.\.\(?\(?role != null\)? \&\& \{ role: role \}\)?/);
  assert.match(result.tsSource, /\.\.\.\(?\(?age != null\)? \&\& \{ age: age \}\)?/);
  assert.match(result.tsSource, /\.\.\.\(?\(?active != null\)? \&\& \{ active: active \}\)?/);
});

test("optional object keys use Object.assign guards lowered", () => {
  expectExpression(
    "(object \"name\" name \"role?\" maybe-role status?)",
    "(object (\"name\" name) (spread object (&& (!= maybe-role null) (object (\"role\" maybe-role)))) (spread object (&& (!= status null) (object (\"status\" status)))))",
  );
});

test("optional object keys named compiled", async () => {
  const result = await compile('(program (let* ((name "foo")) {name? name}))');
  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.strictEqual(result.diagnostics.length, 0);
  assert.match(result.tsSource, /\{ name: name/);
  assert.match(result.tsSource, /\.\.\.\(?\(?name != null\)? \&\& \{ name: name \}\)?/);
});

test("optional object keys punning compiled", async () => {
  const result = await compile('(program (let* ((name "foo")) {name role? age?}))');
  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.strictEqual(result.diagnostics.length, 0);
  assert.match(result.tsSource, /\{ name: name/);
  assert.match(result.tsSource, /\.\.\.\(?\(?role != null\)? \&\& \{ role: role \}\)?/);
  assert.match(result.tsSource, /\.\.\.\(?\(?age != null\)? \&\& \{ age: age \}\)?/);
});

test("optional object keys include falsy values", async () => {
  const result = await compile(`(program
    (let* ((name "")
           (count 0)
           (active false))
      {name? name count? count active? active})
  )`);
  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.strictEqual(result.diagnostics.length, 0);
  assert.match(result.tsSource, /\.\.\.\(?\(?name != null\)? \&\& \{ name: name \}\)?/);
  assert.match(result.tsSource, /\.\.\.\(?\(?count != null\)? \&\& \{ count: count \}\)?/);
  assert.match(result.tsSource, /\.\.\.\(?\(?active != null\)? \&\& \{ active: active \}\)?/);
});

test("optional object keys exclude null and undefined", async () => {
  const result = await compile(`(program
    (let* ((role null)
           (status undefined))
      {role? status?})
  )`);
  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.strictEqual(result.diagnostics.length, 0);
  assert.match(result.tsSource, /\.\.\.\(?\(?role != null\)? \&\& \{ role: role \}\)?/);
  assert.match(result.tsSource, /\.\.\.\(?\(?status != null\)? \&\& \{ status: status \}\)?/);
});

test("conditional key block in object literal lowered", () => {
  expectExpression(
    "{\"name\" \"Alice\" (when is-admin {\"role\" \"admin\" \"permissions\" all-permissions}) \"age\" 30}",
    "(object (\"name\" \"Alice\") (\"age\" 30) (spread object (&& is-admin (object (\"role\" \"admin\") (\"permissions\" all-permissions)))))",
  );
});

test("conditional key block in object literal compiled", async () => {
  const result = await compile('(program (let* ((is-admin true)) {\"name\" \"Alice\" (when is-admin {\"role\" \"admin\" \"permissions\" all-permissions}) \"age\" 30}))');
  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.strictEqual(result.diagnostics.length, 0);
  assert.match(result.tsSource, /\.\.\.\(?\(?is-admin\)? \&\& \{ role: "admin", permissions: all-permissions \}\)?/);
});

test("optional object keys 'when' e2eNodeJS", async () => {
  const source = `(program
        (let* ((name "Alice")
              (role undefined)
              (age 0)           ;; falsy but valid!
              (active false)    ;; falsy but valid!
              (isAdmin true)
              (allPermissions "all")
              (myobj {name "Alice"
                (when isAdmin
                  {role "admin"
                    permissions allPermissions})
              age 30}))
        (console.log myobj))
  )`;
  const [result, tscErrors, { stdout, stderr }] = await runE2E_NodeJS(source);
  assert.strictEqual(tscErrors.length, 0, `Expected no TypeScript errors, got: ${tscErrors.join(" | ")}`);
  assert.ok(result.tsSource.length > 0, "Expected emitted TypeScript output");
  assert.ok(stdout.length > 0);
  assert.strictEqual(stderr.length, 0);
  const cleanStdout = stdout.replace(/\x1B\[[0-9;]*m/g, "");
  assert.match(
    result.tsSource,
    /\{\s*name: "Alice",\s*age: 30,\s*\.\.\.\(isAdmin && \{ role: "admin", permissions: allPermissions \}\)\s*\}/
  );
  assert.match(cleanStdout, /\{\s*name: 'Alice',\s*age: 30,\s*role: 'admin',\s*permissions: 'all'\s*\}/);
});