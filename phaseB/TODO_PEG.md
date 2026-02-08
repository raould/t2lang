# Phase B Ohm PEG Migration Plan

Goal: move Phase B sugar from rewrite passes into an Ohm PEG parser. Infix is added later via Pratt/precedence parser.

## Pipeline

1. Ohm grammar parses Phase B source directly into canonical Phase A forms (no post-sugar rewrites).
2. Macro expansion runs after sugar parsing (canonical forms only).
3. Lowering to Phase A AST remains as-is.

## Step-by-step Migration Plan

### 1) Create new PEG parser file [x]
- Add a new file: phaseB/src/pegParser.ts.
- Install and wire Ohm (dependency + import) in phaseB/package.json.
- Expose a single entry: `parsePhaseBPeg(source: string, file: string): PhaseBNode[]`.

### 2) Implement the skeleton parser [x]
- Port the Ohm grammar skeleton from this doc into pegParser.ts.
- Implement `semantics.addOperation("ast", ...)` with helpers: `sym`, `list`, `str`, `num`.
- For now, keep semantics minimal: emit canonical `(call ...)`, `(prop ...)`, `(array ...)`, `(object ...)`, and basic atoms.
- Ensure locations (`loc`) are threaded from Ohm CST nodes.

### 3) First migration: dotted identifiers & property access [x]
- Implement `Postfix`/`OptionalChain` semantics for dotted access and method calls.
- Emit `(prop obj "name")` for access and `(call (prop obj "name") args...)` for method calls.
- Update tests or add a small focused test in phaseB/tests for dotted access via the PEG parser.

### 4) Switch pipeline to PEG parser only [x]
- In phaseB/src/reader.ts (or phaseB/src/api.ts), route `parsePhaseBRaw` to `parsePhaseBPeg` instead of the old reader + sugar rewrites.
- Remove or bypass `applySugar` and `rewriteAssignments` in the main pipeline.
- Keep the files containing the old reader + rewrites around temporarily, but unused, for back-compat until migrations are complete.
- Expect most sugar tests to fail initially; update tests incrementally as each sugar is migrated.

## Sugar → PEG Design [x]

Each item lists surface sugar, Ohm rule shape, and canonical output.

### 1) Dotted identifiers & property access
- **Sugar**: `obj.prop`, `obj.method(args)`, `a.b.c`
- **Rule**: `Postfix = Primary ("." ident CallArgs?)*`
- **Output**:
  - `obj.prop` → `(prop obj "prop")`
  - `obj.method(args)` → `(call (prop obj "method") args...)`
  - `a.b.c` → `(prop (prop a "b") "c")`

### 2) Implicit call lists
- **Sugar**: `(f a b)`
- **Rule**: `Call = "(" Expr+ ")"`
- **Output**: `(call f a b)`

### 3) Array literals
- **Sugar**: `[a b c]`
- **Rule**: `ArrayLit = "[" ExprList? "]"`
- **Output**: `(array a b c)`

### 4) Object literals + shorthand
- **Sugar**: `{x 1 y}`, `{name}`, `{a: 1}`
- **Rule**: `ObjectLit = "{" ObjectEntry* "}"`
- **Output**:
  - `x` → `("x" x)`
  - `x: v` → `("x" v)`
  - `name` → `("name" name)`

### 5) Optional object keys
- **Sugar**: `{role? maybeRole}` or `{role?}`
- **Rule**: `ObjectEntry = Key "?" Value?`
- **Output**: `(spread (if (!= val null) (object ("role" val)) (object)))`

### 6) Computed object keys
- **Sugar**: `{[expr] value}`
- **Rule**: `ObjectEntry = "[" Expr "]" Expr`
- **Output**: `(object (computed expr value))`

### 7) Assignment alias
- **Sugar**: `(:= target value)` or `(target := value)`
- **Rule**: `Assign = "(" Expr ":=" Expr ")"`
- **Output**: `(assign target value)`

### 8) Parallel let/const
- **Sugar**: `(let ((a b) (b a)) body...)`
- **Rule**: `Let = "(" ("let"|"const") BindingList Body* ")"`
- **Output**: `(let* ...)` / `(const* ...)` with `gensym` temps

### 9) for/of/in/await
- **Sugar**: `(for of (binding expr) body...)`, `(for await (binding expr) body...)`, `(for in (binding expr) body...)`
- **Rule**: `For = "(" "for" ("of"|"await"|"in") Binding Expr Body+ ")"`
- **Output**:
  - `for of` → `(for of (binding expr) body...)`
  - `for await` → `(for await (binding expr) body...)`
  - `for in` → `(for of (binding (call (prop Object "keys") expr)) body...)`

### 10) Callable parameter lists (Phase B callable grammar)
- **Sugar**: `(fn (x: T, y) : R ...)`
- **Rules**: See GRAMMAR_CALLABLE.md
- **Output**: `(fn ((x T) (y)) R ...)`

