# t2lang Type System — Design v2

## Goals

t2lang provides an S-expression syntax that compiles to TypeScript. The type system:

1. Represents TypeScript's type language as S-expressions
2. Constrains where type constructs may appear via grammar
3. Lowers and emits type annotations as literal TypeScript
4. Performs **no type inference or validation** — that's `tsc`'s job

---

## Open Design Questions

> These are carried forward from the v1 review. Each section below proposes a resolution, but alternatives are noted where the choice isn't obvious.

### Q1: Explicit `app` keyword vs. positional type application

**Option A — Explicit keyword:**
```
(app List number)
```

**Option B — Positional (head = constructor):**
```
(List number)
```

**Proposed resolution:** Use **positional** form, but reserve all type-level keywords. Any parenthesized type expression whose head is not a reserved keyword is a type application. Reserved keywords: `union`, `intersect`, `array`, `tuple`, `fn`, `obj`, `keyof`, `typeof`, `infer`, `index`, `mapped`, `cond`, `lit`, `readonly`, `rest`.

**Tradeoff:** Positional is more concise and idiomatic for S-expressions. The cost is a fixed reserved-word list that must be checked before adding new constructs.

---

### Q2: Angle brackets vs. S-expression-native delimiters for type parameters

**Option A — Angle brackets:**
```
(lambda <T U> ((x : T)) x)
(call f <number> 10)
```

**Option B — S-expression-native:**
```
(lambda (type-params T U) ((x : T)) x)
(call f (type-args number) 10)
```

**Proposed resolution:** Use **S-expression-native** forms. Angle brackets create lexer ambiguity with comparison operators and break the S-expression philosophy. `type-params` and `type-args` are explicit, unambiguous, and compose cleanly.

---

## Type Expression Grammar

```
typeExpr
    : typeIdentifier
    | typeApplication
    | typeUnion
    | typeIntersection
    | typeArray
    | typeTuple
    | typeFunction
    | typeObject
    | typeLiteral
    | typeKeyof
    | typeTypeof
    | typeIndexAccess
    | typeConditional
    | typeMapped
    | typeInfer
    | typeTemplateLiteral
    ;
```

### Primitives and identifiers

```
typeIdentifier
    : IDENTIFIER
    ;
```

Covers `number`, `string`, `boolean`, `void`, `never`, `unknown`, `any`, `undefined`, `null`, and all user-defined type names. These are not special-cased in the grammar — they're all identifiers. `tsc` validates whether they resolve.

### Type application (generics)

```
typeApplication
    : LPAREN typeExpr typeExpr+ RPAREN
    ;
```

Head position is the constructor, tail is arguments. The head must not be a reserved keyword (enforced at parse time or during lowering).

```
;; List<number>
(List number)

;; Map<string, number>
(Map string number)

;; Promise<Result<E>>
(Promise (Result E))
```

### Union / intersection

```
typeUnion
    : LPAREN 'union' typeExpr typeExpr+ RPAREN
    ;

typeIntersection
    : LPAREN 'intersect' typeExpr typeExpr+ RPAREN
    ;
```

```
;; string | number | boolean
(union string number boolean)

;; A & B
(intersect A B)
```

Minimum two members enforced by grammar (`typeExpr typeExpr+`).

### Array

```
typeArray
    : LPAREN 'array' typeExpr RPAREN
    ;
```

```
;; number[]
(array number)

;; Map<string, number>[]
(array (Map string number))
```

### Tuple

```
typeTuple
    : LPAREN 'tuple' typeTupleElement+ RPAREN
    ;

typeTupleElement
    : typeExpr
    | LPAREN 'rest' typeExpr RPAREN
    | LPAREN IDENTIFIER typeExpr RPAREN
    ;
```

```
;; [number, string]
(tuple number string)

;; [string, ...number[]]
(tuple string (rest (array number)))

;; [name: string, age: number]
(tuple (name string) (age number))
```

### Function types

```
typeFunction
    : LPAREN 'fn' typeParams? LPAREN typeFnParam* RPAREN typeExpr RPAREN
    ;

typeFnParam
    : LPAREN IDENTIFIER OPTIONAL? typeExpr RPAREN
    ;
```

`OPTIONAL` is the `?` token, used for optional parameters.

```
;; (x: number, y: string) => boolean
(fn ((x number) (y string)) boolean)

;; <T>(items: T[]) => T
(fn (type-params T) ((items (array T))) T)

;; (name: string, age?: number) => void
(fn ((name string) (age ? number)) void)
```

