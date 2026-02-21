import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('typeObject end-to-end', () => {
    fromSourceEndToEnd(`(program (let (x : (obj (a number))) 0))`);
});
