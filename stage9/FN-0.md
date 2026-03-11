# T2Lang `fn-o` — Named-Args Callable Design

## Overview

T2Lang introduces `fn-o` ("fn object") as a parallel callable form to `fn`. Where `fn` uses positional parameters, `fn-o` takes a single destructured object parameter. Both are first-class callables; they differ only in signature shape and compiled output.

The `-o` postfix convention is used consistently across all callable variants (`fn-o`, `async-fn-o`, `lambda-o`, etc.). This mirrors T2Lang's existing hyphenated keyword style (`async-fn`, `for-of`, `export-default`) and makes the positional/named-args distinction visually unambiguous at a glance — a typo between `fn` and `fn-o` is hard to miss in a way that `fn` vs `fno` was not.

The design principle is **transparent transpilation** — every `fn-o` form maps directly and faithfully to idiomatic TypeScript destructured-object syntax. T2Lang does not suppress, lint, or second-guess combinations that TypeScript itself permits.

---

## Motivation

TypeScript's named-arg pattern is ergonomic and common:

```typescript
function foo(
  { arg1, arg2 = 42 }: { arg1: string; arg2?: number }
): string { ... }
```

Expressing this in T2Lang's positional `fn` form is awkward. `fn-o` gives it a natural home with:

- Arbitrary argument order at the call site
- Optional args without positional bookkeeping
- Default values without overload signatures
- Compile-time duplicate key detection

---

## Syntax

### Declaration

```lisp
(fn-o foo
  ((arg1 : string)
   (arg2? : number (default 42))
   (rest rest : Record<string, unknown>))
  : string
  (body ...))
```

### Call site

```lisp
(foo { arg1: "bar" })
(foo { arg1: "bar", arg2: 99 })
```

Call sites use `braceObjectExpr` — already valid in Stage9, no grammar changes needed at the call site.

---

## Grammar

### New lexer tokens

One token per callable variant. All must be added to the `propKey` rule per the existing Stage9 maintenance note. Longer tokens are listed before shorter prefix matches per ANTLR convention.

```antlr
ASYNC_GENERATOR_FN_O : 'async-generator-fn-o' ;
ASYNC_LAMBDA_O       : 'async-lambda-o' ;
ASYNC_FN_O           : 'async-fn-o' ;
GENERATOR_FN_O       : 'generator-fn-o' ;
ABSTRACT_METHOD_O    : 'abstract-method-o' ;
CONSTRUCTOR_O        : 'constructor-o' ;
LAMBDA_O             : 'lambda-o' ;
METHOD_O             : 'method-o' ;
FN_O                 : 'fn-o' ;
```

### New parser rules

`fnoSignature` is shared across all `-o` callables, exactly as `fnSignature` is shared across all positional callables.

```antlr
fnO
    : LPAREN FN_O IDENTIFIER? fnoSignature statement* RPAREN
    ;

lambdaO
    : LPAREN LAMBDA_O fnoSignature statement* RPAREN
    ;

asyncFnO
    : LPAREN ASYNC_FN_O fnoSignature statement* RPAREN
    ;

asyncLambdaO
    : LPAREN ASYNC_LAMBDA_O fnoSignature statement* RPAREN
    ;

generatorFnO
    : LPAREN GENERATOR_FN_O fnoSignature statement* RPAREN
    ;

asyncGeneratorFnO
    : LPAREN ASYNC_GENERATOR_FN_O fnoSignature statement* RPAREN
    ;

methodO
    : LPAREN METHOD_O modifier* methodKey fnoSignature statement* RPAREN
    ;

abstractMethodO
    : LPAREN ABSTRACT_METHOD_O modifier* methodKey fnoSignature RPAREN
    ;

constructorO
    : LPAREN CONSTRUCTOR_O fnoSignature statement* RPAREN
    ;

fnoSignature
    : LPAREN (fnoParam* fnoRestParam?) RPAREN (COLON typeExpr)?
    ;

fnoParam
    : LPAREN IDENTIFIER OPTIONAL? (COLON typeExpr)? (LPAREN DEFAULT expression RPAREN)? RPAREN
    ;

fnoRestParam
    : LPAREN REST IDENTIFIER (COLON typeExpr)? RPAREN
    ;
```

`OPTIONAL` (`?`), `REST`, `DEFAULT`, `COLON`, `modifier`, and `methodKey` are all existing Stage9 rules and tokens — no further lexer additions required.

> **`DEFAULT` note:** `DEFAULT : 'default'` is already defined for `switchForm`. It can be safely reused here — `(default expr)` inside `fnoParam` is unambiguous by parser context and ANTLR will not misfire.

Each `-o` form must also be added to the relevant parent rules: `fnO` and `lambdaO` into `expression`; `methodO`, `abstractMethodO`, and `constructorO` into `classElement`.

---

## Parameter Cases

All four combinations of `?` and `(default ...)` are valid and emitted faithfully. T2Lang does not warn on redundancy — that is TypeScript's responsibility.

| T2Lang form | TypeScript output | Meaning |
|---|---|---|
| `(arg1 : string)` | `arg1: string` | Required |
| `(arg1? : string)` | `arg1?: string` | Optional, `undefined` if omitted |
| `(arg1 : string (default "x"))` | `arg1 = "x"` | Default if omitted, type inferred |
| `(arg1? : string (default "x"))` | `arg1?: string` with `= "x"` | Explicit optional + default (redundant but valid TS) |

