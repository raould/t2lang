# Stage 3F — Module Boundaries

## 1  Overview and Scope

Stage 3F extends Stage 3E's import/export support to cover the full TypeScript ES-module surface. T2Lang2 is a transpiler: module resolution, circular-dependency detection, and cross-file scope analysis are owned by TypeScript and the runtime. Stage 3F only needs to emit syntactically valid TypeScript for every import/export form a real program needs.

**Stage 3F is additive only** — no existing Stage 3E rules are modified — with one explicitly documented exception: `export-default` of a function definition requires declaration lifting in the lowering pass (see Section 3C).

## 2  What Stage 3E already provides (baseline)

| T2Lang2 form | TypeScript emitted |
|---|---|
| `(import "./mod")` | `import "./mod";` |
| `(import (object (:default "x")) "./mod")` | `import x from "./mod";` |
| `(import (object (:namespace "ns")) "./mod")` | `import * as ns from "./mod";` |
| `(import (object (:named (array …))) "./mod")` | `import { … } from "./mod";` |
| `(import (object (:default "x") (:named …)) "./mod")` | `import x, { … } from "./mod";` |
| `(export PI 3.14)` | `export const PI = 3.14;` |
| `(export-default expr)` | `export default <expr>;` |
| `(export-named (x) (y z))` | `export { x, y as z };` |
| `(export-from "./mod" (x) (y z))` | `export { x, y as z } from "./mod";` |
| `(export-all-from "./mod")` | `export * from "./mod";` |

No changes to any of the above.

---

## 3  New forms

Four groups of new syntax, ordered highest to lowest priority.

### Group A — Type-only imports and exports

TypeScript's `import type` / `export type` markers tell the compiler and bundlers
(Vite, esbuild) that an import/export is a pure type reference and must be
completely erased before JavaScript is emitted. `isolatedModules: true` — the
default in Vite — requires these markers whenever a name refers only to a type.

```
;; T2Lang2                                  ;; TypeScript emitted
(import-type (named Foo Bar) "./types")     import type { Foo, Bar } from "./types";
(import-type (named (Foo F)) "./types")     import type { Foo as F } from "./types";
(import-type (default Foo) "./types")       import type Foo from "./types";

(export-type (Foo) (Bar Baz))               export type { Foo, Bar as Baz };
(export-type-from "./types" (Foo))          export type { Foo } from "./types";
(export-type-all-from "./types")            export type * from "./types";
```

**Validation constraint:** `(export-type (Foo))` is only meaningful when `Foo`
refers to a type alias or interface. If `Foo` names a class or value, TypeScript
will reject it. Stage 3F does not perform full name-resolution, so this is
enforced by TypeScript at compile time rather than by T2Lang2. A future semantic
analysis pass may add an earlier error. This constraint is documented here so
it is not forgotten.

### Group B — Inline declaration exports

Currently exporting a class or interface requires two steps:

```lisp
;; two-step — always works; no change needed
(class Foo (class-body ...))
(export-named (Foo))
```

Stage 3F adds a `(export <decl>)` wrapper that prepends `export` to the emitted
declaration in a single top-level form:

```
;; T2Lang2                                     ;; TypeScript emitted
(export (class Foo (class-body ...)))           export class Foo { ... }
(export (def greet (lambda ((n)) ...)))         export const greet = (n) => { ... };
(export (interface IPoint (Object (x num))))    export interface IPoint { x: number }
(export (type-alias Coord (Object (x num))))    export type Coord = { x: number };
```

The two-step workaround continues to work. `(export ...)` is sugar.

**Semicolon handling:** no stripping or rewriting is needed. Stage 3E emitters
produce output that is correct when `export ` is prepended verbatim:
- `const foo = expr;` → `export const foo = expr;` ✓
- `class Foo { }` → `export class Foo { }` ✓
- `interface Foo { }` → `export interface Foo { }` ✓
- `type Foo = T;` → `export type Foo = T;` ✓

This property must be preserved when adding decorators or static blocks in later
stages: emitters for declarative forms should never change their trailing
punctuation.

### Group C — `export default` for declarations

Extends the existing `(export-default expr)` form to also accept declaration
nodes. This is the **one place in Stage 3F where lowering is not pass-through**
(documented separately in Section 5).