### Object types

```
typeObject
    : LPAREN 'obj' typeProp* RPAREN
    ;

typeProp
    : LPAREN propModifier* IDENTIFIER OPTIONAL? typeExpr RPAREN
    ;

propModifier
    : 'readonly'
    ;
```

```
;; { x: number; y: string }
(obj (x number) (y string))

;; { readonly id: string; name?: string }
(obj (readonly id string) (name ? string))
```

### Literal types

```
typeLiteral
    : LPAREN 'lit' (STRING | NUMBER | 'true' | 'false') RPAREN
    ;
```

```
;; "foo"
(lit "foo")

;; 42
(lit 42)

;; true
(lit true)
```

**Note:** The `lit` keyword is required to distinguish `(lit "foo")` (the literal type `"foo"`) from a string value in expression context. This avoids ambiguity in the grammar.

### `keyof`

```
typeKeyof
    : LPAREN 'keyof' typeExpr RPAREN
    ;
```

```
;; keyof T
(keyof T)

;; keyof typeof obj
(keyof (typeof obj))
```

### `typeof`

```
typeTypeof
    : LPAREN 'typeof' IDENTIFIER RPAREN
    ;
```

```
;; typeof myVar
(typeof myVar)
```

`typeof` takes an expression-level identifier, not a type expression. This is a deliberate restriction matching TypeScript's semantics.

### Indexed access types

```
typeIndexAccess
    : LPAREN 'index' typeExpr typeExpr RPAREN
    ;
```

```
;; T[K]
(index T K)

;; T["key"]
(index T (lit "key"))

;; Parameters<typeof fn>[0]
(index (Parameters (typeof fn)) (lit 0))
```

### Conditional types

```
typeConditional
    : LPAREN 'cond' typeExpr typeExpr typeExpr typeExpr RPAREN
    ;
```

Operands: `subject`, `constraint`, `true-branch`, `false-branch`.

```
;; T extends string ? "yes" : "no"
(cond T string (lit "yes") (lit "no"))

;; T extends Array<infer U> ? U : never
(cond T (Array (infer U)) U never)
```

### `infer`

```
typeInfer
    : LPAREN 'infer' IDENTIFIER RPAREN
    ;
```

Only valid inside the `constraint` position of a conditional type. This is a semantic constraint, not a grammar constraint — the grammar allows it anywhere, and `tsc` will reject invalid usage.

```
;; infer U
(infer U)
```

### Mapped types

```
typeMapped
    : LPAREN 'mapped' IDENTIFIER typeExpr mappedModifiers? typeExpr RPAREN
    ;

mappedModifiers
    : LPAREN 'modifiers' mappedModifier* RPAREN
    ;

mappedModifier
    : 'readonly' | '+readonly' | '-readonly'
    | '?' | '+?' | '-?'
    ;
```

Operands: `binding`, `constraint`, optional `modifiers`, `value type`.

```
;; { [K in keyof T]: T[K] }
(mapped K (keyof T) (index T K))

;; { readonly [K in keyof T]?: T[K] }
(mapped K (keyof T) (modifiers readonly ?) (index T K))

;; { [K in keyof T]-?: T[K] }
(mapped K (keyof T) (modifiers -?) (index T K))
```

### Template literal types

```
typeTemplateLiteral
    : LPAREN 'template' templatePart+ RPAREN
    ;

templatePart
    : STRING
    | typeExpr
    ;
```

```
;; `get${Capitalize<string>}`
(template "get" (Capitalize string))

;; `${string}Changed`
(template string "Changed")
```

**Open question:** How to distinguish a `STRING` template part from a `typeExpr` that happens to be a type identifier? Resolution: template parts that are plain strings are always quoted. Unquoted identifiers are type expressions.

---

## Type Parameters and Constraints

### Type parameter declarations

```
typeParams
    : LPAREN 'type-params' typeParamDecl+ RPAREN
    ;

typeParamDecl
    : IDENTIFIER
    | LPAREN IDENTIFIER typeParamConstraint? typeParamDefault? RPAREN
    ;

typeParamConstraint
    : LPAREN 'extends' typeExpr RPAREN
    ;

typeParamDefault
    : LPAREN 'default' typeExpr RPAREN
    ;
```

