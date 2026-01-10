# t2lang Reader Layer — Design Decisions

These decisions were made during the design session for the reader layer
that sits in front of Stage4. Stage4 itself is the canonical S-expr AST
and is not touched by sugar or reader macros.

---

## Pipeline

```
source text
  → Reader (tokens + reader macros + sugar)
  → Stage4 parser (pure S-expr grammar)
  → macro expansion (defmacro, #[macro-time])
  → lowering → TS
  → tsc
```

---

## Decision 1: Backtick strings

- [x] done?

**Decided:** Backtick is reserved exclusively for template literals with
`${}` interpolation, matching TypeScript developer expectations.

`BACKTICK_STRING` has been removed from Stage4. It appeared in `literal`,
`typeLiteral`, and `propKey` — all of which already accept `STRING` as an
alternative. Anywhere a raw backtick string was previously used, a regular
single- or double-quoted string should be used instead.

**Rationale:** TypeScript developers have strong muscle memory for
`` `hello ${name}` ``. Making this different would create friction on the
most common string operation. Clojure and Racket both reserve backtick for
quasiquote (syntax-quote), reinforcing that backtick should carry semantic
weight rather than be a raw string delimiter.

---

## Decision 2: Template literal keyword — `type-template` vs `template`

- [x] done?

**Decided:** The type-level template literal keyword is renamed from
`template` to `type-template`. Value-level template literals use `template`.

- `typeTemplateLiteral` → `(type-template ...)` 
- `templateExpr` (new) → `(template ...)` — emitted by the reader from backtick strings

**Rationale:** Consistent with the established `type-X` naming convention
already present in Stage4: `type-as`, `type-params`, `type-args`. The
value-level form gets the clean name since users will encounter it more.
Macros operating on the AST can distinguish type-level from value-level
by keyword alone, without needing context.

---

## Decision 3: Optional index access — `optchain-index`

- [x] done?

**Decided:** `foo?.[expr]` desugars to `(optchain-index foo expr)` via a
new dedicated rule, kept separate from `optChain`.

**Rationale:** `propAccess` and `indexAccess` are already separate rules
in Stage4. `optChain` and `optChainIndex` mirror that symmetry:

| Eager | Optional |
|---|---|
| `(. foo bar)` | `(optchain foo bar)` |
| `(index foo expr)` | `(optchain-index foo expr)` |

Overloading `optChain` would create an ambiguity between `propKey` and
`expression`, since the two overlap significantly.

---

## Decision 4: `OPTIONAL` token — no change needed

- [x] done?

**Decided:** No change. `OPTIONAL : '?'` remains as-is.

**Rationale:** The reader consumes `?` in ternary context and emits
`(ternary cond then else)`. Stage4 never sees a raw `?` in expression
position. `OPTIONAL` only appears inside `fnSignatureTyped` and
`typeFnParam`, which are tightly scoped. No collision is possible.

---

## Decision 5: `ARRAY` keyword — `type-array` vs `array`

- [x] done?

**Decided:** The type-level array keyword is renamed from `array` to
`type-array`. Value-level array literals keep `array`.

- `typeArray` → `(type-array T)`
- `arrayExpr` → `(array 1 2 3)` — unchanged

**Rationale:** Same reasoning as Decision 2. A macro seeing `(array ...)`
could not previously determine whether it was looking at a value or a type
without examining context. The rename makes the distinction unambiguous
from the keyword alone.

---

## Decision 6: Source spans and error reporting

- [x] done?

**Decided:** Option B — span preservation — using a global in-memory
blackboard (a `Map<NodeId, Span>`) that lives for the duration of one
compilation unit.

### Design

```ts
// Global span registry — one per compilation unit, reset between files
const spanTable = new Map<NodeId, Span>();

interface Span {
  file: string;
  startLine: number;
  startCol: number;
  endLine: number;
  endCol: number;
}

type NodeId = number; // monotonic counter, assigned at reader time
```

### Rules

- The **reader** assigns a fresh `NodeId` to every node it emits and
  registers its source span in `spanTable`.
- Downstream passes that **transform** a node inherit the source node's
  `NodeId` — so spans stay correct without passes needing to be
  explicitly span-aware.
- Passes that **synthesize** a genuinely new node with no single source
  origin inherit the nearest ancestor's `NodeId`.
- Error reporting at any stage calls `spanTable.get(node.id)` to format
  a message pointing at the original source location.

### Rollout

- Phase 1 (now): implement `Span` type, global table, and reader tagging.
- Phase 2 (per stage as needed): wire error messages in each lowering pass.
- Phase 3 (when users arrive): `.map` file generation for IDE integration.

