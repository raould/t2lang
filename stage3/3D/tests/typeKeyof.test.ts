import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('typeKeyof end-to-end', () => {
    fromSourceEndToEnd(`(program (let (x : (keyof T)) 0))`);
});
