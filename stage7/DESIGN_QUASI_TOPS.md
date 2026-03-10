# Design: quasi-quoting top-level forms

## Build constraint
All logic changes go in `.s6` source files. The `.ts` files are compiled outputs — never edit them directly. After changes, run `npm run build-compiler` in `stage7/` before running tests. `Stage7-tags.ts` is the exception — it is hand-authored `.ts` and may be edited directly.

## Scope
Extend `(quasi ...)` so macro bodies can quote and unquote these five top-level forms:

- `topLevelLet` → AST tag `let-decl`
- `topLevelConst` → AST tag `const-decl`
- `typeAlias` → AST tag `type-alias`
- `interfaceDef` → AST tag `interface-def`
- `classDef` → AST tag `class-def`

All five are already accepted by `expandTopLevel` (the first two explicitly; the rest via the `expandStmt` fallback), and all five are already in `TOP_LEVEL_DECL_TAGS` in `Stage7-macro-expand.s6`. No downstream phase (lower, scope-resolve, codegen) requires changes — they already process these nodes uniformly. The only pipeline stages that change are the grammar, the AST builder, and the macro expander (`evalQuasi`).

`defmacro` is intentionally excluded from this scope; quasi-quoting a defmacro form would require full recursive quasi support over the macro signature, which is out of scope.

---

## 1 — Grammar (`Stage7.g4`)

### Change `quasiquote`

```antlr
quasiquote
    : LPAREN (QUASI | QUOTE) quasiForm RPAREN
    ;

quasiForm
    : expression
    | topLevelLet
    | topLevelConst
    | typeAlias
    | interfaceDef
    | classDef
    ;
```

No ambiguity: `LET`, `CONST`, `TYPE`, `INTERFACE`, `CLASS` are all dedicated tokens; none of them can appear as the head of `expression → call → expression expression*`, so ANTLR will always pick the correct alternative.

`unquote` and `unquoteSplicing` inside a quoted top-level form still appear only in expression positions (field initializers, method/constructor bodies, computed keys). No grammar change is needed for `unquote` — the existing `unquote : LPAREN UNQUOTE expression RPAREN` is correct.

---

## 2 — AST builder (`Stage7-ast.s6`)

### Change `astQuasiquote`

Currently calls `astExpression(ctx.expression())`. Change it to dispatch on which `quasiForm` alternative was matched:

```scheme
(const astQuasiquote
  (lambda ((ctx))
    (let* ((formCtx (. (ctx quasiForm)))
           (expr
             (if ((. formCtx topLevelLet)
               (astTopLevelLet ((. formCtx topLevelLet)))
               (if ((. formCtx topLevelConst))
                 (astTopLevelConst ((. formCtx topLevelConst)))
                 (if ((. formCtx typeAlias))
                   (astTypeAlias ((. formCtx typeAlias)))
                   (if ((. formCtx interfaceDef))
                     (astInterfaceDef ((. formCtx interfaceDef)))
                     (if ((. formCtx classDef))
                       (astClassDef ((. formCtx classDef)))
                       (astExpression ((. formCtx expression))))))))))
      (return (object
        (id (registerSpan (nextNodeId) ctx))
        (text ((. ctx getText)))
        (tag 'quasi')
        (expr expr))))))
```

All five builder functions (`astTopLevelLet`, `astTopLevelConst`, `astTypeAlias`, `astInterfaceDef`, `astClassDef`) already exist — no new builders are needed.

The returned `quasi` node's `expr` field now holds whichever AST node was produced. `evalQuasi` (in the expander) already receives `node.expr` and dispatches on its tag — adding the five new tags there is the only other required change.

---

## 3 — Macro expander: `evalQuasi` (`Stage7-macro-expand.s6`)

`evalQuasi` already handles expression-shaped nodes (`call`, `array`, `object`, `let*`, `const*`, `if`, `while`, `block`, `assign`, `return`, `throw`, `expr-stmt`, lambda variants, …). Add five new cases for the top-level form tags.

### `let-decl` and `const-decl`

These two are structurally identical to each other: a `name` (string) and an `init` (expression). Only `init` can contain unquotes.

```scheme
(if (|| (=== (. node tag) 'let-decl') (=== (. node tag) 'const-decl'))
  (return (object
    (tag (. node tag))
    (text (. node text))
    (name (. node name))
    (init (evalQuasi (. node init) bindings env depth))
    (meta (. node meta)))))
```

### `type-alias`

Type expressions are opaque at macro time — they cannot contain `unquote` because `unquote` only appears in expression positions, and type expressions are not expressions. Return the node unchanged.

```scheme
(if (=== (. node tag) 'type-alias')
  (return (object
    (tag 'type-alias')
    (text (. node text))
    (name (. node name))
    (typeParams (. node typeParams))
    (type (. node type)))))
```

