import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('typeIdentifier end-to-end', () => {
    fromSourceEndToEnd(`(program (let (x : number) 0))`);
});
