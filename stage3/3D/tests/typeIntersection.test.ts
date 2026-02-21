import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('typeIntersection end-to-end', () => {
    fromSourceEndToEnd(`(program (let (x : (intersect A B)) 0))`);
});
