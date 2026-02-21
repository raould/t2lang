import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('keyword.test.t2 end-to-end', () => {
  fromSourceEndToEnd(`(program
  ;; keyword literals resolve to strings
  ((. console log) :foo)
  ((. console log) :bar-baz)
  ((. console log) :type))
`);
});
