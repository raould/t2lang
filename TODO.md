# Phase1 Prioritized TODO

* done: move cliHelper out of t2lang-phase0/ into a new common/ workspace directory, and update phase0 and phase1 to use it from there.
* done: defmacro expansion is not working correctly at least from the CLI.
* done: make sure phase1 has build dependency on phase0 so that phase1 is never using stale phase0 code. (Added `t2lang-phase0` dependency and `prebuild` script to run phase0 build before phase1.)
* done: tests and examples for how CompilerConfig.dumpAst works. (Added integration tests in Phase0/Phase1 and `common/README.md` example.)
* done: add CLI support for all of CompilerConfig so the values can be set from the command line, for example the "dumpAst" flag. (Added flags: `--emit-types`, `--enable-tsc`, `--seed`, `--trace`, `--log-level` and corresponding tests.)
* done: each major stage of the compiler pipeline must support a T2_DEBUG_"modulename" flag like T2_DEBUG_EXPAND for the result from MacroExpander.
   ```
      // DEBUG: Print expanded AST to console for investigation
      if (process.env.T2_DEBUG_EXPAND === "1") {
        // eslint-disable-next-line no-console
        console.error("[DEBUG] Expanded AST:", JSON.stringify(phase0Ast, null, 2));
      }
   ```
* deduplicate phase1 src from phase0 so that phase1 is effectively a wrapper / client / subclass of phase0. If we make changes in phase0 we do not want to always have to update phase1. (We definitely do not want to have to copy all files from phase0/src over to phase1/src any time phase0 changes.)

[Phase0 listed below is all "done" ignore the rest of this document.]

# Phase0 Prioritized TODO

This file lists prioritized tasks to complete Phase0 features, focused on finishing the structural type system and closing gaps between the design docs and implementation.

Priority legend: P0 = highest (blocking full Phase0), P1 = important, P2 = nice-to-have

1. (P0) Implement full Type AST parsing — done
   - Parse type constructors: `(type-array T)`, `(type-object (field-type ...))`, `(type-union A B)`, `(type-intersection A B)`, `(type-function (param-type ...) return-type)`, `(type-ref "Name")`, `(type-literal <literal>)`, `(type-alias id type)`.
   - done: `(type-array T)`, `(type-ref "Name")`, `(type-number)`, `(type-string)`, `(type-boolean)`, `(type-null)`, `(type-undefined)`, `(type-literal ...)`, `(type-object ...)`, `(type-function ...)`, `(type-union ...)`, `(type-intersection ...)`, `(type-alias ...)` are implemented.
   - done: `src/ast/nodes.ts` updated with full Type AST nodes and locations.
   - done: parser tests for each type form added.

2. (P0) Complete TypeChecker for structural types — done
   - Implement type representation, alias resolution, function-type checking, unions/intersections, and array/object structural checks.
   - Add inference/compatibility rules and meaningful error messages.
   - done: basic type-assert compatibility check with readable mismatch diagnostics.
   - done: basic object literal type inference and property access type lookup.
   - done: basic assignment type checking for array index and object property targets.
   - done: if-expression type merges then/else when equal, otherwise unknown.
   - done: return expression uses value type when present.
   - done: if/while/for conditions require boolean when type is known.
   - done: array index expressions require numeric index when type is known.
   - done: basic function type representation for function expressions.
   - done: function call arity and argument checks when callee type is known.
   - done: class expressions infer object type from field initializers.
   - done: function return type inferred when all returns agree.
   - done: calling non-function types reports a typeCheck error.
   - done: property access on non-object types reports a typeCheck error.
   - done: let binding types are tracked for identifier use in checks.
   - done: assignment to missing object fields and non-array index reports typeCheck errors.
   - done: property access on object type requires field to exist.
   - done: assignments to identifiers enforce known types.
   - done: assignments update identifier types when value type is known.
   - done: indexing non-array types reports a typeCheck error.
   - done: unions/intersections type representation and compatibility checks.
   - done: integration tests exercise type-checking pass and failure cases.
   - done: `type-assert` resolves all supported type forms (with errors for unknown refs). Array/object inference and index/access checks are in place.

3. (P0) Add comprehensive type-system tests — done
   - Unit tests for parsing types
   - done: added parsing tests for type-number/type-string/type-ref/type-array.
   - done: resolving type-refs (built-in types).
   - done: type-checking functions (arity mismatch).
   - done: type-checking returns (return type used in type-assert).
   - done: type-checking assignments.
   - done: `type-assert` semantics.
   - done: Integration tests that fail with clear diagnostics when types mismatch.

4. (P1) Accept full Type AST in `type-assert` — done
   - Parser: accept structured type AST instead of a plain string for `(type-assert ...)`.
   - done: structured type AST accepted for supported type forms.
   - Codegen: ensure `type-assert` still emits `(expr as TypeName)` or inline type where appropriate.
   - done: type-assert codegen supports structured types for supported forms.

5. (P1) Emit TypeScript type annotations in codegen — done
   - When types are known, annotate function params/returns, variable declarations, and class fields.
   - done: opt-in codegen mode that preserves type annotations in emitted .ts. (emitTypes option added, annotations for let bindings and function returns implemented).

6. (P1) Expand `import`/`export` parsing to match docs — done
   - Support `import-default`, `import-named`, `import-all` shapes and document behavior.
   - done: implemented parsing for import-default, import-named, import-all, export named, export-default.
   - done: updated AST to distinguish import/export kinds.
   - done: updated codegen to generate correct ES6 import/export statements.
   - done: added parsing tests for all new forms.
   - done: tests for module forms.

7. (P2) CI / GitHub Actions — done
   - done: workflow runs `npm ci`, `npm run build`, `npm run lint`, and `npm test` on push/PR.

8. (P2) Docs and spec updates — done
   - done: synced `Phase0_TypeScript_Compilation_Rules.md` and `Phase0_AST_Specification.md` with implementations.

9. (P2) Robustness, diagnostics, and tooling — done
   - done: added edge-case tests (parser nesting, unterminated strings, string escapes) and improved lexer resilience.
   - deferred: performance tests and benchmarks.

Notes
- Start with items 1–3 (P0) — they are the critical path to a complete Phase0 type system.
- Break each P0 task into smaller PR-sized changes: parser updates, AST nodes, tests, then TypeChecker implementation.
