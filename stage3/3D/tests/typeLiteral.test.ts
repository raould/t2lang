import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('typeLiteral end-to-end', () => {
    fromSourceEndToEnd(`(program (let (x : (tlit "foo")) 0))`);
});
