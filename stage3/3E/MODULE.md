# Stage 3E — Module Boundaries

## 1  Scope and non-goals

T2Lang2 is a transpiler to TypeScript. The TypeScript compiler and the JavaScript
runtime own module resolution, circular-dependency detection, and cross-file scope
analysis. T2Lang2 only needs to emit **syntactically valid TypeScript module
syntax**. It never inspects module graphs, never resolves paths, and never tracks
what names are visible from another file.

"Module boundaries" therefore means: *can T2Lang2 express every TypeScript
import/export form that a real program needs?*

## 2  What is already covered

| T2Lang2 form | TypeScript emitted |
|---|---|
| `(import "./mod")` | `import "./mod";` |
| `(import (object (:default "x")) "./mod")` | `import x from "./mod";` |
| `(import (object (:namespace "ns")) "./mod")` | `import * as ns from "./mod";` |
| `(import (object (:named (array (object (:name "x"))))) "./mod")` | `import { x } from "./mod";` |
| `(import (object (:named …) (:default "x")) "./mod")` | `import x, { … } from "./mod";` |
| `(export PI 3.14)` | `export const PI = 3.14;` |
| `(export-default expr)` | `export default <expr>;` |
| `(export-named (x) (y z))` | `export { x, y as z };` |
| `(export-from "./mod" (x) (y z))` | `export { x, y as z } from "./mod";` |
| `(export-all-from "./mod")` | `export * from "./mod";` |

Everything in this table already works and is tested. No changes needed.

## 3  Gaps

Three groups of missing forms exist. They are listed from highest to lowest priority.

### 3A — Type-only imports and exports (HIGH)

TypeScript's `import type` / `export type` markers tell the compiler (and bundlers
like Vite, esbuild, Parcel) that an import/export carries only types and must be
completely erased before JavaScript is emitted. The TypeScript `isolatedModules`
flag and Vite's default configuration **require** `import type` for any import
that is purely a type reference.

Without these forms, T2Lang2 programs that import TypeScript interfaces or type
aliases will fail to build under `isolatedModules`.

**Missing forms:**

```
(import-type (named Foo Bar) "./foo")
  → import type { Foo, Bar } from "./foo";

(import-type (default Foo) "./foo")
  → import type Foo from "./foo";

(export-type (Foo) (Bar Baz))
  → export type { Foo, Bar as Baz };

(export-type-from "./foo" (Foo))
  → export type { Foo } from "./foo";

(export-type-all-from "./foo")
  → export type * from "./foo";
```

Note: TypeScript also supports per-specifier inline `type` modifiers
(`import { type Foo, bar } from "./foo"`). This is granular but
rarely necessary and adds grammar complexity. Defer to a later stage.

### 3B — Inline declaration exports (MEDIUM)

Currently the only way to export a class, interface, or type alias is to declare
it and then separately re-export it:

```lisp
(class Foo (class-body ...))
(export-named (Foo))
```

TypeScript idiomatically writes `export class Foo { ... }` in a single declaration.
The two-step workaround always works, but it is verbose and produces an
unnecessary extra statement.

**Proposed form:** a generic `(export <top-level-form>)` wrapper that prepends the
`export` keyword to the emitted declaration.

```lisp
(export (class Foo (class-body ...)))
  → export class Foo { ... }

(export (def greet (lambda ((name)) (return (+ "hi " name)))))
  → export const greet = (name) => { return "hi " + name; };

(export (interface IPoint (Object (x number) (y number))))
  → export interface IPoint { x: number; y: number }

(export (type-alias Point (Object (x number) (y number))))
  → export type Point = { x: number; y: number };

(export (interface-def ...))
  → export interface ...;
```

`export default` for a named declaration:

```lisp
(export-default (class Foo (class-body ...)))
  → export default class Foo { ... }
```

This requires `export-default` to accept either an expression **or** a
top-level declaration node. The codegen already handles `export-default expr`;
adding a check for declaration tags (`class-def`, `def`, `interface-def`,
`type-alias`) is a small extension.

### 3C — Namespace re-export (LOW)

```
(export-ns-from "ns" "./mod")
  → export * as ns from "./mod";
```

This is occasionally useful for barrel files that want to expose an entire
submodule under a namespace prefix. It is rare enough that omitting it causes
no practical problem until someone needs it.

### 3D — Dynamic import (LOW / OPTIONAL)

`import('./foo')` is a valid TypeScript expression (returns `Promise<module>`).
The `import` keyword is reserved in T2Lang2's grammar so it cannot be expressed
as a normal call.

```
(dynamic-import "./foo")
  → import("./foo")

(dynamic-import "./foo" (object (assert (object (type "json")))))
  → import("./foo", { assert: { type: "json" } })
```

This is only needed for code-splitting and lazy-loading patterns. It can be
deferred: the workaround is a single raw comment block or a type-assert-escaped
string. Not blocking for any real program today.

---

## 4  What we intentionally do NOT implement

| Concern | Owner | Reason |
|---|---|---|
| Module resolution (`node_modules`, path aliases) | TypeScript / bundler | Not a compiler concern |
| Circular dependency detection | TypeScript / ESLint | Semantic analysis, not codegen |
| `import.meta.url` / `import.meta.env` | Runtime / bundler | Expression-only; if needed can be `(. import meta)` but `import` is reserved — defer |
| `.d.ts` declaration file generation | TypeScript `tsc --declaration` | Out of scope |
| CommonJS `require` / `module.exports` | TypeScript `module: commonjs` | The bundler handles interop |
| Top-level `await` | Already supported as an expression | No new syntax needed |
| Per-specifier `import { type Foo }` | Deferred | Granular; rare; adds grammar noise |

