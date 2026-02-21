import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('typeUnion end-to-end', () => {
    fromSourceEndToEnd(`(program (let (x : (union number string)) 0))`);
});
