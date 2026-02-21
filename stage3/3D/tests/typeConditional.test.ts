import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('typeConditional end-to-end', () => {
    fromSourceEndToEnd(`(program (let (x : (cond T string number string)) 0))`);
});