### 11) Type expression syntax
- **Sugar**: `T[]`, `A | B`, `Foo<Bar>`, `keyof T`, `infer U` (type grammar only)
- **Rule**: `TypeExpr` grammar (PEG)
- **Output**: `t:*` nodes per phaseA/TYPES.md

### 12) Type declaration sugar
- **Sugar**: `(type Alias SomeType)` / `(type Generic <T> (Array<T>))`
- **Rule**: `TypeDecl = "(" "type" Identifier TypeParams? TypeExpr ")"`
- **Output**: `(type-alias "Alias" TypeExpr')` with `:type-params`

### 13) Optional chaining
- **Sugar**: `obj?.prop`, `obj?.[key]`, `obj?.method(args)`, `expr?.(args)`
- **Rule**: `Postfix` with optional markers
- **Output**: `(let* ((tmp obj)) (if (== tmp null) undefined ...))` with `call-with-this` when needed

### 14) set! alias
- **Sugar**: `(set! x v)`
- **Rule**: `SetBang = "(" "set!" Expr Expr ")"`
- **Output**: `(assign x v)`

### 15) Boolean aliases
- **Sugar**: `(and a b)`, `(or a b)`, `(not x)`
- **Rule**: `BoolAlias`
- **Output**: `(call && a b)`, `(call || a b)`, `(call ! x)`

### 16) template-with
- **Sugar**: `(template-with "Hello ${name}" (name "Ada"))`
- **Rule**: `TemplateWith = "(" "template-with" StringLit Pair* ")"`
- **Output**: `(call (lambda (gensym...) (return (template ...))) ...)`

---

## Ohm Grammar Skeleton (no infix)

```ohm
T2PhaseB {
  Program = Spacing (Form Spacing)*

  Form = List
       | ArrayLit
       | ObjectLit
       | Atom
       | String
       | Number

  List = "(" Spacing ListBody? Spacing ")"
  ListBody = Assign
           | SetBang
           | For
           | Let
           | TypeDecl
           | TemplateWith
           | Call

  Call = Expr+  -- implicitCall

  Expr = OptionalChain
       | Postfix
       | Primary

  Primary = List
          | ArrayLit
          | ObjectLit
          | Atom
          | String
          | Number

  Postfix = Primary ("." ident CallArgs?)*/

  OptionalChain = Primary ("?." ident CallArgs? | "?." "[" Expr "]" | "?." CallArgs)+

  CallArgs = "(" Spacing ArgList? Spacing ")"
  ArgList = Expr (Spacing "," Spacing Expr)*

  ArrayLit = "[" Spacing ExprList? Spacing "]"
  ExprList = Expr (Spacing "," Spacing Expr)*

  ObjectLit = "{" Spacing ObjectEntry* Spacing "}"
  ObjectEntry = ComputedEntry
              | OptionalEntry
              | KeyValueEntry
              | ShorthandEntry

  ComputedEntry = "[" Spacing Expr Spacing "]" Spacing Expr
  OptionalEntry = Key Spacing "?" (Spacing Expr)?
  KeyValueEntry = Key Spacing ":" Spacing Expr
  ShorthandEntry = Key

  Key = ident | String

  Assign = Expr Spacing ":=" Spacing Expr
  SetBang = "set!" Spacing Expr Spacing Expr

  Let = ("let" | "const") Spacing BindingList Spacing Form*
  BindingList = "(" Spacing Binding* Spacing ")"
  Binding = "(" Spacing BindingTarget (Spacing Expr)? Spacing ")"

  For = "for" Spacing ForKind Spacing BindingExpr Spacing Form+
  ForKind = "of" | "in" | "await"
  BindingExpr = "(" Spacing BindingTarget Spacing Expr Spacing ")"

  TypeDecl = "type" Spacing ident Spacing TypeParams? Spacing TypeExpr

  TemplateWith = "template-with" Spacing String Spacing Pair*
  Pair = "(" Spacing Key Spacing Expr Spacing ")"

  TypeParams = "<" Spacing ident (Spacing "," Spacing ident)* Spacing ">"
  TypeExpr = TypePrimary (TypePostfix)*
  TypePrimary = ident
              | String
              | "[" Spacing TypeExpr (Spacing "," Spacing TypeExpr)* Spacing "]"
              | "(" Spacing TypeExpr Spacing ")"
              | "keyof" Spacing TypeExpr
              | "infer" Spacing ident
  TypePostfix = "[]" | "?" | TypeArgs
  TypeArgs = "<" Spacing TypeExpr (Spacing "," Spacing TypeExpr)* Spacing ">"

  Atom = ident

  ident = letter (letter | digit | "_" | "-" )*
  String = "\"" (~"\"" any)* "\""
  Number = digit+ ("." digit+)?

  Spacing = (space | "\n" | "\t")*
}
```

## Semantics Skeleton (TypeScript)

