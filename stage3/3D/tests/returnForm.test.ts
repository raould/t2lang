import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('returnForm.test.t2 end-to-end', () => {
  fromSourceEndToEnd(`(program
  ;; return with expression
  (def getVal
    (lambda ()
      (return 42)))

  ;; return without expression
  (def doNothing
    (lambda ()
      (return)))

  ((. console log) (getVal)))
`);
});
