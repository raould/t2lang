import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('typeTemplateLiteral end-to-end', () => {
    fromSourceEndToEnd(`(program (let (x : (template "a" T)) 0))`);
});
