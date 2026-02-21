import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('typeInfer end-to-end', () => {
    fromSourceEndToEnd(`(program (let (x : (infer U)) 0))`);
});
