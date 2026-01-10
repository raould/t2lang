# T2Lang Staging Analysis

## Intended Architecture

The t2lang compiler is **designed** to be highly staged:

### Phase A (Canonical Core)
- **Phase A0**: Minimal calculus - pure s-expression AST with lambdas, applications, bindings, literals, and control flow. Language-agnostic.
- **Phase A1**: TypeScript bridge - adds TypeScript-specific metadata (typed declarations, generics, conditional/mapped types, optional chaining guards, richer loop variants) on top of A0.

### Phase B (Ergonomic Layer)
- Lexical rewrites, syntactic sugar, and macros
- Normalizes everything back into Phase A's canonical forms
- Should handle: dotted identifiers, infix operators, optional chaining, type annotations, array literals, etc.

### Ideal Data Flow
```
User Code → PhaseB (sugar/macros) → PhaseA1 (TS-aware) → PhaseA0 (minimal) → Codegen → TypeScript
```

---

## Current Reality: Where Staging is Blurring

### 1. **Parser in Phase A Doing Too Much**

**Issue**: `phaseA/src/parse.ts` (2145 lines) is directly parsing many features that should arguably be sugar-transformed by Phase B first:

```typescript
// PhaseA parser handles:
- Type annotations directly (PRIMITIVE_NAME_MAP, TypePrimitive, TypeObject, etc.)
- Complex type expressions (TypeConditional, TypeMapped, TypeInfer)
- Multiple loop forms (ForClassic, ForOf, ForAwait)
- Optional chaining metadata (maybeNull flags)
- Spread operators with kind discrimination
```

**Why this blurs staging**: Phase A is supposed to receive **canonical** forms from Phase B. Instead, it's doing its own syntactic analysis.

### 2. **Sugar Transformations Split Across Phases**

**In Phase B** (`phaseB/src/sugar.ts`):
```typescript
- Array literals: [1,2,3] → (array 1 2 3)
- Infix operators: (1 + 2) → (call + 1 2)
- Optional chaining: obj?.prop → (let* (...) (if ...))
- Dotted identifiers: obj.method → (call (prop obj "method"))
- Type annotations: (x: number) → structured type nodes
```

**But Also in Phase A**:
```typescript
- Phase A parser directly tokenizes and parses types
- Phase A handles destructuring patterns
- Phase A interprets spread/rest with kind flags
- Phase A manages optional chaining via maybeNull metadata
```

**Why this blurs**: Responsibility is duplicated. Phase B does some sugar, but Phase A also interprets sugary forms.

### 3. **Type System Handling is Ambiguous**

**Observation**: Type expressions appear to be handled in **both** phases:

- **Phase B**: Has `typeExpr.ts` and `typeAnnotationUtils.ts` that parse type syntax
- **Phase A**: Has extensive type node definitions and a parser that builds TypeNode AST

**The blur**: It's unclear where the boundary is. Does Phase B fully lower types to canonical forms, or does Phase A do its own type parsing? The spec says Phase B should "parse TypeScript-style type annotations and rewrite them to structured nodes," but Phase A also has type parsing logic.

### 4. **Metadata Creep from A1 into A0**

The spec says:
> "Phase A0 vs A1: Only after Phase B finishes its rewrites does the pipeline optionally strip metadata-heavy nodes down to the A0 calculus"

**But**: Looking at the code, there's no clear "stripping" mechanism. Phase A1 nodes (with TypeScript metadata) seem to flow directly to codegen without a reduction to A0's minimal calculus.

**Example**: `FunctionExpr` with decorators, `type-mapped` with modifiers, `ForAwait` with async flags - these A1 constructs don't appear to have A0 equivalents they reduce to.

### 5. **Control Flow Forms Already Specialized**

Phase A defines:
- `ForClassic` (init/cond/update)
- `ForOf` (iterator binding)  
- `ForAwait` (async flag)

**The blur**: These are TypeScript-specific loop variants. Phase A0 (the "minimal calculus") shouldn't need to distinguish between loop types - that's a Phase B/A1 concern. But they're baked into the Phase A parser.

---

## Evidence of Blurring from Documentation

### From the Spec
> "Phase B must also insist Arrow Function Type expressions are parenthesized when they appear inside unions... The canonical AST only accepts the unambiguous shapes described in `phaseA/GRAMMAR.md`"

**This suggests**: Phase A's grammar is already too TypeScript-aware. A truly canonical core would accept fewer forms.

### From Implementation Notes
> "Optional chaining must be rewritten in Phase B before visiting Phase A: replace controls using `?.`/`?.[]` with explicit guard statements... and set the resulting `PropExpr`/`IndexExpr`'s `maybeNull` flag"

**This reveals**: Phase A nodes carry `maybeNull` metadata - a TypeScript/Phase B concern leaking into the canonical layer.

### From SUGAR.md
> "Phase B parses TypeScript-style type annotations and rewrites them to the structured `t:` nodes documented in [phaseA/TYPES.md]"

**But**: Looking at Phase A's parser, it also parses types! The rewriting isn't complete.

---

## Why This is Happening (Architectural Patterns)

### 1. **Single-Pass Parser Convenience**
Phase A has a monolithic parser that handles everything in one go. It's easier to parse types, spreads, and control flow directly rather than deferring to Phase B transformations.

### 2. **Incremental Development**
The system started with Phase 0/1, then evolved to A/B. Sugar features were added incrementally without fully refactoring the parser to be "dumb" about them.

