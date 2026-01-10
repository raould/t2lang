import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

// note: all the "\" here are because we're
// already embedding the t2 script inside
// backticks because we want a multiline string.
// when using a purely .t2 file, no "\" needed.

it('stringTemplate end-to-end', () => {
  fromSourceEndToEnd(`(program
    (import (object (:named (array (object (:name "asrt"))))) "./helpers")

    ;; basic backtick string value
    (asrt \`hello world\` "hello world")

    ;; single quotes inside backtick need no escaping
    (asrt \`it's fine\` "it's fine")

    ;; double quotes inside backtick need no escaping
    (asrt \`say "hi"\` 'say "hi"')

    ;; backtick as object field key
    (let (obj) (object (\`myKey\` 42)))
    (asrt (. obj myKey) 42)

    ;; backtick key with hyphen — useful for keys that look like keywords or operators
    (let (obj2) (object (\`has-hyphen\` 99)))
    (asrt (. obj2 \`has-hyphen\`) 99)

    ;; template literal interpolation — JS expressions inside \${} emitted verbatim
    (let (name) "world")
    (asrt \`hello \${name}!\` "hello world!")

    (let (x) 3)
    (let (y) 4)
    (asrt \`\${x} + \${y} = \${x + y}\` "3 + 4 = 7")
    
    (let* ((x 42) (y "fred") (z (object (x))))
            (asrt \`hello \${x} \${y} \${z.x}\` "hello 42 fred 42"))
  )`);
}, 30_000);