```
;; T2Lang2                                         ;; TypeScript emitted
(export-default (class Foo (class-body ...)))       export default class Foo { ... }
(export-default (class (class-body ...)))           export default class { ... }
(export-default (def greet (lambda ((n)) ...)))     export default function greet(n) { ... }
```

**Anonymous classes:** `export default class { }` is valid TypeScript. Stage 3E's
`classDef` rule requires a name (`IDENTIFIER` is mandatory). An anonymous class
variant must be added to Stage 3E before Phase 3 of Stage 3F can be implemented.
See Section 4.3 for the grammar change. This is the only grammar change needed in
Stage 3E.

**`export default function`:** `(export-default (def foo (lambda ...)))` must emit
`export default function foo(params) { body }` — a named function declaration —
not `export default const foo = () => {}` (which is a TypeScript syntax error).
This requires the lowering pass to detect that the `def` init is a `lambda` or
`fn` and perform declaration lifting (see Section 5). If the `def` init is not
a `lambda` or `fn` (e.g. it is a number literal), Stage 3F must emit a
compile-time error: `(export-default (def x 5))` is not a valid pattern.

### Group D — Namespace re-export

```
;; T2Lang2                              ;; TypeScript emitted
(export-ns-from "utils" "./utils")      export * as utils from "./utils";
```

Useful in barrel files that expose a sub-module under a namespace prefix.

---

## 4  Grammar specification

### 4.1  New lexer tokens

```antlr
IMPORT_TYPE          : 'import-type' ;
EXPORT_TYPE          : 'export-type' ;
EXPORT_TYPE_FROM     : 'export-type-from' ;
EXPORT_TYPE_ALL_FROM : 'export-type-all-from' ;
EXPORT_NS_FROM       : 'export-ns-from' ;
```

`EXPORT` already exists. The new `(export <decl>)` form reuses it; no new token
is required. Add all new tokens to `propKey`.

### 4.2  `decl` nonterminal (Stage 3F grammar addition)

`def`, `classDef`, `interfaceDef`, and `typeAlias` are already restricted to
`topLevel` in Stage 3E — they are never reachable from `expression`. Stage 3F
makes this explicit with a named nonterminal:

```antlr
decl
    : def
    | classDef
    | anonClassDef       // see 4.3
    | interfaceDef
    | typeAlias
    ;
```

This nonterminal is referenced by `exportDeclForm` and `exportDefaultDecl`.
Using a named rule (rather than inlining `def | classDef | …`) serves two
purposes:

1. **ANTLR readability** — the grammar communicates intent clearly.
2. **Disambiguation** — `exportDeclForm` starts with `LPAREN EXPORT LPAREN`,
   while the existing `exportBinding` starts with `LPAREN EXPORT IDENTIFIER`.
   Both use the `EXPORT` token but are unambiguous because their second tokens
   differ (`LPAREN` vs `IDENTIFIER`). The `decl` nonterminal documents exactly
   which alternatives are valid inside the wrapper.

### 4.3  Anonymous class (Stage 3E patch)

Add `anonClassDef` to Stage 3E's grammar. This is the only modification to
Stage 3E required by Stage 3F:

```antlr
// Stage 3E patch — anonymous class for export-default use
anonClassDef
    : LPAREN CLASS modifier* classExtends? classImplements? classBody RPAREN
    ;
```

`anonClassDef` is **not** added to `topLevel` (anonymous classes are illegal as
standalone declarations in TypeScript). It is only reachable from the
`exportDefaultDecl` rule in Stage 3F.

### 4.4  New parser rules (Stage 3F grammar)

```antlr
// ── Group A ────────────────────────────────────────────────────

importTypeForm
    : LPAREN IMPORT_TYPE importTypeSpec STRING RPAREN
    ;
// importTypeSpec: same (:default "x") / (:named …) structure as importSpec

exportTypeForm
    : LPAREN EXPORT_TYPE exportNamePair+ RPAREN
    ;

exportTypeFromForm
    : LPAREN EXPORT_TYPE_FROM STRING exportNamePair+ RPAREN
    ;

exportTypeAllFromForm
    : LPAREN EXPORT_TYPE_ALL_FROM STRING RPAREN
    ;

// ── Group B ────────────────────────────────────────────────────

exportDeclForm
    : LPAREN EXPORT decl RPAREN
    ;
// decl ::= def | classDef | interfaceDef | typeAlias  (anonClassDef excluded here)
// Disambiguated from exportBinding by second token: LPAREN vs IDENTIFIER

// ── Group C ────────────────────────────────────────────────────

exportDefaultDecl
    : LPAREN EXPORT_DEFAULT (classDef | anonClassDef | def) RPAREN
    ;
// Replaces the existing exportDefault rule, or extends it with new alternatives.
// expression alternative is kept: (export-default expr) still works.

// ── Group D ────────────────────────────────────────────────────

exportNsFromForm
    : LPAREN EXPORT_NS_FROM STRING STRING RPAREN
    ;
```

