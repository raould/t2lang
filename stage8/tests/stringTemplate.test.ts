import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

// Decision 1 (DESIGN.md): BACKTICK_STRING removed from Stage6 grammar.
// Plain string equivalents of the former backtick-string cases are tested here.
// Value-level template literal interpolation — (template ...) — is tested in
// decision1.test.ts (rejection) and will be fully tested in Decision 2.

it('stringTemplate end-to-end', () => {
  fromSourceEndToEnd(`(program
    (import (object (named (array (object (name "asrt"))))) "./helpers")

    ;; strings that were formerly backtick-strings work as regular strings
    (asrt "hello world" "hello world")
    (asrt "it's fine" "it's fine")
    (asrt 'say "hi"' 'say "hi"')

    ;; string as object field key (was: backtick key)
    (let (obj) (object ("myKey" 42)))
    (asrt (. obj myKey) 42)

    ;; hyphenated key — use quoted string (keywords/identifiers can't have hyphens)
    (let (obj2) (object ("has-hyphen" 99)))
    (asrt (index obj2 "has-hyphen") 99)
  )`);
}, 30_000);