```ts
const semantics = grammar.createSemantics().addOperation("ast", {
  Program(_sp, forms) {
    return forms.asIteration().children.map((c) => c.ast());
  },

  Call_implicitCall(exprs) {
    const [head, ...args] = exprs.asIteration().children.map((c) => c.ast());
    return list(sym("call"), head, ...args);
  },

  Postfix(expr, segs) {
    return segs.asIteration().children.reduce((acc, seg) => seg.astWith(acc), expr.ast());
  },

  ArrayLit(_o, _sp1, exprs, _sp2, _c) {
    const items = exprs.children.length ? exprs.ast() : [];
    return list(sym("array"), ...items);
  },

  ObjectLit(_o, _sp1, entries, _sp2, _c) {
    return list(sym("object"), ...entries.asIteration().children.map((c) => c.ast()));
  },

  OptionalEntry(key, _q, value) {
    return optionalObjectEntry(key.ast(), value.children.length ? value.ast() : key.ast());
  },

  ComputedEntry(_o, _sp1, key, _sp2, _c, _sp3, value) {
    return list(sym("computed"), key.ast(), value.ast());
  },

  Assign(_lhs, _sp1, _tok, _sp2, _rhs) {
    return list(sym("assign"), _lhs.ast(), _rhs.ast());
  },

  SetBang(_kw, _sp1, lhs, _sp2, rhs) {
    return list(sym("assign"), lhs.ast(), rhs.ast());
  },

  For(_kw, _sp1, kind, _sp2, binding, _sp3, body) {
    return lowerFor(kind.ast(), binding.ast(), body.asIteration().children.map((c) => c.ast()));
  },

  Let(_kw, _sp1, bindings, _sp2, body) {
    return lowerParallelLet(this.sourceString, bindings.ast(), body.asIteration().children.map((c) => c.ast()));
  },

  TypeDecl(_kw, _sp1, name, _sp2, typeParams, _sp3, typeExpr) {
    return lowerTypeDecl(name.sourceString, typeParams.ast(), typeExpr.ast());
  },

  TemplateWith(_kw, _sp1, template, _sp2, pairs) {
    return lowerTemplateWith(template.ast(), pairs.asIteration().children.map((c) => c.ast()));
  },

  TypeExpr(expr, postfixes) {
    return lowerTypeExpr(expr.ast(), postfixes.asIteration().children.map((c) => c.ast()));
  },

  TypeArgs(_lt, _sp1, first, rest, _sp2, _gt) {
    return [first.ast(), ...rest.asIteration().children.map((c) => c.ast())];
  },

  Atom(_a) {
    return sym(this.sourceString);
  },

  String(_o, _chars, _c) {
    return str(this.sourceString.slice(1, -1));
  },

  Number(_n) {
    return num(this.sourceString);
  },
});
```

> Helper constructors used above (`list`, `sym`, `str`, `num`, `optionalObjectEntry`, `lowerFor`, `lowerParallelLet`, `lowerTypeDecl`, `lowerTemplateWith`, `lowerTypeExpr`) will live alongside the Ohm parser implementation.

## Infix

- admittedly unclear how far we want to go with infix: what expressions can be inside the infix boundaries. e.g. can method calls happen etc.?
    - ideally only basic math and logic.
    - primitive values and individual variables.
    - no other arbitrary nested expressions or forms.
    - no callables.
- PEG must hand off to Pratt/parsec for infix.
- parsec returns full AST back to PEG.
- use typescript-parsec for Pratt.
- use our precedence tables for parsec.
    - phaseB/EVALUATION_PRECEDENCE.json
- Ohm grammar is simple - just recognizes expression boundaries with expressionToken+
    - ohm grammar must be extended for infix recognition.
    - ohm praser must invoke parsec for the infix section.
    - parser must return AST.
    - ohm must merge AST.
- Ohm semantics delegates - collects tokens and passes to parsec parser
- parsec does the heavy lifting - handles all operator precedence
- Clean separation - Ohm handles structure, parsec handles expressions
- Key Steps for Infix Integration with Ohm & TypeScript Define the Grammar:
    - Create a .ohm file defining rules for precedence (e.g., AddExp for `(+/-)`, MulExp for `(*//)`) to handle infix operators properly.
    - Handle Left Recursion: Ohm supports left-recursive rules, allowing expressions like Expr = Expr "+" Term | Term directly.
    - Generate Types: Use the @ohm-js/cli to generate TypeScript definition files (.d.ts) from the grammar to ensure type safety in semantic actions.
    - Implement Semantics: Create an Ohm operation (semantics.addOperation) in TypeScript to walk the parse tree and build an AST or evaluate the expression.

### Note 

- Right Associativity Note

For right-associative operators (like ^), you'd need to use recursion differently:

```typescript// Right-associative power
const powerExpr = alt(
  apply(
    seq(
      unaryExpr,
      tok(TokenKind.Power),
      rule.ref(() => powerExpr) // Recurse on right side
    ),
    ([left, op, right]): Expr => ({
      type: 'binary',
      op: op.text,
      left,
      right,
    })
  ),
  unaryExpr
);
```

### Cleanup

- move tables from sugar.ts to infixParser.ts, pegParser.ts.
- delete rewrite-based sugar implementation.