---

## 5  Grammar changes

All additions are small extensions to existing rules.

### 5A — `import-type` form

New top-level statement rule (mirrors the existing `importForm` rule):

```antlr
importTypeForm
    : LPAREN IMPORT_TYPE importSpec STRING RPAREN
    ;
IMPORT_TYPE : 'import-type' ;
```

`importSpec` is the same object-literal spec already used by the regular import
form (`(:default "x")`, `(:named …)`). The codegen inserts `type` between
`import` and the spec.

### 5B — `export-type`, `export-type-from`, `export-type-all-from`

```antlr
EXPORT_TYPE          : 'export-type' ;
EXPORT_TYPE_FROM     : 'export-type-from' ;
EXPORT_TYPE_ALL_FROM : 'export-type-all-from' ;

exportTypeForm      : LPAREN EXPORT_TYPE exportNamePair+ RPAREN ;
exportTypeFromForm  : LPAREN EXPORT_TYPE_FROM STRING exportNamePair+ RPAREN ;
exportTypeAllFrom   : LPAREN EXPORT_TYPE_ALL_FROM STRING RPAREN ;
```

### 5C — `(export <decl>)` wrapper

Extend the top-level rule to accept an `exportDecl` form:

```antlr
EXPORT_DECL : 'export' ;   ;; already lexed as EXPORT? check

exportDeclForm
    : LPAREN EXPORT_DECL topLevelItem RPAREN
    ;
```

Where `topLevelItem` covers `def`, `classDef`, `interfaceDef`, `typeAlias`.

The codegen prepends `export ` to whatever the inner top-level form emits.

**Important:** `(export PI 3.14)` already exists as `export-binding` which uses the
`EXPORT` token but with a different pattern (`EXPORT IDENTIFIER expression`). The
new `exportDeclForm` uses `EXPORT LPAREN topLevelForm RPAREN` and is
unambiguous.

Actually: the existing `export` form `(export name expr)` uses the keyword
`export` followed by an identifier. The new `(export (class ...))` uses `export`
followed by `LPAREN`. These are **unambiguous** in the grammar.

### 5D — `export-default` accepting a declaration

Extend `exportDefault` to accept either `expression` **or** `classDef |
interfaceDef | typeAlias | def`:

```antlr
exportDefault
    : LPAREN EXPORT_DEFAULT (expression | classDef | interfaceDef | typeAlias | def) RPAREN
    ;
```

### 5E — `export-ns-from`

```antlr
EXPORT_NS_FROM : 'export-ns-from' ;
exportNsFrom : LPAREN EXPORT_NS_FROM STRING IDENTIFIER RPAREN ;
```

Emits: `export * as <identifier> from "<string>";`

---

## 6  AST / lowering / codegen

Lowering for all new forms is pass-through (same as all existing import/export
forms — no semantic transformation needed).

Codegen additions:

| New tag | Emitted TypeScript |
|---|---|
| `import-type-stmt` | `import type { Foo, Bar } from "mod";` or `import type Foo from "mod";` |
| `export-type-stmt` | `export type { Foo, Bar as Baz };` |
| `export-type-from-stmt` | `export type { Foo } from "mod";` |
| `export-type-all-from-stmt` | `export type * from "mod";` |
| `export-decl-stmt` | `export ` + inner declaration string |
| `export-ns-from-stmt` | `export * as ns from "mod";` |

`export-default-stmt` already handles expressions. Add a guard: if the inner node
tag is one of `class-def`, `def`, `interface-def`, `type-alias`, call the
appropriate emit function instead of `emitExpr`, and strip the trailing `;`.

---

## 7  Implementation order

Each step is independently testable.

| Step | Work | Test |
|---|---|---|
| 1 | `import type` — grammar token + rule, AST, lower, codegen | `tests/importType.test.ts` — import type from a module of TS interfaces |
| 2 | `export type` / `export-type-from` / `export-type-all-from` | `tests/exportType.test.ts` |
| 3 | `(export <decl>)` wrapper for def, class, interface, type-alias | `tests/exportDecl.test.ts` |
| 4 | `export-default` accepting class/interface declaration | extend existing export test |
| 5 | `export-ns-from` | `tests/exportNsFrom.test.ts` |
| 6 | `dynamic-import` expression | `tests/dynamicImport.test.ts` |

Steps 1–3 cover the high-priority gaps. Steps 4–6 are incremental and can be
deferred.

---

## 8  Notes on testing strategy

The end-to-end test runner compiles T2Lang2 source to TypeScript and executes it
with `tsx`. This makes type-only import/export forms tricky to test at runtime
(types are erased before execution). Two strategies:

1. **Smoke test**: compile the source; if `tsc` / `tsx` does not error, the form
   is syntactically valid. The `fromSourceEndToEnd` helper already does this.

2. **Value test**: emit a file that imports a type and also imports a value from
   the same module, then assert on the value. The type import is structurally
   present in the source but invisible at runtime — which is exactly the correct
   behaviour.

For `(export <decl>)`, the test can compile the program that uses `export class`
and then verify the class is constructed and used correctly — the export keyword
does not affect runtime semantics, only the TypeScript module boundary.
