import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('quasiquote.test.t2 end-to-end', () => {
  fromSourceEndToEnd(`(program
    (import (object (named (array (object (name "asrt"))))) "./helpers")
    ;; quasi form
    (let (q1) (quasi (object (tag "div"))))
    (asrt ((. JSON stringify) q1) '{"tag":"div"}')

    ;; quote form
    (let (q2) (quote (object (tag "span"))))
    (asrt ((. JSON stringify) q2) '{"tag":"span"}')
  )
`);
}, 30_000);
