# T2 Type Checker

typeChecker.ts should be a lightweight, T2-specific validator and annotator — not a reimplementation of TypeScript's full type system. Its role is to support the Phase0 pipeline and produce useful information for codegen and user diagnostics while deferring deep/type-inference work to the emitted TypeScript + tsc.

Important Note: t2langu is explicitly not meant to reimplement the full typechecking of typescript. t2lang type checking must be kept minimal, designed only to help detect gross errors in .t2 source code. The advanced type checking will be done by typescript's compiler tsc. Additionally, t2lang does not need to know anything about the javascript SDK.

## Why keep a small typeChecker.ts (responsibilities)

* Map Phase0 type constructs into an internal representation so codegen can emit accurate TS annotations ((type-array ...) → number[], etc.).
* Validate T2-level, language-specific invariants early (e.g., sequential let* semantics, malformed type-assert forms, invalid AST-level uses of types).
* Resolve type names/aliases and ensure type references exist (quick resolution errors tied to original T2 locations).
* Provide coarse type information (literal types, array/object shapes, function signatures when available) to improve emitted TS (and to avoid generating obviously wrong TS).
* Emit structured diagnostics/events that map back to T2 source locations (so errors point at the T2 code, not only at generated .ts).
* Optionally supply lightweight inference/propagation used by codegen (e.g., annotate local variables or function returns where trivial).

## Why not reimplement full TypeScript checking

* tsc already implements the complete TypeScript semantic model — reproducing it is huge, error-prone, and unnecessary.
* Deep checking (generics, overload resolution, union/intersection compatibility, complex inference) is best left to tsc on the generated .ts output.

## Recommended integration pattern

* Keep typeChecker.ts focused and small: parse/represent Phase0 types, resolve aliases/refs, provide basic compatibility checks (array vs element type, exact literal types), attach a typeId or TypeNode to AST nodes for codegen consumption.
* In tsCodegen.ts, emit type annotations where available so generated .ts is as typed as possible.
* After codegen, run tsc (or use the TypeScript compiler API / ts-morph) on the generated files as the authoritative type check step. Capture tsc diagnostics and map them back to the original T2 locations using the event sink / source maps / a simple mapping produced by codegen. This gives full semantic checking without reimplementing TS.
* For quick feedback, keep the lightweight checker to catch common, inexpensive-to-detect mistakes before codegen (faster and better error positions).

## Minimal feature set to implement in typeChecker.ts

* Parse and validate Phase0 Type AST (type-ref, type-array, type-number/string, type-alias).
* Resolve type refs/aliases and signal missing refs.
* Type-assert validation (structure sanity) and attach type metadata to nodes.
Simple structural checks: arrays (element type), object fields (basic presence/type), function arity/return tagging (optional).
* Emit events/diagnostics that codegen will use to annotate output and to translate tsc diagnostics back to T2.

## Tradeoffs and practical tips

* Implement just enough to make codegen emit useful TS; rely on tsc for soundness.
* Use the TypeScript compiler API to programmatically type-check emitted code and to produce diagnostics in CI or developer workflows.
* Keep typeChecker.ts tests small and focused (unit tests for type parsing/resolution and a couple integration tests). You already added that pattern with the (type-array ...) test.