**Rationale:** A global table removes the need for every transformation
pass to thread span information through its return types. Compilation is
single-threaded so there are no shared-state concerns. Retrofitting span
tracking after the fact is 2-3x more expensive than designing for it from
the start, so the minimal Phase 1 investment is worth making now.

### Phase 1 implementation plan

Phase 1 only is what the checkbox covers (the design explicitly defers Phase 2 and 3). These are the natural substeps:

- [x] Step A — Infrastructure (new shared module)
Add Span interface, NodeId type, global spanTable: Map<NodeId, Span>, and a monotonic nextNodeId() counter. ANTLR contexts expose .start.line, .start.column, .stop.line, .stop.column — so the data is already there.

- [x] Step B — Reader tagging (Stage5-ast.s3d)
Every astFoo function adds (id (nextNodeId)) to each node it constructs, and calls registerSpan(id, ctx) before returning. Mechanical but touches ~30-40 node factories.

- [x] Step C — Lowering propagation (Stage5-lower.s3d)
Every lowered node inherits its source node's id: (id (. node id)). Synthesized nodes inherit the nearest ancestor's id. Also mechanical, one field per object(...) call.

- [x] Step D — Error formatting helper
formatSpan(id) → "file:line:col". Plugged into the existing throw new Error(...) sites in lowering and codegen (about 6-8 sites).

- [x] Step E — Tests
Verify that a malformed input produces an error message with a recognizable source location.

Steps A+B+C+D together are all Phase 1. Step E is the test harness.

The heaviest lift is B (touching every AST factory) and C (every lowering result).

### Phase 2 Implementation plan

- (per stage): wire error messages in each lowering pass.
  - build list of compiler stages (parsing, ast, lowering, codegen).
  - for each stage, get list of exisitng error checks.
  - migrate each existing error report to use new global source spans.
  - for each migrated error report, add to stage5/tests/**.test.ts.

What Phase 2 means in practice

Phase 1 laid all the infrastructure. Phase 2 is "wiring" — plugging formatSpan(node.id) into every remaining error throw site. The sites fall into three groups with different difficulty levels:

- [x] Group A — Ready now (very easy)

These are "unexpected tag" errors in the codegen pass. Lowered nodes already carry .id (Phase 1, Step C), so the wiring is a one-liner per site, identical to what was done in lower:

Site	Node field
emitStmt: unexpected tag	stmt.id
emitExpr: unexpected tag	expr.id
emitClassElement: unexpected tag	node.id
emitExportDefaultClass	node.classNode.id
emitTypeExpr: unexpected tag	node.id
Plus 4 lower errors that weren't caught by the bulk replacement (lowerExportDefaultClass, lowerExportDecl, the export-default error, Invalid type application) — all have node.id or classNode.id in scope.

- [x] Group B — File name threading (trivial, one change)

registerSpan currently hardcodes file: '<stdin>'. The fix is to add a currentFile_ variable to Stage5-spans.s3d, pass filePath to resetSpans(filePath) in Stage5.s3d, and registerSpan picks it up automatically. Zero changes to AST/lower/codegen.

### Phase 3:

Deferring: Group C — AST-phase errors (slightly awkward)

The 10 error throws in Stage5-ast.s3d fire before a node object is constructed, so there's no node.id yet. The workaround is to inline formatSpan(registerSpan(nextNodeId(), ctx)) in the error message — allocating a throwaway id just for location. Functional but wasteful. Alternatively, most of these errors fire when the grammar parse already failed, meaning ANTLR itself reports the error before the AST builder is even called — so adding spans here has limited value.

- [x] Group D — Macro expansion (genuinely different)

The macro expander uses an accumulated error list (ExpansionError[]) rather than throw. To add spans, each ExpansionError would need to carry a nodeId, which means threading ids through expandExpr/expandStmt — those currently don't propagate .id at all. This is a Phase 2.5 at minimum.

---

## Stage4.g4 changes summary

| Change | Detail |
|---|---|
| Removed `BACKTICK_STRING` | From `literal`, `typeLiteral`, `propKey`, and lexer |
| Renamed `TEMPLATE` → `TYPE_TEMPLATE` | Type-level keyword, lexer + `typeTemplateLiteral` rule |
| Added `TEMPLATE` | Value-level keyword for `templateExpr` |
| Added `templateExpr` rule | `(template (STRING \| expression)+)` in `expression` |
| Added `TYPE_ARRAY` | Type-level keyword, replaces `ARRAY` in `typeArray` |
| `ARRAY` | Kept for value-level `arrayExpr` only |
| Added `OPTCHAIN_INDEX` | New keyword + `optChainIndex` rule for `foo?.[expr]` |
| `OPTCHAIN` | Kept for property-level `optChain` only |
