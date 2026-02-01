# tests in the process of being fixed

- [ ] The assign_for_index_new fixtures still assert /for \(;/ even though the emitted loop now prints for (null; …)—the regex needs updating after canonicalizing the loop kind (phaseA/tests/integration/examples/assign_for_index_new.test.ts#L31-L60 and ..._tsc...#L33-L60).
- [ ] Several suites (block_basic, comments, plus class_modifiers_*) still feed (fn ... ) or bare class bodies that violate “fn requires a signature list” / “class-body must start with (class-body …)” (phaseA/tests/integration/examples/block_basic.test.ts#L1-L80, phaseA/tests/integration/examples/comments.test.ts#L1-L90, phaseA/tests/integration/examples/class_modifiers_emit.test.ts#L1-L40), so they need canonical rewrites.
- [ ] The rewritten class_throw_try tests now trip serialization/assertion checks (e.g., Unsupported expression kind undefined and signature errors) because the canonical shapes change what compilePhase0 produces—those expectations will require further adjustments (phaseA/tests/integration/examples/class_throw_try.test.ts#L10-L166 and the TSC variant).
- [ ] debug_flags.test.ts still expects [DEBUG] log lines that the parser/codegen stage does not yet emit (phaseA/tests/integration/examples/debug_flags.test.ts#L1-L40).
- [ ] Next steps: Update the remaining fixtures to match the canonical AST shapes, adjust regex assertions/codegen serialization as required, and (if desired) ensure debug output is emitted so debug_flags can pass.

# PhaseA failing integration tests (temporarily disabled)

Each entry lists the test file and why it currently fails under PhaseA.

- tests/integration/examples/object.test.ts — expects object literal codegen and field syntax not implemented in PhaseA.
- tests/integration/examples/object_tsc.test.ts — expects object literal codegen not implemented in PhaseA.
- tests/integration/examples/operators.test.ts — expects operator lowering/infix codegen not implemented in PhaseA.
- tests/integration/examples/operators_tsc.test.ts — expects operator lowering/infix codegen not implemented in PhaseA.
- tests/integration/examples/parse_basic.test.ts — expects import/export parsing and astDump event shapes not implemented in PhaseA.
- tests/integration/examples/parse_basic_tsc.test.ts — expects import/export parsing and astDump event shapes not implemented in PhaseA.
- tests/integration/examples/parser_errors.test.ts — expects parser error diagnostics behavior not implemented in PhaseA.
- tests/integration/examples/parser_errors_tsc.test.ts — expects parser error diagnostics behavior not implemented in PhaseA.
- tests/integration/examples/prop.test.ts — expects prop/index codegen and method-call lowering not implemented in PhaseA.
- tests/integration/examples/prop_tsc.test.ts — expects prop/index codegen and method-call lowering not implemented in PhaseA.
- tests/integration/examples/resolve_errors.test.ts — expects resolver error event shape not implemented in PhaseA.
- tests/integration/examples/resolve_errors_tsc.test.ts — expects resolver error event shape not implemented in PhaseA.
- tests/integration/examples/runCli_flags.test.ts — CLI flag behavior and mocks assume Phase0 API/event surface.
- tests/integration/examples/type_ast.test.ts — expects type AST parsing/codegen not implemented in PhaseA.
- tests/integration/examples/type_ast_tsc.test.ts — expects type AST parsing/codegen not implemented in PhaseA.
- tests/integration/examples/type_errors.test.ts — expects typechecker error aggregation not implemented in PhaseA.
- tests/integration/examples/type_errors_tsc.test.ts — expects typechecker error aggregation not implemented in PhaseA.
- tests/integration/examples/type_parse.test.ts — expects full type parsing support not implemented in PhaseA.
- tests/integration/examples/type_parse_tsc.test.ts — expects full type parsing support not implemented in PhaseA.
- tests/integration/examples/while.test.ts — expects while parsing/codegen not implemented in PhaseA.
- tests/integration/examples/while_tsc.test.ts — expects while parsing/codegen not implemented in PhaseA.
- tests/integration/examples/* (remaining files) — temporarily skipped by scripts/run-tests.mjs until PhaseA codegen/type system matches Phase0 expectations.
