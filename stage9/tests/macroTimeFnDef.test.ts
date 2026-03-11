import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('macro-time-fn-def end-to-end', () => {
  fromSourceEndToEnd(`(program
  ;; #[macro-time] fn definition (emitted as a comment by codegen)
  (#[macro-time] (const assertArity (lambda ((name)) ((. console log) name))))
  ((. console log) "macro-time fn declared"))
`);
}, 30_000);
