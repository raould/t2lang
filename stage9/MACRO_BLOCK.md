# Macro Block Call Syntax — Stage9 Design

This document describes the design for macro calls that accept statement bodies.

---

## The Problem

### Parser runs before macro expansion

Macro expansion in t2lang is a post-parse pass. `expandAll()` walks an already-built AST and replaces macro-call nodes with their expansions. If the parser rejects the file, no AST is produced and expansion never runs.

### Macros are called like functions — but functions take expressions

The `call` grammar rule requires all arguments to be `expression`s:

```antlr
call : LPAREN expression typeArgs? expression* RPAREN ;
```

The `expression` rule covers literals, identifiers, lambdas, calls, etc. It does **not** include statement forms:

```antlr
// statement forms — NOT in expression:
letStar | letStmt | constStar | constStmt
| ifForm | whileForm | forForm | tryForm | switchForm | ...
```

So a macro call like:

```lisp
(m/task registry (_unused)
  (let (names : StringMap) (new Map))   ;; ← statement, not an expression
  (while true (let ...)))               ;; ← statement, not an expression
```

fails at parse time — `(let ...` is not a valid `expression`. The error appears before any macro can run.

### Why `generator-fn` bodies work but call arguments don't

`generator-fn` (and `fn`, `lambda`, `while`, etc.) type their bodies as `statement*` directly in the grammar:

```antlr
generatorFn : LPAREN GENERATOR_FN fnSignature statement* RPAREN ;
```

Call arguments have no such latitude.

---

## Solution: Two Sigil Forms

Two new call-like forms are added, distinguished by a sigil that separates "header arguments" (expressions) from a "body" (statements):

| Sigil | Form | Valid in | Codegen |
|---|---|---|---|
| `=>` | `macroExprCall` | expression position | IIFE: `(() => { body })()` |
| `=&` | `macroBodyCall` | statement position only | inline statements |

The sigil choice mirrors TypeScript's use of `=>` for anonymous callables. `=>` produces an expression (IIFE), `=&` produces statements inline.

### Syntax

```lisp
;; Expression form (=>) — usable as an expression, e.g. as a const initializer
(const result (m/with-resource handle =>
  (let (buf : Buffer) (allocate 1024))
  (return (process buf))))

;; Statement form (=&) — usable only as a statement
(m/task registry (_unused) =&
  (let (names : StringMap) (new Map))
  (while true
    (let (msg : Message) (await (recv)))))
```

### Header arguments

Zero or more `expression`s appear between the macro name and the sigil. These are fully parsed as normal expressions and passed to the macro as already-resolved AST nodes.

### Body

Zero or more `statement`s appear between the sigil and the closing `)`. These are parsed with full statement grammar — `let`, `while`, `if`, `for`, `return`, `try`, etc. are all valid.

---

## Tokens

### `FAT_ARROW : '=>'`

`=>` is two characters: `EQUALS` (`=`, 1 char) + `GT` (`>`, 1 char). The 2-char token wins over both single-char tokens by maximal munch. No conflict with `GTE_OP` (`>=`) — that is `>` then `=`, the reverse order.

Both `=` and `>` are already excluded from `IDENTIFIER` (see current exclusion set: `?=+*%<>!&|^`). Adding `FAT_ARROW` does **not** change what is a valid identifier character.

### `STMT_ARROW : '=&'`

`=&` is two characters: `EQUALS` (`=`, 1 char) + `AMP` (`&`, 1 char). Same maximal-munch logic. No conflict with `AMPAMP` (`&&`) — that is `&` then `&`.

Both `=` and `&` are already excluded from `IDENTIFIER`. No IDENTIFIER rule change needed.

### opSymbol / propKey

Neither `FAT_ARROW` nor `STMT_ARROW` should be added to `opSymbol` or `propKey`. They are structural sigils, not operators — no user will write `(=> a b)` or `(=& a b)` as an s-expression operator call. The individual characters (`=`, `>`, `&`) are already in `opSymbol`/`propKey` from the Phase 0 infix work.

### Placement in grammar

Add both tokens in the operator token block, immediately after `GTE_OP` and before `EQUALS`, with a comment:

```antlr
// Macro block call sigils — 2-char tokens; maximal munch beats EQUALS + GT/AMP
FAT_ARROW   : '=>' ;
STMT_ARROW  : '=&' ;
```

---

## Grammar Rules

```antlr
macroExprCall
    : LPAREN IDENTIFIER expression* FAT_ARROW statement* RPAREN
    ;

macroBodyCall
    : LPAREN IDENTIFIER expression* STMT_ARROW statement* RPAREN
    ;
```

