# Phase A Grammar (EBNF)

Tokens:
```
<identifier> ::= /[a-zA-Z_$][a-zA-Z0-9_$]*/
<number>     ::= /[0-9]+(\.[0-9]+)?/  ; integers and floats
<string>     ::= '"' <chars> '"' | "'" <chars> "'"
<boolean>    ::= "true" | "false"
<null>       ::= "null"
<undefined>  ::= "undefined"
<literal>    ::= <number> | <string> | <boolean> | <null> | <undefined>
```

## Program
```
<program> ::= "(" "program" <statement>* ")"
```

## Statements
```
<statement> ::= <block>
              | <if>
              | <scope-loop>
              | <for-classic>
              | <for-of>
              | <for-await>
              | <return>
              | <break>
              | <continue>
              | <switch>
              | <let-star>
              | <const-star>
              | <assign>
              | <expression>
              | <fn>
              | <class>
              | <import>
              | <export>
              | <type-alias>
              | <type-interface>

<binding> ::= "(" <binding-target> <expression>? ")"
<param> ::= "(" <identifier> <type>? ")"
<fn-signature> ::= "(" <param>* ")" <type>?

<init> ::= <expression>
<condition> ::= <expression>
<update> ::= <expression>
<class-body> ::= "(" "class-body" <statement>* ")"
<import-spec> ::= "(" "import-spec" <expression>* ")"
<export-spec> ::= "(" "export-spec" <expression>* ")"
<interface-body> ::= "(" "interface-body" <expression>* ")"

<block> ::= "(" "block" <statement>* ")"
<if> ::= "(" "if" <expression> <statement> (<statement>)? ")"
<scope-loop> ::= "(" "while" <expression> <statement> ")"
<for-classic> ::= "(" "for" "classic" <init>? <condition>? <update>? <statement> ")"
<for-of> ::= "(" "for" "of" "(" <binding> <expression> ")" <statement> ")"
<for-await> ::= "(" "for" "await" "(" <binding> <expression> ")" <statement> ")"
<let-star> ::= "(" "let*" <binding>* <statement>* ")"
<const-star> ::= "(" "const*" <binding>* <statement>* ")"
<assign> ::= "(" "assign" <expression> <expression> ")"
<fn> ::= "(" "fn" <fn-signature> <statement>* ")"
<class> ::= "(" "class" <identifier> <class-body> ")"
<import> ::= "(" "import" <import-spec> ")"
<export> ::= "(" "export" <export-spec> ")"
<type-alias> ::= "(" "type-alias" <identifier> <type-params>? <type> ")"
<type-interface> ::= "(" "type-interface" <identifier> <interface-body> ")"
<switch> ::= "(" "switch" <expression> <case>* <default>? ")"
<case> ::= "(" "case" <expression> <statement>* ")"
<default> ::= "(" "default" <statement>* ")"
<return> ::= "(" "return" <expression>? ")"
<break> ::= "(" "break" <identifier>? ")"
<continue> ::= "(" "continue" <identifier>? ")"

<binding-target> ::= <identifier>
                     | <array-pattern>
                     | <object-pattern>
                     | <rest-target>

<array-pattern> ::= "(" "array-pattern" <binding-target>* <rest-target>? ")"  ; `[a, ...rest]`
<object-pattern> ::= "(" "object-pattern" <object-pattern-field>* <rest-target>? ")"  ; `{a, b: {c}}`
<object-pattern-field> ::= "(" <string> <binding-target> ")"
<rest-target> ::= "(" "rest" <binding-target> ")"  ; `...rest` in arrays/objects
```

## Expressions
```
<expression> ::= <literal>
               | <identifier>
               | <call>
               | <prop>
               | <index>
               | <new>
               | <throw>
               | <try>
               | <fn>
               | <class>
               | <type-assert>
               | <type-object>
               | <type-function>
               | <type-literal>
               | <type-union>
               | <type-intersection>
               | <type-ref>
               | <array>
               | <object>
               | <ternary>

<call> ::= "(" "call" <expression> <expression>* ")"
<prop> ::= "(" "prop" <expression> <string> ")"  ; literal property names only; computed cases use <index>
<index> ::= "(" "index" <expression> <expression> ")"
<new> ::= "(" "new" <expression> <expression>* ")"
<throw> ::= "(" "throw" <expression> ")"
<try> ::= "(" "try" <statement> <catch>? <finally>? ")"
<catch> ::= "(" "catch" <binding>? <statement>* ")"
<finally> ::= "(" "finally" <statement>* ")"
<array> ::= "(" "array" <expression>* ")"
<object> ::= "(" "object" <object-field>* ")"
<object-field> ::= "(" <string> <expression> ")"
<ternary> ::= "(" "ternary" <expression> <expression> <expression> ")"
```

## Type Expressions
```
<type> ::= <type-primitive>
         | <type-ref>
         | <type-function>
         | <type-object>
         | <type-union>
         | <type-intersection>
         | <type-mapped>
         | <type-literal>

<type-primitive> ::= "type-string" | "type-number" | "type-boolean" | "type-null" | "type-undefined"
<type-ref> ::= "(" "type-ref" <identifier> <type-args>? ")"
<type-function> ::= "(" "type-function" <type-params>? <type>* <type> ")"
<type-object> ::= "(" "type-object" <type-field>* ")"
<type-field> ::= "(" <string> <type> ")"
<type-union> ::= "(" "type-union" <type>+ ")"
<type-intersection> ::= "(" "type-intersection" <type>+ ")"
<type-literal> ::= "(" "type-literal" <literal>* ")"
<type-mapped> ::= "(" "type-mapped" <type-param> <value-type> <name-remap>? <readonly-modifier>? <optional-modifier>? <via>? ")"
<value-type> ::= <type>              ; the mapped value expression
<name-remap> ::= <type>               ; optional `as` clause renaming keys
<readonly-modifier> ::= "readonly" | "-readonly"
<optional-modifier> ::= "optional" | "-optional"
<via> ::= <type>                     ; `in` constraint describing the key union
```

```
<type-params> ::= "(" "typeparams" <type-param>* ")"
<type-param> ::= "(" <identifier> <variance>? <type>? <type>? ")"  ; variance, constraint, default
<variance> ::= "in" | "out"

<type-app> ::= "(" "type-app" <expression> <type>* ")"
```

`<fn>` already consumes `<fn-signature>`, but Phase B may also add `<type-params>?` before the body, and `<class>` carries `<type-params>?` before `<class-body>`. `type-alias`/`type-interface` follow similar patterns so generic declarations share the canonical `<typeparams>` block before the core node.

## Notes
- Comments, macros, and TypeScript shorthands (like `typeof` as a prefix or `extends` clauses) are rewritten by Phase B into these canonical forms before Phase A sees them.
- Scope metadata (TDZ, const/let distinctions, hoisting flags) attaches to the nodes above but is not reflected in the EBNF; the resolver uses the metadata to enforce TypeScript semantics.
- `<prop>` only covers literal property names; computed-property access should go through `<index>` so Phase B can rewrite dynamic keys without introducing new grammar forms.
- `<ternary>` is the canonical expression that produces a value from a conditional without requiring a statement context ie TypeScript's `?:`.
```
