/**
 * Acceptance tests for Phase 4 — export * as ns from
 * These tests will fail until (export-ns-from "ns" "./mod") is added to
 * the grammar, AST, lowering, and codegen.
 *
 * Syntax: (export-ns-from "ns" "./mod") → export * as ns from "./mod";
 *
 * This is a pure re-export; the emitted statement has no runtime effect
 * within the file itself. Tests verify compilation succeeds.
 */
import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('export-ns-from — namespace re-export of a module', () => {
    // (export-ns-from "utils" "./helpers") emits:
    //   export * as utils from "./helpers";
    fromSourceEndToEnd(`(program
        (import (object (:named (array (object (:name "asrt"))))) "./helpers")
        (export-ns-from "utils" "./helpers")
        (asrt 1 1)
    )`);
}, 30_000);
