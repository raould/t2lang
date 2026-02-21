import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('typeFunction end-to-end', () => {
    fromSourceEndToEnd(`(program (let (x : (fn ((a number)) string)) 0))`);
});