### 3. **TypeScript Coupling**
T2lang compiles to TypeScript, so TypeScript concepts (generics, mapped types, optional chaining) permeate the system. Separating them cleanly into "Phase B sugar" vs "Phase A primitives" is harder than anticipated.

### 4. **Metadata Dependencies**
Phase A needs *some* TypeScript metadata to generate correct output. For example:
- `maybeNull` for optional chaining codegen
- `kind` on spreads (array vs object vs rest)
- `isConst` on let* bindings

This metadata should arguably come from Phase B rewrites, but it's being managed in Phase A.

---

## Concrete Examples of Blurring

### Example 1: Optional Chaining
**Phase B** (`sugar.ts`):
```typescript
// Rewrites obj?.prop to:
(let* ((tmp obj))
  (if (== tmp null)
      undefined
      (prop tmp "prop")))
```

**Phase A** (`parse.ts`):
```typescript
// Still carries maybeNull metadata:
interface PropExpr {
  kind: "prop";
  object: Expression;
  property: string;
  maybeNull?: boolean;  // ← TypeScript-specific metadata
}
```

**The issue**: Phase A shouldn't need `maybeNull` if Phase B already rewrote `?.` into explicit guards. But Phase A keeps this metadata for codegen.

### Example 2: Type Annotations
**Phase B** (`typeAnnotationUtils.ts`):
```typescript
// Parses x: number into type nodes
function collectAnnotationSegment(...)
```

**Phase A** (`parse.ts`):
```typescript
// Also parses types directly
const PRIMITIVE_NAME_MAP: Record<string, TypePrimitive["kind"]> = {
  number: "type-number",
  string: "type-string",
  // ...
}
```

**The issue**: Both phases parse types. Phase B should fully lower them, Phase A should just consume the lowered form.

### Example 3: Spread Operators
**Spec says**:
> "Spread/rest occurrences now observe a SpreadExpr with a kind flag (array, object, or rest)"

**Phase A defines**:
```typescript
interface SpreadExpr {
  kind: "spread";
  argument: Expression;
  spreadKind?: "array" | "object" | "rest";
}
```

**The issue**: `spreadKind` is context-dependent sugar. Phase A0 (minimal calculus) shouldn't need to distinguish these - Phase B should lower them to different canonical forms.

---

## What True Staging Would Look Like

### Idealized Phase A0 (Minimal)
```typescript
// Only these node types:
- program, block
- let*, const* (sequential bindings, no isConst flag - that's sugar)
- if, while, switch (no for variants)
- lambda, application
- literals, identifiers
- return, break, continue, throw
```

### Idealized Phase A1 (TypeScript Bridge)
```typescript
// Adds TypeScript metadata:
- Type annotations (as structured data, not parsed syntax)
- Generics (type parameters)
- Interfaces, type aliases
- Export/import declarations
```

### Idealized Phase B (All Sugar)
```typescript
// Transforms everything to A1:
- for/for-of/for-await → while loops with iterator protocol
- Optional chaining → explicit let*/if guards
- Infix operators → prefix call forms
- Dotted access → nested prop calls
- Type syntax → structured type nodes
- Spreads → explicit array concat / object merge operations
```

---

## Recommendations for Cleaner Staging

### 1. **Make Phase A Parser "Dumber"**
- Phase A should only parse canonical s-expressions
- Remove type parsing from Phase A - accept pre-structured type nodes
- Remove sugar-aware logic (dotted identifiers, infix operators)

### 2. **Enforce Phase B as the Only Entry Point**
```
User Source → Phase B Reader/Sugar → Phase A Parser → Phase A Processor → Codegen
```

Current flow seems to be:
```
User Source → Phase A Parser (with sugar awareness) → Phase B transformations (partial) → ...
```

This is backwards!

### 3. **Eliminate Redundant Metadata**
- `maybeNull` should not exist if optional chaining is fully lowered
- `spreadKind` should not exist if spreads are lowered to distinct operations
- `isConst` should not exist if let/const are distinct node types in A1

### 4. **Strict A0/A1 Separation**
- Define an explicit "lowering" pass that converts A1 → A0
- A0 should be truly minimal (no TypeScript awareness)
- Codegen should work from A0, not A1

### 5. **Single Responsibility**
- Phase B: Parse ergonomic syntax → Emit canonical A1 nodes
- Phase A1: Accept canonical nodes → Add TypeScript metadata → Lower to A0
- Phase A0: Minimal calculus → Type check → Codegen
- Codegen: A0 AST → TypeScript output

---

## Conclusion

**Yes, the system is blurring across stages**, and your observation is correct. As sugar is added, Phase A is doing more work that should belong to Phase B, and the boundaries between A0/A1/B are not cleanly enforced.

**Root causes**:
1. Monolithic parser in Phase A that handles sugar directly
2. Metadata creep (TypeScript-specific flags in canonical nodes)
3. Type parsing split across phases
4. No clear A0 ↔ A1 lowering mechanism

**To fix it**, you'd need to:
- Refactor Phase A parser to be truly minimal
- Move all sugar awareness to Phase B
- Establish clear contracts: B emits A1, A1 lowers to A0, A0 codegens
- Remove redundant metadata that exists because lowering isn't complete

The architecture *intends* to be staged, but the implementation has accumulated cruft that defeats the staging discipline. A clean reimplementation (which the spec hints at) would enforce these boundaries more strictly.
