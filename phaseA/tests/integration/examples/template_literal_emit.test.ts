import test from "node:test";
import assert from "node:assert";
import { compile } from "../../../src/api";

test("template literal expressions emit in TS output", async () => {
  const result = await compile(`(program
  (let* ((name "Ada")
         (greeting (template "Hello, " name "!")))
    greeting))`);
  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.strictEqual(result.diagnostics.length, 0);
  assert.match(result.tsSource, /`Hello, \$\{name\}!`/);
});

test("template literal types emit in TS output", async () => {
  const result = await compile(`(program
  (type-alias Greeting (type-template "Hello, " (type-string) "!")))`);
  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.strictEqual(result.diagnostics.length, 0);
  assert.match(result.tsSource, /type Greeting = `Hello, \$\{string\}!`;/);
});
