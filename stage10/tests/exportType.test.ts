/**
 * Acceptance tests for Phase 1 — export type
 * These tests will fail until (export-type ...), (export-type-from ...), and
 * (export-type-all-from ...) are added to the grammar, AST, lowering, and codegen.
 *
 * Syntax:
 *   (export-type (Name1) (Name2 Alias) ...)       → export type { Name1, Name2 as Alias };
 *   (export-type-from "./mod" (Name) ...)          → export type { Name } from "./mod";
 *   (export-type-all-from "./mod")                 → export type * from "./mod";
 *
 * Type exports are erased at runtime. These tests verify compilation succeeds
 * and the program executes correctly.
 */
import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('export-type — named type export of a locally defined alias', () => {
    // Defines a type alias and exports it as a type-only export.
    // TypeScript should accept this; at runtime the export is erased.
    fromSourceEndToEnd(`(program
        (import {asrt} "./helpers")
        (type Score number)
        (export-type (Score))
        (let ((s : Score 100)))
        (asrt s 100)
    )`);
}, 30_000);

it('export-type — named type export with alias', () => {
    // (export-type (Score Points)) emits: export type { Score as Points };
    fromSourceEndToEnd(`(program
        (import {asrt} "./helpers")
        (type Score number)
        (export-type (Score Points))
        (let ((s : Score 99)))
        (asrt s 99)
    )`);
}, 30_000);

it('export-type — multiple names in one export-type form', () => {
    // (export-type (A) (B)) emits: export type { A, B };
    fromSourceEndToEnd(`(program
        (import {asrt} "./helpers")
        (type Width number)
        (type Height number)
        (export-type (Width) (Height))
        (let ((w : Width 800)))
        (asrt w 800)
    )`);
}, 30_000);

it('export-type-from — re-export named types from another module', () => {
    // (export-type-from "./helpers" (asrt)) emits:
    //   export type { asrt } from "./helpers";
    // Verifies compilation; no runtime assertion needed.
    fromSourceEndToEnd(`(program
        (import {asrt} "./helpers")
        (export-type-from "./helpers" (asrt))
        (asrt 1 1)
    )`);
}, 30_000);

it('export-type-all-from — re-export all types from another module', () => {
    // (export-type-all-from "./helpers") emits:
    //   export type * from "./helpers";
    fromSourceEndToEnd(`(program
        (import {asrt} "./helpers")
        (export-type-all-from "./helpers")
        (asrt 1 1)
    )`);
}, 30_000);
