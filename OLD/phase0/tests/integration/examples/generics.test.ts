import test from 'node:test';
import assert from 'node:assert';
import { compilePhase0 } from '../../../src/api';

test('generic function (simple typeparam) emits generic syntax', async () => {
  const src = `(program (let* ((identity (fn (typeparams (T)) ((x T)) (returns T) (return x))))))`;
  const result = await compilePhase0(src, { dumpAst: false, emitTypes: true });
  assert.equal(result.errors.length, 0, `errors: ${JSON.stringify(result.errors)}`);
  assert.match(result.tsSource, /<T>/, 'expected emitted TS to contain "<T>"');
  assert.match(result.tsSource, /: T/, 'expected param/return annotated with T');
});

test('generic function with extends constraint emits extends', async () => {
  const src = `(program (let* ((g (fn (typeparams (T (extends string))) ((s T)) (returns T) (return s))))))`;
  const result = await compilePhase0(src, { dumpAst: false, emitTypes: true });
  assert.equal(result.errors.length, 0, `errors: ${JSON.stringify(result.errors)}`);
  assert.match(result.tsSource, /extends string/, 'expected emitted TS to contain "extends string"');
});

test('generic type param with default emits = default', async () => {
  const src = `(program (let* ((g (fn (typeparams (T (default number))) ((x T)) (returns T) (return x))))))`;
  const result = await compilePhase0(src, { dumpAst: false, emitTypes: true });
  assert.equal(result.errors.length, 0, `errors: ${JSON.stringify(result.errors)}`);
  assert.match(result.tsSource, /=\s*number/, 'expected emitted TS to contain "= number"');
});

test('multiple type parameters and usage in type alias emits params', async () => {
  const src = `(program (type-alias Pair (typeparams (K) (V)) (type-object (first K) (second V))))`;
  const result = await compilePhase0(src, { dumpAst: false, emitTypes: true });
  assert.equal(result.errors.length, 0, `errors: ${JSON.stringify(result.errors)}`);
  assert.match(result.tsSource, /type Pair/, 'expected emitted TS to contain "type Pair"');
  assert.match(result.tsSource, /Pair<\s*K\s*,\s*V\s*>|Pair<\s*K\s*>|<K/, 'expected emitted generic parameters for Pair');
});

test('explicit type application via type-app form emits <...> at use site', async () => {
  const src = `(program (let* ((logType (fn (typeparams (T)) ((v T)) (returns null) (return null)))) (call (type-app logType string) "hello")))`;
  const result = await compilePhase0(src, { dumpAst: false, emitTypes: true });
  assert.equal(result.errors.length, 0, `errors: ${JSON.stringify(result.errors)}`);
  // expect a call-site type application like logType<string>(...)
  assert.match(result.tsSource, /<string>\s*\(/, 'expected emitted TS to contain call-site type args like <string>(');
});

test('malformed duplicate type param names produce syntax error', async () => {
  const src = `(program (let* ((f (fn (typeparams (T) (T)) ((x T)) (returns T) (return x)))) (f)))`;
  const result = await compilePhase0(src, { dumpAst: false, emitTypes: true });
  assert.ok(result.errors.length > 0, 'expected parse/type syntax error for duplicate type param names');
}); 

test('multiple type params with mixed constraints and defaults', async () => {
  const src = `(program (let* ((f (fn (typeparams (T (extends string)) (U (default number)) (V)) ((a T) (b U) (c V)) (returns V) (return c))))))`;
  const result = await compilePhase0(src, { dumpAst: false, emitTypes: true });
  assert.equal(result.errors.length, 0, `errors: ${JSON.stringify(result.errors)}`);
  assert.match(result.tsSource, /<T extends string, U = number, V>/, 'expected mixed params');
});

test('type application with multiple type args', async () => {
  const src = `(program (let* ((Pair (type-alias Pair (typeparams (K) (V)) (type-object (first K) (second V)))) (p (type-app Pair string number))))`;
  const result = await compilePhase0(src, { dumpAst: false, emitTypes: true });
  assert.equal(result.errors.length, 0, `errors: ${JSON.stringify(result.errors)}`);
  assert.match(result.tsSource, /Pair<string, number>/, 'expected type app with multiple args');
});

test('nested type applications', async () => {
  const src = `(program (let* ((Maybe (type-alias Maybe (typeparams (T)) (type-union T null))) (Nested (type-app Maybe (type-app Maybe string)))))`;
  const result = await compilePhase0(src, { dumpAst: false, emitTypes: true });
  assert.equal(result.errors.length, 0, `errors: ${JSON.stringify(result.errors)}`);
  assert.match(result.tsSource, /Maybe<Maybe<string>>/, 'expected nested type apps');
});

test('generic class with type params', async () => {
  const src = `(program (class Container (typeparams (T)) (field "value" T) (method "get" () T (return this.value))))`;
  const result = await compilePhase0(src, { dumpAst: false, emitTypes: true });
  assert.equal(result.errors.length, 0, `errors: ${JSON.stringify(result.errors)}`);
  assert.match(result.tsSource, /class Container<T>/, 'expected generic class');
});

test('type alias referencing another generic type alias', async () => {
  const src = `(program (type-alias Pair (typeparams (K) (V)) (type-object (first K) (second V))) (type-alias StringPair (type-app Pair string string)))`;
  const result = await compilePhase0(src, { dumpAst: false, emitTypes: true });
  assert.equal(result.errors.length, 0, `errors: ${JSON.stringify(result.errors)}`);
  assert.match(result.tsSource, /type StringPair = Pair<string, string>/, 'expected type alias with type app');
});

test('function with type params calling another generic function', async () => {
  const src = `(program (let* ((id (fn (typeparams (T)) ((x T)) (returns T) (return x))) (wrap (fn (typeparams (U)) ((y U)) (returns U) (return (call id y)))))))`;
  const result = await compilePhase0(src, { dumpAst: false, emitTypes: true });
  assert.equal(result.errors.length, 0, `errors: ${JSON.stringify(result.errors)}`);
  assert.match(result.tsSource, /id\(y\)/, 'expected call without explicit type args');
});

test('constraint that is a type-app', async () => {
  const src = `(program (let* ((f (fn (typeparams (T (extends (type-app Array string)))) ((a T)) (returns T) (return a))))))`;
  const result = await compilePhase0(src, { dumpAst: false, emitTypes: true });
  assert.equal(result.errors.length, 0, `errors: ${JSON.stringify(result.errors)}`);
  assert.match(result.tsSource, /extends Array<string>/, 'expected constraint with type-app');
});

test('default that is a complex type', async () => {
  const src = `(program (let* ((f (fn (typeparams (T (default (type-object (x number))))) ((a T)) (returns T) (return a))))))`;
  const result = await compilePhase0(src, { dumpAst: false, emitTypes: true });
  assert.equal(result.errors.length, 0, `errors: ${JSON.stringify(result.errors)}`);
  assert.match(result.tsSource, /= \{ x: number \}/, 'expected default with object type');
});

test('type param in interface', async () => {
  const src = `(program (interface IContainer (typeparams (T)) (method "get" () T)))`;
  const result = await compilePhase0(src, { dumpAst: false, emitTypes: true });
  assert.equal(result.errors.length, 0, `errors: ${JSON.stringify(result.errors)}`);
  assert.match(result.tsSource, /interface IContainer<T>/, 'expected generic interface');
});