Add `macroExprCall` to `expression` (before `call`, since both begin with `LPAREN IDENTIFIER`):

```antlr
expression
    : ...
    | macroExprCall
    | call
    ;
```

Add `macroBodyCall` to `statement` (alongside other statement forms):

```antlr
statement
    : ...
    | macroBodyCall
    | expression
    ;
```

`macroBodyCall` is **not** added to `expression`. This is how the parser enforces that `=&` cannot appear in expression position — it is structurally absent from the `expression` rule.

---

## AST Nodes

### `MacroExprCallNode` — tag `macro-expr-call`

```
tag:        'macro-expr-call'
fn:         IdentifierNode       // the macro name (e.g. "m/task")
headerArgs: Node[]               // expression arguments before =>
body:       StatementNode[]      // statement arguments after =>
id:         SpanId
```

### `MacroBodyCallNode` — tag `macro-body-call`

```
tag:        'macro-body-call'
fn:         IdentifierNode       // the macro name
headerArgs: Node[]               // expression arguments before =&
body:       StatementNode[]      // statement arguments after =&
id:         SpanId
```

Both tags must be added to `Stage9-tags.ts`.

### AST builders

`astMacroExprCall(ctx)` and `astMacroBodyCall(ctx)` follow the same pattern:

```lisp
(const astMacroExprCall
  (lambda ((ctx))
    (let* ((id (registerSpan (nextNodeId) ctx))
           (fn (makeIdentifierNode ((. ((. ctx IDENTIFIER)) getText)) ctx))
           (headerArgs ((. ((. ctx expression)) map) astExpression))
           (body ((. ((. ctx statement)) map) astStatement)))
      (return (object (id id) (tag 'macro-expr-call') (fn fn) (headerArgs headerArgs) (body body))))))
```

Add calls from `astExpression` (for `macroExprCall`) and `astStatement` (for `macroBodyCall`):

```lisp
;; in astExpression:
(if ((. ctx macroExprCall))
  (return (astMacroExprCall ((. ctx macroExprCall)))))

;; in astStatement:
(if ((. ctx macroBodyCall))
  (return (astMacroBodyCall ((. ctx macroBodyCall)))))
```

---

## Pipeline Behavior

### Macro Expand

Both node types are macro calls. `expandExpr` handles `macro-expr-call`; `expandStmt` handles `macro-body-call`. The expansion procedure:

1. Resolve the macro function by `fn.name` from the macro environment
2. Expand each `headerArg` expression first (they are evaluated before being passed)
3. Pass to the macro: `[...expandedHeaderArgs, bodyQuasi]` where `bodyQuasi` is the body statements wrapped as a quasi s-form node — the macro can splice the body into a template using `~@`
4. The macro returns:
   - For `macro-expr-call`: an expression node — replaces the call in expression position
   - For `macro-body-call`: a statement node or array of statement nodes — spliced in as statements

If the identifier is not a registered macro, fall through to treating it as a regular call and emit a compile error at lowering (same behaviour as current unresolved macros).

### Scope Resolve

Both node types require two new branches in `resolveExpr` / `resolveStmt`:

