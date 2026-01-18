# TODO: Test Failures Summary

Date: 2026-01-18

Summary:
- Collected failing tests across workspaces (`common`, `t2lang-phase0`, `t2lang-phase1`).
- `common` passed all tests.
- `t2lang-phase0` has many integration and unit test failures mostly caused by mismatches between expected output and the current codegen/sexpr formatting; some tests also error due to an undefined RegExp (TypeError in `assert.match`).
- `t2lang-phase1` has 2 failing tests in `debug_flags.test.ts` where debug output contains `nodeCount=0` instead of expected payload.

Failing tests (grouped):

- common
  - None — all tests passed.

- t2lang-phase0
  - tests/integration/examples/function.test.ts
    - named function with no params
    - named function with params
    - anonymous function (lambda)
    - lambda as callback
    - function with multiple statements in body

  - tests/integration/examples/function_tsc.test.ts
    - same failures as `function.test.ts` (TS-checked variant)

  - tests/integration/examples/if.test.ts
    - if with then only
    - if with then and else
    - if with identifier condition
    - if with call condition
    - nested if expressions
    - if with block branches

  - tests/integration/examples/if_tsc.test.ts
    - same set as `if.test.ts` (TS variant)

  - tests/integration/examples/lexer_errors.test.ts
    - unexpected bracket produces error (TypeError: `assert.match` received undefined)
    - caret operator works (pattern mismatch)

  - tests/integration/examples/lexer_errors_tsc.test.ts
    - same TypeError + caret operator mismatch

  - tests/integration/examples/literals.test.ts
    - boolean literal true/false, null, undefined (pattern mismatches)

  - tests/integration/examples/literals_tsc.test.ts
    - same as above (TS variant)

  - tests/integration/examples/object.test.ts
    - object with array field (pattern mismatch expecting JSON-like output)

  - tests/integration/examples/object_tsc.test.ts
    - same as above (TS variant)

  - tests/integration/examples/operators.test.ts
    - file-level failures (see test output)

  - tests/integration/examples/operators_tsc.test.ts
    - file-level failures (TS variant)

  - tests/integration/examples/prop.test.ts
    - method call on object
    - implicit call still works

  - tests/integration/examples/prop_tsc.test.ts
    - same as above (TS variant)

  - tests/integration/examples/runCli_flags.test.ts
    - file-level failure (see output)

  - tests/integration/examples/type_ast.test.ts
    - extended type nodes and type-alias (pattern mismatch)

  - tests/integration/examples/type_ast_tsc.test.ts
    - same as above (TS variant)

  - tests/integration/examples/while.test.ts
    - simple while loop
    - while with variable condition
    - while with call condition

  - tests/integration/examples/while_tsc.test.ts
    - same as above (TS variant)

  - tests/unit/nullish.test.ts
    - file-level failures

  - tests/unit/nullish_and_ternary.test.ts
    - file-level failures

  - tests/unit/operators.test.ts
    - file-level failures

- t2lang-phase1
  - tests/integration/examples/debug_flags.test.ts
    - T2_DEBUG_EXPAND prints expanded AST (actual: "[DEBUG] Expanded AST: nodeCount=0")
    - T2_DEBUG_PARSE prints parsed AST (actual: "[DEBUG] Parsed AST: nodeCount=0")

Notes / Observations:
- Many failures appear to be caused by a change in the code generator's output formatting (sexpr vs JSON/stringified objects), so tests expecting previous output need updating, or the generator should be adjusted to produce the expected format.
- The `assert.match` TypeError indicates some test conversions produced `undefined` where a RegExp was expected; search for `assert.match(..., undefined)` or places where the conversion script could not produce a valid regex.
- Some tests are failing at file-level (reported as "test failed"); inspect those test files for thrown errors or uncaught exceptions.

Proposed next steps:
1. Triage `t2lang-phase0/tests/integration/examples/function.test.ts` (first failing test) by comparing the test's expected regex to the actual generator output; decide whether to update the test or change codegen.
2. Fix the `assert.match` undefined-regex issues in `lexer_errors.test.*` (likely conversion-script bug). Search and repair any `assert.match` calls with non-RegExp arguments.
3. Standardize AST/sexpr printing (prefer sexpr across packages) or update tests to accept the current canonical format.
4. Re-run package tests and iterate until green.

Recorded by: automated test-collection run on 2026-01-18
