# Staging Guard Rails for AI Coding Agents

## Core Principles (Copy these into every coding session)

### 1. Data Flow Rule
```
RULE: Code flows in ONE direction only.
User Source → Phase B → Phase A1 → Phase A0 → Codegen

BEFORE accepting any code change, ask:
- Does this maintain unidirectional flow?
- Does this phase depend on output from a later phase?

RED FLAG: If Phase A needs Phase B, you're going backwards.
```

### 2. Responsibility Clarity
```
RULE: Each phase has ONE job.
- Phase B: Parse sugar → Emit canonical forms
- Phase A: Parse canonical forms → Type check → Codegen

BEFORE adding code to Phase A, ask:
- Is this handling user-facing syntax?
- Could a user write this directly in source?
- Does this involve precedence, infix, or shorthands?

If YES to any: This belongs in Phase B.
```

### 3. The Canonical Test
```
RULE: Phase A only accepts forms documented in its grammar.

BEFORE adding a feature to Phase A parser, ask:
- Is this form in phaseA/GRAMMAR.md?
- Would a macro need this syntax, or would a user?

If a USER would write it: Phase B sugar.
If a MACRO would emit it: Phase A canonical.
```

### 4. Metadata Minimalism
```
RULE: Canonical nodes carry only data needed for semantics.

BEFORE adding a field to a Phase A AST node, ask:
- Could I implement this language without TypeScript?
- Is this data specific to one source language (TS, JS, etc.)?
- Is this data derivable from other node fields?

If YES to any: Don't add it. Handle it in Phase B or codegen.

RED FLAGS:
- `maybeNull` (sugar transformation leaked)
- `isConst` (should be distinct node types)
- `spreadKind` (should lower to distinct operations)
- `syntacticSugar` flags
```

### 5. Parse Once Principle
```
RULE: Each syntactic construct is parsed in exactly ONE phase.

BEFORE implementing parsing logic, ask:
- Does another phase already parse this?
- Am I duplicating type parsing, operator parsing, etc.?

If YES: Refactor. One phase parses, others consume.
```

### 6. The Sugar Question
```
BEFORE implementing ANY feature, ask:
"Could a human write the canonical form directly?"

If NO: It's sugar → Phase B handles it.
If YES: It's canonical → Phase A handles it.

Examples:
- obj.prop → NO (human wants dots) → Phase B sugar
- (prop obj "prop") → YES (valid s-expr) → Phase A canonical
- x?.y → NO (convenience) → Phase B sugar
- (if (== x null) undefined (prop x "y")) → YES → Phase A canonical
```

## Phase-Specific Rules

### Phase B Guard Rails
```
YOU ARE WRITING PHASE B CODE. Before committing:

☐ Does this emit ONLY canonical Phase A forms?
☐ Is every output documented in phaseA/GRAMMAR.md?
☐ Do I import ANY code from Phase A for transformation logic?
   (Importing AST type definitions is OK, importing helpers is NOT)
☐ If this adds syntax, is there a corresponding SUGAR.md entry?

NEVER:
- Parse canonical forms (Phase A does this)
- Implement type checking (Phase A does this)
- Generate TypeScript (codegen does this)
```

### Phase A Guard Rails
```
YOU ARE WRITING PHASE A CODE. Before committing:

☐ Does this accept ONLY s-expression syntax?
☐ Would a macro author write this form?
☐ Is this form in phaseA/GRAMMAR.md?
☐ Do I check for dots, infix operators, or shorthands?
   (If YES: remove it, Phase B should handle)
☐ Does this node type exist in Phase A0 spec?

NEVER:
- Parse user-facing sugar (dots, infix, optional chaining)
- Transform syntax (that's Phase B's job)
- Carry language-specific metadata (TypeScript concerns)
```

### Codegen Guard Rails
```
YOU ARE WRITING CODEGEN CODE. Before committing:

☐ Do I operate on Phase A0 nodes only?
☐ Am I checking for sugar syntax that should be gone?
☐ Do I need to add metadata to Phase A nodes to make this work?
   (If YES: the metadata belongs in Phase B rewrites)

NEVER:
- Parse or transform syntax
- Make decisions based on source syntax (use AST only)
```

## Code Review Checklist

### When Adding a Feature
```
1. Which phase owns this feature?
   - User writes it → Phase B parses it
   - Macros emit it → Phase A parses it
   - Runtime needs it → Codegen handles it

2. Does this create dependencies?
   Draw the dependency graph. No cycles allowed.
   
3. Is there an existing node type that could represent this?
   Prefer composition of simple nodes over new complex nodes.

4. What is the canonical form?
   Write it down. Phase B must emit exactly this.
```

### When Modifying Existing Code
```
1. Am I moving work earlier in the pipeline?
   ✓ Good: Phase A → Phase B (simplifying canonical)
   ✗ Bad: Phase B → Phase A (leaking sugar)

2. Am I adding metadata?
   ✓ Good: Phase B tags → Phase A consumes
   ✗ Bad: Phase A tags for later phases to consume

3. Am I duplicating logic?
   Check: Is this parsing logic already in another phase?
   If yes: Extract to shared utilities or delete.
```

## Anti-Patterns to Reject