- `macro-expr-call`: resolve each `headerArg`; `body` is already lowered as-is (the macro's expansion handles body scoping)
- `macro-body-call`: same

`fn.name` is looked up against the macro environment, not the scope chain — same as regular macro calls.

### Lower

`macro-expr-call` and `macro-body-call` should not reach the lower stage — they must be fully expanded by `expandAll` beforehand. If either tag appears in `lowerExpr` or `lowerStmt`, it is an internal compiler error:

```lisp
;; in lowerExpr:
(if (=== (. node tag) 'macro-expr-call')
  (throw (new Error (+ 'macro-expr-call was not expanded: ' (formatSpan (. node id))))))
```

Same guard in `lowerStmt` for `macro-body-call`.

### Codegen

Neither node type should reach codegen for the same reason. Guards optional but defensive:

```lisp
(if (=== (. expr tag) 'macro-expr-call')
  (throw (new Error 'macro-expr-call reached codegen unexpanded')))
```

---

## Error Detection

### `=&` in expression position — automatic parse error

Because `macroBodyCall` is only in the `statement` rule and never in `expression`, writing:

```lisp
(const x (m/task registry =& (let ...)))
```

is a parse error. The parser expects an `expression` after `(const x`, tries to match `macroBodyCall` — which it cannot, since `macroBodyCall` is not an `expression` alternative — and reports a parse error. No extra code required.

### `=>` in statement position — lowering error

Because `expression` is a valid `statement` alternative, `macroExprCall` (which is an `expression`) is grammatically valid as a statement. The grammar cannot block this. Instead, `lowerStmt` detects the misuse:

```lisp
;; in lowerStmt:
(if (=== (. node tag) 'macro-expr-call')
  (throw (new Error
    (+ 'macro-expr-call (=>) used in statement position — did you mean =& ? at '
       (formatSpan (. node id))))))
```

This check runs after expansion, so it fires if and only if a `macro-expr-call` survived expansion unexpanded in a statement slot. If the macro expands correctly the node is gone before lowering sees it.

### Summary

| Misuse | Detectable? | When | How |
|---|---|---|---|
| `=&` in expression position | Yes | Parse time | Grammar: absent from `expression` rule |
| `=>` in statement position | Yes | Lower time | `lowerStmt`: error on `macro-expr-call` tag |

---

## Calling Convention: Body as Quasi Form

The `body` statements are passed to the macro as a **quasi s-form node** — effectively implicitly quoted. The macro author treats the body as a splice target:

```lisp
;; Macro definition:
(defmacro m/task ((registry) (sig))
  (quasi
    (begin
      (let (task : Task) (makeTask ~registry ~sig))
      ~@body           ;; ← splices the caller's body statements
      (cleanup task))))
```

The implicit quasi-wrapping of body means:
- Body statements are not evaluated at macro call time (they are data)
- The macro splices them at the correct position in its template
- `return`/`break`/`continue` inside the body work relative to the expansion site, not a wrapper

This calling convention applies to both `macro-expr-call` and `macro-body-call`. The difference is what the macro returns:
- `macro-expr-call` macro must return an expression node
- `macro-body-call` macro must return a statement or list of statements

---

## Examples

```lisp
;; Statement form — task with body
(m/task registry (name age) =&
  (let (result : Result) (await (fetch name)))
  (set! age (+ age 1))
  (return result))

;; Expression form — resource scope that returns a value
(const buf (m/with-resource handle =>
  (let (raw : Buffer) (readAll handle))
  (return (decode raw))))

;; Zero header args
(m/retry =&
  (let (resp : Response) (await (fetch url)))
  (return (. resp json)))

;; Nested — expression form inside statement form
(m/task registry () =&
  (const x (m/measure timer =>
    (return (heavyComputation))))
  (log x))
```

---

## Implementation Phases

### Phase 0 — Grammar

Single `.g4` edit (same discipline as infix Phase 0 — do not build mid-edit):

1. Add `FAT_ARROW : '=>'` and `STMT_ARROW : '=&'` in the operator token block, after `GTE_OP`, before `EQUALS`
2. Add `macroExprCall` and `macroBodyCall` parser rules
3. Add `macroExprCall` to `expression` (before `call`)
4. Add `macroBodyCall` to `statement` (alongside other statement forms)

Then:
- Run `npm run build-grammar`
- Run full test suite — Phase 0 is complete only when the suite is clean

### Phase 1 — AST

1. Add `'macro-expr-call'` and `'macro-body-call'` to `Stage9-tags.ts`
2. Implement `astMacroExprCall` and `astMacroBodyCall` in `Stage9-ast.s8`
3. Add dispatch in `astExpression` and `astStatement`

Verification: `(program (const x (identity => (return 42))))` should produce an AST node with `tag: 'macro-expr-call'`, `fn.name: 'identity'`, `body` containing a `return` node.

### Phase 2 — Macro Expand

1. Add `macro-expr-call` branch to `expandExpr` — expand header args, pass body as quasi, call macro, return expansion
2. Add `macro-body-call` branch to `expandStmt` — same; macro returns statement(s)
3. Add "not a macro" fallthrough error for both forms

### Phase 3 — Scope Resolve

1. Add `macro-expr-call` branch to `resolveExpr` — resolve header args
2. Add `macro-body-call` branch to `resolveStmt` — resolve header args

### Phase 4 — Lower and Codegen guards

1. Add `macro-expr-call` guard to `lowerStmt` (the misuse error)
2. Add unexpanded-node guards to `lowerExpr`, `lowerStmt`, `emitExpr`

### Phase 5 — Tests

- Test `=&` in expression position → parse error
- Test `=>` in statement position → lowering error
- Test a trivial macro using `=&`: body statements appear in expansion
- Test a trivial macro using `=>`: result is an expression
- Run full test suite
