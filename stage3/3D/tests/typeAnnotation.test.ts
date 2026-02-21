import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('typeAnnotation.test.t2 end-to-end', () => {
  fromSourceEndToEnd(`(program
  (let (x : number) 42)
  (let (name : string) "hello")
  (const (pi : number) 3.14)
  (let (pair : (tuple number string)) (array 42 "foo"))
  ((. console log) x)
  ((. console log) name)
  ((. console log) pi)
  ((. console log) pair)

  (let* ((a : number 10)
         (b : string "world"))
    ((. console log) a)
    ((. console log) b))

  (const* ((flag : boolean true))
    ((. console log) flag)))
`);
});