```
;; <T>
(type-params T)

;; <T extends string>
(type-params (T (extends string)))

;; <T extends Serializable, U = string>
(type-params (T (extends Serializable)) (U (default string)))

;; <K extends keyof T, V extends T[K]>
(type-params (K (extends (keyof T))) (V (extends (index T K))))
```

### Type argument application (at call sites)

```
typeArgs
    : LPAREN 'type-args' typeExpr+ RPAREN
    ;
```

```
;; f<number>(10)
(call f (type-args number) 10)

;; new Map<string, number>()
(new Map (type-args string number))
```

---

## Binding Forms with Types

### Where type parameters appear

| Form | Type params | Type args | Type annotations |
|---|---|---|---|
| `lambda` / `defn` | Yes | — | On params and return |
| `call` | — | Yes | — |
| `let` / `const` | — | — | On binding |
| `type` (alias) | Yes | — | On body |
| `interface` | Yes | — | On body |
| `class` | Yes | — | On fields/methods |

### Function definitions

```
lambdaExpr
    : LPAREN 'lambda' typeParams? LPAREN param* RPAREN returnType? body RPAREN
    ;

param
    : LPAREN IDENTIFIER OPTIONAL? (COLON typeExpr)? RPAREN
    ;

returnType
    : LPAREN 'returns' typeExpr RPAREN
    ;
```

```
;; <T>(x: T): T => x
(lambda (type-params T) ((x : T)) (returns T) x)

;; (a: number, b?: string) => void
(lambda ((a : number) (b ? : string)) ...)
```

### Type aliases

```
typeAlias
    : LPAREN 'type' IDENTIFIER typeParams? typeExpr RPAREN
    ;
```

```
;; type Result<T, E = Error> = { ok: T } | { err: E }
(type Result (type-params T (E (default Error)))
  (union
    (obj (ok T))
    (obj (err E))))
```

### Interface definitions

```
interfaceDef
    : LPAREN 'interface' IDENTIFIER typeParams? interfaceExtends? typeObject RPAREN
    ;

interfaceExtends
    : LPAREN 'extends' typeExpr+ RPAREN
    ;
```

```
;; interface Repo<T extends Entity> extends Iterable<T> { find(id: string): T }
(interface Repo (type-params (T (extends Entity)))
  (extends (Iterable T))
  (obj
    (find (fn ((id string)) T))))
```

---

## AST (TypeScript)

```typescript
type TypeExpr =
  | { tag: "id"; name: string }
  | { tag: "app"; callee: TypeExpr; args: TypeExpr[] }
  | { tag: "union"; members: TypeExpr[] }
  | { tag: "intersection"; members: TypeExpr[] }
  | { tag: "array"; element: TypeExpr }
  | { tag: "tuple"; elements: TupleElement[] }
  | { tag: "fn"; typeParams: TypeParamDecl[]; params: FnTypeParam[]; result: TypeExpr }
  | { tag: "obj"; props: ObjProp[] }
  | { tag: "literal"; value: string | number | boolean }
  | { tag: "keyof"; operand: TypeExpr }
  | { tag: "typeof"; name: string }
  | { tag: "index"; object: TypeExpr; index: TypeExpr }
  | { tag: "cond"; subject: TypeExpr; constraint: TypeExpr; trueBranch: TypeExpr; falseBranch: TypeExpr }
  | { tag: "infer"; name: string }
  | { tag: "mapped"; binding: string; constraint: TypeExpr; modifiers: MappedModifier[]; value: TypeExpr }
  | { tag: "template"; parts: TemplatePart[] };

type TupleElement =
  | { tag: "element"; type: TypeExpr }
  | { tag: "rest"; type: TypeExpr }
  | { tag: "labeled"; name: string; type: TypeExpr };

type FnTypeParam = {
  name: string;
  optional: boolean;
  type: TypeExpr;
};

type ObjProp = {
  name: string;
  optional: boolean;
  readonly: boolean;
  type: TypeExpr;
};

type TypeParamDecl = {
  name: string;
  constraint?: TypeExpr;
  default?: TypeExpr;
};

type MappedModifier =
  | "readonly" | "+readonly" | "-readonly"
  | "?" | "+?" | "-?";

type TemplatePart =
  | { tag: "str"; value: string }
  | { tag: "type"; type: TypeExpr };
```

---

## Codegen: `emitTypeExpr`

Emit rules for each AST node. Parenthesization is required when a lower-precedence type appears inside a higher-precedence context.

