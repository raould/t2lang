import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('optChain.test.t2 end-to-end', () => {
  fromSourceEndToEnd(`(program
  (let* ((user (object (name "alice")))
         (nobody undefined))
    ((. console log) (.? user name))
    ((. console log) (.? nobody name))
    ((. console assert) (=== (.? user name) "alice"))
    ((. console assert) (=== (.? nobody name) undefined))))
`);
});