Wire each new form into `exportForm` (or `statement` for `importTypeForm`).

---

## 5  Lowering — declaration lifting (the one semantic transformation)

All new forms except one are pure pass-through in the lowering pass. The
exception is `export-default-decl` when the inner node is a `def`.

**Why lifting is needed:**

```typescript
// TypeScript syntax error — not valid:
export default const greet = (n: string) => { ... };

// Valid — named function declaration:
export default function greet(n: string) { ... }
```

**What the lowering pass must do for `(export-default (def name (lambda ...)))`:**

1. Confirm the `def` init node has tag `lambda` or `fn`. If not, emit a
   compile-time error: `export-default requires a function initializer`.
2. Extract `name` from the `def` node.
3. Extract `params` and `body` from the `lambda`/`fn` node.
4. Produce a new lowered node with tag `export-default-fn-decl`:
   `{ tag: 'export-default-fn-decl', name, params, body }`.

The codegen for `export-default-fn-decl` emits:
```typescript
export default function name(params) {
  body
}
```

For `(export-default (class Foo ...))` and `(export-default (class ...))`,
lowering is pass-through — the class body lowering is unchanged.

**This is the only place in Stage 3F where lowering performs a semantic
transformation.** All other new forms are structural rewrites or pure
pass-through.

---

## 6  AST nodes

| Tag | Fields |
|---|---|
| `import-type` | `spec` (same shape as import spec), `source: string` |
| `export-type` | `pairs: [{name, alias?}]` |
| `export-type-from` | `source: string`, `pairs: [{name, alias?}]` |
| `export-type-all-from` | `source: string` |
| `export-decl` | `decl` (inner node: class-def / def / interface-def / type-alias) |
| `export-default-class` | `classNode` (class-def or anon-class-def node) |
| `export-default-fn-decl` | `name: string`, `params: string[]`, `body: Stmt[]` *(after lowering)* |
| `export-ns-from` | `source: string`, `ns: string` |

---

## 7  Codegen

| Tag | Emitted TypeScript |
|---|---|
| `import-type` | `import type { Foo } from "mod";` or `import type Foo from "mod";` |
| `export-type` | `export type { Foo, Bar as Baz };` |
| `export-type-from` | `export type { Foo } from "mod";` |
| `export-type-all-from` | `export type * from "mod";` |
| `export-decl` | `export ` + `emitTopLevel(decl)` (no semicolon stripping needed — see Section 3B) |
| `export-default-class` | `export default class [Name] { body }` |
| `export-default-fn-decl` | `export default function name(params) {\n  body\n}` |
| `export-ns-from` | `export * as ns from "mod";` |

For `export-type` / `export-type-from`, reuse the existing export-name-pair
helper (same `{ x, y as z }` pattern) and insert `type ` after `export`.

Stage 3F codegen does **not** touch class bodies. `emitClassDef` is called
unchanged; the `export default` prefix is prepended by the new codegen handler,
not by `emitClassDef` itself.

---

## 8  Testing strategy

Type-only forms (`import type`, `export type`) are erased before execution.
Tests verify:

1. **Compilation succeeds** — `tsx` does not throw a parse or type error.
2. **Values still work** — import a value alongside the type import; assert on
   the value. The type import is present in source but invisible at runtime —
   which is the correct behaviour.

For `(export <decl>)`, `export` does not affect runtime semantics. Tests
instantiate an exported class or call an exported function and assert on results.

---

## 9  Implementation Todo

Tasks are sequential within each phase. Each phase produces passing tests before
the next begins. Grammar and AST work within each phase precedes codegen.

---

### Phase 1 — `import type` and `export type`

*Goal: type-only import/export forms compile to valid TypeScript with `type`
keyword in the right place.*

#### Step 1 — Grammar

**changes in 3F only, unless otherwise noted.**

