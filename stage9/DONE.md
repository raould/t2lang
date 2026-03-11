please make a plan (no code edits yet) for stage9 to support:
(1) "#foo" private class field naming convention using leading "#", passed through directly.
(2) class constructors supporting field shorthand; With the constructor shorthand, you can simplify the code by declaring and initializing the properties directly in the constructor parameters, with access modifier support.
(3) computed object keys something like this in t2 `{[foo]: 42}` in literals and `(object ([foo] 42))` in sexpr.

---

## (1) `#foo` private class field naming

### Goal
Allow `(field (#count : number) 0)` in a class body to declare a native JS private
field, emitting `#count: number = 0;`. Also allow `(. this #count)` in expressions
(already works via dot-access — `isValidId` already accepts `#` prefix).

### Current state
- `isValidId` already accepts `#foo` — dot/bracket access already works in codegen.
- `isValidBindingId` already *rejects* `#foo` — good, private names can't be bound with `let`/`const`.
- `fieldDef` grammar only accepts `IDENTIFIER` (no `#` prefix).
- `astFieldDef` reads the field name with `.getText()` on the `IDENTIFIER` token.
- `emitFieldDef` emits the name as-is, no special path needed once it arrives.
- `identifierSafety.test.ts` Phase 6 already tests the access side (`(. this #count)`).

### Plan

**Stage9.g4**
- Add a new lexer token `PRIVATE_NAME : '#' IDENTIFIER_CHARS ;` (where `IDENTIFIER_CHARS`
  is the same character class used by `IDENTIFIER`, minus leading digit).
  Place it *before* `IDENTIFIER` so `#foo` is tokenised as `PRIVATE_NAME`, not a parse error.
- Update `fieldDef` to accept `PRIVATE_NAME` in the name position:
  ```
  fieldDef
      : LPAREN FIELD modifier* LPAREN (IDENTIFIER | PRIVATE_NAME) (COLON typeExpr)? RPAREN expression? RPAREN
      ;
  ```
- Update `propKey` similarly so `(. this #count)` in member-access continues to work
  (it already works via dot-access; verify no regression).

**Stage9-ast.s8 (`astFieldDef`)**
- When extracting the field name, check whether the name child is `PRIVATE_NAME` or
  `IDENTIFIER` and take `.getText()` in both cases — the `#` prefix is already part of
  the token text, so no transformation is needed.
- The returned AST node (`field-def`) is unchanged; the name string simply starts with `#`.

**Stage9-lower.s8**
- No changes required — `lowerFieldDef` passes the name through unchanged.

**Stage9-codegen.s8**
- `emitFieldDef` already emits `name` as-is, so no code change needed.
- Verify `checkId` is NOT called on field names (private names must not pass through
  the normal identifier-safety check since `#foo` deliberately bypasses `isValidBindingId`).
  Currently `emitFieldDef` does not call `checkId` — confirm this is still true after
  the grammar change.

**Tests**
- Add a test in `tests/class.test.ts` (or a new `tests/privateFields.test.ts`) that:
  - Declares `(field (#count : number) 0)` and verifies the emitted TS contains `#count`.
  - Writes to `(. this #count)` and reads it back, asserts the value at runtime.
  - Verifies that `(const #bad 1)` is still rejected with an error (binding guard
    already in place via `isValidBindingId`).

### Effort estimate
Small. Grammar: ~5 lines. AST: 1 conditional. Codegen: 0 lines. Tests: ~20 lines.

---

## (2) Constructor parameter field shorthand

### Goal
Allow access modifiers on constructor parameters to both declare a class field and
assign it from the constructor argument in one step — the TypeScript "parameter
properties" feature.

**TypeScript output:**
```ts
class Point {
  constructor(public x: number, private y: number) {}
}
```

**t2 surface syntax (proposed):**
```
(class Point
  (class-body
    (constructor ((public x : number) (private y : number))
      ...body...)))
```
A typed constructor parameter prefixed with an access modifier (`public`, `private`,
`protected`, or `readonly`, or combinations) becomes a parameter property.

### Current state
- `fnSignatureTyped` / `typedParam` handle plain `(name : type)` parameters.
- No modifier prefix is currently accepted in `typedParam`.
- `emitConstructorDef` emits `constructor([params]) { body }` where each param is
  emitted by `emitTypedParam` without any modifier prefix.

### Plan

**Stage9.g4**
- Add a new rule `constructorParam` that wraps `typedParam` with optional leading
  modifiers:
  ```
  constructorParam
      : LPAREN modifier* IDENTIFIER (COLON typeExpr)? (ASSIGN expression)? RPAREN
      ;
  ```
  Reuse the existing `modifier` token set; only `public`, `private`, `protected`, and
  `readonly` are meaningful here (grammar need not restrict further — codegen can warn).
- Change `constructorDef` to use `constructorParam*` instead of `typedParam*`:
  ```
  constructorDef
      : LPAREN CONSTRUCTOR LPAREN constructorParam* RPAREN (COLON typeExpr)? statement* RPAREN
      ;
  ```
  (The `fnSignatureTyped` wrapper may need splitting so the constructor can share the
  return-type optional without sharing the param rule.)