### Precedence (lowest → highest)

1. Conditional (`cond`)
2. Union (`union`)
3. Intersection (`intersect`)
4. Unary prefix (`keyof`, `typeof`, `infer`, `array`)
5. Indexed access (`index`)
6. Primary (identifiers, literals, `app`, `obj`, `fn`, `tuple`, `mapped`, `template`)

A sub-expression is wrapped in parentheses when its precedence is lower than its parent's.

### Emit functions

```typescript
function emitTypeExpr(t: TypeExpr): string {
  switch (t.tag) {
    case "id":       return t.name;
    case "app":      return emitApp(t);
    case "union":    return emitUnion(t);
    case "intersection": return emitIntersection(t);
    case "array":    return emitArray(t);
    case "tuple":    return emitTuple(t);
    case "fn":       return emitFnType(t);
    case "obj":      return emitObj(t);
    case "literal":  return emitLiteral(t);
    case "keyof":    return emitKeyof(t);
    case "typeof":   return `typeof ${t.name}`;
    case "index":    return emitIndex(t);
    case "cond":     return emitCond(t);
    case "infer":    return `infer ${t.name}`;
    case "mapped":   return emitMapped(t);
    case "template": return emitTemplate(t);
  }
}

function emitApp(t: Extract<TypeExpr, { tag: "app" }>): string {
  const callee = emitTypeExpr(t.callee);
  const args = t.args.map(emitTypeExpr).join(", ");
  return `${callee}<${args}>`;
}

function emitUnion(t: Extract<TypeExpr, { tag: "union" }>): string {
  return t.members.map(m => wrapIf(m, "cond")).join(" | ");
}

function emitIntersection(t: Extract<TypeExpr, { tag: "intersection" }>): string {
  return t.members.map(m => wrapIf(m, "cond", "union")).join(" & ");
}

function emitArray(t: Extract<TypeExpr, { tag: "array" }>): string {
  const inner = emitTypeExpr(t.element);
  // Wrap union/intersection/function types for clarity: (A | B)[]
  if (needsParens(t.element, "array")) return `(${inner})[]`;
  return `${inner}[]`;
}

function emitTuple(t: Extract<TypeExpr, { tag: "tuple" }>): string {
  const parts = t.elements.map(e => {
    switch (e.tag) {
      case "element": return emitTypeExpr(e.type);
      case "rest":    return `...${emitTypeExpr(e.type)}`;
      case "labeled": return `${e.name}: ${emitTypeExpr(e.type)}`;
    }
  });
  return `[${parts.join(", ")}]`;
}

function emitFnType(t: Extract<TypeExpr, { tag: "fn" }>): string {
  const tparams = t.typeParams.length > 0
    ? `<${t.typeParams.map(emitTypeParamDecl).join(", ")}>`
    : "";
  const params = t.params.map(p => {
    const opt = p.optional ? "?" : "";
    return `${p.name}${opt}: ${emitTypeExpr(p.type)}`;
  }).join(", ");
  const ret = emitTypeExpr(t.result);
  return `${tparams}(${params}) => ${ret}`;
}

function emitObj(t: Extract<TypeExpr, { tag: "obj" }>): string {
  if (t.props.length === 0) return "{}";
  const props = t.props.map(p => {
    const ro = p.readonly ? "readonly " : "";
    const opt = p.optional ? "?" : "";
    return `${ro}${p.name}${opt}: ${emitTypeExpr(p.type)}`;
  });
  return `{ ${props.join("; ")} }`;
}

function emitLiteral(t: Extract<TypeExpr, { tag: "literal" }>): string {
  if (typeof t.value === "string") return JSON.stringify(t.value);
  return String(t.value);
}

function emitKeyof(t: Extract<TypeExpr, { tag: "keyof" }>): string {
  return `keyof ${wrapIf(t.operand, "cond", "union", "intersection")}`;
}

function emitIndex(t: Extract<TypeExpr, { tag: "index" }>): string {
  return `${emitTypeExpr(t.object)}[${emitTypeExpr(t.index)}]`;
}

function emitCond(t: Extract<TypeExpr, { tag: "cond" }>): string {
  const subj = emitTypeExpr(t.subject);
  const cstr = emitTypeExpr(t.constraint);
  const yes = emitTypeExpr(t.trueBranch);
  const no = emitTypeExpr(t.falseBranch);
  return `${subj} extends ${cstr} ? ${yes} : ${no}`;
}

function emitMapped(t: Extract<TypeExpr, { tag: "mapped" }>): string {
  const constraint = emitTypeExpr(t.constraint);
  const value = emitTypeExpr(t.value);
  let modStr = "";
  // Build modifier prefixes for the property
  const ro = t.modifiers.find(m => m.includes("readonly"));
  const opt = t.modifiers.find(m => m.includes("?"));
  if (ro) modStr += (ro === "-readonly" ? "-readonly " : ro === "+readonly" ? "+readonly " : "readonly ");
  const optSuffix = opt === "-?" ? "-?" : opt === "+?" ? "+?" : opt === "?" ? "?" : "";
  return `{ ${modStr}[${t.binding} in ${constraint}]${optSuffix}: ${value} }`;
}

function emitTemplate(t: Extract<TypeExpr, { tag: "template" }>): string {
  let out = "`";
  for (const part of t.parts) {
    if (part.tag === "str") out += part.value;
    else out += `\${${emitTypeExpr(part.type)}}`;
  }
  out += "`";
  return out;
}

