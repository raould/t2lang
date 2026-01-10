import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('stringEscapes end-to-end', () => {
  // The T2 source is embedded in a JS template literal.
  // In template literals, \\ produces a single \ in the string.
  // So \\\\ → \\ in T2 source (escaped backslash).
  //    \\'  → \'  in T2 source (escaped single quote inside single-quoted string).
  //    \\"  → \"  in T2 source (escaped double quote inside double-quoted string).
  fromSourceEndToEnd(`(program
    (import (object (:named (array (object (:name "asrt"))))) "./helpers")

    ;; Bug 1 fix: \\'  in template → \\' in T2 → single-quoted string with escaped '
    (asrt 'it\\'s fine' "it's fine")

    ;; Bug 2 fix: \\\\" in template → \\" in T2 → double-quoted string with escaped "
    (asrt "say \\"hi\\"" 'say "hi"')

    ;; Backslash escape: \\\\\\\\ in template → \\\\ in T2 → value is single backslash
    (asrt "\\\\" "\\\\")

    ;; Newline escape: both sides should produce the same 3-char string a<LF>b
    (asrt "a\\nb" 'a\\nb')
  )`);
}, 30_000);
