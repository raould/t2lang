import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('backtickTemplate end-to-end', () => {
  fromSourceEndToEnd(`(program
      (import {asrt} "./helpers")

      ;; basic interpolation (the user's motivating example)
      (let* ((b 42) (a \`foo \${b}\`))
        (asrt a "foo 42"))

      ;; expression in hole
      (let* ((x 3) (s \`result: \${(* x x)}\`))
        (asrt s "result: 9"))

      ;; hole at start
      (let* ((name "world") (s \`\${name}!\`))
        (asrt s "world!"))

      ;; hole at end
      (let* ((n 7) (s \`count: \${n}\`))
        (asrt s "count: 7"))

      ;; multiple holes
      (let* ((a "hi") (b "there") (s \`\${a} \${b}\`))
        (asrt s "hi there"))

      ;; no interpolation — emitted as plain string
      (let* ((s \`hello\`))
        (asrt s "hello"))

      ;; empty template
      (asrt \`\` "")

      ;; nested braces in expression
      (let* ((obj (object (x 5)))
             (s \`val: \${(. obj x)}\`))
        (asrt s "val: 5"))

      ;; string inside hole
      (let* ((s \`\${"literal"}\`))
        (asrt s "literal"))
)
`);
}, 30_000);