### `interface-def`

Same reasoning as `type-alias` — the body is a type object, not an expression tree. Return unchanged.

```scheme
(if (=== (. node tag) 'interface-def')
  (return (object
    (tag 'interface-def')
    (text (. node text))
    (name (. node name))
    (typeParams (. node typeParams))
    (extends (. node extends))
    (body (. node body)))))
```

### `class-def`

The class body contains class elements whose expression-bearing sub-nodes (field initializers, constructor/method bodies, computed key expressions) can contain unquotes. Recurse into those; treat type annotations as opaque.

Add a `quasiClassBody` helper (similar to `quasiArgs`) that maps over class elements:

```scheme
(const quasiClassBody
  (lambda ((elements) (bindings) (env) (depth))
    (return ((. elements map)
      (lambda ((el))
        (if (=== (. el tag) 'field-def')
          (return (object
            (tag 'field-def') (text (. el text))
            (modifiers (. el modifiers)) (name (. el name))
            (typeAnnotation (. el typeAnnotation))
            (init (if (. el init) (evalQuasi (. el init) bindings env depth) undefined)))))
        (if (|| (=== (. el tag) 'constructor-def')
                (=== (. el tag) 'class-method-def')
                (=== (. el tag) 'getter-def')
                (=== (. el tag) 'setter-def'))
          (return (object
            (tag (. el tag)) (text (. el text))
            (modifiers (. el modifiers))
            (key (if (. el computed) (evalQuasi (. el key) bindings env depth) (. el key)))
            (computed (. el computed))
            (params (. el params)) (returnType (. el returnType))
            (body (quasiArgs (. el body) bindings env depth)))))
        (if (=== (. el tag) 'abstract-method-def')
          (return el))
        (return el))))))
```

Then add the `class-def` case in `evalQuasi`:

```scheme
(if (=== (. node tag) 'class-def')
  (return (object
    (tag 'class-def')
    (text (. node text))
    (modifiers (. node modifiers))
    (name (. node name))
    (typeParams (. node typeParams))
    (extendsType (. node extendsType))
    (implementsTypes (. node implementsTypes))
    (body (object
      (tag 'class-body')
      (text (. (. node body) text))
      (elements (quasiClassBody (. (. node body) elements) bindings env depth)))))))
```

---

## 4 — `expandTopLevel` — no change required

`expandTopLevel` already handles all five tags:

| tag | handling |
|---|---|
| `let-decl` | explicit: expands `init` |
| `const-decl` | explicit: expands `init` |
| `type-alias` | via `expandStmt` fallback |
| `interface-def` | via `expandStmt` fallback |
| `class-def` | via `expandStmt` fallback |

When the worklist splices a macro-emitted `let-decl` (for example), it calls `registerTopLevelNode` then re-visits via `expandTopLevel` — the existing path handles it correctly.

## 5 — `TOP_LEVEL_DECL_TAGS` — no change required

All five tags are already in the set (confirmed in `Stage7-macro-expand.s6`):
```
'let-decl' 'const-decl' 'type-alias' 'interface-def' 'class-def'
```
`validateTopLevelNode` will accept them without modification.

## 6 — `Stage7-tags.ts` — verify, probably no change

All five tags should already be registered. Confirm they appear in the tag whitelist. If any are missing, add them.

---

## 7 — Tests

Remove `it.skip` from the four tests in `tests/macroIntegration.test.ts`:

- `macro can splice multiple let/const/class forms` — success path: let + const + class
- `macro-emitted defmacro registers for later calls` — NOTE: `defmacro` is excluded from the grammar extension. This test will need to be rewritten using a different mechanism for the inner defmacro, or deferred.
- `array results in expression position emit macro error` — error path
- `macro emitting import is rejected` — error path (import is not in `quasiForm`)

Add additional tests in `tests/macroIntegration.test.ts`:

- `(quasi (type Alias string))` → emits a type alias
- `(quasi (interface I (typeObject ...)))` → emits an interface
- `(quasi (class C ...))` with unquoted field initializer and method body
- `(quasi (let (x) (unquote val)))` → name is fixed, init is substituted

---

## 8 — Implementation order

1. **`Stage7.g4`**: add `quasiForm` rule and update `quasiquote`. No other grammar files change.
2. **`Stage7-ast.s6`**: update `astQuasiquote` to dispatch on `quasiForm`. Build.
3. **`Stage7-macro-expand.s6`**: add `quasiClassBody` helper; add five new cases to `evalQuasi`. Build.
4. **`tests/macroIntegration.test.ts`**: unskip passing tests, fix/skip the defmacro-emitting test.
5. Run `npx vitest run` — all previously-skipped tests should pass (except the defmacro one if deferred).
