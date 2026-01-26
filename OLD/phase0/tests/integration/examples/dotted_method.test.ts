import test from 'node:test';
import assert from 'node:assert';
import { compilePhase0 } from '../../../src/api';

test('dotted method invocation emits method call', async () => {
  const src = `
    (program
      (class Person
        (field "firstName" "")
        (field "lastName" "")
        (field "age" 0)

        (method "constructor" (firstName lastName age)
          (assign (prop this "firstName") firstName)
          (assign (prop this "lastName") lastName)
          (assign (prop this "age") age))

        (method "getFullName" ()
          (+ (prop this "firstName") " " (prop this "lastName"))))

      (let* ((person (new Person "John" "Doe" 25)))
        (call (prop console "log") (call (prop person "getFullName"))))
    )
  `;
  const result = await compilePhase0(src, { enableTsc: false });
  if (result.errors.length > 0) { console.error(result.errors); }
  assert.strictEqual(result.errors.length, 0);
  // Expect the emitted JS/TS to call the method, not pass it as a value
  assert.match(result.tsSource, /console\.log\(person\.getFullName\(\)\)/);
});
