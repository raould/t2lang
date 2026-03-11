import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('typeTemplateLiteral end-to-end', () => {
    fromSourceEndToEnd(`(program
        (import (object (named (array (object (name "asrt"))))) "./helpers")
        ;; TStr<T extends string> = \`a\${T}\`
        (type TStr (type-params (T (extends string))) (type-template "a" T))
        ;; TStr<"bc"> resolves to "abc"
        (let (s : (TStr (tlit "bc"))) "abc")
        (asrt s "abc")
        (asrt (typeof s) "string")
    )`);
}, 30_000);