- [x] Add lexer tokens: `IMPORT_TYPE`, `EXPORT_TYPE`, `EXPORT_TYPE_FROM`, `EXPORT_TYPE_ALL_FROM`
- [x] Add all new tokens to the `propKey` rule
- [x] Add `importTypeForm` rule; hook into `statement` (parallel to `importForm`)
- [x] Add `exportTypeForm`, `exportTypeFromForm`, `exportTypeAllFromForm` rules; hook into `exportForm`
- [x] Run `npm run build-grammar` — no conflicts; all existing tests pass

#### Step 2 — AST

**changes in 3F only, unless otherwise noted.**

- [x] Add `astImportType`: extract spec (reuse import spec helper) + source string → tag `import-type`
- [x] Add `astExportType`: extract pairs → tag `export-type`
- [x] Add `astExportTypeFrom`: extract source + pairs → tag `export-type-from`
- [x] Add `astExportTypeAllFrom`: extract source → tag `export-type-all-from`
- [x] Hook all four into `astStatement` / `astExportForm` dispatchers

#### Step 3 — Lowering

**changes in 3F only, unless otherwise noted.**

- [x] Add pass-through cases in `lowerStmt` for all four new tags (same pattern as existing import/export)

#### Step 4 — Codegen

**changes in 3F only, unless otherwise noted.**

- [x] `emitImportType`: `import type { Foo } from "mod";` or `import type Foo from "mod";`
- [x] `emitExportType`: `export type { Foo, Bar as Baz };`
- [x] `emitExportTypeFrom`: `export type { Foo } from "mod";`
- [x] `emitExportTypeAllFrom`: `export type * from "mod";`
- [x] Run `npm run build-compiler`

#### Step 5 — Tests

**changes in 3F only, unless otherwise noted.**

- [x] Write `tests/importType.test.ts`: `(import-type (named Foo) "./helpers")` alongside a value import; assert on value at runtime; verify no type error
- [x] Write `tests/exportType.test.ts`: all three export-type forms compile cleanly
- [x] Run full suite; all existing tests still pass

---

### Phase 2 — `(export <decl>)` inline declaration export

*Goal: `(export (class Foo ...))` emits `export class Foo { ... }` in one form.*

#### Step 1 — Grammar

**changes in 3F only, unless otherwise noted.**

- [x] Add `decl` nonterminal: `def | classDef | interfaceDef | typeAlias`
- [x] Add `exportDeclForm`: `LPAREN EXPORT decl RPAREN`; hook into `topLevel`
- [x] Verify disambiguation: `exportDeclForm` (`EXPORT LPAREN`) vs `exportBinding` (`EXPORT IDENTIFIER`) — no ANTLR conflict
- [x] Run `npm run build-grammar`

#### Step 2 — AST

**changes in 3F only, unless otherwise noted.**

- [x] Add `astExportDecl`: dispatch inner form to the appropriate AST handler; wrap in `{ tag: 'export-decl', decl: innerNode }`
- [x] Hook into `astTopLevel`

#### Step 3 — Lowering

**changes in 3F only, unless otherwise noted.**

- [x] Add `lowerExportDecl`: lower inner `decl` node via the appropriate lower function; preserve `export-decl` wrapper

#### Step 4 — Codegen

**changes in 3F only, unless otherwise noted.**

- [x] Add `emitExportDecl` in `emitTopLevel`: `'export ' + emitTopLevel(node.decl)` (no semicolon manipulation needed)
- [x] Run `npm run build-compiler`

#### Step 5 — Tests

**changes in 3F only, unless otherwise noted.**

- [x] Write `tests/exportDecl.test.ts`:
  - `(export (def greet (lambda ...)))` → callable
  - `(export (class Counter (class-body ...)))` → instantiable
  - `(export (interface IPoint ...))` → valid as type annotation
  - `(export (type Coord ...))` → valid as type annotation (note: T2Lang uses `type`, not `type-alias`)
- [x] Run full suite

---

### Phase 3 — `export default` for declarations

*Goal: `(export-default (class Foo ...))` and `(export-default (def foo (lambda ...)))` produce valid TypeScript.*

#### Step 0 — Stage 3E patch: anonymous class

**NOTE: these changes are for 3E, not 3F**

