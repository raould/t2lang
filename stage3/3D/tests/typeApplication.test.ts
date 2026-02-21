import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('typeApplication end-to-end', () => {
    fromSourceEndToEnd(`(program (let (x : (Foo number)) 0))`);
});