**Stage9-ast.s8**
- Add `astConstructorParam` that reads `modifiers` + the name/type/default from each
  `constructorParam` context.  Returns a new AST node shape:
  ```
  { tag: 'constructor-param', modifiers: string[], name: string,
    typeAnnotation: ..., defaultValue: ... }
  ```
- Update `astConstructorDef` to use `astConstructorParam` for each parameter.
- `constructorDef` AST node gains a `params` field of `constructor-param` nodes instead
  of plain `typed-param` nodes.

**Stage9-lower.s8**
- Add `lowerConstructorParam` that passes through `modifiers`, `name`, `typeAnnotation`,
  and `defaultValue`.
- Update `lowerConstructorDef` to call `lowerConstructorParam` per parameter.

**Stage9-codegen.s8**
- Add `emitConstructorParam(param)`:
  - If `param.modifiers` is non-empty, prefix with `modifiers.join(' ') + ' '`.
  - Then emit `name`, optional `: type`, optional `= default` — same as a regular
    typed param.
- Update `emitConstructorDef` to call `emitConstructorParam` instead of `emitTypedParam`.
- When emitting a constructor parameter with modifiers, TypeScript handles field
  declaration and assignment automatically — no extra field or assignment statement is
  emitted by the compiler.

**Backwards compatibility**
- A constructor parameter without any modifier emits exactly as before; existing tests
  continue to pass.

**Tests**
- Add `tests/constructorShorthand.test.ts`:
  - Class with `(public x : number)` and `(private y : number)` constructor params;
    verify `this.x` and `this.y` are accessible from a method.
  - Class with `readonly` param; verify re-assignment is rejected at TypeScript level
    (compile-time error test using the `callCompiler` helper).
  - Class with `(public x : number)` alongside a regular `(z : number)` param; verify
    mixed usage works.

### Effort estimate
Medium. Grammar: ~10 lines. AST: ~20 lines. Lower: ~10 lines. Codegen: ~10 lines. Tests: ~40 lines.

---

## (3) Computed object keys

### Goal
Support runtime-computed keys in object literals:

| t2 sexpr | Emitted TypeScript |
|---|---|
| `(object ([foo] 42))` | `({ [foo]: 42 })` |
| `(object ([Symbol.iterator] (lambda () ...)))` | `({ [Symbol.iterator]() { ... } })` |

### Current state
- `objectField` only accepts `propKey` (static string/identifier/keyword), not `[expr]`.
- Class methods already support computed keys via `methodKey : ... LBRACK expression RBRACK`.
- `astObjectField` returns `{ key: string, isShorthand, isMethod, value, ... }` — the
  `key` field is always a string; there is no `computed` boolean or `keyExpr` AST node.
- `emitObjectField` emits `key: value` with string key only.

### Plan

**Stage9.g4**
- Add a `computedKey` rule (mirrors the one already used for class `methodKey`):
  ```
  computedKey : LBRACK expression RBRACK ;
  ```
- Extend `objectField` with a computed variant:
  ```
  objectField
      : LPAREN propKey expression RPAREN          // static key + value
      | LPAREN propKey methodDef RPAREN           // static key + method
      | LPAREN IDENTIFIER RPAREN                  // shorthand { x }
      | LPAREN computedKey expression RPAREN      // [expr]: value
      | LPAREN computedKey methodDef RPAREN       // [expr]() { body }
      ;
  ```

**Stage9-ast.s8 (`astObjectField`)**
- Detect whether the field uses `computedKey` or `propKey`.
- Add `computed: boolean` and `keyExpr: exprNode | undefined` to the returned object-field
  AST node:
  ```
  {
    key: string | undefined,   // present when !computed
    computed: boolean,
    keyExpr: exprNode | undefined,  // present when computed
    isShorthand: boolean,
    isMethod: boolean,
    ...
  }
  ```
- When `computed` is true, call `astExpression` on the expression inside `[...]` and
  store in `keyExpr`; `key` is `undefined`.

**Stage9-lower.s8**
- Update `lowerObjectField` to lower `keyExpr` when `computed` is true.

**Stage9-codegen.s8 (`emitObjectField`)**
- When `field.computed` is true, emit `[${emitExpr(field.keyExpr)}]: ${emitExpr(field.value)}`
  (or the method form `[expr](params) { body }`).
- When `field.computed` is false, existing path is unchanged.
- The `emitObjectKey` helper (used for the non-computed case) stays as-is.

**Tests**
- Add or extend `tests/objectExpr.test.ts`:
  - `(object ([key] 42))` where `key` is a `const` string variable; assert value via
    bracket access.
  - `(object (["literal-key"] 99))` with a string literal as the computed key
    (degenerate but legal).
  - `(object ([Symbol.iterator] (lambda () ...)))` — Symbol-keyed method; call via
    `[Symbol.iterator]()` and assert.
  - Two computed keys in the same object literal.
  - Mix of static and computed keys in one object.

### Effort estimate
Small–medium. Grammar: ~6 lines. AST: ~15 lines. Lower: ~5 lines. Codegen: ~10 lines. Tests: ~30 lines.
