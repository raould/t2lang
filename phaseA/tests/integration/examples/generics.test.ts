import test from "node:test";
import assert from "node:assert";
import { compile } from "../../../src/api";

// NOTE: Phase A grammar supports type-alias typeparams and type-app in type positions.
// Function/class generics are not part of Phase A grammar.

test("type alias with type params emits generic syntax", async () => {
  const src = `(program
    (type-alias Pair (typeparams (K) (V))
      (type-object ("first" (type-ref K)) ("second" (type-ref V)))))`;
  const result = await compile(src, { dumpAst: false, emitTypes: true });
  if (result.errors.length > 0) { console.error(result.errors); }
  assert.equal(result.errors.length, 0, `errors: ${JSON.stringify(result.errors)}`);
  assert.match(result.tsSource, /type Pair<\s*K\s*,\s*V\s*>/, "expected generic type params for Pair");
});

test("type alias with type-app uses type constructors", async () => {
  const src = `(program
    (type-alias Box (typeparams (T)) (type-object ("value" (type-ref T))))
    (type-alias StringBox (type-app (type-ref Box) (type-string))))`;
  const result = await compile(src, { dumpAst: false, emitTypes: true });
  if (result.errors.length > 0) { console.error(result.errors); }
  assert.equal(result.errors.length, 0, `errors: ${JSON.stringify(result.errors)}`);
  assert.match(result.tsSource, /type StringBox = Box<string>/, "expected type-app to render as Box<string>");
});

test("type-function emits parameter and return types", async () => {
  const src = `(program
    (type-alias Fn (type-function (type-number) (type-string) (type-boolean))))`;
  const result = await compile(src, { dumpAst: false, emitTypes: true });
  if (result.errors.length > 0) { console.error(result.errors); }
  assert.equal(result.errors.length, 0, `errors: ${JSON.stringify(result.errors)}`);
  assert.match(result.tsSource, /type Fn = \(number, string\) => boolean/, "expected function type emission");
});

test("type-interface emits fields", async () => {
  const src = `(program
    (type-interface IContainer
      (interface-body
        ("get" (type-function (type-string) (type-string))))))`;
  const result = await compile(src, { dumpAst: false, emitTypes: true });
  if (result.errors.length > 0) { console.error(result.errors); }
  assert.equal(result.errors.length, 0, `errors: ${JSON.stringify(result.errors)}`);
  assert.match(result.tsSource, /interface IContainer/, "expected interface emission");
  assert.match(result.tsSource, /get:\s*\(string\) => string/, "expected interface field with function type");
});
