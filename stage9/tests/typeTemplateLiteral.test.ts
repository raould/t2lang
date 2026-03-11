import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('typeTemplateLiteral end-to-end', () => {
    fromSourceEndToEnd(`(program
        (import {asrt} "./helpers")
        ;; TStr<T extends string> = \`a\${T}\`
        (type TStr (type-params (T (extends string))) (type-template "a" T))
        ;; TStr<"bc"> resolves to "abc"
        (let ((s : (type-app TStr (tlit "bc")) "abc")))
        (asrt s "abc")
        (asrt (typeof s) "string")
    )`);
}, 30_000);
