import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('typeArray end-to-end', () => {
    fromSourceEndToEnd(`(program (let (x : (array number)) 0))`);
});
