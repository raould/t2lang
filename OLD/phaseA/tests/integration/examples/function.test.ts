/**
 * Test for function definitions
 */

import test from "node:test";
import assert from "node:assert";
import { compile } from "../../../src/api";

test("named with atom param is illegal", async () => {
  const result = await compile(`(program (fn greet (name) (return name)))`, );
  assert(result.diagnostics.length > 0);
});

test("named with too long param is illegal", async () => {
  const result = await compile(`(program (fn greet ((name string bar)) (return name)))`, );
  assert(result.diagnostics.length > 0);
});

test("named with atom param", async () => {
  const result = await compile(`(program (fn greet ((name)) (return name)))`, );
  assert.strictEqual(result.diagnostics.length, 0);
  assert.match(result.tsSource, /function greet\(name\)/);
});

test("named with typed atom param", async () => {
  const result = await compile(`(program (fn greet ((name (type-string))) (return name)))`, );
  if (result.diagnostics.length > 0) { console.error(result.diagnostics); }
  assert.strictEqual(result.diagnostics.length, 0);
  assert.match(result.tsSource, /function greet\(name: string\)/);
});

test("named with typed param list", async () => {
  const result = await compile(`(program (fn greet ((name string)) (return name)))`, );
  assert.strictEqual(result.diagnostics.length, 0);
  assert.match(result.tsSource, /function greet\(name: string\)/);
});

test("named with partially typed param list", async () => {
  const result = await compile(`(program (fn greet ((name1 string) (name2)) (return name2)))`, );
  assert.strictEqual(result.diagnostics.length, 0);
  assert.match(result.tsSource, /function greet\(name1: string, name2\)/);
});

test("named function with no params", async () => {
  const result = await compile(`(program (fn print ((x)) x) (fn sayHello () (print "hello")))`, );
  assert.strictEqual(result.diagnostics.length, 0);
  assert.match(result.tsSource, /function sayHello\(\)/);
  assert.match(result.tsSource, /print\("hello"\)/);
});

test("named function with params", async () => {
  const result = await compile(`(program (fn foo ((a) (b)) a) (fn add ((a) (b)) (foo a b)))`, );
  assert.strictEqual(result.diagnostics.length, 0);
  assert.match(result.tsSource, /function add\(a, b\)/);
});

test("function with return", async () => {
  const result = await compile(`(program (fn double ((x)) (return x)))`, );
  assert.strictEqual(result.diagnostics.length, 0);
  assert.match(result.tsSource, /return x/);
});

test("function with empty return", async () => {
  const result = await compile(`(program (fn doNothing () (return)))`, );
  assert.strictEqual(result.diagnostics.length, 0);
  assert.match(result.tsSource, /return;/);
});

test("anonymous function (lambda)", async () => {
  const result = await compile(`(program (fn foo ((x)) x) (lambda ((x)) (foo x)))`, );
  assert.strictEqual(result.diagnostics.length, 0);
  assert.match(result.tsSource, /\(x\) =>/);
});

test("lambda as callback", async () => {
  const result = await compile(`
    (program
            (let* ((arr (array 1 2 3))
              (foo (lambda ((x)) x)))
        (call (prop arr "map") (lambda ((x)) (foo x)))))
  `, );
  assert.strictEqual(result.diagnostics.length, 0);
  assert.match(result.tsSource, /arr\.map/);
  assert.match(result.tsSource, /\(x\) =>/);
});

test("function with multiple statements in body", async () => {
  const result = await compile(`
    (program
      (fn foo ((x)) x)
      (fn bar ((x)) x)
      (fn process ((x))
        (foo x)
        (bar x)
        (return x)))
  `, );
  assert.strictEqual(result.diagnostics.length, 0);
  assert.match(result.tsSource, /foo\(x\)/);
  assert.match(result.tsSource, /bar\(x\)/);
  assert.match(result.tsSource, /return x/);
});