function emitTypeParamDecl(p: TypeParamDecl): string {
  let out = p.name;
  if (p.constraint) out += ` extends ${emitTypeExpr(p.constraint)}`;
  if (p.default) out += ` = ${emitTypeExpr(p.default)}`;
  return out;
}
```

### Parenthesization helper

```typescript
const PREC: Record<string, number> = {
  cond: 1,
  union: 2,
  intersection: 3,
  keyof: 4, typeof: 4, infer: 4, array: 4,
  index: 5,
};

function needsParens(inner: TypeExpr, ...outerTags: string[]): boolean {
  const innerPrec = PREC[inner.tag] ?? 6;
  return outerTags.some(tag => {
    const outerPrec = PREC[tag] ?? 6;
    return innerPrec < outerPrec;
  });
}

function wrapIf(t: TypeExpr, ...outerTags: string[]): string {
  const s = emitTypeExpr(t);
  return needsParens(t, ...outerTags) ? `(${s})` : s;
}
```

---

## End-to-End Examples

### Identity function
```
(lambda (type-params T) ((x : T)) (returns T) x)
```
→
```typescript
<T>(x: T): T => x
```

### Constrained generic
```
(lambda (type-params (T (extends (obj (id string)))))
  ((items : (array T)))
  (returns (array string))
  ...)
```
→
```typescript
<T extends { id: string }>(items: T[]): string[] => ...
```

### Conditional type alias
```
(type Flatten (type-params T)
  (cond T (Array (infer U)) U T))
```
→
```typescript
type Flatten<T> = T extends Array<infer U> ? U : T;
```

### Mapped type alias
```
(type Readonly (type-params T)
  (mapped K (keyof T) (modifiers readonly) (index T K)))
```
→
```typescript
type Readonly<T> = { readonly [K in keyof T]: T[K] };
```

### Complex interface
```
(interface Repository (type-params (T (extends Entity)))
  (extends (Iterable T))
  (obj
    (find (fn ((id string)) (union T undefined)))
    (readonly count number)))
```
→
```typescript
interface Repository<T extends Entity> extends Iterable<T> {
  find(id: string): T | undefined;
  readonly count: number;
}
```

### Template literal type
```
(type EventName (type-params T)
  (template (Lowercase T) "Changed"))
```
→
```typescript
type EventName<T> = `${Lowercase<T>}Changed`;
```

---

## Reserved Keywords

The following identifiers are reserved in type-expression head position and cannot be used as type application constructors:

`union`, `intersect`, `array`, `tuple`, `fn`, `obj`, `lit`, `keyof`, `typeof`, `index`, `cond`, `infer`, `mapped`, `template`, `rest`, `readonly`, `type-params`, `type-args`, `extends`, `default`, `modifiers`

---

## What This Design Intentionally Omits

- **Type inference** — `tsc` handles all inference
- **Type validation** — invalid types compile to invalid TS, which `tsc` rejects
- **Overload signatures** — can be added later as `(overload ...)` forms
- **Decorators** — orthogonal to the type system
- **Namespace types** — `Foo.Bar` can be handled as `(index Foo (lit "Bar"))` or a dotted identifier extension
- **`as` / `satisfies` casts** — expression-level, not type-level; belongs in expression grammar
- **`is` type predicates** — can be added as a return-type modifier: `(returns (is x string))`