Type annotations are fully optional on all forms. Without a type annotation the compiler emits no inline type object and lets TypeScript infer.

### Rest parameters

```lisp
(rest rest : Record<string, unknown>)
```

Compiles to `...rest` in the destructure pattern; the type annotation (if present) becomes an index signature on the type object. Rest must be last — enforced structurally by the grammar (`fnoRestParam?` follows `fnoParam*`), so no semantic pass check is needed.

---

## Compiled Output Examples

### Basic

```lisp
(fn-o greet
  ((name : string)
   (greeting? : string (default "Hello")))
  : string
  ...)
```

```typescript
function greet(
  { name, greeting = "Hello" }: { name: string; greeting?: string }
): string { ... }
```

### No type annotations

```lisp
(fn-o add
  ((a) (b (default 0)))
  ...)
```

```typescript
function add({ a, b = 0 }) { ... }
```

### With rest

```lisp
(fn-o forward
  ((target : string)
   (rest rest : Record<string, unknown>))
  ...)
```

```typescript
function forward(
  { target, ...rest }: { target: string; [key: string]: unknown }
): void { ... }
```

### Async

```lisp
(async-fn-o fetchUser
  ((id : string)
   (cache? : boolean (default true)))
  : Promise<User>
  ...)
```

```typescript
async function fetchUser(
  { id, cache = true }: { id: string; cache?: boolean }
): Promise<User> { ... }
```

---

## Codegen Notes

Two output locations per param — the **destructure pattern** and the **inline type object** — must be tracked independently:

- `?` contributes `arg?: Type` to the type object
- `(default expr)` contributes `arg = expr` to the destructure pattern
- When both are present, both outputs are emitted

When no params carry type annotations, the entire type object is omitted and only the destructure pattern is emitted.

---

## Compile-Time Duplicate Key Check

Duplicate arg keys are detected in the **semantic analysis pass**, before type checking, after parsing. Running before type checking ensures a malformed type object does not produce confusing downstream errors.

```typescript
function checkFnoDuplicates(node: FnoSignatureNode): void {
  const seen = new Map<string, SourceLocation>();
  for (const param of node.fnoParams) {
    const name = param.identifier.text;
    const loc  = param.identifier.location;
    if (seen.has(name)) {
      throw new CompileError(
        `Duplicate named arg key '${name}' — first defined at ${seen.get(name)}, redefined at ${loc}`,
        loc
      );
    }
    seen.set(name, loc);
  }
}
```

Target error format (Rust/TypeScript style, with source excerpt):

```
Error at foo.t2:12:5 — duplicate named arg key 'arg1'

  10 │ (arg1 : string)
     │  ^^^^ first defined here
  12 │ (arg1 : number)
     │  ^^^^ redefined here
```

---

## Callable Forms Summary

Every callable variant in the `fn` family has a corresponding `-o` variant. All follow identical `fnoSignature` rules.

| Positional | Named-args | Description |
|---|---|---|
| `fn` | `fn-o` | Named function |
| `lambda` | `lambda-o` | Anonymous lambda |
| `async-fn` | `async-fn-o` | Async named function |
| `async-lambda` | `async-lambda-o` | Async anonymous lambda |
| `generator-fn` | `generator-fn-o` | Generator function |
| `async-generator-fn` | `async-generator-fn-o` | Async generator function |
| `method` | `method-o` | Class method |
| `abstract-method` | `abstract-method-o` | Abstract class method |
| `constructor` | `constructor-o` | Class constructor |

`defmacro-o` is intentionally omitted from the MVP — deferred until there is a concrete use case for macros that introspect named-arg structure.

---

## `fn` vs `fn-o` — Decision Guide

| Use `fn` when… | Use `fn-o` when… |
|---|---|
| Argument order is meaningful (`map`, `filter`, math ops) | Arguments are configuration-like |
| 1–2 args, purpose obvious from position | 3+ args where names aid clarity |
| Performance-sensitive inner loops | Public API surface |
| Mirroring an existing positional JS/TS API | Defining new APIs with optional/defaulted params |

---

## Non-Goals

- T2Lang does not warn on `?` + `(default ...)` together — that is TypeScript's concern
- T2Lang does not infer optionality from the presence of a default — `?` and `(default ...)` are independent
- `fn-o` does not support mixed positional + named params — use `fn` with a trailing options object for that pattern

---

## Future Work

### Lint: single-param `fn-o` warning

A named-args function with exactly one required param and no `?` or `(default ...)` is a smell — it is just a worse `fn`. A lint warning such as *"`fn-o foo` has a single required param with no optional or default — did you mean `fn`?"* would catch the majority of real typos without being noisy in normal use.

### Require at least one `fn-o`-specific feature

More aggressive: make `?` or `(default ...)` required on at least one param for `fn-o` to be valid. A pure structural `fn-o` with no optional or default params would become a hard error. This eliminates the ambiguous case entirely but is an intentional language constraint — the signatures of `fn` and `fn-o` become non-overlapping by construction. Decide deliberately; do not add as a patch.
