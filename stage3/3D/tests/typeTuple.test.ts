import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('typeTuple end-to-end', () => {
    fromSourceEndToEnd(`(program (let (x : (tuple number string)) 0))`);
});