- [x] Add `anonClassDef` rule to Stage 3E grammar: `LPAREN CLASS modifier* classExtends? classImplements? classBody RPAREN` (no `IDENTIFIER`)
- [x] Add `anonClassDef` to Stage 3E AST, lowering, and codegen — tag `anon-class-def`
- [x] `anonClassDef` is **not** added to `topLevel`; reachable only from Stage 3F's `exportDefaultDecl`
- [x] Run `npm run build-grammar`; all Stage 3E tests still pass

#### Step 1 — Grammar (Stage 3F)

**changes in 3F only, unless otherwise noted.**

- [x] Add `anonClassDef` rule to Stage3F grammar (mirrors Stage3E)
- [x] Extend `exportDefault` rule to also accept `classDef | anonClassDef | def`
- [x] Run `npm run build-grammar`

#### Step 2 — AST

**changes in 3F only, unless otherwise noted.**

- [x] Add `astAnonClassDef` to Stage3F-ast.s3d (mirrors Stage3E)
- [x] Extend `astExportDefault`: if inner form is `classDef` or `anonClassDef`, tag `export-default-class` with `classNode` field; if inner form is `def`, tag `export-default-def` with `defNode` field; otherwise keep existing `export-default` with `expr` field

#### Step 3 — Lowering (declaration lifting)

**changes in 3F only, unless otherwise noted.**

- [x] Add `lowerAnonClassDef` to Stage3F-lower.s3d (mirrors Stage3E)
- [x] `lowerExportDefaultClass`: dispatch to `lowerClassDef` or `lowerAnonClassDef` by `classNode.tag`; produce `{ tag: 'export-default-class-stmt', classNode }`
- [x] `lowerExportDefaultDef`: check that `defNode.init.tag` is `lambda` or `fn`; if not, throw `Error('export-default: initializer must be a function')`; extract `name`, `params`, `body`; produce `{ tag: 'export-default-fn-decl', name, params: loweredParams, body: loweredBody }`

#### Step 4 — Codegen

**changes in 3F only, unless otherwise noted.**

- [x] Add `emitAnonClassDef` to Stage3F-codegen.s3d (mirrors Stage3E)
- [x] `emitExportDefaultClass`: dispatches to `emitClassDef` or `emitAnonClassDef`; prepends `export default `
- [x] `emitExportDefaultFnDecl`: `export default function name(params) {\n  body\n}`
- [x] Run `npm run build-compiler`

#### Step 5 — Tests

**changes in 3F only, unless otherwise noted.**

- [x] Write `tests/exportDefaultDecl.test.ts`:
  - `(export-default (class Greeter ...))` → instantiated and called ✓
  - `(export-default (class (class-body ...)))` → anonymous class (method renamed `get`→`getValue` since `get` is a reserved getter token) ✓
  - `(export-default (def add (lambda ((a) (b)) (return (+ a b)))))` → called and result asserted ✓
  - `(export-default (class Child (extends Base) ...))` → inheritance chain ✓

---

### Phase 4 — Namespace re-export

*Goal: `(export-ns-from "utils" "./utils")` emits `export * as utils from "./utils";`.*

#### Step 1 — Grammar

**changes in 3F only, unless otherwise noted.**

- [x] Add `EXPORT_NS_FROM : 'export-ns-from' ;`; add to `propKey`
- [x] Add `exportNsFromForm` rule; hook into `exportForm`
- [x] Run `npm run build-grammar`

#### Step 2 — AST

**changes in 3F only, unless otherwise noted.**

- [x] Add `astExportNsFrom`: extract `ns` (STRING[0]) and `source` (STRING[1]) → tag `export-ns-from`

#### Step 3 — Lowering

**changes in 3F only, unless otherwise noted.**

- [x] Add pass-through in `lowerStmt`

#### Step 4 — Codegen

**changes in 3F only, unless otherwise noted.**

- [x] `emitExportNsFrom`: `export * as <ns> from "<source>";`
- [x] Run `npm run build-compiler`

#### Step 5 — Tests

**changes in 3F only, unless otherwise noted.**

- [x] Write `tests/exportNsFrom.test.ts`: smoke-compile `(export-ns-from "utils" "./helpers")`; verify output string contains `export * as utils`

---

### Final Verification

**changes in 3F only, unless otherwise noted.**

- [x] Run full test suite (`npm test`) — all existing tests pass alongside new module tests
- [x] Run `npm test` a second time from a clean state — bootstrap build is stable
