import assert from 'assert';
import { tokenize as phase1Tokenize } from '../../src/parse/sugarRewrite.js';

// This test file uses the sugarRewrite tokenizer to inspect tokenization results
// since Phase1's Lexer isn't exported for easy unit testing. Using the existing
// helper functions is simpler for a unit-level check.

function runTokens(src) {
    return phase1Tokenize(src);
}

// Dotted identifier should combine into a single token in rewrite tokenizer
const dottedSrc = `(+ a.b.c 1)`;
const dottedTokens = runTokens(dottedSrc);
assert(dottedTokens.includes('a.b.c'), 'dotted identifier a.b.c should be tokenized as single atom');

// Parenthesized dot-sigil field: (.video: TypeA)
const sigPar = ` (type-object (.video: TypeA)) `;
const sigParTokens = runTokens(sigPar);
assert(sigParTokens.includes('(.video:') || sigParTokens.includes('.video:'), 'parenthesized dot-sigil should appear as token');

// Bare dot-sigil pair: .video: TypeA
const sigBare = `.video: TypeA`;
const sigBareTokens = runTokens(sigBare);
assert(sigBareTokens.includes('.video:') || sigBareTokens.includes('.video'), 'bare dot-sigil should be tokenized');

console.log('lexer_sugar tests passed');
