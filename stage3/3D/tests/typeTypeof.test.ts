import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('typeTypeof end-to-end', () => {
    fromSourceEndToEnd(`(program (let (x : (typeof foo)) 0))`);
});
