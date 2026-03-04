# Stage 7 Design

## Scope
- Add statement-only `try` with optional `catch` (single) and optional `finally`; require at least one of catch/finally.
- Add computed method/getter/setter names (including static) using `[expr]` keys; evaluation semantics mirror TS/JS.
- Mirror TS semantics but retain full AST shape/bindings for macro-time visibility.

## Try / Catch / Finally
- **Form**: `(try <stmts> (catch <id> <stmts>)? (finally <stmts>)?)` — at least one of catch/finally required.
- **Expression?** No, statement-only.
- **Semantics**: Emit JS `try { … } catch (id) { … } finally { … }` with standard completion rules; allow `return/throw/break/continue` inside.
- **Catches**: Single catch clause for now; binds its `id` for its body only (scope-resolve should treat as a binding). No catch parameter pattern matching—identifier only.
- **Finally**: Optional; always executes per JS semantics. If finally throws, it wins over prior completion.
- **Spans**: Shared try-span acceptable initially (can refine later).
- **Tags (planned)**: `try`, `catch`, `finally` at AST; lowered to `try-stmt` etc. Add to tag whitelist.
- **Pipeline touches**: Grammar, AST builder, lowering, codegen, tag set, scope-resolve (enter catch binding), macro traversal.

## Computed Method Names
- **Where allowed**: methods, getters, setters; static variants allowed. Combine with async/generator/abstract as per TS.
- **Syntax**: Class element key may be `[<expr>]`; key expr is an ordinary expression.
- **Semantics**: Key expression evaluates once at class evaluation time, in class element order, like JS. Disallow `this`/`super`/`new.target` in key expressions per TS.
- **Codegen**: Emit `[expr]()` / `get [expr]()` / `set [expr]()` with modifiers; preserve async/generator/static.
- **Validation**: No special restrictions on the expression (any expr). No special sugar for well-known symbols; users can write `(. Symbol asyncDispose)` etc.
- **Tags (planned)**: Computed key flag/field on class element nodes; ensure tag whitelist accepts elements with computed keys.

## Hygiene / Metadata / Scope
- Keep AST shape so macros can see try/catch/finally blocks and computed key expressions.
- Scope-resolve should treat catch parameter as a binding scoped to its catch body; computed key expressions resolved normally.
- Macro traversal should include new statement tags and computed key expressions; no extra hygiene beyond normal cloning.
- Metadata: no special handling beyond allowing attach/read on class elements if existing features expect it.

## Testing
- Reject `(try ...)` with neither catch nor finally.
- Try/finally executes finally on return/throw; finally overrides prior completion when throwing.
- Catch binding visible only in catch body; single catch path exercised.
- Try+finally without catch works; try+catch without finally works.
- Computed keys: method/getter/setter/static; async/generator combos; key expression evaluates once; Symbol-based key example (e.g., asyncDispose).
- Computed key expressions forbid `this`/`super`/`new.target`.
