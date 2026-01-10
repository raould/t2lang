import test from 'node:test';
import assert from 'node:assert';
import { compilePhase1 } from '../../src/api.js';

test('constructor without return type is allowed and params/types emitted', async () => {
  const src = `
  (program
    (class Person
      (method "constructor" (firstName: string, lastName: string, age: number)
        (this.firstName := firstName)
        (this.lastName := lastName)
        (this.age := age))
      (method "getFullName" (): string
        (+ this.firstName " " this.lastName))
      (method "getAge" ()
        (return this.age))))`;

  const result = await compilePhase1(src, { emitTypes: true, dumpAst: false });
  assert.strictEqual(result.errors.length, 0, `errors: ${JSON.stringify(result.errors)}`);

  assert.match(result.tsSource, /constructor\(firstName: string,\s*lastName: string,\s*age: number\)/);
  assert.match(result.tsSource, /getFullName\(\): string/);
  assert.match(result.tsSource, /getAge\(\): number/);
});

test('constructor with return type is an error', async () => {
  const src = `
  (program
    (class Person
      (method "constructor" (a: number) : string
        (this.a := a))))`;

  const result = await compilePhase1(src, { emitTypes: true, dumpAst: false });
  assert.ok(result.errors.length > 0, 'expected errors for constructor return annotation');
  const msg = result.errors.map(e => e.message).join('\n');
  assert.match(msg, /Constructors may not have return type annotations/);
});

test('method with return type is allowed and emitted', async () => {
  const src = `
  (program
    (class C
      (method "foo" (): number
        (return 42))))`;

  const result = await compilePhase1(src, { emitTypes: true, dumpAst: false });
  assert.strictEqual(result.errors.length, 0, `errors: ${JSON.stringify(result.errors)}`);
  assert.match(result.tsSource, /foo\(\): number/);
});

test('method without return type is allowed and inferred type emitted', async () => {
  const src = `
  (program
    (class C
      (method "bar" ()
        (return true))))`;

  const result = await compilePhase1(src, { emitTypes: true, dumpAst: false });
  assert.strictEqual(result.errors.length, 0, `errors: ${JSON.stringify(result.errors)}`);
  assert.match(result.tsSource, /bar\(\): boolean/);
});
