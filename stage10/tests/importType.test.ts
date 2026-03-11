/**
 * Acceptance tests for Phase 1 — import type
 * These tests will fail until (import-type ...) is added to the grammar, AST, lowering, and codegen.
 * Syntax: (import-type (named Name1 Name2 ...) "module")
 *         (import-type (named (Name Alias) ...) "module")   — with alias
 *         (import-type (default Name) "module")             — default type import
 */
import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('import-type — named type import alongside value import', () => {
    // (import-type (named T) "./mod") should emit:
    //   import type { T } from "./mod";
    // The type is erased at runtime; the value import (asrt) is still usable.
    fromSourceEndToEnd(`(program
        (import {asrt} "./helpers")
        (import-type (named asrtDeep) "./helpers")
        (asrt 1 1)
    )`);
}, 30_000);

it('import-type — named type import with alias', () => {
    // (import-type (named (asrt AsrtFn)) "./helpers") should emit:
    //   import type { asrt as AsrtFn } from "./helpers";
    fromSourceEndToEnd(`(program
        (import {asrt} "./helpers")
        (import-type (named (asrt AsrtFn)) "./helpers")
        (asrt 2 2)
    )`);
}, 30_000);

it('import-type — multiple named type imports', () => {
    // (import-type (named (asrt AsrtFn) asrtDeep) "./helpers") should emit:
    //   import type { asrt as AsrtFn, asrtDeep } from "./helpers";
    // Uses an alias for 'asrt' to avoid conflict with the value import.
    fromSourceEndToEnd(`(program
        (import {asrt} "./helpers")
        (import-type (named (asrt AsrtFn) asrtDeep) "./helpers")
        (asrt 3 3)
    )`);
}, 30_000);