### 1. The "Just One Flag" Anti-Pattern
```
❌ "Let's add isOptional flag to PropExpr for optional chaining"

WHY BAD: Metadata creep. Next you'll add isSafe, isComputed, etc.

✅ INSTEAD: Phase B rewrites obj?.prop to explicit guards.
           Phase A never sees optional chaining.
```

### 2. The "Both Phases Can Handle It" Anti-Pattern
```
❌ "Phase B parses simple types, Phase A parses complex types"

WHY BAD: Unclear boundaries. Which types are simple?
         Duplicate parsing logic. Maintenance nightmare.

✅ INSTEAD: Phase B parses ALL types → emits structured TypeNode.
           Phase A accepts TypeNode only.
```

### 3. The "Convenience Method" Anti-Pattern
```
❌ "Phase A parser has parseDottedIdentifier() helper"

WHY BAD: Phase A shouldn't know about dots.
         This is sugar awareness leaking in.

✅ INSTEAD: Phase B converts foo.bar.baz to (prop (prop foo "bar") "baz")
           Phase A only parses (prop ...) forms.
```

### 4. The "Metadata for Later" Anti-Pattern
```
❌ "Parse stores originalSyntax field for better error messages"

WHY BAD: Forward references. Parse shouldn't know what codegen needs.
         Metadata bloat.

✅ INSTEAD: Source maps. Track spans. Reconstruct syntax from AST if needed.
```

### 5. The "Smart Parser" Anti-Pattern
```
❌ "Parser auto-converts [1,2,3] to (array 1 2 3)"

WHY BAD: Parser is doing transformation.
         Mixing parsing with sugar desugaring.

✅ INSTEAD: Phase B tokenizer recognizes [...] as delimiter.
           Phase B sugar pass converts to (array ...).
           Phase A never sees brackets.
```

## Quick Decision Tree

```
I need to add code that handles _____.

├─ Is it user-facing syntax?
│  ├─ YES → Phase B (sugar)
│  └─ NO → ↓
│
├─ Is it a canonical form?
│  ├─ YES → Phase A (parser/types)
│  └─ NO → ↓
│
├─ Is it output generation?
│  ├─ YES → Codegen
│  └─ NO → ↓
│
└─ Is it shared logic?
   ├─ YES → Utilities (with clear phase boundaries)
   └─ NO → Reconsider: Where does this actually belong?
```

## Refactoring Trigger Phrases

When you see these in code/comments, refactor immediately:

```
❌ "Phase A will also handle..."  → Split responsibility
❌ "Both phases support..."       → Choose one owner
❌ "Fallback to..."                → Unclear boundaries
❌ "For now we'll..."              → Technical debt
❌ "Special case for..."           → Missing abstraction
❌ "Also check if..."              → Too many concerns
❌ "This is temporary..."          → Will become permanent
```

## One-Liners for AI Agents

Copy these into system prompts:

```
"Phase A is a dumb parser. It doesn't know about convenience syntax."

"If a human would write it, Phase B handles it. If a macro would emit it, Phase A handles it."

"Metadata is a smell. Question every field added to AST nodes."

"Parse in one phase. Transform in one phase. Generate in one phase. Never mix."

"Data flows forward only. No phase depends on its successors."

"Can I implement this without knowing the source language? If no, it's in the wrong phase."

"Sugar goes in Phase B. Semantics go in Phase A. Syntax goes in TypeScript."
```

## Pre-Commit Checklist

```bash
# Run before committing ANY code to staged compiler:

☐ No imports from later phases to earlier phases
☐ No duplicate parsing logic across phases  
☐ No new metadata fields without STRONG justification
☐ Feature documented in correct phase's docs (SUGAR.md vs GRAMMAR.md)
☐ Tests in correct phase's test suite
☐ Can trace data flow: Source → B → A1 → A0 → Codegen (no cycles)
☐ Asked: "Would this exist in a language-agnostic compiler?"
   If NO: Belongs in Phase B
```

## Emergency Stop Phrases

If an AI agent suggests these, STOP and reconsider:

```
🚨 "Let's add sugar handling to Phase A for convenience"
🚨 "Phase A can parse this simpler syntax too"
🚨 "We'll store this metadata for later phases"
🚨 "Both phases can support this for compatibility"
🚨 "Quick fix: add a flag to distinguish these cases"
🚨 "Phase B can call into Phase A for complex parsing"
```

## Architectural Mantras

Repeat these when uncertain:

```
1. "Staged means unidirectional."
2. "Canonical means minimal."
3. "Sugar transforms early."
4. "Metadata is a liability."
5. "Parse once, transform once, generate once."
6. "When in doubt, keep it out (of the earlier phase)."
```

---

## Usage for AI Agents

### In System Prompt:
```
You are working on a staged compiler with strict phase separation.
Before writing code, review the relevant section of staging-guardrails.md.
Before accepting a design, run through the decision tree.
If adding a feature, answer the Sugar Question.
```

### In Each Prompt:
```
Apply staging guard rails:
- Which phase owns this?
- Does this violate unidirectional flow?
- Am I adding metadata? Why?
- Is this duplicating existing parsing?
```

### After Code Generation:
```
Run the pre-commit checklist on the code you just generated.
Identify any anti-patterns.
Suggest refactoring if guard rails are violated.
```
