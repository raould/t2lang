import test from 'node:test';
import assert from 'node:assert';
import { rewriteSugar } from '../../src/parse/sugarRewrite.js';

test('dotted method: property reference vs invocation sugar', () => {
  const srcProp = `(program (let* ((person (new Person))) (console.log (prop person getFullName))))`;
  const outProp = rewriteSugar(srcProp).trim();
  // property access should be preserved as (prop person "getFullName") somewhere
  assert.match(outProp, /\(prop person "getFullName"\)/);

  const srcCall1 = `(program (let* ((person (new Person))) (console.log (person.getFullName()))))`;
  const outCall1 = rewriteSugar(srcCall1).trim();
  // parenthesized empty arglist should become a zero-arg call
  assert.match(outCall1, /\(call \(prop person "getFullName"\)\)/);

  const srcCall2 = `(program (let* ((person (new Person))) (console.log (person.getFullName()))))`;
  const outCall2 = rewriteSugar(srcCall2).trim();
  assert.match(outCall2, /\(call \(prop person "getFullName"\)\)/);

  const srcCallArgs = `(program (let* ((person (new Person))) (console.log (person.addYears 2))))`;
  const outCallArgs = rewriteSugar(srcCallArgs).trim();
  // dotted head with args should rewrite to call with args
  assert.match(outCallArgs, /\(call \(prop person "addYears"\) 2\)/);
});
