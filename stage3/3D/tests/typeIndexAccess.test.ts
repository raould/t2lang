import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('typeIndexAccess end-to-end', () => {
    fromSourceEndToEnd(`(program (let (x : (index T K)) 0))`);
});
