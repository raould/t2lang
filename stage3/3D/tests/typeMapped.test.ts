import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('typeMapped end-to-end', () => {
    fromSourceEndToEnd(`(program (let (x : (mapped K (keyof T) (index T K))) 0))`);
});
